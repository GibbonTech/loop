import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { meetingBooking } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { desc, and, gte, lte, eq } from "drizzle-orm";
import { sendMeetingConfirmationEmail } from "~/lib/server/email";
import { enforceRateLimit, requireAdmin, requireAuth, validationError } from "~/lib/server/api-guards";
import { adminMeetingPatchSchema, dateKeyFromInput, isBookableDate, meetingCreateSchema, utcDayRange } from "~/lib/server/api-validation";

export const Route = createFileRoute("/api/meetings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const limited = enforceRateLimit(request, "meetings:create", {
            limit: 8,
            windowMs: 10 * 60 * 1000,
          });
          if (limited) return limited;

          const body = await request.json();
          const parsed = meetingCreateSchema.safeParse(body);

          if (!parsed.success) {
            return validationError(parsed.error.issues[0]?.message);
          }

          const data = parsed.data;
          const dateKey = dateKeyFromInput(data.scheduledDate);

          if (!dateKey || !isBookableDate(dateKey)) {
            return json(
              { success: false, error: "Date non disponible" },
              { status: 400 },
            );
          }

          const { start, end } = utcDayRange(dateKey);
          const [existingSlot] = await db
            .select({ id: meetingBooking.id })
            .from(meetingBooking)
            .where(
              and(
                gte(meetingBooking.scheduledDate, start),
                lte(meetingBooking.scheduledDate, end),
                eq(meetingBooking.timeSlot, data.timeSlot),
                eq(meetingBooking.status, "SCHEDULED"),
              ),
            )
            .limit(1);

          if (existingSlot) {
            return json(
              { success: false, error: "Ce créneau vient d'être réservé." },
              { status: 409 },
            );
          }

          const nameParts = data.firstName.split(/\s+/).filter(Boolean);
          const firstName = nameParts[0] || data.firstName;
          const lastName = data.lastName ?? (nameParts.length > 1 ? nameParts.slice(1).join(" ") : null);

          const newMeeting = await db
            .insert(meetingBooking)
            .values({
              id: nanoid(),
              firstName,
              lastName,
              email: data.email,
              phone: data.phone,
              scheduledDate: new Date(`${dateKey}T12:00:00.000Z`),
              timeSlot: data.timeSlot,
              duration: data.duration,
              leadId: data.leadId,
            })
            .returning();

          // Send confirmation email
          const meeting = newMeeting[0];
          if (meeting.email) {
            const dateStr = new Date(`${dateKey}T12:00:00.000Z`).toLocaleDateString("fr-FR", {
              weekday: "long", day: "numeric", month: "long", year: "numeric",
              timeZone: "UTC",
            });
            sendMeetingConfirmationEmail({
              email: meeting.email,
              firstName: firstName || "Candidat",
              date: dateStr,
              timeSlot: data.timeSlot,
            }).catch((e) => console.error("[Email] Meeting confirmation error:", e));
          }

          return json({ success: true, id: meeting.id, data: meeting });
        } catch (error) {
          console.error("Error creating meeting:", error);
          return json({ success: false, error: "Failed to create meeting" }, { status: 500 });
        }
      },
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const mode = url.searchParams.get("mode");

          // Availability check mode: returns booked slots for date range
          if (mode === "availability") {
            const startDate = url.searchParams.get("start");
            const endDate = url.searchParams.get("end");
            
            if (!startDate || !endDate) {
              return json({ success: false, error: "start and end dates required" }, { status: 400 });
            }

            const startKey = dateKeyFromInput(startDate);
            const endKey = dateKeyFromInput(endDate);

            if (!startKey || !endKey) {
              return json({ success: false, error: "Invalid date range" }, { status: 400 });
            }

            const startRange = utcDayRange(startKey);
            const endRange = utcDayRange(endKey);
            const bookedSlots = await db
              .select({
                date: meetingBooking.scheduledDate,
                timeSlot: meetingBooking.timeSlot,
              })
              .from(meetingBooking)
              .where(
                and(
                  gte(meetingBooking.scheduledDate, startRange.start),
                  lte(meetingBooking.scheduledDate, endRange.end),
                  eq(meetingBooking.status, "SCHEDULED")
                )
              );

            // Format as map: "2026-03-15" -> ["10:00", "14:00"]
            const bookedMap: Record<string, string[]> = {};
            for (const slot of bookedSlots) {
              const dateKey = slot.date.toISOString().split("T")[0];
              if (!bookedMap[dateKey]) bookedMap[dateKey] = [];
              bookedMap[dateKey].push(slot.timeSlot);
            }

            return json({ success: true, data: bookedMap });
          }

          const authContext = await requireAuth(request);
          if (authContext instanceof Response) return authContext;

          const meetingsQuery = db
            .select()
            .from(meetingBooking)
            .orderBy(desc(meetingBooking.scheduledDate));

          if (authContext.isAdmin) {
            const meetings = await meetingsQuery;
            return json({ success: true, data: meetings });
          }

          const meetings = await db
            .select()
            .from(meetingBooking)
            .where(eq(meetingBooking.email, authContext.user.email))
            .orderBy(desc(meetingBooking.scheduledDate));
          return json({ success: true, data: meetings });
        } catch (error) {
          console.error("Error fetching meetings:", error);
          return json({ success: false, error: "Failed to fetch meetings" }, { status: 500 });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const authContext = await requireAdmin(request);
          if (authContext instanceof Response) return authContext;

          const body = await request.json();
          const parsed = adminMeetingPatchSchema.safeParse(body);

          if (!parsed.success) {
            return validationError(parsed.error.issues[0]?.message);
          }

          const { id, status, notes } = parsed.data;
          const [updatedMeeting] = await db
            .update(meetingBooking)
            .set({ status, notes })
            .where(eq(meetingBooking.id, id))
            .returning();

          if (!updatedMeeting) {
            return json({ success: false, error: "Meeting not found" }, { status: 404 });
          }

          return json({ success: true, data: updatedMeeting });
        } catch (error) {
          console.error("Error updating meeting:", error);
          return json({ success: false, error: "Failed to update meeting" }, { status: 500 });
        }
      },
    },
  },
});

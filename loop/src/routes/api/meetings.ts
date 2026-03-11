import { createFileRoute } from "@tanstack/react-router";
import { db } from "~/lib/db";
import { meetingBooking } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { desc, and, gte, lte, eq } from "drizzle-orm";
import { sendMeetingConfirmationEmail } from "~/lib/server/email";

export const Route = createFileRoute("/api/meetings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          // Handle both field naming conventions (form sends name/date/time, API also accepts firstName/scheduledDate/timeSlot)
          const firstName = body.name || body.firstName || "";
          const scheduledDate = body.date || body.scheduledDate;
          const timeSlot = body.time || body.timeSlot;

          const newMeeting = await db
            .insert(meetingBooking)
            .values({
              id: nanoid(),
              firstName: firstName,
              lastName: body.lastName || null,
              email: body.email,
              phone: body.phone || null,
              scheduledDate: new Date(scheduledDate),
              timeSlot: timeSlot,
              duration: body.duration || 15,
              leadId: body.leadId || null,
            })
            .returning();

          // Send confirmation email
          const meeting = newMeeting[0];
          if (meeting.email) {
            const dateStr = new Date(scheduledDate).toLocaleDateString("fr-FR", {
              weekday: "long", day: "numeric", month: "long", year: "numeric",
            });
            sendMeetingConfirmationEmail({
              email: meeting.email,
              firstName: firstName || "Candidat",
              date: dateStr,
              timeSlot: timeSlot,
            }).catch((e) => console.error("[Email] Meeting confirmation error:", e));
          }

          return new Response(
            JSON.stringify({ success: true, id: meeting.id, data: meeting }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("Error creating meeting:", error);
          return new Response(
            JSON.stringify({ success: false, error: "Failed to create meeting" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
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
              return new Response(
                JSON.stringify({ success: false, error: "start and end dates required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
              );
            }

            const bookedSlots = await db
              .select({
                date: meetingBooking.scheduledDate,
                timeSlot: meetingBooking.timeSlot,
              })
              .from(meetingBooking)
              .where(
                and(
                  gte(meetingBooking.scheduledDate, new Date(startDate)),
                  lte(meetingBooking.scheduledDate, new Date(endDate)),
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

            return new Response(
              JSON.stringify({ success: true, data: bookedMap }),
              { headers: { "Content-Type": "application/json" } }
            );
          }

          // Default: return all meetings
          const meetings = await db
            .select()
            .from(meetingBooking)
            .orderBy(desc(meetingBooking.scheduledDate));
          return new Response(
            JSON.stringify({ success: true, data: meetings }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("Error fetching meetings:", error);
          return new Response(
            JSON.stringify({ success: false, error: "Failed to fetch meetings" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});

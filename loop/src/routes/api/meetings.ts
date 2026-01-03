import { createFileRoute } from "@tanstack/react-router";
import { db } from "~/lib/db";
import { meetingBooking } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { desc } from "drizzle-orm";

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

          return new Response(
            JSON.stringify({ success: true, id: newMeeting[0].id, data: newMeeting[0] }),
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
      GET: async () => {
        try {
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

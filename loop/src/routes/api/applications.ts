import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { application } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/api/applications")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          
          const newApplication = await db.insert(application).values({
            id: nanoid(),
            activityType: body.activityType,
            isAlone: body.isAlone,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            hasVtcLicense: body.hasVtcLicense,
            yearsExperience: body.yearsExperience,
            currentPlatforms: body.currentPlatforms?.join(",") || "",
            hasVehicle: body.hasVehicle,
            vehicleType: body.vehicleType,
            monthlyRevenue: body.monthlyRevenue,
            expectedStartDate: body.expectedStartDate,
            formData: body,
            status: "SUBMITTED",
            submittedAt: new Date(),
          }).returning();

          return json({ success: true, id: newApplication[0].id });
        } catch (error) {
          console.error("Error creating application:", error);
          return json({ success: false, error: "Failed to create application" }, { status: 500 });
        }
      },
      GET: async () => {
        try {
          const applications = await db.select().from(application).orderBy(application.createdAt);
          return json({ success: true, data: applications });
        } catch (error) {
          console.error("Error fetching applications:", error);
          return json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
        }
      },
    },
  },
});

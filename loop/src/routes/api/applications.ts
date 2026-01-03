import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { application } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { eq, desc } from "drizzle-orm";

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
            currentPlatforms: Array.isArray(body.currentPlatforms) 
              ? body.currentPlatforms.join(",") 
              : body.currentPlatforms || "",
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
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const id = url.searchParams.get("id");
          
          if (id) {
            // Get single application by ID
            const [app] = await db.select().from(application).where(eq(application.id, id));
            if (!app) {
              return json({ success: false, error: "Application not found" }, { status: 404 });
            }
            return json({ success: true, data: app });
          }
          
          // Get all applications
          const applications = await db.select().from(application).orderBy(desc(application.createdAt));
          return json({ success: true, data: applications });
        } catch (error) {
          console.error("Error fetching applications:", error);
          return json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const body = await request.json();
          const { id, status } = body;
          
          if (!id || !status) {
            return json({ success: false, error: "ID and status required" }, { status: 400 });
          }
          
          const [updated] = await db
            .update(application)
            .set({ 
              status,
              reviewedAt: new Date(),
            })
            .where(eq(application.id, id))
            .returning();
          
          if (!updated) {
            return json({ success: false, error: "Application not found" }, { status: 404 });
          }
          
          return json({ success: true, data: updated });
        } catch (error) {
          console.error("Error updating application:", error);
          return json({ success: false, error: "Failed to update application" }, { status: 500 });
        }
      },
    },
  },
});

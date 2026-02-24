import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { application } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { eq, desc } from "drizzle-orm";
import { auth } from "~/lib/auth/auth";
import { sendApplicationConfirmationEmail, sendApplicationStatusEmail, sendNewApplicationAdminEmail } from "~/lib/server/email";
import crypto from "crypto";

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

          const app = newApplication[0];

          // Auto-create user account so they can access /espace
          let accountCreated = false;
          if (app.email) {
            const tempPw = crypto.randomBytes(16).toString("hex");
            try {
              await auth.api.signUpEmail({
                body: {
                  email: app.email,
                  password: tempPw,
                  name: `${app.firstName || ""} ${app.lastName || ""}`.trim(),
                },
              });
              accountCreated = true;
              console.log("[Auth] User account created for:", app.email);

              // Trigger password reset so user can set their own password
              try {
                await auth.api.requestPasswordReset({
                  body: {
                    email: app.email,
                    redirectTo: "https://app.driivo.fr/set-password",
                  },
                });
                console.log("[Auth] Set-password email triggered for:", app.email);
              } catch (resetErr: any) {
                console.error("[Auth] Password reset trigger failed:", resetErr?.message || resetErr);
              }
            } catch (e: any) {
              console.warn("[Auth] Could not create user:", e?.message || e);
            }
          }

          // Send emails (fire-and-forget, don't block the response)
          if (app.email && app.firstName) {
            sendApplicationConfirmationEmail({
              email: app.email,
              firstName: app.firstName,
            }).catch((e: any) => console.error("[Email] Confirmation error:", e));

            sendNewApplicationAdminEmail({
              firstName: app.firstName || "",
              lastName: app.lastName || "",
              email: app.email,
              applicationId: app.id,
            }).catch((e: any) => console.error("[Email] Admin notification error:", e));
          }

          return json({ success: true, id: app.id, hasAccount: accountCreated });
        } catch (error) {
          console.error("Error creating application:", error);
          return json({ success: false, error: "Failed to create application" }, { status: 500 });
        }
      },
      GET: async ({ request }) => {
        try {
          // Auth check - require valid session to read applications
          const session = await auth.api.getSession({ headers: request.headers });
          if (!session?.user) {
            return json({ success: false, error: "Unauthorized" }, { status: 401 });
          }

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

          // Get all applications (admin only)
          const userRole = (session.user as { role?: string }).role;
          if (userRole !== "ADMIN") {
            return json({ success: false, error: "Admin access required" }, { status: 403 });
          }

          const applications = await db.select().from(application).orderBy(desc(application.createdAt));
          return json({ success: true, data: applications });
        } catch (error) {
          console.error("Error fetching applications:", error);
          return json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const session = await auth.api.getSession({ headers: request.headers });
          if (!session?.user) {
            return json({ success: false, error: "Unauthorized" }, { status: 401 });
          }
          const userRole = (session.user as { role?: string }).role;
          if (userRole !== "ADMIN") {
            return json({ success: false, error: "Admin access required" }, { status: 403 });
          }

          const body = await request.json();
          const { id, status, notes } = body;

          if (!id || !status) {
            return json({ success: false, error: "ID and status required" }, { status: 400 });
          }

          const updateData: Record<string, any> = {
            status,
            reviewedAt: new Date(),
            reviewedBy: session.user.id,
          };
          if (notes !== undefined) {
            updateData.notes = notes;
          }

          const [updated] = await db
            .update(application)
            .set(updateData)
            .where(eq(application.id, id))
            .returning();

          if (!updated) {
            return json({ success: false, error: "Application not found" }, { status: 404 });
          }

          // Send status notification email
          if (updated.email && updated.firstName && ["APPROVED", "REJECTED", "UNDER_REVIEW"].includes(status)) {
            sendApplicationStatusEmail({
              email: updated.email,
              firstName: updated.firstName,
              status: status as "APPROVED" | "REJECTED" | "UNDER_REVIEW",
              notes: notes || undefined,
            }).catch((e) => console.error("[Email] Status notification error:", e));
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

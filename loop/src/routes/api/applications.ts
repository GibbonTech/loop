import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { application } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { desc, eq, sql } from "drizzle-orm";
import { auth } from "~/lib/auth/auth";
import { sendApplicationConfirmationEmail, sendApplicationStatusEmail, sendNewApplicationAdminEmail } from "~/lib/server/email";
import crypto from "crypto";
import { enforceRateLimit, requireAdmin, requireAuth, validationError } from "~/lib/server/api-guards";
import { adminApplicationPatchSchema, applicationCreateSchema } from "~/lib/server/api-validation";

export const Route = createFileRoute("/api/applications")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const limited = enforceRateLimit(request, "applications:create", {
            limit: 5,
            windowMs: 10 * 60 * 1000,
          });
          if (limited) return limited;

          const body = await request.json();
          const parsed = applicationCreateSchema.safeParse(body);

          if (!parsed.success) {
            return validationError(parsed.error.issues[0]?.message);
          }

          const data = parsed.data;
          const [existingApplication] = await db
            .select()
            .from(application)
            .where(sql`lower(${application.email}) = ${data.email}`)
            .orderBy(desc(application.createdAt))
            .limit(1);

          if (existingApplication) {
            return json(
              {
                success: false,
                error: "Une candidature existe déjà pour cet email.",
                id: existingApplication.id,
              },
              { status: 409 },
            );
          }

          const formData = {
            ...body,
            email: data.email,
            city: data.city,
            vtcCardNumber: data.vtcCardNumber,
            vehicleYear: data.vehicleYear,
            vehicleRegistrationPlate: data.vehicleRegistrationPlate,
            vehicleCarteGriseHolder: data.vehicleCarteGriseHolder,
            consentAccepted: data.consentAccepted,
            consentAcceptedAt:
              data.consentAcceptedAt ??
              (data.consentAccepted ? new Date().toISOString() : null),
          };

          const newApplication = await db.insert(application).values({
            id: nanoid(),
            activityType: data.activityType,
            isAlone: data.isAlone,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            hasVtcLicense: data.hasVtcLicense,
            yearsExperience: data.yearsExperience,
            currentPlatforms: data.currentPlatforms.join(","),
            hasVehicle: data.hasVehicle,
            vehicleType: data.vehicleType,
            vehicleYear: data.vehicleYear,
            monthlyRevenue: data.monthlyRevenue,
            expectedStartDate: data.expectedStartDate,
            formData,
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
            } catch (e: any) {
              console.warn("[Auth] Could not create user:", e?.message || e);
            }

            // Trigger password reset even if the account already existed.
            try {
              await auth.api.requestPasswordReset({
                body: {
                  email: app.email,
                  redirectTo: `${process.env.VITE_BASE_URL || "https://app.driivo.fr"}/set-password`,
                },
              });
              console.log("[Auth] Set-password email triggered for:", app.email);
            } catch (resetErr: any) {
              console.error("[Auth] Password reset trigger failed:", resetErr?.message || resetErr);
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
          const authContext = await requireAuth(request);
          if (authContext instanceof Response) return authContext;

          const url = new URL(request.url);
          const id = url.searchParams.get("id");

          if (id) {
            // Get single application by ID
            const [app] = await db.select().from(application).where(eq(application.id, id));
            if (!app) {
              return json({ success: false, error: "Application not found" }, { status: 404 });
            }
            // Non-admin users can only view their own applications
            const sessionEmail = authContext.user.email?.trim().toLowerCase();
            if (
              !authContext.isAdmin &&
              app.email?.trim().toLowerCase() !== sessionEmail
            ) {
              return json({ success: false, error: "Unauthorized" }, { status: 403 });
            }
            return json({ success: true, data: app });
          }

          // Regular users: return only their own applications (by email)
          if (!authContext.isAdmin) {
            const userEmail = authContext.user.email?.trim().toLowerCase();
            const userApps = await db.select().from(application)
              .where(sql`lower(${application.email}) = ${userEmail}`)
              .orderBy(desc(application.createdAt));
            return json({ success: true, data: userApps });
          }

          // Admin: return all applications
          const applications = await db.select().from(application).orderBy(desc(application.createdAt));
          return json({ success: true, data: applications });
        } catch (error) {
          console.error("Error fetching applications:", error);
          return json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const authContext = await requireAdmin(request);
          if (authContext instanceof Response) return authContext;

          const body = await request.json();
          const parsed = adminApplicationPatchSchema.safeParse(body);

          if (!parsed.success) {
            return validationError(parsed.error.issues[0]?.message);
          }

          const { id, status, notes } = parsed.data;
          const [current] = await db
            .select()
            .from(application)
            .where(eq(application.id, id))
            .limit(1);

          if (!current) {
            return json({ success: false, error: "Application not found" }, { status: 404 });
          }

          const updateData: Partial<typeof application.$inferInsert> = {
            reviewedAt: new Date(),
            reviewedBy: authContext.user.id,
          };

          if (status) {
            updateData.status = status;
          }

          if (notes !== undefined) {
            updateData.notes = notes;
          }

          const [updated] = await db
            .update(application)
            .set(updateData)
            .where(eq(application.id, id))
            .returning();

          // Send status notification email
          if (status && status !== current.status && updated.email && updated.firstName && ["APPROVED", "REJECTED", "UNDER_REVIEW"].includes(status)) {
            sendApplicationStatusEmail({
              email: updated.email,
              firstName: updated.firstName,
              status: status as "APPROVED" | "REJECTED" | "UNDER_REVIEW",
              notes: undefined,
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

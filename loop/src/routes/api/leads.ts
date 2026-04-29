import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { lead } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { desc, eq } from "drizzle-orm";
import { enforceRateLimit, requireAdmin, validationError } from "~/lib/server/api-guards";
import { adminLeadPatchSchema, publicLeadSchema } from "~/lib/server/api-validation";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const limited = enforceRateLimit(request, "leads:create", {
            limit: 10,
            windowMs: 10 * 60 * 1000,
          });
          if (limited) return limited;

          const body = await request.json();
          const parsed = publicLeadSchema.safeParse(body);

          if (!parsed.success) {
            return validationError(parsed.error.issues[0]?.message);
          }

          const data = parsed.data;

          // Calculate estimated net (76% of CA after 10% fees and 14% cotisations)
          const monthlyRevenue = data.monthlyRevenue;
          const estimatedNet = Math.round(monthlyRevenue * 0.76);
          const [existingLead] = await db
            .select()
            .from(lead)
            .where(eq(lead.email, data.email))
            .orderBy(desc(lead.createdAt))
            .limit(1);

          if (existingLead) {
            const [updatedLead] = await db
              .update(lead)
              .set({
                firstName: data.firstName,
                phone: data.phone,
                monthlyRevenue,
                estimatedNet,
                source: data.source,
                utmSource: data.utmSource,
                utmMedium: data.utmMedium,
                utmCampaign: data.utmCampaign,
                status: existingLead.status === "LOST" ? "NEW" : existingLead.status,
              })
              .where(eq(lead.id, existingLead.id))
              .returning();

            return json({ success: true, id: updatedLead.id, data: updatedLead });
          }

          const newLead = await db
            .insert(lead)
            .values({
              id: nanoid(),
              firstName: data.firstName,
              email: data.email,
              phone: data.phone,
              monthlyRevenue,
              estimatedNet,
              source: data.source,
              utmSource: data.utmSource,
              utmMedium: data.utmMedium,
              utmCampaign: data.utmCampaign,
            })
            .returning();

          return json({ success: true, id: newLead[0].id, data: newLead[0] });
        } catch (error) {
          console.error("Error creating lead:", error);
          return json({ success: false, error: "Failed to create lead" }, { status: 500 });
        }
      },
      GET: async ({ request }) => {
        try {
          // Auth check - require admin session to read leads
          const authContext = await requireAdmin(request);
          if (authContext instanceof Response) return authContext;

          const leads = await db
            .select()
            .from(lead)
            .orderBy(desc(lead.createdAt));
          return json({ success: true, data: leads });
        } catch (error) {
          console.error("Error fetching leads:", error);
          return json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const authContext = await requireAdmin(request);
          if (authContext instanceof Response) return authContext;

          const body = await request.json();
          const parsed = adminLeadPatchSchema.safeParse(body);

          if (!parsed.success) {
            return validationError(parsed.error.issues[0]?.message);
          }

          const { id, status, notes } = parsed.data;
          const [updatedLead] = await db
            .update(lead)
            .set({
              status,
              notes,
              lastContactedAt:
                status === "CONTACTED" || status === "QUALIFIED"
                  ? new Date()
                  : undefined,
            })
            .where(eq(lead.id, id))
            .returning();

          if (!updatedLead) {
            return json({ success: false, error: "Lead not found" }, { status: 404 });
          }

          return json({ success: true, data: updatedLead });
        } catch (error) {
          console.error("Error updating lead:", error);
          return json({ success: false, error: "Failed to update lead" }, { status: 500 });
        }
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { db } from "~/lib/db";
import { lead } from "~/lib/db/schema";
import { nanoid } from "nanoid";
import { desc } from "drizzle-orm";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          // Calculate estimated net (76% of CA after 10% fees and 14% cotisations)
          const monthlyRevenue = parseInt(body.monthlyRevenue) || 0;
          const estimatedNet = Math.round(monthlyRevenue * 0.76);

          const newLead = await db
            .insert(lead)
            .values({
              id: nanoid(),
              firstName: body.firstName,
              email: body.email,
              phone: body.phone || null,
              monthlyRevenue: monthlyRevenue,
              estimatedNet: estimatedNet,
              source: body.source || "SIMULATEUR",
              utmSource: body.utmSource || null,
              utmMedium: body.utmMedium || null,
              utmCampaign: body.utmCampaign || null,
            })
            .returning();

          return new Response(
            JSON.stringify({ success: true, id: newLead[0].id, data: newLead[0] }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("Error creating lead:", error);
          return new Response(
            JSON.stringify({ success: false, error: "Failed to create lead" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
      GET: async () => {
        try {
          const leads = await db
            .select()
            .from(lead)
            .orderBy(desc(lead.createdAt));
          return new Response(
            JSON.stringify({ success: true, data: leads }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error) {
          console.error("Error fetching leads:", error);
          return new Response(
            JSON.stringify({ success: false, error: "Failed to fetch leads" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});

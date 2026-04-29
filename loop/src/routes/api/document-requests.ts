import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { application } from "~/lib/db/schema";
import { getDocumentLabel } from "~/lib/documents";
import { requireAdmin } from "~/lib/server/api-guards";
import { documentRequestSchema } from "~/lib/server/api-validation";
import { sendDocumentRequestEmail } from "~/lib/server/email";

export const Route = createFileRoute("/api/document-requests")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const authContext = await requireAdmin(request);
          if (authContext instanceof Response) return authContext;

          const result = documentRequestSchema.safeParse(await request.json());
          if (!result.success) {
            return json(
              {
                success: false,
                error: result.error.issues[0]?.message || "Payload invalide",
              },
              { status: 400 },
            );
          }

          const [app] = await db
            .select()
            .from(application)
            .where(eq(application.id, result.data.applicationId))
            .limit(1);

          if (!app) {
            return json(
              { success: false, error: "Candidature introuvable" },
              { status: 404 },
            );
          }

          const requestedLabels = result.data.categories.map(getDocumentLabel);
          const stamp = new Date().toISOString().slice(0, 10);
          const noteLines = [
            `[${stamp}] Documents demandés: ${requestedLabels.join(", ")}`,
            result.data.message ? `Message: ${result.data.message}` : null,
          ].filter(Boolean);
          const nextNotes = [app.notes, noteLines.join("\n")]
            .filter(Boolean)
            .join("\n\n");
          const nextStatus =
            app.status === "APPROVED" || app.status === "REJECTED"
              ? app.status
              : "UNDER_REVIEW";

          const [updatedApplication] = await db
            .update(application)
            .set({
              status: nextStatus,
              notes: nextNotes,
            })
            .where(eq(application.id, app.id))
            .returning();

          if (app.email) {
            await sendDocumentRequestEmail({
              email: app.email,
              firstName: app.firstName || "Candidat",
              categories: result.data.categories,
              message: result.data.message,
            });
          }

          return json({ success: true, application: updatedApplication });
        } catch (error: any) {
          console.error("[API] Document request error:", error);
          return json(
            { success: false, error: error.message || "Erreur interne" },
            { status: 500 },
          );
        }
      },
    },
  },
});

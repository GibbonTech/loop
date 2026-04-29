import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { application, storedFile } from "~/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import {
  uploadFile,
  buildFileKey,
  isStorageConfigured,
  getDownloadUrl,
  deleteFile,
} from "~/lib/server/storage";
import {
  type AuthContext,
  requireAdmin,
  requireAuth,
} from "~/lib/server/api-guards";
import {
  documentCategorySchema,
  fileReviewPatchSchema,
} from "~/lib/server/api-validation";
import { getDocumentLabel } from "~/lib/documents";
import { sendDocumentReviewEmail } from "~/lib/server/email";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const ALLOWED_ENTITY_TYPES = ["APPLICATION", "DOCUMENT", "OTHER"] as const;

function sanitizeFileName(name: string) {
  const normalized = name.normalize("NFKD").replace(/[^\w.\-]+/g, "_");
  return normalized.replace(/^_+|_+$/g, "").slice(0, 160) || "document";
}

async function canAccessEntity(
  authContext: AuthContext,
  entityType: string,
  entityId: string,
) {
  if (authContext.isAdmin) return true;

  if (entityType === "APPLICATION") {
    const [app] = await db
      .select({ email: application.email })
      .from(application)
      .where(eq(application.id, entityId))
      .limit(1);

    return app?.email === authContext.user.email;
  }

  return false;
}

async function canAccessStoredFile(
  authContext: AuthContext,
  file: typeof storedFile.$inferSelect,
) {
  if (authContext.isAdmin) return true;
  if (file.uploadedBy === authContext.user.id) return true;
  return canAccessEntity(authContext, file.entityType, file.entityId);
}

export const Route = createFileRoute("/api/files")({
  server: {
    handlers: {
      // Upload a file
      POST: async ({ request }) => {
        try {
          const authContext = await requireAuth(request);
          if (authContext instanceof Response) return authContext;

          if (!isStorageConfigured()) {
            return json(
              { success: false, error: "Stockage R2 non configuré" },
              { status: 500 },
            );
          }

          const formData = await request.formData();
          const file = formData.get("file");
          const entityType = formData.get("entityType") as string;
          const entityId = formData.get("entityId") as string;
          const documentCategoryResult = documentCategorySchema.safeParse(
            formData.get("documentCategory") || "OTHER",
          );

          if (!file || !(file instanceof File) || file.size === 0) {
            return json(
              { success: false, error: "Fichier requis" },
              { status: 400 },
            );
          }

          if (!entityType || !entityId) {
            return json(
              { success: false, error: "entityType et entityId requis" },
              { status: 400 },
            );
          }

          if (
            !ALLOWED_ENTITY_TYPES.includes(
              entityType as (typeof ALLOWED_ENTITY_TYPES)[number],
            )
          ) {
            return json(
              { success: false, error: "entityType invalide" },
              { status: 400 },
            );
          }

          if (!documentCategoryResult.success) {
            return json(
              { success: false, error: "Catégorie de document invalide" },
              { status: 400 },
            );
          }

          const entityAllowed = await canAccessEntity(
            authContext,
            entityType,
            entityId,
          );
          if (!entityAllowed) {
            return json(
              { success: false, error: "Accès refusé" },
              { status: 403 },
            );
          }

          if (file.size > MAX_FILE_SIZE) {
            return json(
              { success: false, error: "Fichier trop volumineux (max 10MB)" },
              { status: 400 },
            );
          }

          if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return json(
              { success: false, error: `Type non supporté: ${file.type}` },
              { status: 400 },
            );
          }

          // Upload to R2
          const fileId = nanoid();
          const folder =
            entityType === "APPLICATION" ? "applications" : "documents";
          const safeName = sanitizeFileName(file.name);
          const key = buildFileKey(folder, entityId, `${fileId}_${safeName}`);
          const buffer = Buffer.from(await file.arrayBuffer());
          await uploadFile(key, buffer, file.type);

          // Store metadata in DB
          const record = {
            id: fileId,
            key,
            originalName: safeName,
            mimeType: file.type,
            size: file.size,
            entityType: entityType as "APPLICATION" | "DOCUMENT" | "OTHER",
            entityId,
            uploadedBy: authContext.user.id,
            documentCategory: documentCategoryResult.data,
            reviewStatus: "UPLOADED",
            reviewNotes: null,
          };

          await db.insert(storedFile).values(record);

          return json({
            success: true,
            file: { ...record, createdAt: new Date().toISOString() },
          });
        } catch (error: any) {
          console.error("[API] File upload error:", error);
          return json(
            { success: false, error: error.message || "Erreur interne" },
            { status: 500 },
          );
        }
      },

      // Get presigned download URL or list files
      GET: async ({ request }) => {
        try {
          const authContext = await requireAuth(request);
          if (authContext instanceof Response) return authContext;

          const url = new URL(request.url);
          const fileKey = url.searchParams.get("key");
          const entityId = url.searchParams.get("entityId");

          // Get presigned URL for a specific file
          if (fileKey) {
            const [file] = await db
              .select()
              .from(storedFile)
              .where(eq(storedFile.key, fileKey))
              .limit(1);

            if (!file) {
              return json(
                { success: false, error: "Fichier non trouvé" },
                { status: 404 },
              );
            }

            const allowed = await canAccessStoredFile(authContext, file);
            if (!allowed) {
              return json(
                { success: false, error: "Accès refusé" },
                { status: 403 },
              );
            }

            if (fileKey.startsWith("demo/")) {
              const content = [
                "Document de démonstration Driivo",
                `Type: ${getDocumentLabel(file.documentCategory)}`,
                `Fichier: ${file.originalName}`,
                "Ce fichier est un marqueur de démonstration, pas un document client réel.",
              ].join("\n");
              return json({
                success: true,
                url: `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`,
              });
            }

            if (!isStorageConfigured()) {
              return json(
                { success: false, error: "Stockage R2 non configuré" },
                { status: 500 },
              );
            }

            const downloadUrl = await getDownloadUrl(fileKey, 3600);
            return json({ success: true, url: downloadUrl });
          }

          // List files for an entity
          if (entityId) {
            const entityType =
              url.searchParams.get("entityType") || "APPLICATION";
            const entityAllowed = await canAccessEntity(
              authContext,
              entityType,
              entityId,
            );
            if (!entityAllowed) {
              return json(
                { success: false, error: "Accès refusé" },
                { status: 403 },
              );
            }

            const files = await db
              .select()
              .from(storedFile)
              .where(eq(storedFile.entityId, entityId));
            return json({ success: true, data: files });
          }

          return json(
            { success: false, error: "key ou entityId requis" },
            { status: 400 },
          );
        } catch (error: any) {
          console.error("[API] File GET error:", error);
          return json(
            { success: false, error: error.message || "Erreur interne" },
            { status: 500 },
          );
        }
      },

      // Review a file
      PATCH: async ({ request }) => {
        try {
          const authContext = await requireAdmin(request);
          if (authContext instanceof Response) return authContext;

          const result = fileReviewPatchSchema.safeParse(await request.json());
          if (!result.success) {
            return json(
              {
                success: false,
                error: result.error.issues[0]?.message || "Payload invalide",
              },
              { status: 400 },
            );
          }

          const [file] = await db
            .select()
            .from(storedFile)
            .where(eq(storedFile.id, result.data.fileId))
            .limit(1);

          if (!file) {
            return json(
              { success: false, error: "Fichier non trouvé" },
              { status: 404 },
            );
          }

          const [updatedFile] = await db
            .update(storedFile)
            .set({
              reviewStatus: result.data.reviewStatus,
              reviewNotes: result.data.reviewNotes ?? null,
              reviewedAt:
                result.data.reviewStatus === "UPLOADED" ? null : new Date(),
              reviewedBy:
                result.data.reviewStatus === "UPLOADED"
                  ? null
                  : authContext.user.id,
            })
            .where(eq(storedFile.id, result.data.fileId))
            .returning();

          if (
            file.entityType === "APPLICATION" &&
            result.data.reviewStatus !== "UPLOADED"
          ) {
            const [app] = await db
              .select({
                email: application.email,
                firstName: application.firstName,
              })
              .from(application)
              .where(eq(application.id, file.entityId))
              .limit(1);

            if (app?.email) {
              await sendDocumentReviewEmail({
                email: app.email,
                firstName: app.firstName || "Candidat",
                documentCategory: updatedFile.documentCategory,
                status: result.data.reviewStatus,
                notes: result.data.reviewNotes,
              });
            }
          }

          return json({ success: true, file: updatedFile });
        } catch (error: any) {
          console.error("[API] File review error:", error);
          return json(
            { success: false, error: error.message || "Erreur interne" },
            { status: 500 },
          );
        }
      },

      // Delete a file
      DELETE: async ({ request }) => {
        try {
          const authContext = await requireAdmin(request);
          if (authContext instanceof Response) return authContext;

          const url = new URL(request.url);
          const fileId = url.searchParams.get("fileId");

          if (!fileId) {
            return json(
              { success: false, error: "fileId requis" },
              { status: 400 },
            );
          }

          const file = await db
            .select()
            .from(storedFile)
            .where(eq(storedFile.id, fileId));
          if (!file.length) {
            return json(
              { success: false, error: "Fichier non trouvé" },
              { status: 404 },
            );
          }

          // Delete from R2
          if (isStorageConfigured()) {
            try {
              await deleteFile(file[0].key);
            } catch (e) {
              console.error("[API] R2 delete error:", e);
            }
          }

          // Delete DB record
          await db.delete(storedFile).where(eq(storedFile.id, fileId));

          return json({ success: true });
        } catch (error: any) {
          console.error("[API] File delete error:", error);
          return json(
            { success: false, error: error.message || "Erreur interne" },
            { status: 500 },
          );
        }
      },
    },
  },
});

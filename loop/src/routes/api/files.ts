import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { db } from "~/lib/db";
import { storedFile } from "~/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { uploadFile, buildFileKey, isStorageConfigured, getDownloadUrl, deleteFile } from "~/lib/server/storage";
import { auth } from "~/lib/auth/auth";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

export const Route = createFileRoute("/api/files")({
  server: {
    handlers: {
      // Upload a file
      POST: async ({ request }) => {
        try {
          const session = await auth.api.getSession({ headers: request.headers });
          if (!session?.user) {
            return json({ success: false, error: "Non autorisé" }, { status: 401 });
          }

          if (!isStorageConfigured()) {
            return json({ success: false, error: "Stockage R2 non configuré" }, { status: 500 });
          }

          const formData = await request.formData();
          const file = formData.get("file");
          const entityType = formData.get("entityType") as string;
          const entityId = formData.get("entityId") as string;

          if (!file || !(file instanceof File) || file.size === 0) {
            return json({ success: false, error: "Fichier requis" }, { status: 400 });
          }

          if (!entityType || !entityId) {
            return json({ success: false, error: "entityType et entityId requis" }, { status: 400 });
          }

          if (file.size > MAX_FILE_SIZE) {
            return json({ success: false, error: "Fichier trop volumineux (max 10MB)" }, { status: 400 });
          }

          if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return json({ success: false, error: `Type non supporté: ${file.type}` }, { status: 400 });
          }

          // Upload to R2
          const fileId = nanoid();
          const folder = entityType === "APPLICATION" ? "applications" : "documents";
          const key = buildFileKey(folder, entityId, `${fileId}_${file.name}`);
          const buffer = Buffer.from(await file.arrayBuffer());
          await uploadFile(key, buffer, file.type);

          // Store metadata in DB
          const record = {
            id: fileId,
            key,
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
            entityType: entityType as "APPLICATION" | "DOCUMENT" | "OTHER",
            entityId,
            uploadedBy: session.user.id,
          };

          await db.insert(storedFile).values(record);

          return json({ success: true, file: record });
        } catch (error: any) {
          console.error("[API] File upload error:", error);
          return json({ success: false, error: error.message || "Erreur interne" }, { status: 500 });
        }
      },

      // Get presigned download URL or list files
      GET: async ({ request }) => {
        try {
          const session = await auth.api.getSession({ headers: request.headers });
          if (!session?.user) {
            return json({ success: false, error: "Non autorisé" }, { status: 401 });
          }

          const url = new URL(request.url);
          const fileKey = url.searchParams.get("key");
          const entityId = url.searchParams.get("entityId");

          // Get presigned URL for a specific file
          if (fileKey) {
            if (!isStorageConfigured()) {
              return json({ success: false, error: "Stockage R2 non configuré" }, { status: 500 });
            }
            const downloadUrl = await getDownloadUrl(fileKey, 3600);
            return json({ success: true, url: downloadUrl });
          }

          // List files for an entity
          if (entityId) {
            const files = await db.select().from(storedFile).where(eq(storedFile.entityId, entityId));
            return json({ success: true, data: files });
          }

          return json({ success: false, error: "key ou entityId requis" }, { status: 400 });
        } catch (error: any) {
          console.error("[API] File GET error:", error);
          return json({ success: false, error: error.message || "Erreur interne" }, { status: 500 });
        }
      },

      // Delete a file
      DELETE: async ({ request }) => {
        try {
          const session = await auth.api.getSession({ headers: request.headers });
          if (!session?.user) {
            return json({ success: false, error: "Non autorisé" }, { status: 401 });
          }

          // Admin only
          const userRole = (session.user as { role?: string }).role;
          if (userRole !== "ADMIN") {
            return json({ success: false, error: "Admin requis" }, { status: 403 });
          }

          const url = new URL(request.url);
          const fileId = url.searchParams.get("fileId");

          if (!fileId) {
            return json({ success: false, error: "fileId requis" }, { status: 400 });
          }

          const file = await db.select().from(storedFile).where(eq(storedFile.id, fileId));
          if (!file.length) {
            return json({ success: false, error: "Fichier non trouvé" }, { status: 404 });
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
          return json({ success: false, error: error.message || "Erreur interne" }, { status: 500 });
        }
      },
    },
  },
});

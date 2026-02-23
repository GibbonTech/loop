import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createHmac } from "crypto";

// ============================================
// Cloudflare R2 Storage (S3-compatible)
// Use process["env"] to prevent Vite/Vinxi from statically replacing
// process.env.* references at build time (dead code elimination)
// ============================================

const _env = process["env"];

function getR2Config() {
  return {
    accountId: _env["R2_ACCOUNT_ID"] || "",
    accessKeyId: _env["R2_ACCESS_KEY_ID"] || "",
    secretAccessKey: _env["R2_SECRET_ACCESS_KEY"] || "",
    bucketName: _env["R2_BUCKET_NAME"] || "driivo-files",
  };
}

let _s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (_s3Client) return _s3Client;

  const { accountId, accessKeyId, secretAccessKey } = getR2Config();

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 storage not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in environment.");
  }

  _s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return _s3Client;
}

function getBucket(): string {
  return getR2Config().bucketName;
}

/**
 * Check if R2 storage is configured
 */
export function isStorageConfigured(): boolean {
  const { accountId, accessKeyId, secretAccessKey } = getR2Config();
  return !!(accountId && accessKeyId && secretAccessKey);
}

/**
 * Upload a file to R2
 * @param key - Object key (path), e.g. "applications/abc123/carte_vtc.pdf"
 * @param body - File contents as Buffer or Uint8Array
 * @param contentType - MIME type
 * @returns The key of the uploaded object
 */
export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string,
): Promise<string> {
  const client = getS3Client();

  await client.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );

  return key;
}

/**
 * Generate a presigned download URL (time-limited)
 * @param key - Object key in R2
 * @param expiresIn - Seconds until URL expires (default 1 hour)
 */
export async function getDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
  const client = getS3Client();

  const url = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: getBucket(),
      Key: key,
    }),
    { expiresIn },
  );

  return url;
}

/**
 * Generate a signed CDN URL via Cloudflare Worker proxy
 * Uses HMAC token so only authorized requests can access files
 */
export function getSignedCdnUrl(key: string, expiresInSeconds: number = 3600): string {
  const signingSecret = _env["R2_SIGNING_SECRET"] || "";
  if (!signingSecret) {
    throw new Error("R2_SIGNING_SECRET not configured");
  }

  const cdnBase = _env["R2_CDN_BASE"] || "https://files.driivo.fr";
  const path = "/" + key;
  const expires = String(Date.now() + expiresInSeconds * 1000);
  const message = path + ":" + expires;

  const token = createHmac("sha256", signingSecret)
    .update(message)
    .digest("base64url");

  return `${cdnBase}${path}?token=${token}&expires=${expires}`;
}

/**
 * Delete a file from R2
 */
export async function deleteFile(key: string): Promise<void> {
  const client = getS3Client();

  await client.send(
    new DeleteObjectCommand({
      Bucket: getBucket(),
      Key: key,
    }),
  );
}

/**
 * Build a storage key for a given entity
 */
export function buildFileKey(
  entityType: "applications" | "documents",
  entityId: string,
  filename: string,
): string {
  // Sanitize filename
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${entityType}/${entityId}/${safe}`;
}

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),

    // Email - Resend
    RESEND_API_KEY: z.string().optional(),

    // Cloudflare R2 (S3-compatible) file storage
    R2_ACCOUNT_ID: z.string().optional(),
    R2_ACCESS_KEY_ID: z.string().optional(),
    R2_SECRET_ACCESS_KEY: z.string().optional(),
    R2_BUCKET_NAME: z.string().optional().default("driivo-files"),
    R2_SIGNING_SECRET: z.string().optional(),
    R2_CDN_BASE: z.string().optional(),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_BASE_URL: z.string().min(1),
    VITE_GA_MEASUREMENT_ID: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

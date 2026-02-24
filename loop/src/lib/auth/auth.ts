import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin } from "better-auth/plugins";
import { compare, hash } from "bcryptjs";

import { env } from "~/env/server";
import { db } from "~/lib/db";
import * as schema from "~/lib/db/schema";
import { sendSetPasswordEmail } from "~/lib/server/email";

export const auth = betterAuth({
  baseURL: env.VITE_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
  telemetry: {
    enabled: false,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
    storage: "memory",
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5,
      },
      "/sign-up/email": {
        window: 300,
        max: 3,
      },
      "/get-session": {
        window: 10,
        max: 30,
      },
    },
  },

  plugins: [
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
    }),
    tanstackStartCookies(),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => hash(password, 10),
      verify: async ({ hash: hashedPassword, password }) =>
        compare(password, hashedPassword),
    },
    sendResetPassword: async ({ user, token }) => {
      const url = `https://app.driivo.fr/set-password?token=${token}`;
      sendSetPasswordEmail({
        email: user.email,
        firstName: user.name?.split(" ")[0] || "Chauffeur",
        url,
      }).catch((e) => console.error("[Email] Set password error:", e));
    },
    resetPasswordTokenExpiresIn: 60 * 60 * 24 * 7, // 7 days for new accounts
  },

  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://driivo.fr",
    "https://app.driivo.fr",
  ],
});

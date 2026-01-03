import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin } from "better-auth/plugins";
import { compare, hash } from "bcrypt";

import { env } from "~/env/server";
import { db } from "~/lib/db";
import * as schema from "~/lib/db/schema";

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
      hash: async (password) => await hash(password, 10),
      verify: async ({ hash: hashedPassword, password }) =>
        await compare(password, hashedPassword),
    },
  },

  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://mgccko8gcc8k0gos04wgkcow.37.27.62.87.sslip.io",
    "https://driivo.fr",
    "https://www.driivo.fr",
    "https://app.driivo.fr",
  ],
});

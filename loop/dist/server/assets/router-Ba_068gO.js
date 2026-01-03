import { createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter as createRouter$2 } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { Toaster } from "sonner";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";
import { z as z$1 } from "zod";
import { relations, desc, eq, count, asc, inArray, notInArray, like, lt, lte, ne, gt, gte, and, or, sql as sql$1 } from "drizzle-orm";
import { pgTable, timestamp, text, boolean, index, pgEnum, integer, jsonb } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { json } from "@tanstack/router-core/ssr/client";
import { logger, isTest, isDevelopment, createLogger, isProduction, shouldPublishLog, env as env$1 } from "@better-auth/core/env";
import { BetterAuthError, BASE_ERROR_CODES } from "@better-auth/core/error";
import { createAdapterFactory, initGetModelName, initGetFieldName } from "@better-auth/core/db/adapter";
import { defineRequestState, getCurrentAuthContext, getCurrentAdapter, runWithTransaction, hasRequestState, runWithRequestState, runWithEndpointContext, runWithAdapter } from "@better-auth/core/context";
import { createRandomStringGenerator } from "@better-auth/utils/random";
import { hex } from "@better-auth/utils/hex";
import "@better-auth/utils";
import { createHash } from "@better-auth/utils/hash";
import { APIError, toResponse, createRouter as createRouter$1 } from "better-call";
import { safeJSONParse, generateId, defineErrorCodes } from "@better-auth/core/utils";
import { createAuthMiddleware, createAuthEndpoint } from "@better-auth/core/api";
import * as import___better_auth_core_db from "@better-auth/core/db";
import { getAuthTables } from "@better-auth/core/db";
import { SqliteDialect, MysqlDialect, PostgresDialect, MssqlDialect, Kysely, sql as sql$2 } from "kysely";
import { hkdf } from "@noble/hashes/hkdf.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { jwtDecrypt, calculateJwkThumbprint, base64url, jwtVerify, EncryptJWT, SignJWT } from "jose";
import { base64Url } from "@better-auth/utils/base64";
import { binary } from "@better-auth/utils/binary";
import { createHMAC } from "@better-auth/utils/hmac";
import { xchacha20poly1305 } from "@noble/ciphers/chacha.js";
import { utf8ToBytes, bytesToHex, managedNonce, hexToBytes as hexToBytes$1 } from "@noble/ciphers/utils.js";
import { SocialProviderListEnum, socialProviders } from "@better-auth/core/social-providers";
import { JWTExpired } from "jose/errors";
import defu$1, { createDefu, defu } from "defu";
import { scryptAsync } from "@noble/hashes/scrypt.js";
import { hexToBytes } from "@noble/hashes/utils.js";
import { createTelemetry } from "@better-auth/telemetry";
import "@better-auth/core";
import "@better-auth/core/oauth2";
import "@better-fetch/fetch";
import "@better-auth/utils/otp";
import { compare, hash } from "bcrypt";
const appCss = "/assets/styles-5SFimQQd.css";
const Route$g = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LOOP - La Première Coopérative VTC" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxs(RootDocument, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true })
  ] });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$a = () => import("./simulateur-CIN50xZ-.js");
const Route$f = createFileRoute("/simulateur")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component"),
  head: () => ({
    meta: [{
      title: "Simulateur de Revenus | Driivo"
    }, {
      name: "description",
      content: "Calculez votre salaire net en tant qu'entrepreneur salarié VTC avec Driivo."
    }]
  })
});
const $$splitComponentImporter$9 = () => import("./reunion-BaB1Q8t5.js");
const Route$e = createFileRoute("/reunion")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  head: () => ({
    meta: [{
      title: "Réserver un Appel | Driivo"
    }, {
      name: "description",
      content: "Réservez un appel de 15 minutes avec un conseiller Driivo pour découvrir le statut d'entrepreneur salarié."
    }]
  })
});
const $$splitComponentImporter$8 = () => import("./resultats-Vhmdv_Ow.js");
const Route$d = createFileRoute("/resultats")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  head: () => ({
    meta: [{
      title: "Vos Résultats | Driivo"
    }, {
      name: "description",
      content: "Découvrez votre salaire net estimé en tant qu'entrepreneur salarié VTC."
    }]
  }),
  validateSearch: (search) => {
    return {
      ca: search.ca || "5000",
      prenom: search.prenom || "Jean",
      email: search.email || "",
      tel: search.tel || ""
    };
  }
});
const $$splitComponentImporter$7 = () => import("./login-DIHOeiPy.js");
const Route$c = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Connexion | Driivo"
    }, {
      name: "description",
      content: "Connectez-vous à votre espace Driivo."
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./inscription-POkcl4r7.js");
const Route$b = createFileRoute("/inscription")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  head: () => ({
    meta: [{
      title: "Rejoindre Driivo | Candidature"
    }, {
      name: "description",
      content: "Rejoignez Driivo en 3 étapes simples et devenez entrepreneur salarié VTC."
    }]
  })
});
const $$splitComponentImporter$5 = () => import("./espace-CPa9G0n9.js");
const Route$a = createFileRoute("/espace")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-BkAXaeiz.js");
const Route$9 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "Driivo - Devenez Entrepreneur Salarié VTC"
    }, {
      name: "description",
      content: "Restez indépendant tout en bénéficiant d'un vrai CDI : fiche de paie, retraite, mutuelle, chômage. La liberté en plus, la sécurité en prime."
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./index-pvwd1WER.js");
const Route$8 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./inscription.confirmation-CThsU7Qk.js");
const Route$7 = createFileRoute("/inscription/confirmation")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Candidature Envoyée | Driivo"
    }, {
      name: "description",
      content: "Votre candidature a été envoyée avec succès. Découvrez les prochaines étapes."
    }]
  })
});
const env = createEnv({
  server: {
    DATABASE_URL: z$1.string().min(1),
    BETTER_AUTH_SECRET: z$1.string().min(1),
    RESEND_API_KEY: z$1.string().optional()
  },
  clientPrefix: "VITE_",
  client: {
    VITE_BASE_URL: z$1.string().min(1)
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
  role: text("role").default("USER"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires")
});
const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by")
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);
const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);
const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);
const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account)
}));
const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}));
const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}));
const leadSourceEnum = pgEnum("lead_source", [
  "SIMULATEUR",
  "HOMEPAGE",
  "REUNION",
  "REFERRAL",
  "OTHER"
]);
const leadStatusEnum = pgEnum("lead_status", [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST"
]);
const lead = pgTable(
  "Lead",
  {
    id: text("id").primaryKey(),
    // Contact info
    firstName: text("firstName").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    // Simulator data
    monthlyRevenue: integer("monthlyRevenue"),
    estimatedNet: integer("estimatedNet"),
    // Lead tracking
    source: leadSourceEnum("source").default("SIMULATEUR").notNull(),
    status: leadStatusEnum("status").default("NEW").notNull(),
    // UTM tracking
    utmSource: text("utmSource"),
    utmMedium: text("utmMedium"),
    utmCampaign: text("utmCampaign"),
    // Notes and follow-up
    notes: text("notes"),
    lastContactedAt: timestamp("lastContactedAt"),
    // Metadata
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [
    index("lead_email_idx").on(table.email),
    index("lead_status_idx").on(table.status),
    index("lead_source_idx").on(table.source),
    index("lead_createdAt_idx").on(table.createdAt)
  ]
);
const meetingBooking = pgTable(
  "MeetingBooking",
  {
    id: text("id").primaryKey(),
    // Contact info
    firstName: text("firstName").notNull(),
    lastName: text("lastName"),
    email: text("email").notNull(),
    phone: text("phone"),
    // Booking details
    scheduledDate: timestamp("scheduledDate").notNull(),
    timeSlot: text("timeSlot").notNull(),
    duration: integer("duration").default(15).notNull(),
    // in minutes
    // Status
    status: text("status").default("SCHEDULED").notNull(),
    // SCHEDULED, COMPLETED, CANCELLED, NO_SHOW
    // Notes
    notes: text("notes"),
    // Link to lead if exists
    leadId: text("leadId").references(() => lead.id),
    // Metadata
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [
    index("meeting_email_idx").on(table.email),
    index("meeting_scheduledDate_idx").on(table.scheduledDate),
    index("meeting_status_idx").on(table.status)
  ]
);
const meetingBookingRelations = relations(meetingBooking, ({ one }) => ({
  lead: one(lead, {
    fields: [meetingBooking.leadId],
    references: [lead.id]
  })
}));
const applicationStatusEnum = pgEnum("application_status", [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED"
]);
const application = pgTable(
  "Application",
  {
    id: text("id").primaryKey(),
    status: applicationStatusEnum("status").default("DRAFT").notNull(),
    currentStep: integer("currentStep").default(1).notNull(),
    totalSteps: integer("totalSteps").default(6).notNull(),
    // Step 1: Activity Type
    activityType: text("activityType"),
    // Step 2: Structure
    structureType: text("structureType"),
    isAlone: text("isAlone"),
    // Step 3: Personal Info
    firstName: text("firstName"),
    lastName: text("lastName"),
    email: text("email"),
    phone: text("phone"),
    // Step 4: Experience
    hasVtcLicense: text("hasVtcLicense"),
    yearsExperience: text("yearsExperience"),
    currentPlatforms: text("currentPlatforms"),
    // Step 5: Vehicle
    hasVehicle: text("hasVehicle"),
    vehicleType: text("vehicleType"),
    vehicleYear: text("vehicleYear"),
    // Step 6: Revenue
    monthlyRevenue: text("monthlyRevenue"),
    expectedStartDate: text("expectedStartDate"),
    // All form data as JSON for flexibility
    formData: jsonb("formData").$type(),
    // Metadata
    submittedAt: timestamp("submittedAt"),
    reviewedAt: timestamp("reviewedAt"),
    reviewedBy: text("reviewedBy").references(() => user.id),
    notes: text("notes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [
    index("application_status_idx").on(table.status),
    index("application_email_idx").on(table.email),
    index("application_createdAt_idx").on(table.createdAt)
  ]
);
const applicationRelations = relations(application, ({ one }) => ({
  reviewer: one(user, {
    fields: [application.reviewedBy],
    references: [user.id]
  })
}));
const schema$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  account,
  accountRelations,
  application,
  applicationRelations,
  applicationStatusEnum,
  lead,
  leadSourceEnum,
  leadStatusEnum,
  meetingBooking,
  meetingBookingRelations,
  session,
  sessionRelations,
  user,
  userRelations,
  verification
}, Symbol.toStringTag, { value: "Module" }));
const sql = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 3,
  prepare: false,
  keep_alive: 30
});
const db = drizzle(sql, { schema: schema$2, casing: "snake_case" });
const Route$6 = createFileRoute("/api/meetings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const firstName = body.name || body.firstName || "";
          const scheduledDate = body.date || body.scheduledDate;
          const timeSlot = body.time || body.timeSlot;
          const newMeeting = await db.insert(meetingBooking).values({
            id: nanoid(),
            firstName,
            lastName: body.lastName || null,
            email: body.email,
            phone: body.phone || null,
            scheduledDate: new Date(scheduledDate),
            timeSlot,
            duration: body.duration || 15,
            leadId: body.leadId || null
          }).returning();
          return new Response(
            JSON.stringify({ success: true, id: newMeeting[0].id, data: newMeeting[0] }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error2) {
          console.error("Error creating meeting:", error2);
          return new Response(
            JSON.stringify({ success: false, error: "Failed to create meeting" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
      GET: async () => {
        try {
          const meetings = await db.select().from(meetingBooking).orderBy(desc(meetingBooking.scheduledDate));
          return new Response(
            JSON.stringify({ success: true, data: meetings }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error2) {
          console.error("Error fetching meetings:", error2);
          return new Response(
            JSON.stringify({ success: false, error: "Failed to fetch meetings" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
  }
});
const Route$5 = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const monthlyRevenue = parseInt(body.monthlyRevenue) || 0;
          const estimatedNet = Math.round(monthlyRevenue * 0.76);
          const newLead = await db.insert(lead).values({
            id: nanoid(),
            firstName: body.firstName,
            email: body.email,
            phone: body.phone || null,
            monthlyRevenue,
            estimatedNet,
            source: body.source || "SIMULATEUR",
            utmSource: body.utmSource || null,
            utmMedium: body.utmMedium || null,
            utmCampaign: body.utmCampaign || null
          }).returning();
          return new Response(
            JSON.stringify({ success: true, id: newLead[0].id, data: newLead[0] }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error2) {
          console.error("Error creating lead:", error2);
          return new Response(
            JSON.stringify({ success: false, error: "Failed to create lead" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
      GET: async () => {
        try {
          const leads = await db.select().from(lead).orderBy(desc(lead.createdAt));
          return new Response(
            JSON.stringify({ success: true, data: leads }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (error2) {
          console.error("Error fetching leads:", error2);
          return new Response(
            JSON.stringify({ success: false, error: "Failed to fetch leads" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
  }
});
const Route$4 = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        return json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
      }
    }
  }
});
const Route$3 = createFileRoute("/api/applications")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const newApplication = await db.insert(application).values({
            id: nanoid(),
            activityType: body.activityType,
            isAlone: body.isAlone,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            hasVtcLicense: body.hasVtcLicense,
            yearsExperience: body.yearsExperience,
            currentPlatforms: Array.isArray(body.currentPlatforms) ? body.currentPlatforms.join(",") : body.currentPlatforms || "",
            hasVehicle: body.hasVehicle,
            vehicleType: body.vehicleType,
            monthlyRevenue: body.monthlyRevenue,
            expectedStartDate: body.expectedStartDate,
            formData: body,
            status: "SUBMITTED",
            submittedAt: /* @__PURE__ */ new Date()
          }).returning();
          return json({ success: true, id: newApplication[0].id });
        } catch (error2) {
          console.error("Error creating application:", error2);
          return json({ success: false, error: "Failed to create application" }, { status: 500 });
        }
      },
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const id = url.searchParams.get("id");
          if (id) {
            const [app] = await db.select().from(application).where(eq(application.id, id));
            if (!app) {
              return json({ success: false, error: "Application not found" }, { status: 404 });
            }
            return json({ success: true, data: app });
          }
          const applications = await db.select().from(application).orderBy(desc(application.createdAt));
          return json({ success: true, data: applications });
        } catch (error2) {
          console.error("Error fetching applications:", error2);
          return json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const body = await request.json();
          const { id, status } = body;
          if (!id || !status) {
            return json({ success: false, error: "ID and status required" }, { status: 400 });
          }
          const [updated] = await db.update(application).set({
            status,
            reviewedAt: /* @__PURE__ */ new Date()
          }).where(eq(application.id, id)).returning();
          if (!updated) {
            return json({ success: false, error: "Application not found" }, { status: 404 });
          }
          return json({ success: true, data: updated });
        } catch (error2) {
          console.error("Error updating application:", error2);
          return json({ success: false, error: "Failed to update application" }, { status: 500 });
        }
      }
    }
  }
});
const $$splitComponentImporter$1 = () => import("./login-BZqE3Rtd.js");
const Route$2 = createFileRoute("/admin/login")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const drizzleAdapter = (db2, config2) => {
  let lazyOptions = null;
  const createCustomAdapter = (db$1) => ({ getFieldName, options }) => {
    function getSchema2(model) {
      const schema2 = config2.schema || db$1._.fullSchema;
      if (!schema2) throw new BetterAuthError("Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object.");
      const schemaModel = schema2[model];
      if (!schemaModel) throw new BetterAuthError(`[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`);
      return schemaModel;
    }
    const withReturning = async (model, builder, data, where) => {
      var _a, _b, _c, _d, _e;
      if (config2.provider !== "mysql") return (await builder.returning())[0];
      await builder.execute();
      const schemaModel = getSchema2(model);
      const builderVal = (_a = builder.config) == null ? void 0 : _a.values;
      if (where == null ? void 0 : where.length) {
        const clause = convertWhereClause(where.map((w) => {
          if (data[w.field] !== void 0) return {
            ...w,
            value: data[w.field]
          };
          return w;
        }), model);
        return (await db$1.select().from(schemaModel).where(...clause))[0];
      } else if (builderVal && ((_c = (_b = builderVal[0]) == null ? void 0 : _b.id) == null ? void 0 : _c.value)) {
        let tId = (_e = (_d = builderVal[0]) == null ? void 0 : _d.id) == null ? void 0 : _e.value;
        if (!tId) tId = (await db$1.select({ id: sql$1`LAST_INSERT_ID()` }).from(schemaModel).orderBy(desc(schemaModel.id)).limit(1))[0].id;
        return (await db$1.select().from(schemaModel).where(eq(schemaModel.id, tId)).limit(1).execute())[0];
      } else if (data.id) return (await db$1.select().from(schemaModel).where(eq(schemaModel.id, data.id)).limit(1).execute())[0];
      else {
        if (!("id" in schemaModel)) throw new BetterAuthError(`The model "${model}" does not have an "id" field. Please use the "id" field as your primary key.`);
        return (await db$1.select().from(schemaModel).orderBy(desc(schemaModel.id)).limit(1).execute())[0];
      }
    };
    function convertWhereClause(where, model) {
      const schemaModel = getSchema2(model);
      if (!where) return [];
      if (where.length === 1) {
        const w = where[0];
        if (!w) return [];
        const field = getFieldName({
          model,
          field: w.field
        });
        if (!schemaModel[field]) throw new BetterAuthError(`The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`);
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return [inArray(schemaModel[field], w.value)];
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return [notInArray(schemaModel[field], w.value)];
        }
        if (w.operator === "contains") return [like(schemaModel[field], `%${w.value}%`)];
        if (w.operator === "starts_with") return [like(schemaModel[field], `${w.value}%`)];
        if (w.operator === "ends_with") return [like(schemaModel[field], `%${w.value}`)];
        if (w.operator === "lt") return [lt(schemaModel[field], w.value)];
        if (w.operator === "lte") return [lte(schemaModel[field], w.value)];
        if (w.operator === "ne") return [ne(schemaModel[field], w.value)];
        if (w.operator === "gt") return [gt(schemaModel[field], w.value)];
        if (w.operator === "gte") return [gte(schemaModel[field], w.value)];
        return [eq(schemaModel[field], w.value)];
      }
      const andGroup = where.filter((w) => w.connector === "AND" || !w.connector);
      const orGroup = where.filter((w) => w.connector === "OR");
      const andClause = and(...andGroup.map((w) => {
        const field = getFieldName({
          model,
          field: w.field
        });
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return inArray(schemaModel[field], w.value);
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return notInArray(schemaModel[field], w.value);
        }
        if (w.operator === "contains") return like(schemaModel[field], `%${w.value}%`);
        if (w.operator === "starts_with") return like(schemaModel[field], `${w.value}%`);
        if (w.operator === "ends_with") return like(schemaModel[field], `%${w.value}`);
        if (w.operator === "lt") return lt(schemaModel[field], w.value);
        if (w.operator === "lte") return lte(schemaModel[field], w.value);
        if (w.operator === "gt") return gt(schemaModel[field], w.value);
        if (w.operator === "gte") return gte(schemaModel[field], w.value);
        if (w.operator === "ne") return ne(schemaModel[field], w.value);
        return eq(schemaModel[field], w.value);
      }));
      const orClause = or(...orGroup.map((w) => {
        const field = getFieldName({
          model,
          field: w.field
        });
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return inArray(schemaModel[field], w.value);
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return notInArray(schemaModel[field], w.value);
        }
        if (w.operator === "contains") return like(schemaModel[field], `%${w.value}%`);
        if (w.operator === "starts_with") return like(schemaModel[field], `${w.value}%`);
        if (w.operator === "ends_with") return like(schemaModel[field], `%${w.value}`);
        if (w.operator === "lt") return lt(schemaModel[field], w.value);
        if (w.operator === "lte") return lte(schemaModel[field], w.value);
        if (w.operator === "gt") return gt(schemaModel[field], w.value);
        if (w.operator === "gte") return gte(schemaModel[field], w.value);
        if (w.operator === "ne") return ne(schemaModel[field], w.value);
        return eq(schemaModel[field], w.value);
      }));
      const clause = [];
      if (andGroup.length) clause.push(andClause);
      if (orGroup.length) clause.push(orClause);
      return clause;
    }
    function checkMissingFields(schema2, model, values) {
      if (!schema2) throw new BetterAuthError("Drizzle adapter failed to initialize. Drizzle Schema not found. Please provide a schema object in the adapter options object.");
      for (const key in values) if (!schema2[key]) throw new BetterAuthError(`The field "${key}" does not exist in the "${model}" Drizzle schema. Please update your drizzle schema or re-generate using "npx @better-auth/cli@latest generate".`);
    }
    return {
      async create({ model, data: values }) {
        const schemaModel = getSchema2(model);
        checkMissingFields(schemaModel, model, values);
        return await withReturning(model, db$1.insert(schemaModel).values(values), values);
      },
      async findOne({ model, where, join }) {
        var _a, _b, _c;
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        if ((_a = options.experimental) == null ? void 0 : _a.joins) if (!db$1.query || !db$1.query[model]) {
          logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx @better-auth/cli@latest generate".`);
          logger.info("Falling back to regular query");
        } else {
          let includes;
          const pluralJoinResults = [];
          if (join) {
            includes = {};
            const joinEntries = Object.entries(join);
            for (const [model$1, joinAttr] of joinEntries) {
              const limit = joinAttr.limit ?? ((_c = (_b = options.advanced) == null ? void 0 : _b.database) == null ? void 0 : _c.defaultFindManyLimit) ?? 100;
              const isUnique = joinAttr.relation === "one-to-one";
              const pluralSuffix = isUnique || config2.usePlural ? "" : "s";
              includes[`${model$1}${pluralSuffix}`] = isUnique ? true : { limit };
              if (!isUnique) pluralJoinResults.push(`${model$1}${pluralSuffix}`);
            }
          }
          const res$1 = await db$1.query[model].findFirst({
            where: clause[0],
            with: includes
          });
          if (res$1) for (const pluralJoinResult of pluralJoinResults) {
            let singularKey = !config2.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
            res$1[singularKey] = res$1[pluralJoinResult];
            if (pluralJoinResult !== singularKey) delete res$1[pluralJoinResult];
          }
          return res$1;
        }
        const res = await db$1.select().from(schemaModel).where(...clause);
        if (!res.length) return null;
        return res[0];
      },
      async findMany({ model, where, sortBy, limit, offset, join }) {
        var _a, _b, _c;
        const schemaModel = getSchema2(model);
        const clause = where ? convertWhereClause(where, model) : [];
        const sortFn = (sortBy == null ? void 0 : sortBy.direction) === "desc" ? desc : asc;
        if ((_a = options.experimental) == null ? void 0 : _a.joins) if (!db$1.query[model]) {
          logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx @better-auth/cli@latest generate".`);
          logger.info("Falling back to regular query");
        } else {
          let includes;
          const pluralJoinResults = [];
          if (join) {
            includes = {};
            const joinEntries = Object.entries(join);
            for (const [model$1, joinAttr] of joinEntries) {
              const isUnique = joinAttr.relation === "one-to-one";
              const limit$1 = joinAttr.limit ?? ((_c = (_b = options.advanced) == null ? void 0 : _b.database) == null ? void 0 : _c.defaultFindManyLimit) ?? 100;
              let pluralSuffix = isUnique || config2.usePlural ? "" : "s";
              includes[`${model$1}${pluralSuffix}`] = isUnique ? true : { limit: limit$1 };
              if (!isUnique) pluralJoinResults.push(`${model$1}${pluralSuffix}`);
            }
          }
          let orderBy = void 0;
          if (sortBy == null ? void 0 : sortBy.field) orderBy = [sortFn(schemaModel[getFieldName({
            model,
            field: sortBy == null ? void 0 : sortBy.field
          })])];
          let res = await db$1.query[model].findMany({
            where: clause[0],
            with: includes,
            limit: limit ?? 100,
            offset: offset ?? 0,
            orderBy
          });
          if (res) for (const item of res) for (const pluralJoinResult of pluralJoinResults) {
            const singularKey = !config2.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
            if (singularKey === pluralJoinResult) continue;
            item[singularKey] = item[pluralJoinResult];
            delete item[pluralJoinResult];
          }
          return res;
        }
        let builder = db$1.select().from(schemaModel);
        const effectiveLimit = limit;
        const effectiveOffset = offset;
        if (typeof effectiveLimit !== "undefined") builder = builder.limit(effectiveLimit);
        if (typeof effectiveOffset !== "undefined") builder = builder.offset(effectiveOffset);
        if (sortBy == null ? void 0 : sortBy.field) builder = builder.orderBy(sortFn(schemaModel[getFieldName({
          model,
          field: sortBy == null ? void 0 : sortBy.field
        })]));
        return await builder.where(...clause);
      },
      async count({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = where ? convertWhereClause(where, model) : [];
        return (await db$1.select({ count: count() }).from(schemaModel).where(...clause))[0].count;
      },
      async update({ model, where, update: values }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        return await withReturning(model, db$1.update(schemaModel).set(values).where(...clause), values, where);
      },
      async updateMany({ model, where, update: values }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        return await db$1.update(schemaModel).set(values).where(...clause);
      },
      async delete({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        return await db$1.delete(schemaModel).where(...clause);
      },
      async deleteMany({ model, where }) {
        const schemaModel = getSchema2(model);
        const clause = convertWhereClause(where, model);
        const res = await db$1.delete(schemaModel).where(...clause);
        let count$1 = 0;
        if (res && "rowCount" in res) count$1 = res.rowCount;
        else if (Array.isArray(res)) count$1 = res.length;
        else if (res && ("affectedRows" in res || "rowsAffected" in res || "changes" in res)) count$1 = res.affectedRows ?? res.rowsAffected ?? res.changes;
        if (typeof count$1 !== "number") logger.error("[Drizzle Adapter] The result of the deleteMany operation is not a number. This is likely a bug in the adapter. Please report this issue to the Better Auth team.", {
          res,
          model,
          where
        });
        return count$1;
      },
      options: config2
    };
  };
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "drizzle",
      adapterName: "Drizzle Adapter",
      usePlural: config2.usePlural ?? false,
      debugLogs: config2.debugLogs ?? false,
      supportsUUIDs: config2.provider === "pg" ? true : false,
      supportsJSON: config2.provider === "pg" ? true : false,
      supportsArrays: config2.provider === "pg" ? true : false,
      transaction: config2.transaction ?? false ? (cb) => db2.transaction((tx) => {
        return cb(createAdapterFactory({
          config: adapterOptions.config,
          adapter: createCustomAdapter(tx)
        })(lazyOptions));
      }) : false
    },
    adapter: createCustomAdapter(db2)
  };
  const adapter = createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return adapter(options);
  };
};
const { get: getOAuthState, set: setOAuthState } = defineRequestState(() => null);
const generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z", "-_");
function constantTimeEqual(a, b) {
  if (typeof a === "string") a = new TextEncoder().encode(a);
  if (typeof b === "string") b = new TextEncoder().encode(b);
  const aBuffer = new Uint8Array(a);
  const bBuffer = new Uint8Array(b);
  let c = aBuffer.length ^ bBuffer.length;
  const length = Math.max(aBuffer.length, bBuffer.length);
  for (let i = 0; i < length; i++) c |= (i < aBuffer.length ? aBuffer[i] : 0) ^ (i < bBuffer.length ? bBuffer[i] : 0);
  return c === 0;
}
async function signJWT(payload, secret, expiresIn = 3600) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
}
async function verifyJWT(token, secret) {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(secret))).payload;
  } catch {
    return null;
  }
}
const info = new Uint8Array([
  66,
  101,
  116,
  116,
  101,
  114,
  65,
  117,
  116,
  104,
  46,
  106,
  115,
  32,
  71,
  101,
  110,
  101,
  114,
  97,
  116,
  101,
  100,
  32,
  69,
  110,
  99,
  114,
  121,
  112,
  116,
  105,
  111,
  110,
  32,
  75,
  101,
  121
]);
const now = () => Date.now() / 1e3 | 0;
const alg = "dir";
const enc = "A256CBC-HS512";
async function symmetricEncodeJWT(payload, secret, salt, expiresIn = 3600) {
  const encryptionSecret = hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
  const thumbprint = await calculateJwkThumbprint({
    kty: "oct",
    k: base64url.encode(encryptionSecret)
  }, "sha256");
  return await new EncryptJWT(payload).setProtectedHeader({
    alg,
    enc,
    kid: thumbprint
  }).setIssuedAt().setExpirationTime(now() + expiresIn).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
async function symmetricDecodeJWT(token, secret, salt) {
  if (!token) return null;
  try {
    const { payload } = await jwtDecrypt(token, async ({ kid }) => {
      const encryptionSecret = hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
      if (kid === void 0) return encryptionSecret;
      if (kid === await calculateJwkThumbprint({
        kty: "oct",
        k: base64url.encode(encryptionSecret)
      }, "sha256")) return encryptionSecret;
      throw new Error("no matching decryption secret");
    }, {
      clockTolerance: 15,
      keyManagementAlgorithms: [alg],
      contentEncryptionAlgorithms: [enc, "A256GCM"]
    });
    return payload;
  } catch {
    return null;
  }
}
const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64
};
async function generateKey(password, salt) {
  return await scryptAsync(password.normalize("NFKC"), salt, {
    N: config.N,
    p: config.p,
    r: config.r,
    dkLen: config.dkLen,
    maxmem: 128 * config.N * config.r * 2
  });
}
const hashPassword = async (password) => {
  const salt = hex.encode(crypto.getRandomValues(new Uint8Array(16)));
  const key = await generateKey(password, salt);
  return `${salt}:${hex.encode(key)}`;
};
const verifyPassword = async ({ hash: hash2, password }) => {
  const [salt, key] = hash2.split(":");
  if (!salt || !key) throw new BetterAuthError("Invalid password hash");
  return constantTimeEqual(await generateKey(password, salt), hexToBytes(key));
};
const symmetricEncrypt = async ({ key, data }) => {
  const keyAsBytes = await createHash("SHA-256").digest(key);
  const dataAsBytes = utf8ToBytes(data);
  return bytesToHex(managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes)).encrypt(dataAsBytes));
};
const symmetricDecrypt = async ({ key, data }) => {
  const keyAsBytes = await createHash("SHA-256").digest(key);
  const dataAsBytes = hexToBytes$1(data);
  const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
};
async function generateState(c, link, additionalData) {
  var _a, _b, _c, _d;
  const callbackURL = ((_a = c.body) == null ? void 0 : _a.callbackURL) || c.context.options.baseURL;
  if (!callbackURL) throw new APIError("BAD_REQUEST", { message: "callbackURL is required" });
  const codeVerifier = generateRandomString(128);
  const state = generateRandomString(32);
  const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
  const stateData = {
    ...additionalData ? additionalData : {},
    callbackURL,
    codeVerifier,
    errorURL: (_b = c.body) == null ? void 0 : _b.errorCallbackURL,
    newUserURL: (_c = c.body) == null ? void 0 : _c.newUserCallbackURL,
    link,
    expiresAt: Date.now() + 600 * 1e3,
    requestSignUp: (_d = c.body) == null ? void 0 : _d.requestSignUp,
    state
  };
  await setOAuthState(stateData);
  if (storeStateStrategy === "cookie") {
    const encryptedData = await symmetricEncrypt({
      key: c.context.secret,
      data: JSON.stringify(stateData)
    });
    const stateCookie$1 = c.context.createAuthCookie("oauth_state", { maxAge: 600 * 1e3 });
    c.setCookie(stateCookie$1.name, encryptedData, stateCookie$1.attributes);
    return {
      state,
      codeVerifier
    };
  }
  const stateCookie = c.context.createAuthCookie("state", { maxAge: 300 * 1e3 });
  await c.setSignedCookie(stateCookie.name, state, c.context.secret, stateCookie.attributes);
  const expiresAt = /* @__PURE__ */ new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);
  const verification2 = await c.context.internalAdapter.createVerificationValue({
    value: JSON.stringify(stateData),
    identifier: state,
    expiresAt
  });
  if (!verification2) {
    c.context.logger.error("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database");
    throw new APIError("INTERNAL_SERVER_ERROR", { message: "Unable to create verification" });
  }
  return {
    state: verification2.identifier,
    codeVerifier
  };
}
async function parseState(c) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const state = c.query.state || c.body.state;
  const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
  const stateDataSchema = z.looseObject({
    callbackURL: z.string(),
    codeVerifier: z.string(),
    errorURL: z.string().optional(),
    newUserURL: z.string().optional(),
    expiresAt: z.number(),
    link: z.object({
      email: z.string(),
      userId: z.coerce.string()
    }).optional(),
    requestSignUp: z.boolean().optional(),
    state: z.string().optional()
  });
  let parsedData;
  const skipStateCookieCheck = (_a = c.context.oauthConfig) == null ? void 0 : _a.skipStateCookieCheck;
  if (storeStateStrategy === "cookie") {
    const stateCookie = c.context.createAuthCookie("oauth_state");
    const encryptedData = c.getCookie(stateCookie.name);
    if (!encryptedData) {
      c.context.logger.error("State Mismatch. OAuth state cookie not found", { state });
      const errorURL = ((_b = c.context.options.onAPIError) == null ? void 0 : _b.errorURL) || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=please_restart_the_process`);
    }
    try {
      const decryptedData = await symmetricDecrypt({
        key: c.context.secret,
        data: encryptedData
      });
      parsedData = stateDataSchema.parse(JSON.parse(decryptedData));
    } catch (error2) {
      c.context.logger.error("Failed to decrypt or parse OAuth state cookie", { error: error2 });
      const errorURL = ((_c = c.context.options.onAPIError) == null ? void 0 : _c.errorURL) || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=please_restart_the_process`);
    }
    if (!((_d = c.context.oauthConfig) == null ? void 0 : _d.skipStateCookieCheck) && parsedData.state && parsedData.state !== state) {
      c.context.logger.error("State Mismatch. State parameter does not match", {
        expected: parsedData.state,
        received: state
      });
      const errorURL = ((_e = c.context.options.onAPIError) == null ? void 0 : _e.errorURL) || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=state_mismatch`);
    }
    c.setCookie(stateCookie.name, "", { maxAge: 0 });
  } else {
    const data = await c.context.internalAdapter.findVerificationValue(state);
    if (!data) {
      c.context.logger.error("State Mismatch. Verification not found", { state });
      const errorURL = ((_f = c.context.options.onAPIError) == null ? void 0 : _f.errorURL) || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=please_restart_the_process`);
    }
    parsedData = stateDataSchema.parse(JSON.parse(data.value));
    const stateCookie = c.context.createAuthCookie("state");
    const stateCookieValue = await c.getSignedCookie(stateCookie.name, c.context.secret);
    if (!skipStateCookieCheck && (!stateCookieValue || stateCookieValue !== state)) {
      const errorURL = ((_g = c.context.options.onAPIError) == null ? void 0 : _g.errorURL) || `${c.context.baseURL}/error`;
      throw c.redirect(`${errorURL}?error=state_mismatch`);
    }
    c.setCookie(stateCookie.name, "", { maxAge: 0 });
    await c.context.internalAdapter.deleteVerificationValue(data.id);
  }
  if (!parsedData.errorURL) parsedData.errorURL = ((_h = c.context.options.onAPIError) == null ? void 0 : _h.errorURL) || `${c.context.baseURL}/error`;
  if (parsedData.expiresAt < Date.now()) {
    const errorURL = ((_i = c.context.options.onAPIError) == null ? void 0 : _i.errorURL) || `${c.context.baseURL}/error`;
    throw c.redirect(`${errorURL}?error=please_restart_the_process`);
  }
  if (parsedData) await setOAuthState(parsedData);
  return parsedData;
}
const HIDE_METADATA = { scope: "server" };
const LOCALHOST_IP = "127.0.0.1";
function getIp(req, options) {
  var _a, _b, _c, _d;
  if ((_b = (_a = options.advanced) == null ? void 0 : _a.ipAddress) == null ? void 0 : _b.disableIpTracking) return null;
  const headers = "headers" in req ? req.headers : req;
  const ipHeaders = ((_d = (_c = options.advanced) == null ? void 0 : _c.ipAddress) == null ? void 0 : _d.ipAddressHeaders) || ["x-forwarded-for"];
  for (const key of ipHeaders) {
    const value = "get" in headers ? headers.get(key) : headers[key];
    if (typeof value === "string") {
      const ip = value.split(",")[0].trim();
      if (isValidIP(ip)) return ip;
    }
  }
  if (isTest() || isDevelopment()) return LOCALHOST_IP;
  return null;
}
function isValidIP(ip) {
  if (z.ipv4().safeParse(ip).success) return true;
  if (z.ipv6().safeParse(ip).success) return true;
  return false;
}
const originCheckMiddleware = createAuthMiddleware(async (ctx) => {
  var _a, _b, _c, _d;
  if (((_a = ctx.request) == null ? void 0 : _a.method) === "GET" || ((_b = ctx.request) == null ? void 0 : _b.method) === "OPTIONS" || ((_c = ctx.request) == null ? void 0 : _c.method) === "HEAD" || !ctx.request) return;
  const headers = (_d = ctx.request) == null ? void 0 : _d.headers;
  const { body, query } = ctx;
  const originHeader = (headers == null ? void 0 : headers.get("origin")) || (headers == null ? void 0 : headers.get("referer")) || "";
  const callbackURL = (body == null ? void 0 : body.callbackURL) || (query == null ? void 0 : query.callbackURL);
  const redirectURL = body == null ? void 0 : body.redirectTo;
  const errorCallbackURL = body == null ? void 0 : body.errorCallbackURL;
  const newUserCallbackURL = body == null ? void 0 : body.newUserCallbackURL;
  const useCookies = headers == null ? void 0 : headers.has("cookie");
  const validateURL = (url, label) => {
    if (!url) return;
    if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
      ctx.context.logger.error(`Invalid ${label}: ${url}`);
      ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
      throw new APIError("FORBIDDEN", { message: `Invalid ${label}` });
    }
  };
  if (useCookies && !ctx.context.skipCSRFCheck && !ctx.context.skipOriginCheck) {
    if (!originHeader || originHeader === "null") throw new APIError("FORBIDDEN", { message: "Missing or null Origin" });
    validateURL(originHeader, "origin");
  }
  callbackURL && validateURL(callbackURL, "callbackURL");
  redirectURL && validateURL(redirectURL, "redirectURL");
  errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
  newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
const originCheck = (getValue) => createAuthMiddleware(async (ctx) => {
  if (!ctx.request) return;
  const callbackURL = getValue(ctx);
  const validateURL = (url, label) => {
    if (!url) return;
    if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
      ctx.context.logger.error(`Invalid ${label}: ${url}`);
      ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config
`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
      throw new APIError("FORBIDDEN", { message: `Invalid ${label}` });
    }
  };
  const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
  for (const url of callbacks) validateURL(url, "callbackURL");
});
function escapeRegExpChar(char) {
  if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") return `\\${char}`;
  else return char;
}
function escapeRegExpString(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) result += escapeRegExpChar(str[i]);
  return result;
}
function transform(pattern, separator = true) {
  if (Array.isArray(pattern)) return `(?:${pattern.map((p) => `^${transform(p, separator)}$`).join("|")})`;
  let separatorSplitter = "";
  let separatorMatcher = "";
  let wildcard = ".";
  if (separator === true) {
    separatorSplitter = "/";
    separatorMatcher = "[/\\\\]";
    wildcard = "[^/\\\\]";
  } else if (separator) {
    separatorSplitter = separator;
    separatorMatcher = escapeRegExpString(separatorSplitter);
    if (separatorMatcher.length > 1) {
      separatorMatcher = `(?:${separatorMatcher})`;
      wildcard = `((?!${separatorMatcher}).)`;
    } else wildcard = `[^${separatorMatcher}]`;
  }
  let requiredSeparator = separator ? `${separatorMatcher}+?` : "";
  let optionalSeparator = separator ? `${separatorMatcher}*?` : "";
  let segments = separator ? pattern.split(separatorSplitter) : [pattern];
  let result = "";
  for (let s = 0; s < segments.length; s++) {
    let segment = segments[s];
    let nextSegment = segments[s + 1];
    let currentSeparator = "";
    if (!segment && s > 0) continue;
    if (separator) if (s === segments.length - 1) currentSeparator = optionalSeparator;
    else if (nextSegment !== "**") currentSeparator = requiredSeparator;
    else currentSeparator = "";
    if (separator && segment === "**") {
      if (currentSeparator) {
        result += s === 0 ? "" : currentSeparator;
        result += `(?:${wildcard}*?${currentSeparator})*?`;
      }
      continue;
    }
    for (let c = 0; c < segment.length; c++) {
      let char = segment[c];
      if (char === "\\") {
        if (c < segment.length - 1) {
          result += escapeRegExpChar(segment[c + 1]);
          c++;
        }
      } else if (char === "?") result += wildcard;
      else if (char === "*") result += `${wildcard}*?`;
      else result += escapeRegExpChar(char);
    }
    result += currentSeparator;
  }
  return result;
}
function isMatch(regexp, sample) {
  if (typeof sample !== "string") throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
  return regexp.test(sample);
}
function wildcardMatch(pattern, options) {
  if (typeof pattern !== "string" && !Array.isArray(pattern)) throw new TypeError(`The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`);
  if (typeof options === "string" || typeof options === "boolean") options = { separator: options };
  if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) throw new TypeError(`The second argument must be an options object or a string/boolean separator, but ${typeof options} given`);
  options = options || {};
  if (options.separator === "\\") throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");
  let regexpPattern = transform(pattern, options.separator);
  let regexp = new RegExp(`^${regexpPattern}$`, options.flags);
  let fn = isMatch.bind(null, regexp);
  fn.options = options;
  fn.pattern = pattern;
  fn.regexp = regexp;
  return fn;
}
function shouldRateLimit(max, window2, rateLimitData) {
  const now2 = Date.now();
  const windowInMs = window2 * 1e3;
  return now2 - rateLimitData.lastRequest < windowInMs && rateLimitData.count >= max;
}
function rateLimitResponse(retryAfter) {
  return new Response(JSON.stringify({ message: "Too many requests. Please try again later." }), {
    status: 429,
    statusText: "Too Many Requests",
    headers: { "X-Retry-After": retryAfter.toString() }
  });
}
function getRetryAfter(lastRequest, window2) {
  const now2 = Date.now();
  const windowInMs = window2 * 1e3;
  return Math.ceil((lastRequest + windowInMs - now2) / 1e3);
}
function createDBStorage(ctx) {
  const model = "rateLimit";
  const db2 = ctx.adapter;
  return {
    get: async (key) => {
      const data = (await db2.findMany({
        model,
        where: [{
          field: "key",
          value: key
        }]
      }))[0];
      if (typeof (data == null ? void 0 : data.lastRequest) === "bigint") data.lastRequest = Number(data.lastRequest);
      return data;
    },
    set: async (key, value, _update) => {
      try {
        if (_update) await db2.updateMany({
          model,
          where: [{
            field: "key",
            value: key
          }],
          update: {
            count: value.count,
            lastRequest: value.lastRequest
          }
        });
        else await db2.create({
          model,
          data: {
            key,
            count: value.count,
            lastRequest: value.lastRequest
          }
        });
      } catch (e) {
        ctx.logger.error("Error setting rate limit", e);
      }
    }
  };
}
const memory = /* @__PURE__ */ new Map();
function getRateLimitStorage(ctx, rateLimitSettings) {
  var _a;
  if ((_a = ctx.options.rateLimit) == null ? void 0 : _a.customStorage) return ctx.options.rateLimit.customStorage;
  const storage = ctx.rateLimit.storage;
  if (storage === "secondary-storage") return {
    get: async (key) => {
      var _a2;
      const data = await ((_a2 = ctx.options.secondaryStorage) == null ? void 0 : _a2.get(key));
      return data ? safeJSONParse(data) : void 0;
    },
    set: async (key, value, _update) => {
      var _a2, _b, _c;
      const ttl = (rateLimitSettings == null ? void 0 : rateLimitSettings.window) ?? ((_a2 = ctx.options.rateLimit) == null ? void 0 : _a2.window) ?? 10;
      await ((_c = (_b = ctx.options.secondaryStorage) == null ? void 0 : _b.set) == null ? void 0 : _c.call(_b, key, JSON.stringify(value), ttl));
    }
  };
  else if (storage === "memory") return {
    async get(key) {
      return memory.get(key);
    },
    async set(key, value, _update) {
      memory.set(key, value);
    }
  };
  return createDBStorage(ctx);
}
async function onRequestRateLimit(req, ctx) {
  if (!ctx.rateLimit.enabled) return;
  const path = new URL(req.url).pathname.replace(ctx.options.basePath || "/api/auth", "").replace(/\/+$/, "");
  let window2 = ctx.rateLimit.window;
  let max = ctx.rateLimit.max;
  const ip = getIp(req, ctx.options);
  if (!ip) return;
  const key = ip + path;
  const specialRule = getDefaultSpecialRules().find((rule) => rule.pathMatcher(path));
  if (specialRule) {
    window2 = specialRule.window;
    max = specialRule.max;
  }
  for (const plugin of ctx.options.plugins || []) if (plugin.rateLimit) {
    const matchedRule = plugin.rateLimit.find((rule) => rule.pathMatcher(path));
    if (matchedRule) {
      window2 = matchedRule.window;
      max = matchedRule.max;
      break;
    }
  }
  if (ctx.rateLimit.customRules) {
    const _path = Object.keys(ctx.rateLimit.customRules).find((p) => {
      if (p.includes("*")) return wildcardMatch(p)(path);
      return p === path;
    });
    if (_path) {
      const customRule = ctx.rateLimit.customRules[_path];
      const resolved = typeof customRule === "function" ? await customRule(req) : customRule;
      if (resolved) {
        window2 = resolved.window;
        max = resolved.max;
      }
      if (resolved === false) return;
    }
  }
  const storage = getRateLimitStorage(ctx, { window: window2 });
  const data = await storage.get(key);
  const now2 = Date.now();
  if (!data) await storage.set(key, {
    key,
    count: 1,
    lastRequest: now2
  });
  else {
    const timeSinceLastRequest = now2 - data.lastRequest;
    if (shouldRateLimit(max, window2, data)) return rateLimitResponse(getRetryAfter(data.lastRequest, window2));
    else if (timeSinceLastRequest > window2 * 1e3) await storage.set(key, {
      ...data,
      count: 1,
      lastRequest: now2
    }, true);
    else await storage.set(key, {
      ...data,
      count: data.count + 1,
      lastRequest: now2
    }, true);
  }
}
function getDefaultSpecialRules() {
  return [{
    pathMatcher(path) {
      return path.startsWith("/sign-in") || path.startsWith("/sign-up") || path.startsWith("/change-password") || path.startsWith("/change-email");
    },
    window: 10,
    max: 3
  }];
}
const getDate = (span, unit = "ms") => {
  return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
const cache = /* @__PURE__ */ new WeakMap();
function parseOutputData(data, schema2) {
  const fields = schema2.fields;
  const parsedData = {};
  for (const key in data) {
    const field = fields[key];
    if (!field) {
      parsedData[key] = data[key];
      continue;
    }
    if (field.returned === false) continue;
    parsedData[key] = data[key];
  }
  return parsedData;
}
function getAllFields(options, table) {
  var _a, _b;
  if (!cache.has(options)) cache.set(options, /* @__PURE__ */ new Map());
  const tableCache = cache.get(options);
  if (tableCache.has(table)) return tableCache.get(table);
  let schema2 = {
    ...table === "user" ? (_a = options.user) == null ? void 0 : _a.additionalFields : {},
    ...table === "session" ? (_b = options.session) == null ? void 0 : _b.additionalFields : {}
  };
  for (const plugin of options.plugins || []) if (plugin.schema && plugin.schema[table]) schema2 = {
    ...schema2,
    ...plugin.schema[table].fields
  };
  cache.get(options).set(table, schema2);
  return schema2;
}
function parseUserOutput(options, user2) {
  return {
    ...parseOutputData(user2, { fields: getAllFields(options, "user") }),
    id: user2.id
  };
}
function parseAccountOutput(options, account2) {
  return parseOutputData(account2, { fields: getAllFields(options, "account") });
}
function parseSessionOutput(options, session2) {
  return parseOutputData(session2, { fields: getAllFields(options, "session") });
}
function parseInputData(data, schema2) {
  var _a, _b, _c, _d;
  const action = schema2.action || "create";
  const fields = schema2.fields;
  const parsedData = Object.assign(/* @__PURE__ */ Object.create(null), null);
  for (const key in fields) {
    if (key in data) {
      if (fields[key].input === false) {
        if (fields[key].defaultValue !== void 0) {
          if (action !== "update") {
            parsedData[key] = fields[key].defaultValue;
            continue;
          }
        }
        if (data[key]) throw new APIError("BAD_REQUEST", { message: `${key} is not allowed to be set` });
        continue;
      }
      if (((_a = fields[key].validator) == null ? void 0 : _a.input) && data[key] !== void 0) {
        const result = fields[key].validator.input["~standard"].validate(data[key]);
        if (result instanceof Promise) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Async validation is not supported for additional fields" });
        if ("issues" in result && result.issues) throw new APIError("BAD_REQUEST", { message: ((_b = result.issues[0]) == null ? void 0 : _b.message) || "Validation Error" });
        parsedData[key] = result.value;
        continue;
      }
      if (((_c = fields[key].transform) == null ? void 0 : _c.input) && data[key] !== void 0) {
        parsedData[key] = (_d = fields[key].transform) == null ? void 0 : _d.input(data[key]);
        continue;
      }
      parsedData[key] = data[key];
      continue;
    }
    if (fields[key].defaultValue !== void 0 && action === "create") {
      if (typeof fields[key].defaultValue === "function") {
        parsedData[key] = fields[key].defaultValue();
        continue;
      }
      parsedData[key] = fields[key].defaultValue;
      continue;
    }
    if (fields[key].required && action === "create") throw new APIError("BAD_REQUEST", { message: `${key} is required` });
  }
  return parsedData;
}
function parseUserInput(options, user2 = {}, action) {
  return parseInputData(user2, {
    fields: getAllFields(options, "user"),
    action
  });
}
function parseAdditionalUserInput(options, user2) {
  const schema2 = getAllFields(options, "user");
  return parseInputData(user2 || {}, { fields: schema2 });
}
function parseAccountInput(options, account2) {
  return parseInputData(account2, { fields: getAllFields(options, "account") });
}
function parseSessionInput(options, session2) {
  return parseInputData(session2, { fields: getAllFields(options, "session") });
}
function mergeSchema(schema2, newSchema) {
  var _a, _b, _c;
  if (!newSchema) return schema2;
  for (const table in newSchema) {
    const newModelName = (_a = newSchema[table]) == null ? void 0 : _a.modelName;
    if (newModelName) schema2[table].modelName = newModelName;
    for (const field in schema2[table].fields) {
      const newField = (_c = (_b = newSchema[table]) == null ? void 0 : _b.fields) == null ? void 0 : _c[field];
      if (!newField) continue;
      schema2[table].fields[field].fieldName = newField;
    }
  }
  return schema2;
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (all, symbols) => {
  let target = {};
  for (var name in all) {
    __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  }
  return target;
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
      key = keys[i];
      if (!__hasOwnProp.call(to, key) && key !== except) {
        __defProp(to, key, {
          get: ((k) => from[k]).bind(null, key),
          enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable
        });
      }
    }
  }
  return to;
};
var __reExport = (target, mod, secondTarget, symbols) => {
  __copyProps(target, mod, "default");
};
async function getBaseAdapter(options, handleDirectDatabase) {
  let adapter;
  if (!options.database) {
    const tables = getAuthTables(options);
    const memoryDB = Object.keys(tables).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    const { memoryAdapter } = await import("./index-hexjW9d6.js");
    adapter = memoryAdapter(memoryDB)(options);
  } else if (typeof options.database === "function") adapter = options.database(options);
  else adapter = await handleDirectDatabase(options);
  if (!adapter.transaction) {
    logger.warn("Adapter does not correctly implement transaction function, patching it automatically. Please update your adapter implementation.");
    adapter.transaction = async (cb) => {
      return cb(adapter);
    };
  }
  return adapter;
}
async function getAdapter(options) {
  return getBaseAdapter(options, async (opts) => {
    const { createKyselyAdapter: createKyselyAdapter2 } = await import("./index-tFryweCX.js");
    const { kysely, databaseType, transaction } = await createKyselyAdapter2(opts);
    if (!kysely) throw new BetterAuthError("Failed to initialize database adapter");
    const { kyselyAdapter } = await import("./index-tFryweCX.js");
    return kyselyAdapter(kysely, {
      type: databaseType || "sqlite",
      debugLogs: opts.database && "debugLogs" in opts.database ? opts.database.debugLogs : false,
      transaction
    })(opts);
  });
}
const createFieldAttribute = (type, config2) => {
  return {
    type,
    ...config2
  };
};
function convertToDB(fields, values) {
  let result = values.id ? { id: values.id } : {};
  for (const key in fields) {
    const field = fields[key];
    const value = values[key];
    if (value === void 0) continue;
    result[field.fieldName || key] = value;
  }
  return result;
}
function convertFromDB(fields, values) {
  if (!values) return null;
  let result = { id: values.id };
  for (const [key, value] of Object.entries(fields)) result[key] = values[value.fieldName || key];
  return result;
}
function getWithHooks(adapter, ctx) {
  const hooks = ctx.hooks;
  async function createWithHooks(data, model, customCreateFn) {
    var _a, _b, _c, _d;
    const context = await getCurrentAuthContext().catch(() => null);
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = (_b = (_a = hook[model]) == null ? void 0 : _a.create) == null ? void 0 : _b.before;
      if (toRun) {
        const result = await toRun(actualData, context);
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    const customCreated = customCreateFn ? await customCreateFn.fn(actualData) : null;
    const created = !customCreateFn || customCreateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).create({
      model,
      data: actualData,
      forceAllowId: true
    }) : customCreated;
    for (const hook of hooks || []) {
      const toRun = (_d = (_c = hook[model]) == null ? void 0 : _c.create) == null ? void 0 : _d.after;
      if (toRun) await toRun(created, context);
    }
    return created;
  }
  async function updateWithHooks(data, where, model, customUpdateFn) {
    var _a, _b, _c, _d;
    const context = await getCurrentAuthContext().catch(() => null);
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = (_b = (_a = hook[model]) == null ? void 0 : _a.update) == null ? void 0 : _b.before;
      if (toRun) {
        const result = await toRun(data, context);
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).update({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const hook of hooks || []) {
      const toRun = (_d = (_c = hook[model]) == null ? void 0 : _c.update) == null ? void 0 : _d.after;
      if (toRun) await toRun(updated, context);
    }
    return updated;
  }
  async function updateManyWithHooks(data, where, model, customUpdateFn) {
    var _a, _b, _c, _d;
    const context = await getCurrentAuthContext().catch(() => null);
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = (_b = (_a = hook[model]) == null ? void 0 : _a.update) == null ? void 0 : _b.before;
      if (toRun) {
        const result = await toRun(data, context);
        if (result === false) return null;
        if (typeof result === "object" && "data" in result) actualData = {
          ...actualData,
          ...result.data
        };
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).updateMany({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const hook of hooks || []) {
      const toRun = (_d = (_c = hook[model]) == null ? void 0 : _c.update) == null ? void 0 : _d.after;
      if (toRun) await toRun(updated, context);
    }
    return updated;
  }
  async function deleteWithHooks(where, model, customDeleteFn) {
    var _a, _b, _c, _d;
    const context = await getCurrentAuthContext().catch(() => null);
    let entityToDelete = null;
    try {
      entityToDelete = (await (await getCurrentAdapter(adapter)).findMany({
        model,
        where,
        limit: 1
      }))[0] || null;
    } catch {
    }
    if (entityToDelete) for (const hook of hooks || []) {
      const toRun = (_b = (_a = hook[model]) == null ? void 0 : _a.delete) == null ? void 0 : _b.before;
      if (toRun) {
        if (await toRun(entityToDelete, context) === false) return null;
      }
    }
    const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
    const deleted = !customDeleteFn || customDeleteFn.executeMainFn ? await (await getCurrentAdapter(adapter)).delete({
      model,
      where
    }) : customDeleted;
    if (entityToDelete) for (const hook of hooks || []) {
      const toRun = (_d = (_c = hook[model]) == null ? void 0 : _c.delete) == null ? void 0 : _d.after;
      if (toRun) await toRun(entityToDelete, context);
    }
    return deleted;
  }
  async function deleteManyWithHooks(where, model, customDeleteFn) {
    var _a, _b, _c, _d;
    const context = await getCurrentAuthContext().catch(() => null);
    let entitiesToDelete = [];
    try {
      entitiesToDelete = await (await getCurrentAdapter(adapter)).findMany({
        model,
        where
      });
    } catch {
    }
    for (const entity of entitiesToDelete) for (const hook of hooks || []) {
      const toRun = (_b = (_a = hook[model]) == null ? void 0 : _a.delete) == null ? void 0 : _b.before;
      if (toRun) {
        if (await toRun(entity, context) === false) return null;
      }
    }
    const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
    const deleted = !customDeleteFn || customDeleteFn.executeMainFn ? await (await getCurrentAdapter(adapter)).deleteMany({
      model,
      where
    }) : customDeleted;
    for (const entity of entitiesToDelete) for (const hook of hooks || []) {
      const toRun = (_d = (_c = hook[model]) == null ? void 0 : _c.delete) == null ? void 0 : _d.after;
      if (toRun) await toRun(entity, context);
    }
    return deleted;
  }
  return {
    createWithHooks,
    updateWithHooks,
    updateManyWithHooks,
    deleteWithHooks,
    deleteManyWithHooks
  };
}
const createInternalAdapter = (adapter, ctx) => {
  var _a;
  const logger2 = ctx.logger;
  const options = ctx.options;
  const secondaryStorage = options.secondaryStorage;
  const sessionExpiration = ((_a = options.session) == null ? void 0 : _a.expiresIn) || 3600 * 24 * 7;
  const { createWithHooks, updateWithHooks, updateManyWithHooks, deleteWithHooks, deleteManyWithHooks } = getWithHooks(adapter, ctx);
  async function refreshUserSessions(user2) {
    if (!secondaryStorage) return;
    const listRaw = await secondaryStorage.get(`active-sessions-${user2.id}`);
    if (!listRaw) return;
    const now2 = Date.now();
    const validSessions = (safeJSONParse(listRaw) || []).filter((s) => s.expiresAt > now2);
    await Promise.all(validSessions.map(async ({ token }) => {
      const cached = await secondaryStorage.get(token);
      if (!cached) return;
      const parsed = safeJSONParse(cached);
      if (!parsed) return;
      const sessionTTL = Math.max(Math.floor(new Date(parsed.session.expiresAt).getTime() - now2) / 1e3, 0);
      await secondaryStorage.set(token, JSON.stringify({
        session: parsed.session,
        user: user2
      }), Math.floor(sessionTTL));
    }));
  }
  return {
    createOAuthUser: async (user2, account2) => {
      return runWithTransaction(adapter, async () => {
        const createdUser = await createWithHooks({
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...user2
        }, "user", void 0);
        return {
          user: createdUser,
          account: await createWithHooks({
            ...account2,
            userId: createdUser.id,
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }, "account", void 0)
        };
      });
    },
    createUser: async (user2) => {
      var _a2;
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...user2,
        email: (_a2 = user2.email) == null ? void 0 : _a2.toLowerCase()
      }, "user", void 0);
    },
    createAccount: async (account2) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...account2
      }, "account", void 0);
    },
    listSessions: async (userId) => {
      if (secondaryStorage) {
        const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
        if (!currentList) return [];
        const list = safeJSONParse(currentList) || [];
        const now2 = Date.now();
        const validSessions = list.filter((s) => s.expiresAt > now2);
        const sessions = [];
        for (const session2 of validSessions) {
          const sessionStringified = await secondaryStorage.get(session2.token);
          if (sessionStringified) {
            const s = safeJSONParse(sessionStringified);
            if (!s) return [];
            const parsedSession = parseSessionOutput(ctx.options, {
              ...s.session,
              expiresAt: new Date(s.session.expiresAt)
            });
            sessions.push(parsedSession);
          }
        }
        return sessions;
      }
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "session",
        where: [{
          field: "userId",
          value: userId
        }]
      });
    },
    listUsers: async (limit, offset, sortBy, where) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "user",
        limit,
        offset,
        sortBy,
        where
      });
    },
    countTotalUsers: async (where) => {
      const total = await (await getCurrentAdapter(adapter)).count({
        model: "user",
        where
      });
      if (typeof total === "string") return parseInt(total);
      return total;
    },
    deleteUser: async (userId) => {
      var _a2;
      if (!secondaryStorage || ((_a2 = options.session) == null ? void 0 : _a2.storeSessionInDatabase)) await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "session", void 0);
      await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "account", void 0);
      await deleteWithHooks([{
        field: "id",
        value: userId
      }], "user", void 0);
    },
    createSession: async (userId, dontRememberMe, override, overrideAll) => {
      var _a2, _b;
      const ctx$1 = await getCurrentAuthContext().catch(() => null);
      const headers = (ctx$1 == null ? void 0 : ctx$1.headers) || ((_a2 = ctx$1 == null ? void 0 : ctx$1.request) == null ? void 0 : _a2.headers);
      const { id: _, ...rest } = override || {};
      const defaultAdditionalFields = parseSessionInput((ctx$1 == null ? void 0 : ctx$1.context.options) ?? options, {});
      const data = {
        ipAddress: (ctx$1 == null ? void 0 : ctx$1.request) || (ctx$1 == null ? void 0 : ctx$1.headers) ? getIp((ctx$1 == null ? void 0 : ctx$1.request) || (ctx$1 == null ? void 0 : ctx$1.headers), ctx$1 == null ? void 0 : ctx$1.context.options) || "" : "",
        userAgent: (headers == null ? void 0 : headers.get("user-agent")) || "",
        ...rest,
        expiresAt: dontRememberMe ? getDate(3600 * 24, "sec") : getDate(sessionExpiration, "sec"),
        userId,
        token: generateId(32),
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...defaultAdditionalFields,
        ...overrideAll ? rest : {}
      };
      return await createWithHooks(data, "session", secondaryStorage ? {
        fn: async (sessionData) => {
          var _a3;
          const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
          let list = [];
          const now2 = Date.now();
          if (currentList) {
            list = safeJSONParse(currentList) || [];
            list = list.filter((session2) => session2.expiresAt > now2);
          }
          const sorted = list.sort((a, b) => a.expiresAt - b.expiresAt);
          let furthestSessionExp = (_a3 = sorted.at(-1)) == null ? void 0 : _a3.expiresAt;
          sorted.push({
            token: data.token,
            expiresAt: data.expiresAt.getTime()
          });
          if (!furthestSessionExp || furthestSessionExp < data.expiresAt.getTime()) furthestSessionExp = data.expiresAt.getTime();
          const furthestSessionTTL = Math.max(Math.floor((furthestSessionExp - now2) / 1e3), 0);
          if (furthestSessionTTL > 0) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(sorted), furthestSessionTTL);
          const user2 = await adapter.findOne({
            model: "user",
            where: [{
              field: "id",
              value: userId
            }]
          });
          const sessionTTL = Math.max(Math.floor((data.expiresAt.getTime() - now2) / 1e3), 0);
          if (sessionTTL > 0) await secondaryStorage.set(data.token, JSON.stringify({
            session: sessionData,
            user: user2
          }), sessionTTL);
          return sessionData;
        },
        executeMainFn: (_b = options.session) == null ? void 0 : _b.storeSessionInDatabase
      } : void 0);
    },
    findSession: async (token) => {
      var _a2;
      if (secondaryStorage) {
        const sessionStringified = await secondaryStorage.get(token);
        if (!sessionStringified && !((_a2 = options.session) == null ? void 0 : _a2.storeSessionInDatabase)) return null;
        if (sessionStringified) {
          const s = safeJSONParse(sessionStringified);
          if (!s) return null;
          return {
            session: parseSessionOutput(ctx.options, {
              ...s.session,
              expiresAt: new Date(s.session.expiresAt),
              createdAt: new Date(s.session.createdAt),
              updatedAt: new Date(s.session.updatedAt)
            }),
            user: parseUserOutput(ctx.options, {
              ...s.user,
              createdAt: new Date(s.user.createdAt),
              updatedAt: new Date(s.user.updatedAt)
            })
          };
        }
      }
      const result = await (await getCurrentAdapter(adapter)).findOne({
        model: "session",
        where: [{
          value: token,
          field: "token"
        }],
        join: { user: true }
      });
      if (!result) return null;
      const { user: user2, ...session2 } = result;
      if (!user2) return null;
      return {
        session: parseSessionOutput(ctx.options, session2),
        user: parseUserOutput(ctx.options, user2)
      };
    },
    findSessions: async (sessionTokens) => {
      if (secondaryStorage) {
        const sessions$1 = [];
        for (const sessionToken of sessionTokens) {
          const sessionStringified = await secondaryStorage.get(sessionToken);
          if (sessionStringified) {
            const s = safeJSONParse(sessionStringified);
            if (!s) return [];
            const session2 = {
              session: {
                ...s.session,
                expiresAt: new Date(s.session.expiresAt)
              },
              user: {
                ...s.user,
                createdAt: new Date(s.user.createdAt),
                updatedAt: new Date(s.user.updatedAt)
              }
            };
            sessions$1.push(session2);
          }
        }
        return sessions$1;
      }
      const sessions = await (await getCurrentAdapter(adapter)).findMany({
        model: "session",
        where: [{
          field: "token",
          value: sessionTokens,
          operator: "in"
        }],
        join: { user: true }
      });
      if (!sessions.length) return [];
      if (sessions.some((session2) => !session2.user)) return [];
      return sessions.map((_session) => {
        const { user: user2, ...session2 } = _session;
        return {
          session: session2,
          user: user2
        };
      });
    },
    updateSession: async (sessionToken, session2) => {
      var _a2;
      return await updateWithHooks(session2, [{
        field: "token",
        value: sessionToken
      }], "session", secondaryStorage ? {
        async fn(data) {
          const currentSession = await secondaryStorage.get(sessionToken);
          let updatedSession = null;
          if (currentSession) {
            const parsedSession = safeJSONParse(currentSession);
            if (!parsedSession) return null;
            updatedSession = {
              ...parsedSession.session,
              ...data
            };
            return updatedSession;
          } else return null;
        },
        executeMainFn: (_a2 = options.session) == null ? void 0 : _a2.storeSessionInDatabase
      } : void 0);
    },
    deleteSession: async (token) => {
      var _a2, _b, _c;
      if (secondaryStorage) {
        const data = await secondaryStorage.get(token);
        if (data) {
          const { session: session2 } = safeJSONParse(data) ?? {};
          if (!session2) {
            logger2.error("Session not found in secondary storage");
            return;
          }
          const userId = session2.userId;
          const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
          if (currentList) {
            let list = safeJSONParse(currentList) || [];
            const now2 = Date.now();
            const filtered = list.filter((session$1) => session$1.expiresAt > now2 && session$1.token !== token);
            const furthestSessionExp = (_a2 = filtered.sort((a, b) => a.expiresAt - b.expiresAt).at(-1)) == null ? void 0 : _a2.expiresAt;
            if (filtered.length > 0 && furthestSessionExp && furthestSessionExp > Date.now()) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(filtered), Math.floor((furthestSessionExp - now2) / 1e3));
            else await secondaryStorage.delete(`active-sessions-${userId}`);
          } else logger2.error("Active sessions list not found in secondary storage");
        }
        await secondaryStorage.delete(token);
        if (!((_b = options.session) == null ? void 0 : _b.storeSessionInDatabase) || ((_c = ctx.options.session) == null ? void 0 : _c.preserveSessionInDatabase)) return;
      }
      await deleteWithHooks([{
        field: "token",
        value: token
      }], "session", void 0);
    },
    deleteAccounts: async (userId) => {
      await deleteManyWithHooks([{
        field: "userId",
        value: userId
      }], "account", void 0);
    },
    deleteAccount: async (accountId) => {
      await deleteWithHooks([{
        field: "id",
        value: accountId
      }], "account", void 0);
    },
    deleteSessions: async (userIdOrSessionTokens) => {
      var _a2, _b;
      if (secondaryStorage) {
        if (typeof userIdOrSessionTokens === "string") {
          const activeSession = await secondaryStorage.get(`active-sessions-${userIdOrSessionTokens}`);
          const sessions = activeSession ? safeJSONParse(activeSession) : [];
          if (!sessions) return;
          for (const session2 of sessions) await secondaryStorage.delete(session2.token);
          await secondaryStorage.delete(`active-sessions-${userIdOrSessionTokens}`);
        } else for (const sessionToken of userIdOrSessionTokens) if (await secondaryStorage.get(sessionToken)) await secondaryStorage.delete(sessionToken);
        if (!((_a2 = options.session) == null ? void 0 : _a2.storeSessionInDatabase) || ((_b = ctx.options.session) == null ? void 0 : _b.preserveSessionInDatabase)) return;
      }
      await deleteManyWithHooks([{
        field: Array.isArray(userIdOrSessionTokens) ? "token" : "userId",
        value: userIdOrSessionTokens,
        operator: Array.isArray(userIdOrSessionTokens) ? "in" : void 0
      }], "session", void 0);
    },
    findOAuthUser: async (email, accountId, providerId) => {
      const account2 = await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          value: accountId,
          field: "accountId"
        }],
        join: { user: true }
      }).then((accounts) => {
        return accounts.find((a) => a.providerId === providerId);
      });
      if (account2) if (account2.user) return {
        user: account2.user,
        accounts: [account2]
      };
      else {
        const user2 = await (await getCurrentAdapter(adapter)).findOne({
          model: "user",
          where: [{
            value: email.toLowerCase(),
            field: "email"
          }]
        });
        if (user2) return {
          user: user2,
          accounts: [account2]
        };
        return null;
      }
      else {
        const user2 = await (await getCurrentAdapter(adapter)).findOne({
          model: "user",
          where: [{
            value: email.toLowerCase(),
            field: "email"
          }]
        });
        if (user2) return {
          user: user2,
          accounts: await (await getCurrentAdapter(adapter)).findMany({
            model: "account",
            where: [{
              value: user2.id,
              field: "userId"
            }]
          }) || []
        };
        else return null;
      }
    },
    findUserByEmail: async (email, options$1) => {
      const result = await (await getCurrentAdapter(adapter)).findOne({
        model: "user",
        where: [{
          value: email.toLowerCase(),
          field: "email"
        }],
        join: { ...(options$1 == null ? void 0 : options$1.includeAccounts) ? { account: true } : {} }
      });
      if (!result) return null;
      const { account: accounts, ...user2 } = result;
      return {
        user: user2,
        accounts: accounts ?? []
      };
    },
    findUserById: async (userId) => {
      if (!userId) return null;
      return await (await getCurrentAdapter(adapter)).findOne({
        model: "user",
        where: [{
          field: "id",
          value: userId
        }]
      });
    },
    linkAccount: async (account2) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...account2
      }, "account", void 0);
    },
    updateUser: async (userId, data) => {
      const user2 = await updateWithHooks(data, [{
        field: "id",
        value: userId
      }], "user", void 0);
      await refreshUserSessions(user2);
      await refreshUserSessions(user2);
      return user2;
    },
    updateUserByEmail: async (email, data) => {
      const user2 = await updateWithHooks(data, [{
        field: "email",
        value: email.toLowerCase()
      }], "user", void 0);
      await refreshUserSessions(user2);
      await refreshUserSessions(user2);
      return user2;
    },
    updatePassword: async (userId, password) => {
      await updateManyWithHooks({ password }, [{
        field: "userId",
        value: userId
      }, {
        field: "providerId",
        value: "credential"
      }], "account", void 0);
    },
    findAccounts: async (userId) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          field: "userId",
          value: userId
        }]
      });
    },
    findAccount: async (accountId) => {
      return await (await getCurrentAdapter(adapter)).findOne({
        model: "account",
        where: [{
          field: "accountId",
          value: accountId
        }]
      });
    },
    findAccountByProviderId: async (accountId, providerId) => {
      return await (await getCurrentAdapter(adapter)).findOne({
        model: "account",
        where: [{
          field: "accountId",
          value: accountId
        }, {
          field: "providerId",
          value: providerId
        }]
      });
    },
    findAccountByUserId: async (userId) => {
      return await (await getCurrentAdapter(adapter)).findMany({
        model: "account",
        where: [{
          field: "userId",
          value: userId
        }]
      });
    },
    updateAccount: async (id, data) => {
      return await updateWithHooks(data, [{
        field: "id",
        value: id
      }], "account", void 0);
    },
    createVerificationValue: async (data) => {
      return await createWithHooks({
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...data
      }, "verification", void 0);
    },
    findVerificationValue: async (identifier) => {
      var _a2;
      const verification2 = await (await getCurrentAdapter(adapter)).findMany({
        model: "verification",
        where: [{
          field: "identifier",
          value: identifier
        }],
        sortBy: {
          field: "createdAt",
          direction: "desc"
        },
        limit: 1
      });
      if (!((_a2 = options.verification) == null ? void 0 : _a2.disableCleanup)) await deleteManyWithHooks([{
        field: "expiresAt",
        value: /* @__PURE__ */ new Date(),
        operator: "lt"
      }], "verification", void 0);
      return verification2[0];
    },
    deleteVerificationValue: async (id) => {
      await deleteWithHooks([{
        field: "id",
        value: id
      }], "verification", void 0);
    },
    deleteVerificationByIdentifier: async (identifier) => {
      await deleteWithHooks([{
        field: "identifier",
        value: identifier
      }], "verification", void 0);
    },
    updateVerificationValue: async (id, data) => {
      return await updateWithHooks(data, [{
        field: "id",
        value: id
      }], "verification", void 0);
    }
  };
};
function toZodSchema({ fields, isClientSide }) {
  const zodFields = Object.keys(fields).reduce((acc, key) => {
    const field = fields[key];
    if (!field) return acc;
    if (isClientSide && field.input === false) return acc;
    let schema2;
    if (field.type === "json") schema2 = z.json ? z.json() : z.any();
    else if (field.type === "string[]" || field.type === "number[]") schema2 = z.array(field.type === "string[]" ? z.string() : z.number());
    else if (Array.isArray(field.type)) schema2 = z.any();
    else schema2 = z[field.type]();
    if ((field == null ? void 0 : field.required) === false) schema2 = schema2.optional();
    if ((field == null ? void 0 : field.returned) === false) return acc;
    return {
      ...acc,
      [key]: schema2
    };
  }, {});
  return z.object(zodFields);
}
function getSchema(config2) {
  const tables = (0, db_exports.getAuthTables)(config2);
  let schema2 = {};
  for (const key in tables) {
    const table = tables[key];
    const fields = table.fields;
    let actualFields = {};
    Object.entries(fields).forEach(([key$1, field]) => {
      actualFields[field.fieldName || key$1] = field;
      if (field.references) {
        const refTable = tables[field.references.model];
        if (refTable) actualFields[field.fieldName || key$1].references = {
          ...field.references,
          model: refTable.modelName,
          field: field.references.field
        };
      }
    });
    if (schema2[table.modelName]) {
      schema2[table.modelName].fields = {
        ...schema2[table.modelName].fields,
        ...actualFields
      };
      continue;
    }
    schema2[table.modelName] = {
      fields: actualFields,
      order: table.order || Infinity
    };
  }
  return schema2;
}
function getKyselyDatabaseType(db2) {
  if (!db2) return null;
  if ("dialect" in db2) return getKyselyDatabaseType(db2.dialect);
  if ("createDriver" in db2) {
    if (db2 instanceof SqliteDialect) return "sqlite";
    if (db2 instanceof MysqlDialect) return "mysql";
    if (db2 instanceof PostgresDialect) return "postgres";
    if (db2 instanceof MssqlDialect) return "mssql";
  }
  if ("aggregate" in db2) return "sqlite";
  if ("getConnection" in db2) return "mysql";
  if ("connect" in db2) return "postgres";
  if ("fileControl" in db2) return "sqlite";
  if ("open" in db2 && "close" in db2 && "prepare" in db2) return "sqlite";
  return null;
}
const createKyselyAdapter = async (config2) => {
  const db2 = config2.database;
  if (!db2) return {
    kysely: null,
    databaseType: null,
    transaction: void 0
  };
  if ("db" in db2) return {
    kysely: db2.db,
    databaseType: db2.type,
    transaction: db2.transaction
  };
  if ("dialect" in db2) return {
    kysely: new Kysely({ dialect: db2.dialect }),
    databaseType: db2.type,
    transaction: db2.transaction
  };
  let dialect = void 0;
  const databaseType = getKyselyDatabaseType(db2);
  if ("createDriver" in db2) dialect = db2;
  if ("aggregate" in db2 && !("createSession" in db2)) dialect = new SqliteDialect({ database: db2 });
  if ("getConnection" in db2) dialect = new MysqlDialect(db2);
  if ("connect" in db2) dialect = new PostgresDialect({ pool: db2 });
  if ("fileControl" in db2) {
    const { BunSqliteDialect } = await import("./bun-sqlite-dialect-4sS2AgCo.js");
    dialect = new BunSqliteDialect({ database: db2 });
  }
  if ("createSession" in db2 && typeof window === "undefined") {
    let DatabaseSync = void 0;
    try {
      let nodeSqlite = "node:sqlite";
      ({ DatabaseSync } = await import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        nodeSqlite
      ));
    } catch (error2) {
      if (error2 !== null && typeof error2 === "object" && "code" in error2 && error2.code !== "ERR_UNKNOWN_BUILTIN_MODULE") throw error2;
    }
    if (DatabaseSync && db2 instanceof DatabaseSync) {
      const { NodeSqliteDialect } = await import("./node-sqlite-dialect-C1ZTH8k_.js");
      dialect = new NodeSqliteDialect({ database: db2 });
    }
  }
  return {
    kysely: dialect ? new Kysely({ dialect }) : null,
    databaseType,
    transaction: void 0
  };
};
const map = {
  postgres: {
    string: [
      "character varying",
      "varchar",
      "text",
      "uuid"
    ],
    number: [
      "int4",
      "integer",
      "bigint",
      "smallint",
      "numeric",
      "real",
      "double precision"
    ],
    boolean: ["bool", "boolean"],
    date: [
      "timestamptz",
      "timestamp",
      "date"
    ],
    json: ["json", "jsonb"]
  },
  mysql: {
    string: [
      "varchar",
      "text",
      "uuid"
    ],
    number: [
      "integer",
      "int",
      "bigint",
      "smallint",
      "decimal",
      "float",
      "double"
    ],
    boolean: ["boolean", "tinyint"],
    date: [
      "timestamp",
      "datetime",
      "date"
    ],
    json: ["json"]
  },
  sqlite: {
    string: ["TEXT"],
    number: ["INTEGER", "REAL"],
    boolean: ["INTEGER", "BOOLEAN"],
    date: ["DATE", "INTEGER"],
    json: ["TEXT"]
  },
  mssql: {
    string: [
      "varchar",
      "nvarchar",
      "uniqueidentifier"
    ],
    number: [
      "int",
      "bigint",
      "smallint",
      "decimal",
      "float",
      "double"
    ],
    boolean: ["bit", "smallint"],
    date: [
      "datetime2",
      "date",
      "datetime"
    ],
    json: ["varchar", "nvarchar"]
  }
};
function matchType(columnDataType, fieldType, dbType) {
  function normalize(type) {
    return type.toLowerCase().split("(")[0].trim();
  }
  if (fieldType === "string[]" || fieldType === "number[]") return columnDataType.toLowerCase().includes("json");
  const types2 = map[dbType];
  return (Array.isArray(fieldType) ? types2["string"].map((t) => t.toLowerCase()) : types2[fieldType].map((t) => t.toLowerCase())).includes(normalize(columnDataType));
}
async function getPostgresSchema(db2) {
  var _a;
  try {
    const result = await sql$2`SHOW search_path`.execute(db2);
    if ((_a = result.rows[0]) == null ? void 0 : _a.search_path) return result.rows[0].search_path.split(",").map((s) => s.trim()).map((s) => s.replace(/^["']|["']$/g, "")).filter((s) => !s.startsWith("$"))[0] || "public";
  } catch {
  }
  return "public";
}
async function getMigrations(config2) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const betterAuthSchema = getSchema(config2);
  const logger$1 = createLogger(config2.logger);
  let { kysely: db2, databaseType: dbType } = await createKyselyAdapter(config2);
  if (!dbType) {
    logger$1.warn("Could not determine database type, defaulting to sqlite. Please provide a type in the database options to avoid this.");
    dbType = "sqlite";
  }
  if (!db2) {
    logger$1.error("Only kysely adapter is supported for migrations. You can use `generate` command to generate the schema, if you're using a different adapter.");
    process.exit(1);
  }
  let currentSchema = "public";
  if (dbType === "postgres") {
    currentSchema = await getPostgresSchema(db2);
    logger$1.debug(`PostgreSQL migration: Using schema '${currentSchema}' (from search_path)`);
    try {
      if (!(await sql$2`
				SELECT schema_name 
				FROM information_schema.schemata 
				WHERE schema_name = ${currentSchema}
			`.execute(db2)).rows[0]) logger$1.warn(`Schema '${currentSchema}' does not exist. Tables will be inspected from available schemas. Consider creating the schema first or checking your database configuration.`);
    } catch (error2) {
      logger$1.debug(`Could not verify schema existence: ${error2 instanceof Error ? error2.message : String(error2)}`);
    }
  }
  const allTableMetadata = await db2.introspection.getTables();
  let tableMetadata = allTableMetadata;
  if (dbType === "postgres") try {
    const tablesInSchema = await sql$2`
				SELECT table_name 
				FROM information_schema.tables 
				WHERE table_schema = ${currentSchema}
				AND table_type = 'BASE TABLE'
			`.execute(db2);
    const tableNamesInSchema = new Set(tablesInSchema.rows.map((row) => row.table_name));
    tableMetadata = allTableMetadata.filter((table) => table.schema === currentSchema && tableNamesInSchema.has(table.name));
    logger$1.debug(`Found ${tableMetadata.length} table(s) in schema '${currentSchema}': ${tableMetadata.map((t) => t.name).join(", ") || "(none)"}`);
  } catch (error2) {
    logger$1.warn(`Could not filter tables by schema. Using all discovered tables. Error: ${error2 instanceof Error ? error2.message : String(error2)}`);
  }
  const toBeCreated = [];
  const toBeAdded = [];
  for (const [key, value] of Object.entries(betterAuthSchema)) {
    const table = tableMetadata.find((t) => t.name === key);
    if (!table) {
      const tIndex = toBeCreated.findIndex((t) => t.table === key);
      const tableData = {
        table: key,
        fields: value.fields,
        order: value.order || Infinity
      };
      const insertIndex = toBeCreated.findIndex((t) => (t.order || Infinity) > tableData.order);
      if (insertIndex === -1) if (tIndex === -1) toBeCreated.push(tableData);
      else toBeCreated[tIndex].fields = {
        ...toBeCreated[tIndex].fields,
        ...value.fields
      };
      else toBeCreated.splice(insertIndex, 0, tableData);
      continue;
    }
    let toBeAddedFields = {};
    for (const [fieldName, field] of Object.entries(value.fields)) {
      const column = table.columns.find((c) => c.name === fieldName);
      if (!column) {
        toBeAddedFields[fieldName] = field;
        continue;
      }
      if (matchType(column.dataType, field.type, dbType)) continue;
      else logger$1.warn(`Field ${fieldName} in table ${key} has a different type in the database. Expected ${field.type} but got ${column.dataType}.`);
    }
    if (Object.keys(toBeAddedFields).length > 0) toBeAdded.push({
      table: key,
      fields: toBeAddedFields,
      order: value.order || Infinity
    });
  }
  const migrations = [];
  const useUUIDs = ((_b = (_a = config2.advanced) == null ? void 0 : _a.database) == null ? void 0 : _b.generateId) === "uuid";
  const useNumberId = ((_d = (_c = config2.advanced) == null ? void 0 : _c.database) == null ? void 0 : _d.useNumberId) || ((_f = (_e = config2.advanced) == null ? void 0 : _e.database) == null ? void 0 : _f.generateId) === "serial";
  function getType(field, fieldName) {
    var _a2;
    const type = field.type;
    const provider = dbType || "sqlite";
    const typeMap = {
      string: {
        sqlite: "text",
        postgres: "text",
        mysql: field.unique ? "varchar(255)" : field.references ? "varchar(36)" : field.sortable ? "varchar(255)" : field.index ? "varchar(255)" : "text",
        mssql: field.unique || field.sortable ? "varchar(255)" : field.references ? "varchar(36)" : "varchar(8000)"
      },
      boolean: {
        sqlite: "integer",
        postgres: "boolean",
        mysql: "boolean",
        mssql: "smallint"
      },
      number: {
        sqlite: field.bigint ? "bigint" : "integer",
        postgres: field.bigint ? "bigint" : "integer",
        mysql: field.bigint ? "bigint" : "integer",
        mssql: field.bigint ? "bigint" : "integer"
      },
      date: {
        sqlite: "date",
        postgres: "timestamptz",
        mysql: "timestamp(3)",
        mssql: sql$2`datetime2(3)`
      },
      json: {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      },
      id: {
        postgres: useNumberId ? sql$2`integer GENERATED BY DEFAULT AS IDENTITY` : useUUIDs ? "uuid" : "text",
        mysql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        mssql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        sqlite: useNumberId ? "integer" : "text"
      },
      foreignKeyId: {
        postgres: useNumberId ? "integer" : useUUIDs ? "uuid" : "text",
        mysql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        mssql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
        sqlite: useNumberId ? "integer" : "text"
      },
      "string[]": {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      },
      "number[]": {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      }
    };
    if (fieldName === "id" || ((_a2 = field.references) == null ? void 0 : _a2.field) === "id") {
      if (fieldName === "id") return typeMap.id[provider];
      return typeMap.foreignKeyId[provider];
    }
    if (Array.isArray(type)) return "text";
    if (!(type in typeMap)) throw new Error(`Unsupported field type '${String(type)}' for field '${fieldName}'. Allowed types are: string, number, boolean, date, string[], number[]. If you need to store structured data, store it as a JSON string (type: "string") or split it into primitive fields. See https://better-auth.com/docs/advanced/schema#additional-fields`);
    return typeMap[type][provider];
  }
  const getModelName = initGetModelName({
    schema: getAuthTables(config2),
    usePlural: false
  });
  const getFieldName = initGetFieldName({
    schema: getAuthTables(config2),
    usePlural: false
  });
  function getReferencePath(model, field) {
    try {
      return `${getModelName(model)}.${getFieldName({
        model,
        field
      })}`;
    } catch {
      return `${model}.${field}`;
    }
  }
  if (toBeAdded.length) for (const table of toBeAdded) for (const [fieldName, field] of Object.entries(table.fields)) {
    const type = getType(field, fieldName);
    let builder = db2.schema.alterTable(table.table);
    if (field.index) {
      const index2 = db2.schema.alterTable(table.table).addIndex(`${table.table}_${fieldName}_idx`);
      migrations.push(index2);
    }
    let built = builder.addColumn(fieldName, type, (col) => {
      col = field.required !== false ? col.notNull() : col;
      if (field.references) col = col.references(getReferencePath(field.references.model, field.references.field)).onDelete(field.references.onDelete || "cascade");
      if (field.unique) col = col.unique();
      if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) if (dbType === "mysql") col = col.defaultTo(sql$2`CURRENT_TIMESTAMP(3)`);
      else col = col.defaultTo(sql$2`CURRENT_TIMESTAMP`);
      return col;
    });
    migrations.push(built);
  }
  let toBeIndexed = [];
  if ((_h = (_g = config2.advanced) == null ? void 0 : _g.database) == null ? void 0 : _h.useNumberId) logger$1.warn("`useNumberId` is deprecated. Please use `generateId` with `serial` instead.");
  if (toBeCreated.length) for (const table of toBeCreated) {
    const idType = getType({ type: useNumberId ? "number" : "string" }, "id");
    let dbT = db2.schema.createTable(table.table).addColumn("id", idType, (col) => {
      if (useNumberId) {
        if (dbType === "postgres") return col.primaryKey().notNull();
        else if (dbType === "sqlite") return col.primaryKey().notNull();
        else if (dbType === "mssql") return col.identity().primaryKey().notNull();
        return col.autoIncrement().primaryKey().notNull();
      }
      if (useUUIDs) {
        if (dbType === "postgres") return col.primaryKey().defaultTo(sql$2`pg_catalog.gen_random_uuid()`).notNull();
        return col.primaryKey().notNull();
      }
      return col.primaryKey().notNull();
    });
    for (const [fieldName, field] of Object.entries(table.fields)) {
      const type = getType(field, fieldName);
      dbT = dbT.addColumn(fieldName, type, (col) => {
        col = field.required !== false ? col.notNull() : col;
        if (field.references) col = col.references(getReferencePath(field.references.model, field.references.field)).onDelete(field.references.onDelete || "cascade");
        if (field.unique) col = col.unique();
        if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) if (dbType === "mysql") col = col.defaultTo(sql$2`CURRENT_TIMESTAMP(3)`);
        else col = col.defaultTo(sql$2`CURRENT_TIMESTAMP`);
        return col;
      });
      if (field.index) {
        let builder = db2.schema.createIndex(`${table.table}_${fieldName}_${field.unique ? "uidx" : "idx"}`).on(table.table).columns([fieldName]);
        toBeIndexed.push(field.unique ? builder.unique() : builder);
      }
    }
    migrations.push(dbT);
  }
  if (toBeIndexed.length) for (const index2 of toBeIndexed) migrations.push(index2);
  async function runMigrations() {
    for (const migration of migrations) await migration.execute();
  }
  async function compileMigrations() {
    return migrations.map((m) => m.compile().sql).join(";\n\n") + ";";
  }
  return {
    toBeCreated,
    toBeAdded,
    runMigrations,
    compileMigrations
  };
}
var db_exports = /* @__PURE__ */ __export({
  convertFromDB: () => convertFromDB,
  convertToDB: () => convertToDB,
  createFieldAttribute: () => createFieldAttribute,
  createInternalAdapter: () => createInternalAdapter,
  getAdapter: () => getAdapter,
  getBaseAdapter: () => getBaseAdapter,
  getMigrations: () => getMigrations,
  getSchema: () => getSchema,
  getWithHooks: () => getWithHooks,
  matchType: () => matchType,
  mergeSchema: () => mergeSchema,
  parseAccountInput: () => parseAccountInput,
  parseAccountOutput: () => parseAccountOutput,
  parseAdditionalUserInput: () => parseAdditionalUserInput,
  parseInputData: () => parseInputData,
  parseSessionInput: () => parseSessionInput,
  parseSessionOutput: () => parseSessionOutput,
  parseUserInput: () => parseUserInput,
  parseUserOutput: () => parseUserOutput,
  toZodSchema: () => toZodSchema
});
__reExport(db_exports, import___better_auth_core_db);
const ALLOWED_COOKIE_SIZE = 4096;
const ESTIMATED_EMPTY_COOKIE_SIZE = 200;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function parseCookiesFromContext(ctx) {
  var _a;
  const cookieHeader = (_a = ctx.headers) == null ? void 0 : _a.get("cookie");
  if (!cookieHeader) return {};
  const cookies = {};
  const pairs = cookieHeader.split("; ");
  for (const pair of pairs) {
    const [name, ...valueParts] = pair.split("=");
    if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
  }
  return cookies;
}
function getChunkIndex(cookieName) {
  const parts = cookieName.split(".");
  const lastPart = parts[parts.length - 1];
  const index2 = parseInt(lastPart || "0", 10);
  return isNaN(index2) ? 0 : index2;
}
function readExistingChunks(cookieName, ctx) {
  const chunks = {};
  const cookies = parseCookiesFromContext(ctx);
  for (const [name, value] of Object.entries(cookies)) if (name.startsWith(cookieName)) chunks[name] = value;
  return chunks;
}
function joinChunks(chunks) {
  return Object.keys(chunks).sort((a, b) => {
    return getChunkIndex(a) - getChunkIndex(b);
  }).map((key) => chunks[key]).join("");
}
function chunkCookie(storeName, cookie, chunks, logger2) {
  const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
  if (chunkCount === 1) {
    chunks[cookie.name] = cookie.value;
    return [cookie];
  }
  const cookies = [];
  for (let i = 0; i < chunkCount; i++) {
    const name = `${cookie.name}.${i}`;
    const start = i * CHUNK_SIZE;
    const value = cookie.value.substring(start, start + CHUNK_SIZE);
    cookies.push({
      ...cookie,
      name,
      value
    });
    chunks[name] = value;
  }
  logger2.debug(`CHUNKING_${storeName.toUpperCase()}_COOKIE`, {
    message: `${storeName} cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
    emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
    valueSize: cookie.value.length,
    chunkCount,
    chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
  });
  return cookies;
}
function getCleanCookies(chunks, cookieOptions) {
  const cleanedChunks = {};
  for (const name in chunks) cleanedChunks[name] = {
    name,
    value: "",
    options: {
      ...cookieOptions,
      maxAge: 0
    }
  };
  return cleanedChunks;
}
const storeFactory = (storeName) => (cookieName, cookieOptions, ctx) => {
  const chunks = readExistingChunks(cookieName, ctx);
  const logger2 = ctx.context.logger;
  return {
    getValue() {
      return joinChunks(chunks);
    },
    hasChunks() {
      return Object.keys(chunks).length > 0;
    },
    chunk(value, options) {
      const cleanedChunks = getCleanCookies(chunks, cookieOptions);
      for (const name in chunks) delete chunks[name];
      const cookies = cleanedChunks;
      const chunked = chunkCookie(storeName, {
        name: cookieName,
        value,
        options: {
          ...cookieOptions,
          ...options
        }
      }, chunks, logger2);
      for (const chunk of chunked) cookies[chunk.name] = chunk;
      return Object.values(cookies);
    },
    clean() {
      const cleanedChunks = getCleanCookies(chunks, cookieOptions);
      for (const name in chunks) delete chunks[name];
      return Object.values(cleanedChunks);
    },
    setCookies(cookies) {
      for (const cookie of cookies) ctx.setCookie(cookie.name, cookie.value, cookie.options);
    }
  };
};
const createSessionStore = storeFactory("Session");
const createAccountStore = storeFactory("Account");
function getChunkedCookie(ctx, cookieName) {
  var _a;
  const value = ctx.getCookie(cookieName);
  if (value) return value;
  const chunks = [];
  const cookieHeader = (_a = ctx.headers) == null ? void 0 : _a.get("cookie");
  if (!cookieHeader) return null;
  const cookies = {};
  const pairs = cookieHeader.split("; ");
  for (const pair of pairs) {
    const [name, ...valueParts] = pair.split("=");
    if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
  }
  for (const [name, val] of Object.entries(cookies)) if (name.startsWith(cookieName + ".")) {
    const indexStr = name.split(".").at(-1);
    const index2 = parseInt(indexStr || "0", 10);
    if (!isNaN(index2)) chunks.push({
      index: index2,
      value: val
    });
  }
  if (chunks.length > 0) {
    chunks.sort((a, b) => a.index - b.index);
    return chunks.map((c) => c.value).join("");
  }
  return null;
}
async function setAccountCookie(c, accountData) {
  const accountDataCookie = c.context.authCookies.accountData;
  const options = {
    maxAge: 300,
    ...accountDataCookie.options
  };
  const data = await symmetricEncodeJWT(accountData, c.context.secret, "better-auth-account", options.maxAge);
  if (data.length > ALLOWED_COOKIE_SIZE) {
    const accountStore = createAccountStore(accountDataCookie.name, options, c);
    const cookies = accountStore.chunk(data, options);
    accountStore.setCookies(cookies);
  } else {
    const accountStore = createAccountStore(accountDataCookie.name, options, c);
    if (accountStore.hasChunks()) {
      const cleanCookies = accountStore.clean();
      accountStore.setCookies(cleanCookies);
    }
    c.setCookie(accountDataCookie.name, data, options);
  }
}
async function getAccountCookie(c) {
  const accountCookie = getChunkedCookie(c, c.context.authCookies.accountData.name);
  if (accountCookie) {
    const accountData = safeJSONParse(await symmetricDecodeJWT(accountCookie, c.context.secret, "better-auth-account"));
    if (accountData) return accountData;
  }
  return null;
}
const getSessionQuerySchema = z.optional(z.object({
  disableCookieCache: z.coerce.boolean().meta({ description: "Disable cookie cache and fetch session from database" }).optional(),
  disableRefresh: z.coerce.boolean().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
const SEC = 1e3;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365.25;
const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)(?: (ago|from now))?$/i;
function parse(value) {
  const match = REGEX.exec(value);
  if (!match || match[4] && match[1]) throw new TypeError(`Invalid time string format: "${value}". Use formats like "7d", "30m", "1 hour", etc.`);
  const n = parseFloat(match[2]);
  const unit = match[3].toLowerCase();
  let result;
  switch (unit) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      result = n * YEAR;
      break;
    case "months":
    case "month":
    case "mo":
      result = n * MONTH;
      break;
    case "weeks":
    case "week":
    case "w":
      result = n * WEEK;
      break;
    case "days":
    case "day":
    case "d":
      result = n * DAY;
      break;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      result = n * HOUR;
      break;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      result = n * MIN;
      break;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      result = n * SEC;
      break;
    default:
      throw new TypeError(`Unknown time unit: "${unit}"`);
  }
  if (match[1] === "-" || match[4] === "ago") return -result;
  return result;
}
function ms(value) {
  return parse(value);
}
function sec(value) {
  return Math.round(parse(value) / 1e3);
}
function parseSetCookieHeader(setCookie) {
  const cookies = /* @__PURE__ */ new Map();
  setCookie.split(", ").forEach((cookieString) => {
    const [nameValue, ...attributes] = cookieString.split(";").map((part) => part.trim());
    const [name, ...valueParts] = (nameValue || "").split("=");
    const value = valueParts.join("=");
    if (!name || value === void 0) return;
    const attrObj = { value };
    attributes.forEach((attribute) => {
      const [attrName, ...attrValueParts] = attribute.split("=");
      const attrValue = attrValueParts.join("=");
      const normalizedAttrName = attrName.trim().toLowerCase();
      switch (normalizedAttrName) {
        case "max-age":
          attrObj["max-age"] = attrValue ? parseInt(attrValue.trim(), 10) : void 0;
          break;
        case "expires":
          attrObj.expires = attrValue ? new Date(attrValue.trim()) : void 0;
          break;
        case "domain":
          attrObj.domain = attrValue ? attrValue.trim() : void 0;
          break;
        case "path":
          attrObj.path = attrValue ? attrValue.trim() : void 0;
          break;
        case "secure":
          attrObj.secure = true;
          break;
        case "httponly":
          attrObj.httponly = true;
          break;
        case "samesite":
          attrObj.samesite = attrValue ? attrValue.trim().toLowerCase() : void 0;
          break;
        default:
          attrObj[normalizedAttrName] = attrValue ? attrValue.trim() : true;
          break;
      }
    });
    cookies.set(name, attrObj);
  });
  return cookies;
}
function createCookieGetter(options) {
  var _a, _b, _c, _d, _e, _f;
  const secureCookiePrefix = (((_a = options.advanced) == null ? void 0 : _a.useSecureCookies) !== void 0 ? (_b = options.advanced) == null ? void 0 : _b.useSecureCookies : options.baseURL !== void 0 ? options.baseURL.startsWith("https://") ? true : false : isProduction) ? "__Secure-" : "";
  const crossSubdomainEnabled = !!((_d = (_c = options.advanced) == null ? void 0 : _c.crossSubDomainCookies) == null ? void 0 : _d.enabled);
  const domain = crossSubdomainEnabled ? ((_f = (_e = options.advanced) == null ? void 0 : _e.crossSubDomainCookies) == null ? void 0 : _f.domain) || (options.baseURL ? new URL(options.baseURL).hostname : void 0) : void 0;
  if (crossSubdomainEnabled && !domain) throw new BetterAuthError("baseURL is required when crossSubdomainCookies are enabled");
  function createCookie(cookieName, overrideAttributes = {}) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h;
    const prefix = ((_a2 = options.advanced) == null ? void 0 : _a2.cookiePrefix) || "better-auth";
    const name = ((_d2 = (_c2 = (_b2 = options.advanced) == null ? void 0 : _b2.cookies) == null ? void 0 : _c2[cookieName]) == null ? void 0 : _d2.name) || `${prefix}.${cookieName}`;
    const attributes = (_g = (_f2 = (_e2 = options.advanced) == null ? void 0 : _e2.cookies) == null ? void 0 : _f2[cookieName]) == null ? void 0 : _g.attributes;
    return {
      name: `${secureCookiePrefix}${name}`,
      attributes: {
        secure: !!secureCookiePrefix,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        ...crossSubdomainEnabled ? { domain } : {},
        ...(_h = options.advanced) == null ? void 0 : _h.defaultCookieAttributes,
        ...overrideAttributes,
        ...attributes
      }
    };
  }
  return createCookie;
}
function getCookies(options) {
  var _a, _b, _c, _d, _e;
  const createCookie = createCookieGetter(options);
  const sessionToken = createCookie("session_token", { maxAge: ((_a = options.session) == null ? void 0 : _a.expiresIn) || sec("7d") });
  const sessionData = createCookie("session_data", { maxAge: ((_c = (_b = options.session) == null ? void 0 : _b.cookieCache) == null ? void 0 : _c.maxAge) || 300 });
  const accountData = createCookie("account_data", { maxAge: ((_e = (_d = options.session) == null ? void 0 : _d.cookieCache) == null ? void 0 : _e.maxAge) || 300 });
  const dontRememberToken = createCookie("dont_remember");
  return {
    sessionToken: {
      name: sessionToken.name,
      options: sessionToken.attributes
    },
    sessionData: {
      name: sessionData.name,
      options: sessionData.attributes
    },
    dontRememberToken: {
      name: dontRememberToken.name,
      options: dontRememberToken.attributes
    },
    accountData: {
      name: accountData.name,
      options: accountData.attributes
    }
  };
}
async function setCookieCache(ctx, session2, dontRememberMe) {
  var _a, _b, _c, _d, _e, _f;
  if ((_b = (_a = ctx.context.options.session) == null ? void 0 : _a.cookieCache) == null ? void 0 : _b.enabled) {
    const filteredSession = Object.entries(session2.session).reduce((acc, [key, value]) => {
      var _a2, _b2;
      const fieldConfig = (_b2 = (_a2 = ctx.context.options.session) == null ? void 0 : _a2.additionalFields) == null ? void 0 : _b2[key];
      if (!fieldConfig || fieldConfig.returned !== false) acc[key] = value;
      return acc;
    }, {});
    const filteredUser = parseUserOutput(ctx.context.options, session2.user);
    const versionConfig = (_d = (_c = ctx.context.options.session) == null ? void 0 : _c.cookieCache) == null ? void 0 : _d.version;
    let version = "1";
    if (versionConfig) {
      if (typeof versionConfig === "string") version = versionConfig;
      else if (typeof versionConfig === "function") {
        const result = versionConfig(session2.session, session2.user);
        version = result instanceof Promise ? await result : result;
      }
    }
    const sessionData = {
      session: filteredSession,
      user: filteredUser,
      updatedAt: Date.now(),
      version
    };
    const options = {
      ...ctx.context.authCookies.sessionData.options,
      maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.options.maxAge
    };
    const expiresAtDate = getDate(options.maxAge || 60, "sec").getTime();
    const strategy = ((_f = (_e = ctx.context.options.session) == null ? void 0 : _e.cookieCache) == null ? void 0 : _f.strategy) || "compact";
    let data;
    if (strategy === "jwe") data = await symmetricEncodeJWT(sessionData, ctx.context.secret, "better-auth-session", options.maxAge || 300);
    else if (strategy === "jwt") data = await signJWT(sessionData, ctx.context.secret, options.maxAge || 300);
    else data = base64Url.encode(JSON.stringify({
      session: sessionData,
      expiresAt: expiresAtDate,
      signature: await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, JSON.stringify({
        ...sessionData,
        expiresAt: expiresAtDate
      }))
    }), { padding: false });
    if (data.length > 4093) {
      const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
      const cookies = sessionStore.chunk(data, options);
      sessionStore.setCookies(cookies);
    } else {
      const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
      if (sessionStore.hasChunks()) {
        const cleanCookies = sessionStore.clean();
        sessionStore.setCookies(cleanCookies);
      }
      ctx.setCookie(ctx.context.authCookies.sessionData.name, data, options);
    }
  }
}
async function setSessionCookie(ctx, session2, dontRememberMe, overrides) {
  var _a;
  const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
  dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
  const options = ctx.context.authCookies.sessionToken.options;
  const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
  await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session2.session.token, ctx.context.secret, {
    ...options,
    maxAge,
    ...overrides
  });
  if (dontRememberMe) await ctx.setSignedCookie(ctx.context.authCookies.dontRememberToken.name, "true", ctx.context.secret, ctx.context.authCookies.dontRememberToken.options);
  await setCookieCache(ctx, session2, dontRememberMe);
  ctx.context.setNewSession(session2);
  if (ctx.context.options.secondaryStorage) await ((_a = ctx.context.secondaryStorage) == null ? void 0 : _a.set(session2.session.token, JSON.stringify({
    user: session2.user,
    session: session2.session
  }), Math.floor((new Date(session2.session.expiresAt).getTime() - Date.now()) / 1e3)));
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
  var _a;
  ctx.setCookie(ctx.context.authCookies.sessionToken.name, "", {
    ...ctx.context.authCookies.sessionToken.options,
    maxAge: 0
  });
  ctx.setCookie(ctx.context.authCookies.sessionData.name, "", {
    ...ctx.context.authCookies.sessionData.options,
    maxAge: 0
  });
  if ((_a = ctx.context.options.account) == null ? void 0 : _a.storeAccountCookie) {
    ctx.setCookie(ctx.context.authCookies.accountData.name, "", {
      ...ctx.context.authCookies.accountData.options,
      maxAge: 0
    });
    const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.options, ctx);
    const cleanCookies$1 = accountStore.clean();
    accountStore.setCookies(cleanCookies$1);
  }
  if (ctx.context.oauthConfig.storeStateStrategy === "cookie") {
    const stateCookie = ctx.context.createAuthCookie("oauth_state");
    ctx.setCookie(stateCookie.name, "", {
      ...stateCookie.attributes,
      maxAge: 0
    });
  }
  const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, ctx.context.authCookies.sessionData.options, ctx);
  const cleanCookies = sessionStore.clean();
  sessionStore.setCookies(cleanCookies);
  ctx.setCookie(ctx.context.authCookies.dontRememberToken.name, "", {
    ...ctx.context.authCookies.dontRememberToken.options,
    maxAge: 0
  });
}
const getSession = () => createAuthEndpoint("/get-session", {
  method: "GET",
  operationId: "getSession",
  query: getSessionQuerySchema,
  requireHeaders: true,
  metadata: { openapi: {
    operationId: "getSession",
    description: "Get the current session",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        nullable: true,
        properties: {
          session: { $ref: "#/components/schemas/Session" },
          user: { $ref: "#/components/schemas/User" }
        },
        required: ["session", "user"]
      } } }
    } }
  } }
}, async (ctx) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  try {
    const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
    if (!sessionCookieToken) return null;
    const sessionDataCookie = getChunkedCookie(ctx, ctx.context.authCookies.sessionData.name);
    let sessionDataPayload = null;
    if (sessionDataCookie) {
      const strategy = ((_b = (_a = ctx.context.options.session) == null ? void 0 : _a.cookieCache) == null ? void 0 : _b.strategy) || "compact";
      if (strategy === "jwe") {
        const payload = await symmetricDecodeJWT(sessionDataCookie, ctx.context.secret, "better-auth-session");
        if (payload && payload.session && payload.user) sessionDataPayload = {
          session: {
            session: payload.session,
            user: payload.user,
            updatedAt: payload.updatedAt,
            version: payload.version
          },
          expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
        };
        else {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", { maxAge: 0 });
          return ctx.json(null);
        }
      } else if (strategy === "jwt") {
        const payload = await verifyJWT(sessionDataCookie, ctx.context.secret);
        if (payload && payload.session && payload.user) sessionDataPayload = {
          session: {
            session: payload.session,
            user: payload.user,
            updatedAt: payload.updatedAt,
            version: payload.version
          },
          expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
        };
        else {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", { maxAge: 0 });
          return ctx.json(null);
        }
      } else {
        const parsed = safeJSONParse(binary.decode(base64Url.decode(sessionDataCookie)));
        if (parsed) if (await createHMAC("SHA-256", "base64urlnopad").verify(ctx.context.secret, JSON.stringify({
          ...parsed.session,
          expiresAt: parsed.expiresAt
        }), parsed.signature)) sessionDataPayload = parsed;
        else {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", { maxAge: 0 });
          return ctx.json(null);
        }
      }
    }
    const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
    if ((sessionDataPayload == null ? void 0 : sessionDataPayload.session) && ((_d = (_c = ctx.context.options.session) == null ? void 0 : _c.cookieCache) == null ? void 0 : _d.enabled) && !((_e = ctx.query) == null ? void 0 : _e.disableCookieCache)) {
      const session$1 = sessionDataPayload.session;
      const versionConfig = (_g = (_f = ctx.context.options.session) == null ? void 0 : _f.cookieCache) == null ? void 0 : _g.version;
      let expectedVersion = "1";
      if (versionConfig) {
        if (typeof versionConfig === "string") expectedVersion = versionConfig;
        else if (typeof versionConfig === "function") {
          const result = versionConfig(session$1.session, session$1.user);
          expectedVersion = result instanceof Promise ? await result : result;
        }
      }
      if ((session$1.version || "1") !== expectedVersion) {
        const dataCookie = ctx.context.authCookies.sessionData.name;
        ctx.setCookie(dataCookie, "", { maxAge: 0 });
      } else {
        const cachedSessionExpiresAt = new Date(session$1.session.expiresAt);
        if (sessionDataPayload.expiresAt < Date.now() || cachedSessionExpiresAt < /* @__PURE__ */ new Date()) {
          const dataCookie = ctx.context.authCookies.sessionData.name;
          ctx.setCookie(dataCookie, "", { maxAge: 0 });
        } else {
          const cookieRefreshCache = ctx.context.sessionConfig.cookieRefreshCache;
          if (cookieRefreshCache === false) {
            ctx.context.session = session$1;
            return ctx.json({
              session: session$1.session,
              user: session$1.user
            });
          }
          if (sessionDataPayload.expiresAt - Date.now() < cookieRefreshCache.updateAge * 1e3) {
            const newExpiresAt = getDate(((_i = (_h = ctx.context.options.session) == null ? void 0 : _h.cookieCache) == null ? void 0 : _i.maxAge) || 300, "sec");
            const refreshedSession = {
              session: {
                ...session$1.session,
                expiresAt: newExpiresAt
              },
              user: session$1.user,
              updatedAt: Date.now()
            };
            await setCookieCache(ctx, refreshedSession, false);
            const parsedRefreshedSession = parseSessionOutput(ctx.context.options, {
              ...refreshedSession.session,
              expiresAt: new Date(refreshedSession.session.expiresAt),
              createdAt: new Date(refreshedSession.session.createdAt),
              updatedAt: new Date(refreshedSession.session.updatedAt)
            });
            const parsedRefreshedUser = parseUserOutput(ctx.context.options, {
              ...refreshedSession.user,
              createdAt: new Date(refreshedSession.user.createdAt),
              updatedAt: new Date(refreshedSession.user.updatedAt)
            });
            ctx.context.session = {
              session: parsedRefreshedSession,
              user: parsedRefreshedUser
            };
            return ctx.json({
              session: parsedRefreshedSession,
              user: parsedRefreshedUser
            });
          }
          const parsedSession = parseSessionOutput(ctx.context.options, {
            ...session$1.session,
            expiresAt: new Date(session$1.session.expiresAt),
            createdAt: new Date(session$1.session.createdAt),
            updatedAt: new Date(session$1.session.updatedAt)
          });
          const parsedUser = parseUserOutput(ctx.context.options, {
            ...session$1.user,
            createdAt: new Date(session$1.user.createdAt),
            updatedAt: new Date(session$1.user.updatedAt)
          });
          ctx.context.session = {
            session: parsedSession,
            user: parsedUser
          };
          return ctx.json({
            session: parsedSession,
            user: parsedUser
          });
        }
      }
    }
    const session2 = await ctx.context.internalAdapter.findSession(sessionCookieToken);
    ctx.context.session = session2;
    if (!session2 || session2.session.expiresAt < /* @__PURE__ */ new Date()) {
      deleteSessionCookie(ctx);
      if (session2)
        await ctx.context.internalAdapter.deleteSession(session2.session.token);
      return ctx.json(null);
    }
    if (dontRememberMe || ((_j = ctx.query) == null ? void 0 : _j.disableRefresh)) {
      const parsedSession = parseSessionOutput(ctx.context.options, session2.session);
      const parsedUser = parseUserOutput(ctx.context.options, session2.user);
      return ctx.json({
        session: parsedSession,
        user: parsedUser
      });
    }
    const expiresIn = ctx.context.sessionConfig.expiresIn;
    const updateAge = ctx.context.sessionConfig.updateAge;
    if (session2.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3 <= Date.now() && (!((_k = ctx.query) == null ? void 0 : _k.disableRefresh) || !((_l = ctx.context.options.session) == null ? void 0 : _l.disableSessionRefresh))) {
      const updatedSession = await ctx.context.internalAdapter.updateSession(session2.session.token, {
        expiresAt: getDate(ctx.context.sessionConfig.expiresIn, "sec"),
        updatedAt: /* @__PURE__ */ new Date()
      });
      if (!updatedSession) {
        deleteSessionCookie(ctx);
        return ctx.json(null, { status: 401 });
      }
      const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1e3;
      await setSessionCookie(ctx, {
        session: updatedSession,
        user: session2.user
      }, false, { maxAge });
      const parsedUpdatedSession = parseSessionOutput(ctx.context.options, updatedSession);
      const parsedUser = parseUserOutput(ctx.context.options, session2.user);
      return ctx.json({
        session: parsedUpdatedSession,
        user: parsedUser
      });
    }
    await setCookieCache(ctx, session2, !!dontRememberMe);
    return ctx.json(session2);
  } catch (error2) {
    ctx.context.logger.error("INTERNAL_SERVER_ERROR", error2);
    throw new APIError("INTERNAL_SERVER_ERROR", { message: BASE_ERROR_CODES.FAILED_TO_GET_SESSION });
  }
});
const getSessionFromCtx = async (ctx, config2) => {
  if (ctx.context.session) return ctx.context.session;
  const session2 = await getSession()({
    ...ctx,
    asResponse: false,
    headers: ctx.headers,
    returnHeaders: false,
    returnStatus: false,
    query: {
      ...config2,
      ...ctx.query
    }
  }).catch((e) => {
    return null;
  });
  ctx.context.session = session2;
  return session2;
};
const sessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!(session2 == null ? void 0 : session2.session)) throw new APIError("UNAUTHORIZED");
  return { session: session2 };
});
const sensitiveSessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx, { disableCookieCache: true });
  if (!(session2 == null ? void 0 : session2.session)) throw new APIError("UNAUTHORIZED");
  return { session: session2 };
});
createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!(session2 == null ? void 0 : session2.session) && (ctx.request || ctx.headers)) throw new APIError("UNAUTHORIZED");
  return { session: session2 };
});
const freshSessionMiddleware = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!(session2 == null ? void 0 : session2.session)) throw new APIError("UNAUTHORIZED");
  if (ctx.context.sessionConfig.freshAge === 0) return { session: session2 };
  const freshAge = ctx.context.sessionConfig.freshAge;
  const lastUpdated = new Date(session2.session.updatedAt || session2.session.createdAt).getTime();
  if (!(Date.now() - lastUpdated < freshAge * 1e3)) throw new APIError("FORBIDDEN", { message: "Session is not fresh" });
  return { session: session2 };
});
const listSessions = () => createAuthEndpoint("/list-sessions", {
  method: "GET",
  operationId: "listUserSessions",
  use: [sessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    operationId: "listUserSessions",
    description: "List all active sessions for the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "array",
        items: { $ref: "#/components/schemas/Session" }
      } } }
    } }
  } }
}, async (ctx) => {
  try {
    const activeSessions = (await ctx.context.internalAdapter.listSessions(ctx.context.session.user.id)).filter((session2) => {
      return session2.expiresAt > /* @__PURE__ */ new Date();
    });
    return ctx.json(activeSessions);
  } catch (e) {
    ctx.context.logger.error(e);
    throw ctx.error("INTERNAL_SERVER_ERROR");
  }
});
const revokeSession = createAuthEndpoint("/revoke-session", {
  method: "POST",
  body: z.object({ token: z.string().meta({ description: "The token to revoke" }) }),
  use: [sensitiveSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    description: "Revoke a single session",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: { token: {
        type: "string",
        description: "The token to revoke"
      } },
      required: ["token"]
    } } } },
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if the session was revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  var _a;
  const token = ctx.body.token;
  if (((_a = await ctx.context.internalAdapter.findSession(token)) == null ? void 0 : _a.session.userId) === ctx.context.session.user.id) try {
    await ctx.context.internalAdapter.deleteSession(token);
  } catch (error2) {
    ctx.context.logger.error(error2 && typeof error2 === "object" && "name" in error2 ? error2.name : "", error2);
    throw new APIError("INTERNAL_SERVER_ERROR");
  }
  return ctx.json({ status: true });
});
const revokeSessions = createAuthEndpoint("/revoke-sessions", {
  method: "POST",
  use: [sensitiveSessionMiddleware],
  requireHeaders: true,
  metadata: { openapi: {
    description: "Revoke all sessions for the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if all sessions were revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  try {
    await ctx.context.internalAdapter.deleteSessions(ctx.context.session.user.id);
  } catch (error2) {
    ctx.context.logger.error(error2 && typeof error2 === "object" && "name" in error2 ? error2.name : "", error2);
    throw new APIError("INTERNAL_SERVER_ERROR");
  }
  return ctx.json({ status: true });
});
const revokeOtherSessions = createAuthEndpoint("/revoke-other-sessions", {
  method: "POST",
  requireHeaders: true,
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    description: "Revoke all other sessions for the user except the current one",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: {
          type: "boolean",
          description: "Indicates if all other sessions were revoked successfully"
        } },
        required: ["status"]
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!session2.user) throw new APIError("UNAUTHORIZED");
  const otherSessions = (await ctx.context.internalAdapter.listSessions(session2.user.id)).filter((session$1) => {
    return session$1.expiresAt > /* @__PURE__ */ new Date();
  }).filter((session$1) => session$1.token !== ctx.context.session.session.token);
  await Promise.all(otherSessions.map((session$1) => ctx.context.internalAdapter.deleteSession(session$1.token)));
  return ctx.json({ status: true });
});
function decryptOAuthToken(token, ctx) {
  var _a;
  if (!token) return token;
  if ((_a = ctx.options.account) == null ? void 0 : _a.encryptOAuthTokens) return symmetricDecrypt({
    key: ctx.secret,
    data: token
  });
  return token;
}
function setTokenUtil(token, ctx) {
  var _a;
  if (((_a = ctx.options.account) == null ? void 0 : _a.encryptOAuthTokens) && token) return symmetricEncrypt({
    key: ctx.secret,
    data: token
  });
  return token;
}
const listUserAccounts = createAuthEndpoint("/list-accounts", {
  method: "GET",
  use: [sessionMiddleware],
  metadata: { openapi: {
    operationId: "listUserAccounts",
    description: "List all accounts linked to the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            providerId: { type: "string" },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            accountId: { type: "string" },
            userId: { type: "string" },
            scopes: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: [
            "id",
            "providerId",
            "createdAt",
            "updatedAt",
            "accountId",
            "userId",
            "scopes"
          ]
        }
      } } }
    } }
  } }
}, async (c) => {
  const session2 = c.context.session;
  const accounts = await c.context.internalAdapter.findAccounts(session2.user.id);
  return c.json(accounts.map((a) => {
    var _a;
    return {
      id: a.id,
      providerId: a.providerId,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
      accountId: a.accountId,
      userId: a.userId,
      scopes: ((_a = a.scope) == null ? void 0 : _a.split(",")) || []
    };
  }));
});
const linkSocialAccount = createAuthEndpoint("/link-social", {
  method: "POST",
  requireHeaders: true,
  body: z.object({
    callbackURL: z.string().meta({ description: "The URL to redirect to after the user has signed in" }).optional(),
    provider: SocialProviderListEnum,
    idToken: z.object({
      token: z.string(),
      nonce: z.string().optional(),
      accessToken: z.string().optional(),
      refreshToken: z.string().optional(),
      scopes: z.array(z.string()).optional()
    }).optional(),
    requestSignUp: z.boolean().optional(),
    scopes: z.array(z.string()).meta({ description: "Additional scopes to request from the provider" }).optional(),
    errorCallbackURL: z.string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional(),
    disableRedirect: z.boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
    additionalData: z.record(z.string(), z.any()).optional()
  }),
  use: [sessionMiddleware],
  metadata: { openapi: {
    description: "Link a social account to the user",
    operationId: "linkSocialAccount",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The authorization URL to redirect the user to"
          },
          redirect: {
            type: "boolean",
            description: "Indicates if the user should be redirected to the authorization URL"
          },
          status: { type: "boolean" }
        },
        required: ["redirect"]
      } } }
    } }
  } }
}, async (c) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const session2 = c.context.session;
  const provider = c.context.socialProviders.find((p) => p.id === c.body.provider);
  if (!provider) {
    c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
    throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.PROVIDER_NOT_FOUND });
  }
  if (c.body.idToken) {
    if (!provider.verifyIdToken) {
      c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
      throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED });
    }
    const { token, nonce } = c.body.idToken;
    if (!await provider.verifyIdToken(token, nonce)) {
      c.context.logger.error("Invalid id token", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_TOKEN });
    }
    const linkingUserInfo = await provider.getUserInfo({
      idToken: token,
      accessToken: c.body.idToken.accessToken,
      refreshToken: c.body.idToken.refreshToken
    });
    if (!linkingUserInfo || !(linkingUserInfo == null ? void 0 : linkingUserInfo.user)) {
      c.context.logger.error("Failed to get user info", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO });
    }
    const linkingUserId = String(linkingUserInfo.user.id);
    if (!linkingUserInfo.user.email) {
      c.context.logger.error("User email not found", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND });
    }
    if ((await c.context.internalAdapter.findAccounts(session2.user.id)).find((a) => a.providerId === provider.id && a.accountId === linkingUserId)) return c.json({
      url: "",
      status: true,
      redirect: false
    });
    if (!((_c = (_b = (_a = c.context.options.account) == null ? void 0 : _a.accountLinking) == null ? void 0 : _b.trustedProviders) == null ? void 0 : _c.includes(provider.id)) && !linkingUserInfo.user.emailVerified || ((_e = (_d = c.context.options.account) == null ? void 0 : _d.accountLinking) == null ? void 0 : _e.enabled) === false) throw new APIError("UNAUTHORIZED", { message: "Account not linked - linking not allowed" });
    if (linkingUserInfo.user.email !== session2.user.email && ((_g = (_f = c.context.options.account) == null ? void 0 : _f.accountLinking) == null ? void 0 : _g.allowDifferentEmails) !== true) throw new APIError("UNAUTHORIZED", { message: "Account not linked - different emails not allowed" });
    try {
      await c.context.internalAdapter.createAccount({
        userId: session2.user.id,
        providerId: provider.id,
        accountId: linkingUserId,
        accessToken: c.body.idToken.accessToken,
        idToken: token,
        refreshToken: c.body.idToken.refreshToken,
        scope: (_h = c.body.idToken.scopes) == null ? void 0 : _h.join(",")
      });
    } catch {
      throw new APIError("EXPECTATION_FAILED", { message: "Account not linked - unable to create account" });
    }
    if (((_j = (_i = c.context.options.account) == null ? void 0 : _i.accountLinking) == null ? void 0 : _j.updateUserInfoOnLink) === true) try {
      await c.context.internalAdapter.updateUser(session2.user.id, {
        name: (_k = linkingUserInfo.user) == null ? void 0 : _k.name,
        image: (_l = linkingUserInfo.user) == null ? void 0 : _l.image
      });
    } catch (e) {
      console.warn("Could not update user - " + e.toString());
    }
    return c.json({
      url: "",
      status: true,
      redirect: false
    });
  }
  const state = await generateState(c, {
    userId: session2.user.id,
    email: session2.user.email
  }, c.body.additionalData);
  const url = await provider.createAuthorizationURL({
    state: state.state,
    codeVerifier: state.codeVerifier,
    redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
    scopes: c.body.scopes
  });
  return c.json({
    url: url.toString(),
    redirect: !c.body.disableRedirect
  });
});
const unlinkAccount = createAuthEndpoint("/unlink-account", {
  method: "POST",
  body: z.object({
    providerId: z.string(),
    accountId: z.string().optional()
  }),
  use: [freshSessionMiddleware],
  metadata: { openapi: {
    description: "Unlink an account",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  var _a, _b;
  const { providerId, accountId } = ctx.body;
  const accounts = await ctx.context.internalAdapter.findAccounts(ctx.context.session.user.id);
  if (accounts.length === 1 && !((_b = (_a = ctx.context.options.account) == null ? void 0 : _a.accountLinking) == null ? void 0 : _b.allowUnlinkingAll)) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.FAILED_TO_UNLINK_LAST_ACCOUNT });
  const accountExist = accounts.find((account2) => accountId ? account2.accountId === accountId && account2.providerId === providerId : account2.providerId === providerId);
  if (!accountExist) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.ACCOUNT_NOT_FOUND });
  await ctx.context.internalAdapter.deleteAccount(accountExist.id);
  return ctx.json({ status: true });
});
const getAccessToken = createAuthEndpoint("/get-access-token", {
  method: "POST",
  body: z.object({
    providerId: z.string().meta({ description: "The provider ID for the OAuth provider" }),
    accountId: z.string().meta({ description: "The account ID associated with the refresh token" }).optional(),
    userId: z.string().meta({ description: "The user ID associated with the account" }).optional()
  }),
  metadata: { openapi: {
    description: "Get a valid access token, doing a refresh if needed",
    responses: {
      200: {
        description: "A Valid access token",
        content: { "application/json": { schema: {
          type: "object",
          properties: {
            tokenType: { type: "string" },
            idToken: { type: "string" },
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            accessTokenExpiresAt: {
              type: "string",
              format: "date-time"
            },
            refreshTokenExpiresAt: {
              type: "string",
              format: "date-time"
            }
          }
        } } }
      },
      400: { description: "Invalid refresh token or provider configuration" }
    }
  } }
}, async (ctx) => {
  var _a, _b, _c;
  const { providerId, accountId, userId } = ctx.body || {};
  const req = ctx.request;
  const session2 = await getSessionFromCtx(ctx);
  if (req && !session2) throw ctx.error("UNAUTHORIZED");
  let resolvedUserId = ((_a = session2 == null ? void 0 : session2.user) == null ? void 0 : _a.id) || userId;
  if (!resolvedUserId) throw ctx.error("UNAUTHORIZED");
  if (!ctx.context.socialProviders.find((p) => p.id === providerId)) throw new APIError("BAD_REQUEST", { message: `Provider ${providerId} is not supported.` });
  const accountData = await getAccountCookie(ctx);
  let account2 = void 0;
  if (accountData && providerId === accountData.providerId && (!accountId || accountData.id === accountId)) account2 = accountData;
  else account2 = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.id === accountId && acc.providerId === providerId : acc.providerId === providerId);
  if (!account2) throw new APIError("BAD_REQUEST", { message: "Account not found" });
  const provider = ctx.context.socialProviders.find((p) => p.id === providerId);
  if (!provider) throw new APIError("BAD_REQUEST", { message: `Provider ${providerId} not found.` });
  try {
    let newTokens = null;
    const accessTokenExpired = account2.accessTokenExpiresAt && new Date(account2.accessTokenExpiresAt).getTime() - Date.now() < 5e3;
    if (account2.refreshToken && accessTokenExpired && provider.refreshAccessToken) {
      const refreshToken$1 = await decryptOAuthToken(account2.refreshToken, ctx.context);
      newTokens = await provider.refreshAccessToken(refreshToken$1);
      const updatedData = {
        accessToken: await setTokenUtil(newTokens.accessToken, ctx.context),
        accessTokenExpiresAt: newTokens.accessTokenExpiresAt,
        refreshToken: await setTokenUtil(newTokens.refreshToken, ctx.context),
        refreshTokenExpiresAt: newTokens.refreshTokenExpiresAt
      };
      let updatedAccount = null;
      if (account2.id) updatedAccount = await ctx.context.internalAdapter.updateAccount(account2.id, updatedData);
      if ((_b = ctx.context.options.account) == null ? void 0 : _b.storeAccountCookie) await setAccountCookie(ctx, {
        ...account2,
        ...updatedAccount ?? updatedData
      });
    }
    const tokens = {
      accessToken: (newTokens == null ? void 0 : newTokens.accessToken) ?? await decryptOAuthToken(account2.accessToken ?? "", ctx.context),
      accessTokenExpiresAt: (newTokens == null ? void 0 : newTokens.accessTokenExpiresAt) ?? account2.accessTokenExpiresAt ?? void 0,
      scopes: ((_c = account2.scope) == null ? void 0 : _c.split(",")) ?? [],
      idToken: (newTokens == null ? void 0 : newTokens.idToken) ?? account2.idToken ?? void 0
    };
    return ctx.json(tokens);
  } catch (error2) {
    throw new APIError("BAD_REQUEST", {
      message: "Failed to get a valid access token",
      cause: error2
    });
  }
});
const refreshToken = createAuthEndpoint("/refresh-token", {
  method: "POST",
  body: z.object({
    providerId: z.string().meta({ description: "The provider ID for the OAuth provider" }),
    accountId: z.string().meta({ description: "The account ID associated with the refresh token" }).optional(),
    userId: z.string().meta({ description: "The user ID associated with the account" }).optional()
  }),
  metadata: { openapi: {
    description: "Refresh the access token using a refresh token",
    responses: {
      200: {
        description: "Access token refreshed successfully",
        content: { "application/json": { schema: {
          type: "object",
          properties: {
            tokenType: { type: "string" },
            idToken: { type: "string" },
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
            accessTokenExpiresAt: {
              type: "string",
              format: "date-time"
            },
            refreshTokenExpiresAt: {
              type: "string",
              format: "date-time"
            }
          }
        } } }
      },
      400: { description: "Invalid refresh token or provider configuration" }
    }
  } }
}, async (ctx) => {
  var _a, _b, _c, _d, _e;
  const { providerId, accountId, userId } = ctx.body;
  const req = ctx.request;
  const session2 = await getSessionFromCtx(ctx);
  if (req && !session2) throw ctx.error("UNAUTHORIZED");
  let resolvedUserId = ((_a = session2 == null ? void 0 : session2.user) == null ? void 0 : _a.id) || userId;
  if (!resolvedUserId) throw new APIError("BAD_REQUEST", { message: `Either userId or session is required` });
  const provider = ctx.context.socialProviders.find((p) => p.id === providerId);
  if (!provider) throw new APIError("BAD_REQUEST", { message: `Provider ${providerId} not found.` });
  if (!provider.refreshAccessToken) throw new APIError("BAD_REQUEST", { message: `Provider ${providerId} does not support token refreshing.` });
  let account2 = void 0;
  const accountData = await getAccountCookie(ctx);
  if (accountData && (!providerId || providerId === (accountData == null ? void 0 : accountData.providerId))) account2 = accountData;
  else account2 = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.id === accountId && acc.providerId === providerId : acc.providerId === providerId);
  if (!account2) throw new APIError("BAD_REQUEST", { message: "Account not found" });
  let refreshToken$1 = void 0;
  if (accountData && providerId === accountData.providerId) refreshToken$1 = accountData.refreshToken ?? void 0;
  else refreshToken$1 = account2.refreshToken ?? void 0;
  if (!refreshToken$1) throw new APIError("BAD_REQUEST", { message: "Refresh token not found" });
  try {
    const decryptedRefreshToken = await decryptOAuthToken(refreshToken$1, ctx.context);
    const tokens = await provider.refreshAccessToken(decryptedRefreshToken);
    if (account2.id) {
      const updateData = {
        ...account2 || {},
        accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
        refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
        accessTokenExpiresAt: tokens.accessTokenExpiresAt,
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
        scope: ((_b = tokens.scopes) == null ? void 0 : _b.join(",")) || account2.scope,
        idToken: tokens.idToken || account2.idToken
      };
      await ctx.context.internalAdapter.updateAccount(account2.id, updateData);
    }
    if (accountData && providerId === accountData.providerId && ((_c = ctx.context.options.account) == null ? void 0 : _c.storeAccountCookie)) await setAccountCookie(ctx, {
      ...accountData,
      accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
      refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
      scope: ((_d = tokens.scopes) == null ? void 0 : _d.join(",")) || accountData.scope,
      idToken: tokens.idToken || accountData.idToken
    });
    return ctx.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
      scope: ((_e = tokens.scopes) == null ? void 0 : _e.join(",")) || account2.scope,
      idToken: tokens.idToken || account2.idToken,
      providerId: account2.providerId,
      accountId: account2.accountId
    });
  } catch (error2) {
    throw new APIError("BAD_REQUEST", {
      message: "Failed to refresh access token",
      cause: error2
    });
  }
});
const accountInfoQuerySchema = z.optional(z.object({ accountId: z.string().meta({ description: "The provider given account id for which to get the account info" }).optional() }));
const accountInfo = createAuthEndpoint("/account-info", {
  method: "GET",
  use: [sessionMiddleware],
  metadata: { openapi: {
    description: "Get the account info provided by the provider",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              image: { type: "string" },
              emailVerified: { type: "boolean" }
            },
            required: ["id", "emailVerified"]
          },
          data: {
            type: "object",
            properties: {},
            additionalProperties: true
          }
        },
        required: ["user", "data"],
        additionalProperties: false
      } } }
    } }
  } },
  query: accountInfoQuerySchema
}, async (ctx) => {
  var _a, _b;
  const providedAccountId = (_a = ctx.query) == null ? void 0 : _a.accountId;
  let account2 = void 0;
  if (!providedAccountId) {
    if ((_b = ctx.context.options.account) == null ? void 0 : _b.storeAccountCookie) {
      const accountData = await getAccountCookie(ctx);
      if (accountData) account2 = accountData;
    }
  } else {
    const accountData = await ctx.context.internalAdapter.findAccount(providedAccountId);
    if (accountData) account2 = accountData;
  }
  if (!account2 || account2.userId !== ctx.context.session.user.id) throw new APIError("BAD_REQUEST", { message: "Account not found" });
  const provider = ctx.context.socialProviders.find((p) => p.id === account2.providerId);
  if (!provider) throw new APIError("INTERNAL_SERVER_ERROR", { message: `Provider account provider is ${account2.providerId} but it is not configured` });
  const tokens = await getAccessToken({
    ...ctx,
    method: "POST",
    body: {
      accountId: account2.id,
      providerId: account2.providerId
    },
    returnHeaders: false,
    returnStatus: false
  });
  if (!tokens.accessToken) throw new APIError("BAD_REQUEST", { message: "Access token not found" });
  const info2 = await provider.getUserInfo({
    ...tokens,
    accessToken: tokens.accessToken
  });
  return ctx.json(info2);
});
async function createEmailVerificationToken(secret, email, updateTo, expiresIn = 3600, extraPayload) {
  return await signJWT({
    email: email.toLowerCase(),
    updateTo,
    ...extraPayload
  }, secret, expiresIn);
}
async function sendVerificationEmailFn(ctx, user2) {
  var _a, _b;
  if (!((_a = ctx.context.options.emailVerification) == null ? void 0 : _a.sendVerificationEmail)) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw new APIError("BAD_REQUEST", { message: "Verification email isn't enabled" });
  }
  const token = await createEmailVerificationToken(ctx.context.secret, user2.email, void 0, (_b = ctx.context.options.emailVerification) == null ? void 0 : _b.expiresIn);
  const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
  const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
  await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
    user: user2,
    url,
    token
  }, ctx.request));
}
const sendVerificationEmail = createAuthEndpoint("/send-verification-email", {
  method: "POST",
  operationId: "sendVerificationEmail",
  body: z.object({
    email: z.email().meta({ description: "The email to send the verification email to" }),
    callbackURL: z.string().meta({ description: "The URL to use for email verification callback" }).optional()
  }),
  metadata: { openapi: {
    operationId: "sendVerificationEmail",
    description: "Send a verification email to the user",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The email to send the verification email to",
          example: "user@example.com"
        },
        callbackURL: {
          type: "string",
          description: "The URL to use for email verification callback",
          example: "https://example.com/callback",
          nullable: true
        }
      },
      required: ["email"]
    } } } },
    responses: {
      "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { status: {
            type: "boolean",
            description: "Indicates if the email was sent successfully",
            example: true
          } }
        } } }
      },
      "400": {
        description: "Bad Request",
        content: { "application/json": { schema: {
          type: "object",
          properties: { message: {
            type: "string",
            description: "Error message",
            example: "Verification email isn't enabled"
          } }
        } } }
      }
    }
  } }
}, async (ctx) => {
  var _a, _b;
  if (!((_a = ctx.context.options.emailVerification) == null ? void 0 : _a.sendVerificationEmail)) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw new APIError("BAD_REQUEST", { message: "Verification email isn't enabled" });
  }
  const { email } = ctx.body;
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) {
    const user2 = await ctx.context.internalAdapter.findUserByEmail(email);
    if (!user2) {
      await createEmailVerificationToken(ctx.context.secret, email, void 0, (_b = ctx.context.options.emailVerification) == null ? void 0 : _b.expiresIn);
      return ctx.json({ status: true });
    }
    await sendVerificationEmailFn(ctx, user2.user);
    return ctx.json({ status: true });
  }
  if (session2 == null ? void 0 : session2.user.emailVerified) throw new APIError("BAD_REQUEST", { message: "You can only send a verification email to an unverified email" });
  if ((session2 == null ? void 0 : session2.user.email) !== email) throw new APIError("BAD_REQUEST", { message: "You can only send a verification email to your own email" });
  await sendVerificationEmailFn(ctx, session2.user);
  return ctx.json({ status: true });
});
const verifyEmail = createAuthEndpoint("/verify-email", {
  method: "GET",
  operationId: "verifyEmail",
  query: z.object({
    token: z.string().meta({ description: "The token to verify the email" }),
    callbackURL: z.string().meta({ description: "The URL to redirect to after email verification" }).optional()
  }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    description: "Verify the email of the user",
    parameters: [{
      name: "token",
      in: "query",
      description: "The token to verify the email",
      required: true,
      schema: { type: "string" }
    }, {
      name: "callbackURL",
      in: "query",
      description: "The URL to redirect to after email verification",
      required: false,
      schema: { type: "string" }
    }],
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user: {
            type: "object",
            $ref: "#/components/schemas/User"
          },
          status: {
            type: "boolean",
            description: "Indicates if the email was verified successfully"
          }
        },
        required: ["user", "status"]
      } } }
    } }
  } }
}, async (ctx) => {
  var _a, _b, _c, _d, _e, _f;
  function redirectOnError(error2) {
    if (ctx.query.callbackURL) {
      if (ctx.query.callbackURL.includes("?")) throw ctx.redirect(`${ctx.query.callbackURL}&error=${error2}`);
      throw ctx.redirect(`${ctx.query.callbackURL}?error=${error2}`);
    }
    throw new APIError("UNAUTHORIZED", { message: error2 });
  }
  const { token } = ctx.query;
  let jwt;
  try {
    jwt = await jwtVerify(token, new TextEncoder().encode(ctx.context.secret), { algorithms: ["HS256"] });
  } catch (e) {
    if (e instanceof JWTExpired) return redirectOnError("token_expired");
    return redirectOnError("invalid_token");
  }
  const parsed = z.object({
    email: z.email(),
    updateTo: z.string().optional(),
    requestType: z.string().optional()
  }).parse(jwt.payload);
  const user2 = await ctx.context.internalAdapter.findUserByEmail(parsed.email);
  if (!user2) return redirectOnError("user_not_found");
  if (parsed.updateTo) {
    let session2 = await getSessionFromCtx(ctx);
    if (session2 && session2.user.email !== parsed.email) return redirectOnError("unauthorized");
    if (parsed.requestType === "change-email-confirmation") {
      const newToken$1 = await createEmailVerificationToken(ctx.context.secret, parsed.email, parsed.updateTo, (_a = ctx.context.options.emailVerification) == null ? void 0 : _a.expiresIn, { requestType: "change-email-verification" });
      const updateCallbackURL$1 = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
      const url = `${ctx.context.baseURL}/verify-email?token=${newToken$1}&callbackURL=${updateCallbackURL$1}`;
      if ((_b = ctx.context.options.emailVerification) == null ? void 0 : _b.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
        user: {
          ...user2.user,
          email: parsed.updateTo
        },
        url,
        token: newToken$1
      }, ctx.request));
      if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
      return ctx.json({ status: true });
    }
    if (!session2) {
      const newSession = await ctx.context.internalAdapter.createSession(user2.user.id);
      if (!newSession) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to create session" });
      session2 = {
        session: newSession,
        user: user2.user
      };
    }
    if (parsed.requestType === "change-email-verification") {
      const updatedUser$2 = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
        email: parsed.updateTo,
        emailVerified: true
      });
      await setSessionCookie(ctx, {
        session: session2.session,
        user: {
          ...session2.user,
          email: parsed.updateTo,
          emailVerified: true
        }
      });
      if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
      return ctx.json({
        status: true,
        user: updatedUser$2
      });
    }
    const updatedUser$1 = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
      email: parsed.updateTo,
      emailVerified: false
    });
    const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.updateTo);
    const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
    if ((_c = ctx.context.options.emailVerification) == null ? void 0 : _c.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
      user: updatedUser$1,
      url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`,
      token: newToken
    }, ctx.request));
    await setSessionCookie(ctx, {
      session: session2.session,
      user: {
        ...session2.user,
        email: parsed.updateTo,
        emailVerified: false
      }
    });
    if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
    return ctx.json({
      status: true,
      user: {
        id: updatedUser$1.id,
        email: updatedUser$1.email,
        name: updatedUser$1.name,
        image: updatedUser$1.image,
        emailVerified: updatedUser$1.emailVerified,
        createdAt: updatedUser$1.createdAt,
        updatedAt: updatedUser$1.updatedAt
      }
    });
  }
  if (user2.user.emailVerified) {
    if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
    return ctx.json({
      status: true,
      user: null
    });
  }
  if ((_d = ctx.context.options.emailVerification) == null ? void 0 : _d.onEmailVerification) await ctx.context.options.emailVerification.onEmailVerification(user2.user, ctx.request);
  const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, { emailVerified: true });
  if ((_e = ctx.context.options.emailVerification) == null ? void 0 : _e.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
  if ((_f = ctx.context.options.emailVerification) == null ? void 0 : _f.autoSignInAfterVerification) {
    const currentSession = await getSessionFromCtx(ctx);
    if (!currentSession || currentSession.user.email !== parsed.email) {
      const session2 = await ctx.context.internalAdapter.createSession(user2.user.id);
      if (!session2) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to create session" });
      await setSessionCookie(ctx, {
        session: session2,
        user: {
          ...user2.user,
          emailVerified: true
        }
      });
    } else await setSessionCookie(ctx, {
      session: currentSession.session,
      user: {
        ...currentSession.user,
        emailVerified: true
      }
    });
  }
  if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
  return ctx.json({
    status: true,
    user: null
  });
});
async function handleOAuthUserInfo(c, opts) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const { userInfo, account: account2, callbackURL, disableSignUp, overrideUserInfo } = opts;
  const dbUser = await c.context.internalAdapter.findOAuthUser(userInfo.email.toLowerCase(), account2.accountId, account2.providerId).catch((e) => {
    var _a2;
    logger.error("Better auth was unable to query your database.\nError: ", e);
    const errorURL = ((_a2 = c.context.options.onAPIError) == null ? void 0 : _a2.errorURL) || `${c.context.baseURL}/error`;
    throw c.redirect(`${errorURL}?error=internal_server_error`);
  });
  let user2 = dbUser == null ? void 0 : dbUser.user;
  let isRegister = !user2;
  if (dbUser) {
    const hasBeenLinked = dbUser.accounts.find((a) => a.providerId === account2.providerId && a.accountId === account2.accountId);
    if (!hasBeenLinked) {
      const trustedProviders = (_b = (_a = c.context.options.account) == null ? void 0 : _a.accountLinking) == null ? void 0 : _b.trustedProviders;
      if (!(opts.isTrustedProvider || (trustedProviders == null ? void 0 : trustedProviders.includes(account2.providerId))) && !userInfo.emailVerified || ((_d = (_c = c.context.options.account) == null ? void 0 : _c.accountLinking) == null ? void 0 : _d.enabled) === false) {
        if (isDevelopment()) logger.warn(`User already exist but account isn't linked to ${account2.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`);
        return {
          error: "account not linked",
          data: null
        };
      }
      try {
        await c.context.internalAdapter.linkAccount({
          providerId: account2.providerId,
          accountId: userInfo.id.toString(),
          userId: dbUser.user.id,
          accessToken: await setTokenUtil(account2.accessToken, c.context),
          refreshToken: await setTokenUtil(account2.refreshToken, c.context),
          idToken: account2.idToken,
          accessTokenExpiresAt: account2.accessTokenExpiresAt,
          refreshTokenExpiresAt: account2.refreshTokenExpiresAt,
          scope: account2.scope
        });
      } catch (e) {
        logger.error("Unable to link account", e);
        return {
          error: "unable to link account",
          data: null
        };
      }
      if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
    } else {
      if (((_e = c.context.options.account) == null ? void 0 : _e.updateAccountOnSignIn) !== false) {
        const updateData = Object.fromEntries(Object.entries({
          idToken: account2.idToken,
          accessToken: await setTokenUtil(account2.accessToken, c.context),
          refreshToken: await setTokenUtil(account2.refreshToken, c.context),
          accessTokenExpiresAt: account2.accessTokenExpiresAt,
          refreshTokenExpiresAt: account2.refreshTokenExpiresAt,
          scope: account2.scope
        }).filter(([_, value]) => value !== void 0));
        if ((_f = c.context.options.account) == null ? void 0 : _f.storeAccountCookie) await setAccountCookie(c, {
          ...account2,
          ...updateData
        });
        if (Object.keys(updateData).length > 0) await c.context.internalAdapter.updateAccount(hasBeenLinked.id, updateData);
      }
      if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
    }
    if (overrideUserInfo) {
      const { id: _, ...restUserInfo } = userInfo;
      user2 = await c.context.internalAdapter.updateUser(dbUser.user.id, {
        ...restUserInfo,
        email: userInfo.email.toLowerCase(),
        emailVerified: userInfo.email.toLowerCase() === dbUser.user.email ? dbUser.user.emailVerified || userInfo.emailVerified : userInfo.emailVerified
      });
    }
  } else {
    if (disableSignUp) return {
      error: "signup disabled",
      data: null,
      isRegister: false
    };
    try {
      const { id: _, ...restUserInfo } = userInfo;
      const accountData = {
        accessToken: await setTokenUtil(account2.accessToken, c.context),
        refreshToken: await setTokenUtil(account2.refreshToken, c.context),
        idToken: account2.idToken,
        accessTokenExpiresAt: account2.accessTokenExpiresAt,
        refreshTokenExpiresAt: account2.refreshTokenExpiresAt,
        scope: account2.scope,
        providerId: account2.providerId,
        accountId: userInfo.id.toString()
      };
      const { user: createdUser, account: createdAccount } = await c.context.internalAdapter.createOAuthUser({
        ...restUserInfo,
        email: userInfo.email.toLowerCase()
      }, accountData);
      user2 = createdUser;
      if ((_g = c.context.options.account) == null ? void 0 : _g.storeAccountCookie) await setAccountCookie(c, createdAccount);
      if (!userInfo.emailVerified && user2 && ((_h = c.context.options.emailVerification) == null ? void 0 : _h.sendOnSignUp) && ((_i = c.context.options.emailVerification) == null ? void 0 : _i.sendVerificationEmail)) {
        const token = await createEmailVerificationToken(c.context.secret, user2.email, void 0, (_j = c.context.options.emailVerification) == null ? void 0 : _j.expiresIn);
        const url = `${c.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
        await c.context.runInBackgroundOrAwait(c.context.options.emailVerification.sendVerificationEmail({
          user: user2,
          url,
          token
        }, c.request));
      }
    } catch (e) {
      logger.error(e);
      if (e instanceof APIError) return {
        error: e.message,
        data: null,
        isRegister: false
      };
      return {
        error: "unable to create user",
        data: null,
        isRegister: false
      };
    }
  }
  if (!user2) return {
    error: "unable to create user",
    data: null,
    isRegister: false
  };
  const session2 = await c.context.internalAdapter.createSession(user2.id);
  if (!session2) return {
    error: "unable to create session",
    data: null,
    isRegister: false
  };
  return {
    data: {
      session: session2,
      user: user2
    },
    error: null,
    isRegister
  };
}
const schema$1 = z.object({
  code: z.string().optional(),
  error: z.string().optional(),
  device_id: z.string().optional(),
  error_description: z.string().optional(),
  state: z.string().optional(),
  user: z.string().optional()
});
const callbackOAuth = createAuthEndpoint("/callback/:id", {
  method: ["GET", "POST"],
  operationId: "handleOAuthCallback",
  body: schema$1.optional(),
  query: schema$1.optional(),
  metadata: {
    ...HIDE_METADATA,
    allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"]
  }
}, async (c) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  let queryOrBody;
  const defaultErrorURL = ((_a = c.context.options.onAPIError) == null ? void 0 : _a.errorURL) || `${c.context.baseURL}/error`;
  if (c.method === "POST") {
    const postData = c.body ? schema$1.parse(c.body) : {};
    const queryData = c.query ? schema$1.parse(c.query) : {};
    const mergedData = schema$1.parse({
      ...postData,
      ...queryData
    });
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(mergedData)) if (value !== void 0 && value !== null) params.set(key, String(value));
    const redirectURL = `${c.context.baseURL}/callback/${c.params.id}?${params.toString()}`;
    throw c.redirect(redirectURL);
  }
  try {
    if (c.method === "GET") queryOrBody = schema$1.parse(c.query);
    else if (c.method === "POST") queryOrBody = schema$1.parse(c.body);
    else throw new Error("Unsupported method");
  } catch (e) {
    c.context.logger.error("INVALID_CALLBACK_REQUEST", e);
    throw c.redirect(`${defaultErrorURL}?error=invalid_callback_request`);
  }
  const { code, error: error2, state, error_description, device_id } = queryOrBody;
  if (!state) {
    c.context.logger.error("State not found", error2);
    const url = `${defaultErrorURL}${defaultErrorURL.includes("?") ? "&" : "?"}state=state_not_found`;
    throw c.redirect(url);
  }
  const { codeVerifier, callbackURL, link, errorURL, newUserURL, requestSignUp } = await parseState(c);
  function redirectOnError(error$1, description) {
    const baseURL = errorURL ?? defaultErrorURL;
    const params = new URLSearchParams({ error: error$1 });
    if (description) params.set("error_description", description);
    const url = `${baseURL}${baseURL.includes("?") ? "&" : "?"}${params.toString()}`;
    throw c.redirect(url);
  }
  if (error2) redirectOnError(error2, error_description);
  if (!code) {
    c.context.logger.error("Code not found");
    throw redirectOnError("no_code");
  }
  const provider = c.context.socialProviders.find((p) => p.id === c.params.id);
  if (!provider) {
    c.context.logger.error("Oauth provider with id", c.params.id, "not found");
    throw redirectOnError("oauth_provider_not_found");
  }
  let tokens;
  try {
    tokens = await provider.validateAuthorizationCode({
      code,
      codeVerifier,
      deviceId: device_id,
      redirectURI: `${c.context.baseURL}/callback/${provider.id}`
    });
  } catch (e) {
    c.context.logger.error("", e);
    throw redirectOnError("invalid_code");
  }
  const userInfo = await provider.getUserInfo({
    ...tokens,
    user: ((_b = c.body) == null ? void 0 : _b.user) ? safeJSONParse(c.body.user) : void 0
  }).then((res) => res == null ? void 0 : res.user);
  if (!userInfo) {
    c.context.logger.error("Unable to get user info");
    return redirectOnError("unable_to_get_user_info");
  }
  if (!callbackURL) {
    c.context.logger.error("No callback URL found");
    throw redirectOnError("no_callback_url");
  }
  if (link) {
    if (!((_e = (_d = (_c = c.context.options.account) == null ? void 0 : _c.accountLinking) == null ? void 0 : _d.trustedProviders) == null ? void 0 : _e.includes(provider.id)) && !userInfo.emailVerified || ((_g = (_f = c.context.options.account) == null ? void 0 : _f.accountLinking) == null ? void 0 : _g.enabled) === false) {
      c.context.logger.error("Unable to link account - untrusted provider");
      return redirectOnError("unable_to_link_account");
    }
    if (userInfo.email !== link.email && ((_i = (_h = c.context.options.account) == null ? void 0 : _h.accountLinking) == null ? void 0 : _i.allowDifferentEmails) !== true) return redirectOnError("email_doesn't_match");
    const existingAccount = await c.context.internalAdapter.findAccount(String(userInfo.id));
    if (existingAccount) {
      if (existingAccount.userId.toString() !== link.userId.toString()) return redirectOnError("account_already_linked_to_different_user");
      const updateData = Object.fromEntries(Object.entries({
        accessToken: await setTokenUtil(tokens.accessToken, c.context),
        refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
        idToken: tokens.idToken,
        accessTokenExpiresAt: tokens.accessTokenExpiresAt,
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
        scope: (_j = tokens.scopes) == null ? void 0 : _j.join(",")
      }).filter(([_, value]) => value !== void 0));
      await c.context.internalAdapter.updateAccount(existingAccount.id, updateData);
    } else if (!await c.context.internalAdapter.createAccount({
      userId: link.userId,
      providerId: provider.id,
      accountId: String(userInfo.id),
      ...tokens,
      accessToken: await setTokenUtil(tokens.accessToken, c.context),
      refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
      scope: (_k = tokens.scopes) == null ? void 0 : _k.join(",")
    })) return redirectOnError("unable_to_link_account");
    let toRedirectTo$1;
    try {
      toRedirectTo$1 = callbackURL.toString();
    } catch {
      toRedirectTo$1 = callbackURL;
    }
    throw c.redirect(toRedirectTo$1);
  }
  if (!userInfo.email) {
    c.context.logger.error("Provider did not return email. This could be due to misconfiguration in the provider settings.");
    return redirectOnError("email_not_found");
  }
  const accountData = {
    providerId: provider.id,
    accountId: String(userInfo.id),
    ...tokens,
    scope: (_l = tokens.scopes) == null ? void 0 : _l.join(",")
  };
  const result = await handleOAuthUserInfo(c, {
    userInfo: {
      ...userInfo,
      id: String(userInfo.id),
      email: userInfo.email,
      name: userInfo.name || userInfo.email
    },
    account: accountData,
    callbackURL,
    disableSignUp: provider.disableImplicitSignUp && !requestSignUp || ((_m = provider.options) == null ? void 0 : _m.disableSignUp),
    overrideUserInfo: (_n = provider.options) == null ? void 0 : _n.overrideUserInfoOnSignIn
  });
  if (result.error) {
    c.context.logger.error(result.error.split(" ").join("_"));
    return redirectOnError(result.error.split(" ").join("_"));
  }
  const { session: session2, user: user2 } = result.data;
  await setSessionCookie(c, {
    session: session2,
    user: user2
  });
  let toRedirectTo;
  try {
    toRedirectTo = (result.isRegister ? newUserURL || callbackURL : callbackURL).toString();
  } catch {
    toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
  }
  throw c.redirect(toRedirectTo);
});
function sanitize(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/&(?!amp;|lt;|gt;|quot;|#39;|#x[0-9a-fA-F]+;|#[0-9]+;)/g, "&amp;");
}
const html = (options, code = "Unknown", description = null) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E;
  const custom = (_a = options.onAPIError) == null ? void 0 : _a.customizeDefaultErrorPage;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: ${((_b = custom == null ? void 0 : custom.font) == null ? void 0 : _b.defaultFamily) || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"};
        background: ${((_c = custom == null ? void 0 : custom.colors) == null ? void 0 : _c.background) || "var(--background)"};
        color: var(--foreground);
        margin: 0;
      }
      :root,
      :host {
        --spacing: 0.25rem;
        --container-md: 28rem;
        --text-sm: ${((_d = custom == null ? void 0 : custom.size) == null ? void 0 : _d.textSm) || "0.875rem"};
        --text-sm--line-height: calc(1.25 / 0.875);
        --text-2xl: ${((_e = custom == null ? void 0 : custom.size) == null ? void 0 : _e.text2xl) || "1.5rem"};
        --text-2xl--line-height: calc(2 / 1.5);
        --text-4xl: ${((_f = custom == null ? void 0 : custom.size) == null ? void 0 : _f.text4xl) || "2.25rem"};
        --text-4xl--line-height: calc(2.5 / 2.25);
        --text-6xl: ${((_g = custom == null ? void 0 : custom.size) == null ? void 0 : _g.text6xl) || "3rem"};
        --text-6xl--line-height: 1;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --default-transition-duration: 150ms;
        --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        --radius: ${((_h = custom == null ? void 0 : custom.size) == null ? void 0 : _h.radiusSm) || "0.625rem"};
        --default-mono-font-family: ${((_i = custom == null ? void 0 : custom.font) == null ? void 0 : _i.monoFamily) || "var(--font-geist-mono)"};
        --primary: ${((_j = custom == null ? void 0 : custom.colors) == null ? void 0 : _j.primary) || "black"};
        --primary-foreground: ${((_k = custom == null ? void 0 : custom.colors) == null ? void 0 : _k.primaryForeground) || "white"};
        --background: ${((_l = custom == null ? void 0 : custom.colors) == null ? void 0 : _l.background) || "white"};
        --foreground: ${((_m = custom == null ? void 0 : custom.colors) == null ? void 0 : _m.foreground) || "oklch(0.271 0 0)"};
        --border: ${((_n = custom == null ? void 0 : custom.colors) == null ? void 0 : _n.border) || "oklch(0.89 0 0)"};
        --destructive: ${((_o = custom == null ? void 0 : custom.colors) == null ? void 0 : _o.destructive) || "oklch(0.55 0.15 25.723)"};
        --muted-foreground: ${((_p = custom == null ? void 0 : custom.colors) == null ? void 0 : _p.mutedForeground) || "oklch(0.545 0 0)"};
        --corner-border: ${((_q = custom == null ? void 0 : custom.colors) == null ? void 0 : _q.cornerBorder) || "#404040"};
      }

      button, .btn {
        cursor: pointer;
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        transition: all var(--default-transition-duration)
          var(--default-transition-timing-function);
      }
      button:hover, .btn:hover {
        opacity: 0.8;
      }

      @media (prefers-color-scheme: dark) {
        :root,
        :host {
          --primary: ${((_r = custom == null ? void 0 : custom.colors) == null ? void 0 : _r.primary) || "white"};
          --primary-foreground: ${((_s = custom == null ? void 0 : custom.colors) == null ? void 0 : _s.primaryForeground) || "black"};
          --background: ${((_t = custom == null ? void 0 : custom.colors) == null ? void 0 : _t.background) || "oklch(0.15 0 0)"};
          --foreground: ${((_u = custom == null ? void 0 : custom.colors) == null ? void 0 : _u.foreground) || "oklch(0.98 0 0)"};
          --border: ${((_v = custom == null ? void 0 : custom.colors) == null ? void 0 : _v.border) || "oklch(0.27 0 0)"};
          --destructive: ${((_w = custom == null ? void 0 : custom.colors) == null ? void 0 : _w.destructive) || "oklch(0.65 0.15 25.723)"};
          --muted-foreground: ${((_x = custom == null ? void 0 : custom.colors) == null ? void 0 : _x.mutedForeground) || "oklch(0.65 0 0)"};
          --corner-border: ${((_y = custom == null ? void 0 : custom.colors) == null ? void 0 : _y.cornerBorder) || "#a0a0a0"};
        }
      }
      @media (max-width: 640px) {
        :root, :host {
          --text-6xl: 2.5rem;
          --text-2xl: 1.25rem;
          --text-sm: 0.8125rem;
        }
      }
      @media (max-width: 480px) {
        :root, :host {
          --text-6xl: 2rem;
          --text-2xl: 1.125rem;
        }
      }
    </style>
  </head>
  <body style="width: 100vw; min-height: 100vh; overflow-x: hidden; overflow-y: auto;">
    <div
        style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            position: relative;
            width: 100%;
            min-height: 100vh;
            padding: 1rem;
        "
        >
${(custom == null ? void 0 : custom.disableBackgroundGrid) ? "" : `
      <div
        style="
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, ${((_z = custom == null ? void 0 : custom.colors) == null ? void 0 : _z.gridColor) || "var(--border)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${((_A = custom == null ? void 0 : custom.colors) == null ? void 0 : _A.gridColor) || "var(--border)"} 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.6;
          pointer-events: none;
          width: 100vw;
          height: 100vh;
        "
      ></div>
      <div
        style="
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${((_B = custom == null ? void 0 : custom.colors) == null ? void 0 : _B.background) || "var(--background)"};
          mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          pointer-events: none;
        "
      ></div>
`}

<div
  style="
    position: relative;
    z-index: 10;
    border: 2px solid var(--border);
    background: ${((_C = custom == null ? void 0 : custom.colors) == null ? void 0 : _C.cardBackground) || "var(--background)"};
    padding: 1.5rem;
    max-width: 42rem;
    width: 100%;
  "
>
    ${(custom == null ? void 0 : custom.disableCornerDecorations) ? "" : `
        <!-- Corner decorations -->
        <div
          style="
            position: absolute;
            top: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            top: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>
  
        <div
          style="
            position: absolute;
            bottom: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>`}

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="margin-bottom: 1.5rem;">
            <div
              style="
                display: inline-block;
                border: 2px solid ${(custom == null ? void 0 : custom.disableTitleBorder) ? "transparent" : ((_D = custom == null ? void 0 : custom.colors) == null ? void 0 : _D.titleBorder) || "var(--destructive)"};
                padding: 0.375rem 1rem;
              "
            >
              <h1
                style="
                  font-size: var(--text-6xl);
                  font-weight: var(--font-weight-semibold);
                  color: ${((_E = custom == null ? void 0 : custom.colors) == null ? void 0 : _E.titleColor) || "var(--foreground)"};
                  letter-spacing: -0.02em;
                  margin: 0;
                "
              >
                ERROR
              </h1>
            </div>
            <div
              style="
                height: 2px;
                background-color: var(--border);
                width: calc(100% + 3rem);
                margin-left: -1.5rem;
                margin-top: 1.5rem;
              "
            ></div>
          </div>

          <h2
            style="
              font-size: var(--text-2xl);
              font-weight: var(--font-weight-semibold);
              color: var(--foreground);
              margin: 0 0 1rem;
            "
          >
            Something went wrong
          </h2>

          <div
            style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border: 2px solid var(--border);
                background-color: var(--muted);
                padding: 0.375rem 0.75rem;
                margin: 0 0 1rem;
                flex-wrap: wrap;
                justify-content: center;
            "
            >
            <span
                style="
                font-size: 0.75rem;
                color: var(--muted-foreground);
                font-weight: var(--font-weight-semibold);
                "
            >
                CODE:
            </span>
            <span
                style="
                font-size: var(--text-sm);
                font-family: var(--default-mono-font-family, monospace);
                color: var(--foreground);
                word-break: break-all;
                "
            >
                ${sanitize(code)}
            </span>
            </div>

          <p
            style="
              color: var(--muted-foreground);
              max-width: 28rem;
              margin: 0 auto;
              font-size: var(--text-sm);
              line-height: 1.5;
              text-wrap: pretty;
            "
          >
            ${!description ? `We encountered an unexpected error. Please try again or return to the home page. If you're a developer, you can find more information about the error <a href='https://better-auth.com/docs/errors/${encodeURIComponent(code)}' target='_blank' rel="noopener noreferrer" style='color: var(--foreground); text-decoration: underline;'>here</a>.` : description}
          </p>
        </div>

        <div
          style="
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
          "
        >
          <a
            href="/"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: var(--primary);
                color: var(--primary-foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Go Home
            </div>
          </a>
          <a
            href="https://better-auth.com/docs/errors/${encodeURIComponent(code)}?askai=${encodeURIComponent(`What does the error code ${code} mean?`)}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: transparent;
                color: var(--foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Ask AI
            </div>
          </a>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
const error = createAuthEndpoint("/error", {
  method: "GET",
  metadata: {
    ...HIDE_METADATA,
    openapi: {
      description: "Displays an error page",
      responses: { "200": {
        description: "Success",
        content: { "text/html": { schema: {
          type: "string",
          description: "The HTML content of the error page"
        } } }
      } }
    }
  }
}, async (c) => {
  var _a, _b, _c;
  const url = new URL(((_a = c.request) == null ? void 0 : _a.url) || "");
  const unsanitizedCode = url.searchParams.get("error") || "UNKNOWN";
  const unsanitizedDescription = url.searchParams.get("error_description") || null;
  const safeCode = /^[\'A-Za-z0-9_-]+$/.test(unsanitizedCode) ? unsanitizedCode : "UNKNOWN";
  const safeDescription = unsanitizedDescription ? sanitize(unsanitizedDescription) : null;
  const queryParams = new URLSearchParams();
  queryParams.set("error", safeCode);
  if (unsanitizedDescription) queryParams.set("error_description", unsanitizedDescription);
  const options = c.context.options;
  const errorURL = (_b = options.onAPIError) == null ? void 0 : _b.errorURL;
  if (errorURL) return new Response(null, {
    status: 302,
    headers: { Location: `${errorURL}${errorURL.includes("?") ? "&" : "?"}${queryParams.toString()}` }
  });
  if (isProduction && !((_c = options.onAPIError) == null ? void 0 : _c.customizeDefaultErrorPage)) return new Response(null, {
    status: 302,
    headers: { Location: `/?${queryParams.toString()}` }
  });
  return new Response(html(c.context.options, safeCode, safeDescription), { headers: { "Content-Type": "text/html" } });
});
const ok = createAuthEndpoint("/ok", {
  method: "GET",
  metadata: {
    ...HIDE_METADATA,
    openapi: {
      description: "Check if the API is working",
      responses: { "200": {
        description: "API is working",
        content: { "application/json": { schema: {
          type: "object",
          properties: { ok: {
            type: "boolean",
            description: "Indicates if the API is working"
          } },
          required: ["ok"]
        } } }
      } }
    }
  }
}, async (ctx) => {
  return ctx.json({ ok: true });
});
function redirectError(ctx, callbackURL, query) {
  const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
  const url = new URL(callbackURL, ctx.baseURL);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.href;
}
const requestPasswordReset = createAuthEndpoint("/request-password-reset", {
  method: "POST",
  body: z.object({
    email: z.email().meta({ description: "The email address of the user to send a password reset email to" }),
    redirectTo: z.string().meta({ description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN" }).optional()
  }),
  metadata: { openapi: {
    operationId: "requestPasswordReset",
    description: "Send a password reset email to the user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  var _a;
  if (!((_a = ctx.context.options.emailAndPassword) == null ? void 0 : _a.sendResetPassword)) {
    ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
    throw new APIError("BAD_REQUEST", { message: "Reset password isn't enabled" });
  }
  const { email, redirectTo } = ctx.body;
  const user2 = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
  if (!user2) {
    generateId(24);
    await ctx.context.internalAdapter.findVerificationValue("dummy-verification-token");
    ctx.context.logger.error("Reset Password: User not found", { email });
    return ctx.json({
      status: true,
      message: "If this email exists in our system, check your email for the reset link"
    });
  }
  const expiresAt = getDate(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || 3600 * 1, "sec");
  const verificationToken = generateId(24);
  await ctx.context.internalAdapter.createVerificationValue({
    value: user2.user.id,
    identifier: `reset-password:${verificationToken}`,
    expiresAt
  });
  const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
  const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
  await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailAndPassword.sendResetPassword({
    user: user2.user,
    url,
    token: verificationToken
  }, ctx.request));
  return ctx.json({
    status: true,
    message: "If this email exists in our system, check your email for the reset link"
  });
});
const requestPasswordResetCallback = createAuthEndpoint("/reset-password/:token", {
  method: "GET",
  operationId: "forgetPasswordCallback",
  query: z.object({ callbackURL: z.string().meta({ description: "The URL to redirect the user to reset their password" }) }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    operationId: "resetPasswordCallback",
    description: "Redirects the user to the callback URL with the token",
    parameters: [{
      name: "token",
      in: "path",
      required: true,
      description: "The token to reset the password",
      schema: { type: "string" }
    }, {
      name: "callbackURL",
      in: "query",
      required: true,
      description: "The URL to redirect the user to reset their password",
      schema: { type: "string" }
    }],
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { token: { type: "string" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { token } = ctx.params;
  const { callbackURL } = ctx.query;
  if (!token || !callbackURL) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
  const verification2 = await ctx.context.internalAdapter.findVerificationValue(`reset-password:${token}`);
  if (!verification2 || verification2.expiresAt < /* @__PURE__ */ new Date()) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
  throw ctx.redirect(redirectCallback(ctx.context, callbackURL, { token }));
});
const resetPassword = createAuthEndpoint("/reset-password", {
  method: "POST",
  operationId: "resetPassword",
  query: z.object({ token: z.string().optional() }).optional(),
  body: z.object({
    newPassword: z.string().meta({ description: "The new password to set" }),
    token: z.string().meta({ description: "The token to reset the password" }).optional()
  }),
  metadata: { openapi: {
    operationId: "resetPassword",
    description: "Reset the password for a user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  var _a, _b, _c, _d, _e;
  const token = ctx.body.token || ((_a = ctx.query) == null ? void 0 : _a.token);
  if (!token) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_TOKEN });
  const { newPassword } = ctx.body;
  const minLength = (_b = ctx.context.password) == null ? void 0 : _b.config.minPasswordLength;
  const maxLength = (_c = ctx.context.password) == null ? void 0 : _c.config.maxPasswordLength;
  if (newPassword.length < minLength) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
  if (newPassword.length > maxLength) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
  const id = `reset-password:${token}`;
  const verification2 = await ctx.context.internalAdapter.findVerificationValue(id);
  if (!verification2 || verification2.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_TOKEN });
  const userId = verification2.value;
  const hashedPassword = await ctx.context.password.hash(newPassword);
  if (!(await ctx.context.internalAdapter.findAccounts(userId)).find((ac) => ac.providerId === "credential")) await ctx.context.internalAdapter.createAccount({
    userId,
    providerId: "credential",
    password: hashedPassword,
    accountId: userId
  });
  else await ctx.context.internalAdapter.updatePassword(userId, hashedPassword);
  await ctx.context.internalAdapter.deleteVerificationValue(verification2.id);
  if ((_d = ctx.context.options.emailAndPassword) == null ? void 0 : _d.onPasswordReset) {
    const user2 = await ctx.context.internalAdapter.findUserById(userId);
    if (user2) await ctx.context.options.emailAndPassword.onPasswordReset({ user: user2 }, ctx.request);
  }
  if ((_e = ctx.context.options.emailAndPassword) == null ? void 0 : _e.revokeSessionsOnPasswordReset) await ctx.context.internalAdapter.deleteSessions(userId);
  return ctx.json({ status: true });
});
const socialSignInBodySchema = z.object({
  callbackURL: z.string().meta({ description: "Callback URL to redirect to after the user has signed in" }).optional(),
  newUserCallbackURL: z.string().optional(),
  errorCallbackURL: z.string().meta({ description: "Callback URL to redirect to if an error happens" }).optional(),
  provider: SocialProviderListEnum,
  disableRedirect: z.boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
  idToken: z.optional(z.object({
    token: z.string().meta({ description: "ID token from the provider" }),
    nonce: z.string().meta({ description: "Nonce used to generate the token" }).optional(),
    accessToken: z.string().meta({ description: "Access token from the provider" }).optional(),
    refreshToken: z.string().meta({ description: "Refresh token from the provider" }).optional(),
    expiresAt: z.number().meta({ description: "Expiry date of the token" }).optional()
  })),
  scopes: z.array(z.string()).meta({ description: "Array of scopes to request from the provider. This will override the default scopes passed." }).optional(),
  requestSignUp: z.boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider" }).optional(),
  loginHint: z.string().meta({ description: "The login hint to use for the authorization code request" }).optional(),
  additionalData: z.record(z.string(), z.any()).optional().meta({ description: "Additional data to be passed through the OAuth flow" })
});
const signInSocial = () => createAuthEndpoint("/sign-in/social", {
  method: "POST",
  operationId: "socialSignIn",
  body: socialSignInBodySchema,
  metadata: {
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      description: "Sign in with a social provider",
      operationId: "socialSignIn",
      responses: { "200": {
        description: "Success - Returns either session details or redirect URL",
        content: { "application/json": { schema: {
          type: "object",
          description: "Session response when idToken is provided",
          properties: {
            token: { type: "string" },
            user: {
              type: "object",
              $ref: "#/components/schemas/User"
            },
            url: { type: "string" },
            redirect: {
              type: "boolean",
              enum: [false]
            }
          },
          required: [
            "redirect",
            "token",
            "user"
          ]
        } } }
      } }
    }
  }
}, async (c) => {
  const provider = c.context.socialProviders.find((p) => p.id === c.body.provider);
  if (!provider) {
    c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
    throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.PROVIDER_NOT_FOUND });
  }
  if (c.body.idToken) {
    if (!provider.verifyIdToken) {
      c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
      throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED });
    }
    const { token, nonce } = c.body.idToken;
    if (!await provider.verifyIdToken(token, nonce)) {
      c.context.logger.error("Invalid id token", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_TOKEN });
    }
    const userInfo = await provider.getUserInfo({
      idToken: token,
      accessToken: c.body.idToken.accessToken,
      refreshToken: c.body.idToken.refreshToken
    });
    if (!userInfo || !(userInfo == null ? void 0 : userInfo.user)) {
      c.context.logger.error("Failed to get user info", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO });
    }
    if (!userInfo.user.email) {
      c.context.logger.error("User email not found", { provider: c.body.provider });
      throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND });
    }
    const data = await handleOAuthUserInfo(c, {
      userInfo: {
        ...userInfo.user,
        email: userInfo.user.email,
        id: String(userInfo.user.id),
        name: userInfo.user.name || "",
        image: userInfo.user.image,
        emailVerified: userInfo.user.emailVerified || false
      },
      account: {
        providerId: provider.id,
        accountId: String(userInfo.user.id),
        accessToken: c.body.idToken.accessToken
      },
      callbackURL: c.body.callbackURL,
      disableSignUp: provider.disableImplicitSignUp && !c.body.requestSignUp || provider.disableSignUp
    });
    if (data.error) throw new APIError("UNAUTHORIZED", { message: data.error });
    await setSessionCookie(c, data.data);
    return c.json({
      redirect: false,
      token: data.data.session.token,
      url: void 0,
      user: parseUserOutput(c.context.options, data.data.user)
    });
  }
  const { codeVerifier, state } = await generateState(c, void 0, c.body.additionalData);
  const url = await provider.createAuthorizationURL({
    state,
    codeVerifier,
    redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
    scopes: c.body.scopes,
    loginHint: c.body.loginHint
  });
  return c.json({
    url: url.toString(),
    redirect: !c.body.disableRedirect
  });
});
const signInEmail = () => createAuthEndpoint("/sign-in/email", {
  method: "POST",
  operationId: "signInEmail",
  body: z.object({
    email: z.string().meta({ description: "Email of the user" }),
    password: z.string().meta({ description: "Password of the user" }),
    callbackURL: z.string().meta({ description: "Callback URL to use as a redirect for email verification" }).optional(),
    rememberMe: z.boolean().meta({ description: "If this is false, the session will not be remembered. Default is `true`." }).default(true).optional()
  }),
  metadata: {
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      operationId: "signInEmail",
      description: "Sign in with email and password",
      responses: { "200": {
        description: "Success - Returns either session details or redirect URL",
        content: { "application/json": { schema: {
          type: "object",
          description: "Session response when idToken is provided",
          properties: {
            redirect: {
              type: "boolean",
              enum: [false]
            },
            token: {
              type: "string",
              description: "Session token"
            },
            url: {
              type: "string",
              nullable: true
            },
            user: {
              type: "object",
              $ref: "#/components/schemas/User"
            }
          },
          required: [
            "redirect",
            "token",
            "user"
          ]
        } } }
      } }
    }
  }
}, async (ctx) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  if (!((_b = (_a = ctx.context.options) == null ? void 0 : _a.emailAndPassword) == null ? void 0 : _b.enabled)) {
    ctx.context.logger.error("Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!");
    throw new APIError("BAD_REQUEST", { message: "Email and password is not enabled" });
  }
  const { email, password } = ctx.body;
  if (!z.email().safeParse(email).success) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_EMAIL });
  const user2 = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
  if (!user2) {
    await ctx.context.password.hash(password);
    ctx.context.logger.error("User not found", { email });
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD });
  }
  const credentialAccount = user2.accounts.find((a) => a.providerId === "credential");
  if (!credentialAccount) {
    await ctx.context.password.hash(password);
    ctx.context.logger.error("Credential account not found", { email });
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD });
  }
  const currentPassword = credentialAccount == null ? void 0 : credentialAccount.password;
  if (!currentPassword) {
    await ctx.context.password.hash(password);
    ctx.context.logger.error("Password not found", { email });
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD });
  }
  if (!await ctx.context.password.verify({
    hash: currentPassword,
    password
  })) {
    ctx.context.logger.error("Invalid password");
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD });
  }
  if (((_d = (_c = ctx.context.options) == null ? void 0 : _c.emailAndPassword) == null ? void 0 : _d.requireEmailVerification) && !user2.user.emailVerified) {
    if (!((_f = (_e = ctx.context.options) == null ? void 0 : _e.emailVerification) == null ? void 0 : _f.sendVerificationEmail)) throw new APIError("FORBIDDEN", { message: BASE_ERROR_CODES.EMAIL_NOT_VERIFIED });
    if ((_h = (_g = ctx.context.options) == null ? void 0 : _g.emailVerification) == null ? void 0 : _h.sendOnSignIn) {
      const token = await createEmailVerificationToken(ctx.context.secret, user2.user.email, void 0, (_i = ctx.context.options.emailVerification) == null ? void 0 : _i.expiresIn);
      const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
      const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
      await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
        user: user2.user,
        url,
        token
      }, ctx.request));
    }
    throw new APIError("FORBIDDEN", { message: BASE_ERROR_CODES.EMAIL_NOT_VERIFIED });
  }
  const session2 = await ctx.context.internalAdapter.createSession(user2.user.id, ctx.body.rememberMe === false);
  if (!session2) {
    ctx.context.logger.error("Failed to create session");
    throw new APIError("UNAUTHORIZED", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION });
  }
  await setSessionCookie(ctx, {
    session: session2,
    user: user2.user
  }, ctx.body.rememberMe === false);
  return ctx.json({
    redirect: !!ctx.body.callbackURL,
    token: session2.token,
    url: ctx.body.callbackURL,
    user: parseUserOutput(ctx.context.options, user2.user)
  });
});
const signOut = createAuthEndpoint("/sign-out", {
  method: "POST",
  operationId: "signOut",
  requireHeaders: true,
  metadata: { openapi: {
    operationId: "signOut",
    description: "Sign out the current user",
    responses: { "200": {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
  if (sessionCookieToken) try {
    await ctx.context.internalAdapter.deleteSession(sessionCookieToken);
  } catch (e) {
    ctx.context.logger.error("Failed to delete session from database", e);
  }
  deleteSessionCookie(ctx);
  return ctx.json({ success: true });
});
const signUpEmailBodySchema = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().nonempty(),
  image: z.string().optional(),
  callbackURL: z.string().optional(),
  rememberMe: z.boolean().optional()
}).and(z.record(z.string(), z.any()));
const signUpEmail = () => createAuthEndpoint("/sign-up/email", {
  method: "POST",
  operationId: "signUpWithEmailAndPassword",
  body: signUpEmailBodySchema,
  metadata: {
    $Infer: {
      body: {},
      returned: {}
    },
    openapi: {
      operationId: "signUpWithEmailAndPassword",
      description: "Sign up a user using email and password",
      requestBody: { content: { "application/json": { schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the user"
          },
          email: {
            type: "string",
            description: "The email of the user"
          },
          password: {
            type: "string",
            description: "The password of the user"
          },
          image: {
            type: "string",
            description: "The profile image URL of the user"
          },
          callbackURL: {
            type: "string",
            description: "The URL to use for email verification callback"
          },
          rememberMe: {
            type: "boolean",
            description: "If this is false, the session will not be remembered. Default is `true`."
          }
        },
        required: [
          "name",
          "email",
          "password"
        ]
      } } } },
      responses: {
        "200": {
          description: "Successfully created user",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
                nullable: true,
                description: "Authentication token for the session"
              },
              user: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "The unique identifier of the user"
                  },
                  email: {
                    type: "string",
                    format: "email",
                    description: "The email address of the user"
                  },
                  name: {
                    type: "string",
                    description: "The name of the user"
                  },
                  image: {
                    type: "string",
                    format: "uri",
                    nullable: true,
                    description: "The profile image URL of the user"
                  },
                  emailVerified: {
                    type: "boolean",
                    description: "Whether the email has been verified"
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "When the user was created"
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "When the user was last updated"
                  }
                },
                required: [
                  "id",
                  "email",
                  "name",
                  "emailVerified",
                  "createdAt",
                  "updatedAt"
                ]
              }
            },
            required: ["user"]
          } } }
        },
        "422": {
          description: "Unprocessable Entity. User already exists or failed to create user.",
          content: { "application/json": { schema: {
            type: "object",
            properties: { message: { type: "string" } }
          } } }
        }
      }
    }
  }
}, async (ctx) => {
  return runWithTransaction(ctx.context.adapter, async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!((_a = ctx.context.options.emailAndPassword) == null ? void 0 : _a.enabled) || ((_b = ctx.context.options.emailAndPassword) == null ? void 0 : _b.disableSignUp)) throw new APIError("BAD_REQUEST", { message: "Email and password sign up is not enabled" });
    const body = ctx.body;
    const { name, email, password, image, callbackURL: _callbackURL, rememberMe, ...rest } = body;
    if (!z.email().safeParse(email).success) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_EMAIL });
    const minPasswordLength = ctx.context.password.config.minPasswordLength;
    if (password.length < minPasswordLength) {
      ctx.context.logger.error("Password is too short");
      throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
    }
    const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
    if (password.length > maxPasswordLength) {
      ctx.context.logger.error("Password is too long");
      throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
    }
    if ((_c = await ctx.context.internalAdapter.findUserByEmail(email)) == null ? void 0 : _c.user) {
      ctx.context.logger.info(`Sign-up attempt for existing email: ${email}`);
      throw new APIError("UNPROCESSABLE_ENTITY", { message: BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL });
    }
    const hash2 = await ctx.context.password.hash(password);
    let createdUser;
    try {
      const data = parseUserInput(ctx.context.options, rest, "create");
      createdUser = await ctx.context.internalAdapter.createUser({
        email: email.toLowerCase(),
        name,
        image,
        ...data,
        emailVerified: false
      });
      if (!createdUser) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER });
    } catch (e) {
      if (isDevelopment()) ctx.context.logger.error("Failed to create user", e);
      if (e instanceof APIError) throw e;
      (_d = ctx.context.logger) == null ? void 0 : _d.error("Failed to create user", e);
      throw new APIError("UNPROCESSABLE_ENTITY", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER });
    }
    if (!createdUser) throw new APIError("UNPROCESSABLE_ENTITY", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER });
    await ctx.context.internalAdapter.linkAccount({
      userId: createdUser.id,
      providerId: "credential",
      accountId: createdUser.id,
      password: hash2
    });
    if (((_e = ctx.context.options.emailVerification) == null ? void 0 : _e.sendOnSignUp) || ctx.context.options.emailAndPassword.requireEmailVerification) {
      const token = await createEmailVerificationToken(ctx.context.secret, createdUser.email, void 0, (_f = ctx.context.options.emailVerification) == null ? void 0 : _f.expiresIn);
      const callbackURL = body.callbackURL ? encodeURIComponent(body.callbackURL) : encodeURIComponent("/");
      const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
      if ((_g = ctx.context.options.emailVerification) == null ? void 0 : _g.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
        user: createdUser,
        url,
        token
      }, ctx.request));
    }
    if (ctx.context.options.emailAndPassword.autoSignIn === false || ctx.context.options.emailAndPassword.requireEmailVerification) return ctx.json({
      token: null,
      user: parseUserOutput(ctx.context.options, createdUser)
    });
    const session2 = await ctx.context.internalAdapter.createSession(createdUser.id, rememberMe === false);
    if (!session2) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION });
    await setSessionCookie(ctx, {
      session: session2,
      user: createdUser
    }, rememberMe === false);
    return ctx.json({
      token: session2.token,
      user: parseUserOutput(ctx.context.options, createdUser)
    });
  });
});
const updateUserBodySchema = z.record(z.string().meta({ description: "Field name must be a string" }), z.any());
const updateUser = () => createAuthEndpoint("/update-user", {
  method: "POST",
  operationId: "updateUser",
  body: updateUserBodySchema,
  use: [sessionMiddleware],
  metadata: {
    $Infer: { body: {} },
    openapi: {
      operationId: "updateUser",
      description: "Update the current user",
      requestBody: { content: { "application/json": { schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the user"
          },
          image: {
            type: "string",
            description: "The image of the user",
            nullable: true
          }
        }
      } } } },
      responses: { "200": {
        description: "Success",
        content: { "application/json": { schema: {
          type: "object",
          properties: { user: {
            type: "object",
            $ref: "#/components/schemas/User"
          } }
        } } }
      } }
    }
  }
}, async (ctx) => {
  const body = ctx.body;
  if (typeof body !== "object" || Array.isArray(body)) throw new APIError("BAD_REQUEST", { message: "Body must be an object" });
  if (body.email) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.EMAIL_CAN_NOT_BE_UPDATED });
  const { name, image, ...rest } = body;
  const session2 = ctx.context.session;
  const additionalFields = parseUserInput(ctx.context.options, rest, "update");
  if (image === void 0 && name === void 0 && Object.keys(additionalFields).length === 0) throw new APIError("BAD_REQUEST", { message: "No fields to update" });
  const updatedUser = await ctx.context.internalAdapter.updateUser(session2.user.id, {
    name,
    image,
    ...additionalFields
  }) ?? {
    ...session2.user,
    ...name !== void 0 && { name },
    ...image !== void 0 && { image },
    ...additionalFields
  };
  await setSessionCookie(ctx, {
    session: session2.session,
    user: updatedUser
  });
  return ctx.json({ status: true });
});
const changePassword = createAuthEndpoint("/change-password", {
  method: "POST",
  operationId: "changePassword",
  body: z.object({
    newPassword: z.string().meta({ description: "The new password to set" }),
    currentPassword: z.string().meta({ description: "The current password is required" }),
    revokeOtherSessions: z.boolean().meta({ description: "Must be a boolean value" }).optional()
  }),
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    operationId: "changePassword",
    description: "Change the password of the user",
    responses: { "200": {
      description: "Password successfully changed",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          token: {
            type: "string",
            nullable: true,
            description: "New session token if other sessions were revoked"
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier of the user"
              },
              email: {
                type: "string",
                format: "email",
                description: "The email address of the user"
              },
              name: {
                type: "string",
                description: "The name of the user"
              },
              image: {
                type: "string",
                format: "uri",
                nullable: true,
                description: "The profile image URL of the user"
              },
              emailVerified: {
                type: "boolean",
                description: "Whether the email has been verified"
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "When the user was created"
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description: "When the user was last updated"
              }
            },
            required: [
              "id",
              "email",
              "name",
              "emailVerified",
              "createdAt",
              "updatedAt"
            ]
          }
        },
        required: ["user"]
      } } }
    } }
  } }
}, async (ctx) => {
  const { newPassword, currentPassword, revokeOtherSessions: revokeOtherSessions2 } = ctx.body;
  const session2 = ctx.context.session;
  const minPasswordLength = ctx.context.password.config.minPasswordLength;
  if (newPassword.length < minPasswordLength) {
    ctx.context.logger.error("Password is too short");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
  }
  const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
  if (newPassword.length > maxPasswordLength) {
    ctx.context.logger.error("Password is too long");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
  }
  const account2 = (await ctx.context.internalAdapter.findAccounts(session2.user.id)).find((account$1) => account$1.providerId === "credential" && account$1.password);
  if (!account2 || !account2.password) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND });
  const passwordHash = await ctx.context.password.hash(newPassword);
  if (!await ctx.context.password.verify({
    hash: account2.password,
    password: currentPassword
  })) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_PASSWORD });
  await ctx.context.internalAdapter.updateAccount(account2.id, { password: passwordHash });
  let token = null;
  if (revokeOtherSessions2) {
    await ctx.context.internalAdapter.deleteSessions(session2.user.id);
    const newSession = await ctx.context.internalAdapter.createSession(session2.user.id);
    if (!newSession) throw new APIError("INTERNAL_SERVER_ERROR", { message: BASE_ERROR_CODES.FAILED_TO_GET_SESSION });
    await setSessionCookie(ctx, {
      session: newSession,
      user: session2.user
    });
    token = newSession.token;
  }
  return ctx.json({
    token,
    user: {
      id: session2.user.id,
      email: session2.user.email,
      name: session2.user.name,
      image: session2.user.image,
      emailVerified: session2.user.emailVerified,
      createdAt: session2.user.createdAt,
      updatedAt: session2.user.updatedAt
    }
  });
});
const setPassword = createAuthEndpoint({
  method: "POST",
  body: z.object({ newPassword: z.string().meta({ description: "The new password to set is required" }) }),
  use: [sensitiveSessionMiddleware]
}, async (ctx) => {
  const { newPassword } = ctx.body;
  const session2 = ctx.context.session;
  const minPasswordLength = ctx.context.password.config.minPasswordLength;
  if (newPassword.length < minPasswordLength) {
    ctx.context.logger.error("Password is too short");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
  }
  const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
  if (newPassword.length > maxPasswordLength) {
    ctx.context.logger.error("Password is too long");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
  }
  const account2 = (await ctx.context.internalAdapter.findAccounts(session2.user.id)).find((account$1) => account$1.providerId === "credential" && account$1.password);
  const passwordHash = await ctx.context.password.hash(newPassword);
  if (!account2) {
    await ctx.context.internalAdapter.linkAccount({
      userId: session2.user.id,
      providerId: "credential",
      accountId: session2.user.id,
      password: passwordHash
    });
    return ctx.json({ status: true });
  }
  throw new APIError("BAD_REQUEST", { message: "user already has a password" });
});
const deleteUser = createAuthEndpoint("/delete-user", {
  method: "POST",
  use: [sensitiveSessionMiddleware],
  body: z.object({
    callbackURL: z.string().meta({ description: "The callback URL to redirect to after the user is deleted" }).optional(),
    password: z.string().meta({ description: "The password of the user is required to delete the user" }).optional(),
    token: z.string().meta({ description: "The token to delete the user is required" }).optional()
  }),
  metadata: { openapi: {
    operationId: "deleteUser",
    description: "Delete the user",
    requestBody: { content: { "application/json": { schema: {
      type: "object",
      properties: {
        callbackURL: {
          type: "string",
          description: "The callback URL to redirect to after the user is deleted"
        },
        password: {
          type: "string",
          description: "The user's password. Required if session is not fresh"
        },
        token: {
          type: "string",
          description: "The deletion verification token"
        }
      }
    } } } },
    responses: { "200": {
      description: "User deletion processed successfully",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Indicates if the operation was successful"
          },
          message: {
            type: "string",
            enum: ["User deleted", "Verification email sent"],
            description: "Status message of the deletion process"
          }
        },
        required: ["success", "message"]
      } } }
    } }
  } }
}, async (ctx) => {
  var _a, _b, _c, _d, _e, _f;
  if (!((_b = (_a = ctx.context.options.user) == null ? void 0 : _a.deleteUser) == null ? void 0 : _b.enabled)) {
    ctx.context.logger.error("Delete user is disabled. Enable it in the options");
    throw new APIError("NOT_FOUND");
  }
  const session2 = ctx.context.session;
  if (ctx.body.password) {
    const account2 = (await ctx.context.internalAdapter.findAccounts(session2.user.id)).find((account$1) => account$1.providerId === "credential" && account$1.password);
    if (!account2 || !account2.password) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND });
    if (!await ctx.context.password.verify({
      hash: account2.password,
      password: ctx.body.password
    })) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_PASSWORD });
  }
  if (ctx.body.token) {
    await deleteUserCallback({
      ...ctx,
      query: { token: ctx.body.token }
    });
    return ctx.json({
      success: true,
      message: "User deleted"
    });
  }
  if ((_c = ctx.context.options.user.deleteUser) == null ? void 0 : _c.sendDeleteAccountVerification) {
    const token = generateRandomString(32, "0-9", "a-z");
    await ctx.context.internalAdapter.createVerificationValue({
      value: session2.user.id,
      identifier: `delete-account-${token}`,
      expiresAt: new Date(Date.now() + (((_d = ctx.context.options.user.deleteUser) == null ? void 0 : _d.deleteTokenExpiresIn) || 3600 * 24) * 1e3)
    });
    const url = `${ctx.context.baseURL}/delete-user/callback?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
    await ctx.context.runInBackgroundOrAwait(ctx.context.options.user.deleteUser.sendDeleteAccountVerification({
      user: session2.user,
      url,
      token
    }, ctx.request));
    return ctx.json({
      success: true,
      message: "Verification email sent"
    });
  }
  if (!ctx.body.password && ctx.context.sessionConfig.freshAge !== 0) {
    const currentAge = new Date(session2.session.createdAt).getTime();
    const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
    if (Date.now() - currentAge > freshAge * 1e3) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.SESSION_EXPIRED });
  }
  const beforeDelete = (_e = ctx.context.options.user.deleteUser) == null ? void 0 : _e.beforeDelete;
  if (beforeDelete) await beforeDelete(session2.user, ctx.request);
  await ctx.context.internalAdapter.deleteUser(session2.user.id);
  await ctx.context.internalAdapter.deleteSessions(session2.user.id);
  deleteSessionCookie(ctx);
  const afterDelete = (_f = ctx.context.options.user.deleteUser) == null ? void 0 : _f.afterDelete;
  if (afterDelete) await afterDelete(session2.user, ctx.request);
  return ctx.json({
    success: true,
    message: "User deleted"
  });
});
const deleteUserCallback = createAuthEndpoint("/delete-user/callback", {
  method: "GET",
  query: z.object({
    token: z.string().meta({ description: "The token to verify the deletion request" }),
    callbackURL: z.string().meta({ description: "The URL to redirect to after deletion" }).optional()
  }),
  use: [originCheck((ctx) => ctx.query.callbackURL)],
  metadata: { openapi: {
    description: "Callback to complete user deletion with verification token",
    responses: { "200": {
      description: "User successfully deleted",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            description: "Indicates if the deletion was successful"
          },
          message: {
            type: "string",
            enum: ["User deleted"],
            description: "Confirmation message"
          }
        },
        required: ["success", "message"]
      } } }
    } }
  } }
}, async (ctx) => {
  var _a, _b, _c, _d;
  if (!((_b = (_a = ctx.context.options.user) == null ? void 0 : _a.deleteUser) == null ? void 0 : _b.enabled)) {
    ctx.context.logger.error("Delete user is disabled. Enable it in the options");
    throw new APIError("NOT_FOUND");
  }
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO });
  const token = await ctx.context.internalAdapter.findVerificationValue(`delete-account-${ctx.query.token}`);
  if (!token || token.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.INVALID_TOKEN });
  if (token.value !== session2.user.id) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.INVALID_TOKEN });
  const beforeDelete = (_c = ctx.context.options.user.deleteUser) == null ? void 0 : _c.beforeDelete;
  if (beforeDelete) await beforeDelete(session2.user, ctx.request);
  await ctx.context.internalAdapter.deleteUser(session2.user.id);
  await ctx.context.internalAdapter.deleteSessions(session2.user.id);
  await ctx.context.internalAdapter.deleteAccounts(session2.user.id);
  await ctx.context.internalAdapter.deleteVerificationValue(token.id);
  deleteSessionCookie(ctx);
  const afterDelete = (_d = ctx.context.options.user.deleteUser) == null ? void 0 : _d.afterDelete;
  if (afterDelete) await afterDelete(session2.user, ctx.request);
  if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL || "/");
  return ctx.json({
    success: true,
    message: "User deleted"
  });
});
const changeEmail = createAuthEndpoint("/change-email", {
  method: "POST",
  body: z.object({
    newEmail: z.email().meta({ description: "The new email address to set must be a valid email address" }),
    callbackURL: z.string().meta({ description: "The URL to redirect to after email verification" }).optional()
  }),
  use: [sensitiveSessionMiddleware],
  metadata: { openapi: {
    operationId: "changeEmail",
    responses: {
      "200": {
        description: "Email change request processed successfully",
        content: { "application/json": { schema: {
          type: "object",
          properties: {
            user: {
              type: "object",
              $ref: "#/components/schemas/User"
            },
            status: {
              type: "boolean",
              description: "Indicates if the request was successful"
            },
            message: {
              type: "string",
              enum: ["Email updated", "Verification email sent"],
              description: "Status message of the email change process",
              nullable: true
            }
          },
          required: ["status"]
        } } }
      },
      "422": {
        description: "Unprocessable Entity. Email already exists",
        content: { "application/json": { schema: {
          type: "object",
          properties: { message: { type: "string" } }
        } } }
      }
    }
  } }
}, async (ctx) => {
  var _a, _b, _c, _d, _e, _f, _g;
  if (!((_b = (_a = ctx.context.options.user) == null ? void 0 : _a.changeEmail) == null ? void 0 : _b.enabled)) {
    ctx.context.logger.error("Change email is disabled.");
    throw new APIError("BAD_REQUEST", { message: "Change email is disabled" });
  }
  const newEmail = ctx.body.newEmail.toLowerCase();
  if (newEmail === ctx.context.session.user.email) {
    ctx.context.logger.error("Email is the same");
    throw new APIError("BAD_REQUEST", { message: "Email is the same" });
  }
  if (await ctx.context.internalAdapter.findUserByEmail(newEmail)) {
    ctx.context.logger.error("Email already exists");
    throw new APIError("UNPROCESSABLE_ENTITY", { message: BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL });
  }
  if (ctx.context.session.user.emailVerified !== true && ctx.context.options.user.changeEmail.updateEmailWithoutVerification) {
    await ctx.context.internalAdapter.updateUserByEmail(ctx.context.session.user.email, { email: newEmail });
    await setSessionCookie(ctx, {
      session: ctx.context.session.session,
      user: {
        ...ctx.context.session.user,
        email: newEmail
      }
    });
    if ((_c = ctx.context.options.emailVerification) == null ? void 0 : _c.sendVerificationEmail) {
      const token$1 = await createEmailVerificationToken(ctx.context.secret, newEmail, void 0, (_d = ctx.context.options.emailVerification) == null ? void 0 : _d.expiresIn);
      const url$1 = `${ctx.context.baseURL}/verify-email?token=${token$1}&callbackURL=${ctx.body.callbackURL || "/"}`;
      await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
        user: {
          ...ctx.context.session.user,
          email: newEmail
        },
        url: url$1,
        token: token$1
      }, ctx.request));
    }
    return ctx.json({ status: true });
  }
  if (ctx.context.session.user.emailVerified && (ctx.context.options.user.changeEmail.sendChangeEmailConfirmation || ctx.context.options.user.changeEmail.sendChangeEmailVerification)) {
    const token$1 = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, (_e = ctx.context.options.emailVerification) == null ? void 0 : _e.expiresIn, { requestType: "change-email-confirmation" });
    const url$1 = `${ctx.context.baseURL}/verify-email?token=${token$1}&callbackURL=${ctx.body.callbackURL || "/"}`;
    const sendFn = ctx.context.options.user.changeEmail.sendChangeEmailConfirmation || ctx.context.options.user.changeEmail.sendChangeEmailVerification;
    if (sendFn) await ctx.context.runInBackgroundOrAwait(sendFn({
      user: ctx.context.session.user,
      newEmail,
      url: url$1,
      token: token$1
    }, ctx.request));
    return ctx.json({ status: true });
  }
  if (!((_f = ctx.context.options.emailVerification) == null ? void 0 : _f.sendVerificationEmail)) {
    ctx.context.logger.error("Verification email isn't enabled.");
    throw new APIError("BAD_REQUEST", { message: "Verification email isn't enabled" });
  }
  const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, (_g = ctx.context.options.emailVerification) == null ? void 0 : _g.expiresIn, { requestType: "change-email-verification" });
  const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
  await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
    user: {
      ...ctx.context.session.user,
      email: newEmail
    },
    url,
    token
  }, ctx.request));
  return ctx.json({ status: true });
});
const defuReplaceArrays = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});
function toAuthEndpoints(endpoints, ctx) {
  const api = {};
  for (const [key, endpoint] of Object.entries(endpoints)) {
    api[key] = async (context) => {
      const run = async () => {
        const authContext = await ctx;
        let internalContext = {
          ...context,
          context: {
            ...authContext,
            returned: void 0,
            responseHeaders: void 0,
            session: null
          },
          path: endpoint.path,
          headers: (context == null ? void 0 : context.headers) ? new Headers(context == null ? void 0 : context.headers) : void 0
        };
        return runWithEndpointContext(internalContext, async () => {
          const { beforeHooks, afterHooks } = getHooks(authContext);
          const before = await runBeforeHooks(internalContext, beforeHooks);
          if ("context" in before && before.context && typeof before.context === "object") {
            const { headers, ...rest } = before.context;
            if (headers) headers.forEach((value, key$1) => {
              internalContext.headers.set(key$1, value);
            });
            internalContext = defuReplaceArrays(rest, internalContext);
          } else if (before) return (context == null ? void 0 : context.asResponse) ? toResponse(before, { headers: context == null ? void 0 : context.headers }) : (context == null ? void 0 : context.returnHeaders) ? {
            headers: context == null ? void 0 : context.headers,
            response: before
          } : before;
          internalContext.asResponse = false;
          internalContext.returnHeaders = true;
          internalContext.returnStatus = true;
          const result = await runWithEndpointContext(internalContext, () => endpoint(internalContext)).catch((e) => {
            if (e instanceof APIError)
              return {
                response: e,
                status: e.statusCode,
                headers: e.headers ? new Headers(e.headers) : null
              };
            throw e;
          });
          if (result && result instanceof Response) return result;
          internalContext.context.returned = result.response;
          internalContext.context.responseHeaders = result.headers;
          const after = await runAfterHooks(internalContext, afterHooks);
          if (after.response) result.response = after.response;
          if (result.response instanceof APIError && shouldPublishLog(authContext.logger.level, "debug")) result.response.stack = result.response.errorStack;
          if (result.response instanceof APIError && !(context == null ? void 0 : context.asResponse)) throw result.response;
          return (context == null ? void 0 : context.asResponse) ? toResponse(result.response, {
            headers: result.headers,
            status: result.status
          }) : (context == null ? void 0 : context.returnHeaders) ? (context == null ? void 0 : context.returnStatus) ? {
            headers: result.headers,
            response: result.response,
            status: result.status
          } : {
            headers: result.headers,
            response: result.response
          } : (context == null ? void 0 : context.returnStatus) ? {
            response: result.response,
            status: result.status
          } : result.response;
        });
      };
      if (await hasRequestState()) return run();
      else return runWithRequestState(/* @__PURE__ */ new WeakMap(), run);
    };
    api[key].path = endpoint.path;
    api[key].options = endpoint.options;
  }
  return api;
}
async function runBeforeHooks(context, hooks) {
  let modifiedContext = {};
  for (const hook of hooks) if (hook.matcher(context)) {
    const result = await hook.handler({
      ...context,
      returnHeaders: false
    }).catch((e) => {
      if (e instanceof APIError && shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
      throw e;
    });
    if (result && typeof result === "object") {
      if ("context" in result && typeof result.context === "object") {
        const { headers, ...rest } = result.context;
        if (headers instanceof Headers) if (modifiedContext.headers) headers.forEach((value, key) => {
          var _a;
          (_a = modifiedContext.headers) == null ? void 0 : _a.set(key, value);
        });
        else modifiedContext.headers = headers;
        modifiedContext = defuReplaceArrays(rest, modifiedContext);
        continue;
      }
      return result;
    }
  }
  return { context: modifiedContext };
}
async function runAfterHooks(context, hooks) {
  for (const hook of hooks) if (hook.matcher(context)) {
    const result = await hook.handler(context).catch((e) => {
      if (e instanceof APIError) {
        if (shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
        return {
          response: e,
          headers: e.headers ? new Headers(e.headers) : null
        };
      }
      throw e;
    });
    if (result.headers) result.headers.forEach((value, key) => {
      if (!context.context.responseHeaders) context.context.responseHeaders = new Headers({ [key]: value });
      else if (key.toLowerCase() === "set-cookie") context.context.responseHeaders.append(key, value);
      else context.context.responseHeaders.set(key, value);
    });
    if (result.response) context.context.returned = result.response;
  }
  return {
    response: context.context.returned,
    headers: context.context.responseHeaders
  };
}
function getHooks(authContext) {
  var _a, _b;
  const plugins = authContext.options.plugins || [];
  const beforeHooks = [];
  const afterHooks = [];
  if ((_a = authContext.options.hooks) == null ? void 0 : _a.before) beforeHooks.push({
    matcher: () => true,
    handler: authContext.options.hooks.before
  });
  if ((_b = authContext.options.hooks) == null ? void 0 : _b.after) afterHooks.push({
    matcher: () => true,
    handler: authContext.options.hooks.after
  });
  const pluginBeforeHooks = plugins.map((plugin) => {
    var _a2;
    if ((_a2 = plugin.hooks) == null ? void 0 : _a2.before) return plugin.hooks.before;
  }).filter((plugin) => plugin !== void 0).flat();
  const pluginAfterHooks = plugins.map((plugin) => {
    var _a2;
    if ((_a2 = plugin.hooks) == null ? void 0 : _a2.after) return plugin.hooks.after;
  }).filter((plugin) => plugin !== void 0).flat();
  if (pluginBeforeHooks.length) beforeHooks.push(...pluginBeforeHooks);
  if (pluginAfterHooks.length) afterHooks.push(...pluginAfterHooks);
  return {
    beforeHooks,
    afterHooks
  };
}
function checkEndpointConflicts(options, logger$1) {
  var _a;
  const endpointRegistry = /* @__PURE__ */ new Map();
  (_a = options.plugins) == null ? void 0 : _a.forEach((plugin) => {
    if (plugin.endpoints) {
      for (const [key, endpoint] of Object.entries(plugin.endpoints)) if (endpoint && "path" in endpoint && typeof endpoint.path === "string") {
        const path = endpoint.path;
        let methods = [];
        if (endpoint.options && "method" in endpoint.options) {
          if (Array.isArray(endpoint.options.method)) methods = endpoint.options.method;
          else if (typeof endpoint.options.method === "string") methods = [endpoint.options.method];
        }
        if (methods.length === 0) methods = ["*"];
        if (!endpointRegistry.has(path)) endpointRegistry.set(path, []);
        endpointRegistry.get(path).push({
          pluginId: plugin.id,
          endpointKey: key,
          methods
        });
      }
    }
  });
  const conflicts = [];
  for (const [path, entries] of endpointRegistry.entries()) if (entries.length > 1) {
    const methodMap = /* @__PURE__ */ new Map();
    let hasConflict = false;
    for (const entry of entries) for (const method of entry.methods) {
      if (!methodMap.has(method)) methodMap.set(method, []);
      methodMap.get(method).push(entry.pluginId);
      if (methodMap.get(method).length > 1) hasConflict = true;
      if (method === "*" && entries.length > 1) hasConflict = true;
      else if (method !== "*" && methodMap.has("*")) hasConflict = true;
    }
    if (hasConflict) {
      const uniquePlugins = [...new Set(entries.map((e) => e.pluginId))];
      const conflictingMethods = [];
      for (const [method, plugins] of methodMap.entries()) if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) conflictingMethods.push(method);
      conflicts.push({
        path,
        plugins: uniquePlugins,
        conflictingMethods
      });
    }
  }
  if (conflicts.length > 0) {
    const conflictMessages = conflicts.map((conflict) => `  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`).join("\n");
    logger$1.error(`Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`);
  }
}
function getEndpoints(ctx, options) {
  var _a, _b;
  const pluginEndpoints = ((_a = options.plugins) == null ? void 0 : _a.reduce((acc, plugin) => {
    return {
      ...acc,
      ...plugin.endpoints
    };
  }, {})) ?? {};
  const middlewares = ((_b = options.plugins) == null ? void 0 : _b.map((plugin) => {
    var _a2;
    return (_a2 = plugin.middlewares) == null ? void 0 : _a2.map((m) => {
      const middleware = (async (context) => {
        const authContext = await ctx;
        return m.middleware({
          ...context,
          context: {
            ...authContext,
            ...context.context
          }
        });
      });
      middleware.options = m.middleware.options;
      return {
        path: m.path,
        middleware
      };
    });
  }).filter((plugin) => plugin !== void 0).flat()) || [];
  return {
    api: toAuthEndpoints({
      signInSocial: signInSocial(),
      callbackOAuth,
      getSession: getSession(),
      signOut,
      signUpEmail: signUpEmail(),
      signInEmail: signInEmail(),
      resetPassword,
      verifyEmail,
      sendVerificationEmail,
      changeEmail,
      changePassword,
      setPassword,
      updateUser: updateUser(),
      deleteUser,
      requestPasswordReset,
      requestPasswordResetCallback,
      listSessions: listSessions(),
      revokeSession,
      revokeSessions,
      revokeOtherSessions,
      linkSocialAccount,
      listUserAccounts,
      deleteUserCallback,
      unlinkAccount,
      refreshToken,
      getAccessToken,
      accountInfo,
      ...pluginEndpoints,
      ok,
      error
    }, ctx),
    middlewares
  };
}
const router$1 = (ctx, options) => {
  const { api, middlewares } = getEndpoints(ctx, options);
  const basePath = new URL(ctx.baseURL).pathname;
  return createRouter$1(api, {
    routerContext: ctx,
    openapi: { disabled: true },
    basePath,
    routerMiddleware: [{
      path: "/**",
      middleware: originCheckMiddleware
    }, ...middlewares],
    allowedMediaTypes: ["application/json"],
    async onRequest(req) {
      const disabledPaths = ctx.options.disabledPaths || [];
      const pathname = new URL(req.url).pathname.replace(/\/+$/, "") || "/";
      const normalizedPath = basePath === "/" ? pathname : pathname.startsWith(basePath) ? pathname.slice(basePath.length).replace(/\/+$/, "") || "/" : pathname;
      if (disabledPaths.includes(normalizedPath)) return new Response("Not Found", { status: 404 });
      for (const plugin of ctx.options.plugins || []) if (plugin.onRequest) {
        const response = await plugin.onRequest(req, ctx);
        if (response && "response" in response) return response.response;
        if (response && "request" in response) {
          const rateLimitResponse2 = await onRequestRateLimit(response.request, ctx);
          if (rateLimitResponse2) return rateLimitResponse2;
          return response.request;
        }
      }
      return onRequestRateLimit(req, ctx);
    },
    async onResponse(res) {
      for (const plugin of ctx.options.plugins || []) if (plugin.onResponse) {
        const response = await plugin.onResponse(res, ctx);
        if (response) return response.response;
      }
      return res;
    },
    onError(e) {
      var _a, _b, _c, _d, _e, _f;
      if (e instanceof APIError && e.status === "FOUND") return;
      if ((_a = options.onAPIError) == null ? void 0 : _a.throw) throw e;
      if ((_b = options.onAPIError) == null ? void 0 : _b.onError) {
        options.onAPIError.onError(e, ctx);
        return;
      }
      const optLogLevel = (_c = options.logger) == null ? void 0 : _c.level;
      const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? logger : void 0;
      if (((_d = options.logger) == null ? void 0 : _d.disabled) !== true) {
        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
          if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
            (_e = ctx.logger) == null ? void 0 : _e.error(e.message);
            return;
          }
        }
        if (e instanceof APIError) {
          if (e.status === "INTERNAL_SERVER_ERROR") ctx.logger.error(e.status, e);
          log == null ? void 0 : log.error(e.message);
        } else (_f = ctx.logger) == null ? void 0 : _f.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
      }
    }
  });
};
function checkHasPath(url) {
  try {
    return (new URL(url).pathname.replace(/\/+$/, "") || "/") !== "/";
  } catch {
    throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`);
  }
}
function assertHasProtocol(url) {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") throw new BetterAuthError(`Invalid base URL: ${url}. URL must include 'http://' or 'https://'`);
  } catch (error2) {
    if (error2 instanceof BetterAuthError) throw error2;
    throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`, String(error2));
  }
}
function withPath(url, path = "/api/auth") {
  assertHasProtocol(url);
  if (checkHasPath(url)) return url;
  const trimmedUrl = url.replace(/\/+$/, "");
  if (!path || path === "/") return trimmedUrl;
  path = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedUrl}${path}`;
}
function validateProxyHeader(header, type) {
  if (!header || header.trim() === "") return false;
  if (type === "proto") return header === "http" || header === "https";
  if (type === "host") {
    if ([
      /\.\./,
      /\0/,
      /[\s]/,
      /^[.]/,
      /[<>'"]/,
      /javascript:/i,
      /file:/i,
      /data:/i
    ].some((pattern) => pattern.test(header))) return false;
    return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(header) || /^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(header) || /^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(header) || /^localhost(:[0-9]{1,5})?$/i.test(header);
  }
  return false;
}
function getBaseURL(url, path, request, loadEnv, trustedProxyHeaders) {
  if (url) return withPath(url, path);
  {
    const fromEnv = env$1.BETTER_AUTH_URL || env$1.NEXT_PUBLIC_BETTER_AUTH_URL || env$1.PUBLIC_BETTER_AUTH_URL || env$1.NUXT_PUBLIC_BETTER_AUTH_URL || env$1.NUXT_PUBLIC_AUTH_URL || (env$1.BASE_URL !== "/" ? env$1.BASE_URL : void 0);
    if (fromEnv) return withPath(fromEnv, path);
  }
  const fromRequest = request == null ? void 0 : request.headers.get("x-forwarded-host");
  const fromRequestProto = request == null ? void 0 : request.headers.get("x-forwarded-proto");
  if (fromRequest && fromRequestProto && trustedProxyHeaders) {
    if (validateProxyHeader(fromRequestProto, "proto") && validateProxyHeader(fromRequest, "host")) try {
      return withPath(`${fromRequestProto}://${fromRequest}`, path);
    } catch (_error) {
    }
  }
  if (request) {
    const url$1 = getOrigin(request.url);
    if (!url$1) throw new BetterAuthError("Could not get origin from request. Please provide a valid base URL.");
    return withPath(url$1, path);
  }
  if (typeof window !== "undefined" && window.location) return withPath(window.location.origin, path);
}
function getOrigin(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin === "null" ? null : parsedUrl.origin;
  } catch {
    return null;
  }
}
function getProtocol(url) {
  try {
    return new URL(url).protocol;
  } catch {
    return null;
  }
}
function getHost(url) {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
const matchesOriginPattern = (url, pattern, settings) => {
  if (url.startsWith("/")) {
    if (settings == null ? void 0 : settings.allowRelativePaths) return url.startsWith("/") && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url);
    return false;
  }
  if (pattern.includes("*") || pattern.includes("?")) {
    if (pattern.includes("://")) return wildcardMatch(pattern)(getOrigin(url) || url);
    const host = getHost(url);
    if (!host) return false;
    return wildcardMatch(pattern)(host);
  }
  const protocol = getProtocol(url);
  return protocol === "http:" || protocol === "https:" || !protocol ? pattern === getOrigin(url) : url.startsWith(pattern);
};
const DEFAULT_SECRET = "better-auth-secret-12345678901234567890";
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
async function checkPassword(userId, c) {
  var _a;
  const credentialAccount = (_a = await c.context.internalAdapter.findAccounts(userId)) == null ? void 0 : _a.find((account2) => account2.providerId === "credential");
  const currentPassword = credentialAccount == null ? void 0 : credentialAccount.password;
  if (!credentialAccount || !currentPassword || !c.body.password) throw new APIError("BAD_REQUEST", { message: "No password credential found" });
  if (!await c.context.password.verify({
    hash: currentPassword,
    password: c.body.password
  })) throw new APIError("BAD_REQUEST", { message: "Invalid password" });
  return true;
}
async function runPluginInit(ctx) {
  let options = ctx.options;
  const plugins = options.plugins || [];
  let context = ctx;
  const dbHooks = [];
  for (const plugin of plugins) if (plugin.init) {
    let initPromise = plugin.init(context);
    let result;
    if (isPromise(initPromise)) result = await initPromise;
    else result = initPromise;
    if (typeof result === "object") {
      if (result.options) {
        const { databaseHooks, ...restOpts } = result.options;
        if (databaseHooks) dbHooks.push(databaseHooks);
        options = defu(options, restOpts);
      }
      if (result.context) context = {
        ...context,
        ...result.context
      };
    }
  }
  dbHooks.push(options.databaseHooks);
  context.internalAdapter = createInternalAdapter(context.adapter, {
    options,
    logger: context.logger,
    hooks: dbHooks.filter((u) => u !== void 0),
    generateId: context.generateId
  });
  context.options = options;
  return { context };
}
function getInternalPlugins(options) {
  var _a, _b;
  const plugins = [];
  if ((_b = (_a = options.advanced) == null ? void 0 : _a.crossSubDomainCookies) == null ? void 0 : _b.enabled) ;
  return plugins;
}
async function getTrustedOrigins(options, request) {
  const baseURL = getBaseURL(options.baseURL, options.basePath);
  const trustedOrigins = baseURL ? [new URL(baseURL).origin] : [];
  if (options.trustedOrigins) {
    if (Array.isArray(options.trustedOrigins)) trustedOrigins.push(...options.trustedOrigins);
    if (typeof options.trustedOrigins === "function") trustedOrigins.push(...await options.trustedOrigins(request));
  }
  const envTrustedOrigins = env$1.BETTER_AUTH_TRUSTED_ORIGINS;
  if (envTrustedOrigins) trustedOrigins.push(...envTrustedOrigins.split(","));
  if (trustedOrigins.filter((x) => !x).length) throw new BetterAuthError("A provided trusted origin is invalid, make sure your trusted origins list is properly defined.");
  return trustedOrigins;
}
function estimateEntropy(str) {
  const unique = new Set(str).size;
  if (unique === 0) return 0;
  return Math.log2(Math.pow(unique, str.length));
}
function validateSecret(secret, logger$1) {
  const isDefaultSecret = secret === DEFAULT_SECRET;
  if (isTest()) return;
  if (isDefaultSecret && isProduction) throw new BetterAuthError("You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config.");
  if (secret.length < 32) throw new BetterAuthError(`Invalid BETTER_AUTH_SECRET: must be at least 32 characters long for adequate security. Generate one with \`npx @better-auth/cli secret\` or \`openssl rand -base64 32\`.`);
  if (estimateEntropy(secret) < 120) logger$1.warn("[better-auth] Warning: your BETTER_AUTH_SECRET appears low-entropy. Use a randomly generated secret for production.");
}
async function createAuthContext(adapter, options, getDatabaseType) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  if (!options.database) options = defu$1(options, {
    session: { cookieCache: {
      enabled: true,
      strategy: "jwe",
      refreshCache: true
    } },
    account: {
      storeStateStrategy: "cookie",
      storeAccountCookie: true
    }
  });
  const plugins = options.plugins || [];
  const internalPlugins = getInternalPlugins(options);
  const logger$1 = createLogger(options.logger);
  const baseURL = getBaseURL(options.baseURL, options.basePath);
  if (!baseURL) logger$1.warn(`[better-auth] Base URL could not be determined. Please set a valid base URL using the baseURL config option or the BETTER_AUTH_BASE_URL environment variable. Without this, callbacks and redirects may not work correctly.`);
  const secret = options.secret || env$1.BETTER_AUTH_SECRET || env$1.AUTH_SECRET || DEFAULT_SECRET;
  validateSecret(secret, logger$1);
  options = {
    ...options,
    secret,
    baseURL: baseURL ? new URL(baseURL).origin : "",
    basePath: options.basePath || "/api/auth",
    plugins: plugins.concat(internalPlugins)
  };
  checkEndpointConflicts(options, logger$1);
  const cookies = getCookies(options);
  const tables = getAuthTables(options);
  const providers = Object.entries(options.socialProviders || {}).map(([key, config2]) => {
    if (config2 == null) return null;
    if (config2.enabled === false) return null;
    if (!config2.clientId) logger$1.warn(`Social provider ${key} is missing clientId or clientSecret`);
    const provider = socialProviders[key](config2);
    provider.disableImplicitSignUp = config2.disableImplicitSignUp;
    return provider;
  }).filter((x) => x !== null);
  const generateIdFunc = ({ model, size }) => {
    var _a2, _b2, _c2;
    if (typeof ((_a2 = options.advanced) == null ? void 0 : _a2.generateId) === "function") return options.advanced.generateId({
      model,
      size
    });
    if (typeof ((_c2 = (_b2 = options == null ? void 0 : options.advanced) == null ? void 0 : _b2.database) == null ? void 0 : _c2.generateId) === "function") return options.advanced.database.generateId({
      model,
      size
    });
    return generateId(size);
  };
  const { publish } = await createTelemetry(options, {
    adapter: adapter.id,
    database: typeof options.database === "function" ? "adapter" : getDatabaseType(options.database)
  });
  let ctx = {
    appName: options.appName || "Better Auth",
    socialProviders: providers,
    options,
    oauthConfig: {
      storeStateStrategy: ((_a = options.account) == null ? void 0 : _a.storeStateStrategy) || (options.database ? "database" : "cookie"),
      skipStateCookieCheck: !!((_b = options.account) == null ? void 0 : _b.skipStateCookieCheck)
    },
    tables,
    trustedOrigins: await getTrustedOrigins(options),
    isTrustedOrigin(url, settings) {
      return ctx.trustedOrigins.some((origin) => matchesOriginPattern(url, origin, settings));
    },
    baseURL: baseURL || "",
    sessionConfig: {
      updateAge: ((_c = options.session) == null ? void 0 : _c.updateAge) !== void 0 ? options.session.updateAge : 1440 * 60,
      expiresIn: ((_d = options.session) == null ? void 0 : _d.expiresIn) || 3600 * 24 * 7,
      freshAge: ((_e = options.session) == null ? void 0 : _e.freshAge) === void 0 ? 3600 * 24 : options.session.freshAge,
      cookieRefreshCache: (() => {
        var _a2, _b2, _c2, _d2;
        const refreshCache = (_b2 = (_a2 = options.session) == null ? void 0 : _a2.cookieCache) == null ? void 0 : _b2.refreshCache;
        const maxAge = ((_d2 = (_c2 = options.session) == null ? void 0 : _c2.cookieCache) == null ? void 0 : _d2.maxAge) || 300;
        if ((!!options.database || !!options.secondaryStorage) && refreshCache) {
          logger$1.warn("[better-auth] `session.cookieCache.refreshCache` is enabled while `database` or `secondaryStorage` is configured. `refreshCache` is meant for stateless (DB-less) setups. Disabling `refreshCache` — remove it from your config to silence this warning.");
          return false;
        }
        if (refreshCache === false || refreshCache === void 0) return false;
        if (refreshCache === true) return {
          enabled: true,
          updateAge: Math.floor(maxAge * 0.2)
        };
        return {
          enabled: true,
          updateAge: refreshCache.updateAge !== void 0 ? refreshCache.updateAge : Math.floor(maxAge * 0.2)
        };
      })()
    },
    secret,
    rateLimit: {
      ...options.rateLimit,
      enabled: ((_f = options.rateLimit) == null ? void 0 : _f.enabled) ?? isProduction,
      window: ((_g = options.rateLimit) == null ? void 0 : _g.window) || 10,
      max: ((_h = options.rateLimit) == null ? void 0 : _h.max) || 100,
      storage: ((_i = options.rateLimit) == null ? void 0 : _i.storage) || (options.secondaryStorage ? "secondary-storage" : "memory")
    },
    authCookies: cookies,
    logger: logger$1,
    generateId: generateIdFunc,
    session: null,
    secondaryStorage: options.secondaryStorage,
    password: {
      hash: ((_k = (_j = options.emailAndPassword) == null ? void 0 : _j.password) == null ? void 0 : _k.hash) || hashPassword,
      verify: ((_m = (_l = options.emailAndPassword) == null ? void 0 : _l.password) == null ? void 0 : _m.verify) || verifyPassword,
      config: {
        minPasswordLength: ((_n = options.emailAndPassword) == null ? void 0 : _n.minPasswordLength) || 8,
        maxPasswordLength: ((_o = options.emailAndPassword) == null ? void 0 : _o.maxPasswordLength) || 128
      },
      checkPassword
    },
    setNewSession(session2) {
      this.newSession = session2;
    },
    newSession: null,
    adapter,
    internalAdapter: createInternalAdapter(adapter, {
      options,
      logger: logger$1,
      hooks: options.databaseHooks ? [options.databaseHooks] : []
    }),
    createAuthCookie: createCookieGetter(options),
    async runMigrations() {
      throw new BetterAuthError("runMigrations will be set by the specific init implementation");
    },
    publishTelemetry: publish,
    skipCSRFCheck: !!((_p = options.advanced) == null ? void 0 : _p.disableCSRFCheck),
    skipOriginCheck: ((_q = options.advanced) == null ? void 0 : _q.disableOriginCheck) !== void 0 ? options.advanced.disableOriginCheck : isTest() ? true : false,
    runInBackground: ((_s = (_r = options.advanced) == null ? void 0 : _r.backgroundTasks) == null ? void 0 : _s.handler) ?? ((p) => {
      p.catch(() => {
      });
    }),
    async runInBackgroundOrAwait(promise) {
      var _a2, _b2;
      try {
        if ((_b2 = (_a2 = options.advanced) == null ? void 0 : _a2.backgroundTasks) == null ? void 0 : _b2.handler) {
          if (promise instanceof Promise) options.advanced.backgroundTasks.handler(promise.catch((e) => {
            logger$1.error("Failed to run background task:", e);
          }));
        } else await promise;
      } catch (e) {
        logger$1.error("Failed to run background task:", e);
      }
    }
  };
  const initOrPromise = runPluginInit(ctx);
  let context;
  if (isPromise(initOrPromise)) ({ context } = await initOrPromise);
  else ({ context } = initOrPromise);
  return context;
}
const init = async (options) => {
  const adapter = await getAdapter(options);
  const getDatabaseType = (database) => getKyselyDatabaseType(database) || "unknown";
  const ctx = await createAuthContext(adapter, options, getDatabaseType);
  ctx.runMigrations = async function() {
    if (!options.database || "updateMany" in options.database) throw new BetterAuthError("Database is not provided or it's an adapter. Migrations are only supported with a database instance.");
    const { runMigrations } = await getMigrations(options);
    await runMigrations();
  };
  return ctx;
};
const createBetterAuth = (options, initFn) => {
  var _a;
  const authContext = initFn(options);
  const { api } = getEndpoints(authContext, options);
  return {
    handler: async (request) => {
      var _a2;
      const ctx = await authContext;
      const basePath = ctx.options.basePath || "/api/auth";
      if (!ctx.options.baseURL) {
        const baseURL = getBaseURL(void 0, basePath, request, void 0, (_a2 = ctx.options.advanced) == null ? void 0 : _a2.trustedProxyHeaders);
        if (baseURL) {
          ctx.baseURL = baseURL;
          ctx.options.baseURL = getOrigin(ctx.baseURL) || void 0;
        } else throw new BetterAuthError("Could not get base URL from request. Please provide a valid base URL.");
      }
      ctx.trustedOrigins = await getTrustedOrigins(ctx.options, request);
      const { handler } = router$1(ctx, options);
      return runWithAdapter(ctx.adapter, () => handler(request));
    },
    api,
    options,
    $context: authContext,
    $ERROR_CODES: {
      ...(_a = options.plugins) == null ? void 0 : _a.reduce((acc, plugin) => {
        if (plugin.$ERROR_CODES) return {
          ...acc,
          ...plugin.$ERROR_CODES
        };
        return acc;
      }, {}),
      ...BASE_ERROR_CODES
    }
  };
};
const betterAuth = (options) => {
  return createBetterAuth(options, init);
};
const tanstackStartCookies = () => {
  return {
    id: "tanstack-start-cookies",
    hooks: { after: [{
      matcher(ctx) {
        return true;
      },
      handler: createAuthMiddleware(async (ctx) => {
        const returned = ctx.context.responseHeaders;
        if ("_flag" in ctx && ctx._flag === "router") return;
        if (returned instanceof Headers) {
          const setCookies = returned == null ? void 0 : returned.get("set-cookie");
          if (!setCookies) return;
          const parsed = parseSetCookieHeader(setCookies);
          const { setCookie } = await import("./server-DkMexlIi.js");
          parsed.forEach((value, key) => {
            if (!key) return;
            const opts = {
              sameSite: value.samesite,
              secure: value.secure,
              maxAge: value["max-age"],
              httpOnly: value.httponly,
              domain: value.domain,
              path: value.path
            };
            try {
              setCookie(key, decodeURIComponent(value.value), opts);
            } catch {
            }
          });
          return;
        }
      })
    }] }
  };
};
function role(statements) {
  return {
    authorize(request, connector = "AND") {
      let success = false;
      for (const [requestedResource, requestedActions] of Object.entries(request)) {
        const allowedActions = statements[requestedResource];
        if (!allowedActions) return {
          success: false,
          error: `You are not allowed to access resource: ${requestedResource}`
        };
        if (Array.isArray(requestedActions)) success = requestedActions.every((requestedAction) => allowedActions.includes(requestedAction));
        else if (typeof requestedActions === "object") {
          const actions = requestedActions;
          if (actions.connector === "OR") success = actions.actions.some((requestedAction) => allowedActions.includes(requestedAction));
          else success = actions.actions.every((requestedAction) => allowedActions.includes(requestedAction));
        } else throw new BetterAuthError("Invalid access control request");
        if (success && connector === "OR") return { success };
        if (!success && connector === "AND") return {
          success: false,
          error: `unauthorized to access resource "${requestedResource}"`
        };
      }
      if (success) return { success };
      return {
        success: false,
        error: "Not authorized"
      };
    },
    statements
  };
}
function createAccessControl(s) {
  return {
    newRole(statements) {
      return role(statements);
    },
    statements: s
  };
}
const defaultStatements = {
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update"
  ],
  session: [
    "list",
    "revoke",
    "delete"
  ]
};
const defaultAc = createAccessControl(defaultStatements);
const adminAc = defaultAc.newRole({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update"
  ],
  session: [
    "list",
    "revoke",
    "delete"
  ]
});
const userAc = defaultAc.newRole({
  user: [],
  session: []
});
const defaultRoles$1 = {
  admin: adminAc,
  user: userAc
};
const getEndpointResponse = async (ctx) => {
  const returned = ctx.context.returned;
  if (!returned) return null;
  if (returned instanceof Response) {
    if (returned.status !== 200) return null;
    return await returned.clone().json();
  }
  if (returned instanceof APIError) return null;
  return returned;
};
const ADMIN_ERROR_CODES = defineErrorCodes({
  FAILED_TO_CREATE_USER: "Failed to create user",
  USER_ALREADY_EXISTS: "User already exists.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.",
  YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself",
  YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users",
  YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users",
  YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions",
  YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users",
  YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users",
  YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users",
  YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password",
  BANNED_USER: "You have been banned from this application",
  YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user",
  NO_DATA_TO_UPDATE: "No data to update",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users",
  YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself",
  YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: "You are not allowed to set a non-existent role value",
  YOU_CANNOT_IMPERSONATE_ADMINS: "You cannot impersonate admins",
  INVALID_ROLE_TYPE: "Invalid role type"
});
const hasPermission = (input) => {
  var _a, _b, _c, _d, _e, _f;
  if (input.userId && ((_b = (_a = input.options) == null ? void 0 : _a.adminUserIds) == null ? void 0 : _b.includes(input.userId))) return true;
  if (!input.permissions && !input.permission) return false;
  const roles = (input.role || ((_c = input.options) == null ? void 0 : _c.defaultRole) || "user").split(",");
  const acRoles = ((_d = input.options) == null ? void 0 : _d.roles) || defaultRoles$1;
  for (const role2 of roles) if ((_f = (_e = acRoles[role2]) == null ? void 0 : _e.authorize(input.permission ?? input.permissions)) == null ? void 0 : _f.success) return true;
  return false;
};
const adminMiddleware = createAuthMiddleware(async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("UNAUTHORIZED");
  return { session: session2 };
});
function parseRoles(roles) {
  return Array.isArray(roles) ? roles.join(",") : roles;
}
const setRoleBodySchema = z.object({
  userId: z.coerce.string().meta({ description: "The user id" }),
  role: z.union([z.string().meta({ description: "The role to set. `admin` or `user` by default" }), z.array(z.string().meta({ description: "The roles to set. `admin` or `user` by default" }))]).meta({ description: "The role to set, this can be a string or an array of strings. Eg: `admin` or `[admin, user]`" })
});
const setRole = (opts) => createAuthEndpoint("/admin/set-role", {
  method: "POST",
  body: setRoleBodySchema,
  requireHeaders: true,
  use: [adminMiddleware],
  metadata: {
    openapi: {
      operationId: "setUserRole",
      summary: "Set the role of a user",
      description: "Set the role of a user",
      responses: { 200: {
        description: "User role updated",
        content: { "application/json": { schema: {
          type: "object",
          properties: { user: { $ref: "#/components/schemas/User" } }
        } } }
      } }
    },
    $Infer: { body: {} }
  }
}, async (ctx) => {
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["set-role"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE });
  const roles = opts.roles;
  if (roles) {
    const inputRoles = Array.isArray(ctx.body.role) ? ctx.body.role : [ctx.body.role];
    for (const role2 of inputRoles) if (!roles[role2]) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE });
  }
  const updatedUser = await ctx.context.internalAdapter.updateUser(ctx.body.userId, { role: parseRoles(ctx.body.role) });
  return ctx.json({ user: updatedUser });
});
const getUserQuerySchema = z.object({ id: z.string().meta({ description: "The id of the User" }) });
const getUser = (opts) => createAuthEndpoint("/admin/get-user", {
  method: "GET",
  query: getUserQuerySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "getUser",
    summary: "Get an existing user",
    description: "Get an existing user",
    responses: { 200: {
      description: "User",
      content: { "application/json": { schema: {
        type: "object",
        properties: { user: { $ref: "#/components/schemas/User" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { id } = ctx.query;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["get"] }
  })) throw ctx.error("FORBIDDEN", {
    message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_GET_USER,
    code: "YOU_ARE_NOT_ALLOWED_TO_GET_USER"
  });
  const user2 = await ctx.context.internalAdapter.findUserById(id);
  if (!user2) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.USER_NOT_FOUND });
  return parseUserOutput(ctx.context.options, user2);
});
const createUserBodySchema = z.object({
  email: z.string().meta({ description: "The email of the user" }),
  password: z.string().meta({ description: "The password of the user" }),
  name: z.string().meta({ description: "The name of the user" }),
  role: z.union([z.string().meta({ description: "The role of the user" }), z.array(z.string().meta({ description: "The roles of user" }))]).optional().meta({ description: `A string or array of strings representing the roles to apply to the new user. Eg: "user"` }),
  data: z.record(z.string(), z.any()).optional().meta({ description: "Extra fields for the user. Including custom additional fields." })
});
const createUser = (opts) => createAuthEndpoint("/admin/create-user", {
  method: "POST",
  body: createUserBodySchema,
  metadata: {
    openapi: {
      operationId: "createUser",
      summary: "Create a new user",
      description: "Create a new user",
      responses: { 200: {
        description: "User created",
        content: { "application/json": { schema: {
          type: "object",
          properties: { user: { $ref: "#/components/schemas/User" } }
        } } }
      } }
    },
    $Infer: { body: {} }
  }
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2 && (ctx.request || ctx.headers)) throw ctx.error("UNAUTHORIZED");
  if (session2) {
    if (!hasPermission({
      userId: session2.user.id,
      role: session2.user.role,
      options: opts,
      permissions: { user: ["create"] }
    })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS });
  }
  const email = ctx.body.email.toLowerCase();
  if (!z.email().safeParse(email).success) throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.INVALID_EMAIL });
  if (await ctx.context.internalAdapter.findUserByEmail(email)) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL });
  const user2 = await ctx.context.internalAdapter.createUser({
    email,
    name: ctx.body.name,
    role: (ctx.body.role && parseRoles(ctx.body.role)) ?? (opts == null ? void 0 : opts.defaultRole) ?? "user",
    ...ctx.body.data
  });
  if (!user2) throw new APIError("INTERNAL_SERVER_ERROR", { message: ADMIN_ERROR_CODES.FAILED_TO_CREATE_USER });
  const hashedPassword = await ctx.context.password.hash(ctx.body.password);
  await ctx.context.internalAdapter.linkAccount({
    accountId: user2.id,
    providerId: "credential",
    password: hashedPassword,
    userId: user2.id
  });
  return ctx.json({ user: user2 });
});
const adminUpdateUserBodySchema = z.object({
  userId: z.coerce.string().meta({ description: "The user id" }),
  data: z.record(z.any(), z.any()).meta({ description: "The user data to update" })
});
const adminUpdateUser = (opts) => createAuthEndpoint("/admin/update-user", {
  method: "POST",
  body: adminUpdateUserBodySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "updateUser",
    summary: "Update a user",
    description: "Update a user's details",
    responses: { 200: {
      description: "User updated",
      content: { "application/json": { schema: {
        type: "object",
        properties: { user: { $ref: "#/components/schemas/User" } }
      } } }
    } }
  } }
}, async (ctx) => {
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["update"] }
  })) throw ctx.error("FORBIDDEN", {
    message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS,
    code: "YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS"
  });
  if (Object.keys(ctx.body.data).length === 0) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.NO_DATA_TO_UPDATE });
  if (Object.prototype.hasOwnProperty.call(ctx.body.data, "role")) {
    if (!hasPermission({
      userId: ctx.context.session.user.id,
      role: ctx.context.session.user.role,
      options: opts,
      permissions: { user: ["set-role"] }
    })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE });
    const roleValue = ctx.body.data.role;
    const inputRoles = Array.isArray(roleValue) ? roleValue : [roleValue];
    for (const role2 of inputRoles) {
      if (typeof role2 !== "string") throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.INVALID_ROLE_TYPE });
      if (opts.roles && !opts.roles[role2]) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE });
    }
    ctx.body.data.role = parseRoles(inputRoles);
  }
  const updatedUser = await ctx.context.internalAdapter.updateUser(ctx.body.userId, ctx.body.data);
  return ctx.json(updatedUser);
});
const listUsersQuerySchema = z.object({
  searchValue: z.string().optional().meta({ description: 'The value to search for. Eg: "some name"' }),
  searchField: z.enum(["email", "name"]).meta({ description: 'The field to search in, defaults to email. Can be `email` or `name`. Eg: "name"' }).optional(),
  searchOperator: z.enum([
    "contains",
    "starts_with",
    "ends_with"
  ]).meta({ description: 'The operator to use for the search. Can be `contains`, `starts_with` or `ends_with`. Eg: "contains"' }).optional(),
  limit: z.string().meta({ description: "The number of users to return" }).or(z.number()).optional(),
  offset: z.string().meta({ description: "The offset to start from" }).or(z.number()).optional(),
  sortBy: z.string().meta({ description: "The field to sort by" }).optional(),
  sortDirection: z.enum(["asc", "desc"]).meta({ description: "The direction to sort by" }).optional(),
  filterField: z.string().meta({ description: "The field to filter by" }).optional(),
  filterValue: z.string().meta({ description: "The value to filter by" }).or(z.number()).or(z.boolean()).optional(),
  filterOperator: z.enum([
    "eq",
    "ne",
    "lt",
    "lte",
    "gt",
    "gte",
    "contains"
  ]).meta({ description: "The operator to use for the filter" }).optional()
});
const listUsers = (opts) => createAuthEndpoint("/admin/list-users", {
  method: "GET",
  use: [adminMiddleware],
  query: listUsersQuerySchema,
  metadata: { openapi: {
    operationId: "listUsers",
    summary: "List users",
    description: "List users",
    responses: { 200: {
      description: "List of users",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: { $ref: "#/components/schemas/User" }
          },
          total: { type: "number" },
          limit: { type: "number" },
          offset: { type: "number" }
        },
        required: ["users", "total"]
      } } }
    } }
  } }
}, async (ctx) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const session2 = ctx.context.session;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { user: ["list"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_USERS });
  const where = [];
  if ((_a = ctx.query) == null ? void 0 : _a.searchValue) where.push({
    field: ctx.query.searchField || "email",
    operator: ctx.query.searchOperator || "contains",
    value: ctx.query.searchValue
  });
  if ((_b = ctx.query) == null ? void 0 : _b.filterValue) where.push({
    field: ctx.query.filterField || "email",
    operator: ctx.query.filterOperator || "eq",
    value: ctx.query.filterValue
  });
  try {
    const users = await ctx.context.internalAdapter.listUsers(Number((_c = ctx.query) == null ? void 0 : _c.limit) || void 0, Number((_d = ctx.query) == null ? void 0 : _d.offset) || void 0, ((_e = ctx.query) == null ? void 0 : _e.sortBy) ? {
      field: ctx.query.sortBy,
      direction: ctx.query.sortDirection || "asc"
    } : void 0, where.length ? where : void 0);
    const total = await ctx.context.internalAdapter.countTotalUsers(where.length ? where : void 0);
    return ctx.json({
      users,
      total,
      limit: Number((_f = ctx.query) == null ? void 0 : _f.limit) || void 0,
      offset: Number((_g = ctx.query) == null ? void 0 : _g.offset) || void 0
    });
  } catch {
    return ctx.json({
      users: [],
      total: 0
    });
  }
});
const listUserSessionsBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const listUserSessions = (opts) => createAuthEndpoint("/admin/list-user-sessions", {
  method: "POST",
  use: [adminMiddleware],
  body: listUserSessionsBodySchema,
  metadata: { openapi: {
    operationId: "listUserSessions",
    summary: "List user sessions",
    description: "List user sessions",
    responses: { 200: {
      description: "List of user sessions",
      content: { "application/json": { schema: {
        type: "object",
        properties: { sessions: {
          type: "array",
          items: { $ref: "#/components/schemas/Session" }
        } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { session: ["list"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS });
  return { sessions: await ctx.context.internalAdapter.listSessions(ctx.body.userId) };
});
const unbanUserBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const unbanUser = (opts) => createAuthEndpoint("/admin/unban-user", {
  method: "POST",
  body: unbanUserBodySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "unbanUser",
    summary: "Unban a user",
    description: "Unban a user",
    responses: { 200: {
      description: "User unbanned",
      content: { "application/json": { schema: {
        type: "object",
        properties: { user: { $ref: "#/components/schemas/User" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { user: ["ban"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_BAN_USERS });
  const user2 = await ctx.context.internalAdapter.updateUser(ctx.body.userId, {
    banned: false,
    banExpires: null,
    banReason: null,
    updatedAt: /* @__PURE__ */ new Date()
  });
  return ctx.json({ user: user2 });
});
const banUserBodySchema = z.object({
  userId: z.coerce.string().meta({ description: "The user id" }),
  banReason: z.string().meta({ description: "The reason for the ban" }).optional(),
  banExpiresIn: z.number().meta({ description: "The number of seconds until the ban expires" }).optional()
});
const banUser = (opts) => createAuthEndpoint("/admin/ban-user", {
  method: "POST",
  body: banUserBodySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "banUser",
    summary: "Ban a user",
    description: "Ban a user",
    responses: { 200: {
      description: "User banned",
      content: { "application/json": { schema: {
        type: "object",
        properties: { user: { $ref: "#/components/schemas/User" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { user: ["ban"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_BAN_USERS });
  if (!await ctx.context.internalAdapter.findUserById(ctx.body.userId)) throw new APIError("NOT_FOUND", { message: BASE_ERROR_CODES.USER_NOT_FOUND });
  if (ctx.body.userId === ctx.context.session.user.id) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.YOU_CANNOT_BAN_YOURSELF });
  const user2 = await ctx.context.internalAdapter.updateUser(ctx.body.userId, {
    banned: true,
    banReason: ctx.body.banReason || (opts == null ? void 0 : opts.defaultBanReason) || "No reason",
    banExpires: ctx.body.banExpiresIn ? getDate(ctx.body.banExpiresIn, "sec") : (opts == null ? void 0 : opts.defaultBanExpiresIn) ? getDate(opts.defaultBanExpiresIn, "sec") : void 0,
    updatedAt: /* @__PURE__ */ new Date()
  });
  await ctx.context.internalAdapter.deleteSessions(ctx.body.userId);
  return ctx.json({ user: user2 });
});
const impersonateUserBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const impersonateUser = (opts) => createAuthEndpoint("/admin/impersonate-user", {
  method: "POST",
  body: impersonateUserBodySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "impersonateUser",
    summary: "Impersonate a user",
    description: "Impersonate a user",
    responses: { 200: {
      description: "Impersonation session created",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          session: { $ref: "#/components/schemas/Session" },
          user: { $ref: "#/components/schemas/User" }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  var _a, _b;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["impersonate"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS });
  const targetUser = await ctx.context.internalAdapter.findUserById(ctx.body.userId);
  if (!targetUser) throw new APIError("NOT_FOUND", { message: "User not found" });
  const adminRoles = (Array.isArray(opts.adminRoles) ? opts.adminRoles : ((_a = opts.adminRoles) == null ? void 0 : _a.split(",")) || []).map((role2) => role2.trim());
  const targetUserRole = (targetUser.role || opts.defaultRole || "user").split(",");
  if (opts.allowImpersonatingAdmins !== true && (targetUserRole.some((role2) => adminRoles.includes(role2)) || ((_b = opts.adminUserIds) == null ? void 0 : _b.includes(targetUser.id)))) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_CANNOT_IMPERSONATE_ADMINS });
  const session2 = await ctx.context.internalAdapter.createSession(targetUser.id, true, {
    impersonatedBy: ctx.context.session.user.id,
    expiresAt: (opts == null ? void 0 : opts.impersonationSessionDuration) ? getDate(opts.impersonationSessionDuration, "sec") : getDate(3600, "sec")
  }, true);
  if (!session2) throw new APIError("INTERNAL_SERVER_ERROR", { message: ADMIN_ERROR_CODES.FAILED_TO_CREATE_USER });
  const authCookies = ctx.context.authCookies;
  deleteSessionCookie(ctx);
  const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
  const adminCookieProp = ctx.context.createAuthCookie("admin_session");
  await ctx.setSignedCookie(adminCookieProp.name, `${ctx.context.session.session.token}:${dontRememberMeCookie || ""}`, ctx.context.secret, authCookies.sessionToken.options);
  await setSessionCookie(ctx, {
    session: session2,
    user: targetUser
  }, true);
  return ctx.json({
    session: session2,
    user: targetUser
  });
});
const stopImpersonating = () => createAuthEndpoint("/admin/stop-impersonating", {
  method: "POST",
  requireHeaders: true
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("UNAUTHORIZED");
  if (!session2.session.impersonatedBy) throw new APIError("BAD_REQUEST", { message: "You are not impersonating anyone" });
  const user2 = await ctx.context.internalAdapter.findUserById(session2.session.impersonatedBy);
  if (!user2) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to find user" });
  const adminCookieName = ctx.context.createAuthCookie("admin_session").name;
  const adminCookie = await ctx.getSignedCookie(adminCookieName, ctx.context.secret);
  if (!adminCookie) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to find admin session" });
  const [adminSessionToken, dontRememberMeCookie] = adminCookie == null ? void 0 : adminCookie.split(":");
  const adminSession = await ctx.context.internalAdapter.findSession(adminSessionToken);
  if (!adminSession || adminSession.session.userId !== user2.id) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Failed to find admin session" });
  await ctx.context.internalAdapter.deleteSession(session2.session.token);
  await setSessionCookie(ctx, adminSession, !!dontRememberMeCookie);
  await ctx.setSignedCookie(adminCookieName, "", ctx.context.secret, {
    ...ctx.context.authCookies.sessionToken.options,
    maxAge: 0
  });
  return ctx.json(adminSession);
});
const revokeUserSessionBodySchema = z.object({ sessionToken: z.string().meta({ description: "The session token" }) });
const revokeUserSession = (opts) => createAuthEndpoint("/admin/revoke-user-session", {
  method: "POST",
  body: revokeUserSessionBodySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "revokeUserSession",
    summary: "Revoke a user session",
    description: "Revoke a user session",
    responses: { 200: {
      description: "Session revoked",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { session: ["revoke"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS });
  await ctx.context.internalAdapter.deleteSession(ctx.body.sessionToken);
  return ctx.json({ success: true });
});
const revokeUserSessionsBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const revokeUserSessions = (opts) => createAuthEndpoint("/admin/revoke-user-sessions", {
  method: "POST",
  body: revokeUserSessionsBodySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "revokeUserSessions",
    summary: "Revoke all user sessions",
    description: "Revoke all user sessions",
    responses: { 200: {
      description: "Sessions revoked",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { session: ["revoke"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS });
  await ctx.context.internalAdapter.deleteSessions(ctx.body.userId);
  return ctx.json({ success: true });
});
const removeUserBodySchema = z.object({ userId: z.coerce.string().meta({ description: "The user id" }) });
const removeUser = (opts) => createAuthEndpoint("/admin/remove-user", {
  method: "POST",
  body: removeUserBodySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "removeUser",
    summary: "Remove a user",
    description: "Delete a user and all their sessions and accounts. Cannot be undone.",
    responses: { 200: {
      description: "User removed",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = ctx.context.session;
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: session2.user.role,
    options: opts,
    permissions: { user: ["delete"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS });
  if (ctx.body.userId === ctx.context.session.user.id) throw new APIError("BAD_REQUEST", { message: ADMIN_ERROR_CODES.YOU_CANNOT_REMOVE_YOURSELF });
  if (!await ctx.context.internalAdapter.findUserById(ctx.body.userId)) throw new APIError("NOT_FOUND", { message: "User not found" });
  await ctx.context.internalAdapter.deleteUser(ctx.body.userId);
  return ctx.json({ success: true });
});
const setUserPasswordBodySchema = z.object({
  newPassword: z.string().nonempty("newPassword cannot be empty").meta({ description: "The new password" }),
  userId: z.coerce.string().nonempty("userId cannot be empty").meta({ description: "The user id" })
});
const setUserPassword = (opts) => createAuthEndpoint("/admin/set-user-password", {
  method: "POST",
  body: setUserPasswordBodySchema,
  use: [adminMiddleware],
  metadata: { openapi: {
    operationId: "setUserPassword",
    summary: "Set a user's password",
    description: "Set a user's password",
    responses: { 200: {
      description: "Password set",
      content: { "application/json": { schema: {
        type: "object",
        properties: { status: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  if (!hasPermission({
    userId: ctx.context.session.user.id,
    role: ctx.context.session.user.role,
    options: opts,
    permissions: { user: ["set-password"] }
  })) throw new APIError("FORBIDDEN", { message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD });
  const { newPassword, userId } = ctx.body;
  const minPasswordLength = ctx.context.password.config.minPasswordLength;
  if (newPassword.length < minPasswordLength) {
    ctx.context.logger.error("Password is too short");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT });
  }
  const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
  if (newPassword.length > maxPasswordLength) {
    ctx.context.logger.error("Password is too long");
    throw new APIError("BAD_REQUEST", { message: BASE_ERROR_CODES.PASSWORD_TOO_LONG });
  }
  const hashedPassword = await ctx.context.password.hash(newPassword);
  await ctx.context.internalAdapter.updatePassword(userId, hashedPassword);
  return ctx.json({ status: true });
});
const userHasPermissionBodySchema = z.object({
  userId: z.coerce.string().optional().meta({ description: `The user id. Eg: "user-id"` }),
  role: z.string().optional().meta({ description: `The role to check permission for. Eg: "admin"` })
}).and(z.union([z.object({
  permission: z.record(z.string(), z.array(z.string())),
  permissions: z.undefined()
}), z.object({
  permission: z.undefined(),
  permissions: z.record(z.string(), z.array(z.string()))
})]));
const userHasPermission = (opts) => {
  return createAuthEndpoint("/admin/has-permission", {
    method: "POST",
    body: userHasPermissionBodySchema,
    metadata: {
      openapi: {
        description: "Check if the user has permission",
        requestBody: { content: { "application/json": { schema: {
          type: "object",
          properties: {
            permission: {
              type: "object",
              description: "The permission to check",
              deprecated: true
            },
            permissions: {
              type: "object",
              description: "The permission to check"
            }
          },
          required: ["permissions"]
        } } } },
        responses: { "200": {
          description: "Success",
          content: { "application/json": { schema: {
            type: "object",
            properties: {
              error: { type: "string" },
              success: { type: "boolean" }
            },
            required: ["success"]
          } } }
        } }
      },
      $Infer: { body: {} }
    }
  }, async (ctx) => {
    var _a, _b;
    if (!((_a = ctx.body) == null ? void 0 : _a.permission) && !((_b = ctx.body) == null ? void 0 : _b.permissions)) throw new APIError("BAD_REQUEST", { message: "invalid permission check. no permission(s) were passed." });
    const session2 = await getSessionFromCtx(ctx);
    if (!session2 && (ctx.request || ctx.headers)) throw new APIError("UNAUTHORIZED");
    if (!session2 && !ctx.body.userId && !ctx.body.role) throw new APIError("BAD_REQUEST", { message: "user id or role is required" });
    const user2 = (session2 == null ? void 0 : session2.user) || (ctx.body.role ? {
      id: ctx.body.userId || "",
      role: ctx.body.role
    } : null) || await ctx.context.internalAdapter.findUserById(ctx.body.userId);
    if (!user2) throw new APIError("BAD_REQUEST", { message: "user not found" });
    const result = hasPermission({
      userId: user2.id,
      role: user2.role,
      options: opts,
      permissions: ctx.body.permissions ?? ctx.body.permission
    });
    return ctx.json({
      error: null,
      success: result
    });
  });
};
const schema = {
  user: { fields: {
    role: {
      type: "string",
      required: false,
      input: false
    },
    banned: {
      type: "boolean",
      defaultValue: false,
      required: false,
      input: false
    },
    banReason: {
      type: "string",
      required: false,
      input: false
    },
    banExpires: {
      type: "date",
      required: false,
      input: false
    }
  } },
  session: { fields: { impersonatedBy: {
    type: "string",
    required: false
  } } }
};
const admin = (options) => {
  const opts = {
    defaultRole: (options == null ? void 0 : options.defaultRole) ?? "user",
    adminRoles: (options == null ? void 0 : options.adminRoles) ?? ["admin"],
    bannedUserMessage: (options == null ? void 0 : options.bannedUserMessage) ?? "You have been banned from this application. Please contact support if you believe this is an error.",
    ...options
  };
  if (options == null ? void 0 : options.adminRoles) {
    const invalidRoles = (Array.isArray(options.adminRoles) ? options.adminRoles : [...options.adminRoles.split(",")]).filter((role2) => !Object.keys((options == null ? void 0 : options.roles) || defaultRoles$1).map((r) => r.toLowerCase()).includes(role2.toLowerCase()));
    if (invalidRoles.length > 0) throw new BetterAuthError(`Invalid admin roles: ${invalidRoles.join(", ")}. Admin roles must be defined in the 'roles' configuration.`);
  }
  return {
    id: "admin",
    init() {
      return { options: { databaseHooks: {
        user: { create: { async before(user2) {
          return { data: {
            role: (options == null ? void 0 : options.defaultRole) ?? "user",
            ...user2
          } };
        } } },
        session: { create: { async before(session2, ctx) {
          var _a;
          if (!ctx) return;
          const user2 = await ctx.context.internalAdapter.findUserById(session2.userId);
          if (user2.banned) {
            if (user2.banExpires && new Date(user2.banExpires).getTime() < Date.now()) {
              await ctx.context.internalAdapter.updateUser(session2.userId, {
                banned: false,
                banReason: null,
                banExpires: null
              });
              return;
            }
            if (ctx && (ctx.path.startsWith("/callback") || ctx.path.startsWith("/oauth2/callback"))) {
              const redirectURI = ((_a = ctx.context.options.onAPIError) == null ? void 0 : _a.errorURL) || `${ctx.context.baseURL}/error`;
              throw ctx.redirect(`${redirectURI}?error=banned&error_description=${opts.bannedUserMessage}`);
            }
            throw new APIError("FORBIDDEN", {
              message: opts.bannedUserMessage,
              code: "BANNED_USER"
            });
          }
        } } }
      } } };
    },
    hooks: { after: [{
      matcher(context) {
        return context.path === "/list-sessions";
      },
      handler: createAuthMiddleware(async (ctx) => {
        const response = await getEndpointResponse(ctx);
        if (!response) return;
        const newJson = response.filter((session2) => {
          return !session2.impersonatedBy;
        });
        return ctx.json(newJson);
      })
    }] },
    endpoints: {
      setRole: setRole(opts),
      getUser: getUser(opts),
      createUser: createUser(opts),
      adminUpdateUser: adminUpdateUser(opts),
      listUsers: listUsers(opts),
      listUserSessions: listUserSessions(opts),
      unbanUser: unbanUser(opts),
      banUser: banUser(opts),
      impersonateUser: impersonateUser(opts),
      stopImpersonating: stopImpersonating(),
      revokeUserSession: revokeUserSession(opts),
      revokeUserSessions: revokeUserSessions(opts),
      removeUser: removeUser(opts),
      setUserPassword: setUserPassword(opts),
      userHasPermission: userHasPermission(opts)
    },
    $ERROR_CODES: ADMIN_ERROR_CODES,
    schema: mergeSchema(schema, opts.schema),
    options
  };
};
defineErrorCodes({
  INVALID_EMAIL_FORMAT: "Email was not generated in a valid format",
  FAILED_TO_CREATE_USER: "Failed to create user",
  COULD_NOT_CREATE_SESSION: "Could not create session",
  ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY: "Anonymous users cannot sign in again anonymously"
});
z.object({
  key: z.string().meta({ description: "The key to verify" }),
  permissions: z.record(z.string(), z.array(z.string())).meta({ description: "The permissions to verify." }).optional()
});
z.object({
  name: z.string().meta({ description: "Name of the Api Key" }).optional(),
  expiresIn: z.number().meta({ description: "Expiration time of the Api Key in seconds" }).min(1).optional().nullable().default(null),
  userId: z.coerce.string().meta({ description: 'User Id of the user that the Api Key belongs to. server-only. Eg: "user-id"' }).optional(),
  prefix: z.string().meta({ description: "Prefix of the Api Key" }).regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid prefix format, must be alphanumeric and contain only underscores and hyphens." }).optional(),
  remaining: z.number().meta({ description: "Remaining number of requests. Server side only" }).min(0).optional().nullable().default(null),
  metadata: z.any().optional(),
  refillAmount: z.number().meta({ description: "Amount to refill the remaining count of the Api Key. server-only. Eg: 100" }).min(1).optional(),
  refillInterval: z.number().meta({ description: "Interval to refill the Api Key in milliseconds. server-only. Eg: 1000" }).optional(),
  rateLimitTimeWindow: z.number().meta({ description: "The duration in milliseconds where each request is counted. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 1000" }).optional(),
  rateLimitMax: z.number().meta({ description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100" }).optional(),
  rateLimitEnabled: z.boolean().meta({ description: "Whether the key has rate limiting enabled. server-only. Eg: true" }).optional(),
  permissions: z.record(z.string(), z.array(z.string())).meta({ description: "Permissions of the Api Key." }).optional()
});
z.object({ keyId: z.string().meta({ description: "The id of the Api Key" }) });
z.object({ id: z.string().meta({ description: "The id of the Api Key" }) });
z.object({
  keyId: z.string().meta({ description: "The id of the Api Key" }),
  userId: z.coerce.string().meta({ description: 'The id of the user which the api key belongs to. server-only. Eg: "some-user-id"' }).optional(),
  name: z.string().meta({ description: "The name of the key" }).optional(),
  enabled: z.boolean().meta({ description: "Whether the Api Key is enabled or not" }).optional(),
  remaining: z.number().meta({ description: "The number of remaining requests" }).min(1).optional(),
  refillAmount: z.number().meta({ description: "The refill amount" }).optional(),
  refillInterval: z.number().meta({ description: "The refill interval" }).optional(),
  metadata: z.any().optional(),
  expiresIn: z.number().meta({ description: "Expiration time of the Api Key in seconds" }).min(1).optional().nullable(),
  rateLimitEnabled: z.boolean().meta({ description: "Whether the key has rate limiting enabled." }).optional(),
  rateLimitTimeWindow: z.number().meta({ description: "The duration in milliseconds where each request is counted. server-only. Eg: 1000" }).optional(),
  rateLimitMax: z.number().meta({ description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100" }).optional(),
  permissions: z.record(z.string(), z.array(z.string())).meta({ description: "Update the permissions on the API Key. server-only." }).optional().nullable()
});
defineErrorCodes({
  INVALID_METADATA_TYPE: "metadata must be an object or undefined",
  REFILL_AMOUNT_AND_INTERVAL_REQUIRED: "refillAmount is required when refillInterval is provided",
  REFILL_INTERVAL_AND_AMOUNT_REQUIRED: "refillInterval is required when refillAmount is provided",
  USER_BANNED: "User is banned",
  UNAUTHORIZED_SESSION: "Unauthorized or invalid session",
  KEY_NOT_FOUND: "API Key not found",
  KEY_DISABLED: "API Key is disabled",
  KEY_EXPIRED: "API Key has expired",
  USAGE_EXCEEDED: "API Key has reached its usage limit",
  KEY_NOT_RECOVERABLE: "API Key is not recoverable",
  EXPIRES_IN_IS_TOO_SMALL: "The expiresIn is smaller than the predefined minimum value.",
  EXPIRES_IN_IS_TOO_LARGE: "The expiresIn is larger than the predefined maximum value.",
  INVALID_REMAINING: "The remaining count is either too large or too small.",
  INVALID_PREFIX_LENGTH: "The prefix length is either too large or too small.",
  INVALID_NAME_LENGTH: "The name length is either too large or too small.",
  METADATA_DISABLED: "Metadata is disabled.",
  RATE_LIMIT_EXCEEDED: "Rate limit exceeded.",
  NO_VALUES_TO_UPDATE: "No values to update.",
  KEY_DISABLED_EXPIRATION: "Custom key expiration values are disabled.",
  INVALID_API_KEY: "Invalid API key.",
  INVALID_USER_ID_FROM_API_KEY: "The user id from the API key is invalid.",
  INVALID_API_KEY_GETTER_RETURN_TYPE: "API Key getter returned an invalid key type. Expected string.",
  SERVER_ONLY_PROPERTY: "The property you're trying to set can only be set from the server auth instance only.",
  FAILED_TO_UPDATE_API_KEY: "Failed to update API key",
  NAME_REQUIRED: "API Key name is required."
});
defineErrorCodes({
  VERIFICATION_FAILED: "Captcha verification failed",
  MISSING_RESPONSE: "Missing CAPTCHA response",
  UNKNOWN_ERROR: "Something went wrong"
});
defineErrorCodes({
  MISSING_SECRET_KEY: "Missing secret key",
  SERVICE_UNAVAILABLE: "CAPTCHA service unavailable"
});
z.optional(z.object({
  disableCookieCache: z.boolean().meta({ description: "Disable cookie cache and fetch session from database" }).or(z.string().transform((v) => v === "true")).optional(),
  disableRefresh: z.boolean().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
const DEVICE_AUTHORIZATION_ERROR_CODES = defineErrorCodes({
  INVALID_DEVICE_CODE: "Invalid device code",
  EXPIRED_DEVICE_CODE: "Device code has expired",
  EXPIRED_USER_CODE: "User code has expired",
  AUTHORIZATION_PENDING: "Authorization pending",
  ACCESS_DENIED: "Access denied",
  INVALID_USER_CODE: "Invalid user code",
  DEVICE_CODE_ALREADY_PROCESSED: "Device code already processed",
  POLLING_TOO_FREQUENTLY: "Polling too frequently",
  USER_NOT_FOUND: "User not found",
  FAILED_TO_CREATE_SESSION: "Failed to create session",
  INVALID_DEVICE_CODE_STATUS: "Invalid device code status",
  AUTHENTICATION_REQUIRED: "Authentication required"
});
z.object({
  client_id: z.string().meta({ description: "The client ID of the application" }),
  scope: z.string().meta({ description: "Space-separated list of scopes" }).optional()
});
z.object({
  error: z.enum(["invalid_request", "invalid_client"]).meta({ description: "Error code" }),
  error_description: z.string().meta({ description: "Detailed error description" })
});
z.object({
  grant_type: z.literal("urn:ietf:params:oauth:grant-type:device_code").meta({ description: "The grant type for device flow" }),
  device_code: z.string().meta({ description: "The device verification code" }),
  client_id: z.string().meta({ description: "The client ID of the application" })
});
z.object({
  error: z.enum([
    "authorization_pending",
    "slow_down",
    "expired_token",
    "access_denied",
    "invalid_request",
    "invalid_grant"
  ]).meta({ description: "Error code" }),
  error_description: z.string().meta({ description: "Detailed error description" })
});
createAuthEndpoint("/device", {
  method: "GET",
  query: z.object({ user_code: z.string().meta({ description: "The user code to verify" }) }),
  error: z.object({
    error: z.enum(["invalid_request"]).meta({ description: "Error code" }),
    error_description: z.string().meta({ description: "Detailed error description" })
  }),
  metadata: { openapi: {
    description: "Verify user code and get device authorization status",
    responses: { 200: {
      description: "Device authorization status",
      content: { "application/json": { schema: {
        type: "object",
        properties: {
          user_code: {
            type: "string",
            description: "The user code to verify"
          },
          status: {
            type: "string",
            enum: [
              "pending",
              "approved",
              "denied"
            ],
            description: "Current status of the device authorization"
          }
        }
      } } }
    } }
  } }
}, async (ctx) => {
  const { user_code } = ctx.query;
  const cleanUserCode = user_code.replace(/-/g, "");
  const deviceCodeRecord = await ctx.context.adapter.findOne({
    model: "deviceCode",
    where: [{
      field: "userCode",
      value: cleanUserCode
    }]
  });
  if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
  });
  if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
    error: "expired_token",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
  });
  return ctx.json({
    user_code,
    status: deviceCodeRecord.status
  });
});
createAuthEndpoint("/device/approve", {
  method: "POST",
  body: z.object({ userCode: z.string().meta({ description: "The user code to approve" }) }),
  error: z.object({
    error: z.enum([
      "invalid_request",
      "expired_token",
      "device_code_already_processed"
    ]).meta({ description: "Error code" }),
    error_description: z.string().meta({ description: "Detailed error description" })
  }),
  requireHeaders: true,
  metadata: { openapi: {
    description: "Approve device authorization",
    responses: { 200: {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const session2 = await getSessionFromCtx(ctx);
  if (!session2) throw new APIError("UNAUTHORIZED", {
    error: "unauthorized",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.AUTHENTICATION_REQUIRED
  });
  const { userCode } = ctx.body;
  const cleanUserCode = userCode.replace(/-/g, "");
  const deviceCodeRecord = await ctx.context.adapter.findOne({
    model: "deviceCode",
    where: [{
      field: "userCode",
      value: cleanUserCode
    }]
  });
  if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
  });
  if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
    error: "expired_token",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
  });
  if (deviceCodeRecord.status !== "pending") throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.DEVICE_CODE_ALREADY_PROCESSED
  });
  await ctx.context.adapter.update({
    model: "deviceCode",
    where: [{
      field: "id",
      value: deviceCodeRecord.id
    }],
    update: {
      status: "approved",
      userId: session2.user.id
    }
  });
  return ctx.json({ success: true });
});
createAuthEndpoint("/device/deny", {
  method: "POST",
  body: z.object({ userCode: z.string().meta({ description: "The user code to deny" }) }),
  error: z.object({
    error: z.enum(["invalid_request", "expired_token"]).meta({ description: "Error code" }),
    error_description: z.string().meta({ description: "Detailed error description" })
  }),
  metadata: { openapi: {
    description: "Deny device authorization",
    responses: { 200: {
      description: "Success",
      content: { "application/json": { schema: {
        type: "object",
        properties: { success: { type: "boolean" } }
      } } }
    } }
  } }
}, async (ctx) => {
  const { userCode } = ctx.body;
  const cleanUserCode = userCode.replace(/-/g, "");
  const deviceCodeRecord = await ctx.context.adapter.findOne({
    model: "deviceCode",
    where: [{
      field: "userCode",
      value: cleanUserCode
    }]
  });
  if (!deviceCodeRecord) throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.INVALID_USER_CODE
  });
  if (deviceCodeRecord.expiresAt < /* @__PURE__ */ new Date()) throw new APIError("BAD_REQUEST", {
    error: "expired_token",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.EXPIRED_USER_CODE
  });
  if (deviceCodeRecord.status !== "pending") throw new APIError("BAD_REQUEST", {
    error: "invalid_request",
    error_description: DEVICE_AUTHORIZATION_ERROR_CODES.DEVICE_CODE_ALREADY_PROCESSED
  });
  await ctx.context.adapter.update({
    model: "deviceCode",
    where: [{
      field: "id",
      value: deviceCodeRecord.id
    }],
    update: { status: "denied" }
  });
  return ctx.json({ success: true });
});
z.object({
  id: z.string(),
  deviceCode: z.string(),
  userCode: z.string(),
  userId: z.string().optional(),
  expiresAt: z.date(),
  status: z.string(),
  lastPolledAt: z.date().optional(),
  pollingInterval: z.number().optional(),
  clientId: z.string().optional(),
  scope: z.string().optional()
});
const timeStringSchema = z.custom((val) => {
  if (typeof val !== "string") return false;
  try {
    ms(val);
    return true;
  } catch {
    return false;
  }
}, { message: "Invalid time string format. Use formats like '30m', '5s', '1h', etc." });
z.object({
  expiresIn: timeStringSchema.default("30m").describe("Time in seconds until the device code expires. Use formats like '30m', '5s', '1h', etc."),
  interval: timeStringSchema.default("5s").describe("Time in seconds between polling attempts. Use formats like '30m', '5s', '1h', etc."),
  deviceCodeLength: z.number().int().positive().default(40).describe("Length of the device code to be generated. Default is 40 characters."),
  userCodeLength: z.number().int().positive().default(8).describe("Length of the user code to be generated. Default is 8 characters."),
  generateDeviceCode: z.custom((val) => typeof val === "function", { message: "generateDeviceCode must be a function that returns a string or a promise that resolves to a string." }).optional().describe("Function to generate a device code. If not provided, a default random string generator will be used."),
  generateUserCode: z.custom((val) => typeof val === "function", { message: "generateUserCode must be a function that returns a string or a promise that resolves to a string." }).optional().describe("Function to generate a user code. If not provided, a default random string generator will be used."),
  validateClient: z.custom((val) => typeof val === "function", { message: "validateClient must be a function that returns a boolean or a promise that resolves to a boolean." }).optional().describe("Function to validate the client ID. If not provided, no validation will be performed."),
  onDeviceAuthRequest: z.custom((val) => typeof val === "function", { message: "onDeviceAuthRequest must be a function that returns void or a promise that resolves to void." }).optional().describe("Function to handle device authorization requests. If not provided, no additional actions will be taken."),
  verificationUri: z.string().optional().describe("The URI where users verify their device code. Can be an absolute URL (https://example.com/device) or relative path (/custom-path). This will be returned as verification_uri in the device code response. If not provided, defaults to /device."),
  schema: z.custom(() => true)
});
const types = [
  "email-verification",
  "sign-in",
  "forget-password"
];
defineErrorCodes({
  OTP_EXPIRED: "OTP expired",
  INVALID_OTP: "Invalid OTP",
  TOO_MANY_ATTEMPTS: "Too many attempts"
});
z.object({
  email: z.string({}).meta({ description: "Email address to send the OTP" }),
  type: z.enum(types).meta({ description: "Type of the OTP" })
});
z.object({
  email: z.string({}).meta({ description: "Email address to send the OTP" }),
  type: z.enum(types).meta({
    required: true,
    description: "Type of the OTP"
  })
});
z.object({
  email: z.string({}).meta({ description: "Email address the OTP was sent to" }),
  type: z.enum(types).meta({
    required: true,
    description: "Type of the OTP"
  })
});
z.object({
  email: z.string().meta({ description: "Email address the OTP was sent to" }),
  type: z.enum(types).meta({
    required: true,
    description: "Type of the OTP"
  }),
  otp: z.string().meta({
    required: true,
    description: "OTP to verify"
  })
});
z.object({
  email: z.string({}).meta({ description: "Email address to verify" }),
  otp: z.string().meta({
    required: true,
    description: "OTP to verify"
  })
});
z.object({
  email: z.string({}).meta({ description: "Email address to sign in" }),
  otp: z.string().meta({
    required: true,
    description: "OTP sent to the email"
  })
});
z.object({ email: z.string().meta({ description: "Email address to send the OTP" }) });
z.object({
  email: z.string().meta({ description: "Email address to reset the password" }),
  otp: z.string().meta({ description: "OTP sent to the email" }),
  password: z.string().meta({ description: "New password" })
});
defineErrorCodes({
  INVALID_OAUTH_CONFIGURATION: "Invalid OAuth configuration",
  TOKEN_URL_NOT_FOUND: "Invalid OAuth configuration. Token URL not found.",
  PROVIDER_CONFIG_NOT_FOUND: "No config found for provider",
  PROVIDER_ID_REQUIRED: "Provider ID is required",
  INVALID_OAUTH_CONFIG: "Invalid OAuth configuration.",
  SESSION_REQUIRED: "Session is required"
});
z.object({
  providerId: z.string().meta({ description: "The provider ID for the OAuth provider" }),
  callbackURL: z.string().meta({ description: "The URL to redirect to after sign in" }).optional(),
  errorCallbackURL: z.string().meta({ description: "The URL to redirect to if an error occurs" }).optional(),
  newUserCallbackURL: z.string().meta({ description: 'The URL to redirect to after login if the user is new. Eg: "/welcome"' }).optional(),
  disableRedirect: z.boolean().meta({ description: "Disable redirect" }).optional(),
  scopes: z.array(z.string()).meta({ description: "Scopes to be passed to the provider authorization request." }).optional(),
  requestSignUp: z.boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. Eg: false" }).optional(),
  additionalData: z.record(z.string(), z.any()).optional()
});
z.object({
  code: z.string().meta({ description: "The OAuth2 code" }).optional(),
  error: z.string().meta({ description: "The error message, if any" }).optional(),
  error_description: z.string().meta({ description: "The error description, if any" }).optional(),
  state: z.string().meta({ description: "The state parameter from the OAuth2 request" }).optional()
});
z.object({
  providerId: z.string(),
  callbackURL: z.string(),
  scopes: z.array(z.string()).meta({ description: "Additional scopes to request when linking the account" }).optional(),
  errorCallbackURL: z.string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional()
});
defineErrorCodes({ PASSWORD_COMPROMISED: "The password you entered has been compromised. Please choose a different password." });
z.object({
  payload: z.record(z.string(), z.any()),
  overrideOptions: z.record(z.string(), z.any()).optional()
});
z.object({
  token: z.string(),
  issuer: z.string().optional()
});
z.object({
  email: z.email().meta({ description: "Email address to send the magic link" }),
  name: z.string().meta({ description: 'User display name. Only used if the user is registering for the first time. Eg: "my-name"' }).optional(),
  callbackURL: z.string().meta({ description: "URL to redirect after magic link verification" }).optional(),
  newUserCallbackURL: z.string().meta({ description: "URL to redirect after new user signup. Only used if the user is registering for the first time." }).optional(),
  errorCallbackURL: z.string().meta({ description: "URL to redirect after error." }).optional()
});
z.object({
  token: z.string().meta({ description: "Verification token" }),
  callbackURL: z.string().meta({ description: 'URL to redirect after magic link verification, if not provided the user will be redirected to the root URL. Eg: "/dashboard"' }).optional(),
  errorCallbackURL: z.string().meta({ description: "URL to redirect after error." }).optional(),
  newUserCallbackURL: z.string().meta({ description: "URL to redirect after new user signup. Only used if the user is registering for the first time." }).optional()
});
z.object({
  clientId: z.string(),
  clientSecret: z.string().optional(),
  type: z.enum([
    "web",
    "native",
    "user-agent-based",
    "public"
  ]),
  name: z.string(),
  icon: z.string().optional(),
  metadata: z.string().optional(),
  disabled: z.boolean().optional().default(false),
  redirectUrls: z.string(),
  userId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
z.object({
  accept: z.boolean(),
  consent_code: z.string().optional().nullish()
});
z.record(z.any(), z.any());
z.object({
  redirect_uris: z.array(z.string()).meta({ description: 'A list of redirect URIs. Eg: ["https://client.example.com/callback"]' }),
  token_endpoint_auth_method: z.enum([
    "none",
    "client_secret_basic",
    "client_secret_post"
  ]).meta({ description: 'The authentication method for the token endpoint. Eg: "client_secret_basic"' }).default("client_secret_basic").optional(),
  grant_types: z.array(z.enum([
    "authorization_code",
    "implicit",
    "password",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:ietf:params:oauth:grant-type:saml2-bearer"
  ])).meta({ description: 'The grant types supported by the application. Eg: ["authorization_code"]' }).default(["authorization_code"]).optional(),
  response_types: z.array(z.enum(["code", "token"])).meta({ description: 'The response types supported by the application. Eg: ["code"]' }).default(["code"]).optional(),
  client_name: z.string().meta({ description: 'The name of the application. Eg: "My App"' }).optional(),
  client_uri: z.string().meta({ description: 'The URI of the application. Eg: "https://client.example.com"' }).optional(),
  logo_uri: z.string().meta({ description: 'The URI of the application logo. Eg: "https://client.example.com/logo.png"' }).optional(),
  scope: z.string().meta({ description: 'The scopes supported by the application. Separated by spaces. Eg: "profile email"' }).optional(),
  contacts: z.array(z.string()).meta({ description: 'The contact information for the application. Eg: ["admin@example.com"]' }).optional(),
  tos_uri: z.string().meta({ description: 'The URI of the application terms of service. Eg: "https://client.example.com/tos"' }).optional(),
  policy_uri: z.string().meta({ description: 'The URI of the application privacy policy. Eg: "https://client.example.com/policy"' }).optional(),
  jwks_uri: z.string().meta({ description: 'The URI of the application JWKS. Eg: "https://client.example.com/jwks"' }).optional(),
  jwks: z.record(z.any(), z.any()).meta({ description: 'The JWKS of the application. Eg: {"keys": [{"kty": "RSA", "alg": "RS256", "use": "sig", "n": "...", "e": "..."}]}' }).optional(),
  metadata: z.record(z.any(), z.any()).meta({ description: 'The metadata of the application. Eg: {"key": "value"}' }).optional(),
  software_id: z.string().meta({ description: 'The software ID of the application. Eg: "my-software"' }).optional(),
  software_version: z.string().meta({ description: 'The software version of the application. Eg: "1.0.0"' }).optional(),
  software_statement: z.string().meta({ description: "The software statement of the application." }).optional()
});
z.object({
  redirect_uris: z.array(z.string()),
  token_endpoint_auth_method: z.enum([
    "none",
    "client_secret_basic",
    "client_secret_post"
  ]).default("client_secret_basic").optional(),
  grant_types: z.array(z.enum([
    "authorization_code",
    "implicit",
    "password",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:ietf:params:oauth:grant-type:saml2-bearer"
  ])).default(["authorization_code"]).optional(),
  response_types: z.array(z.enum(["code", "token"])).default(["code"]).optional(),
  client_name: z.string().optional(),
  client_uri: z.string().optional(),
  logo_uri: z.string().optional(),
  scope: z.string().optional(),
  contacts: z.array(z.string()).optional(),
  tos_uri: z.string().optional(),
  policy_uri: z.string().optional(),
  jwks_uri: z.string().optional(),
  jwks: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.any(), z.any()).optional(),
  software_id: z.string().optional(),
  software_version: z.string().optional(),
  software_statement: z.string().optional()
});
z.record(z.any(), z.any());
defineErrorCodes({ INVALID_SESSION_TOKEN: "Invalid session token" });
z.object({ sessionToken: z.string().meta({ description: "The session token to set as active" }) });
z.object({ sessionToken: z.string().meta({ description: "The session token to revoke" }) });
z.object({
  callbackURL: z.string().meta({ description: "The URL to redirect to after the proxy" }),
  cookies: z.string().meta({ description: "The cookies to set after the proxy" })
});
z.object({ idToken: z.string().meta({ description: "Google ID token, which the client obtains from the One Tap API" }) });
z.object({ token: z.string().meta({ description: 'The token to verify. Eg: "some-token"' }) });
createAuthMiddleware(async () => {
  return {};
});
createAuthMiddleware({ use: [sessionMiddleware] }, async (ctx) => {
  return { session: ctx.context.session };
});
defineErrorCodes({
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: "You are not allowed to create a new organization",
  YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: "You have reached the maximum number of organizations",
  ORGANIZATION_ALREADY_EXISTS: "Organization already exists",
  ORGANIZATION_SLUG_ALREADY_TAKEN: "Organization slug already taken",
  ORGANIZATION_NOT_FOUND: "Organization not found",
  USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: "User is not a member of the organization",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: "You are not allowed to update this organization",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: "You are not allowed to delete this organization",
  NO_ACTIVE_ORGANIZATION: "No active organization",
  USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: "User is already a member of this organization",
  MEMBER_NOT_FOUND: "Member not found",
  ROLE_NOT_FOUND: "Role not found",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: "You are not allowed to create a new team",
  TEAM_ALREADY_EXISTS: "Team already exists",
  TEAM_NOT_FOUND: "Team not found",
  YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: "You cannot leave the organization as the only owner",
  YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: "You cannot leave the organization without an owner",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: "You are not allowed to delete this member",
  YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: "You are not allowed to invite users to this organization",
  USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: "User is already invited to this organization",
  INVITATION_NOT_FOUND: "Invitation not found",
  YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: "You are not the recipient of the invitation",
  EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: "Email verification required before accepting or rejecting invitation",
  YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: "You are not allowed to cancel this invitation",
  INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: "Inviter is no longer a member of the organization",
  YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: "You are not allowed to invite a user with this role",
  FAILED_TO_RETRIEVE_INVITATION: "Failed to retrieve invitation",
  YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: "You have reached the maximum number of teams",
  UNABLE_TO_REMOVE_LAST_TEAM: "Unable to remove last team",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: "You are not allowed to update this member",
  ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: "Organization membership limit reached",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to create teams in this organization",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to delete teams in this organization",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: "You are not allowed to update this team",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: "You are not allowed to delete this team",
  INVITATION_LIMIT_REACHED: "Invitation limit reached",
  TEAM_MEMBER_LIMIT_REACHED: "Team member limit reached",
  USER_IS_NOT_A_MEMBER_OF_THE_TEAM: "User is not a member of the team",
  YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: "You are not allowed to list the members of this team",
  YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: "You do not have an active team",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: "You are not allowed to create a new member",
  YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: "You are not allowed to remove a team member",
  YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: "You are not allowed to access this organization as an owner",
  YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: "You are not a member of this organization",
  MISSING_AC_INSTANCE: "Dynamic Access Control requires a pre-defined ac instance on the server auth plugin. Read server logs for more information",
  YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: "You must be in an organization to create a role",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: "You are not allowed to create a role",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: "You are not allowed to update a role",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: "You are not allowed to delete a role",
  YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: "You are not allowed to read a role",
  YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: "You are not allowed to list a role",
  YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: "You are not allowed to get a role",
  TOO_MANY_ROLES: "This organization has too many roles",
  INVALID_RESOURCE: "The provided permission includes an invalid resource",
  ROLE_NAME_IS_ALREADY_TAKEN: "That role name is already taken",
  CANNOT_DELETE_A_PRE_DEFINED_ROLE: "Cannot delete a pre-defined role"
});
z.object({
  organizationId: z.string().optional().meta({ description: "The id of the organization to create the role in. If not provided, the user's active organization will be used." }),
  role: z.string().meta({ description: "The name of the role to create" }),
  permission: z.record(z.string(), z.array(z.string())).meta({ description: "The permission to assign to the role" })
});
z.object({ organizationId: z.string().optional().meta({ description: "The id of the organization to create the role in. If not provided, the user's active organization will be used." }) }).and(z.union([z.object({ roleName: z.string().nonempty().meta({ description: "The name of the role to delete" }) }), z.object({ roleId: z.string().nonempty().meta({ description: "The id of the role to delete" }) })]));
z.object({ organizationId: z.string().optional().meta({ description: "The id of the organization to list roles for. If not provided, the user's active organization will be used." }) }).optional();
z.object({ organizationId: z.string().optional().meta({ description: "The id of the organization to read a role for. If not provided, the user's active organization will be used." }) }).and(z.union([z.object({ roleName: z.string().nonempty().meta({ description: "The name of the role to read" }) }), z.object({ roleId: z.string().nonempty().meta({ description: "The id of the role to read" }) })])).optional();
z.union([z.object({ roleName: z.string().nonempty().meta({ description: "The name of the role to update" }) }), z.object({ roleId: z.string().nonempty().meta({ description: "The id of the role to update" }) })]);
z.object({
  email: z.string().meta({ description: "The email address of the user to invite" }),
  role: z.union([z.string().meta({ description: "The role to assign to the user" }), z.array(z.string().meta({ description: "The roles to assign to the user" }))]).meta({ description: 'The role(s) to assign to the user. It can be `admin`, `member`, owner. Eg: "member"' }),
  organizationId: z.string().meta({ description: "The organization ID to invite the user to" }).optional(),
  resend: z.boolean().meta({ description: "Resend the invitation email, if the user is already invited. Eg: true" }).optional(),
  teamId: z.union([z.string().meta({ description: "The team ID to invite the user to" }).optional(), z.array(z.string()).meta({ description: "The team IDs to invite the user to" }).optional()])
});
z.object({ invitationId: z.string().meta({ description: "The ID of the invitation to accept" }) });
z.object({ invitationId: z.string().meta({ description: "The ID of the invitation to reject" }) });
z.object({ invitationId: z.string().meta({ description: "The ID of the invitation to cancel" }) });
z.object({ id: z.string().meta({ description: "The ID of the invitation to get" }) });
z.object({ organizationId: z.string().meta({ description: "The ID of the organization to list invitations for" }).optional() }).optional();
z.object({
  userId: z.coerce.string().meta({ description: 'The user Id which represents the user to be added as a member. If `null` is provided, then it\'s expected to provide session headers. Eg: "user-id"' }),
  role: z.union([z.string(), z.array(z.string())]).meta({ description: 'The role(s) to assign to the new member. Eg: ["admin", "sale"]' }),
  organizationId: z.string().meta({ description: `An optional organization ID to pass. If not provided, will default to the user's active organization. Eg: "org-id"` }).optional(),
  teamId: z.string().meta({ description: 'An optional team ID to add the member to. Eg: "team-id"' }).optional()
});
z.object({
  memberIdOrEmail: z.string().meta({ description: "The ID or email of the member to remove" }),
  organizationId: z.string().meta({ description: 'The ID of the organization to remove the member from. If not provided, the active organization will be used. Eg: "org-id"' }).optional()
});
z.object({
  role: z.union([z.string(), z.array(z.string())]).meta({ description: 'The new role to be applied. This can be a string or array of strings representing the roles. Eg: ["admin", "sale"]' }),
  memberId: z.string().meta({ description: 'The member id to apply the role update to. Eg: "member-id"' }),
  organizationId: z.string().meta({ description: 'An optional organization ID which the member is a part of to apply the role update. If not provided, you must provide session headers to get the active organization. Eg: "organization-id"' }).optional()
});
z.object({ organizationId: z.string().meta({ description: 'The organization Id for the member to leave. Eg: "organization-id"' }) });
z.object({
  userId: z.string().meta({ description: "The user ID to get the role for. If not provided, will default to the current user's" }).optional(),
  organizationId: z.string().meta({ description: `The organization ID to list members for. If not provided, will default to the user's active organization. Eg: "organization-id"` }).optional(),
  organizationSlug: z.string().meta({ description: `The organization slug to list members for. If not provided, will default to the user's active organization. Eg: "organization-slug"` }).optional()
}).optional();
z.object({
  name: z.string().min(1).meta({ description: "The name of the organization" }),
  slug: z.string().min(1).meta({ description: "The slug of the organization" }),
  userId: z.coerce.string().meta({ description: 'The user id of the organization creator. If not provided, the current user will be used. Should only be used by admins or when called by the server. server-only. Eg: "user-id"' }).optional(),
  logo: z.string().meta({ description: "The logo of the organization" }).optional(),
  metadata: z.record(z.string(), z.any()).meta({ description: "The metadata of the organization" }).optional(),
  keepCurrentActiveOrganization: z.boolean().meta({ description: "Whether to keep the current active organization active after creating a new one. Eg: true" }).optional()
});
z.object({ slug: z.string().meta({ description: 'The organization slug to check. Eg: "my-org"' }) });
z.object({
  name: z.string().min(1).meta({ description: "The name of the organization" }).optional(),
  slug: z.string().min(1).meta({ description: "The slug of the organization" }).optional(),
  logo: z.string().meta({ description: "The logo of the organization" }).optional(),
  metadata: z.record(z.string(), z.any()).meta({ description: "The metadata of the organization" }).optional()
});
z.object({ organizationId: z.string().meta({ description: "The organization id to delete" }) });
z.optional(z.object({
  organizationId: z.string().meta({ description: "The organization id to get" }).optional(),
  organizationSlug: z.string().meta({ description: "The organization slug to get" }).optional(),
  membersLimit: z.number().or(z.string().transform((val) => parseInt(val))).meta({ description: "The limit of members to get. By default, it uses the membershipLimit option which defaults to 100." }).optional()
}));
z.object({
  organizationId: z.string().meta({ description: 'The organization id to set as active. It can be null to unset the active organization. Eg: "org-id"' }).nullable().optional(),
  organizationSlug: z.string().meta({ description: 'The organization slug to set as active. It can be null to unset the active organization if organizationId is not provided. Eg: "org-slug"' }).optional()
});
const roleSchema = z.string();
const invitationStatus = z.enum([
  "pending",
  "accepted",
  "rejected",
  "canceled"
]).default("pending");
z.object({
  id: z.string().default(generateId),
  name: z.string(),
  slug: z.string(),
  logo: z.string().nullish().optional(),
  metadata: z.record(z.string(), z.unknown()).or(z.string().transform((v) => JSON.parse(v))).optional(),
  createdAt: z.date()
});
z.object({
  id: z.string().default(generateId),
  organizationId: z.string(),
  userId: z.coerce.string(),
  role: roleSchema,
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
z.object({
  id: z.string().default(generateId),
  organizationId: z.string(),
  email: z.string(),
  role: roleSchema,
  status: invitationStatus,
  teamId: z.string().nullish(),
  inviterId: z.string(),
  expiresAt: z.date(),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
z.object({
  id: z.string().default(generateId),
  name: z.string().min(1),
  organizationId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional()
});
z.object({
  id: z.string().default(generateId),
  teamId: z.string(),
  userId: z.string(),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date())
});
z.object({
  id: z.string().default(generateId),
  organizationId: z.string(),
  role: z.string(),
  permission: z.record(z.string(), z.array(z.string())),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date()),
  updatedAt: z.date().optional()
});
const defaultRoles = [
  "admin",
  "member",
  "owner"
];
z.union([z.enum(defaultRoles), z.array(z.enum(defaultRoles))]);
z.object({
  name: z.string().meta({ description: 'The name of the team. Eg: "my-team"' }),
  organizationId: z.string().meta({ description: 'The organization ID which the team will be created in. Defaults to the active organization. Eg: "organization-id"' }).optional()
});
z.object({
  teamId: z.string().meta({ description: `The team ID of the team to remove. Eg: "team-id"` }),
  organizationId: z.string().meta({ description: `The organization ID which the team falls under. If not provided, it will default to the user's active organization. Eg: "organization-id"` }).optional()
});
z.optional(z.object({ organizationId: z.string().meta({ description: `The organization ID which the teams are under to list. Defaults to the users active organization. Eg: "organization-id"` }).optional() }));
z.object({ teamId: z.string().meta({ description: "The team id to set as active. It can be null to unset the active team" }).nullable().optional() });
z.optional(z.object({ teamId: z.string().optional().meta({ description: "The team whose members we should return. If this is not provided the members of the current active team get returned." }) }));
z.object({
  teamId: z.string().meta({ description: "The team the user should be a member of." }),
  userId: z.coerce.string().meta({ description: "The user Id which represents the user to be added as a member." })
});
z.object({
  teamId: z.string().meta({ description: "The team the user should be removed from." }),
  userId: z.coerce.string().meta({ description: "The user which should be removed from the team." })
});
z.object({ organizationId: z.string().optional() }).and(z.union([z.object({
  permission: z.record(z.string(), z.array(z.string())),
  permissions: z.undefined()
}), z.object({
  permission: z.undefined(),
  permissions: z.record(z.string(), z.array(z.string()))
})]));
defineErrorCodes({
  INVALID_PHONE_NUMBER: "Invalid phone number",
  PHONE_NUMBER_EXIST: "Phone number already exists",
  PHONE_NUMBER_NOT_EXIST: "phone number isn't registered",
  INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password",
  UNEXPECTED_ERROR: "Unexpected error",
  OTP_NOT_FOUND: "OTP not found",
  OTP_EXPIRED: "OTP expired",
  INVALID_OTP: "Invalid OTP",
  PHONE_NUMBER_NOT_VERIFIED: "Phone number not verified",
  PHONE_NUMBER_CANNOT_BE_UPDATED: "Phone number cannot be updated",
  SEND_OTP_NOT_IMPLEMENTED: "sendOTP not implemented",
  TOO_MANY_ATTEMPTS: "Too many attempts"
});
z.object({
  phoneNumber: z.string().meta({ description: 'Phone number to sign in. Eg: "+1234567890"' }),
  password: z.string().meta({ description: "Password to use for sign in." }),
  rememberMe: z.boolean().meta({ description: "Remember the session. Eg: true" }).optional()
});
z.object({ phoneNumber: z.string().meta({ description: 'Phone number to send OTP. Eg: "+1234567890"' }) });
z.object({
  phoneNumber: z.string().meta({ description: 'Phone number to verify. Eg: "+1234567890"' }),
  code: z.string().meta({ description: 'OTP code. Eg: "123456"' }),
  disableSession: z.boolean().meta({ description: "Disable session creation after verification. Eg: false" }).optional(),
  updatePhoneNumber: z.boolean().meta({ description: "Check if there is a session and update the phone number. Eg: true" }).optional()
});
z.object({ phoneNumber: z.string() });
z.object({
  otp: z.string().meta({ description: 'The one time password to reset the password. Eg: "123456"' }),
  phoneNumber: z.string().meta({ description: 'The phone number to the account which intends to reset the password for. Eg: "+1234567890"' }),
  newPassword: z.string().meta({ description: `The new password. Eg: "new-and-secure-password"` })
});
z.object({
  walletAddress: z.string().regex(/^0[xX][a-fA-F0-9]{40}$/i).length(42),
  chainId: z.number().int().positive().max(2147483647).optional().default(1)
});
defineErrorCodes({
  OTP_NOT_ENABLED: "OTP not enabled",
  OTP_HAS_EXPIRED: "OTP has expired",
  TOTP_NOT_ENABLED: "TOTP not enabled",
  TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled",
  BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled",
  INVALID_BACKUP_CODE: "Invalid backup code",
  INVALID_CODE: "Invalid code",
  TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.",
  INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie"
});
z.object({
  code: z.string().meta({ description: `A backup code to verify. Eg: "123456"` }),
  disableSession: z.boolean().meta({ description: "If true, the session cookie will not be set." }).optional(),
  trustDevice: z.boolean().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }).optional()
});
z.object({ userId: z.coerce.string().meta({ description: `The user ID to view all backup codes. Eg: "user-id"` }) });
z.object({ password: z.string().meta({ description: "The users password." }) });
z.object({
  code: z.string().meta({ description: 'The otp code to verify. Eg: "012345"' }),
  trustDevice: z.boolean().optional().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" })
});
z.object({ trustDevice: z.boolean().optional().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }) }).optional();
z.object({ secret: z.string().meta({ description: "The secret to generate the TOTP code" }) });
z.object({ password: z.string().meta({ description: "User password" }) });
z.object({
  code: z.string().meta({ description: 'The otp code to verify. Eg: "012345"' }),
  trustDevice: z.boolean().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }).optional()
});
z.object({
  password: z.string().meta({ description: "User password" }),
  issuer: z.string().meta({ description: "Custom issuer for the TOTP URI" }).optional()
});
z.object({ password: z.string().meta({ description: "User password" }) });
defineErrorCodes({
  INVALID_USERNAME_OR_PASSWORD: "Invalid username or password",
  EMAIL_NOT_VERIFIED: "Email not verified",
  UNEXPECTED_ERROR: "Unexpected error",
  USERNAME_IS_ALREADY_TAKEN: "Username is already taken. Please try another.",
  USERNAME_TOO_SHORT: "Username is too short",
  USERNAME_TOO_LONG: "Username is too long",
  INVALID_USERNAME: "Username is invalid",
  INVALID_DISPLAY_USERNAME: "Display username is invalid"
});
z.object({
  username: z.string().meta({ description: "The username of the user" }),
  password: z.string().meta({ description: "The password of the user" }),
  rememberMe: z.boolean().meta({ description: "Remember the user session" }).optional(),
  callbackURL: z.string().meta({ description: "The URL to redirect to after email verification" }).optional()
});
z.object({ username: z.string().meta({ description: "The username to check" }) });
const auth = betterAuth({
  baseURL: env.VITE_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
  telemetry: {
    enabled: false
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification
    }
  }),
  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
    storage: "memory",
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5
      },
      "/sign-up/email": {
        window: 300,
        max: 3
      },
      "/get-session": {
        window: 10,
        max: 30
      }
    }
  },
  plugins: [
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"]
    }),
    tanstackStartCookies()
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => await hash(password, 10),
      verify: async ({ hash: hashedPassword, password }) => await compare(password, hashedPassword)
    }
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://mgccko8gcc8k0gos04wgkcow.37.27.62.87.sslip.io",
    "https://driivo.fr",
    "https://www.driivo.fr",
    "https://app.driivo.fr"
  ]
});
const Route$1 = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return await auth.handler(request);
      },
      POST: async ({ request }) => {
        return await auth.handler(request);
      }
    }
  }
});
const $$splitComponentImporter = () => import("./applications._id-DcP5bGAN.js");
const Route = createFileRoute("/admin/applications/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SimulateurRoute = Route$f.update({
  id: "/simulateur",
  path: "/simulateur",
  getParentRoute: () => Route$g
});
const ReunionRoute = Route$e.update({
  id: "/reunion",
  path: "/reunion",
  getParentRoute: () => Route$g
});
const ResultatsRoute = Route$d.update({
  id: "/resultats",
  path: "/resultats",
  getParentRoute: () => Route$g
});
const LoginRoute = Route$c.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$g
});
const InscriptionRoute = Route$b.update({
  id: "/inscription",
  path: "/inscription",
  getParentRoute: () => Route$g
});
const EspaceRoute = Route$a.update({
  id: "/espace",
  path: "/espace",
  getParentRoute: () => Route$g
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$g
});
const AdminIndexRoute = Route$8.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => Route$g
});
const InscriptionConfirmationRoute = Route$7.update({
  id: "/confirmation",
  path: "/confirmation",
  getParentRoute: () => InscriptionRoute
});
const ApiMeetingsRoute = Route$6.update({
  id: "/api/meetings",
  path: "/api/meetings",
  getParentRoute: () => Route$g
});
const ApiLeadsRoute = Route$5.update({
  id: "/api/leads",
  path: "/api/leads",
  getParentRoute: () => Route$g
});
const ApiHealthRoute = Route$4.update({
  id: "/api/health",
  path: "/api/health",
  getParentRoute: () => Route$g
});
const ApiApplicationsRoute = Route$3.update({
  id: "/api/applications",
  path: "/api/applications",
  getParentRoute: () => Route$g
});
const AdminLoginRoute = Route$2.update({
  id: "/admin/login",
  path: "/admin/login",
  getParentRoute: () => Route$g
});
const ApiAuthSplatRoute = Route$1.update({
  id: "/api/auth/$",
  path: "/api/auth/$",
  getParentRoute: () => Route$g
});
const AdminApplicationsIdRoute = Route.update({
  id: "/admin/applications/$id",
  path: "/admin/applications/$id",
  getParentRoute: () => Route$g
});
const InscriptionRouteChildren = {
  InscriptionConfirmationRoute
};
const InscriptionRouteWithChildren = InscriptionRoute._addFileChildren(
  InscriptionRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  EspaceRoute,
  InscriptionRoute: InscriptionRouteWithChildren,
  LoginRoute,
  ResultatsRoute,
  ReunionRoute,
  SimulateurRoute,
  AdminLoginRoute,
  ApiApplicationsRoute,
  ApiHealthRoute,
  ApiLeadsRoute,
  ApiMeetingsRoute,
  AdminIndexRoute,
  AdminApplicationsIdRoute,
  ApiAuthSplatRoute
};
const routeTree = Route$g._addFileChildren(rootRouteChildren)._addFileTypes();
function createRouter() {
  const router2 = createRouter$2({
    routeTree,
    scrollRestoration: true
  });
  return router2;
}
async function getRouter() {
  return createRouter();
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRouter,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$d as R,
  Route as a,
  getBaseURL as b,
  createKyselyAdapter as c,
  adminAc as d,
  getKyselyDatabaseType as g,
  hasPermission as h,
  router as r,
  userAc as u
};

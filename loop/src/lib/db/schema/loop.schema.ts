import { relations } from "drizzle-orm";
import { index, integer, jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./better-auth.schema";

// Lead source enum
export const leadSourceEnum = pgEnum("lead_source", [
  "SIMULATEUR",
  "HOMEPAGE",
  "REUNION",
  "REFERRAL",
  "OTHER",
]);

// Lead status enum
export const leadStatusEnum = pgEnum("lead_status", [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
]);

// Leads table for capturing simulator and other leads
export const lead = pgTable(
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
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("lead_email_idx").on(table.email),
    index("lead_status_idx").on(table.status),
    index("lead_source_idx").on(table.source),
    index("lead_createdAt_idx").on(table.createdAt),
  ],
);

// Meeting/Reunion bookings table
export const meetingBooking = pgTable(
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
    duration: integer("duration").default(15).notNull(), // in minutes
    
    // Status
    status: text("status").default("SCHEDULED").notNull(), // SCHEDULED, COMPLETED, CANCELLED, NO_SHOW
    
    // Notes
    notes: text("notes"),
    
    // Link to lead if exists
    leadId: text("leadId").references(() => lead.id),
    
    // Metadata
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("meeting_email_idx").on(table.email),
    index("meeting_scheduledDate_idx").on(table.scheduledDate),
    index("meeting_status_idx").on(table.status),
  ],
);

export const meetingBookingRelations = relations(meetingBooking, ({ one }) => ({
  lead: one(lead, {
    fields: [meetingBooking.leadId],
    references: [lead.id],
  }),
}));

export const applicationStatusEnum = pgEnum("application_status", [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
]);

export const application = pgTable(
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
    formData: jsonb("formData").$type<Record<string, unknown>>(),
    
    // Metadata
    submittedAt: timestamp("submittedAt"),
    reviewedAt: timestamp("reviewedAt"),
    reviewedBy: text("reviewedBy").references(() => user.id),
    notes: text("notes"),
    
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("application_status_idx").on(table.status),
    index("application_email_idx").on(table.email),
    index("application_createdAt_idx").on(table.createdAt),
  ],
);

export const applicationRelations = relations(application, ({ one }) => ({
  reviewer: one(user, {
    fields: [application.reviewedBy],
    references: [user.id],
  }),
}));


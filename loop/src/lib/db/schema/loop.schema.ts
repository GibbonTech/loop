import { relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./better-auth.schema";

// File entity type enum
export const fileEntityTypeEnum = pgEnum("file_entity_type", [
  "APPLICATION",
  "DOCUMENT",
  "OTHER",
]);

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

// ============================================
// STORED FILE (R2/S3 file metadata)
// ============================================

export const storedFile = pgTable(
  "StoredFile",
  {
    id: text("id").primaryKey(),
    key: text("key").notNull().unique(), // R2 object key: "applications/{id}/carte_vtc.pdf"
    originalName: text("originalName").notNull(),
    mimeType: text("mimeType").notNull(),
    size: integer("size").notNull(), // bytes
    entityType: fileEntityTypeEnum("entityType").notNull(),
    entityId: text("entityId").notNull(), // FK to application.id, etc.
    uploadedBy: text("uploadedBy"), // userId if authenticated upload, null for public
    documentCategory: text("documentCategory").default("OTHER").notNull(),
    reviewStatus: text("reviewStatus").default("UPLOADED").notNull(),
    reviewNotes: text("reviewNotes"),
    reviewedAt: timestamp("reviewedAt"),
    reviewedBy: text("reviewedBy").references(() => user.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("storedFile_entityType_idx").on(table.entityType),
    index("storedFile_entityId_idx").on(table.entityId),
    index("storedFile_key_idx").on(table.key),
    index("storedFile_documentCategory_idx").on(table.documentCategory),
    index("storedFile_reviewStatus_idx").on(table.reviewStatus),
  ],
);

// ============================================
// MANUAL OPS DEMO LAYER
// Tracks post-approval client operations without pretending to automate payroll.
// ============================================

export const driverProfile = pgTable(
  "DriverProfile",
  {
    id: text("id").primaryKey(),
    applicationId: text("applicationId")
      .notNull()
      .references(() => application.id),
    userEmail: text("userEmail").notNull(),
    status: text("status").default("PENDING_CONTRACT").notNull(), // PENDING_CONTRACT, CONTRACT_SENT, SIGNED, ACTIVE, PAUSED, OFFBOARDED
    startDate: text("startDate"),
    assignedAccountantId: text("assignedAccountantId").references(() => user.id),
    notes: text("notes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("driverProfile_applicationId_idx").on(table.applicationId),
    index("driverProfile_userEmail_idx").on(table.userEmail),
    index("driverProfile_status_idx").on(table.status),
  ],
);

export const contractRecord = pgTable(
  "ContractRecord",
  {
    id: text("id").primaryKey(),
    driverProfileId: text("driverProfileId")
      .notNull()
      .references(() => driverProfile.id),
    status: text("status").default("DRAFT").notNull(), // DRAFT, SENT, SIGNED, COUNTERSIGNED
    providerLabel: text("providerLabel").default("Manual").notNull(),
    unsignedFileId: text("unsignedFileId").references(() => storedFile.id),
    signedFileId: text("signedFileId").references(() => storedFile.id),
    sentAt: timestamp("sentAt"),
    signedAt: timestamp("signedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("contractRecord_driverProfileId_idx").on(table.driverProfileId),
    index("contractRecord_status_idx").on(table.status),
  ],
);

export const onboardingTask = pgTable(
  "OnboardingTask",
  {
    id: text("id").primaryKey(),
    driverProfileId: text("driverProfileId")
      .notNull()
      .references(() => driverProfile.id),
    taskKey: text("taskKey").notNull(),
    label: text("label").notNull(),
    status: text("status").default("PENDING").notNull(), // PENDING, DONE, BLOCKED
    completedAt: timestamp("completedAt"),
    completedBy: text("completedBy").references(() => user.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("onboardingTask_driverProfileId_idx").on(table.driverProfileId),
    index("onboardingTask_taskKey_idx").on(table.taskKey),
  ],
);

export const monthlyActivity = pgTable(
  "MonthlyActivity",
  {
    id: text("id").primaryKey(),
    driverProfileId: text("driverProfileId")
      .notNull()
      .references(() => driverProfile.id),
    period: text("period").notNull(), // YYYY-MM
    status: text("status").default("OPEN").notNull(), // OPEN, SUBMITTED, UNDER_REVIEW, VALIDATED, CLOSED
    declaredRevenue: integer("declaredRevenue").default(0).notNull(),
    platformBreakdown: jsonb("platformBreakdown").$type<Record<string, number>>(),
    notes: text("notes"),
    submittedAt: timestamp("submittedAt"),
    validatedAt: timestamp("validatedAt"),
    validatedBy: text("validatedBy").references(() => user.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("monthlyActivity_driverProfileId_idx").on(table.driverProfileId),
    index("monthlyActivity_period_idx").on(table.period),
    index("monthlyActivity_status_idx").on(table.status),
  ],
);

export const invoiceRecord = pgTable(
  "InvoiceRecord",
  {
    id: text("id").primaryKey(),
    driverProfileId: text("driverProfileId")
      .notNull()
      .references(() => driverProfile.id),
    monthlyActivityId: text("monthlyActivityId").references(
      () => monthlyActivity.id,
    ),
    invoiceNumber: text("invoiceNumber").notNull(),
    recipient: text("recipient").default("Plateformes VTC").notNull(),
    amountHT: integer("amountHT").default(0).notNull(),
    vatAmount: integer("vatAmount").default(0).notNull(),
    amountTTC: integer("amountTTC").default(0).notNull(),
    status: text("status").default("DRAFT").notNull(), // DRAFT, SENT, PAID, OVERDUE, CANCELLED
    fileId: text("fileId").references(() => storedFile.id),
    issuedAt: timestamp("issuedAt"),
    paidAt: timestamp("paidAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("invoiceRecord_driverProfileId_idx").on(table.driverProfileId),
    index("invoiceRecord_monthlyActivityId_idx").on(table.monthlyActivityId),
    index("invoiceRecord_status_idx").on(table.status),
  ],
);

export const paymentRecord = pgTable(
  "PaymentRecord",
  {
    id: text("id").primaryKey(),
    invoiceId: text("invoiceId")
      .notNull()
      .references(() => invoiceRecord.id),
    amount: integer("amount").default(0).notNull(),
    status: text("status").default("EXPECTED").notNull(), // EXPECTED, RECEIVED, RECONCILED
    receivedAt: timestamp("receivedAt"),
    reference: text("reference"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("paymentRecord_invoiceId_idx").on(table.invoiceId),
    index("paymentRecord_status_idx").on(table.status),
  ],
);

export const expenseRecord = pgTable(
  "ExpenseRecord",
  {
    id: text("id").primaryKey(),
    driverProfileId: text("driverProfileId")
      .notNull()
      .references(() => driverProfile.id),
    monthlyActivityId: text("monthlyActivityId").references(
      () => monthlyActivity.id,
    ),
    category: text("category").notNull(),
    amount: integer("amount").default(0).notNull(),
    description: text("description"),
    receiptFileId: text("receiptFileId").references(() => storedFile.id),
    status: text("status").default("SUBMITTED").notNull(), // SUBMITTED, APPROVED, REJECTED, REIMBURSED
    reviewNotes: text("reviewNotes"),
    reviewedAt: timestamp("reviewedAt"),
    reviewedBy: text("reviewedBy").references(() => user.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("expenseRecord_driverProfileId_idx").on(table.driverProfileId),
    index("expenseRecord_monthlyActivityId_idx").on(table.monthlyActivityId),
    index("expenseRecord_status_idx").on(table.status),
  ],
);

export const payrollSummary = pgTable(
  "PayrollSummary",
  {
    id: text("id").primaryKey(),
    driverProfileId: text("driverProfileId")
      .notNull()
      .references(() => driverProfile.id),
    monthlyActivityId: text("monthlyActivityId").references(
      () => monthlyActivity.id,
    ),
    period: text("period").notNull(),
    grossSalary: integer("grossSalary").default(0).notNull(),
    netSalary: integer("netSalary").default(0).notNull(),
    managementFee: integer("managementFee").default(0).notNull(),
    socialContributions: integer("socialContributions").default(0).notNull(),
    expensesReimbursed: integer("expensesReimbursed").default(0).notNull(),
    payoutAmount: integer("payoutAmount").default(0).notNull(),
    status: text("status").default("PREPARING").notNull(), // PREPARING, READY, PAID
    payslipFileId: text("payslipFileId").references(() => storedFile.id),
    paidAt: timestamp("paidAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("payrollSummary_driverProfileId_idx").on(table.driverProfileId),
    index("payrollSummary_period_idx").on(table.period),
    index("payrollSummary_status_idx").on(table.status),
  ],
);

export const timelineEvent = pgTable(
  "TimelineEvent",
  {
    id: text("id").primaryKey(),
    actorId: text("actorId").references(() => user.id),
    driverProfileId: text("driverProfileId").references(() => driverProfile.id),
    applicationId: text("applicationId").references(() => application.id),
    eventType: text("eventType").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("timelineEvent_driverProfileId_idx").on(table.driverProfileId),
    index("timelineEvent_applicationId_idx").on(table.applicationId),
    index("timelineEvent_eventType_idx").on(table.eventType),
  ],
);

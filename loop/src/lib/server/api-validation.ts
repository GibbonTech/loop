import { z } from "zod";
import {
  documentCategoryValues,
  documentReviewStatuses,
} from "~/lib/documents";

export const applicationStatuses = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
] as const;

export const leadStatuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
] as const;

export const meetingStatuses = [
  "SCHEDULED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
] as const;

export const meetingSlots = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

const leadSources = [
  "SIMULATEUR",
  "HOMEPAGE",
  "REUNION",
  "REFERRAL",
  "OTHER",
] as const;

const optionalString = (max = 255) =>
  z.union([z.string(), z.null(), z.undefined()]).transform((value) => {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed ? trimmed.slice(0, max) : null;
  });

const patchString = (max = 5000) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) =>
      typeof value === "string" ? value.trim().slice(0, max) : undefined,
    );

const requiredString = (max = 255) => z.string().trim().min(1).max(max);

const email = z
  .string()
  .trim()
  .email()
  .max(255)
  .transform((value) => value.toLowerCase());

const phone = requiredString(40);

const monthlyRevenueNumber = z
  .union([z.string(), z.number(), z.null(), z.undefined()])
  .transform((value) => {
    if (typeof value === "number") {
      return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
    }
    if (typeof value !== "string") return 0;
    const parsed = Number(value.replace(/[^\d]/g, ""));
    return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : 0;
  });

const platformList = z
  .union([z.array(z.string()), z.string()])
  .transform((value) =>
    Array.isArray(value)
      ? value.map((item) => item.trim()).filter(Boolean)
      : value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
  )
  .refine((value) => value.length > 0, "Au moins une plateforme est requise");

function normalizeLeadSource(value: unknown) {
  if (typeof value !== "string") return "SIMULATEUR";
  const source = value.trim().toUpperCase();
  if (source === "LANDING") return "HOMEPAGE";
  return leadSources.includes(source as (typeof leadSources)[number])
    ? (source as (typeof leadSources)[number])
    : "OTHER";
}

export const publicLeadSchema = z.object({
  firstName: requiredString(80),
  email,
  phone: optionalString(40),
  monthlyRevenue: monthlyRevenueNumber,
  source: z.unknown().transform(normalizeLeadSource),
  utmSource: optionalString(120),
  utmMedium: optionalString(120),
  utmCampaign: optionalString(160),
});

export const applicationCreateSchema = z.object({
  firstName: requiredString(80),
  lastName: requiredString(80),
  email,
  phone,
  city: optionalString(120),
  vtcCardNumber: optionalString(120),
  activityType: optionalString(60).transform((value) => value ?? "VTC"),
  isAlone: optionalString(40),
  hasVtcLicense: requiredString(40),
  yearsExperience: requiredString(80),
  currentPlatforms: platformList,
  hasVehicle: requiredString(40),
  vehicleType: optionalString(160),
  monthlyRevenue: optionalString(80),
  expectedStartDate: optionalString(80),
  consentAccepted: z.boolean().optional().default(false),
  consentAcceptedAt: optionalString(80),
});

export const adminApplicationPatchSchema = z
  .object({
    id: requiredString(80),
    status: z.enum(applicationStatuses).optional(),
    notes: patchString(5000),
  })
  .refine(
    (value) => value.status !== undefined || value.notes !== undefined,
    "status ou notes requis",
  );

export const meetingCreateSchema = z
  .object({
    name: optionalString(120),
    firstName: optionalString(80),
    lastName: optionalString(80),
    email,
    phone,
    date: optionalString(80),
    scheduledDate: optionalString(80),
    time: optionalString(20),
    timeSlot: optionalString(20),
    duration: z.number().int().min(15).max(60).optional().default(15),
    leadId: optionalString(80),
  })
  .transform((value) => {
    const firstName = value.firstName ?? value.name ?? "";
    const scheduledDate = value.scheduledDate ?? value.date ?? "";
    const timeSlot = value.timeSlot ?? value.time ?? "";
    return {
      ...value,
      firstName,
      scheduledDate,
      timeSlot,
    };
  })
  .refine((value) => value.firstName.length > 0, "Le nom est requis")
  .refine((value) => value.scheduledDate.length > 0, "La date est requise")
  .refine(
    (value) =>
      meetingSlots.includes(value.timeSlot as (typeof meetingSlots)[number]),
    "Créneau invalide",
  );

export const adminMeetingPatchSchema = z.object({
  id: requiredString(80),
  status: z.enum(meetingStatuses),
  notes: patchString(2000),
});

export const adminLeadPatchSchema = z.object({
  id: requiredString(80),
  status: z.enum(leadStatuses),
  notes: patchString(2000),
});

export const documentCategorySchema = z.enum(documentCategoryValues);

export const fileReviewPatchSchema = z.object({
  fileId: requiredString(120),
  reviewStatus: z.enum(documentReviewStatuses),
  reviewNotes: patchString(2000),
});

export const documentRequestSchema = z.object({
  applicationId: requiredString(120),
  categories: z.array(documentCategorySchema).min(1).max(10),
  message: patchString(2000),
});

export function dateKeyFromInput(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

export function utcDayRange(dateKey: string) {
  return {
    start: new Date(`${dateKey}T00:00:00.000Z`),
    end: new Date(`${dateKey}T23:59:59.999Z`),
  };
}

export function isBookableDate(dateKey: string) {
  const parsed = new Date(`${dateKey}T12:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) return false;
  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const max = new Date(today);
  max.setUTCDate(max.getUTCDate() + 90);
  const day = parsed.getUTCDay();
  return parsed >= today && parsed <= max && day !== 0 && day !== 6;
}

import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import { and, asc, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/lib/db";
import {
  application,
  contractRecord,
  driverProfile,
  expenseRecord,
  invoiceRecord,
  monthlyActivity,
  onboardingTask,
  paymentRecord,
  payrollSummary,
  storedFile,
  timelineEvent,
} from "~/lib/db/schema";
import {
  type AuthContext,
  requireAdmin,
  requireAuth,
  validationError,
} from "~/lib/server/api-guards";

const periodSchema = z.string().regex(/^\d{4}-\d{2}$/);

const operationActionSchema = z.object({
  action: z.string().min(1),
  applicationId: z.string().optional(),
  profileId: z.string().optional(),
  taskId: z.string().optional(),
  taskKey: z.string().optional(),
  contractId: z.string().optional(),
  monthlyActivityId: z.string().optional(),
  invoiceId: z.string().optional(),
  paymentId: z.string().optional(),
  expenseId: z.string().optional(),
  payrollId: z.string().optional(),
  status: z.string().optional(),
  period: periodSchema.optional(),
  notes: z.string().optional(),
  providerLabel: z.string().optional(),
  unsignedFileId: z.string().optional(),
  signedFileId: z.string().optional(),
  fileId: z.string().optional(),
  payslipFileId: z.string().optional(),
  receiptFileId: z.string().optional(),
  invoiceNumber: z.string().optional(),
  recipient: z.string().optional(),
  reference: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  reviewNotes: z.string().optional(),
  declaredRevenue: z.union([z.string(), z.number()]).optional(),
  amount: z.union([z.string(), z.number()]).optional(),
  amountHT: z.union([z.string(), z.number()]).optional(),
  vatAmount: z.union([z.string(), z.number()]).optional(),
  amountTTC: z.union([z.string(), z.number()]).optional(),
  grossSalary: z.union([z.string(), z.number()]).optional(),
  netSalary: z.union([z.string(), z.number()]).optional(),
  managementFee: z.union([z.string(), z.number()]).optional(),
  socialContributions: z.union([z.string(), z.number()]).optional(),
  expensesReimbursed: z.union([z.string(), z.number()]).optional(),
  payoutAmount: z.union([z.string(), z.number()]).optional(),
  platformBreakdown: z
    .record(z.string(), z.union([z.string(), z.number()]))
    .optional(),
});

const defaultOnboardingTasks = [
  { taskKey: "application_approved", label: "Candidature approuvée" },
  { taskKey: "documents_validated", label: "Documents principaux validés" },
  { taskKey: "contract_sent", label: "Contrat envoyé" },
  { taskKey: "contract_signed", label: "Contrat signé" },
  { taskKey: "bank_ready", label: "RIB et paiement prêts" },
  { taskKey: "accountant_assigned", label: "Comptable assigné" },
  { taskKey: "first_month_opened", label: "Premier mois d'activité ouvert" },
];

function parseAmount(value: unknown) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
  }
  if (typeof value !== "string") return 0;
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : 0;
}

function normalizeBreakdown(
  value?: Record<string, string | number>,
): Record<string, number> {
  if (!value) return {};
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, amount]) => [key.trim(), parseAmount(amount)] as const)
      .filter(([key, amount]) => key && amount > 0),
  );
}

function publicProfileFields(row: typeof driverProfile.$inferSelect) {
  return row;
}

async function addTimelineEvent(input: {
  actorId?: string;
  driverProfileId?: string | null;
  applicationId?: string | null;
  eventType: string;
  title: string;
  description?: string | null;
  metadata?: Record<string, unknown>;
}) {
  await db.insert(timelineEvent).values({
    id: nanoid(),
    actorId: input.actorId,
    driverProfileId: input.driverProfileId ?? null,
    applicationId: input.applicationId ?? null,
    eventType: input.eventType,
    title: input.title,
    description: input.description,
    metadata: input.metadata,
  });
}

async function getProfileForAccess(
  authContext: AuthContext,
  input: { profileId?: string | null; applicationId?: string | null },
) {
  const profileRows = input.profileId
    ? await db
        .select()
        .from(driverProfile)
        .where(eq(driverProfile.id, input.profileId))
        .limit(1)
    : input.applicationId
      ? await db
          .select()
          .from(driverProfile)
          .where(eq(driverProfile.applicationId, input.applicationId))
          .limit(1)
      : await db
          .select()
          .from(driverProfile)
          .where(eq(driverProfile.userEmail, authContext.user.email))
          .orderBy(desc(driverProfile.createdAt))
          .limit(1);

  const profile = profileRows[0];
  if (!profile) return null;
  if (!authContext.isAdmin && profile.userEmail !== authContext.user.email) {
    return "FORBIDDEN" as const;
  }
  return profile;
}

async function getOperationsBundle(profile: typeof driverProfile.$inferSelect) {
  const [
    appRows,
    contractRows,
    taskRows,
    activityRows,
    invoiceRows,
    expenseRows,
    payrollRows,
    timelineRows,
    profileFiles,
    appFiles,
  ] = await Promise.all([
    db
      .select()
      .from(application)
      .where(eq(application.id, profile.applicationId))
      .limit(1),
    db
      .select()
      .from(contractRecord)
      .where(eq(contractRecord.driverProfileId, profile.id))
      .orderBy(desc(contractRecord.createdAt)),
    db
      .select()
      .from(onboardingTask)
      .where(eq(onboardingTask.driverProfileId, profile.id))
      .orderBy(asc(onboardingTask.createdAt)),
    db
      .select()
      .from(monthlyActivity)
      .where(eq(monthlyActivity.driverProfileId, profile.id))
      .orderBy(desc(monthlyActivity.period)),
    db
      .select()
      .from(invoiceRecord)
      .where(eq(invoiceRecord.driverProfileId, profile.id))
      .orderBy(desc(invoiceRecord.createdAt)),
    db
      .select()
      .from(expenseRecord)
      .where(eq(expenseRecord.driverProfileId, profile.id))
      .orderBy(desc(expenseRecord.createdAt)),
    db
      .select()
      .from(payrollSummary)
      .where(eq(payrollSummary.driverProfileId, profile.id))
      .orderBy(desc(payrollSummary.period)),
    db
      .select()
      .from(timelineEvent)
      .where(eq(timelineEvent.driverProfileId, profile.id))
      .orderBy(desc(timelineEvent.createdAt)),
    db.select().from(storedFile).where(eq(storedFile.entityId, profile.id)),
    db
      .select()
      .from(storedFile)
      .where(eq(storedFile.entityId, profile.applicationId)),
  ]);

  const invoiceIds = invoiceRows.map((invoice) => invoice.id);
  const paymentRows = invoiceIds.length
    ? (
        await Promise.all(
          invoiceIds.map((invoiceId) =>
            db
              .select()
              .from(paymentRecord)
              .where(eq(paymentRecord.invoiceId, invoiceId))
              .orderBy(desc(paymentRecord.createdAt)),
          ),
        )
      ).flat()
    : [];

  const filesById = Object.fromEntries(
    [...profileFiles, ...appFiles].map((file) => [file.id, file]),
  );

  return {
    profile: publicProfileFields(profile),
    application: appRows[0] ?? null,
    contract: contractRows[0] ?? null,
    onboardingTasks: taskRows,
    monthlyActivities: activityRows,
    invoices: invoiceRows,
    payments: paymentRows,
    expenses: expenseRows,
    payrollSummaries: payrollRows,
    timeline: timelineRows,
    filesById,
  };
}

async function getClientSummaries() {
  const [
    profileRows,
    appRows,
    contractRows,
    activityRows,
    invoiceRows,
    paymentRows,
    expenseRows,
    payrollRows,
    taskRows,
    timelineRows,
  ] = await Promise.all([
    db.select().from(driverProfile).orderBy(desc(driverProfile.createdAt)),
    db.select().from(application),
    db.select().from(contractRecord),
    db.select().from(monthlyActivity),
    db.select().from(invoiceRecord),
    db.select().from(paymentRecord),
    db.select().from(expenseRecord),
    db.select().from(payrollSummary),
    db.select().from(onboardingTask),
    db.select().from(timelineEvent).orderBy(desc(timelineEvent.createdAt)),
  ]);

  return profileRows.map((profile) => {
    const app = appRows.find((item) => item.id === profile.applicationId);
    const profileContracts = contractRows
      .filter((item) => item.driverProfileId === profile.id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const profileActivities = activityRows
      .filter((item) => item.driverProfileId === profile.id)
      .sort((a, b) => b.period.localeCompare(a.period));
    const profileInvoices = invoiceRows.filter(
      (item) => item.driverProfileId === profile.id,
    );
    const invoiceIds = new Set(profileInvoices.map((invoice) => invoice.id));
    const profilePayments = paymentRows.filter((payment) =>
      invoiceIds.has(payment.invoiceId),
    );
    const profileExpenses = expenseRows.filter(
      (item) => item.driverProfileId === profile.id,
    );
    const profilePayrolls = payrollRows
      .filter((item) => item.driverProfileId === profile.id)
      .sort((a, b) => b.period.localeCompare(a.period));
    const profileTasks = taskRows.filter(
      (item) => item.driverProfileId === profile.id,
    );
    const lastEvent = timelineRows.find(
      (item) => item.driverProfileId === profile.id,
    );

    const invoiceTotal = profileInvoices.reduce(
      (sum, invoice) => sum + invoice.amountTTC,
      0,
    );
    const paidTotal = profilePayments
      .filter(
        (payment) =>
          payment.status === "RECEIVED" || payment.status === "RECONCILED",
      )
      .reduce((sum, payment) => sum + payment.amount, 0);

    return {
      profileId: profile.id,
      applicationId: profile.applicationId,
      name:
        app?.firstName || app?.lastName
          ? `${app?.firstName || ""} ${app?.lastName || ""}`.trim()
          : profile.userEmail,
      email: profile.userEmail,
      phone: app?.phone ?? null,
      status: profile.status,
      startDate: profile.startDate,
      contractStatus: profileContracts[0]?.status ?? "DRAFT",
      latestActivity: profileActivities[0]
        ? {
            period: profileActivities[0].period,
            status: profileActivities[0].status,
            declaredRevenue: profileActivities[0].declaredRevenue,
          }
        : null,
      latestPayroll: profilePayrolls[0]
        ? {
            period: profilePayrolls[0].period,
            status: profilePayrolls[0].status,
            payoutAmount: profilePayrolls[0].payoutAmount,
          }
        : null,
      invoiceTotal,
      paidTotal,
      unpaidInvoices: profileInvoices.filter(
        (invoice) => invoice.status !== "PAID",
      ).length,
      pendingExpenses: profileExpenses.filter(
        (expense) => expense.status === "SUBMITTED",
      ).length,
      pendingTasks: profileTasks.filter((task) => task.status !== "DONE")
        .length,
      lastEventTitle: lastEvent?.title ?? null,
      lastEventAt: lastEvent?.createdAt ?? null,
      createdAt: profile.createdAt,
    };
  });
}

async function setTaskDone(
  profileId: string,
  taskKey: string,
  authContext: AuthContext,
) {
  const [task] = await db
    .select()
    .from(onboardingTask)
    .where(
      and(
        eq(onboardingTask.driverProfileId, profileId),
        eq(onboardingTask.taskKey, taskKey),
      ),
    )
    .limit(1);

  if (!task || task.status === "DONE") return;

  await db
    .update(onboardingTask)
    .set({
      status: "DONE",
      completedAt: new Date(),
      completedBy: authContext.user.id,
    })
    .where(eq(onboardingTask.id, task.id));
}

async function findOrCreateMonthlyActivity(input: {
  authContext: AuthContext;
  profile: typeof driverProfile.$inferSelect;
  period: string;
  declaredRevenue?: number;
  platformBreakdown?: Record<string, number>;
  notes?: string;
  status?: string;
}) {
  const [existing] = await db
    .select()
    .from(monthlyActivity)
    .where(
      and(
        eq(monthlyActivity.driverProfileId, input.profile.id),
        eq(monthlyActivity.period, input.period),
      ),
    )
    .limit(1);

  const status =
    input.status ?? (input.authContext.isAdmin ? "OPEN" : "SUBMITTED");
  const updateData = {
    status,
    declaredRevenue: input.declaredRevenue ?? existing?.declaredRevenue ?? 0,
    platformBreakdown:
      input.platformBreakdown ?? existing?.platformBreakdown ?? {},
    notes: input.notes ?? existing?.notes ?? null,
    submittedAt:
      status === "SUBMITTED" || status === "UNDER_REVIEW"
        ? (existing?.submittedAt ?? new Date())
        : (existing?.submittedAt ?? null),
    validatedAt:
      status === "VALIDATED" || status === "CLOSED"
        ? (existing?.validatedAt ?? new Date())
        : (existing?.validatedAt ?? null),
    validatedBy:
      status === "VALIDATED" || status === "CLOSED"
        ? input.authContext.user.id
        : (existing?.validatedBy ?? null),
  };

  const [activity] = existing
    ? await db
        .update(monthlyActivity)
        .set(updateData)
        .where(eq(monthlyActivity.id, existing.id))
        .returning()
    : await db
        .insert(monthlyActivity)
        .values({
          id: nanoid(),
          driverProfileId: input.profile.id,
          period: input.period,
          ...updateData,
        })
        .returning();

  await setTaskDone(input.profile.id, "first_month_opened", input.authContext);

  await addTimelineEvent({
    actorId: input.authContext.user.id,
    driverProfileId: input.profile.id,
    applicationId: input.profile.applicationId,
    eventType: input.authContext.isAdmin
      ? "monthly_activity_updated"
      : "monthly_activity_submitted",
    title: input.authContext.isAdmin
      ? `Mois ${input.period} mis à jour`
      : `Déclaration ${input.period} envoyée`,
    description: `${updateData.declaredRevenue.toLocaleString("fr-FR")} EUR déclarés`,
  });

  return activity;
}

async function exportAccountingCsv(period: string) {
  const [profiles, activities, invoices, payrolls] = await Promise.all([
    db.select().from(driverProfile).orderBy(asc(driverProfile.userEmail)),
    db
      .select()
      .from(monthlyActivity)
      .where(eq(monthlyActivity.period, period))
      .orderBy(asc(monthlyActivity.period)),
    db.select().from(invoiceRecord),
    db.select().from(payrollSummary).where(eq(payrollSummary.period, period)),
  ]);

  const rows = profiles.map((profile) => {
    const activity = activities.find(
      (item) => item.driverProfileId === profile.id,
    );
    const profileInvoices = invoices.filter(
      (invoice) => invoice.driverProfileId === profile.id,
    );
    const payroll = payrolls.find(
      (item) => item.driverProfileId === profile.id,
    );
    const invoiceTotal = profileInvoices.reduce(
      (sum, invoice) => sum + invoice.amountTTC,
      0,
    );
    const paidTotal = profileInvoices
      .filter((invoice) => invoice.status === "PAID")
      .reduce((sum, invoice) => sum + invoice.amountTTC, 0);

    return [
      period,
      profile.userEmail,
      profile.status,
      activity?.status ?? "NO_ACTIVITY",
      activity?.declaredRevenue ?? 0,
      invoiceTotal,
      paidTotal,
      payroll?.netSalary ?? 0,
      payroll?.payoutAmount ?? 0,
      payroll?.status ?? "NO_PAYROLL",
    ];
  });

  const header = [
    "period",
    "driver_email",
    "profile_status",
    "activity_status",
    "declared_revenue",
    "invoice_total_ttc",
    "paid_total_ttc",
    "net_salary",
    "payout_amount",
    "payroll_status",
  ];

  const csv = [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="driivo-accounting-${period}.csv"`,
    },
  });
}

export const Route = createFileRoute("/api/operations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const exportMode = url.searchParams.get("export");

          if (exportMode === "accounting") {
            const authContext = await requireAdmin(request);
            if (authContext instanceof Response) return authContext;
            const period =
              url.searchParams.get("period") ??
              new Date().toISOString().slice(0, 7);
            if (!periodSchema.safeParse(period).success) {
              return validationError("Période invalide");
            }
            return exportAccountingCsv(period);
          }

          if (url.searchParams.get("mode") === "clients") {
            const authContext = await requireAdmin(request);
            if (authContext instanceof Response) return authContext;
            return json({ success: true, data: await getClientSummaries() });
          }

          const authContext = await requireAuth(request);
          if (authContext instanceof Response) return authContext;

          const profile = await getProfileForAccess(authContext, {
            profileId: url.searchParams.get("profileId"),
            applicationId: url.searchParams.get("applicationId"),
          });

          if (profile === "FORBIDDEN") {
            return json(
              { success: false, error: "Unauthorized" },
              { status: 403 },
            );
          }

          if (!profile) {
            return json({ success: true, data: null });
          }

          return json({
            success: true,
            data: await getOperationsBundle(profile),
          });
        } catch (error) {
          console.error("[Operations] GET error:", error);
          return json(
            { success: false, error: "Failed to fetch operations" },
            { status: 500 },
          );
        }
      },

      POST: async ({ request }) => {
        try {
          const authContext = await requireAuth(request);
          if (authContext instanceof Response) return authContext;

          const parsed = operationActionSchema.safeParse(await request.json());
          if (!parsed.success) {
            return validationError(parsed.error.issues[0]?.message);
          }
          const body = parsed.data;

          if (body.action === "activateProfile") {
            const adminContext = await requireAdmin(request);
            if (adminContext instanceof Response) return adminContext;
            if (!body.applicationId)
              return validationError("applicationId requis");

            const [app] = await db
              .select()
              .from(application)
              .where(eq(application.id, body.applicationId))
              .limit(1);
            if (!app?.email) {
              return json(
                { success: false, error: "Candidature introuvable" },
                { status: 404 },
              );
            }

            const [existing] = await db
              .select()
              .from(driverProfile)
              .where(eq(driverProfile.applicationId, app.id))
              .limit(1);

            const [profile] = existing
              ? [existing]
              : await db
                  .insert(driverProfile)
                  .values({
                    id: nanoid(),
                    applicationId: app.id,
                    userEmail: app.email,
                    status: "PENDING_CONTRACT",
                    startDate: new Date().toISOString().slice(0, 10),
                    assignedAccountantId: adminContext.user.id,
                    notes: "Dossier activé en mode opérations manuelles.",
                  })
                  .returning();

            if (!existing) {
              await db.insert(contractRecord).values({
                id: nanoid(),
                driverProfileId: profile.id,
                status: "DRAFT",
                providerLabel: "Manual",
              });

              await db.insert(onboardingTask).values(
                defaultOnboardingTasks.map((task) => ({
                  id: nanoid(),
                  driverProfileId: profile.id,
                  taskKey: task.taskKey,
                  label: task.label,
                  status:
                    task.taskKey === "application_approved" ||
                    task.taskKey === "accountant_assigned"
                      ? "DONE"
                      : "PENDING",
                  completedAt:
                    task.taskKey === "application_approved" ||
                    task.taskKey === "accountant_assigned"
                      ? new Date()
                      : null,
                  completedBy:
                    task.taskKey === "application_approved" ||
                    task.taskKey === "accountant_assigned"
                      ? adminContext.user.id
                      : null,
                })),
              );

              await addTimelineEvent({
                actorId: adminContext.user.id,
                driverProfileId: profile.id,
                applicationId: app.id,
                eventType: "profile_activated",
                title: "Dossier client activé",
                description:
                  "Le candidat approuvé est passé dans le suivi opérations manuelles.",
              });
            }

            return json({
              success: true,
              data: await getOperationsBundle(profile),
            });
          }

          const profile = await getProfileForAccess(authContext, {
            profileId: body.profileId,
            applicationId: body.applicationId,
          });

          if (profile === "FORBIDDEN") {
            return json(
              { success: false, error: "Unauthorized" },
              { status: 403 },
            );
          }
          if (!profile) {
            return json(
              { success: false, error: "Profil client introuvable" },
              { status: 404 },
            );
          }

          if (body.action === "updateTask") {
            const adminContext = await requireAdmin(request);
            if (adminContext instanceof Response) return adminContext;
            if (!body.taskId && !body.taskKey) {
              return validationError("taskId ou taskKey requis");
            }
            const status = body.status ?? "DONE";
            const query = body.taskId
              ? eq(onboardingTask.id, body.taskId)
              : and(
                  eq(onboardingTask.driverProfileId, profile.id),
                  eq(onboardingTask.taskKey, body.taskKey!),
                );
            await db
              .update(onboardingTask)
              .set({
                status,
                completedAt: status === "DONE" ? new Date() : null,
                completedBy: status === "DONE" ? adminContext.user.id : null,
              })
              .where(query);
            await addTimelineEvent({
              actorId: adminContext.user.id,
              driverProfileId: profile.id,
              applicationId: profile.applicationId,
              eventType: "onboarding_task_updated",
              title: "Checklist mise à jour",
              description: body.taskKey ?? body.taskId,
            });
          }

          if (body.action === "updateProfileStatus") {
            const adminContext = await requireAdmin(request);
            if (adminContext instanceof Response) return adminContext;
            const status = body.status ?? profile.status;
            await db
              .update(driverProfile)
              .set({ status, notes: body.notes ?? profile.notes })
              .where(eq(driverProfile.id, profile.id));
            await addTimelineEvent({
              actorId: adminContext.user.id,
              driverProfileId: profile.id,
              applicationId: profile.applicationId,
              eventType: "profile_status_updated",
              title: `Statut client: ${status}`,
              description: body.notes,
            });
          }

          if (body.action === "updateContract") {
            const adminContext = await requireAdmin(request);
            if (adminContext instanceof Response) return adminContext;
            const [existing] = await db
              .select()
              .from(contractRecord)
              .where(eq(contractRecord.driverProfileId, profile.id))
              .orderBy(desc(contractRecord.createdAt))
              .limit(1);
            const status = body.status ?? existing?.status ?? "DRAFT";
            const data = {
              status,
              providerLabel:
                body.providerLabel ?? existing?.providerLabel ?? "Manual",
              unsignedFileId:
                body.unsignedFileId ?? existing?.unsignedFileId ?? null,
              signedFileId: body.signedFileId ?? existing?.signedFileId ?? null,
              sentAt:
                status === "SENT" ||
                status === "SIGNED" ||
                status === "COUNTERSIGNED"
                  ? (existing?.sentAt ?? new Date())
                  : (existing?.sentAt ?? null),
              signedAt:
                status === "SIGNED" || status === "COUNTERSIGNED"
                  ? (existing?.signedAt ?? new Date())
                  : (existing?.signedAt ?? null),
            };
            const [contract] = existing
              ? await db
                  .update(contractRecord)
                  .set(data)
                  .where(eq(contractRecord.id, existing.id))
                  .returning()
              : await db
                  .insert(contractRecord)
                  .values({
                    id: nanoid(),
                    driverProfileId: profile.id,
                    ...data,
                  })
                  .returning();

            if (data.sentAt) {
              await setTaskDone(profile.id, "contract_sent", adminContext);
            }
            if (data.signedAt) {
              await setTaskDone(profile.id, "contract_signed", adminContext);
              await db
                .update(driverProfile)
                .set({ status: "SIGNED" })
                .where(eq(driverProfile.id, profile.id));
            }

            await addTimelineEvent({
              actorId: adminContext.user.id,
              driverProfileId: profile.id,
              applicationId: profile.applicationId,
              eventType: "contract_updated",
              title: `Contrat ${contract.status.toLowerCase()}`,
              description: `Signature suivie via ${contract.providerLabel}`,
            });
          }

          if (body.action === "upsertMonthlyActivity") {
            if (!body.period) return validationError("period requis");
            const status = authContext.isAdmin ? body.status : "SUBMITTED";
            await findOrCreateMonthlyActivity({
              authContext,
              profile,
              period: body.period,
              declaredRevenue: parseAmount(body.declaredRevenue),
              platformBreakdown: normalizeBreakdown(body.platformBreakdown),
              notes: body.notes,
              status,
            });
          }

          if (body.action === "upsertInvoice") {
            const adminContext = await requireAdmin(request);
            if (adminContext instanceof Response) return adminContext;
            const amountHT = parseAmount(body.amountHT);
            const vatAmount = parseAmount(body.vatAmount);
            const amountTTC =
              parseAmount(body.amountTTC) || amountHT + vatAmount;
            const invoiceNumber =
              body.invoiceNumber ||
              `DRIIVO-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Date.now()).slice(-4)}`;

            const data = {
              monthlyActivityId: body.monthlyActivityId ?? null,
              invoiceNumber,
              recipient: body.recipient ?? "Plateformes VTC",
              amountHT,
              vatAmount,
              amountTTC,
              status: body.status ?? "SENT",
              fileId: body.fileId ?? null,
              issuedAt: new Date(),
              paidAt: body.status === "PAID" ? new Date() : null,
            };

            const [invoice] = body.invoiceId
              ? await db
                  .update(invoiceRecord)
                  .set(data)
                  .where(eq(invoiceRecord.id, body.invoiceId))
                  .returning()
              : await db
                  .insert(invoiceRecord)
                  .values({
                    id: nanoid(),
                    driverProfileId: profile.id,
                    ...data,
                  })
                  .returning();

            await addTimelineEvent({
              actorId: adminContext.user.id,
              driverProfileId: profile.id,
              applicationId: profile.applicationId,
              eventType: "invoice_updated",
              title: `Facture ${invoice.invoiceNumber}`,
              description: `${invoice.amountTTC.toLocaleString("fr-FR")} EUR TTC - ${invoice.status}`,
            });
          }

          if (body.action === "upsertPayment") {
            const adminContext = await requireAdmin(request);
            if (adminContext instanceof Response) return adminContext;
            if (!body.invoiceId) return validationError("invoiceId requis");
            const amount = parseAmount(body.amount);
            const status = body.status ?? "RECEIVED";
            const [payment] = body.paymentId
              ? await db
                  .update(paymentRecord)
                  .set({
                    amount,
                    status,
                    reference: body.reference,
                    receivedAt:
                      status === "RECEIVED" || status === "RECONCILED"
                        ? new Date()
                        : null,
                  })
                  .where(eq(paymentRecord.id, body.paymentId))
                  .returning()
              : await db
                  .insert(paymentRecord)
                  .values({
                    id: nanoid(),
                    invoiceId: body.invoiceId,
                    amount,
                    status,
                    reference: body.reference,
                    receivedAt:
                      status === "RECEIVED" || status === "RECONCILED"
                        ? new Date()
                        : null,
                  })
                  .returning();

            if (status === "RECEIVED" || status === "RECONCILED") {
              await db
                .update(invoiceRecord)
                .set({ status: "PAID", paidAt: new Date() })
                .where(eq(invoiceRecord.id, body.invoiceId));
            }

            await addTimelineEvent({
              actorId: adminContext.user.id,
              driverProfileId: profile.id,
              applicationId: profile.applicationId,
              eventType: "payment_updated",
              title: "Paiement reçu",
              description: `${payment.amount.toLocaleString("fr-FR")} EUR - ${payment.status}`,
            });
          }

          if (body.action === "submitExpense") {
            const amount = parseAmount(body.amount);
            if (!body.category || amount <= 0) {
              return validationError("Catégorie et montant requis");
            }
            const [expense] = await db
              .insert(expenseRecord)
              .values({
                id: nanoid(),
                driverProfileId: profile.id,
                monthlyActivityId: body.monthlyActivityId ?? null,
                category: body.category,
                amount,
                description: body.description,
                receiptFileId: body.receiptFileId,
                status: authContext.isAdmin
                  ? (body.status ?? "APPROVED")
                  : "SUBMITTED",
                reviewedAt: authContext.isAdmin ? new Date() : null,
                reviewedBy: authContext.isAdmin ? authContext.user.id : null,
              })
              .returning();

            await addTimelineEvent({
              actorId: authContext.user.id,
              driverProfileId: profile.id,
              applicationId: profile.applicationId,
              eventType: "expense_submitted",
              title: `Frais: ${expense.category}`,
              description: `${expense.amount.toLocaleString("fr-FR")} EUR - ${expense.status}`,
            });
          }

          if (body.action === "reviewExpense") {
            const adminContext = await requireAdmin(request);
            if (adminContext instanceof Response) return adminContext;
            if (!body.expenseId) return validationError("expenseId requis");
            const status = body.status ?? "APPROVED";
            const [expense] = await db
              .update(expenseRecord)
              .set({
                status,
                reviewNotes: body.reviewNotes,
                reviewedAt: new Date(),
                reviewedBy: adminContext.user.id,
              })
              .where(eq(expenseRecord.id, body.expenseId))
              .returning();

            await addTimelineEvent({
              actorId: adminContext.user.id,
              driverProfileId: profile.id,
              applicationId: profile.applicationId,
              eventType: "expense_reviewed",
              title: `Frais ${status.toLowerCase()}`,
              description: expense?.reviewNotes,
            });
          }

          if (body.action === "upsertPayroll") {
            const adminContext = await requireAdmin(request);
            if (adminContext instanceof Response) return adminContext;
            if (!body.period) return validationError("period requis");
            const [existing] = await db
              .select()
              .from(payrollSummary)
              .where(
                and(
                  eq(payrollSummary.driverProfileId, profile.id),
                  eq(payrollSummary.period, body.period),
                ),
              )
              .limit(1);

            const data = {
              monthlyActivityId:
                body.monthlyActivityId ?? existing?.monthlyActivityId ?? null,
              grossSalary:
                parseAmount(body.grossSalary) || existing?.grossSalary || 0,
              netSalary:
                parseAmount(body.netSalary) || existing?.netSalary || 0,
              managementFee:
                parseAmount(body.managementFee) || existing?.managementFee || 0,
              socialContributions:
                parseAmount(body.socialContributions) ||
                existing?.socialContributions ||
                0,
              expensesReimbursed:
                parseAmount(body.expensesReimbursed) ||
                existing?.expensesReimbursed ||
                0,
              payoutAmount:
                parseAmount(body.payoutAmount) || existing?.payoutAmount || 0,
              status: body.status ?? existing?.status ?? "READY",
              payslipFileId:
                body.payslipFileId ?? existing?.payslipFileId ?? null,
              paidAt:
                body.status === "PAID"
                  ? (existing?.paidAt ?? new Date())
                  : (existing?.paidAt ?? null),
            };

            const [payroll] = existing
              ? await db
                  .update(payrollSummary)
                  .set(data)
                  .where(eq(payrollSummary.id, existing.id))
                  .returning()
              : await db
                  .insert(payrollSummary)
                  .values({
                    id: nanoid(),
                    driverProfileId: profile.id,
                    period: body.period,
                    ...data,
                  })
                  .returning();

            await addTimelineEvent({
              actorId: adminContext.user.id,
              driverProfileId: profile.id,
              applicationId: profile.applicationId,
              eventType: "payroll_updated",
              title: `Synthèse de paie ${payroll.period}`,
              description: `${payroll.payoutAmount.toLocaleString("fr-FR")} EUR - ${payroll.status}`,
            });
          }

          const refreshed = await getProfileForAccess(authContext, {
            profileId: profile.id,
          });
          if (!refreshed || refreshed === "FORBIDDEN") {
            return json({ success: true });
          }
          return json({
            success: true,
            data: await getOperationsBundle(refreshed),
          });
        } catch (error) {
          console.error("[Operations] POST error:", error);
          return json(
            { success: false, error: "Failed to update operations" },
            { status: 500 },
          );
        }
      },
    },
  },
});

import "dotenv/config";
import { hash } from "bcryptjs";
import { inArray } from "drizzle-orm";
import { db } from "../lib/db";
import {
  account,
  application,
  contractRecord,
  driverProfile,
  expenseRecord,
  invoiceRecord,
  lead,
  meetingBooking,
  monthlyActivity,
  onboardingTask,
  paymentRecord,
  payrollSummary,
  storedFile,
  timelineEvent,
  user,
} from "../lib/db/schema";
import type { DocumentCategory, DocumentReviewStatus } from "../lib/documents";

type DemoClient = {
  userId: string;
  appId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  monthlyRevenue: string;
  experience: string;
  hasVehicle: string;
  vehicleType: string;
  platforms: string;
  notes: string;
  documents: Array<{
    category: DocumentCategory;
    status: DocumentReviewStatus;
    notes?: string;
  }>;
};

const requiredDocuments: DocumentCategory[] = [
  "IDENTITY",
  "DRIVING_LICENSE",
  "VTC_CARD",
  "RIB",
  "PROOF_OF_ADDRESS",
  "VEHICLE_REGISTRATION",
  "VEHICLE_INSURANCE",
];

const clients: DemoClient[] = [
  {
    userId: "demo-user-amine",
    appId: "demo-app-amine",
    firstName: "Amine",
    lastName: "Benkacem",
    email: "amine.benkacem@example.com",
    phone: "+33 6 12 34 56 10",
    city: "Paris",
    status: "APPROVED",
    monthlyRevenue: "5000_7000",
    experience: "3_5",
    hasVehicle: "yes",
    vehicleType: "Tesla Model 3",
    platforms: "Uber,Bolt",
    notes: "Dossier complet et validé, profil prêt pour intégration portage.",
    documents: [
      ...requiredDocuments.map((category) => ({
        category,
        status: "APPROVED" as const,
      })),
      { category: "PLATFORM_STATEMENT", status: "APPROVED" },
      { category: "URSSAF_OR_STATUS", status: "APPROVED" },
    ],
  },
  {
    userId: "demo-user-sarah",
    appId: "demo-app-sarah",
    firstName: "Sarah",
    lastName: "Meunier",
    email: "sarah.meunier@example.com",
    phone: "+33 6 12 34 56 11",
    city: "Lyon",
    status: "UNDER_REVIEW",
    monthlyRevenue: "3000_5000",
    experience: "1_3",
    hasVehicle: "yes",
    vehicleType: "Toyota Prius",
    platforms: "Uber,Heetch",
    notes: "Dossier en revue avec tous les documents reçus.",
    documents: requiredDocuments.map((category) => ({
      category,
      status: "UPLOADED",
    })),
  },
  {
    userId: "demo-user-karim",
    appId: "demo-app-karim",
    firstName: "Karim",
    lastName: "Diallo",
    email: "karim.diallo@example.com",
    phone: "+33 6 12 34 56 12",
    city: "Marseille",
    status: "UNDER_REVIEW",
    monthlyRevenue: "7000_10000",
    experience: "more_5",
    hasVehicle: "yes",
    vehicleType: "Mercedes Classe E",
    platforms: "Uber,Bolt,Free Now",
    notes: "Dossier incomplet: carte VTC à renvoyer et assurance manquante.",
    documents: [
      { category: "IDENTITY", status: "APPROVED" },
      { category: "DRIVING_LICENSE", status: "APPROVED" },
      {
        category: "VTC_CARD",
        status: "REJECTED",
        notes: "Photo trop floue, merci de renvoyer le recto verso.",
      },
      { category: "RIB", status: "UPLOADED" },
      { category: "PROOF_OF_ADDRESS", status: "UPLOADED" },
    ],
  },
  {
    userId: "demo-user-nora",
    appId: "demo-app-nora",
    firstName: "Nora",
    lastName: "Lefèvre",
    email: "nora.lefevre@example.com",
    phone: "+33 6 12 34 56 13",
    city: "Bordeaux",
    status: "REJECTED",
    monthlyRevenue: "moins_3000",
    experience: "none",
    hasVehicle: "no",
    vehicleType: "Aucun véhicule",
    platforms: "Uber",
    notes: "Dossier refusé: pas de véhicule exploitable et carte VTC absente.",
    documents: [
      { category: "IDENTITY", status: "APPROVED" },
      { category: "DRIVING_LICENSE", status: "APPROVED" },
      { category: "PROOF_OF_ADDRESS", status: "APPROVED" },
    ],
  },
  {
    userId: "demo-user-mehdi",
    appId: "demo-app-mehdi",
    firstName: "Mehdi",
    lastName: "Aouad",
    email: "mehdi.aouad@example.com",
    phone: "+33 6 12 34 56 14",
    city: "Toulouse",
    status: "APPROVED",
    monthlyRevenue: "7000_10000",
    experience: "more_5",
    hasVehicle: "yes",
    vehicleType: "Renault Arkana E-Tech",
    platforms: "Uber,Bolt,Free Now",
    notes: "Chauffeur expérimenté, documents validés et rendez-vous terminé.",
    documents: [
      ...requiredDocuments.map((category) => ({
        category,
        status: "APPROVED" as const,
      })),
      { category: "PLATFORM_STATEMENT", status: "APPROVED" },
    ],
  },
  {
    userId: "demo-user-camille",
    appId: "demo-app-camille",
    firstName: "Camille",
    lastName: "Bernard",
    email: "camille.bernard@example.com",
    phone: "+33 6 12 34 56 15",
    city: "Lille",
    status: "SUBMITTED",
    monthlyRevenue: "3000_5000",
    experience: "1_3",
    hasVehicle: "yes",
    vehicleType: "Peugeot 508",
    platforms: "Uber,Heetch",
    notes: "Nouvelle candidature à qualifier, premiers documents reçus.",
    documents: [
      { category: "IDENTITY", status: "UPLOADED" },
      { category: "DRIVING_LICENSE", status: "UPLOADED" },
      { category: "RIB", status: "UPLOADED" },
    ],
  },
];

const legacyDemoEmails = [
  "amine.demo@driivo.local",
  "sarah.demo@driivo.local",
  "karim.demo@driivo.local",
  "nora.demo@driivo.local",
];

const documentSlugs: Record<DocumentCategory, string> = {
  IDENTITY: "piece-identite",
  DRIVING_LICENSE: "permis-conduire",
  VTC_CARD: "carte-vtc",
  RIB: "rib",
  PROOF_OF_ADDRESS: "justificatif-domicile",
  VEHICLE_REGISTRATION: "carte-grise",
  VEHICLE_INSURANCE: "assurance-vehicule",
  PLATFORM_STATEMENT: "releve-plateformes",
  URSSAF_OR_STATUS: "situation-administrative",
  OTHER: "document-complementaire",
};

function documentName(client: DemoClient, category: DocumentCategory) {
  const person = `${client.firstName}-${client.lastName}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return `${documentSlugs[category]}-${person}.pdf`;
}

async function seedDemo() {
  if (process.env.ALLOW_DEMO_SEED !== "true") {
    throw new Error("Set ALLOW_DEMO_SEED=true before running the demo seed.");
  }

  const rawPassword = process.env.DEMO_USER_PASSWORD;
  if (!rawPassword || rawPassword.length < 8) {
    throw new Error(
      "DEMO_USER_PASSWORD must be set and at least 8 characters long.",
    );
  }

  const password = await hash(rawPassword, 10);
  const now = new Date();
  const emails = clients.map((client) => client.email);
  const emailsToReset = [...emails, ...legacyDemoEmails];
  const appIds = clients.map((client) => client.appId);
  const userIds = clients.map((client) => client.userId);
  const profileIds = clients.map((client) => `demo-profile-${client.userId}`);
  const invoiceIds = clients.map((client) => `demo-invoice-${client.userId}`);

  console.log("Resetting existing demo records...");
  await db
    .delete(storedFile)
    .where(inArray(storedFile.entityId, [...appIds, ...profileIds]));
  await db
    .delete(timelineEvent)
    .where(inArray(timelineEvent.driverProfileId, profileIds));
  await db
    .delete(payrollSummary)
    .where(inArray(payrollSummary.driverProfileId, profileIds));
  await db
    .delete(expenseRecord)
    .where(inArray(expenseRecord.driverProfileId, profileIds));
  await db.delete(paymentRecord).where(inArray(paymentRecord.invoiceId, invoiceIds));
  await db
    .delete(invoiceRecord)
    .where(inArray(invoiceRecord.driverProfileId, profileIds));
  await db
    .delete(monthlyActivity)
    .where(inArray(monthlyActivity.driverProfileId, profileIds));
  await db
    .delete(onboardingTask)
    .where(inArray(onboardingTask.driverProfileId, profileIds));
  await db
    .delete(contractRecord)
    .where(inArray(contractRecord.driverProfileId, profileIds));
  await db.delete(driverProfile).where(inArray(driverProfile.id, profileIds));
  await db
    .delete(meetingBooking)
    .where(inArray(meetingBooking.email, emailsToReset));
  await db.delete(lead).where(inArray(lead.email, emailsToReset));
  await db.delete(application).where(inArray(application.id, appIds));
  await db.delete(account).where(inArray(account.userId, userIds));
  await db.delete(user).where(inArray(user.email, emailsToReset));

  console.log("Creating demo users and applications...");
  for (const client of clients) {
    await db.insert(user).values({
      id: client.userId,
      name: `${client.firstName} ${client.lastName}`,
      email: client.email,
      emailVerified: true,
      role: "USER",
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(account).values({
      id: `demo-account-${client.userId}`,
      accountId: client.userId,
      providerId: "credential",
      userId: client.userId,
      password,
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(application).values({
      id: client.appId,
      status: client.status,
      currentStep: 6,
      totalSteps: 6,
      activityType: "VTC",
      structureType: "portage_salarial",
      isAlone: "yes",
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      hasVtcLicense: client.documents.some(
        (document) => document.category === "VTC_CARD",
      )
        ? "yes"
        : "no",
      yearsExperience: client.experience,
      currentPlatforms: client.platforms,
      hasVehicle: client.hasVehicle,
      vehicleType: client.vehicleType,
      vehicleYear: client.hasVehicle === "yes" ? "2021" : null,
      monthlyRevenue: client.monthlyRevenue,
      expectedStartDate: "Sous 30 jours",
      formData: {
        city: client.city,
        vtcCardNumber: client.documents.some(
          (document) => document.category === "VTC_CARD",
        )
          ? `DEMO-${client.appId.toUpperCase()}`
          : null,
        consentAccepted: true,
        consentAcceptedAt: now.toISOString(),
        demo: true,
      },
      submittedAt: now,
      reviewedAt:
        client.status === "SUBMITTED" || client.status === "UNDER_REVIEW"
          ? null
          : now,
      notes: client.notes,
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(lead).values({
      id: `demo-lead-${client.userId}`,
      firstName: client.firstName,
      email: client.email,
      phone: client.phone,
      monthlyRevenue: client.monthlyRevenue === "7000_10000" ? 8500 : 5200,
      estimatedNet: client.monthlyRevenue === "moins_3000" ? 1800 : 3900,
      source: "SIMULATEUR",
      status: client.status === "APPROVED" ? "CONVERTED" : "QUALIFIED",
      notes: "Lead issu du simulateur, à suivre selon le statut du dossier.",
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(meetingBooking).values({
      id: `demo-meeting-${client.userId}`,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      scheduledDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      timeSlot: client.status === "APPROVED" ? "11:00" : "15:00",
      duration: 15,
      status: client.status === "APPROVED" ? "COMPLETED" : "SCHEDULED",
      notes: "Rendez-vous de qualification.",
      leadId: `demo-lead-${client.userId}`,
      createdAt: now,
      updatedAt: now,
    });

    for (const document of client.documents) {
      await db.insert(storedFile).values({
        id: `demo-file-${client.appId}-${document.category.toLowerCase()}`,
        key: `demo/${client.appId}/${documentName(client, document.category)}`,
        originalName: documentName(client, document.category),
        mimeType: "application/pdf",
        size: 186000,
        entityType: "APPLICATION",
        entityId: client.appId,
        uploadedBy: client.userId,
        documentCategory: document.category,
        reviewStatus: document.status,
        reviewNotes: document.notes ?? null,
        reviewedAt: document.status === "UPLOADED" ? null : now,
        reviewedBy: null,
        createdAt: now,
      });
    }

    if (client.status === "APPROVED") {
      const profileId = `demo-profile-${client.userId}`;
      const activityId = `demo-activity-${client.userId}`;
      const invoiceId = `demo-invoice-${client.userId}`;
      const payrollId = `demo-payroll-${client.userId}`;
      const active = client.firstName === "Mehdi";
      const period = now.toISOString().slice(0, 7);
      const declaredRevenue =
        client.monthlyRevenue === "7000_10000" ? 8600 : 6200;
      const fee = Math.round(declaredRevenue * 0.1);
      const contributions = Math.round(declaredRevenue * 0.14);
      const net = declaredRevenue - fee - contributions;

      await db.insert(driverProfile).values({
        id: profileId,
        applicationId: client.appId,
        userEmail: client.email,
        status: active ? "ACTIVE" : "CONTRACT_SENT",
        startDate: now.toISOString().slice(0, 10),
        assignedAccountantId: null,
        notes: active
          ? "Client actif suivi par le comptable, paie importée manuellement."
          : "Contrat envoyé, en attente de signature.",
        createdAt: now,
        updatedAt: now,
      });

      await db.insert(contractRecord).values({
        id: `demo-contract-${client.userId}`,
        driverProfileId: profileId,
        status: active ? "SIGNED" : "SENT",
        providerLabel: "Manual demo",
        unsignedFileId: `demo-file-${profileId}-contract`,
        signedFileId: active ? `demo-file-${profileId}-signed-contract` : null,
        sentAt: now,
        signedAt: active ? now : null,
        createdAt: now,
        updatedAt: now,
      });

      const taskStates = [
        ["application_approved", "Candidature approuvée", "DONE"],
        ["documents_validated", "Documents principaux validés", "DONE"],
        ["contract_sent", "Contrat envoyé", "DONE"],
        ["contract_signed", "Contrat signé", active ? "DONE" : "PENDING"],
        ["bank_ready", "RIB et paiement prêts", active ? "DONE" : "PENDING"],
        ["accountant_assigned", "Comptable assigné", "DONE"],
        ["first_month_opened", "Premier mois d'activité ouvert", "DONE"],
      ] as const;

      await db.insert(onboardingTask).values(
        taskStates.map(([taskKey, label, status]) => ({
          id: `demo-task-${profileId}-${taskKey}`,
          driverProfileId: profileId,
          taskKey,
          label,
          status,
          completedAt: status === "DONE" ? now : null,
          completedBy: null,
          createdAt: now,
          updatedAt: now,
        })),
      );

      await db.insert(monthlyActivity).values({
        id: activityId,
        driverProfileId: profileId,
        period,
        status: active ? "VALIDATED" : "OPEN",
        declaredRevenue: active ? declaredRevenue : 0,
        platformBreakdown: active
          ? { Uber: Math.round(declaredRevenue * 0.65), Bolt: Math.round(declaredRevenue * 0.35) }
          : {},
        notes: active
          ? "CA validé depuis les relevés plateformes."
          : "Premier mois ouvert, déclaration attendue.",
        submittedAt: active ? now : null,
        validatedAt: active ? now : null,
        validatedBy: null,
        createdAt: now,
        updatedAt: now,
      });

      if (active) {
        await db.insert(invoiceRecord).values({
          id: invoiceId,
          driverProfileId: profileId,
          monthlyActivityId: activityId,
          invoiceNumber: `DRIIVO-${period.replace("-", "")}-${client.firstName.toUpperCase()}`,
          recipient: "Plateformes VTC",
          amountHT: declaredRevenue,
          vatAmount: 0,
          amountTTC: declaredRevenue,
          status: "PAID",
          fileId: `demo-file-${profileId}-invoice`,
          issuedAt: now,
          paidAt: now,
          createdAt: now,
          updatedAt: now,
        });

        await db.insert(paymentRecord).values({
          id: `demo-payment-${client.userId}`,
          invoiceId,
          amount: declaredRevenue,
          status: "RECONCILED",
          receivedAt: now,
          reference: "Virement plateforme demo",
          createdAt: now,
          updatedAt: now,
        });

        await db.insert(expenseRecord).values({
          id: `demo-expense-${client.userId}`,
          driverProfileId: profileId,
          monthlyActivityId: activityId,
          category: "Recharge",
          amount: 180,
          description: "Recharges électriques du mois.",
          status: "APPROVED",
          reviewNotes: "Validé par le comptable.",
          reviewedAt: now,
          reviewedBy: null,
          createdAt: now,
          updatedAt: now,
        });

        await db.insert(payrollSummary).values({
          id: payrollId,
          driverProfileId: profileId,
          monthlyActivityId: activityId,
          period,
          grossSalary: Math.round(net * 1.32),
          netSalary: net,
          managementFee: fee,
          socialContributions: contributions,
          expensesReimbursed: 180,
          payoutAmount: net + 180,
          status: "PAID",
          payslipFileId: `demo-file-${profileId}-payslip`,
          paidAt: now,
          createdAt: now,
          updatedAt: now,
        });
      }

      const operationFiles = [
        {
          id: `demo-file-${profileId}-contract`,
          key: `demo/${profileId}/contrat-a-signer.pdf`,
          originalName: "contrat-a-signer.pdf",
        },
        ...(active
          ? [
              {
                id: `demo-file-${profileId}-signed-contract`,
                key: `demo/${profileId}/contrat-signe.pdf`,
                originalName: "contrat-signe.pdf",
              },
              {
                id: `demo-file-${profileId}-invoice`,
                key: `demo/${profileId}/facture-${period}.pdf`,
                originalName: `facture-${period}.pdf`,
              },
              {
                id: `demo-file-${profileId}-payslip`,
                key: `demo/${profileId}/bulletin-${period}.pdf`,
                originalName: `bulletin-${period}.pdf`,
              },
            ]
          : []),
      ];

      for (const file of operationFiles) {
        await db.insert(storedFile).values({
          id: file.id,
          key: file.key,
          originalName: file.originalName,
          mimeType: "application/pdf",
          size: 228000,
          entityType: "DOCUMENT",
          entityId: profileId,
          uploadedBy: client.userId,
          documentCategory: "OTHER",
          reviewStatus: "APPROVED",
          reviewNotes: null,
          reviewedAt: now,
          reviewedBy: null,
          createdAt: now,
        });
      }

      await db.insert(timelineEvent).values([
        {
          id: `demo-timeline-${client.userId}-activated`,
          actorId: null,
          driverProfileId: profileId,
          applicationId: client.appId,
          eventType: "profile_activated",
          title: "Dossier client activé",
          description: "Activation manuelle après approbation.",
          metadata: { demo: true },
          createdAt: now,
        },
        {
          id: `demo-timeline-${client.userId}-contract`,
          actorId: null,
          driverProfileId: profileId,
          applicationId: client.appId,
          eventType: "contract_updated",
          title: active ? "Contrat signé" : "Contrat envoyé",
          description: active
            ? "Contrat signé importé dans le dossier."
            : "Contrat envoyé, signature attendue.",
          metadata: { demo: true },
          createdAt: now,
        },
        ...(active
          ? [
              {
                id: `demo-timeline-${client.userId}-payroll`,
                actorId: null,
                driverProfileId: profileId,
                applicationId: client.appId,
                eventType: "payroll_updated",
                title: `Bulletin ${period} disponible`,
                description: `${net + 180} EUR marqués payés.`,
                metadata: { demo: true },
                createdAt: now,
              },
            ]
          : []),
      ]);
    }
  }

  console.log("Demo users ready:");
  for (const client of clients) {
    console.log(`- ${client.email} / ${rawPassword}`);
  }
  console.log("Demo seed complete.");
  process.exit(0);
}

seedDemo().catch((error) => {
  console.error("Demo seed failed:", error);
  process.exit(1);
});

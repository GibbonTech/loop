import "dotenv/config";
import { hash } from "bcryptjs";
import { inArray } from "drizzle-orm";
import { db } from "../lib/db";
import {
  account,
  application,
  lead,
  meetingBooking,
  storedFile,
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

  console.log("Resetting existing demo records...");
  await db.delete(storedFile).where(inArray(storedFile.entityId, appIds));
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

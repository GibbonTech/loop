export const documentCategories = [
  {
    value: "IDENTITY",
    label: "Pièce d'identité",
    description:
      "Carte nationale d'identité, passeport ou titre de séjour valide.",
    required: true,
  },
  {
    value: "DRIVING_LICENSE",
    label: "Permis de conduire",
    description: "Recto verso du permis B valide.",
    required: true,
  },
  {
    value: "VTC_CARD",
    label: "Carte VTC",
    description: "Carte professionnelle VTC ou attestation en cours.",
    required: true,
  },
  {
    value: "RIB",
    label: "RIB",
    description: "Relevé d'identité bancaire au nom du candidat.",
    required: true,
  },
  {
    value: "PROOF_OF_ADDRESS",
    label: "Justificatif de domicile",
    description: "Document de moins de 3 mois.",
    required: true,
  },
  {
    value: "VEHICLE_REGISTRATION",
    label: "Carte grise",
    description: "Certificat d'immatriculation du véhicule exploité.",
    required: true,
  },
  {
    value: "VEHICLE_INSURANCE",
    label: "Assurance véhicule",
    description: "Attestation d'assurance professionnelle ou VTC.",
    required: true,
  },
  {
    value: "PLATFORM_STATEMENT",
    label: "Relevé plateformes",
    description: "Derniers relevés Uber, Bolt, Heetch ou autre plateforme.",
    required: false,
  },
  {
    value: "URSSAF_OR_STATUS",
    label: "Situation administrative",
    description:
      "Attestation URSSAF, extrait INSEE ou justificatif d'activité.",
    required: false,
  },
  {
    value: "OTHER",
    label: "Autre document",
    description: "Tout complément demandé par l'équipe Driivo.",
    required: false,
  },
] as const;

export const documentCategoryValues = documentCategories.map(
  (category) => category.value,
) as [DocumentCategory, ...DocumentCategory[]];

export const documentReviewStatuses = [
  "UPLOADED",
  "APPROVED",
  "REJECTED",
] as const;

export type DocumentCategory = (typeof documentCategories)[number]["value"];
export type DocumentReviewStatus = (typeof documentReviewStatuses)[number];

export type DocumentLike = {
  documentCategory?: string | null;
  reviewStatus?: string | null;
  createdAt?: string | Date | null;
};

export const requiredDocumentCategories = documentCategories
  .filter((category) => category.required)
  .map((category) => category.value);

export function isDocumentCategory(value: unknown): value is DocumentCategory {
  return (
    typeof value === "string" &&
    documentCategoryValues.includes(value as DocumentCategory)
  );
}

export function getDocumentCategory(value: unknown) {
  const category = isDocumentCategory(value) ? value : "OTHER";
  return (
    documentCategories.find((item) => item.value === category) ??
    documentCategories[documentCategories.length - 1]
  );
}

export function getDocumentLabel(value: unknown) {
  return getDocumentCategory(value).label;
}

export function getLatestFileByCategory<T extends DocumentLike>(
  files: T[],
  category: DocumentCategory,
) {
  const matching = files.filter(
    (file) => (file.documentCategory || "OTHER") === category,
  );
  return matching.sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  })[0];
}

export function getDocumentCompletion(files: DocumentLike[]) {
  const required = requiredDocumentCategories.length;
  const uploaded = requiredDocumentCategories.filter((category) =>
    getLatestFileByCategory(files, category),
  ).length;
  const approved = requiredDocumentCategories.filter(
    (category) =>
      getLatestFileByCategory(files, category)?.reviewStatus === "APPROVED",
  ).length;

  return {
    required,
    uploaded,
    approved,
    missing: required - uploaded,
    uploadComplete: uploaded === required,
    reviewComplete: approved === required,
  };
}

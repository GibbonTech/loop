import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Eye,
  Mail,
  CircleCheck,
  CircleDashed,
  FileText,
  Download,
  Trash2,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "~/lib/auth/auth-client";
import { validateSession } from "~/lib/auth/auth-functions";
import {
  documentCategories,
  getDocumentCategory,
  getDocumentCompletion,
  getLatestFileByCategory,
  requiredDocumentCategories,
  type DocumentReviewStatus,
} from "~/lib/documents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

interface StoredFile {
  id: string;
  key: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
  documentCategory: string;
  reviewStatus: string;
  reviewNotes?: string | null;
}

interface OperationsBundle {
  profile: {
    id: string;
    status: string;
    startDate?: string | null;
    notes?: string | null;
  };
  contract: {
    id: string;
    status: string;
    providerLabel: string;
    unsignedFileId?: string | null;
    signedFileId?: string | null;
  } | null;
  onboardingTasks: Array<{
    id: string;
    taskKey: string;
    label: string;
    status: string;
  }>;
  monthlyActivities: Array<{
    id: string;
    period: string;
    status: string;
    declaredRevenue: number;
  }>;
  invoices: Array<{
    id: string;
    invoiceNumber: string;
    recipient: string;
    amountTTC: number;
    status: string;
  }>;
  payments: Array<{
    id: string;
    invoiceId: string;
    amount: number;
    status: string;
  }>;
  expenses: Array<{
    id: string;
    category: string;
    amount: number;
    description?: string | null;
    status: string;
    reviewNotes?: string | null;
  }>;
  payrollSummaries: Array<{
    id: string;
    period: string;
    grossSalary: number;
    netSalary: number;
    payoutAmount: number;
    status: string;
    payslipFileId?: string | null;
  }>;
  timeline: Array<{
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
  }>;
  filesById: Record<string, StoredFile>;
}

const formatEuro = (value?: number | null) =>
  `${Math.round(value || 0).toLocaleString("fr-FR")} €`;

export const Route = createFileRoute("/admin/applications/$id")({
  beforeLoad: async () => {
    const auth = await validateSession();
    if (!auth.isAuthenticated || !auth.isAdmin) {
      throw redirect({ to: "/" });
    }
    return { user: auth.user };
  },
  component: ApplicationDetailPage,
});

interface Application {
  id: string;
  status: string;
  currentStep: number;
  totalSteps: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  activityType: string;
  structureType: string;
  isAlone: string;
  hasVtcLicense: string;
  yearsExperience: string;
  currentPlatforms: string;
  hasVehicle: string;
  vehicleType: string;
  vehicleYear: string;
  monthlyRevenue: string;
  expectedStartDate: string;
  createdAt: string;
  submittedAt: string;
  notes?: string | null;
  formData: Record<string, unknown>;
}

const formatRevenue = (v: string | undefined | null): string => {
  if (!v) return "";
  const map: Record<string, string> = {
    moins_3000: "Moins de 3 000 \u20ac",
    "3000_5000": "3 000 \u2013 5 000 \u20ac",
    "5000_7000": "5 000 \u2013 7 000 \u20ac",
    "7000_10000": "7 000 \u2013 10 000 \u20ac",
    plus_10000: "Plus de 10 000 \u20ac",
    "5000-7000\u20ac": "5 000 \u2013 7 000 \u20ac",
  };
  return map[v] || v;
};

const formatExperience = (v: string | undefined | null): string => {
  if (!v) return "";
  const map: Record<string, string> = {
    none: "Aucune",
    moins_1an: "Moins d\u2019un an",
    less_1: "Moins d\u2019un an",
    "1_3": "1 \u00e0 3 ans",
    "1_3ans": "1 \u00e0 3 ans",
    "3_5": "3 \u00e0 5 ans",
    "3_5ans": "3 \u00e0 5 ans",
    more_5: "Plus de 5 ans",
    plus_5ans: "Plus de 5 ans",
  };
  return map[v] || v;
};

const formatYesNo = (v: string | undefined | null): string => {
  if (!v) return "";
  if (v === "yes" || v === "oui") return "Oui";
  if (v === "no" || v === "non") return "Non";
  return v;
};

const formatPlatforms = (v: string | undefined | null): string => {
  if (!v) return "";
  return v
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .join(", ");
};

const hasFieldValue = (field: {
  label: string;
  value?: string | null;
}): field is { label: string; value: string } => Boolean(field.value);

function ApplicationDetailPage() {
  const { id } = Route.useParams();
  const { isPending: sessionPending } = useSession();
  const [application, setApplication] = useState<Application | null>(null);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [operations, setOperations] = useState<OperationsBundle | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const operationFileInputRef = useRef<HTMLInputElement>(null);
  const pendingUploadPurposeRef = useRef<"contract" | "signedContract" | "payslip" | "invoice">("contract");

  useEffect(() => {
    fetchApplication();
    fetchFiles();
    fetchOperations();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications?id=${id}`);
      const data = await response.json();
      if (data.success && data.data) {
        setApplication(data.data);
        setNotes(data.data.notes || "");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/files?entityId=${id}`);
      const data = await response.json();
      if (data.success) setFiles(data.data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const fetchOperations = async () => {
    try {
      const response = await fetch(`/api/operations?applicationId=${id}`);
      const data = await response.json();
      if (data.success) setOperations(data.data || null);
    } catch (error) {
      console.error("Error fetching operations:", error);
    }
  };

  const runOperation = async (payload: Record<string, unknown>) => {
    setUpdating(true);
    try {
      const response = await fetch("/api/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: id,
          profileId: operations?.profile?.id,
          ...payload,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast.error(data.error || "Opération impossible");
        return false;
      }
      setOperations(data.data || null);
      toast.success("Opération mise à jour");
      return true;
    } catch (error) {
      console.error("Operation error:", error);
      toast.error("Opération impossible");
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const activateClientProfile = async () => {
    await runOperation({ action: "activateProfile", applicationId: id });
  };

  const downloadFile = async (key: string) => {
    try {
      const response = await fetch(`/api/files?key=${encodeURIComponent(key)}`);
      const data = await response.json();
      if (data.success && data.url) {
        window.open(data.url, "_blank");
      } else {
        toast.error(data.error || "Téléchargement impossible");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Téléchargement impossible");
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm("Supprimer ce fichier ?")) return;
    try {
      const response = await fetch(`/api/files?fileId=${fileId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast.error(data.error || "Suppression impossible");
        return;
      }
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      toast.success("Fichier supprimé");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Suppression impossible");
    }
  };

  const updateFileReview = async (
    fileId: string,
    reviewStatus: DocumentReviewStatus,
    reviewNotes?: string,
  ) => {
    setUpdating(true);
    try {
      const response = await fetch("/api/files", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, reviewStatus, reviewNotes }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast.error(data.error || "Mise à jour du document impossible");
        return;
      }
      setFiles((prev) =>
        prev.map((file) => (file.id === fileId ? data.file : file)),
      );
      toast.success(
        reviewStatus === "APPROVED"
          ? "Document validé"
          : "Document marqué à corriger",
      );
    } catch (error) {
      console.error("Error reviewing file:", error);
      toast.error("Mise à jour du document impossible");
    } finally {
      setUpdating(false);
    }
  };

  const rejectFile = (file: StoredFile) => {
    const reviewNotes = window.prompt(
      "Motif visible par le candidat :",
      file.reviewNotes || "",
    );
    if (reviewNotes === null) return;
    updateFileReview(
      file.id,
      "REJECTED",
      reviewNotes || "Document illisible ou incomplet.",
    );
  };

  const requestMissingDocuments = async () => {
    const missingCategories = requiredDocumentCategories.filter(
      (category) => !getLatestFileByCategory(files, category),
    );
    if (missingCategories.length === 0) {
      toast.info("Tous les documents requis sont déjà présents");
      return;
    }

    const message = window.prompt(
      "Message optionnel à envoyer au candidat :",
      "Merci d'ajouter les documents manquants depuis votre espace Driivo.",
    );
    if (message === null) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/document-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: id,
          categories: missingCategories,
          message,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast.error(data.error || "Demande impossible");
        return;
      }
      if (data.application) {
        setApplication(data.application);
        setNotes(data.application.notes || "");
      }
      toast.success("Demande de documents envoyée");
    } catch (error) {
      console.error("Error requesting documents:", error);
      toast.error("Demande impossible");
    } finally {
      setUpdating(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/applications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, notes }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast.error(data.error || "Mise à jour impossible");
        return;
      }
      setApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
      toast.success("Statut mis à jour");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Mise à jour impossible");
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async () => {
    try {
      const response = await fetch(`/api/applications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast.error(data.error || "Enregistrement impossible");
        return;
      }
      toast.success("Notes enregistrées");
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Enregistrement impossible");
    }
  };

  const uploadOperationFile = async (file: File) => {
    if (!operations?.profile) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("entityType", "DOCUMENT");
    formData.append("entityId", operations.profile.id);
    formData.append("documentCategory", "OTHER");

    const response = await fetch("/api/files", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      toast.error(data.error || "Téléversement impossible");
      return;
    }

    if (pendingUploadPurposeRef.current === "contract") {
      await runOperation({
        action: "updateContract",
        status: "SENT",
        unsignedFileId: data.file.id,
      });
    }
    if (pendingUploadPurposeRef.current === "signedContract") {
      await runOperation({
        action: "updateContract",
        status: "SIGNED",
        signedFileId: data.file.id,
      });
    }
    if (pendingUploadPurposeRef.current === "payslip") {
      const period =
        window.prompt("Période du bulletin (YYYY-MM)", new Date().toISOString().slice(0, 7)) ||
        "";
      if (!period) return;
      await runOperation({
        action: "upsertPayroll",
        period,
        status: "READY",
        payslipFileId: data.file.id,
      });
    }
    if (pendingUploadPurposeRef.current === "invoice") {
      const invoiceNumber =
        window.prompt("Numéro de facture", `DRIIVO-${Date.now().toString().slice(-6)}`) ||
        "";
      if (!invoiceNumber) return;
      await runOperation({
        action: "upsertInvoice",
        invoiceNumber,
        status: "SENT",
        fileId: data.file.id,
      });
    }
  };

  const startOperationUpload = (
    purpose: "contract" | "signedContract" | "payslip" | "invoice",
  ) => {
    pendingUploadPurposeRef.current = purpose;
    operationFileInputRef.current?.click();
  };

  const handleOperationFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadOperationFile(file);
    event.target.value = "";
  };

  const promptMonthlyActivity = async () => {
    const period =
      window.prompt("Période à ouvrir/mettre à jour (YYYY-MM)", new Date().toISOString().slice(0, 7)) ||
      "";
    if (!period) return;
    const declaredRevenue = window.prompt("CA déclaré (€)", "6500") || "0";
    await runOperation({
      action: "upsertMonthlyActivity",
      period,
      declaredRevenue,
      status: "VALIDATED",
      platformBreakdown: { Uber: declaredRevenue },
      notes: "Montant validé manuellement par l'équipe Driivo.",
    });
  };

  const promptInvoice = async () => {
    if (!operations?.profile) return;
    const periodActivity = operations.monthlyActivities[0];
    const amount = window.prompt("Montant facture TTC (€)", "6500") || "0";
    const invoiceNumber =
      window.prompt("Numéro de facture", `DRIIVO-${Date.now().toString().slice(-6)}`) ||
      "";
    if (!invoiceNumber) return;
    await runOperation({
      action: "upsertInvoice",
      monthlyActivityId: periodActivity?.id,
      invoiceNumber,
      recipient: "Plateformes VTC",
      amountHT: amount,
      amountTTC: amount,
      status: "SENT",
    });
  };

  const promptPayment = async (invoiceId: string, amount: number) => {
    const received = window.prompt("Montant reçu (€)", String(amount)) || "0";
    await runOperation({
      action: "upsertPayment",
      invoiceId,
      amount: received,
      status: "RECEIVED",
      reference: "Virement manuel",
    });
  };

  const promptPayroll = async () => {
    const period =
      window.prompt("Période de paie (YYYY-MM)", new Date().toISOString().slice(0, 7)) ||
      "";
    if (!period) return;
    const netSalary = window.prompt("Salaire net (€)", "3900") || "0";
    const payoutAmount = window.prompt("Versement chauffeur (€)", netSalary) || "0";
    await runOperation({
      action: "upsertPayroll",
      period,
      netSalary,
      payoutAmount,
      grossSalary: window.prompt("Brut indicatif (€)", "5200") || "0",
      managementFee: window.prompt("Frais Driivo (€)", "650") || "0",
      socialContributions: window.prompt("Cotisations (€)", "950") || "0",
      status: "READY",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  if (sessionPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative h-5 w-5">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-foreground"></div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-sm font-medium">Candidature introuvable</p>
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin">
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour
          </Link>
        </Button>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">
            Approuvée
          </Badge>
        );
      case "REJECTED":
        return <Badge variant="destructive">Refusée</Badge>;
      case "UNDER_REVIEW":
        return <Badge variant="outline">En examen</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  const documentReviewBadge = (file?: StoredFile) => {
    if (!file) return <Badge variant="secondary">Manquant</Badge>;
    if (file.reviewStatus === "APPROVED") {
      return (
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">
          Validé
        </Badge>
      );
    }
    if (file.reviewStatus === "REJECTED")
      return <Badge variant="destructive">À corriger</Badge>;
    return <Badge variant="outline">En revue</Badge>;
  };

  const documentCompletion = getDocumentCompletion(files);
  const formString = (key: string) => {
    const value = application.formData?.[key];
    return typeof value === "string" && value.trim() ? value.trim() : "";
  };
  const vehicleModel =
    application.vehicleType ||
    formString("vehicleType") ||
    formString("vehiculeModele");
  const vehicleYear =
    application.vehicleYear ||
    formString("vehicleYear") ||
    formString("vehiculeAnnee");
  const vehicleRegistrationPlate =
    formString("vehicleRegistrationPlate") ||
    formString("immatriculation");
  const vehicleCarteGriseHolder =
    formString("vehicleCarteGriseHolder") ||
    formString("carteGriseTitulaire");

  // Readiness score: count key fields that are filled
  const readinessFields = [
    { label: "Prénom", filled: !!application.firstName },
    { label: "Nom", filled: !!application.lastName },
    { label: "Email", filled: !!application.email },
    { label: "Téléphone", filled: !!application.phone },
    { label: "Carte VTC", filled: !!application.hasVtcLicense },
    { label: "Expérience", filled: !!application.yearsExperience },
    { label: "CA visé", filled: !!application.monthlyRevenue },
    { label: "Véhicule", filled: !!application.hasVehicle },
    { label: "Immatriculation", filled: !!vehicleRegistrationPlate },
    { label: "Docs reçus", filled: documentCompletion.uploadComplete },
    { label: "Docs validés", filled: documentCompletion.reviewComplete },
  ];
  const readinessScore = Math.round(
    (readinessFields.filter((f) => f.filled).length / readinessFields.length) *
      100,
  );

  const personalFields = [
    { label: "Email", value: application.email },
    { label: "Téléphone", value: application.phone },
    {
      label: "Ville",
      value:
        typeof application.formData?.city === "string"
          ? application.formData.city
          : undefined,
    },
    {
      label: "Carte VTC n°",
      value:
        typeof application.formData?.vtcCardNumber === "string"
          ? application.formData.vtcCardNumber
          : undefined,
    },
  ].filter(hasFieldValue);

  const activityFields = [
    { label: "Type d'activité", value: application.activityType || "VTC" },
    { label: "Structure", value: application.structureType },
    { label: "Travaille seul", value: formatYesNo(application.isAlone) },
    { label: "Carte VTC", value: formatYesNo(application.hasVtcLicense) },
    {
      label: "Expérience",
      value: formatExperience(application.yearsExperience),
    },
    {
      label: "CA mensuel visé",
      value: formatRevenue(application.monthlyRevenue),
    },
    {
      label: "Plateformes actuelles",
      value: formatPlatforms(application.currentPlatforms),
    },
    { label: "Date de début souhaitée", value: application.expectedStartDate },
  ].filter((f) => f.value);

  const vehicleFields = [
    {
      label: "Possède un véhicule",
      value: formatYesNo(application.hasVehicle),
    },
    { label: "Marque et modèle", value: vehicleModel },
    { label: "Année du véhicule", value: vehicleYear },
    { label: "Immatriculation", value: vehicleRegistrationPlate },
    { label: "Titulaire carte grise", value: vehicleCarteGriseHolder },
  ].filter((f) => f.value);
  const missingDocumentCategories = requiredDocumentCategories.filter(
    (category) => !getLatestFileByCategory(files, category),
  );
  const extraFiles = files.filter(
    (file) =>
      !requiredDocumentCategories.some(
        (category) => category === file.documentCategory,
      ),
  );

  const renderFieldsTable = (fields: { label: string; value: string }[]) => (
    <Table>
      <TableBody>
        {fields.map((field) => (
          <TableRow key={field.label}>
            <TableCell className="text-muted-foreground font-medium w-[200px]">
              {field.label}
            </TableCell>
            <TableCell>{field.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-background"></div>
              </div>
              <span className="text-sm font-semibold tracking-tight">
                Driivo
              </span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-3.5 w-3.5" />
                Candidatures
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <input
          ref={operationFileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleOperationFileChange}
        />

        {/* Profile + Actions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarFallback className="text-sm font-bold">
                    {(application.firstName?.[0] || "").toUpperCase()}
                    {(application.lastName?.[0] || "").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">
                    {application.firstName} {application.lastName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {application.email}
                    {application.phone && ` · ${application.phone}`}
                    {" · Déposée le "}
                    {new Date(application.createdAt).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </CardDescription>
                </div>
              </div>
              {statusBadge(application.status)}
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              {application.status !== "APPROVED" && (
                <Button
                  size="sm"
                  onClick={() => updateStatus("APPROVED")}
                  disabled={updating}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approuver
                </Button>
              )}
              {application.status !== "REJECTED" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => updateStatus("REJECTED")}
                  disabled={updating}
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Refuser
                </Button>
              )}
              {application.status !== "UNDER_REVIEW" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus("UNDER_REVIEW")}
                  disabled={updating}
                >
                  <Eye className="h-3.5 w-3.5" />
                  En examen
                </Button>
              )}
              <div className="flex-1" />
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${application.email}`}>
                  <Mail className="h-3.5 w-3.5" />
                  Contacter
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Readiness score */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Complétude du dossier</CardTitle>
                <CardDescription className="mt-1">
                  {readinessFields.filter((f) => f.filled).length} /{" "}
                  {readinessFields.length} champs renseignés
                </CardDescription>
              </div>
              <span
                className={`text-2xl font-bold tracking-tight ${
                  readinessScore >= 80
                    ? "text-emerald-600"
                    : readinessScore >= 50
                      ? "text-amber-600"
                      : "text-red-500"
                }`}
              >
                {readinessScore}%
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all ${
                  readinessScore >= 80
                    ? "bg-emerald-500"
                    : readinessScore >= 50
                      ? "bg-amber-500"
                      : "bg-red-400"
                }`}
                style={{ width: `${readinessScore}%` }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {readinessFields.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-1.5 text-xs"
                >
                  {f.filled ? (
                    <CircleCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <CircleDashed className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                  )}
                  <span
                    className={
                      f.filled ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manual operations */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-sm">
                  Opérations client manuelles
                </CardTitle>
                <CardDescription className="mt-1">
                  Contrat, activité, factures, paiements, frais et bulletins
                  suivis par l'équipe et le comptable.
                </CardDescription>
              </div>
              {!operations?.profile ? (
                <Button
                  size="sm"
                  onClick={activateClientProfile}
                  disabled={updating || application.status !== "APPROVED"}
                >
                  Activer le client
                </Button>
              ) : (
                <Badge variant="outline">{operations.profile.status}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!operations?.profile ? (
              <div className="rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
                Approuvez la candidature puis activez le dossier client pour
                afficher le suivi opérationnel dans l'espace utilisateur.
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid gap-3 md:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Contrat</div>
                    <div className="mt-1 text-lg font-semibold">
                      {operations.contract?.status || "DRAFT"}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Activités</div>
                    <div className="mt-1 text-lg font-semibold">
                      {operations.monthlyActivities.length}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Factures</div>
                    <div className="mt-1 text-lg font-semibold">
                      {operations.invoices.length}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Dernier payout</div>
                    <div className="mt-1 text-lg font-semibold">
                      {formatEuro(operations.payrollSummaries[0]?.payoutAmount)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startOperationUpload("contract")}
                    disabled={updating}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Upload contrat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startOperationUpload("signedContract")}
                    disabled={updating}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Upload signé
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={promptMonthlyActivity}
                    disabled={updating}
                  >
                    Ouvrir/valider mois
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={promptInvoice}
                    disabled={updating}
                  >
                    Créer facture
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startOperationUpload("invoice")}
                    disabled={updating}
                  >
                    Upload facture
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={promptPayroll}
                    disabled={updating}
                  >
                    Synthèse paie
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startOperationUpload("payslip")}
                    disabled={updating}
                  >
                    Upload bulletin
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`/api/operations?export=accounting&period=${new Date().toISOString().slice(0, 7)}`}
                    >
                      Export compta CSV
                    </a>
                  </Button>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <AdminOpsList
                    title="Checklist onboarding"
                    empty="Aucune tâche"
                    rows={operations.onboardingTasks.map((task) => ({
                      id: task.id,
                      main: task.label,
                      meta: task.status,
                      action:
                        task.status !== "DONE"
                          ? () =>
                              runOperation({
                                action: "updateTask",
                                taskId: task.id,
                                status: "DONE",
                              })
                          : undefined,
                    }))}
                  />
                  <AdminOpsList
                    title="Activité mensuelle"
                    empty="Aucun mois ouvert"
                    rows={operations.monthlyActivities.map((activity) => ({
                      id: activity.id,
                      main: activity.period,
                      meta: `${formatEuro(activity.declaredRevenue)} · ${activity.status}`,
                    }))}
                  />
                  <AdminOpsList
                    title="Factures et paiements"
                    empty="Aucune facture"
                    rows={operations.invoices.map((invoice) => ({
                      id: invoice.id,
                      main: invoice.invoiceNumber,
                      meta: `${invoice.recipient} · ${formatEuro(invoice.amountTTC)} · ${invoice.status}`,
                      action:
                        invoice.status !== "PAID"
                          ? () => promptPayment(invoice.id, invoice.amountTTC)
                          : undefined,
                    }))}
                  />
                  <AdminOpsList
                    title="Frais"
                    empty="Aucun frais"
                    rows={operations.expenses.map((expense) => ({
                      id: expense.id,
                      main: expense.category,
                      meta: `${formatEuro(expense.amount)} · ${expense.status}${
                        expense.reviewNotes ? ` · ${expense.reviewNotes}` : ""
                      }`,
                      action:
                        expense.status === "SUBMITTED"
                          ? () =>
                              runOperation({
                                action: "reviewExpense",
                                expenseId: expense.id,
                                status: "APPROVED",
                              })
                          : undefined,
                    }))}
                  />
                  <AdminOpsList
                    title="Paie / bulletins"
                    empty="Aucune synthèse"
                    rows={operations.payrollSummaries.map((payroll) => {
                      const payslip =
                        payroll.payslipFileId &&
                        operations.filesById[payroll.payslipFileId];
                      return {
                        id: payroll.id,
                        main: payroll.period,
                        meta: `${formatEuro(payroll.payoutAmount)} · ${payroll.status}`,
                        action: payslip ? () => downloadFile(payslip.key) : undefined,
                      };
                    })}
                  />
                  <AdminOpsList
                    title="Timeline"
                    empty="Aucun événement"
                    rows={operations.timeline.slice(0, 6).map((event) => ({
                      id: event.id,
                      main: event.title,
                      meta: `${new Date(event.createdAt).toLocaleDateString("fr-FR")}${
                        event.description ? ` · ${event.description}` : ""
                      }`,
                    }))}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data sections */}
        <div className="grid gap-4 md:grid-cols-2">
          {personalFields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>{renderFieldsTable(personalFields)}</CardContent>
            </Card>
          )}

          {vehicleFields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Détails véhicule</CardTitle>
              </CardHeader>
              <CardContent>{renderFieldsTable(vehicleFields)}</CardContent>
            </Card>
          )}

          {activityFields.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm">Activité VTC</CardTitle>
              </CardHeader>
              <CardContent>{renderFieldsTable(activityFields)}</CardContent>
            </Card>
          )}
        </div>

        {/* Documents */}
        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-sm">Documents</CardTitle>
                <CardDescription>
                  {documentCompletion.uploaded}/{documentCompletion.required}{" "}
                  requis reçus · {documentCompletion.approved}/
                  {documentCompletion.required} validés
                </CardDescription>
              </div>
              {missingDocumentCategories.length > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={requestMissingDocuments}
                  disabled={updating}
                >
                  <Send className="h-3.5 w-3.5" />
                  Demander les manquants
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documentCategories
                .filter((category) => category.required)
                .map((category) => {
                  const file = getLatestFileByCategory(files, category.value);
                  return (
                    <div key={category.value} className="rounded-lg border p-3">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-medium">
                                {category.label}
                              </p>
                              {documentReviewBadge(file)}
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {category.description}
                            </p>
                            {file && (
                              <p className="mt-1 truncate text-xs text-muted-foreground">
                                {file.originalName} ·{" "}
                                {formatFileSize(file.size)} ·{" "}
                                {file.createdAt
                                  ? new Date(file.createdAt).toLocaleDateString(
                                      "fr-FR",
                                    )
                                  : "Aujourd'hui"}
                              </p>
                            )}
                            {file?.reviewNotes && (
                              <p className="mt-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                                {file.reviewNotes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center gap-1">
                          {file ? (
                            <>
                              {file.reviewStatus !== "APPROVED" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateFileReview(file.id, "APPROVED")
                                  }
                                  disabled={updating}
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Valider
                                </Button>
                              )}
                              <Button
                                variant={
                                  file.reviewStatus === "REJECTED"
                                    ? "secondary"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => rejectFile(file)}
                                disabled={updating}
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                Corriger
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => downloadFile(file.key)}
                                title="Télécharger"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => handleDeleteFile(file.id)}
                                title="Supprimer"
                              >
                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                              </Button>
                            </>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              En attente du candidat
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {extraFiles.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Compléments
                </p>
                <div className="space-y-2">
                  {extraFiles.map((file) => {
                    const category = getDocumentCategory(file.documentCategory);
                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate text-sm font-medium">
                                {file.originalName}
                              </p>
                              <Badge variant="outline">{category.label}</Badge>
                              {documentReviewBadge(file)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} ·{" "}
                              {file.createdAt
                                ? new Date(file.createdAt).toLocaleDateString(
                                    "fr-FR",
                                  )
                                : "Aujourd'hui"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {file.reviewStatus !== "APPROVED" && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() =>
                                updateFileReview(file.id, "APPROVED")
                              }
                              title="Valider"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => rejectFile(file)}
                            title="Corriger"
                          >
                            <XCircle className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => downloadFile(file.key)}
                            title="Télécharger"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDeleteFile(file.id)}
                            title="Supprimer"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Notes internes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajouter des notes sur cette candidature..."
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="mt-2 flex justify-end">
              <Button size="sm" variant="outline" onClick={saveNotes}>
                Enregistrer les notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminOpsList({
  title,
  empty,
  rows,
}: {
  title: string;
  empty: string;
  rows: Array<{
    id: string;
    main: string;
    meta: string;
    action?: () => void | Promise<void | boolean>;
  }>;
}) {
  return (
    <div className="rounded-lg border">
      <div className="border-b px-4 py-3">
        <div className="text-sm font-medium">{title}</div>
      </div>
      <div className="divide-y">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{row.main}</div>
              <div className="truncate text-xs text-muted-foreground">
                {row.meta}
              </div>
            </div>
            {row.action && (
              <Button variant="outline" size="xs" onClick={() => row.action?.()}>
                Action
              </Button>
            )}
          </div>
        ))}
        {rows.length === 0 && (
          <div className="px-4 py-6 text-sm text-muted-foreground">
            {empty}
          </div>
        )}
      </div>
    </div>
  );
}

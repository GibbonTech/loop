import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Clock,
  Check,
  Loader2,
  Calendar,
  Upload,
  MessageCircle,
  Info,
  CheckCircle,
  XCircle,
  Download,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useSession, signOut } from "~/lib/auth/auth-client";
import { validateSession } from "~/lib/auth/auth-functions";
import {
  documentCategories,
  getDocumentCategory,
  getDocumentCompletion,
  getLatestFileByCategory,
  type DocumentCategory,
} from "~/lib/documents";

export const Route = createFileRoute("/espace")({
  beforeLoad: async () => {
    const auth = await validateSession();
    if (!auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
    return { user: auth.user };
  },
  component: EspacePage,
});

interface Application {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  submittedAt: string;
}

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

interface Meeting {
  id: string;
  scheduledDate: string;
  timeSlot: string;
  status: string;
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
    sentAt?: string | null;
    signedAt?: string | null;
  } | null;
  onboardingTasks: Array<{
    id: string;
    taskKey: string;
    label: string;
    status: string;
    completedAt?: string | null;
  }>;
  monthlyActivities: Array<{
    id: string;
    period: string;
    status: string;
    declaredRevenue: number;
    platformBreakdown?: Record<string, number> | null;
    notes?: string | null;
  }>;
  invoices: Array<{
    id: string;
    invoiceNumber: string;
    recipient: string;
    amountTTC: number;
    status: string;
    fileId?: string | null;
  }>;
  payments: Array<{
    id: string;
    invoiceId: string;
    amount: number;
    status: string;
    receivedAt?: string | null;
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
    netSalary: number;
    payoutAmount: number;
    status: string;
    payslipFileId?: string | null;
  }>;
  timeline: Array<{
    id: string;
    title: string;
    description?: string | null;
    eventType: string;
    createdAt: string;
  }>;
  filesById: Record<string, StoredFile>;
}

const formatEuro = (value?: number | null) =>
  `${Math.round(value || 0).toLocaleString("fr-FR")} €`;

const whatsappContactUrl =
  "https://wa.me/?text=Bonjour%20Driivo%2C%20j%27ai%20une%20question%20sur%20mon%20espace%20chauffeur.";

function EspacePage() {
  const { data: session, isPending } = useSession();
  const [application, setApplication] = useState<Application | null>(null);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [operations, setOperations] = useState<OperationsBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "operations" | "documents" | "support"
  >("dashboard");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingDocumentCategoryRef = useRef<DocumentCategory>("OTHER");

  useEffect(() => {
    if (session?.user) {
      fetchLatestApplication();
      fetchMeetings();
    }
  }, [session]);

  const fetchLatestApplication = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      if (data.success && data.data?.length > 0) {
        setApplication(data.data[0]);
        fetchFiles(data.data[0].id);
        fetchOperations(data.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOperations = async (applicationId: string) => {
    try {
      const response = await fetch(
        `/api/operations?applicationId=${encodeURIComponent(applicationId)}`,
      );
      const data = await response.json();
      if (data.success) setOperations(data.data || null);
    } catch (error) {
      console.error("Error fetching operations:", error);
    }
  };

  const submitOperation = async (payload: Record<string, unknown>) => {
    if (!application) return false;
    try {
      const response = await fetch("/api/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: application.id,
          profileId: operations?.profile?.id,
          ...payload,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        toast.error(data.error || "Mise à jour impossible");
        return false;
      }
      setOperations(data.data || null);
      return true;
    } catch (error) {
      console.error("Operations error:", error);
      toast.error("Mise à jour impossible");
      return false;
    }
  };

  const fetchFiles = async (entityId: string) => {
    try {
      const response = await fetch(`/api/files?entityId=${entityId}`);
      const data = await response.json();
      if (data.success) setFiles(data.data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const response = await fetch("/api/meetings");
      const data = await response.json();
      if (data.success) setMeetings(data.data || []);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !application) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("entityType", "APPLICATION");
      formData.append("entityId", application.id);
      formData.append("documentCategory", pendingDocumentCategoryRef.current);
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setFiles((prev) => [...prev, data.file]);
        toast.success("Document téléversé");
      } else {
        toast.error(data.error || "Erreur lors du téléversement");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Erreur lors du téléversement");
    } finally {
      setUploading(false);
      pendingDocumentCategoryRef.current = "OTHER";
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const startDocumentUpload = (category: DocumentCategory) => {
    pendingDocumentCategoryRef.current = category;
    fileInputRef.current?.click();
  };

  const downloadFile = async (key: string) => {
    try {
      const response = await fetch(`/api/files?key=${encodeURIComponent(key)}`);
      const data = await response.json();
      if (data.success && data.url) window.open(data.url, "_blank");
      else toast.error(data.error || "Téléchargement impossible");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Téléchargement impossible");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  const getDocumentStatusInfo = (file?: StoredFile) => {
    if (!file) {
      return {
        label: "Manquant",
        className: "bg-gray-100 text-gray-500",
        icon: AlertCircle,
      };
    }
    if (file.reviewStatus === "APPROVED") {
      return {
        label: "Validé",
        className: "bg-emerald-100 text-emerald-700",
        icon: CheckCircle,
      };
    }
    if (file.reviewStatus === "REJECTED") {
      return {
        label: "À corriger",
        className: "bg-red-100 text-red-700",
        icon: XCircle,
      };
    }
    return {
      label: "En revue",
      className: "bg-amber-100 text-amber-700",
      icon: Clock,
    };
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "APPROVED":
        return {
          label: "Candidature approuvée",
          description: "Félicitations ! Votre candidature a été acceptée.",
          icon: CheckCircle,
          color: "green",
          borderColor: "border-green-400",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
        };
      case "REJECTED":
        return {
          label: "Candidature refusée",
          description:
            "Nous sommes désolés, votre candidature n'a pas été retenue.",
          icon: XCircle,
          color: "red",
          borderColor: "border-red-400",
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        };
      case "UNDER_REVIEW":
        return {
          label: "Candidature en examen",
          description: "Notre équipe examine votre dossier en détail.",
          icon: Loader2,
          color: "blue",
          borderColor: "border-blue-400",
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
        };
      default:
        return {
          label: "Candidature en cours de vérification",
          description: "Notre équipe examine votre dossier. Réponse sous 24h.",
          icon: Clock,
          color: "amber",
          borderColor: "border-amber-400",
          bgColor: "bg-amber-100",
          textColor: "text-amber-600",
        };
    }
  };

  const statusInfo = application
    ? getStatusInfo(application.status)
    : getStatusInfo("SUBMITTED");
  const StatusIcon = statusInfo.icon;
  const nextMeeting = meetings
    .filter((meeting) => meeting.status === "SCHEDULED")
    .sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime(),
    )[0];
  const hasMeeting = meetings.length > 0;
  const sessionName = session?.user?.name || "";
  const userName =
    application?.firstName || sessionName.split(" ")[0] || "Candidat";
  const userInitials = application
    ? `${application.firstName?.[0] || ""}${application.lastName?.[0] || ""}`.toUpperCase()
    : sessionName
      ? sessionName
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "D";
  const documentCompletion = getDocumentCompletion(files);
  const canUseOperations = Boolean(
    operations?.profile || application?.status === "APPROVED",
  );
  const activeTabLabel =
    activeTab === "documents"
      ? "Documents"
      : activeTab === "operations"
        ? "Activité & paie"
        : activeTab === "support"
          ? "Support"
          : "Accueil";

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-tight text-gray-900">
            <div className="h-2 w-2 rounded-full bg-[#fd521a]"></div>
            Driivo
          </div>
          <h1 className="mb-2 text-lg font-semibold text-gray-900">
            Aucune candidature active
          </h1>
          <p className="mb-5 text-sm text-gray-500">
            Cet espace est prêt, mais aucune candidature n&apos;est reliée à ce
            compte.
          </p>
          <div className="flex gap-2">
            <Link
              to="/inscription"
              className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-gray-900 px-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Déposer une candidature
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-56 flex-col border-r border-gray-200 bg-gray-50 md:flex">
          {/* Logo */}
          <div className="p-5">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold tracking-tight text-gray-900"
            >
              <div className="h-2 w-2 rounded-full bg-[#fd521a]"></div>
              Driivo
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-0.5 px-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                activeTab === "dashboard"
                  ? "bg-white font-medium text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Accueil
            </button>
            {canUseOperations && (
              <button
                onClick={() => setActiveTab("operations")}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                  activeTab === "operations"
                    ? "bg-white font-medium text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                }`}
              >
                <FileText className="h-4 w-4" />
                Activité & paie
              </button>
            )}
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                activeTab === "documents"
                  ? "bg-white font-medium text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
            >
              <FileText className="h-4 w-4" />
              Documents
              <span className="ml-auto text-xs text-gray-400">
                {documentCompletion.uploaded}/{documentCompletion.required}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                activeTab === "support"
                  ? "bg-white font-medium text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              Support
            </button>
            <Link
              to="/reunion"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
            >
              <Calendar className="h-4 w-4" />
              Réserver un appel
            </Link>
          </nav>

          {/* User + Logout */}
          <div className="border-t border-gray-200 p-3">
            <div className="mb-2 flex items-center gap-2.5 rounded-md px-3 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                {userInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-gray-900">
                  {application?.firstName} {application?.lastName}
                </div>
                <div className="truncate text-xs text-gray-500">
                  {application?.email}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-white hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3 md:px-8">
            <div className="flex items-center gap-3 md:hidden">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-semibold tracking-tight text-gray-900"
              >
                <div className="h-2 w-2 rounded-full bg-[#fd521a]"></div>
                Driivo
              </Link>
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-medium text-gray-900">
                {activeTabLabel}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {application?.email}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white md:hidden">
                {userInitials}
              </div>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8 md:py-8">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <div
              className={`mb-5 grid rounded-lg border border-gray-200 bg-gray-50 p-1 md:hidden ${
                canUseOperations ? "grid-cols-4" : "grid-cols-3"
              }`}
            >
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium ${
                  activeTab === "dashboard"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Accueil
              </button>
              {canUseOperations && (
                <button
                  onClick={() => setActiveTab("operations")}
                  className={`flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium ${
                    activeTab === "operations"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Paie
                </button>
              )}
              <button
                onClick={() => setActiveTab("documents")}
                className={`flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium ${
                  activeTab === "documents"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <FileText className="h-4 w-4" />
                Docs
              </button>
              <button
                onClick={() => setActiveTab("support")}
                className={`flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium ${
                  activeTab === "support"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                Aide
              </button>
            </div>
            {/* Header */}
            <div className="mb-6">
              <h2 className="mb-1 text-lg font-semibold text-gray-900">
                Bonjour {userName}
              </h2>
              <p className="text-sm text-gray-500">
                Votre dossier, vos documents, votre activité et vos bulletins.
              </p>
            </div>

            {/* Status Banner */}
            <div
              className={`mb-6 flex items-center gap-4 rounded-lg border p-4 ${statusInfo.borderColor} ${statusInfo.bgColor}`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-white ${statusInfo.textColor}`}
              >
                <StatusIcon
                  className={`h-4 w-4 ${statusInfo.icon === Loader2 ? "animate-spin" : ""}`}
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {statusInfo.label}
                </div>
                <div className="text-xs text-gray-500">
                  {statusInfo.description}
                </div>
              </div>
            </div>

            {activeTab === "dashboard" && (
              <>
                {/* Dynamic Checklist */}
                {(() => {
                  const status = application?.status || "SUBMITTED";
                  const steps = [
                    {
                      label: "Candidature envoyée",
                      done: true,
                      date: application?.submittedAt || application?.createdAt,
                    },
                    {
                      label: "Dossier en cours d'examen",
                      done: ["UNDER_REVIEW", "APPROVED", "REJECTED"].includes(
                        status,
                      ),
                      inProgress: status === "SUBMITTED",
                    },
                    {
                      label: "Documents requis téléversés",
                      done: documentCompletion.uploadComplete,
                      action: documentCompletion.uploadComplete
                        ? undefined
                        : () => setActiveTab("documents"),
                      actionLabel: "Compléter",
                    },
                    {
                      label: "Entretien téléphonique",
                      done: hasMeeting,
                      actionLabel: "Réserver",
                      actionLink: hasMeeting ? undefined : "/reunion",
                    },
                    { label: "Validation finale", done: status === "APPROVED" },
                  ];
                  const completedCount = steps.filter((s) => s.done).length;
                  return (
                    <div className="mb-6 rounded-lg border border-gray-200 bg-white">
                      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          Progression
                        </h3>
                        <span className="text-xs text-gray-500">
                          {completedCount}/{steps.length}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {steps.map((step, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 px-5 py-3"
                          >
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                                step.done
                                  ? "bg-emerald-100 text-emerald-600"
                                  : step.inProgress
                                    ? "bg-amber-100 text-amber-600"
                                    : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {step.done ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : step.inProgress ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <span className="text-xs font-medium">
                                  {i + 1}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`text-sm ${step.done || step.inProgress ? "text-gray-900" : "text-gray-400"}`}
                              >
                                {step.label}
                              </div>
                              {step.done && step.date && (
                                <div className="text-xs text-gray-400">
                                  {new Date(step.date).toLocaleDateString(
                                    "fr-FR",
                                  )}
                                </div>
                              )}
                            </div>
                            {step.actionLink && !step.done && (
                              <Link
                                to={step.actionLink}
                                className="text-xs font-medium text-gray-900 hover:underline"
                              >
                                {step.actionLabel}
                              </Link>
                            )}
                            {step.action && !step.done && (
                              <button
                                onClick={step.action}
                                className="text-xs font-medium text-gray-900 hover:underline"
                              >
                                {step.actionLabel}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* App shortcuts */}
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-gray-900">
                    Mon espace
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <button
                      onClick={() => setActiveTab("documents")}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <FileText className="mb-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        Mes documents
                      </div>
                      <div className="text-xs text-gray-500">
                        {documentCompletion.uploaded}/
                        {documentCompletion.required} reçus
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("operations")}
                      disabled={!canUseOperations}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Upload className="mb-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        Mon activité
                      </div>
                      <div className="text-xs text-gray-500">
                        {operations?.monthlyActivities[0]?.period ||
                          "Après activation"}
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("operations")}
                      disabled={!canUseOperations}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FileText className="mb-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        Fiches de paie
                      </div>
                      <div className="text-xs text-gray-500">
                        {operations?.payrollSummaries[0]?.period ||
                          "En préparation"}
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("operations")}
                      disabled={!canUseOperations}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Download className="mb-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        Factures & paiements
                      </div>
                      <div className="text-xs text-gray-500">
                        {operations?.invoices.length || 0} facture
                        {operations?.invoices.length === 1 ? "" : "s"}
                      </div>
                    </button>
                    <Link
                      to="/reunion"
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                    >
                      <Calendar className="mb-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        Rendez-vous
                      </div>
                      <div className="text-xs text-gray-500">
                        {nextMeeting
                          ? new Date(
                              nextMeeting.scheduledDate,
                            ).toLocaleDateString("fr-FR")
                          : "Réserver un appel"}
                      </div>
                    </Link>
                    <button
                      onClick={() => setActiveTab("support")}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <MessageCircle className="mb-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        Support
                      </div>
                      <div className="text-xs text-gray-500">
                        WhatsApp ou email
                      </div>
                    </button>
                  </div>
                </div>

                {/* Info Card */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    <div>
                      <div className="mb-0.5 text-sm font-medium text-gray-900">
                        Prochaine étape
                      </div>
                      <p className="text-xs text-gray-500">
                        {application?.status === "APPROVED"
                          ? "Félicitations ! Votre candidature est approuvée. Nous vous contacterons sous peu pour la signature du contrat."
                          : application?.status === "REJECTED"
                            ? "Votre candidature n'a pas été retenue. N'hésitez pas à nous contacter pour plus d'informations."
                            : nextMeeting
                              ? `Appel prévu le ${new Date(nextMeeting.scheduledDate).toLocaleDateString("fr-FR")} à ${nextMeeting.timeSlot}.`
                              : "Ajoutez vos documents puis réservez un court entretien téléphonique (15 min)."}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "operations" && (
              <OperationsPanel
                operations={operations}
                onSubmit={submitOperation}
                onDownload={downloadFile}
              />
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <>
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Documents requis
                    </h3>
                    <p className="text-xs text-gray-500">
                      {documentCompletion.uploaded}/
                      {documentCompletion.required} déposés ·{" "}
                      {documentCompletion.approved}/
                      {documentCompletion.required} validés
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Une fois envoyé, un document reste dans votre dossier pour
                      garder la traçabilité.
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Utilisez les boutons de chaque ligne pour les documents
                      obligatoires. Le bouton complément sert aux pièces
                      additionnelles.
                    </p>
                  </div>
                  <button
                    onClick={() => startDocumentUpload("OTHER")}
                    disabled={uploading}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-gray-900 px-3 text-xs font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    {uploading ? "Envoi..." : "Ajouter un complément"}
                  </button>
                </div>

                <div className="mb-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                    <div className="text-xs text-gray-500">Documents reçus</div>
                    <div className="mt-1 text-xl font-semibold text-gray-900">
                      {documentCompletion.uploaded}/
                      {documentCompletion.required}
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                    <div className="text-xs text-gray-500">Validés</div>
                    <div className="mt-1 text-xl font-semibold text-emerald-600">
                      {documentCompletion.approved}
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                    <div className="text-xs text-gray-500">À compléter</div>
                    <div className="mt-1 text-xl font-semibold text-amber-600">
                      {documentCompletion.missing}
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                  {documentCategories
                    .filter((category) => category.required)
                    .map((category) => {
                      const file = getLatestFileByCategory(
                        files,
                        category.value,
                      );
                      const status = getDocumentStatusInfo(file);
                      const StatusIcon = status.icon;
                      return (
                        <div
                          key={category.value}
                          className="border-b border-gray-100 px-4 py-4 last:border-b-0"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-start gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100">
                                <FileText className="h-4 w-4 text-gray-500" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-medium text-gray-900">
                                    {category.label}
                                  </p>
                                  <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${status.className}`}
                                  >
                                    <StatusIcon className="h-3 w-3" />
                                    {status.label}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-xs text-gray-500">
                                  {category.description}
                                </p>
                                {file && (
                                  <p className="mt-1 truncate text-xs text-gray-400">
                                    {file.originalName} ·{" "}
                                    {formatFileSize(file.size)} ·{" "}
                                    {file.createdAt
                                      ? new Date(
                                          file.createdAt,
                                        ).toLocaleDateString("fr-FR")
                                      : "Aujourd'hui"}
                                  </p>
                                )}
                                {file?.reviewStatus === "REJECTED" &&
                                  file.reviewNotes && (
                                    <p className="mt-2 rounded-md bg-red-50 px-2 py-1 text-xs text-red-700">
                                      {file.reviewNotes}
                                    </p>
                                  )}
                              </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              {file && (
                                <button
                                  onClick={() => downloadFile(file.key)}
                                  className="inline-flex h-8 items-center justify-center rounded-md border border-gray-200 px-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                  <Download className="mr-1 h-3.5 w-3.5" />
                                  Voir
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  startDocumentUpload(category.value)
                                }
                                disabled={uploading}
                                className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-2.5 text-xs font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Upload className="mr-1 h-3.5 w-3.5" />
                                {file
                                  ? "Ajouter une version"
                                  : "Téléverser ce document"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-medium text-gray-900">
                    Compléments optionnels
                  </h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    {documentCategories
                      .filter((category) => !category.required)
                      .map((category) => {
                        const file = getLatestFileByCategory(
                          files,
                          category.value,
                        );
                        const categoryInfo = getDocumentCategory(
                          category.value,
                        );
                        return (
                          <div
                            key={category.value}
                            className="rounded-lg border border-gray-200 bg-white p-4"
                          >
                            <div className="mb-1 text-sm font-medium text-gray-900">
                              {categoryInfo.label}
                            </div>
                            <p className="mb-3 min-h-[32px] text-xs text-gray-500">
                              {categoryInfo.description}
                            </p>
                            {file && (
                              <p className="mb-3 truncate text-xs text-gray-400">
                                {file.originalName} ·{" "}
                                {formatFileSize(file.size)}
                              </p>
                            )}
                            <div className="flex gap-2">
                              {file && (
                                <button
                                  onClick={() => downloadFile(file.key)}
                                  className="inline-flex h-8 flex-1 items-center justify-center rounded-md border border-gray-200 px-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                  <Download className="mr-1 h-3.5 w-3.5" />
                                  Voir
                                </button>
                              )}
                            </div>
                            <button
                              onClick={() =>
                                startDocumentUpload(category.value)
                              }
                              disabled={uploading}
                              className="mt-2 inline-flex h-8 w-full items-center justify-center rounded-md border border-gray-200 px-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Upload className="mr-1 h-3.5 w-3.5" />
                              {file
                                ? "Ajouter une version"
                                : "Ajouter ce complément"}
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}

            {activeTab === "support" && (
              <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
                <section className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="mb-4 text-sm font-medium text-gray-900">
                    Support Driivo
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={whatsappContactUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50"
                    >
                      <MessageCircle className="mb-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        WhatsApp
                      </div>
                      <div className="text-xs text-gray-500">
                        Réponse équipe Driivo
                      </div>
                    </a>
                    <a
                      href="mailto:contact@driivo.fr"
                      className="rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50"
                    >
                      <FileText className="mb-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">
                        Email
                      </div>
                      <div className="text-xs text-gray-500">
                        contact@driivo.fr
                      </div>
                    </a>
                  </div>

                  <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-2 text-sm font-medium text-gray-900">
                      Résumé de votre espace
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <div className="text-xs text-gray-500">Documents</div>
                        <div className="text-sm font-medium text-gray-900">
                          {documentCompletion.approved}/
                          {documentCompletion.required} validés
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Dossier</div>
                        <div className="text-sm font-medium text-gray-900">
                          {statusInfo.label}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">RDV</div>
                        <div className="text-sm font-medium text-gray-900">
                          {nextMeeting
                            ? `${new Date(nextMeeting.scheduledDate).toLocaleDateString("fr-FR")} · ${nextMeeting.timeSlot}`
                            : "Aucun RDV actif"}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-gray-200 bg-white p-4">
                  <h3 className="mb-3 text-sm font-medium text-gray-900">
                    Dernières actions
                  </h3>
                  <div className="space-y-3">
                    {(operations?.timeline || []).slice(0, 5).map((event) => (
                      <div
                        key={event.id}
                        className="border-l border-gray-200 pl-3"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(event.createdAt).toLocaleDateString(
                            "fr-FR",
                          )}
                        </div>
                        {event.description && (
                          <p className="mt-0.5 text-xs text-gray-500">
                            {event.description}
                          </p>
                        )}
                      </div>
                    ))}
                    {(!operations?.timeline ||
                      operations.timeline.length === 0) && (
                      <p className="text-sm text-gray-500">
                        Les actions Driivo apparaîtront ici.
                      </p>
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function OperationsPanel({
  operations,
  onSubmit,
  onDownload,
}: {
  operations: OperationsBundle | null;
  onSubmit: (payload: Record<string, unknown>) => Promise<boolean>;
  onDownload: (key: string) => Promise<void>;
}) {
  const currentPeriod = new Date().toISOString().slice(0, 7);
  const [activityForm, setActivityForm] = useState({
    period: currentPeriod,
    uber: "",
    bolt: "",
    heetch: "",
    freenow: "",
    other: "",
    notes: "",
  });
  const [expenseForm, setExpenseForm] = useState({
    category: "Carburant",
    amount: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!operations?.profile) {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <div className="mb-1 text-sm font-medium text-gray-900">
          Dossier approuvé, activation en préparation
        </div>
        <p className="text-sm text-emerald-800">
          L'équipe Driivo va activer votre espace client, préparer le contrat et
          ouvrir votre premier mois d'activité.
        </p>
      </div>
    );
  }

  const profile = operations.profile;
  const contract = operations.contract;
  const latestActivity = operations.monthlyActivities[0];
  const latestPayroll = operations.payrollSummaries[0];
  const latestInvoice = operations.invoices[0];
  const latestPayment = operations.payments[0];
  const signedContractFile =
    contract?.signedFileId && operations.filesById[contract.signedFileId];
  const unsignedContractFile =
    contract?.unsignedFileId && operations.filesById[contract.unsignedFileId];

  const submitActivity = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const platformBreakdown = {
      Uber: activityForm.uber,
      Bolt: activityForm.bolt,
      Heetch: activityForm.heetch,
      FreeNow: activityForm.freenow,
      Autre: activityForm.other,
    };
    const declaredRevenue = Object.values(platformBreakdown).reduce(
      (sum, value) => sum + (Number(String(value).replace(",", ".")) || 0),
      0,
    );
    const ok = await onSubmit({
      action: "upsertMonthlyActivity",
      period: activityForm.period,
      declaredRevenue,
      platformBreakdown,
      notes: activityForm.notes,
    });
    if (ok) {
      toast.success("Déclaration envoyée");
      setActivityForm((prev) => ({
        ...prev,
        uber: "",
        bolt: "",
        heetch: "",
        freenow: "",
        other: "",
        notes: "",
      }));
    }
    setSubmitting(false);
  };

  const submitExpense = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const ok = await onSubmit({
      action: "submitExpense",
      category: expenseForm.category,
      amount: expenseForm.amount,
      description: expenseForm.description,
      monthlyActivityId: latestActivity?.id,
    });
    if (ok) {
      toast.success("Frais envoyé");
      setExpenseForm({ category: "Carburant", amount: "", description: "" });
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900">
          Activité, factures et paie
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          Déclarations, frais, bulletins et documents comptables.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-xs text-gray-500">Statut client</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {profile.status}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-xs text-gray-500">Contrat</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {contract?.status || "DRAFT"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-xs text-gray-500">Activité du mois</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {formatEuro(latestActivity?.declaredRevenue)}
          </div>
          <div className="mt-1 text-xs text-gray-400">
            {latestActivity?.period || "Aucun mois ouvert"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="text-xs text-gray-500">Fiche de paie</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {formatEuro(latestPayroll?.payoutAmount)}
          </div>
          <div className="mt-1 text-xs text-gray-400">
            {latestPayroll?.period || "En préparation"}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <OperationsMiniCard
          label="Facture"
          value={latestInvoice?.invoiceNumber || "Aucune"}
          meta={
            latestInvoice
              ? `${formatEuro(latestInvoice.amountTTC)} · ${latestInvoice.status}`
              : "Elle apparaîtra ici"
          }
        />
        <OperationsMiniCard
          label="Paiement"
          value={formatEuro(latestPayment?.amount)}
          meta={latestPayment?.status || "En attente"}
        />
        <OperationsMiniCard
          label="Frais"
          value={`${operations.expenses.length}`}
          meta="Notes envoyées"
        />
        <OperationsMiniCard
          label="Bulletins"
          value={`${operations.payrollSummaries.length}`}
          meta="Fiches disponibles"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Mes contrats
                </h3>
                <p className="text-xs text-gray-500">
                  Contrat, signature et documents liés.
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                {contract?.providerLabel || "Manual"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {signedContractFile && (
                <button
                  onClick={() => onDownload(signedContractFile.key)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md bg-gray-900 px-3 text-xs font-medium text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  Contrat signé
                </button>
              )}
              {!signedContractFile && unsignedContractFile && (
                <button
                  onClick={() => onDownload(unsignedContractFile.key)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-200 px-3 text-xs font-medium text-gray-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  Contrat à signer
                </button>
              )}
              {!signedContractFile && !unsignedContractFile && (
                <p className="text-sm text-gray-500">
                  Le contrat sera ajouté ici dès qu'il sera prêt.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-medium text-gray-900">
              Mon activité du mois
            </h3>
            <form onSubmit={submitActivity} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <input
                  type="month"
                  value={activityForm.period}
                  onChange={(e) =>
                    setActivityForm({ ...activityForm, period: e.target.value })
                  }
                  className="h-9 rounded-md border border-gray-200 px-3 text-sm"
                  required
                />
                {(["uber", "bolt", "heetch", "freenow", "other"] as const).map(
                  (key) => (
                    <input
                      key={key}
                      type="number"
                      min="0"
                      value={activityForm[key]}
                      onChange={(e) =>
                        setActivityForm({
                          ...activityForm,
                          [key]: e.target.value,
                        })
                      }
                      placeholder={key === "other" ? "Autre CA" : key}
                      className="h-9 rounded-md border border-gray-200 px-3 text-sm capitalize"
                    />
                  ),
                )}
              </div>
              <textarea
                value={activityForm.notes}
                onChange={(e) =>
                  setActivityForm({ ...activityForm, notes: e.target.value })
                }
                placeholder="Notes pour l'équipe Driivo"
                className="min-h-[76px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-9 items-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white disabled:opacity-50"
              >
                Envoyer la déclaration
              </button>
            </form>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-medium text-gray-900">
              Mes frais
            </h3>
            <form
              onSubmit={submitExpense}
              className="grid gap-3 sm:grid-cols-4"
            >
              <select
                value={expenseForm.category}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, category: e.target.value })
                }
                className="h-9 rounded-md border border-gray-200 px-3 text-sm"
              >
                <option>Carburant</option>
                <option>Recharge</option>
                <option>Lavage</option>
                <option>Péage</option>
                <option>Entretien</option>
                <option>Autre</option>
              </select>
              <input
                type="number"
                min="0"
                value={expenseForm.amount}
                onChange={(e) =>
                  setExpenseForm({ ...expenseForm, amount: e.target.value })
                }
                placeholder="Montant"
                className="h-9 rounded-md border border-gray-200 px-3 text-sm"
                required
              />
              <input
                value={expenseForm.description}
                onChange={(e) =>
                  setExpenseForm({
                    ...expenseForm,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                className="h-9 rounded-md border border-gray-200 px-3 text-sm"
              />
              <button
                type="submit"
                disabled={submitting}
                className="h-9 rounded-md bg-gray-900 px-3 text-sm font-medium text-white disabled:opacity-50"
              >
                Ajouter
              </button>
            </form>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-medium text-gray-900">
              Checklist onboarding
            </h3>
            <div className="space-y-2">
              {operations.onboardingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2 text-sm">
                  {task.status === "DONE" ? (
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-500" />
                  )}
                  <span
                    className={
                      task.status === "DONE" ? "text-gray-900" : "text-gray-500"
                    }
                  >
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-medium text-gray-900">Timeline</h3>
            <div className="space-y-3">
              {operations.timeline.slice(0, 6).map((event) => (
                <div key={event.id} className="border-l border-gray-200 pl-3">
                  <div className="text-sm font-medium text-gray-900">
                    {event.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(event.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                  {event.description && (
                    <p className="mt-0.5 text-xs text-gray-500">
                      {event.description}
                    </p>
                  )}
                </div>
              ))}
              {operations.timeline.length === 0 && (
                <p className="text-sm text-gray-500">
                  Les prochaines actions apparaîtront ici.
                </p>
              )}
            </div>
          </section>
        </aside>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OperationsList
          title="Mes activités"
          empty="Aucune activité déclarée"
          rows={operations.monthlyActivities.map((activity) => ({
            id: activity.id,
            main: activity.period,
            meta: `${formatEuro(activity.declaredRevenue)} · ${activity.status}`,
          }))}
        />
        <OperationsList
          title="Mes factures"
          empty="Aucune facture suivie"
          rows={operations.invoices.map((invoice) => {
            const invoiceFile =
              invoice.fileId && operations.filesById[invoice.fileId];
            return {
              id: invoice.id,
              main: invoice.invoiceNumber,
              meta: `${formatEuro(invoice.amountTTC)} · ${invoice.status}`,
              action: invoiceFile
                ? () => onDownload(invoiceFile.key)
                : undefined,
            };
          })}
        />
        <OperationsList
          title="Mes fiches de paie"
          empty="Aucun bulletin disponible"
          rows={operations.payrollSummaries.map((payroll) => {
            const payslip =
              payroll.payslipFileId &&
              operations.filesById[payroll.payslipFileId];
            return {
              id: payroll.id,
              main: payroll.period,
              meta: `${formatEuro(payroll.payoutAmount)} · ${payroll.status}`,
              action: payslip ? () => onDownload(payslip.key) : undefined,
            };
          })}
        />
        <OperationsList
          title="Mes paiements"
          empty="Aucun paiement suivi"
          rows={operations.payments.map((payment) => ({
            id: payment.id,
            main: formatEuro(payment.amount),
            meta: `${payment.status}${
              payment.receivedAt
                ? ` · ${new Date(payment.receivedAt).toLocaleDateString("fr-FR")}`
                : ""
            }`,
          }))}
        />
      </div>

      <OperationsList
        title="Mes frais envoyés"
        empty="Aucun frais envoyé"
        rows={operations.expenses.map((expense) => ({
          id: expense.id,
          main: expense.category,
          meta: `${formatEuro(expense.amount)} · ${expense.status}${
            expense.reviewNotes ? ` · ${expense.reviewNotes}` : ""
          }`,
        }))}
      />
    </div>
  );
}

function OperationsMiniCard({
  label,
  value,
  meta,
}: {
  label: string;
  value: string;
  meta: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 truncate text-sm font-semibold text-gray-900">
        {value}
      </div>
      <div className="mt-1 truncate text-xs text-gray-400">{meta}</div>
    </div>
  );
}

function OperationsList({
  title,
  empty,
  rows,
}: {
  title: string;
  empty: string;
  rows: Array<{ id: string; main: string; meta: string; action?: () => void }>;
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-medium text-gray-900">{title}</h3>
      <div className="divide-y divide-gray-100">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between py-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-gray-900">
                {row.main}
              </div>
              <div className="truncate text-xs text-gray-500">{row.meta}</div>
            </div>
            {row.action && (
              <button
                onClick={row.action}
                className="ml-2 inline-flex h-7 items-center rounded-md border border-gray-200 px-2 text-xs font-medium text-gray-700"
              >
                Voir
              </button>
            )}
          </div>
        ))}
        {rows.length === 0 && <p className="text-sm text-gray-500">{empty}</p>}
      </div>
    </section>
  );
}

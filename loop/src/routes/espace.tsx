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

function EspacePage() {
  const { data: session, isPending } = useSession();
  const [application, setApplication] = useState<Application | null>(null);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "documents">(
    "dashboard",
  );
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
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
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
              Tableau de bord
            </button>
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
                Tableau de bord
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
            <div className="mb-5 grid grid-cols-2 rounded-lg border border-gray-200 bg-gray-50 p-1 md:hidden">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium ${
                  activeTab === "dashboard"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Tableau
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium ${
                  activeTab === "documents"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                <FileText className="h-4 w-4" />
                Documents
              </button>
            </div>
            {/* Header */}
            <div className="mb-6">
              <h2 className="mb-1 text-lg font-semibold text-gray-900">
                Bonjour {userName}
              </h2>
              <p className="text-sm text-gray-500">
                Suivez l'avancement de votre dossier.
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

                {/* Quick Actions */}
                <div className="mb-6 grid gap-3 sm:grid-cols-3">
                  <Link
                    to="/reunion"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                  >
                    <Calendar className="mb-2 h-4 w-4 text-gray-400" />
                    <div className="text-sm font-medium text-gray-900">
                      Réserver un appel
                    </div>
                    <div className="text-xs text-gray-500">
                      Poser vos questions
                    </div>
                  </Link>
                  <button
                    onClick={() => setActiveTab("documents")}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <Upload className="mb-2 h-4 w-4 text-gray-400" />
                    <div className="text-sm font-medium text-gray-900">
                      Ajouter un document
                    </div>
                    <div className="text-xs text-gray-500">
                      {documentCompletion.uploaded}/
                      {documentCompletion.required} requis
                    </div>
                  </button>
                  <a
                    href="mailto:contact@driivo.fr"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                  >
                    <MessageCircle className="mb-2 h-4 w-4 text-gray-400" />
                    <div className="text-sm font-medium text-gray-900">
                      Contacter le support
                    </div>
                    <div className="text-xs text-gray-500">
                      contact@driivo.fr
                    </div>
                  </a>
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
                  </div>
                  <button
                    onClick={() => startDocumentUpload("OTHER")}
                    disabled={uploading}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-gray-900 px-3 text-xs font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    {uploading ? "Envoi..." : "Ajouter un autre document"}
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
                                {file ? "Remplacer" : "Téléverser"}
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
                            <button
                              onClick={() =>
                                startDocumentUpload(category.value)
                              }
                              disabled={uploading}
                              className="inline-flex h-8 w-full items-center justify-center rounded-md border border-gray-200 px-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Upload className="mr-1 h-3.5 w-3.5" />
                              {file ? "Remplacer" : "Ajouter"}
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

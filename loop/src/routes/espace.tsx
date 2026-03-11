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
} from "lucide-react";
import { useSession, signOut } from "~/lib/auth/auth-client";
import { validateSession } from "~/lib/auth/auth-functions";

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
}

function EspacePage() {
  const { data: session, isPending } = useSession();
  const [application, setApplication] = useState<Application | null>(null);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "documents">("dashboard");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      fetchLatestApplication();
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !application) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("entityType", "APPLICATION");
      formData.append("entityId", application.id);
      const response = await fetch("/api/files", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setFiles((prev) => [...prev, data.file]);
      } else {
        alert(data.error || "Erreur lors du téléversement");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erreur lors du téléversement");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const downloadFile = async (key: string) => {
    try {
      const response = await fetch(`/api/files?key=${encodeURIComponent(key)}`);
      const data = await response.json();
      if (data.success && data.url) window.open(data.url, "_blank");
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
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
          description: "Nous sommes désolés, votre candidature n'a pas été retenue.",
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

  const statusInfo = application ? getStatusInfo(application.status) : getStatusInfo("SUBMITTED");
  const StatusIcon = statusInfo.icon;
  const sessionName = session?.user?.name || "";
  const userName = application?.firstName || sessionName.split(" ")[0] || "Candidat";
  const userInitials = application
    ? `${application.firstName?.[0] || ""}${application.lastName?.[0] || ""}`.toUpperCase()
    : sessionName
      ? sessionName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
      : "D";

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
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
                activeTab === "dashboard" ? "bg-white font-medium text-gray-900 shadow-sm" : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                activeTab === "documents" ? "bg-white font-medium text-gray-900 shadow-sm" : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
            >
              <FileText className="h-4 w-4" />
              Documents
              {files.length > 0 && <span className="ml-auto text-xs text-gray-400">{files.length}</span>}
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
                <div className="truncate text-sm font-medium text-gray-900">{application?.firstName} {application?.lastName}</div>
                <div className="truncate text-xs text-gray-500">{application?.email}</div>
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
              <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-gray-900">
                <div className="h-2 w-2 rounded-full bg-[#fd521a]"></div>
                Driivo
              </Link>
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-medium text-gray-900">Tableau de bord</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">{application?.email}</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white md:hidden">
                {userInitials}
              </div>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8 md:py-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="mb-1 text-lg font-semibold text-gray-900">Bonjour {userName}</h2>
              <p className="text-sm text-gray-500">Suivez l'avancement de votre dossier.</p>
            </div>

            {/* Status Banner */}
            <div className={`mb-6 flex items-center gap-4 rounded-lg border p-4 ${statusInfo.borderColor} ${statusInfo.bgColor}`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-white ${statusInfo.textColor}`}>
                <StatusIcon className={`h-4 w-4 ${statusInfo.icon === Loader2 ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{statusInfo.label}</div>
                <div className="text-xs text-gray-500">{statusInfo.description}</div>
              </div>
            </div>

          {activeTab === "dashboard" && (
            <>
              {/* Dynamic Checklist */}
              {(() => {
                const status = application?.status || "SUBMITTED";
                const steps = [
                  { label: "Candidature envoyée", done: true, date: application?.submittedAt || application?.createdAt },
                  { label: "Dossier en cours d'examen", done: ["UNDER_REVIEW", "APPROVED", "REJECTED"].includes(status), inProgress: status === "SUBMITTED" },
                  { label: "Documents téléversés", done: files.length > 0, action: files.length === 0 ? () => setActiveTab("documents") : undefined, actionLabel: "Ajouter" },
                  { label: "Entretien téléphonique", done: status === "APPROVED", action: status !== "APPROVED" ? undefined : undefined, actionLabel: "Réserver", actionLink: "/reunion" },
                  { label: "Validation finale", done: status === "APPROVED" },
                ];
                const completedCount = steps.filter(s => s.done).length;
                return (
                  <div className="mb-6 rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
                      <h3 className="text-sm font-medium text-gray-900">Progression</h3>
                      <span className="text-xs text-gray-500">{completedCount}/{steps.length}</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-3 px-5 py-3">
                          <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                            step.done ? "bg-emerald-100 text-emerald-600" : step.inProgress ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400"
                          }`}>
                            {step.done ? <Check className="h-3.5 w-3.5" /> : step.inProgress ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <span className="text-xs font-medium">{i + 1}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm ${step.done || step.inProgress ? "text-gray-900" : "text-gray-400"}`}>{step.label}</div>
                            {step.done && step.date && (
                              <div className="text-xs text-gray-400">{new Date(step.date).toLocaleDateString("fr-FR")}</div>
                            )}
                          </div>
                          {step.actionLink && !step.done && (
                            <Link to={step.actionLink} className="text-xs font-medium text-gray-900 hover:underline">{step.actionLabel}</Link>
                          )}
                          {step.action && !step.done && (
                            <button onClick={step.action} className="text-xs font-medium text-gray-900 hover:underline">{step.actionLabel}</button>
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
                  <div className="text-sm font-medium text-gray-900">Réserver un appel</div>
                  <div className="text-xs text-gray-500">Poser vos questions</div>
                </Link>
                <button
                  onClick={() => setActiveTab("documents")}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50"
                >
                  <Upload className="mb-2 h-4 w-4 text-gray-400" />
                  <div className="text-sm font-medium text-gray-900">Ajouter un document</div>
                  <div className="text-xs text-gray-500">Carte VTC, permis...</div>
                </button>
                <a
                  href="mailto:contact@driivo.fr"
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50"
                >
                  <MessageCircle className="mb-2 h-4 w-4 text-gray-400" />
                  <div className="text-sm font-medium text-gray-900">Contacter le support</div>
                  <div className="text-xs text-gray-500">contact@driivo.fr</div>
                </a>
              </div>

              {/* Info Card */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <div>
                    <div className="mb-0.5 text-sm font-medium text-gray-900">Prochaine étape</div>
                    <p className="text-xs text-gray-500">
                      {application?.status === "APPROVED"
                        ? "Félicitations ! Votre candidature est approuvée. Nous vous contacterons sous peu pour la signature du contrat."
                        : application?.status === "REJECTED"
                        ? "Votre candidature n'a pas été retenue. N'hésitez pas à nous contacter pour plus d'informations."
                        : "Une fois vos documents validés, vous pourrez réserver un créneau pour un court entretien téléphonique (15 min)."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Documents</h3>
                <label className={`flex cursor-pointer items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:bg-gray-800 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                  <Upload className="h-3.5 w-3.5" />
                  {uploading ? "Envoi..." : "Téléverser"}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
              </div>

              {files.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                  <Upload className="mx-auto mb-3 h-8 w-8 text-gray-300" />
                  <p className="mb-0.5 text-sm font-medium text-gray-500">Aucun document</p>
                  <p className="text-xs text-gray-400">Téléversez vos documents : carte VTC, permis de conduire, etc.</p>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-100">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                          <FileText className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.originalName}</p>
                          <p className="text-xs text-gray-400">{formatFileSize(file.size)} · {file.createdAt ? new Date(file.createdAt).toLocaleDateString("fr-FR") : "Aujourd'hui"}</p>
                        </div>
                      </div>
                      <button onClick={() => downloadFile(file.key)} className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}

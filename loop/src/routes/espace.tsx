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
  const userName = application?.firstName || "Candidat";
  const userInitials = application
    ? `${application.firstName?.[0] || ""}${application.lastName?.[0] || ""}`.toUpperCase()
    : "??";

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#fd521a] border-t-transparent"></div>
          <p className="mt-4 text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-[#fd521a] selection:text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-gray-100 bg-white p-6 md:block">
          {/* Logo */}
          <Link
            to="/"
            className="mb-10 flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
            DRIIVO
          </Link>

          {/* Nav */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "dashboard" ? "bg-[#fd521a]/10 text-[#fd521a]" : "text-gray-500 hover:bg-[#fd521a]/10 hover:text-[#fd521a]"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "documents" ? "bg-[#fd521a]/10 text-[#fd521a]" : "text-gray-500 hover:bg-[#fd521a]/10 hover:text-[#fd521a]"
              }`}
            >
              <FileText className="h-5 w-5" />
              Documents {files.length > 0 && <span className="ml-auto rounded-full bg-[#fd521a] px-2 py-0.5 text-xs text-white">{files.length}</span>}
            </button>
            <Link
              to="/reunion"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]"
            >
              <Calendar className="h-5 w-5" />
              Réserver un appel
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </button>
          </nav>

          {/* User */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a] text-sm font-bold text-white">
                {userInitials}
              </div>
              <div>
                <div className="text-sm font-bold">{application?.firstName} {application?.lastName}</div>
                <div className="text-[10px] text-gray-400">{statusInfo.label}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          {/* Mobile Header */}
          <div className="mb-6 flex items-center justify-between md:hidden">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
              DRIIVO
            </Link>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a] text-sm font-bold text-white">
              {userInitials}
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold">Bonjour {userName} 👋</h1>
            <p className="text-gray-500">Voici où en est votre inscription.</p>
          </div>

          {/* Status Banner */}
          <div className={`mb-8 rounded-2xl border-l-4 ${statusInfo.borderColor} bg-white p-6 shadow-sm`}>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                <StatusIcon className={`h-6 w-6 ${statusInfo.icon === Loader2 ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <div className="font-bold">{statusInfo.label}</div>
                <div className="text-sm text-gray-500">
                  {statusInfo.description}
                </div>
              </div>
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
                  <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="font-bold">Votre progression</h2>
                      <span className="text-sm font-bold text-[#fd521a]">{completedCount}/{steps.length} complétées</span>
                    </div>
                    <div className="space-y-3">
                      {steps.map((step, i) => (
                        <div key={i} className={`flex items-center gap-4 rounded-xl border p-4 ${
                          step.done ? "border-green-100 bg-green-50" : step.inProgress ? "border-amber-100 bg-amber-50" : "border-gray-100 bg-gray-50"
                        }`}>
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${
                            step.done ? "bg-green-500" : step.inProgress ? "bg-amber-400" : "bg-gray-200 !text-gray-400"
                          }`}>
                            {step.done ? <Check className="h-4 w-4" /> : step.inProgress ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-sm font-bold">{i + 1}</span>}
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm font-bold ${!step.done && !step.inProgress ? "text-gray-400" : ""}`}>{step.label}</div>
                            {step.done && step.date && (
                              <div className="text-xs text-gray-500">Complétée le {new Date(step.date).toLocaleDateString("fr-FR")}</div>
                            )}
                            {step.inProgress && <div className="text-xs text-gray-500">En cours...</div>}
                          </div>
                          {step.actionLink && !step.done && (
                            <Link to={step.actionLink} className="text-xs font-bold text-[#fd521a] hover:underline">{step.actionLabel}</Link>
                          )}
                          {step.action && !step.done && (
                            <button onClick={step.action} className="text-xs font-bold text-[#fd521a] hover:underline">{step.actionLabel}</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Quick Actions */}
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                <Link
                  to="/reunion"
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <Calendar className="mb-3 h-6 w-6 text-[#fd521a]" />
                  <div className="text-sm font-bold">Réserver un appel</div>
                  <div className="text-xs text-gray-400">Poser vos questions</div>
                </Link>
                <button
                  onClick={() => setActiveTab("documents")}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg text-left"
                >
                  <Upload className="mb-3 h-6 w-6 text-[#fd521a]" />
                  <div className="text-sm font-bold">Ajouter un document</div>
                  <div className="text-xs text-gray-400">Carte VTC, permis...</div>
                </button>
                <a
                  href="mailto:contact@driivo.fr"
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <MessageCircle className="mb-3 h-6 w-6 text-[#fd521a]" />
                  <div className="text-sm font-bold">Contacter le support</div>
                  <div className="text-xs text-gray-400">contact@driivo.fr</div>
                </a>
              </div>

              {/* Info Card */}
              <div className="rounded-2xl border border-[#fd521a]/10 bg-[#fd521a]/5 p-6">
                <div className="flex items-start gap-4">
                  <Info className="h-6 w-6 shrink-0 text-[#fd521a]" />
                  <div>
                    <div className="mb-1 text-sm font-bold">Prochaine étape</div>
                    <p className="text-sm text-gray-600">
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
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold">Mes documents</h2>
                <label className={`flex cursor-pointer items-center gap-2 rounded-lg bg-[#fd521a] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                  <Upload className="h-4 w-4" />
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
                <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                  <Upload className="mx-auto mb-4 h-10 w-10 text-gray-300" />
                  <p className="mb-1 text-sm font-bold text-gray-400">Aucun document</p>
                  <p className="text-xs text-gray-400">Téléversez vos documents : carte VTC, permis de conduire, etc.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fd521a]/10">
                          <FileText className="h-5 w-5 text-[#fd521a]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{file.originalName}</p>
                          <p className="text-xs text-gray-400">{formatFileSize(file.size)} · {file.createdAt ? new Date(file.createdAt).toLocaleDateString("fr-FR") : "Aujourd'hui"}</p>
                        </div>
                      </div>
                      <button onClick={() => downloadFile(file.key)} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#fd521a]">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

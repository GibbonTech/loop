import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Car,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Circle,
  Copy,
  ExternalLink,
  User,
  Briefcase,
  MapPin,
} from "lucide-react";
import { useSession } from "~/lib/auth/auth-client";
import { validateSession } from "~/lib/auth/auth-functions";

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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  activityType: string;
  hasVtcLicense: string;
  yearsExperience: string;
  currentPlatforms: string;
  hasVehicle: string;
  vehicleType: string;
  monthlyRevenue: string;
  createdAt: string;
  submittedAt: string;
  formData: Record<string, unknown>;
}

function ApplicationDetailPage() {
  const { id } = Route.useParams();
  const { data: session, isPending: sessionPending } = useSession();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications?id=${id}`);
      const data = await response.json();
      if (data.success && data.data) {
        setApplication(data.data);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      await fetch(`/api/applications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      setApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (sessionPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <div className="relative mx-auto h-10 w-10">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#111]"></div>
            <div className="absolute inset-1 rounded-full bg-[#fafafa]"></div>
          </div>
          <p className="mt-4 text-[13px] text-[#666]">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2f2f2]">
            <User className="h-5 w-5 text-[#999]" />
          </div>
          <p className="mb-1 text-[15px] font-medium text-[#111]">
            Candidature introuvable
          </p>
          <p className="mb-6 text-[13px] text-[#666]">
            Cette candidature n'existe pas ou a été supprimée.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-md border border-[#eaeaea] bg-white px-4 py-2 text-[13px] font-medium text-[#111] shadow-sm transition-colors hover:bg-[#fafafa]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig: Record<string, { label: string; dot: string; bg: string; text: string }> = {
    SUBMITTED: { label: "En attente", dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
    APPROVED: { label: "Approuvée", dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
    REJECTED: { label: "Refusée", dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700" },
    UNDER_REVIEW: { label: "En examen", dot: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
  };

  const currentStatus = statusConfig[application.status] || statusConfig.SUBMITTED;
  const initials = `${(application.firstName?.[0] || "").toUpperCase()}${(application.lastName?.[0] || "").toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#eaeaea] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[56px] max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2 text-[13px]">
            <Link
              to="/admin"
              className="text-[#666] transition-colors hover:text-[#111]"
            >
              Tableau de bord
            </Link>
            <ChevronRight className="h-3 w-3 text-[#ccc]" />
            <span className="text-[#666]">Candidatures</span>
            <ChevronRight className="h-3 w-3 text-[#ccc]" />
            <span className="font-medium text-[#111]">
              {application.firstName} {application.lastName}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#999]">{id.slice(0, 12)}...</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Profile header */}
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#111] to-[#333] text-lg font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              {initials}
            </div>
            <div>
              <h1 className="text-[22px] font-semibold tracking-tight text-[#111]">
                {application.firstName} {application.lastName}
              </h1>
              <div className="mt-1 flex items-center gap-3 text-[13px] text-[#666]">
                <span>{application.email}</span>
                <span className="text-[#ddd]">·</span>
                <span>{application.phone || "—"}</span>
                <span className="text-[#ddd]">·</span>
                <span>
                  {new Date(application.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium ${currentStatus.bg} ${currentStatus.text}`}
            >
              <Circle className={`h-1.5 w-1.5 fill-current ${currentStatus.dot.replace("bg-", "text-")}`} />
              {currentStatus.label}
            </span>
          </div>
        </div>

        {/* Action bar */}
        <div className="mb-8 flex items-center gap-2 rounded-lg border border-[#eaeaea] bg-white p-2">
          <span className="px-3 text-[12px] font-medium text-[#999]">Actions</span>
          <div className="h-4 w-px bg-[#eaeaea]"></div>
          {application.status !== "APPROVED" && (
            <button
              onClick={() => updateStatus("APPROVED")}
              disabled={updating}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-50"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Approuver
            </button>
          )}
          {application.status !== "REJECTED" && (
            <button
              onClick={() => updateStatus("REJECTED")}
              disabled={updating}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              <XCircle className="h-3.5 w-3.5" />
              Refuser
            </button>
          )}
          {application.status !== "UNDER_REVIEW" && (
            <button
              onClick={() => updateStatus("UNDER_REVIEW")}
              disabled={updating}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-blue-700 transition-colors hover:bg-blue-50 disabled:opacity-50"
            >
              <Clock className="h-3.5 w-3.5" />
              En examen
            </button>
          )}
          <div className="flex-1"></div>
          <a
            href={`mailto:${application.email}`}
            className="flex items-center gap-1.5 rounded-md border border-[#eaeaea] px-3 py-1.5 text-[12px] font-medium text-[#666] transition-colors hover:bg-[#fafafa] hover:text-[#111]"
          >
            <Mail className="h-3.5 w-3.5" />
            Contacter
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column — 2 cols */}
          <div className="space-y-6 lg:col-span-2">
            {/* Personal info */}
            <div className="rounded-lg border border-[#eaeaea] bg-white">
              <div className="border-b border-[#eaeaea] px-5 py-3.5">
                <h2 className="flex items-center gap-2 text-[13px] font-semibold text-[#111]">
                  <User className="h-4 w-4 text-[#999]" />
                  Informations personnelles
                </h2>
              </div>
              <div className="grid gap-px bg-[#eaeaea] sm:grid-cols-2">
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Prénom
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.firstName || "—"}
                  </div>
                </div>
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Nom
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.lastName || "—"}
                  </div>
                </div>
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Email
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${application.email}`}
                      className="text-[14px] font-medium text-[#111] hover:underline"
                    >
                      {application.email}
                    </a>
                    <button
                      onClick={() => navigator.clipboard.writeText(application.email)}
                      className="rounded p-0.5 text-[#ccc] hover:text-[#666]"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Téléphone
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.phone || "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity info */}
            <div className="rounded-lg border border-[#eaeaea] bg-white">
              <div className="border-b border-[#eaeaea] px-5 py-3.5">
                <h2 className="flex items-center gap-2 text-[13px] font-semibold text-[#111]">
                  <Briefcase className="h-4 w-4 text-[#999]" />
                  Activité VTC
                </h2>
              </div>
              <div className="grid gap-px bg-[#eaeaea] sm:grid-cols-2">
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Type d'activité
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.activityType || "VTC"}
                  </div>
                </div>
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Carte VTC
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.hasVtcLicense || "—"}
                  </div>
                </div>
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Expérience
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.yearsExperience || "—"}
                  </div>
                </div>
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    CA mensuel visé
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.monthlyRevenue || "—"}
                  </div>
                </div>
                <div className="bg-white px-5 py-4 sm:col-span-2">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Plateformes
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.currentPlatforms || "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle */}
            <div className="rounded-lg border border-[#eaeaea] bg-white">
              <div className="border-b border-[#eaeaea] px-5 py-3.5">
                <h2 className="flex items-center gap-2 text-[13px] font-semibold text-[#111]">
                  <Car className="h-4 w-4 text-[#999]" />
                  Véhicule
                </h2>
              </div>
              <div className="grid gap-px bg-[#eaeaea] sm:grid-cols-2">
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Possède un véhicule
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.hasVehicle === "yes" ? "Oui" : application.hasVehicle === "no" ? "Non" : "—"}
                  </div>
                </div>
                <div className="bg-white px-5 py-4">
                  <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#999]">
                    Type de véhicule
                  </div>
                  <div className="text-[14px] font-medium text-[#111]">
                    {application.vehicleType || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — 1 col */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="rounded-lg border border-[#eaeaea] bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-[#111]">
                <Calendar className="h-4 w-4 text-[#999]" />
                Historique
              </h3>
              <div className="relative space-y-0">
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[#eaeaea]"></div>
                <div className="relative flex items-start gap-3 pb-4">
                  <div className="relative z-10 mt-0.5 h-[11px] w-[11px] rounded-full border-2 border-emerald-500 bg-white"></div>
                  <div>
                    <div className="text-[13px] font-medium text-[#111]">
                      Candidature créée
                    </div>
                    <div className="text-[11px] text-[#999]">
                      {new Date(application.createdAt).toLocaleString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
                {application.submittedAt && (
                  <div className="relative flex items-start gap-3 pb-4">
                    <div className="relative z-10 mt-0.5 h-[11px] w-[11px] rounded-full border-2 border-blue-500 bg-white"></div>
                    <div>
                      <div className="text-[13px] font-medium text-[#111]">Soumise</div>
                      <div className="text-[11px] text-[#999]">
                        {new Date(application.submittedAt).toLocaleString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                )}
                <div className="relative flex items-start gap-3">
                  <div
                    className={`relative z-10 mt-0.5 h-[11px] w-[11px] rounded-full border-2 bg-white ${
                      application.status === "APPROVED"
                        ? "border-emerald-500"
                        : application.status === "REJECTED"
                          ? "border-red-500"
                          : "border-[#ddd]"
                    }`}
                  ></div>
                  <div>
                    <div className="text-[13px] font-medium text-[#111]">
                      {currentStatus.label}
                    </div>
                    <div className="text-[11px] text-[#999]">Statut actuel</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ID card */}
            <div className="rounded-lg border border-[#eaeaea] bg-white p-5">
              <h3 className="mb-3 text-[13px] font-semibold text-[#111]">
                Métadonnées
              </h3>
              <div className="space-y-2.5">
                <div>
                  <div className="text-[11px] font-medium text-[#999]">ID</div>
                  <div className="flex items-center gap-1.5">
                    <code className="text-[12px] text-[#444]">{id}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(id)}
                      className="rounded p-0.5 text-[#ccc] hover:text-[#666]"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#999]">Statut</div>
                  <code className="text-[12px] text-[#444]">{application.status}</code>
                </div>
                <div>
                  <div className="text-[11px] font-medium text-[#999]">Créé le</div>
                  <code className="text-[12px] text-[#444]">
                    {new Date(application.createdAt).toISOString()}
                  </code>
                </div>
              </div>
            </div>

            {/* Back link */}
            <Link
              to="/admin"
              className="flex items-center gap-2 rounded-lg border border-[#eaeaea] bg-white px-4 py-3 text-[13px] font-medium text-[#666] transition-colors hover:border-[#ccc] hover:text-[#111]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

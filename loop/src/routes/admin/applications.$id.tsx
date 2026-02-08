import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Circle } from "lucide-react";
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
  const { isPending: sessionPending } = useSession();
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
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="relative h-5 w-5">
          <div className="absolute inset-0 animate-spin rounded-full border-[1.5px] border-transparent border-t-[#111]"></div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <p className="mb-1 text-[14px] text-[#111]">Candidature introuvable</p>
        <Link to="/admin" className="mt-4 text-[13px] text-[#888] hover:text-[#111]">
          ← Retour
        </Link>
      </div>
    );
  }

  const statusLabel: Record<string, string> = {
    SUBMITTED: "En attente",
    APPROVED: "Approuvée",
    REJECTED: "Refusée",
    UNDER_REVIEW: "En examen",
  };

  const personalFields = [
    { label: "Email", value: application.email },
    { label: "Téléphone", value: application.phone },
  ].filter((f) => f.value);

  const activityFields = [
    { label: "Type d'activité", value: application.activityType || "VTC" },
    { label: "Carte VTC", value: application.hasVtcLicense },
    { label: "Expérience", value: application.yearsExperience },
    { label: "CA mensuel visé", value: application.monthlyRevenue },
    { label: "Plateformes actuelles", value: application.currentPlatforms },
  ].filter((f) => f.value);

  const vehicleFields = [
    { label: "Possède un véhicule", value: application.hasVehicle === "yes" ? "Oui" : application.hasVehicle === "no" ? "Non" : "" },
    { label: "Type de véhicule", value: application.vehicleType },
  ].filter((f) => f.value);

  const statusBadge: Record<string, { bg: string; text: string; dot: string }> = {
    SUBMITTED: { bg: "bg-amber-50", text: "text-amber-700", dot: "text-amber-500" },
    APPROVED: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "text-emerald-500" },
    REJECTED: { bg: "bg-red-50", text: "text-red-600", dot: "text-red-400" },
    UNDER_REVIEW: { bg: "bg-blue-50", text: "text-blue-700", dot: "text-blue-500" },
  };

  const badge = statusBadge[application.status] || statusBadge.SUBMITTED;

  const renderSection = (title: string, sectionFields: typeof personalFields) => {
    if (sectionFields.length === 0) return null;
    return (
      <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="border-b border-[#f0f0f0] bg-[#fafafa] px-5 py-3">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#999]">
            {title}
          </h3>
        </div>
        {sectionFields.map((field, i) => (
          <div
            key={field.label}
            className={`flex items-center justify-between px-5 py-3.5 ${
              i !== sectionFields.length - 1 ? "border-b border-[#f0f0f0]" : ""
            }`}
          >
            <span className="text-[13px] text-[#888]">{field.label}</span>
            <span className="text-[13px] font-medium text-[#111]">{field.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="border-b border-[#eaeaea] bg-white">
        <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111]">
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#111]">
                Driivo
              </span>
            </div>
            <div className="h-4 w-px bg-[#e5e5e5]"></div>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-[13px] font-medium text-[#666] transition-colors hover:text-[#111]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour aux candidatures
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1120px] px-6 py-8">
        {/* Profile card */}
        <div className="mb-6 overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-start justify-between px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111] text-[16px] font-bold text-white">
                {(application.firstName?.[0] || "").toUpperCase()}
                {(application.lastName?.[0] || "").toUpperCase()}
              </div>
              <div>
                <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-[#111]">
                  {application.firstName} {application.lastName}
                </h1>
                <div className="mt-1 flex items-center gap-3 text-[13px] text-[#888]">
                  <span>{application.email}</span>
                  {application.phone && (
                    <>
                      <span className="text-[#ddd]">·</span>
                      <span>{application.phone}</span>
                    </>
                  )}
                </div>
                <div className="mt-1 text-[12px] text-[#aaa]">
                  Candidature déposée le{" "}
                  {new Date(application.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold ${badge.bg} ${badge.text}`}
            >
              <Circle className={`h-1.5 w-1.5 fill-current ${badge.dot}`} />
              {statusLabel[application.status] || application.status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 border-t border-[#f0f0f0] px-6 py-3">
            {application.status !== "APPROVED" && (
              <button
                onClick={() => updateStatus("APPROVED")}
                disabled={updating}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-40"
              >
                Approuver
              </button>
            )}
            {application.status !== "REJECTED" && (
              <button
                onClick={() => updateStatus("REJECTED")}
                disabled={updating}
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-40"
              >
                Refuser
              </button>
            )}
            {application.status !== "UNDER_REVIEW" && (
              <button
                onClick={() => updateStatus("UNDER_REVIEW")}
                disabled={updating}
                className="rounded-lg border border-[#e5e5e5] bg-white px-4 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#fafafa] disabled:opacity-40"
              >
                En examen
              </button>
            )}
            <div className="flex-1"></div>
            <a
              href={`mailto:${application.email}`}
              className="rounded-lg border border-[#e5e5e5] bg-white px-4 py-2 text-[12px] font-semibold text-[#555] transition-colors hover:bg-[#fafafa]"
            >
              Contacter par email
            </a>
          </div>
        </div>

        {/* Data sections */}
        <div className="space-y-4">
          {renderSection("Informations personnelles", personalFields)}
          {renderSection("Activité VTC", activityFields)}
          {renderSection("Véhicule", vehicleFields)}
        </div>
      </div>
    </div>
  );
}

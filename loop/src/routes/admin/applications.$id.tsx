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

  const statusColor: Record<string, string> = {
    SUBMITTED: "text-[#888]",
    APPROVED: "text-emerald-600",
    REJECTED: "text-red-500",
    UNDER_REVIEW: "text-blue-600",
  };

  const dotColor: Record<string, string> = {
    SUBMITTED: "text-[#ccc]",
    APPROVED: "text-emerald-500",
    REJECTED: "text-red-400",
    UNDER_REVIEW: "text-blue-500",
  };

  const fields = [
    { label: "Email", value: application.email },
    { label: "Téléphone", value: application.phone },
    { label: "Type d'activité", value: application.activityType || "VTC" },
    { label: "Carte VTC", value: application.hasVtcLicense },
    { label: "Expérience", value: application.yearsExperience },
    { label: "CA mensuel visé", value: application.monthlyRevenue },
    { label: "Plateformes", value: application.currentPlatforms },
    { label: "Véhicule", value: application.hasVehicle === "yes" ? "Oui" : application.hasVehicle === "no" ? "Non" : null },
    { label: "Type de véhicule", value: application.vehicleType },
  ].filter((f) => f.value);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#eaeaea]">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111]">
                <div className="h-1 w-1 rounded-full bg-white"></div>
              </div>
              <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#111]">
                Driivo
              </span>
            </div>
            <div className="h-4 w-px bg-[#eaeaea]"></div>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-[13px] text-[#888] transition-colors hover:text-[#111]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Candidatures
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6">
        {/* Name + status + date */}
        <div className="border-b border-[#eaeaea] py-10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[32px] font-light leading-none tracking-[-0.03em] text-[#111]">
                {application.firstName} {application.lastName}
              </h1>
              <div className="mt-3 flex items-center gap-4 text-[13px] text-[#888]">
                <span>{application.email}</span>
                {application.phone && (
                  <>
                    <span className="text-[#ddd]">·</span>
                    <span>{application.phone}</span>
                  </>
                )}
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

            <span
              className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${statusColor[application.status] || "text-[#888]"}`}
            >
              <Circle
                className={`h-[5px] w-[5px] fill-current ${dotColor[application.status] || "text-[#ccc]"}`}
              />
              {statusLabel[application.status] || application.status}
            </span>
          </div>
        </div>

        {/* Actions — just text buttons, no bar */}
        <div className="flex items-center gap-4 border-b border-[#eaeaea] py-4">
          {application.status !== "APPROVED" && (
            <button
              onClick={() => updateStatus("APPROVED")}
              disabled={updating}
              className="text-[13px] font-medium text-emerald-600 transition-colors hover:text-emerald-700 disabled:opacity-40"
            >
              Approuver
            </button>
          )}
          {application.status !== "REJECTED" && (
            <button
              onClick={() => updateStatus("REJECTED")}
              disabled={updating}
              className="text-[13px] font-medium text-red-500 transition-colors hover:text-red-600 disabled:opacity-40"
            >
              Refuser
            </button>
          )}
          {application.status !== "UNDER_REVIEW" && (
            <button
              onClick={() => updateStatus("UNDER_REVIEW")}
              disabled={updating}
              className="text-[13px] font-medium text-blue-600 transition-colors hover:text-blue-700 disabled:opacity-40"
            >
              En examen
            </button>
          )}
          <div className="flex-1"></div>
          <a
            href={`mailto:${application.email}`}
            className="text-[13px] text-[#888] transition-colors hover:text-[#111]"
          >
            Contacter
          </a>
        </div>

        {/* Data — clean rows, no cards */}
        <div>
          {fields.map((field, i) => (
            <div
              key={field.label}
              className={`flex items-center justify-between py-4 ${
                i !== fields.length - 1 ? "border-b border-[#f5f5f5]" : ""
              }`}
            >
              <span className="text-[13px] text-[#888]">{field.label}</span>
              <span className="text-[14px] text-[#111]">{field.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

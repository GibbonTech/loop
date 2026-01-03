import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Phone, Car, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { useSession } from "~/lib/auth/auth-client";

export const Route = createFileRoute("/admin/applications/$id")({
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
      setApplication((prev) => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (sessionPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#fd521a] border-t-transparent"></div>
          <p className="mt-4 text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Application non trouvée</p>
          <Link to="/admin" className="mt-4 text-[#fd521a] hover:underline">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    SUBMITTED: "bg-amber-100 text-amber-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    UNDER_REVIEW: "bg-blue-100 text-blue-800",
  };

  const statusLabels = {
    SUBMITTED: "En attente",
    APPROVED: "Approuvée",
    REJECTED: "Refusée",
    UNDER_REVIEW: "En cours d'examen",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
            <div className="h-6 w-px bg-gray-200"></div>
            <span className="text-lg font-bold tracking-tight">Détail candidature</span>
          </div>
          <span className="text-sm text-gray-500">{session?.user?.email}</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Status Bar */}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                statusColors[application.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
              }`}
            >
              {statusLabels[application.status as keyof typeof statusLabels] || application.status}
            </span>
            <span className="text-sm text-gray-500">
              Soumise le {new Date(application.createdAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
          <div className="flex gap-2">
            {application.status !== "APPROVED" && (
              <button
                onClick={() => updateStatus("APPROVED")}
                disabled={updating}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
              >
                <CheckCircle className="h-4 w-4" />
                Approuver
              </button>
            )}
            {application.status !== "REJECTED" && (
              <button
                onClick={() => updateStatus("REJECTED")}
                disabled={updating}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                <XCircle className="h-4 w-4" />
                Refuser
              </button>
            )}
            {application.status !== "UNDER_REVIEW" && (
              <button
                onClick={() => updateStatus("UNDER_REVIEW")}
                disabled={updating}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                <Clock className="h-4 w-4" />
                En examen
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 font-bold">Informations personnelles</h2>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium uppercase text-gray-400">Nom complet</div>
                <div className="text-lg font-medium">
                  {application.firstName} {application.lastName}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href={`mailto:${application.email}`} className="text-[#fd521a] hover:underline">
                  {application.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href={`tel:${application.phone}`} className="hover:underline">
                  {application.phone || "Non renseigné"}
                </a>
              </div>
            </div>
          </div>

          {/* Activity Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 font-bold">Activité VTC</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium uppercase text-gray-400">Type d'activité</div>
                  <div className="font-medium">{application.activityType || "VTC"}</div>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase text-gray-400">Carte VTC</div>
                  <div className="font-medium">{application.hasVtcLicense || "Non renseigné"}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium uppercase text-gray-400">Expérience</div>
                  <div className="font-medium">{application.yearsExperience || "Non renseigné"}</div>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase text-gray-400">CA mensuel visé</div>
                  <div className="font-medium">{application.monthlyRevenue || "Non renseigné"}</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase text-gray-400">Plateformes</div>
                <div className="font-medium">{application.currentPlatforms || "Non renseigné"}</div>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 font-bold">
              <Car className="h-5 w-5" />
              Véhicule
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium uppercase text-gray-400">Possède un véhicule</div>
                  <div className="font-medium">{application.hasVehicle === "yes" ? "Oui" : "Non"}</div>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase text-gray-400">Type de véhicule</div>
                  <div className="font-medium">{application.vehicleType || "Non renseigné"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 font-bold">
              <Calendar className="h-5 w-5" />
              Historique
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="text-sm">
                  <span className="font-medium">Candidature créée</span>
                  <span className="ml-2 text-gray-500">
                    {new Date(application.createdAt).toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>
              {application.submittedAt && (
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="text-sm">
                    <span className="font-medium">Soumise</span>
                    <span className="ml-2 text-gray-500">
                      {new Date(application.submittedAt).toLocaleString("fr-FR")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

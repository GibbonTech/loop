import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Wallet,
  Settings,
  Clock,
  Check,
  Loader2,
  Calendar,
  Upload,
  MessageCircle,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/espace")({
  component: EspacePage,
});

interface Application {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

function EspacePage() {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestApplication();
  }, []);

  const fetchLatestApplication = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      if (data.success && data.data?.length > 0) {
        // Get the most recent application
        setApplication(data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
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
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl bg-[#fd521a]/10 px-4 py-3 text-sm font-medium text-[#fd521a]"
            >
              <LayoutDashboard className="h-5 w-5" />
              Tableau de bord
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]"
            >
              <FileText className="h-5 w-5" />
              Documents
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]"
            >
              <BarChart3 className="h-5 w-5" />
              Activité
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]"
            >
              <Wallet className="h-5 w-5" />
              Paiements
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]"
            >
              <Settings className="h-5 w-5" />
              Paramètres
            </a>
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

          {/* Onboarding Checklist */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-bold">Votre progression</h2>
              <span className="text-sm font-bold text-[#fd521a]">2/5 complétées</span>
            </div>

            <div className="space-y-3">
              {/* Step 1 - Completed */}
              <div className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">Candidature envoyée</div>
                  <div className="text-xs text-gray-500">Complétée le 31/12/2024</div>
                </div>
              </div>

              {/* Step 2 - Completed */}
              <div className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">Email vérifié</div>
                  <div className="text-xs text-gray-500">Complétée le 31/12/2024</div>
                </div>
              </div>

              {/* Step 3 - In Progress */}
              <div className="flex items-center gap-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-white">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">Vérification des documents</div>
                  <div className="text-xs text-gray-500">En cours... (24h max)</div>
                </div>
              </div>

              {/* Step 4 - Pending */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-400">
                  4
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-400">Entretien téléphonique</div>
                  <div className="text-xs text-gray-400">15 min avec un conseiller</div>
                </div>
                <Link to="/reunion" className="text-xs font-bold text-[#fd521a] hover:underline">
                  Réserver
                </Link>
              </div>

              {/* Step 5 - Pending */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-400">
                  5
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-400">Signature du contrat</div>
                  <div className="text-xs text-gray-400">Contrat en ligne</div>
                </div>
              </div>
            </div>
          </div>

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
            <a
              href="#"
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
            >
              <Upload className="mb-3 h-6 w-6 text-[#fd521a]" />
              <div className="text-sm font-bold">Ajouter un document</div>
              <div className="text-xs text-gray-400">Carte VTC, permis...</div>
            </a>
            <a
              href="#"
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
            >
              <MessageCircle className="mb-3 h-6 w-6 text-[#fd521a]" />
              <div className="text-sm font-bold">Contacter le support</div>
              <div className="text-xs text-gray-400">Réponse sous 2h</div>
            </a>
          </div>

          {/* Info Card */}
          <div className="rounded-2xl border border-[#fd521a]/10 bg-[#fd521a]/5 p-6">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 shrink-0 text-[#fd521a]" />
              <div>
                <div className="mb-1 text-sm font-bold">Prochaine étape</div>
                <p className="text-sm text-gray-600">
                  Une fois vos documents validés, vous pourrez réserver un créneau pour un court
                  entretien téléphonique (15 min). Ce sera l'occasion de valider ensemble les
                  derniers détails.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

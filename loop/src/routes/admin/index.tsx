import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, LogOut, Circle, ArrowRight } from "lucide-react";
import { signOut, useSession } from "~/lib/auth/auth-client";
import { validateSession } from "~/lib/auth/auth-functions";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    const auth = await validateSession();
    if (!auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
    if (!auth.isAdmin) {
      throw redirect({ to: "/espace" });
    }
    return { user: auth.user };
  },
  component: AdminDashboard,
});

interface Application {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  activityType: string;
  monthlyRevenue: string;
  createdAt: string;
  submittedAt: string;
}

function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (session?.user) {
      fetchApplications();
    }
  }, [session]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch =
      !searchQuery ||
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: applications.length,
    submitted: applications.filter((a) => a.status === "SUBMITTED").length,
    approved: applications.filter((a) => a.status === "APPROVED").length,
    rejected: applications.filter((a) => a.status === "REJECTED").length,
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="relative h-5 w-5">
          <div className="absolute inset-0 animate-spin rounded-full border-[1.5px] border-transparent border-t-[#111]"></div>
        </div>
      </div>
    );
  }

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
            <span className="text-[13px] font-medium text-[#666]">Administration</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Rechercher un candidat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-56 rounded-lg border border-[#e5e5e5] bg-[#fafafa] pl-9 pr-3 text-[13px] text-[#111] placeholder:text-[#999] transition-all focus:border-[#999] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="h-5 w-px bg-[#e5e5e5]"></div>
            <span className="text-[13px] text-[#666]">{session?.user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-md p-1.5 text-[#999] transition-colors hover:bg-[#f5f5f5] hover:text-[#111]"
              title="Déconnexion"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1120px] px-6 py-8">
        {/* Stats row */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {[
            { label: "Total candidatures", value: stats.total, accent: "border-[#e5e5e5]" },
            { label: "En attente de traitement", value: stats.submitted, accent: "border-amber-300" },
            { label: "Candidatures approuvées", value: stats.approved, accent: "border-emerald-400" },
            { label: "Candidatures refusées", value: stats.rejected, accent: "border-red-300" },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-xl border-l-[3px] ${s.accent} bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}
            >
              <div className="text-[12px] font-medium text-[#888]">{s.label}</div>
              <div className="mt-1.5 text-[28px] font-semibold leading-none tracking-[-0.02em] text-[#111]">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {/* Filters + title */}
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-3.5">
            <h2 className="text-[14px] font-semibold text-[#111]">Candidatures</h2>
            <div className="flex items-center gap-1 rounded-lg bg-[#f5f5f5] p-0.5">
              {[
                { id: "all", label: "Toutes" },
                { id: "SUBMITTED", label: "En attente" },
                { id: "APPROVED", label: "Approuvées" },
                { id: "REJECTED", label: "Refusées" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-all ${
                    filter === f.id
                      ? "bg-white text-[#111] shadow-sm"
                      : "text-[#888] hover:text-[#555]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column headers */}
          <div className="flex items-center gap-5 border-b border-[#f0f0f0] bg-[#fafafa] px-5 py-2.5">
            <div className="w-9 shrink-0"></div>
            <div className="min-w-0 flex-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#999]">
              Candidat
            </div>
            <div className="hidden w-36 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#999] sm:block">
              Téléphone
            </div>
            <div className="hidden w-32 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[#999] sm:block">
              CA visé
            </div>
            <div className="w-24 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[#999]">
              Date
            </div>
            <div className="w-28 text-right text-[11px] font-semibold uppercase tracking-[0.06em] text-[#999]">
              Statut
            </div>
            <div className="w-4 shrink-0"></div>
          </div>

          {/* Rows */}
          {filteredApplications.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[13px] text-[#999]">Aucune candidature trouvée</p>
            </div>
          ) : (
            filteredApplications.map((app, i) => (
              <Link
                key={app.id}
                to="/admin/applications/$id"
                params={{ id: app.id }}
                className={`group flex items-center gap-5 px-5 py-3.5 transition-colors hover:bg-[#fafafa] ${
                  i !== filteredApplications.length - 1
                    ? "border-b border-[#f0f0f0]"
                    : ""
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[11px] font-semibold text-[#555]">
                  {(app.firstName?.[0] || "").toUpperCase()}
                  {(app.lastName?.[0] || "").toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-[#111]">
                    {app.firstName && app.lastName
                      ? `${app.firstName} ${app.lastName}`
                      : app.email || "Sans nom"}
                  </div>
                  <div className="mt-0.5 truncate text-[12px] text-[#888]">
                    {app.email || "—"}
                  </div>
                </div>

                <div className="hidden w-36 truncate text-[13px] text-[#666] sm:block">
                  {app.phone || "—"}
                </div>

                <div className="hidden w-32 text-right text-[13px] text-[#666] sm:block">
                  {app.monthlyRevenue || "—"}
                </div>

                <div className="w-24 text-right text-[12px] text-[#888]">
                  {new Date(app.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                <div className="w-28 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      app.status === "APPROVED"
                        ? "bg-emerald-50 text-emerald-700"
                        : app.status === "REJECTED"
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <Circle
                      className={`h-1.5 w-1.5 fill-current ${
                        app.status === "APPROVED"
                          ? "text-emerald-500"
                          : app.status === "REJECTED"
                            ? "text-red-400"
                            : "text-amber-500"
                      }`}
                    />
                    {app.status === "APPROVED"
                      ? "Approuvée"
                      : app.status === "REJECTED"
                        ? "Refusée"
                        : "En attente"}
                  </span>
                </div>

                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#ddd] transition-all group-hover:translate-x-0.5 group-hover:text-[#999]" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

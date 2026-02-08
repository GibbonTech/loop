import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  LogOut,
  Search,
  ChevronRight,
  Activity,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  MoreHorizontal,
  ArrowUpRight,
  Circle,
} from "lucide-react";
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

  const recentActivity = applications.slice(0, 5).map((app) => ({
    id: app.id,
    name: `${app.firstName || ""} ${app.lastName || ""}`.trim() || app.email,
    action:
      app.status === "APPROVED"
        ? "a été approuvée"
        : app.status === "REJECTED"
          ? "a été refusée"
          : "est en attente",
    time: new Date(app.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    }),
    status: app.status,
  }));

  if (isPending || loading) {
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

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[240px] flex-col border-r border-[#eaeaea] bg-white">
        {/* Logo */}
        <div className="flex h-[64px] items-center gap-2.5 border-b border-[#eaeaea] px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111]">
            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-[#111]">
            Driivo
          </span>
          <span className="ml-auto rounded-full bg-[#f2f2f2] px-2 py-0.5 text-[10px] font-medium text-[#666]">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="mb-6">
            <div className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-[#999]">
              Général
            </div>
            <a
              href="#"
              className="mb-0.5 flex items-center gap-2.5 rounded-md bg-[#f2f2f2] px-2.5 py-2 text-[13px] font-medium text-[#111]"
            >
              <LayoutDashboard className="h-4 w-4" />
              Tableau de bord
            </a>
            <a
              href="#"
              className="mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-[#666] transition-colors hover:bg-[#f7f7f7] hover:text-[#111]"
            >
              <Users className="h-4 w-4" />
              Candidatures
              <span className="ml-auto rounded-full bg-[#111] px-1.5 py-0.5 text-[10px] font-medium text-white">
                {stats.submitted}
              </span>
            </a>
            <a
              href="#"
              className="mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-[#666] transition-colors hover:bg-[#f7f7f7] hover:text-[#111]"
            >
              <TrendingUp className="h-4 w-4" />
              Leads
            </a>
            <a
              href="#"
              className="mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-[#666] transition-colors hover:bg-[#f7f7f7] hover:text-[#111]"
            >
              <Calendar className="h-4 w-4" />
              Réunions
            </a>
          </div>

          <div>
            <div className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-[#999]">
              Système
            </div>
            <a
              href="#"
              className="mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-[#666] transition-colors hover:bg-[#f7f7f7] hover:text-[#111]"
            >
              <FileText className="h-4 w-4" />
              Logs
            </a>
            <a
              href="#"
              className="mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] text-[#666] transition-colors hover:bg-[#f7f7f7] hover:text-[#111]"
            >
              <Settings className="h-4 w-4" />
              Paramètres
            </a>
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-[#eaeaea] p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2.5 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#111] to-[#333] text-[11px] font-bold text-white">
              {session?.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-[13px] font-medium text-[#111]">
                {session?.user?.name || "Admin"}
              </div>
              <div className="truncate text-[11px] text-[#999]">
                {session?.user?.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md p-1 text-[#999] transition-colors hover:bg-[#f2f2f2] hover:text-[#111]"
              title="Déconnexion"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[240px] flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-[64px] items-center justify-between border-b border-[#eaeaea] bg-white/80 px-8 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[13px] text-[#666]">
            <span className="font-medium text-[#111]">Tableau de bord</span>
            <ChevronRight className="h-3 w-3 text-[#ccc]" />
            <span>Vue d'ensemble</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-[200px] rounded-md border border-[#eaeaea] bg-[#fafafa] pl-9 pr-3 text-[13px] text-[#111] placeholder:text-[#999] focus:border-[#999] focus:outline-none focus:ring-0 transition-colors"
              />
            </div>
            <div className="h-4 w-px bg-[#eaeaea]"></div>
            <button className="relative rounded-md p-1.5 text-[#666] transition-colors hover:bg-[#f2f2f2] hover:text-[#111]">
              <Activity className="h-4 w-4" />
              {stats.submitted > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#fd521a] text-[8px] font-bold text-white">
                  {stats.submitted}
                </span>
              )}
            </button>
          </div>
        </header>

        <div className="px-8 py-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-[22px] font-semibold tracking-tight text-[#111]">
              Bonjour, {session?.user?.name || "Admin"}
            </h1>
            <p className="mt-1 text-[13px] text-[#666]">
              Voici un aperçu de votre plateforme Driivo.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-4 gap-4">
            <div className="group rounded-lg border border-[#eaeaea] bg-white p-5 transition-all hover:border-[#ccc] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#666]">
                  Total candidatures
                </span>
                <Users className="h-4 w-4 text-[#ccc] transition-colors group-hover:text-[#999]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-semibold tracking-tight text-[#111]">
                  {stats.total}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-[#999]">
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600">+{stats.submitted} en attente</span>
              </div>
            </div>

            <div className="group rounded-lg border border-[#eaeaea] bg-white p-5 transition-all hover:border-[#ccc] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#666]">En attente</span>
                <Clock className="h-4 w-4 text-[#ccc] transition-colors group-hover:text-[#999]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-semibold tracking-tight text-[#111]">
                  {stats.submitted}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#f2f2f2]">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all"
                  style={{
                    width: stats.total ? `${(stats.submitted / stats.total) * 100}%` : "0%",
                  }}
                ></div>
              </div>
            </div>

            <div className="group rounded-lg border border-[#eaeaea] bg-white p-5 transition-all hover:border-[#ccc] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#666]">Approuvées</span>
                <CheckCircle className="h-4 w-4 text-[#ccc] transition-colors group-hover:text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-semibold tracking-tight text-[#111]">
                  {stats.approved}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#f2f2f2]">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: stats.total ? `${(stats.approved / stats.total) * 100}%` : "0%",
                  }}
                ></div>
              </div>
            </div>

            <div className="group rounded-lg border border-[#eaeaea] bg-white p-5 transition-all hover:border-[#ccc] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#666]">Refusées</span>
                <XCircle className="h-4 w-4 text-[#ccc] transition-colors group-hover:text-red-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-semibold tracking-tight text-[#111]">
                  {stats.rejected}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#f2f2f2]">
                <div
                  className="h-full rounded-full bg-red-400 transition-all"
                  style={{
                    width: stats.total ? `${(stats.rejected / stats.total) * 100}%` : "0%",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Table — takes 2 cols */}
            <div className="col-span-2">
              {/* Table header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-[#111]">
                  Candidatures
                </h2>
                <div className="flex items-center gap-1 rounded-lg border border-[#eaeaea] bg-white p-0.5">
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
                          ? "bg-[#111] text-white shadow-sm"
                          : "text-[#666] hover:text-[#111]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-hidden rounded-lg border border-[#eaeaea] bg-white">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#eaeaea]">
                      <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#999]">
                        Candidat
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#999]">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#999]">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-[#999]">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-[#999]">
                        &nbsp;
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-16 text-center text-[13px] text-[#999]"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <Users className="h-8 w-8 text-[#ddd]" />
                            Aucune candidature trouvée
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app, i) => (
                        <tr
                          key={app.id}
                          className={`group transition-colors hover:bg-[#fafafa] ${
                            i !== filteredApplications.length - 1
                              ? "border-b border-[#f2f2f2]"
                              : ""
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f2f2] text-[11px] font-semibold text-[#666]">
                                {(app.firstName?.[0] || "").toUpperCase()}
                                {(app.lastName?.[0] || "").toUpperCase()}
                              </div>
                              <div>
                                <div className="text-[13px] font-medium text-[#111]">
                                  {app.firstName} {app.lastName}
                                </div>
                                <div className="text-[11px] text-[#999]">
                                  {app.activityType || "VTC"}
                                  {app.monthlyRevenue ? ` · ${app.monthlyRevenue}` : ""}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-[13px] text-[#444]">{app.email}</div>
                            <div className="text-[11px] text-[#999]">{app.phone}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                app.status === "APPROVED"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : app.status === "REJECTED"
                                    ? "bg-red-50 text-red-700"
                                    : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              <Circle
                                className={`h-1.5 w-1.5 fill-current ${
                                  app.status === "APPROVED"
                                    ? "text-emerald-500"
                                    : app.status === "REJECTED"
                                      ? "text-red-500"
                                      : "text-amber-500"
                                }`}
                              />
                              {app.status === "APPROVED"
                                ? "Approuvée"
                                : app.status === "REJECTED"
                                  ? "Refusée"
                                  : "En attente"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[12px] text-[#999]">
                            {new Date(app.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link
                              to="/admin/applications/$id"
                              params={{ id: app.id }}
                              className="inline-flex items-center gap-1 rounded-md border border-transparent px-2.5 py-1 text-[12px] font-medium text-[#666] transition-all hover:border-[#eaeaea] hover:bg-white hover:text-[#111] hover:shadow-sm group-hover:border-[#eaeaea]"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              Voir
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity sidebar — takes 1 col */}
            <div className="col-span-1 space-y-6">
              {/* Quick stats */}
              <div className="rounded-lg border border-[#eaeaea] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-[#111]">
                    Taux de conversion
                  </h3>
                  <MoreHorizontal className="h-4 w-4 text-[#ccc]" />
                </div>
                <div className="mb-3 flex items-baseline gap-1">
                  <span className="text-[32px] font-semibold tracking-tight text-[#111]">
                    {stats.total
                      ? Math.round((stats.approved / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#f2f2f2]">
                  <div className="flex h-full">
                    <div
                      className="h-full bg-emerald-500 transition-all"
                      style={{
                        width: stats.total
                          ? `${(stats.approved / stats.total) * 100}%`
                          : "0%",
                      }}
                    ></div>
                    <div
                      className="h-full bg-amber-400 transition-all"
                      style={{
                        width: stats.total
                          ? `${(stats.submitted / stats.total) * 100}%`
                          : "0%",
                      }}
                    ></div>
                    <div
                      className="h-full bg-red-400 transition-all"
                      style={{
                        width: stats.total
                          ? `${(stats.rejected / stats.total) * 100}%`
                          : "0%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4 text-[11px] text-[#999]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    Approuvées
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                    En attente
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-red-400"></div>
                    Refusées
                  </div>
                </div>
              </div>

              {/* Recent activity */}
              <div className="rounded-lg border border-[#eaeaea] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-[#111]">
                    Activité récente
                  </h3>
                  <Activity className="h-4 w-4 text-[#ccc]" />
                </div>
                <div className="space-y-0">
                  {recentActivity.length === 0 ? (
                    <p className="py-6 text-center text-[12px] text-[#999]">
                      Aucune activité récente
                    </p>
                  ) : (
                    recentActivity.map((item, i) => (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 py-3 ${
                          i !== recentActivity.length - 1
                            ? "border-b border-[#f2f2f2]"
                            : ""
                        }`}
                      >
                        <div
                          className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                            item.status === "APPROVED"
                              ? "bg-emerald-500"
                              : item.status === "REJECTED"
                                ? "bg-red-400"
                                : "bg-amber-400"
                          }`}
                        ></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] text-[#444]">
                            <span className="font-medium text-[#111]">
                              {item.name}
                            </span>{" "}
                            {item.action}
                          </p>
                          <p className="text-[11px] text-[#999]">{item.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Platform status */}
              <div className="rounded-lg border border-[#eaeaea] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-[#111]">Plateforme</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[12px] text-[#666]">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                      App en ligne
                    </div>
                    <span className="text-[11px] text-[#999]">app.driivo.fr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[12px] text-[#666]">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                      Base de données
                    </div>
                    <span className="text-[11px] text-[#999]">PostgreSQL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[12px] text-[#666]">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                      Authentification
                    </div>
                    <span className="text-[11px] text-[#999]">BetterAuth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

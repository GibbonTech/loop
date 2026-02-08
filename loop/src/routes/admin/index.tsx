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
    <div className="min-h-screen bg-white">
      {/* Top navigation — minimal */}
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
            <span className="text-[13px] text-[#888]">Administration</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#aaa]" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-52 rounded-lg border border-[#eaeaea] bg-white pl-8 pr-3 text-[13px] text-[#111] placeholder:text-[#aaa] transition-colors focus:border-[#888] focus:outline-none"
              />
            </div>
            <div className="h-4 w-px bg-[#eaeaea]"></div>
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-[#888]">{session?.user?.email}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg p-1.5 text-[#aaa] transition-colors hover:text-[#111]"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6">
        {/* Numbers — raw, no cards */}
        <div className="flex items-end gap-16 border-b border-[#eaeaea] py-10">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#888]">
              Total
            </div>
            <div className="mt-1 text-[40px] font-light leading-none tracking-[-0.03em] text-[#111]">
              {stats.total}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#888]">
              En attente
            </div>
            <div className="mt-1 text-[40px] font-light leading-none tracking-[-0.03em] text-[#111]">
              {stats.submitted}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#888]">
              Approuvées
            </div>
            <div className="mt-1 text-[40px] font-light leading-none tracking-[-0.03em] text-[#111]">
              {stats.approved}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#888]">
              Refusées
            </div>
            <div className="mt-1 text-[40px] font-light leading-none tracking-[-0.03em] text-[#111]">
              {stats.rejected}
            </div>
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-6 border-b border-[#eaeaea] py-4">
          {[
            { id: "all", label: "Toutes", count: stats.total },
            { id: "SUBMITTED", label: "En attente", count: stats.submitted },
            { id: "APPROVED", label: "Approuvées", count: stats.approved },
            { id: "REJECTED", label: "Refusées", count: stats.rejected },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`relative pb-4 -mb-4 text-[13px] transition-colors ${
                filter === f.id
                  ? "font-medium text-[#111]"
                  : "text-[#888] hover:text-[#555]"
              }`}
            >
              {f.label}
              {f.count > 0 && (
                <span className={`ml-1.5 ${filter === f.id ? "text-[#111]" : "text-[#ccc]"}`}>
                  {f.count}
                </span>
              )}
              {filter === f.id && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#111]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Table — full width, no wrapper card */}
        <div>
          {filteredApplications.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-[14px] text-[#888]">Aucune candidature</p>
            </div>
          ) : (
            filteredApplications.map((app, i) => (
              <Link
                key={app.id}
                to="/admin/applications/$id"
                params={{ id: app.id }}
                className={`group flex items-center gap-5 py-4 transition-colors hover:bg-[#fafafa] -mx-6 px-6 ${
                  i !== filteredApplications.length - 1
                    ? "border-b border-[#f5f5f5]"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-[11px] font-medium text-[#666]">
                  {(app.firstName?.[0] || "").toUpperCase()}
                  {(app.lastName?.[0] || "").toUpperCase()}
                </div>

                {/* Name + activity */}
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-medium text-[#111]">
                    {app.firstName} {app.lastName}
                  </div>
                  <div className="mt-0.5 text-[12px] text-[#888]">
                    {app.email}
                  </div>
                </div>

                {/* Revenue */}
                <div className="hidden w-32 text-right text-[13px] text-[#888] sm:block">
                  {app.monthlyRevenue || "—"}
                </div>

                {/* Date */}
                <div className="w-28 text-right text-[13px] text-[#888]">
                  {new Date(app.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>

                {/* Status */}
                <div className="w-28 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${
                      app.status === "APPROVED"
                        ? "text-emerald-600"
                        : app.status === "REJECTED"
                          ? "text-red-500"
                          : "text-[#888]"
                    }`}
                  >
                    <Circle
                      className={`h-[5px] w-[5px] fill-current ${
                        app.status === "APPROVED"
                          ? "text-emerald-500"
                          : app.status === "REJECTED"
                            ? "text-red-400"
                            : "text-[#ccc]"
                      }`}
                    />
                    {app.status === "APPROVED"
                      ? "Approuvée"
                      : app.status === "REJECTED"
                        ? "Refusée"
                        : "En attente"}
                  </span>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-4 w-4 shrink-0 text-[#ddd] transition-all group-hover:translate-x-0.5 group-hover:text-[#888]" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

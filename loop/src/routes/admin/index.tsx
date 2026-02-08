import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, LogOut, ChevronRight, Users, Clock, CheckCircle2, XCircle } from "lucide-react";
import { signOut, useSession } from "~/lib/auth/auth-client";
import { validateSession } from "~/lib/auth/auth-functions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative h-5 w-5">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-foreground"></div>
        </div>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">Approuvée</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Refusée</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-background"></div>
              </div>
              <span className="text-sm font-semibold tracking-tight">Driivo</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-muted-foreground">Administration</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un candidat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-60 pl-9"
              />
            </div>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm text-muted-foreground">{session?.user?.email}</span>
            <Button variant="ghost" size="icon-sm" onClick={handleLogout} title="Déconnexion">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                Total candidatures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                En attente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stats.submitted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approuvées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5" />
                Refusées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Table card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Candidatures</CardTitle>
                <CardDescription className="mt-1">
                  {filteredApplications.length} résultat{filteredApplications.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList>
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="SUBMITTED">En attente</TabsTrigger>
                  <TabsTrigger value="APPROVED">Approuvées</TabsTrigger>
                  <TabsTrigger value="REJECTED">Refusées</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {filteredApplications.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-muted-foreground">Aucune candidature trouvée</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Candidat</TableHead>
                    <TableHead className="hidden sm:table-cell">Téléphone</TableHead>
                    <TableHead className="hidden sm:table-cell">CA visé</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id} className="group cursor-pointer" onClick={() => window.location.href = `/admin/applications/${app.id}`}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {(app.firstName?.[0] || "").toUpperCase()}
                              {(app.lastName?.[0] || "").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="text-sm font-medium">
                              {app.firstName && app.lastName
                                ? `${app.firstName} ${app.lastName}`
                                : app.email || "Sans nom"}
                            </div>
                            <div className="truncate text-xs text-muted-foreground">
                              {app.email || "—"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {app.phone || "—"}
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {app.monthlyRevenue || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(app.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{statusBadge(app.status)}</TableCell>
                      <TableCell>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, LogOut, ChevronRight, Users, Clock, CheckCircle2, XCircle, CalendarDays, Zap } from "lucide-react";
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

interface Lead {
  id: string;
  firstName: string;
  email: string;
  phone: string;
  monthlyRevenue: number;
  estimatedNet: number;
  source: string;
  status: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  createdAt: string;
}

interface Meeting {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  scheduledDate: string;
  timeSlot: string;
  status: string;
  createdAt: string;
}

const formatRevenue = (v: string | undefined | null): string => {
  if (!v) return "—";
  const map: Record<string, string> = {
    "moins_3000": "< 3k \u20ac",
    "3000_5000": "3\u20135k \u20ac",
    "5000_7000": "5\u20137k \u20ac",
    "7000_10000": "7\u201310k \u20ac",
    "plus_10000": "> 10k \u20ac",
    "5000-7000\u20ac": "5\u20137k \u20ac",
  };
  return map[v] || v;
};

function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<"applications" | "leads" | "meetings">("applications");

  useEffect(() => {
    if (session?.user) {
      Promise.all([fetchApplications(), fetchLeads(), fetchMeetings()]).finally(() => setLoading(false));
    }
  }, [session]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      if (data.success) setApplications(data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads");
      const data = await response.json();
      if (data.success) setLeads(data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const response = await fetch("/api/meetings");
      const data = await response.json();
      if (data.success) setMeetings(data.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
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

        {/* Section navigation */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={activeSection === "applications" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection("applications")}
          >
            <Users className="mr-1.5 h-3.5 w-3.5" />
            Candidatures ({applications.length})
          </Button>
          <Button
            variant={activeSection === "leads" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection("leads")}
          >
            <Zap className="mr-1.5 h-3.5 w-3.5" />
            Leads ({leads.length})
          </Button>
          <Button
            variant={activeSection === "meetings" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection("meetings")}
          >
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
            Réunions ({meetings.length})
          </Button>
        </div>

        {/* Applications table */}
        {activeSection === "applications" && <Card>
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
                        {formatRevenue(app.monthlyRevenue)}
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
        </Card>}

        {/* Leads section */}
        {activeSection === "leads" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leads</CardTitle>
                  <CardDescription className="mt-1">{leads.length} lead{leads.length !== 1 ? "s" : ""}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-muted-foreground">Aucun lead</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead className="hidden sm:table-cell">Téléphone</TableHead>
                      <TableHead className="hidden sm:table-cell">CA estimé</TableHead>
                      <TableHead className="hidden md:table-cell">Source</TableHead>
                      <TableHead className="hidden md:table-cell">UTM</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div className="min-w-0">
                            <div className="text-sm font-medium">{lead.firstName || "—"}</div>
                            <div className="truncate text-xs text-muted-foreground">{lead.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">{lead.phone || "—"}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {lead.monthlyRevenue ? `${lead.monthlyRevenue.toLocaleString()} €` : "—"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="text-xs">{lead.source}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                          {lead.utmSource || lead.utmCampaign ? `${lead.utmSource || ""}${lead.utmCampaign ? ` / ${lead.utmCampaign}` : ""}` : "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        </TableCell>
                        <TableCell>
                          <Badge variant={lead.status === "CONVERTED" ? "default" : lead.status === "LOST" ? "destructive" : "secondary"} className="text-xs">
                            {lead.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {/* Meetings section */}
        {activeSection === "meetings" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Réunions</CardTitle>
                  <CardDescription className="mt-1">{meetings.length} réunion{meetings.length !== 1 ? "s" : ""}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {meetings.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-muted-foreground">Aucune réunion</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead className="hidden sm:table-cell">Téléphone</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Créneau</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell>
                          <div className="min-w-0">
                            <div className="text-sm font-medium">{meeting.firstName} {meeting.lastName || ""}</div>
                            <div className="truncate text-xs text-muted-foreground">{meeting.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">{meeting.phone || "—"}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(meeting.scheduledDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{meeting.timeSlot}</TableCell>
                        <TableCell>
                          <Badge variant={meeting.status === "COMPLETED" ? "default" : meeting.status === "CANCELLED" || meeting.status === "NO_SHOW" ? "destructive" : "secondary"} className="text-xs">
                            {meeting.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

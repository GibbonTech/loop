import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Eye, Mail } from "lucide-react";
import { useSession } from "~/lib/auth/auth-client";
import { validateSession } from "~/lib/auth/auth-functions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "~/components/ui/table";

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative h-5 w-5">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-foreground"></div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-sm font-medium">Candidature introuvable</p>
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin">
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour
          </Link>
        </Button>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">Approuvée</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Refusée</Badge>;
      case "UNDER_REVIEW":
        return <Badge variant="outline">En examen</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
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

  const renderFieldsTable = (fields: { label: string; value: string }[]) => (
    <Table>
      <TableBody>
        {fields.map((field) => (
          <TableRow key={field.label}>
            <TableCell className="text-muted-foreground font-medium w-[200px]">{field.label}</TableCell>
            <TableCell>{field.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

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
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-3.5 w-3.5" />
                Candidatures
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Profile + Actions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarFallback className="text-sm font-bold">
                    {(application.firstName?.[0] || "").toUpperCase()}
                    {(application.lastName?.[0] || "").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">
                    {application.firstName} {application.lastName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {application.email}
                    {application.phone && ` · ${application.phone}`}
                    {" · Déposée le "}
                    {new Date(application.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </div>
              </div>
              {statusBadge(application.status)}
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              {application.status !== "APPROVED" && (
                <Button
                  size="sm"
                  onClick={() => updateStatus("APPROVED")}
                  disabled={updating}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approuver
                </Button>
              )}
              {application.status !== "REJECTED" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => updateStatus("REJECTED")}
                  disabled={updating}
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Refuser
                </Button>
              )}
              {application.status !== "UNDER_REVIEW" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus("UNDER_REVIEW")}
                  disabled={updating}
                >
                  <Eye className="h-3.5 w-3.5" />
                  En examen
                </Button>
              )}
              <div className="flex-1" />
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${application.email}`}>
                  <Mail className="h-3.5 w-3.5" />
                  Contacter
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data sections */}
        <div className="grid gap-4 md:grid-cols-2">
          {personalFields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                {renderFieldsTable(personalFields)}
              </CardContent>
            </Card>
          )}

          {vehicleFields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Véhicule</CardTitle>
              </CardHeader>
              <CardContent>
                {renderFieldsTable(vehicleFields)}
              </CardContent>
            </Card>
          )}

          {activityFields.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm">Activité VTC</CardTitle>
              </CardHeader>
              <CardContent>
                {renderFieldsTable(activityFields)}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Eye, Mail, CircleCheck, CircleDashed, FileText, Download, Trash2 } from "lucide-react";
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

interface StoredFile {
  id: string;
  key: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

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
  currentStep: number;
  totalSteps: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  activityType: string;
  structureType: string;
  isAlone: string;
  hasVtcLicense: string;
  yearsExperience: string;
  currentPlatforms: string;
  hasVehicle: string;
  vehicleType: string;
  vehicleYear: string;
  monthlyRevenue: string;
  expectedStartDate: string;
  createdAt: string;
  submittedAt: string;
  formData: Record<string, unknown>;
}

const formatRevenue = (v: string | undefined | null): string => {
  if (!v) return "";
  const map: Record<string, string> = {
    "moins_3000": "Moins de 3 000 \u20ac",
    "3000_5000": "3 000 \u2013 5 000 \u20ac",
    "5000_7000": "5 000 \u2013 7 000 \u20ac",
    "7000_10000": "7 000 \u2013 10 000 \u20ac",
    "plus_10000": "Plus de 10 000 \u20ac",
    "5000-7000\u20ac": "5 000 \u2013 7 000 \u20ac",
  };
  return map[v] || v;
};

const formatExperience = (v: string | undefined | null): string => {
  if (!v) return "";
  const map: Record<string, string> = {
    "none": "Aucune",
    "moins_1an": "Moins d\u2019un an",
    "less_1": "Moins d\u2019un an",
    "1_3": "1 \u00e0 3 ans",
    "1_3ans": "1 \u00e0 3 ans",
    "3_5": "3 \u00e0 5 ans",
    "3_5ans": "3 \u00e0 5 ans",
    "more_5": "Plus de 5 ans",
    "plus_5ans": "Plus de 5 ans",
  };
  return map[v] || v;
};

const formatYesNo = (v: string | undefined | null): string => {
  if (!v) return "";
  if (v === "yes" || v === "oui") return "Oui";
  if (v === "no" || v === "non") return "Non";
  return v;
};

const formatPlatforms = (v: string | undefined | null): string => {
  if (!v) return "";
  return v.split(",").map(p => p.trim()).filter(Boolean).join(", ");
};

function ApplicationDetailPage() {
  const { id } = Route.useParams();
  const { isPending: sessionPending } = useSession();
  const [application, setApplication] = useState<Application | null>(null);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchApplication();
    fetchFiles();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications?id=${id}`);
      const data = await response.json();
      if (data.success && data.data) {
        setApplication(data.data);
        setNotes(data.data.notes || "");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/files?entityId=${id}`);
      const data = await response.json();
      if (data.success) setFiles(data.data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const downloadFile = async (key: string) => {
    try {
      const response = await fetch(`/api/files?key=${encodeURIComponent(key)}`);
      const data = await response.json();
      if (data.success && data.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm("Supprimer ce fichier ?")) return;
    try {
      await fetch(`/api/files?fileId=${fileId}`, { method: "DELETE" });
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      await fetch(`/api/applications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, notes }),
      });
      setApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async () => {
    try {
      await fetch(`/api/applications`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: application?.status || "SUBMITTED", notes }),
      });
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
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

  // Readiness score: count key fields that are filled
  const readinessFields = [
    { label: "Prénom", filled: !!application.firstName },
    { label: "Nom", filled: !!application.lastName },
    { label: "Email", filled: !!application.email },
    { label: "Téléphone", filled: !!application.phone },
    { label: "Carte VTC", filled: !!application.hasVtcLicense },
    { label: "Expérience", filled: !!application.yearsExperience },
    { label: "CA visé", filled: !!application.monthlyRevenue },
    { label: "Véhicule", filled: !!application.hasVehicle },
  ];
  const readinessScore = Math.round(
    (readinessFields.filter((f) => f.filled).length / readinessFields.length) * 100
  );

  const personalFields = [
    { label: "Email", value: application.email },
    { label: "Téléphone", value: application.phone },
  ].filter((f) => f.value);

  const activityFields = [
    { label: "Type d'activité", value: application.activityType || "VTC" },
    { label: "Structure", value: application.structureType },
    { label: "Travaille seul", value: formatYesNo(application.isAlone) },
    { label: "Carte VTC", value: formatYesNo(application.hasVtcLicense) },
    { label: "Expérience", value: formatExperience(application.yearsExperience) },
    { label: "CA mensuel visé", value: formatRevenue(application.monthlyRevenue) },
    { label: "Plateformes actuelles", value: formatPlatforms(application.currentPlatforms) },
    { label: "Date de début souhaitée", value: application.expectedStartDate },
  ].filter((f) => f.value);

  const vehicleFields = [
    { label: "Possède un véhicule", value: formatYesNo(application.hasVehicle) },
    { label: "Type de véhicule", value: application.vehicleType },
    { label: "Année du véhicule", value: application.vehicleYear },
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

        {/* Readiness score */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Complétude du dossier</CardTitle>
                <CardDescription className="mt-1">
                  {readinessFields.filter(f => f.filled).length} / {readinessFields.length} champs renseignés
                </CardDescription>
              </div>
              <span className={`text-2xl font-bold tracking-tight ${
                readinessScore >= 80 ? "text-emerald-600" : readinessScore >= 50 ? "text-amber-600" : "text-red-500"
              }`}>
                {readinessScore}%
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all ${
                  readinessScore >= 80 ? "bg-emerald-500" : readinessScore >= 50 ? "bg-amber-500" : "bg-red-400"
                }`}
                style={{ width: `${readinessScore}%` }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {readinessFields.map((f) => (
                <div key={f.label} className="flex items-center gap-1.5 text-xs">
                  {f.filled ? (
                    <CircleCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <CircleDashed className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                  )}
                  <span className={f.filled ? "text-foreground" : "text-muted-foreground"}>{f.label}</span>
                </div>
              ))}
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

        {/* Documents */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Documents</CardTitle>
            <CardDescription>
              {files.length > 0
                ? `${files.length} fichier${files.length > 1 ? "s" : ""} téléversé${files.length > 1 ? "s" : ""}`
                : "Aucun document téléversé"}
            </CardDescription>
          </CardHeader>
          {files.length > 0 && (
            <CardContent>
              <div className="space-y-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{file.originalName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} · {new Date(file.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => downloadFile(file.key)} title="Télécharger">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => handleDeleteFile(file.id)} title="Supprimer">
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Notes */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Notes internes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajouter des notes sur cette candidature..."
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="mt-2 flex justify-end">
              <Button size="sm" variant="outline" onClick={saveNotes}>
                Enregistrer les notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

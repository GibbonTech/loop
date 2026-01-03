import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, XCircle, Clock, Mail, Phone, Car, Calendar } from "lucide-react";
import { u as useSession } from "./auth-client-C94LDTZI.js";
import { a as Route } from "./router-B3pzEr5R.js";
import "nanostores";
import "@better-fetch/fetch";
import "@better-auth/core/utils";
import "@better-auth/core/env";
import "@better-auth/core/error";
import "sonner";
import "drizzle-orm/postgres-js";
import "postgres";
import "@t3-oss/env-core";
import "zod";
import "drizzle-orm";
import "drizzle-orm/pg-core";
import "nanoid";
import "@tanstack/router-core/ssr/client";
import "@better-auth/core/db/adapter";
import "@better-auth/core/context";
import "@better-auth/utils/random";
import "@better-auth/utils/hex";
import "@better-auth/utils";
import "@better-auth/utils/hash";
import "better-call";
import "@better-auth/core/api";
import "@better-auth/core/db";
import "kysely";
import "@noble/hashes/hkdf.js";
import "@noble/hashes/sha2.js";
import "jose";
import "@better-auth/utils/base64";
import "@better-auth/utils/binary";
import "@better-auth/utils/hmac";
import "@noble/ciphers/chacha.js";
import "@noble/ciphers/utils.js";
import "@better-auth/core/social-providers";
import "jose/errors";
import "defu";
import "@noble/hashes/scrypt.js";
import "@noble/hashes/utils.js";
import "@better-auth/telemetry";
import "@better-auth/core";
import "@better-auth/core/oauth2";
import "@better-auth/utils/otp";
import "bcrypt";
function ApplicationDetailPage() {
  var _a;
  const {
    id
  } = Route.useParams();
  const {
    data: session,
    isPending: sessionPending
  } = useSession();
  const [application, setApplication] = useState(null);
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
  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await fetch(`/api/applications`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          status: newStatus
        })
      });
      setApplication((prev) => prev ? {
        ...prev,
        status: newStatus
      } : null);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };
  if (sessionPending || loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#fd521a] border-t-transparent" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-500", children: "Chargement..." })
    ] }) });
  }
  if (!application) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Application non trouvée" }),
      /* @__PURE__ */ jsx(Link, { to: "/admin", className: "mt-4 text-[#fd521a] hover:underline", children: "Retour au tableau de bord" })
    ] }) });
  }
  const statusColors = {
    SUBMITTED: "bg-amber-100 text-amber-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    UNDER_REVIEW: "bg-blue-100 text-blue-800"
  };
  const statusLabels = {
    SUBMITTED: "En attente",
    APPROVED: "Approuvée",
    REJECTED: "Refusée",
    UNDER_REVIEW: "En cours d'examen"
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-gray-200 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-5xl items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/admin", className: "flex items-center gap-2 text-gray-600 hover:text-gray-900", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Retour"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-gray-200" }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold tracking-tight", children: "Détail candidature" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-5xl px-4 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: `inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusColors[application.status] || "bg-gray-100 text-gray-800"}`, children: statusLabels[application.status] || application.status }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
            "Soumise le ",
            new Date(application.createdAt).toLocaleDateString("fr-FR")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          application.status !== "APPROVED" && /* @__PURE__ */ jsxs("button", { onClick: () => updateStatus("APPROVED"), disabled: updating, className: "flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4" }),
            "Approuver"
          ] }),
          application.status !== "REJECTED" && /* @__PURE__ */ jsxs("button", { onClick: () => updateStatus("REJECTED"), disabled: updating, className: "flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
            "Refuser"
          ] }),
          application.status !== "UNDER_REVIEW" && /* @__PURE__ */ jsxs("button", { onClick: () => updateStatus("UNDER_REVIEW"), disabled: updating, className: "flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
            "En examen"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 font-bold", children: "Informations personnelles" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase text-gray-400", children: "Nom complet" }),
              /* @__PURE__ */ jsxs("div", { className: "text-lg font-medium", children: [
                application.firstName,
                " ",
                application.lastName
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-gray-400" }),
              /* @__PURE__ */ jsx("a", { href: `mailto:${application.email}`, className: "text-[#fd521a] hover:underline", children: application.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-gray-400" }),
              /* @__PURE__ */ jsx("a", { href: `tel:${application.phone}`, className: "hover:underline", children: application.phone || "Non renseigné" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 font-bold", children: "Activité VTC" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase text-gray-400", children: "Type d'activité" }),
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: application.activityType || "VTC" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase text-gray-400", children: "Carte VTC" }),
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: application.hasVtcLicense || "Non renseigné" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase text-gray-400", children: "Expérience" }),
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: application.yearsExperience || "Non renseigné" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase text-gray-400", children: "CA mensuel visé" }),
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: application.monthlyRevenue || "Non renseigné" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase text-gray-400", children: "Plateformes" }),
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: application.currentPlatforms || "Non renseigné" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsx(Car, { className: "h-5 w-5" }),
            "Véhicule"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase text-gray-400", children: "Possède un véhicule" }),
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: application.hasVehicle === "yes" ? "Oui" : "Non" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase text-gray-400", children: "Type de véhicule" }),
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: application.vehicleType || "Non renseigné" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            "Historique"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-green-500" }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Candidature créée" }),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-500", children: new Date(application.createdAt).toLocaleString("fr-FR") })
              ] })
            ] }),
            application.submittedAt && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-blue-500" }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Soumise" }),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-500", children: new Date(application.submittedAt).toLocaleString("fr-FR") })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ApplicationDetailPage as component
};

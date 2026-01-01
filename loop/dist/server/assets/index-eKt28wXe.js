import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LogOut, Users, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { u as useSession, s as signOut } from "./auth-client-CooMjAii.js";
import "./router-B5L6HemN.js";
import "sonner";
import "drizzle-orm/postgres-js";
import "postgres";
import "@t3-oss/env-core";
import "zod";
import "drizzle-orm";
import "drizzle-orm/pg-core";
import "nanoid";
import "@tanstack/router-core/ssr/client";
import "@better-auth/core/env";
import "@better-auth/core/error";
import "@better-auth/core/db/adapter";
import "@better-auth/core/context";
import "@better-auth/utils/random";
import "@better-auth/utils/hex";
import "@better-auth/utils";
import "@better-auth/utils/hash";
import "better-call";
import "@better-auth/core/utils";
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
import "@better-fetch/fetch";
import "@better-auth/utils/otp";
import "bcrypt";
import "nanostores";
function AdminDashboard() {
  var _a;
  const {
    data: session,
    isPending
  } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchApplications();
  }, []);
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
    if (filter === "all") return true;
    return app.status === filter;
  });
  const stats = {
    total: applications.length,
    submitted: applications.filter((a) => a.status === "SUBMITTED").length,
    approved: applications.filter((a) => a.status === "APPROVED").length,
    rejected: applications.filter((a) => a.status === "REJECTED").length
  };
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/admin/login";
  };
  if (isPending || loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#fd521a] border-t-transparent" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-500", children: "Chargement..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-gray-200 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a]" }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold tracking-tight", children: "LOOP Admin" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email }),
        /* @__PURE__ */ jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
          "Déconnexion"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-8 text-2xl font-bold", children: "Tableau de bord" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 grid grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600", children: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: stats.total }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Total candidatures" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600", children: /* @__PURE__ */ jsx(Clock, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: stats.submitted }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "En attente" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: stats.approved }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Approuvées" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600", children: /* @__PURE__ */ jsx(XCircle, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: stats.rejected }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Refusées" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex gap-2", children: [{
        id: "all",
        label: "Toutes"
      }, {
        id: "SUBMITTED",
        label: "En attente"
      }, {
        id: "APPROVED",
        label: "Approuvées"
      }, {
        id: "REJECTED",
        label: "Refusées"
      }].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f.id), className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${filter === f.id ? "bg-[#fd521a] text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`, children: f.label }, f.id)) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-gray-200 bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { className: "border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500", children: "Candidat" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500", children: "Contact" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500", children: "Activité" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500", children: "CA Visé" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500", children: "Statut" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500", children: "Date" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200", children: filteredApplications.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-6 py-12 text-center text-gray-500", children: "Aucune candidature trouvée" }) }) : filteredApplications.map((app) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "font-medium text-gray-900", children: [
            app.firstName,
            " ",
            app.lastName
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "whitespace-nowrap px-6 py-4", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: app.email }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: app.phone })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800", children: app.activityType || "VTC" }) }),
          /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-sm text-gray-500", children: app.monthlyRevenue || "-" }),
          /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex rounded-full px-2 py-1 text-xs font-medium ${app.status === "APPROVED" ? "bg-green-100 text-green-800" : app.status === "REJECTED" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`, children: app.status === "APPROVED" ? "Approuvée" : app.status === "REJECTED" ? "Refusée" : "En attente" }) }),
          /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-sm text-gray-500", children: new Date(app.createdAt).toLocaleDateString("fr-FR") }),
          /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-right", children: /* @__PURE__ */ jsxs(Link, { to: "/admin/applications/$id", params: {
            id: app.id
          }, className: "inline-flex items-center gap-1 text-sm text-[#fd521a] hover:underline", children: [
            /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }),
            "Voir"
          ] }) })
        ] }, app.id)) })
      ] }) })
    ] })
  ] });
}
export {
  AdminDashboard as component
};

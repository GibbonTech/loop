import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, BarChart3, Wallet, Settings, Loader2, Check, Calendar, Upload, MessageCircle, Info, Clock, XCircle, CheckCircle } from "lucide-react";
import { u as useSession } from "./auth-client-C94LDTZI.js";
import "./router-B3pzEr5R.js";
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
function EspacePage() {
  var _a, _b;
  const {
    data: session,
    isPending
  } = useSession();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isPending && !(session == null ? void 0 : session.user)) {
      window.location.href = "/login";
    }
  }, [session, isPending]);
  useEffect(() => {
    if (session == null ? void 0 : session.user) {
      fetchLatestApplication();
    }
  }, [session]);
  const fetchLatestApplication = async () => {
    var _a2;
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      if (data.success && ((_a2 = data.data) == null ? void 0 : _a2.length) > 0) {
        setApplication(data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };
  const getStatusInfo = (status) => {
    switch (status) {
      case "APPROVED":
        return {
          label: "Candidature approuvée",
          description: "Félicitations ! Votre candidature a été acceptée.",
          icon: CheckCircle,
          color: "green",
          borderColor: "border-green-400",
          bgColor: "bg-green-100",
          textColor: "text-green-600"
        };
      case "REJECTED":
        return {
          label: "Candidature refusée",
          description: "Nous sommes désolés, votre candidature n'a pas été retenue.",
          icon: XCircle,
          color: "red",
          borderColor: "border-red-400",
          bgColor: "bg-red-100",
          textColor: "text-red-600"
        };
      case "UNDER_REVIEW":
        return {
          label: "Candidature en examen",
          description: "Notre équipe examine votre dossier en détail.",
          icon: Loader2,
          color: "blue",
          borderColor: "border-blue-400",
          bgColor: "bg-blue-100",
          textColor: "text-blue-600"
        };
      default:
        return {
          label: "Candidature en cours de vérification",
          description: "Notre équipe examine votre dossier. Réponse sous 24h.",
          icon: Clock,
          color: "amber",
          borderColor: "border-amber-400",
          bgColor: "bg-amber-100",
          textColor: "text-amber-600"
        };
    }
  };
  const statusInfo = application ? getStatusInfo(application.status) : getStatusInfo("SUBMITTED");
  const StatusIcon = statusInfo.icon;
  const userName = (application == null ? void 0 : application.firstName) || "Candidat";
  const userInitials = application ? `${((_a = application.firstName) == null ? void 0 : _a[0]) || ""}${((_b = application.lastName) == null ? void 0 : _b[0]) || ""}`.toUpperCase() : "??";
  if (isPending || loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#fd521a] border-t-transparent" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-500", children: "Chargement..." })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 selection:bg-[#fd521a] selection:text-white", children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 border-r border-gray-100 bg-white p-6 md:block", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "mb-10 flex items-center gap-2 text-lg font-bold tracking-tighter text-black", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
        "DRIIVO"
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-xl bg-[#fd521a]/10 px-4 py-3 text-sm font-medium text-[#fd521a]", children: [
          /* @__PURE__ */ jsx(LayoutDashboard, { className: "h-5 w-5" }),
          "Tableau de bord"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }),
          "Documents"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]", children: [
          /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5" }),
          "Activité"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]", children: [
          /* @__PURE__ */ jsx(Wallet, { className: "h-5 w-5" }),
          "Paiements"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-[#fd521a]/10 hover:text-[#fd521a]", children: [
          /* @__PURE__ */ jsx(Settings, { className: "h-5 w-5" }),
          "Paramètres"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-6 right-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-gray-50 p-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a] text-sm font-bold text-white", children: userInitials }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold", children: [
            application == null ? void 0 : application.firstName,
            " ",
            application == null ? void 0 : application.lastName
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400", children: statusInfo.label })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 p-6 md:p-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between md:hidden", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold tracking-tighter text-black", children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
          "DRIIVO"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a] text-sm font-bold text-white", children: userInitials })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("h1", { className: "mb-2 text-2xl font-bold", children: [
          "Bonjour ",
          userName,
          " 👋"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Voici où en est votre inscription." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `mb-8 rounded-2xl border-l-4 ${statusInfo.borderColor} bg-white p-6 shadow-sm`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: `flex h-12 w-12 items-center justify-center rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`, children: /* @__PURE__ */ jsx(StatusIcon, { className: `h-6 w-6 ${statusInfo.icon === Loader2 ? "animate-spin" : ""}` }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold", children: statusInfo.label }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: statusInfo.description })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "Votre progression" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-[#fd521a]", children: "2/5 complétées" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white", children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Candidature envoyée" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Complétée le 31/12/2024" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white", children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Email vérifié" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Complétée le 31/12/2024" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-amber-100 bg-amber-50 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-white", children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Vérification des documents" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "En cours... (24h max)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-400", children: "4" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-400", children: "Entretien téléphonique" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "15 min avec un conseiller" })
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/reunion", className: "text-xs font-bold text-[#fd521a] hover:underline", children: "Réserver" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-400", children: "5" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-400", children: "Signature du contrat" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Contrat en ligne" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 grid gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/reunion", className: "rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "mb-3 h-6 w-6 text-[#fd521a]" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Réserver un appel" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Poser vos questions" })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg", children: [
          /* @__PURE__ */ jsx(Upload, { className: "mb-3 h-6 w-6 text-[#fd521a]" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Ajouter un document" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Carte VTC, permis..." })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "mb-3 h-6 w-6 text-[#fd521a]" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Contacter le support" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Réponse sous 2h" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-[#fd521a]/10 bg-[#fd521a]/5 p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(Info, { className: "h-6 w-6 shrink-0 text-[#fd521a]" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-1 text-sm font-bold", children: "Prochaine étape" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Une fois vos documents validés, vous pourrez réserver un créneau pour un court entretien téléphonique (15 min). Ce sera l'occasion de valider ensemble les derniers détails." })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  EspacePage as component
};

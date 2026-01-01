import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Heart, PiggyBank, FileText, ArrowRight, MessageCircle } from "lucide-react";
import { R as Route } from "./router-BWK_hzyz.js";
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
function ResultatsPage() {
  const {
    ca,
    prenom
  } = Route.useSearch();
  const caNum = parseInt(ca) || 5e3;
  const fees = Math.round(caNum * 0.1);
  const cotisations = Math.round(caNum * 0.14);
  const net = caNum - fees - cotisations;
  const aeNet = Math.round(caNum * 0.75);
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white", children: [
    /* @__PURE__ */ jsx("nav", { className: "fixed left-0 top-6 z-50 flex w-full justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex max-w-3xl items-center gap-8 rounded-full border border-white/40 bg-white/60 px-3 py-2 pl-6 shadow-[0_8px_32px_-4px_rgba(168,162,158,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-2xl", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold tracking-tighter text-black", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
        "DRIIVO"
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg transition-colors hover:bg-[#fd521a]", children: "REJOINDRE" })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[900px] px-4 pb-20 pt-32 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
        /* @__PURE__ */ jsxs("h1", { className: "mb-3 text-3xl font-bold tracking-tight md:text-4xl", children: [
          prenom,
          ", voilà ce que ça donne"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500", children: [
          "Pour un CA de ",
          /* @__PURE__ */ jsxs("strong", { children: [
            formatNumber(caNum),
            " €"
          ] }),
          "/mois"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl md:p-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-2 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]", children: "Votre salaire net mensuel" }),
          /* @__PURE__ */ jsxs("div", { className: "text-6xl font-bold tracking-tighter text-[#111] md:text-7xl", children: [
            formatNumber(net),
            " €"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-400", children: "Après cotisations sociales et frais Driivo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-2xl border border-white bg-white/60 p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-sm font-bold", children: "Détail de votre rémunération" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Chiffre d'affaires HT" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                formatNumber(caNum),
                " €"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Frais Driivo (10%)" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-[#fd521a]", children: [
                "- ",
                formatNumber(fees),
                " €"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Cotisations sociales" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-gray-500", children: [
                "- ",
                formatNumber(cotisations),
                " €"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "my-2 h-px w-full bg-gray-200" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-800", children: "Salaire net" }),
              /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-green-600", children: [
                formatNumber(net),
                " €"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8 grid grid-cols-2 gap-4 md:grid-cols-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-green-50 p-4 text-center", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto mb-2 h-6 w-6 text-green-600" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-green-700", children: "Chômage" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-green-600", children: "Cotisé" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-blue-50 p-4 text-center", children: [
            /* @__PURE__ */ jsx(Heart, { className: "mx-auto mb-2 h-6 w-6 text-blue-600" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-blue-700", children: "Mutuelle" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-blue-600", children: "Incluse" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-purple-50 p-4 text-center", children: [
            /* @__PURE__ */ jsx(PiggyBank, { className: "mx-auto mb-2 h-6 w-6 text-purple-600" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-purple-700", children: "Retraite" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-purple-600", children: "Cotisée" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-amber-50 p-4 text-center", children: [
            /* @__PURE__ */ jsx(FileText, { className: "mx-auto mb-2 h-6 w-6 text-amber-600" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-amber-700", children: "Fiche de paie" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-amber-600", children: "Mensuelle" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-gray-100 bg-gray-50 p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-sm font-bold", children: "Comparaison avec votre statut actuel" }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-100 bg-white p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs font-bold text-gray-400", children: "Auto-Entrepreneur" }),
              /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-gray-400 line-through", children: [
                formatNumber(aeNet),
                " €"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-[10px] text-red-500", children: "❌ Pas de chômage ni retraite" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-[#fd521a]/20 bg-[#fd521a]/5 p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs font-bold text-[#fd521a]", children: "Avec Driivo" }),
              /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-[#111]", children: [
                formatNumber(net),
                " €"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-[10px] text-green-600", children: "✓ Protection sociale complète" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 text-center shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-2xl font-bold", children: "Ça vous paraît bien ?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 text-gray-500", children: "On peut démarrer ensemble en 48h." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-4 sm:flex-row", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/inscription", className: "flex items-center justify-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)]", children: [
            "C'est parti",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/reunion", className: "flex items-center justify-center gap-2 rounded-full bg-[#111] px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#fd521a]", children: [
            "J'ai des questions",
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "py-6 text-center text-xs text-gray-400", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-[#fd521a]", children: "← Retour à l'accueil" }) })
  ] });
}
export {
  ResultatsPage as component
};

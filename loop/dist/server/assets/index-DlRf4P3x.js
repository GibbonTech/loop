import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, ShieldOff, FileX2, Ban, Car, ArrowLeftRight, CreditCard, Unlock, ShieldCheck, Check, Star, ChevronDown } from "lucide-react";
function HomePage() {
  const [ca, setCa] = useState(5e3);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "app.driivo.fr") {
        window.location.href = "/login";
      }
    }
  }, []);
  const fees = Math.round(ca * 0.1);
  const cotisations = Math.round(ca * 0.14);
  const net = ca - fees - cotisations;
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, " ");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white", style: {
    backgroundImage: "radial-gradient(circle at 50% 0%, rgba(253, 82, 26, 0.03) 0%, transparent 50%)"
  }, children: [
    /* @__PURE__ */ jsx("nav", { className: "fixed left-0 top-6 z-50 flex w-full justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex max-w-3xl items-center gap-8 rounded-full border border-white/40 bg-white/60 px-3 py-2 pl-6 shadow-[0_8px_32px_-4px_rgba(168,162,158,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-2xl", children: [
      /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-2 text-lg font-bold tracking-tighter text-black", onClick: () => window.scrollTo(0, 0), children: [
        /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
        "DRIIVO"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex", children: [
        /* @__PURE__ */ jsx("a", { href: "#probleme", className: "transition-colors hover:text-black", children: "Le Problème" }),
        /* @__PURE__ */ jsx("a", { href: "#solution", className: "transition-colors hover:text-black", children: "La Solution" }),
        /* @__PURE__ */ jsx(Link, { to: "/simulateur", className: "transition-colors hover:text-black", children: "Simulateur" }),
        /* @__PURE__ */ jsx("a", { href: "#faq", className: "transition-colors hover:text-black", children: "FAQ" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#fd521a] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)]", children: "REJOINDRE" })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 mx-auto max-w-[1040px] px-4 pt-32 md:px-8 md:pt-40", children: [
      /* @__PURE__ */ jsxs("section", { className: "mb-16 flex min-h-[70vh] flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-full border border-white/50 bg-white/60 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#fd521a] shadow-sm backdrop-blur-md", children: "Nouveau Statut VTC" }),
        /* @__PURE__ */ jsxs("h1", { className: "mb-6 text-6xl font-[650] leading-[0.9] tracking-[-0.06em] text-[#111] md:text-7xl lg:text-[5.5rem]", children: [
          "Devenez",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#fd521a]", children: "entrepreneur salarié" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mb-10 max-w-xl text-xl font-medium leading-relaxed text-gray-600", children: [
          "Restez indépendant tout en bénéficiant d'un",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111]", children: "vrai CDI" }),
          " : fiche de paie, retraite, mutuelle, chômage.",
          /* @__PURE__ */ jsx("span", { className: "mt-2 block text-base text-gray-400", children: "La liberté en plus. La sécurité en prime." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/simulateur", className: "flex w-full items-center justify-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)] sm:w-auto", children: [
            "Simulez vos revenus",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "flex w-full items-center justify-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-6 py-4 text-base font-bold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/80 sm:w-auto", children: "Rejoindre maintenant" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-16 flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }),
            " Démarrage 48h"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }),
            " Sans engagement"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }),
            " 100% légal"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-8 border-t border-gray-200/50 pt-10 md:gap-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-[#111] md:text-4xl", children: "500+" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Chauffeurs actifs" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-[#fd521a] md:text-4xl", children: "+500€" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Gain moyen / mois" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-[#111] md:text-4xl", children: "10%" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Frais seulement" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "simulateur", className: "mb-10 py-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl md:p-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-2xl font-bold", children: "Combien vous reste-t-il en net ?" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Glissez le curseur pour voir votre salaire" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-baseline justify-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-5xl font-bold tracking-tighter text-[#111]", children: formatNumber(ca) }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl text-gray-300", children: "€/mois" })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "2000", max: "12000", step: "500", value: ca, onChange: (e) => setCa(parseInt(e.target.value)), className: "w-full accent-[#fd521a]" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-between text-xs text-gray-400", children: [
            /* @__PURE__ */ jsx("span", { children: "2 000 €" }),
            /* @__PURE__ */ jsx("span", { children: "12 000 €" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6 grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-green-50 p-4 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-green-600", children: "Votre salaire net" }),
            /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold text-green-700", children: [
              formatNumber(net),
              " €"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-gray-100 p-4 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-gray-500", children: "Cotisations payées" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-gray-600", children: [
              formatNumber(cotisations),
              " €"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400", children: "Chômage, retraite, mutuelle inclus" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:justify-center", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/simulateur", className: "flex items-center justify-center gap-2 rounded-full bg-[#fd521a] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]", children: [
            "Simulation détaillée",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-[#fd521a] hover:text-[#fd521a]", children: "Rejoindre maintenant" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "probleme", className: "mb-10 py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Le constat" }),
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: [
            "Chauffeur VTC n'est pas",
            /* @__PURE__ */ jsx("br", {}),
            "un métier facile."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-lg text-gray-500", children: "Le statut indépendant promet la liberté. Mais à quel prix ?" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-black/5 bg-gradient-to-b from-[#f7f7f5] to-[#f2f2f0] p-8", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500", children: /* @__PURE__ */ jsx(ShieldOff, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "Zéro protection sociale" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Pas de chômage si vous arrêtez. Pas de retraite digne. Une mutuelle hors de prix. En cas de pépin, vous êtes seul." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-black/5 bg-gradient-to-b from-[#f7f7f5] to-[#f2f2f0] p-8", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500", children: /* @__PURE__ */ jsx(FileX2, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "La paperasse sans fin" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Urssaf, TVA, comptabilité... Vous passez vos dimanches sur des formulaires au lieu de vous reposer ou d'être en famille." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-black/5 bg-gradient-to-b from-[#f7f7f5] to-[#f2f2f0] p-8", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500", children: /* @__PURE__ */ jsx(Ban, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "Les portes fermées" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Prêt immobilier refusé. Loueur qui exige des garanties. Sans fiche de paie, vous n'existez pas pour les banques." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm italic text-gray-400", children: "Et si vous pouviez garder la liberté... sans les inconvénients ?" }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "solution", className: "mb-10 py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]", children: "La solution" }),
          /* @__PURE__ */ jsxs("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: [
            "Driivo transforme votre CA",
            /* @__PURE__ */ jsx("br", {}),
            "en salaire."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-lg text-gray-500", children: "On ne change rien à votre façon de travailler. On change juste ce que vous gagnez." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "group relative rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5", children: "1" }),
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(Car, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "Vous roulez" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Uber, Bolt, Heetch... Gardez vos applis, vos clients, votre voiture. Vous restez le patron de vos horaires." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group relative rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5", children: "2" }),
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(ArrowLeftRight, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "On transforme" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Driivo encaisse votre CA, déduit la TVA et les frais, et transforme le reste en un vrai salaire net." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group relative rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5", children: "3" }),
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "Vous êtes payé" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Fiche de paie mensuelle, cotisations chômage et retraite payées. Vous recevez votre net, point final." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex min-h-[300px] flex-col justify-between rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-10 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl md:col-span-7", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400", children: [
              /* @__PURE__ */ jsx(Unlock, { className: "h-3 w-3" }),
              " Liberté Totale"
            ] }),
            /* @__PURE__ */ jsxs("h3", { className: "mb-4 text-3xl font-bold", children: [
              "Pas de patron.",
              /* @__PURE__ */ jsx("br", {}),
              "Jamais."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "max-w-sm text-gray-500", children: 'Contrairement aux "startups" qui veulent vous employer, Driivo est une coopérative. Vous êtes membre, pas employé. Vos décisions restent les vôtres.' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600", children: "Vos Horaires" }),
            /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600", children: "Vos Zones" }),
            /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600", children: "Vos Applis" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-[2.5rem] border border-white/50 bg-white/40 p-10 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl md:col-span-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3 w-3" }),
            " Sécurité Totale"
          ] }),
          /* @__PURE__ */ jsxs("h3", { className: "mb-4 text-2xl font-bold", children: [
            "Le filet de sécurité",
            /* @__PURE__ */ jsx("br", {}),
            "du salarié."
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm font-medium text-gray-600", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) }),
              "Chômage & Retraite"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm font-medium text-gray-600", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) }),
              "Mutuelle Santé"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm font-medium text-gray-600", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) }),
              "Prévoyance Accident"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm font-medium text-gray-600", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) }),
              "Fiche de paie mensuelle"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-4 overflow-hidden rounded-[2.5rem] border border-[#fd521a]/10 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl md:col-span-12 md:p-12", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -mr-20 -mt-20 right-0 top-0 h-64 w-64 rounded-full bg-[#fd521a]/5 blur-3xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-end justify-between gap-8 md:flex-row md:items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4 inline-block rounded-full bg-[#fd521a]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]", children: "Le Pacte Driivo" }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-3xl font-bold", children: "90% pour vous." }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "On prend 10% pour faire tourner la coopérative. Le reste est à vous. C'est ça, la transparence." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full rounded-3xl border border-white/60 bg-white/50 p-6 md:w-1/2", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between text-sm font-bold", children: [
                  /* @__PURE__ */ jsx("span", { children: "Votre Part" }),
                  /* @__PURE__ */ jsx("span", { className: "text-green-600", children: "90%" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-3 w-full overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx("div", { className: "h-full w-[90%] rounded-r-full bg-[#111]" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between text-sm font-bold", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[#fd521a]", children: "Frais Driivo" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[#fd521a]", children: "10%" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-3 w-full overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx("div", { className: "h-full w-[10%] rounded-r-full bg-[#fd521a]" }) }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-right text-[10px] text-gray-400", children: "*Contre 15-20% chez les concurrents" })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Ils nous font confiance" }),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold", children: "Ce que les chauffeurs disent de nous" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-1 text-[#fd521a]", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm leading-relaxed text-gray-600", children: `"Depuis que j'ai rejoint en Mars, j'ai enfin pu obtenir un prêt pour ma maison. La fiche de paie change tout."` }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold", children: "KM" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Karim M." }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Chauffeur depuis 4 ans • Paris" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-1 text-[#fd521a]", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm leading-relaxed text-gray-600", children: `"Je gagne pareil qu'avant mais maintenant je cotise pour ma retraite. Et surtout, plus de galère avec l'Urssaf."` }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold", children: "AB" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Abdel B." }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Chauffeur depuis 2 ans • Lyon" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-1 text-[#fd521a]", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }),
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm leading-relaxed text-gray-600", children: `"J'étais sceptique au début. Mais quand j'ai vu ma première fiche de paie avec les cotisations, j'ai compris."` }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold", children: "SD" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Sofiane D." }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Chauffeur depuis 6 ans • Marseille" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-16 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-6 text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Compatible avec toutes vos applis préférées" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-8 opacity-50", children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold tracking-tighter", children: "Uber" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold tracking-tighter", children: "Bolt" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold tracking-tighter", children: "Heetch" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold tracking-tighter", children: "FreeNow" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold tracking-tighter", children: "+6" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Inscription" }),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold", children: "5 étapes pour devenir chauffeur Driivo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fd521a] font-bold text-white", children: "1" }),
            /* @__PURE__ */ jsx("h4", { className: "mb-1 text-sm font-bold", children: "Candidature" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "2 minutes en ligne" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600", children: "2" }),
            /* @__PURE__ */ jsx("h4", { className: "mb-1 text-sm font-bold", children: "Vérification" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "On valide vos docs" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600", children: "3" }),
            /* @__PURE__ */ jsx("h4", { className: "mb-1 text-sm font-bold", children: "Entretien" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Appel de 15 min" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600", children: "4" }),
            /* @__PURE__ */ jsx("h4", { className: "mb-1 text-sm font-bold", children: "Signature" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Contrat en ligne" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 font-bold text-white", children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("h4", { className: "mb-1 text-sm font-bold", children: "C'est parti !" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Roulez dès 48h" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxs(Link, { to: "/inscription", className: "inline-flex items-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]", children: [
          "Commencer ma candidature",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "faq", className: "mx-auto max-w-2xl py-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "FAQ" }),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold", children: "Les réponses à vos questions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("details", { className: "group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex list-none select-none items-center justify-between text-sm font-bold", children: [
              "C'est quoi exactement l'Entrepreneur Salarié ?",
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-500", children: "C'est un statut légal (CESA) qui vous permet de rester totalement indépendant dans votre activité, tout en étant rattaché à une coopérative (comme Driivo) qui vous verse un salaire. Vous gardez votre liberté, mais vous gagnez la protection sociale d'un salarié." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex list-none select-none items-center justify-between text-sm font-bold", children: [
              "Est-ce que c'est un vrai CDI ?",
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-500", children: "Oui. C'est un CDI inscrit au registre du commerce. Vous recevez une fiche de paie tous les mois, vous cotisez pour la retraite et le chômage, et vous bénéficiez d'une mutuelle. C'est le statut le plus protecteur qui existe pour un chauffeur VTC." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex list-none select-none items-center justify-between text-sm font-bold", children: [
              "Je garde mes horaires et mes applis ?",
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-500", children: "100% oui. Vous travaillez quand vous voulez, où vous voulez, sur les plateformes que vous voulez (Uber, Bolt, Heetch...). Driivo ne vous impose rien. C'est ça, le modèle coopératif." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex list-none select-none items-center justify-between text-sm font-bold", children: [
              "Combien ça coûte ?",
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-500", children: "10% de votre chiffre d'affaires HT. C'est tout. Pas de frais cachés, pas de coûts d'inscription. On est moins cher que la concurrence (15-20%), et vous récupérez la TVA sur vos achats (essence, entretien...)." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex list-none select-none items-center justify-between text-sm font-bold", children: [
              "Il y a un engagement de durée ?",
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-500", children: "Non. Vous pouvez partir quand vous voulez, sans frais ni pénalités. On ne vous retient pas. Si Driivo ne vous convient pas, vous êtes libre." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex list-none select-none items-center justify-between text-sm font-bold", children: [
              "Quelles sont les conditions pour rejoindre ?",
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-500", children: "Avoir votre carte VTC et un véhicule. C'est tout. Si vous roulez déjà en indépendant, vous avez déjà ce qu'il faut. On s'occupe du reste." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[3rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-12 text-center shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -ml-32 -mt-32 left-0 top-0 h-64 w-64 rounded-full bg-[#fd521a]/10 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -mb-32 -mr-32 bottom-0 right-0 h-64 w-64 rounded-full bg-[#fd521a]/10 blur-3xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold md:text-4xl", children: "On commence quand ?" }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mb-8 max-w-md text-gray-500", children: '48h pour passer de "intéressé" à "premier salaire versé".' }),
          /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "inline-block rounded-full bg-[#fd521a] px-10 py-4 text-lg font-bold text-white shadow-xl transition-transform hover:scale-105", children: "Je me lance" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("footer", { className: "border-t border-gray-200/50 py-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between gap-6 md:flex-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-lg font-bold tracking-tighter text-black", children: [
            /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
            "DRIIVO"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-400", children: [
            /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-black", children: "Mentions Légales" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-black", children: "CGV" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-black", children: "Politique de Cookies" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "transition-colors hover:text-black", children: "Contact" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-xs text-gray-400", children: "© 2025 Coopérative Driivo. Tous droits réservés." })
      ] })
    ] })
  ] });
}
export {
  HomePage as component
};

import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Car, ArrowLeftRight, CreditCard, Unlock, ShieldCheck, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
function HomePage() {
  const [ca, setCa] = useState(5e3);
  const net = Math.round(ca * 0.76);
  const charges = ca - net;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white", style: {
    backgroundImage: "radial-gradient(circle at 50% 0%, rgba(253, 82, 26, 0.03) 0%, transparent 50%)"
  }, children: [
    /* @__PURE__ */ jsx("nav", { className: "fixed left-0 top-6 z-50 flex w-full justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex max-w-3xl items-center gap-8 rounded-full bg-white/70 px-3 py-2 pl-6 shadow-lg backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center gap-2 text-lg font-bold tracking-tighter text-black", onClick: () => window.scrollTo(0, 0), children: [
        /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
        "LOOP"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex", children: [
        /* @__PURE__ */ jsx("a", { href: "#mission", className: "transition-colors hover:text-black", children: "Mission" }),
        /* @__PURE__ */ jsx(Link, { to: "/simulateur", className: "transition-colors hover:text-black", children: "Simulateur" }),
        /* @__PURE__ */ jsx("a", { href: "#revenus", className: "transition-colors hover:text-black", children: "Gains" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg transition-colors hover:bg-[#fd521a]", children: "REJOINDRE" })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 mx-auto max-w-[1040px] px-4 pt-32 md:px-8 md:pt-40", children: [
      /* @__PURE__ */ jsxs("section", { className: "mb-24 flex min-h-[60vh] flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6 animate-fade-in rounded-full border border-white/50 bg-white/60 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#fd521a] shadow-sm backdrop-blur-md", children: "La Première Coopérative VTC" }),
        /* @__PURE__ */ jsxs("h1", { className: "mb-6 text-6xl font-bold tracking-tight text-[#111] md:text-7xl lg:text-[5.5rem]", children: [
          "Indépendant.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-gray-400/80", children: "Protégé." })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mb-10 max-w-lg text-xl font-medium leading-relaxed text-gray-600", children: [
          "Transformez votre activité VTC en",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-[#111]", children: "salaire" }),
          " sans jamais avoir de patron.",
          /* @__PURE__ */ jsx("span", { className: "mt-2 block text-base text-gray-400", children: "Le statut de salarié. La liberté de l'indépendant." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-16 flex w-full flex-col items-center justify-center gap-4 sm:flex-row", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/simulateur", className: "flex w-full items-center justify-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl sm:w-auto", children: [
            "Simulez vos revenus",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white/50 px-6 py-4 text-base font-bold backdrop-blur-sm transition-all hover:-translate-y-1 sm:w-auto", children: "Rejoindre maintenant" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-8 opacity-40 grayscale transition-opacity duration-500 hover:opacity-100 hover:grayscale-0 md:gap-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-[#111]", children: "10%" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: "Frais seulement" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-[#111]", children: "0" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: "Paperasse" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-[#111]", children: "100%" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: "Liberté" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mb-10 py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-16 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold", children: "Comment ça marche ?" }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-lg text-gray-500", children: "On ne change rien à votre façon de travailler. On change juste ce que vous gagnez." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "group relative rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5", children: "1" }),
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(Car, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "Vous roulez" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Uber, Bolt, Heetch... Gardez vos applis, vos clients, votre voiture. Vous restez le patron." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group relative rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5", children: "2" }),
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(ArrowLeftRight, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "On transforme" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Loop encaisse votre CA, déduit la TVA et les frais, et transforme le reste en salaire net." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group relative rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5", children: "3" }),
            /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold", children: "Vous encaissez" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-500", children: "Fiche de paie, cotisations chômage, retraite. Tout est payé. Vous recevez votre net." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "mission", className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex min-h-[300px] flex-col justify-between rounded-[2.5rem] border border-white/60 bg-white/50 p-10 shadow-sm backdrop-blur-sm md:col-span-7", children: [
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
            /* @__PURE__ */ jsx("p", { className: "max-w-sm text-gray-500", children: 'Contrairement aux "startups" qui veulent vous salarier, Loop est une coopérative. Vous êtes membre, pas employé.' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600", children: "Vos Horaires" }),
            /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600", children: "Vos Zones" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-[2.5rem] border border-white/60 bg-white/40 p-10 shadow-sm backdrop-blur-sm md:col-span-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3 w-3" }),
            " Sécurité"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold", children: "Le filet de sécurité du salarié." }),
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
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "revenus", className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-[2.5rem] border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-6 text-2xl font-bold", children: "Simulateur" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Votre CA Mensuel" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-6xl font-bold tracking-tighter text-[#111]", children: ca }),
              /* @__PURE__ */ jsx("span", { className: "text-2xl text-gray-300", children: "€" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "3000", max: "10000", step: "500", value: ca, onChange: (e) => setCa(parseInt(e.target.value)), className: "mb-10 w-full accent-[#fd521a]" }),
          /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-white bg-white/60 p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "mb-1 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]", children: "Net dans votre poche" }),
              /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold tracking-tight", children: [
                net,
                " €"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Frais & Charges" }),
              /* @__PURE__ */ jsxs("div", { className: "text-lg font-bold text-gray-500", children: [
                charges,
                " €"
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center", children: /* @__PURE__ */ jsx("div", { className: "scale-105 rounded-[2rem] bg-[#fd521a] p-6 text-white shadow-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-white", children: "LOOP" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-bold text-[#ff8a65]", children: "10% • Protection Totale" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#fd521a]", children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-2xl py-20", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-10 text-center text-2xl font-bold", children: "Questions Fréquentes" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("details", { className: "group cursor-pointer rounded-2xl border border-white/60 bg-white/50 p-5 shadow-sm backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex list-none select-none items-center justify-between text-sm font-bold", children: [
              "Est-ce un CDI ?",
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-500", children: "Non, vous restez indépendant. C'est un statut hybride (Entrepreneur Salarié) qui combine le meilleur des deux mondes." })
          ] }),
          /* @__PURE__ */ jsxs("details", { className: "group cursor-pointer rounded-2xl border border-white/60 bg-white/50 p-5 shadow-sm backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex list-none select-none items-center justify-between text-sm font-bold", children: [
              "Engagement de durée ?",
              /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-500", children: "Aucun. Vous partez quand vous voulez. Liberté totale." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "py-20 text-center", children: [
        /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "rounded-full bg-[#fd521a] px-10 py-4 text-lg font-bold text-white shadow-xl transition-transform hover:scale-105", children: "Devenir Membre Loop" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-xs uppercase tracking-widest text-gray-400", children: "Sans engagement • Démarrage 48h" })
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "border-t border-gray-200/50 py-10 text-center text-xs font-medium text-gray-400", children: /* @__PURE__ */ jsx("p", { children: "© 2025 Coopérative Loop. Fait par des chauffeurs, pour des chauffeurs." }) })
    ] })
  ] });
}
export {
  HomePage as component
};

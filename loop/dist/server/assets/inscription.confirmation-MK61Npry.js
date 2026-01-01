import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Calendar, LayoutDashboard, Gift } from "lucide-react";
import { useState, useEffect } from "react";
function ConfirmationPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen items-center justify-center bg-[#f2f2f0] px-4 py-20", children: [
    showConfetti && /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 z-50", children: Array.from({
      length: 50
    }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "absolute animate-fall", style: {
      left: `${Math.random() * 100}%`,
      top: "-10px",
      width: "10px",
      height: "10px",
      backgroundColor: ["#fd521a", "#22c55e", "#3b82f6", "#eab308", "#ec4899"][Math.floor(Math.random() * 5)],
      borderRadius: Math.random() > 0.5 ? "50%" : "0",
      animation: `fall ${2 + Math.random()}s linear forwards`,
      animationDelay: `${i * 0.05}s`
    } }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[500px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-[2.5rem] border border-white/60 bg-white/50 p-10 text-center shadow-lg backdrop-blur-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-10 w-10" }) }),
        /* @__PURE__ */ jsx("h1", { className: "mb-3 text-3xl font-bold tracking-tight", children: "Candidature envoyée !" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "Merci d'avoir choisi Loop. Notre équipe va examiner votre dossier et vous contacter dans les 24h." }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-2xl bg-gray-50 p-6 text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-sm font-bold", children: "Prochaines étapes" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fd521a] text-xs font-bold text-white", children: "1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Vérification (24h)" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "On valide vos documents" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600", children: "2" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Entretien (15 min)" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "On répond à vos questions" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600", children: "3" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Signature" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Contrat en ligne" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-green-600", children: "Vous roulez !" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Démarrage en 48h" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/reunion", className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            "Réserver un créneau d'appel"
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/espace", className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[#111] py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#fd521a]", children: [
            /* @__PURE__ */ jsx(LayoutDashboard, { className: "h-5 w-5" }),
            "Accéder à mon espace"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/60 bg-white/50 p-6 text-center shadow-sm backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Gift, { className: "h-5 w-5 text-[#fd521a]" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: "Parrainez un ami" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs text-gray-500", children: "Pour chaque chauffeur que vous parrainez, recevez 100€ après son activation." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("input", { type: "text", value: "https://loop.fr/r/JD2025", readOnly: true, className: "flex-1 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-xs" }),
          /* @__PURE__ */ jsx("button", { onClick: () => navigator.clipboard.writeText("https://loop.fr/r/JD2025"), className: "rounded-lg bg-[#fd521a] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#e04a17]", children: "Copier" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-xs text-gray-400 hover:text-[#fd521a]", children: "← Retour à l'accueil" }) })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      ` })
  ] });
}
export {
  ConfirmationPage as component
};

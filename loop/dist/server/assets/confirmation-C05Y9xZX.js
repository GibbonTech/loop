import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, Calendar, LayoutDashboard, Gift } from "lucide-react";
import { toast } from "sonner";
import { P as PageLayout } from "./PageLayout-CbC1USKP.js";
function ConfirmationPage() {
  useEffect(() => {
    const colors = ["#fd521a", "#22c55e", "#3b82f6", "#eab308", "#ec4899"];
    const container = document.getElementById("confetti-container");
    if (container) {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement("div");
          confetti.className = "confetti";
          confetti.style.position = "fixed";
          confetti.style.width = "10px";
          confetti.style.height = "10px";
          confetti.style.left = Math.random() * 100 + "%";
          confetti.style.top = "-10px";
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
          confetti.style.animation = "fall 3s linear forwards";
          container.appendChild(confetti);
          setTimeout(() => confetti.remove(), 3e3);
        }, i * 50);
      }
    }
  }, []);
  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://driivo.fr/r/JD2025");
    toast.success("Lien copié !");
  };
  return /* @__PURE__ */ jsxs(PageLayout, { showNavbar: false, children: [
    /* @__PURE__ */ jsx("div", { id: "confetti-container", className: "pointer-events-none fixed inset-0 z-50" }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      ` }),
    /* @__PURE__ */ jsx("main", { className: "flex min-h-screen items-center justify-center px-4 py-20", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[500px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-10 text-center shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(Check, { className: "h-10 w-10" }) }),
        /* @__PURE__ */ jsx("h1", { className: "mb-3 text-3xl font-bold tracking-tight", children: "Candidature envoyée !" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "Merci d'avoir choisi Driivo. Notre équipe va examiner votre dossier et vous contacter dans les 24h." }),
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
              /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-green-600", children: "Vous roulez !" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Démarrage en 48h" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/reunion", className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }),
            "Réserver un créneau d'appel"
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/espace", className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[#111] py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#fd521a]", children: [
            /* @__PURE__ */ jsx(LayoutDashboard, { className: "h-5 w-5" }),
            "Accéder à mon espace"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-6 text-center shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Gift, { className: "h-5 w-5 text-[#fd521a]" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: "Parrainez un ami" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs text-gray-500", children: "Pour chaque chauffeur que vous parrainez, recevez 100€ après son activation." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("input", { type: "text", value: "https://driivo.fr/r/JD2025", readOnly: true, className: "flex-1 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-xs" }),
          /* @__PURE__ */ jsx("button", { onClick: copyReferralLink, className: "rounded-lg bg-[#fd521a] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#e0410e]", children: "Copier" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-xs text-gray-400 hover:text-[#fd521a]", children: "← Retour à l'accueil" }) })
    ] }) })
  ] });
}
export {
  ConfirmationPage as component
};

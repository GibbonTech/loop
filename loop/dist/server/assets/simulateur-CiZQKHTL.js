import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ArrowRight, Clock, Phone } from "lucide-react";
function SimulateurPage() {
  const navigate = useNavigate();
  const [ca, setCa] = useState(5e3);
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    telephone: ""
  });
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: formData.prenom,
          email: formData.email,
          phone: formData.telephone,
          monthlyRevenue: ca.toString(),
          source: "SIMULATEUR"
        })
      });
    } catch (error) {
      console.error("Error saving lead:", error);
    }
    navigate({
      to: "/resultats",
      search: {
        ca: ca.toString(),
        prenom: formData.prenom,
        email: formData.email,
        tel: formData.telephone
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f2f2f0] selection:bg-[#fd521a] selection:text-white", children: [
    /* @__PURE__ */ jsx("nav", { className: "fixed left-0 top-6 z-50 flex w-full justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex max-w-3xl items-center gap-8 rounded-full bg-white/70 px-3 py-2 pl-6 shadow-lg backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold tracking-tighter text-black", children: [
        /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
        "LOOP"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "transition-colors hover:text-black", children: "Accueil" }),
        /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "transition-colors hover:text-black", children: "Rejoindre" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/inscription", className: "rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg transition-colors hover:bg-[#fd521a]", children: "REJOINDRE" })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[800px] px-4 pb-20 pt-32 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxs("h1", { className: "mb-4 text-4xl font-bold tracking-tight md:text-5xl", children: [
          "Combien vous reste-t-il",
          /* @__PURE__ */ jsx("br", {}),
          "en ",
          /* @__PURE__ */ jsx("span", { className: "text-[#fd521a]", children: "net" }),
          " chaque mois ?"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-md text-gray-500", children: "Glissez le curseur. On calcule tout : salaire, cotisations, protection sociale." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-[2.5rem] border border-white/60 bg-white/50 p-8 shadow-lg backdrop-blur-sm md:p-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsx("label", { className: "mb-3 block text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Votre chiffre d'affaires mensuel (CA HT)" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-6xl font-bold tracking-tighter text-[#111] md:text-7xl", children: formatNumber(ca) }),
            /* @__PURE__ */ jsx("span", { className: "text-3xl text-gray-300", children: "€" })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "range", min: "2000", max: "12000", step: "500", value: ca, onChange: (e) => setCa(parseInt(e.target.value)), className: "w-full accent-[#fd521a]" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-between text-xs text-gray-400", children: [
            /* @__PURE__ */ jsx("span", { children: "2 000 €" }),
            /* @__PURE__ */ jsx("span", { children: "12 000 €" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "pointer-events-none select-none blur-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-2xl border border-white bg-white/60 p-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "mb-1 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]", children: "Votre salaire net" }),
                /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold tracking-tight", children: "3 800 €" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Cotisations payées" }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-500", children: "1 200 €" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-green-50 p-4", children: /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-green-700", children: "Chômage" }) }),
              /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-blue-50 p-4", children: /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-blue-700", children: "Mutuelle" }) }),
              /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-purple-50 p-4", children: /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-purple-700", children: "Retraite" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center rounded-2xl bg-white/30 backdrop-blur-[2px]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx(Lock, { className: "mx-auto mb-3 h-8 w-8 text-gray-400" }),
            /* @__PURE__ */ jsx("p", { className: "mb-1 text-sm font-bold text-gray-600", children: "Résultats personnalisés" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Entrez vos infos pour voir vos résultats" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-lg backdrop-blur-sm", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Votre prénom" }),
          /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "Jean", value: formData.prenom, onChange: (e) => setFormData({
            ...formData,
            prenom: e.target.value
          }), className: "w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Votre email" }),
          /* @__PURE__ */ jsx("input", { type: "email", required: true, placeholder: "jean@example.com", value: formData.email, onChange: (e) => setFormData({
            ...formData,
            email: e.target.value
          }), className: "w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Votre téléphone" }),
          /* @__PURE__ */ jsx("input", { type: "tel", required: true, placeholder: "06 12 34 56 78", value: formData.telephone, onChange: (e) => setFormData({
            ...formData,
            telephone: e.target.value
          }), className: "w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20" })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "submit", className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl", children: [
          "Voir mes résultats",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-gray-400", children: "En continuant, vous acceptez notre politique de confidentialité. Nous ne spammons pas." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-500", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-[#fd521a]" }),
          " Réponse en 24h"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-[#fd521a]" }),
          " On vous rappelle"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "py-6 text-center text-xs text-gray-400", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-[#fd521a]", children: "← Retour à l'accueil" }) })
  ] });
}
export {
  SimulateurPage as component
};

import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Heart, PiggyBank, ArrowRight, Clock, Phone } from "lucide-react";
import { P as PageLayout } from "./PageLayout-DMqHJ0L9.js";
import { f as formatNumber, g as getSalaryBreakdown } from "./utils-F-PHeznE.js";
import { v as validateForm, s as simulateurFormSchema } from "./validations-L2IWRFpm.js";
import "clsx";
import "zod";
function SimulateurPage() {
  const navigate = useNavigate();
  const [ca, setCa] = useState(5e3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    telephone: ""
  });
  const [errors, setErrors] = useState({});
  const {
    net,
    cotisations
  } = getSalaryBreakdown(ca);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(simulateurFormSchema, formData);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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
  return /* @__PURE__ */ jsxs(PageLayout, { navbarVariant: "minimal", children: [
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
      /* @__PURE__ */ jsxs("div", { className: "mb-8 rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl md:p-12", children: [
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
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-2xl border border-white bg-white/60 p-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "mb-1 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]", children: "Votre salaire net" }),
              /* @__PURE__ */ jsxs("div", { className: "text-4xl font-bold tracking-tight text-green-600", children: [
                formatNumber(net),
                " €"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400", children: "Cotisations payées" }),
              /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-gray-500", children: [
                formatNumber(cotisations),
                " €"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-green-50 p-4", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto mb-2 h-6 w-6 text-green-600" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-green-700", children: "Chômage" }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-green-600", children: "Cotisé" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-blue-50 p-4", children: [
              /* @__PURE__ */ jsx(Heart, { className: "mx-auto mb-2 h-6 w-6 text-blue-600" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-blue-700", children: "Mutuelle" }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-blue-600", children: "Incluse" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-purple-50 p-4", children: [
              /* @__PURE__ */ jsx(PiggyBank, { className: "mx-auto mb-2 h-6 w-6 text-purple-600" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-purple-700", children: "Retraite" }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-purple-600", children: "Cotisée" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Votre prénom" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Jean", value: formData.prenom, onChange: (e) => setFormData({
            ...formData,
            prenom: e.target.value
          }), className: `w-full rounded-xl border bg-white/80 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-[3px] ${errors.prenom ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-black/8 focus:border-[#fd521a] focus:ring-[#fd521a]/10"}` }),
          errors.prenom && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.prenom })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Votre email" }),
          /* @__PURE__ */ jsx("input", { type: "email", placeholder: "jean@example.com", value: formData.email, onChange: (e) => setFormData({
            ...formData,
            email: e.target.value
          }), className: `w-full rounded-xl border bg-white/80 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-[3px] ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-black/8 focus:border-[#fd521a] focus:ring-[#fd521a]/10"}` }),
          errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Votre téléphone" }),
          /* @__PURE__ */ jsx("input", { type: "tel", placeholder: "06 12 34 56 78", value: formData.telephone, onChange: (e) => setFormData({
            ...formData,
            telephone: e.target.value
          }), className: `w-full rounded-xl border bg-white/80 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-[3px] ${errors.telephone ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-black/8 focus:border-[#fd521a] focus:ring-[#fd521a]/10"}` }),
          errors.telephone && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.telephone })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "submit", disabled: isSubmitting, className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)] disabled:cursor-not-allowed disabled:opacity-70", children: [
          isSubmitting ? "Chargement..." : "Voir le détail complet",
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

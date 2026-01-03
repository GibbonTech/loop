import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, User, ArrowRight, FileText, Car, Lock } from "lucide-react";
import { P as PageLayout } from "./PageLayout-C-EQsMZ0.js";
function InscriptionPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    ville: "",
    carteVtc: "",
    numeroCarteVtc: "",
    experience: "",
    vehicule: "",
    vehiculeModele: "",
    plateformes: [],
    caMensuel: ""
  });
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const togglePlateforme = (platform) => {
    setFormData((prev) => ({
      ...prev,
      plateformes: prev.plateformes.includes(platform) ? prev.plateformes.filter((p) => p !== platform) : [...prev.plateformes, platform]
    }));
  };
  const nextStep = (step) => {
    setCurrentStep(step);
  };
  const prevStep = (step) => {
    setCurrentStep(step);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const apiData = {
        firstName: formData.prenom,
        lastName: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        activityType: "VTC",
        hasVtcLicense: formData.carteVtc,
        yearsExperience: formData.experience,
        currentPlatforms: formData.plateformes,
        hasVehicle: formData.vehicule ? "yes" : "no",
        vehicleType: formData.vehiculeModele,
        monthlyRevenue: formData.caMensuel
      };
      await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiData)
      });
      navigate({
        to: "/inscription/confirmation"
      });
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx(PageLayout, { showNavLinks: false, children: /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[600px] px-4 pb-20 pt-32 md:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-3 text-3xl font-bold tracking-tight md:text-4xl", children: "Rejoindre Driivo" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "3 étapes simples. Moins de 5 minutes." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${currentStep >= 1 ? currentStep > 1 ? "bg-green-500 text-white" : "bg-[#fd521a] text-white" : "bg-gray-200"}`, children: currentStep > 1 ? /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" }) : "1" }),
      /* @__PURE__ */ jsx("div", { className: "h-1 w-12 overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#fd521a] transition-all duration-300", style: {
        width: currentStep > 1 ? "100%" : "0%"
      } }) }),
      /* @__PURE__ */ jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${currentStep >= 2 ? currentStep > 2 ? "bg-green-500 text-white" : "bg-[#fd521a] text-white" : "bg-gray-200"}`, children: currentStep > 2 ? /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" }) : "2" }),
      /* @__PURE__ */ jsx("div", { className: "h-1 w-12 overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#fd521a] transition-all duration-300", style: {
        width: currentStep > 2 ? "100%" : "0%"
      } }) }),
      /* @__PURE__ */ jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${currentStep >= 3 ? "bg-[#fd521a] text-white" : "bg-gray-200"}`, children: "3" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      currentStep === 1 && /* @__PURE__ */ jsxs("div", { className: "animate-fadeIn", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(User, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "Vos informations" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Dites-nous qui vous êtes" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Prénom *" }),
              /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "Jean", value: formData.prenom, onChange: (e) => updateField("prenom", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Nom *" }),
              /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "Dupont", value: formData.nom, onChange: (e) => updateField("nom", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Email *" }),
            /* @__PURE__ */ jsx("input", { type: "email", required: true, placeholder: "jean@example.com", value: formData.email, onChange: (e) => updateField("email", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Téléphone *" }),
            /* @__PURE__ */ jsx("input", { type: "tel", required: true, placeholder: "06 12 34 56 78", value: formData.telephone, onChange: (e) => updateField("telephone", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Ville *" }),
            /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "Paris", value: formData.ville, onChange: (e) => updateField("ville", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => nextStep(2), className: "mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]", children: [
          "Continuer",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
        ] })
      ] }),
      currentStep === 2 && /* @__PURE__ */ jsxs("div", { className: "animate-fadeIn", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "Vos documents" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Confirmez votre éligibilité" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Avez-vous une carte VTC ? *" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("label", { className: `flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all hover:border-[#fd521a] ${formData.carteVtc === "oui" ? "border-[#fd521a] bg-[#fd521a]/5" : "border-black/8 bg-white/90"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "carteVtc", value: "oui", checked: formData.carteVtc === "oui", onChange: (e) => updateField("carteVtc", e.target.value), className: "accent-[#fd521a]" }),
                /* @__PURE__ */ jsx("span", { children: "Oui" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: `flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all hover:border-[#fd521a] ${formData.carteVtc === "non" ? "border-[#fd521a] bg-[#fd521a]/5" : "border-black/8 bg-white/90"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "carteVtc", value: "non", checked: formData.carteVtc === "non", onChange: (e) => updateField("carteVtc", e.target.value), className: "accent-[#fd521a]" }),
                /* @__PURE__ */ jsx("span", { children: "Non (en cours)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Numéro de carte VTC" }),
            /* @__PURE__ */ jsx("input", { type: "text", placeholder: "VTC-XXXXXXXX", value: formData.numeroCarteVtc, onChange: (e) => updateField("numeroCarteVtc", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[10px] text-gray-400", children: "Optionnel pour le moment" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Depuis combien de temps roulez-vous ? *" }),
            /* @__PURE__ */ jsxs("select", { required: true, value: formData.experience, onChange: (e) => updateField("experience", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Sélectionnez..." }),
              /* @__PURE__ */ jsx("option", { value: "moins_1an", children: "Moins d'1 an" }),
              /* @__PURE__ */ jsx("option", { value: "1_3ans", children: "1 à 3 ans" }),
              /* @__PURE__ */ jsx("option", { value: "3_5ans", children: "3 à 5 ans" }),
              /* @__PURE__ */ jsx("option", { value: "plus_5ans", children: "Plus de 5 ans" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-4", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => prevStep(1), className: "flex-1 rounded-xl border border-gray-200 bg-white py-4 text-base font-bold transition-colors hover:bg-gray-50", children: "Retour" }),
          /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => nextStep(3), className: "flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]", children: [
            "Continuer",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
          ] })
        ] })
      ] }),
      currentStep === 3 && /* @__PURE__ */ jsxs("div", { className: "animate-fadeIn", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(Car, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "Votre véhicule" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Décrivez votre outil de travail" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Avez-vous un véhicule ? *" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("label", { className: `flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all hover:border-[#fd521a] ${formData.vehicule === "oui" ? "border-[#fd521a] bg-[#fd521a]/5" : "border-black/8 bg-white/90"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "vehicule", value: "oui", checked: formData.vehicule === "oui", onChange: (e) => updateField("vehicule", e.target.value), className: "accent-[#fd521a]" }),
                /* @__PURE__ */ jsx("span", { children: "Oui" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: `flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all hover:border-[#fd521a] ${formData.vehicule === "besoin" ? "border-[#fd521a] bg-[#fd521a]/5" : "border-black/8 bg-white/90"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", name: "vehicule", value: "besoin", checked: formData.vehicule === "besoin", onChange: (e) => updateField("vehicule", e.target.value), className: "accent-[#fd521a]" }),
                /* @__PURE__ */ jsx("span", { children: "J'en ai besoin" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Marque et modèle" }),
            /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Ex: Tesla Model 3", value: formData.vehiculeModele, onChange: (e) => updateField("vehiculeModele", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Sur quelles plateformes roulez-vous ? *" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: ["uber", "bolt", "heetch", "freenow"].map((platform) => /* @__PURE__ */ jsxs("label", { className: `flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all hover:border-[#fd521a] ${formData.plateformes.includes(platform) ? "border-[#fd521a] bg-[#fd521a]/5" : "border-black/8 bg-white/90"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", checked: formData.plateformes.includes(platform), onChange: () => togglePlateforme(platform), className: "accent-[#fd521a]" }),
              /* @__PURE__ */ jsx("span", { className: "capitalize", children: platform })
            ] }, platform)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-bold text-gray-700", children: "Chiffre d'affaires mensuel moyen" }),
            /* @__PURE__ */ jsxs("select", { value: formData.caMensuel, onChange: (e) => updateField("caMensuel", e.target.value), className: "w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Sélectionnez..." }),
              /* @__PURE__ */ jsx("option", { value: "moins_3000", children: "Moins de 3 000 €" }),
              /* @__PURE__ */ jsx("option", { value: "3000_5000", children: "3 000 € - 5 000 €" }),
              /* @__PURE__ */ jsx("option", { value: "5000_7000", children: "5 000 € - 7 000 €" }),
              /* @__PURE__ */ jsx("option", { value: "7000_10000", children: "7 000 € - 10 000 €" }),
              /* @__PURE__ */ jsx("option", { value: "plus_10000", children: "Plus de 10 000 €" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-4", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => prevStep(2), className: "flex-1 rounded-xl border border-gray-200 bg-white py-4 text-base font-bold transition-colors hover:bg-gray-50", children: "Retour" }),
          /* @__PURE__ */ jsxs("button", { type: "submit", disabled: isSubmitting, className: "flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] disabled:cursor-not-allowed disabled:opacity-50", children: [
            isSubmitting ? "Envoi..." : "Envoyer ma candidature",
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-gray-400", children: [
      /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { children: "Vos données sont sécurisées et ne seront jamais partagées." })
    ] }) })
  ] }) });
}
export {
  InscriptionPage as component
};

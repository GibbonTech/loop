import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Car, Truck, Briefcase, ShoppingBag, Check, User, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
const TOTAL_STEPS = 6;
const activityOptions = [{
  id: "vtc",
  label: "Chauffeur VTC",
  icon: Car
}, {
  id: "livraison",
  label: "Livraison",
  icon: Truck
}, {
  id: "services",
  label: "Services",
  icon: Briefcase
}, {
  id: "commerce",
  label: "Commerce",
  icon: ShoppingBag
}];
function InscriptionPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    activityType: "",
    isAlone: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hasVtcLicense: "",
    yearsExperience: "",
    currentPlatforms: [],
    hasVehicle: "",
    vehicleType: "",
    monthlyRevenue: "",
    expectedStartDate: ""
  });
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success("Candidature envoyée avec succès !");
        navigate({
          to: "/inscription/confirmation"
        });
      } else {
        toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      toast.error("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.activityType !== "";
      case 2:
        return formData.isAlone !== "";
      case 3:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 4:
        return formData.hasVtcLicense !== "" && formData.yearsExperience !== "";
      case 5:
        return formData.hasVehicle !== "";
      case 6:
        return formData.monthlyRevenue !== "";
      default:
        return false;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f2f2f0]", children: [
    /* @__PURE__ */ jsxs("header", { className: "fixed left-0 top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-4xl items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold tracking-tighter", children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a]" }),
          "LOOP"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
          "Étape ",
          currentStep,
          " sur ",
          TOTAL_STEPS
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-1 w-full bg-gray-100", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#fd521a] transition-all duration-300", style: {
        width: `${currentStep / TOTAL_STEPS * 100}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-2xl px-4 pb-32 pt-28", children: [
      currentStep === 1 && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Quel est votre domaine d'activité ?" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "Sélectionnez votre activité principale" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: activityOptions.map((option) => /* @__PURE__ */ jsxs("button", { onClick: () => updateField("activityType", option.id), className: `flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all ${formData.activityType === option.id ? "border-[#fd521a] bg-[#fd521a]/5" : "border-gray-200 bg-white hover:border-gray-300"}`, children: [
          /* @__PURE__ */ jsx(option.icon, { className: `h-8 w-8 ${formData.activityType === option.id ? "text-[#fd521a]" : "text-gray-400"}` }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: option.label }),
          formData.activityType === option.id && /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-[#fd521a] text-white", children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
        ] }, option.id)) })
      ] }),
      currentStep === 2 && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Vous lancez votre activité :" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "Seul ou à plusieurs ?" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => updateField("isAlone", "seul"), className: `flex flex-col items-center gap-3 rounded-2xl border-2 p-8 transition-all ${formData.isAlone === "seul" ? "border-[#fd521a] bg-[#fd521a]/5" : "border-gray-200 bg-white hover:border-gray-300"}`, children: [
            /* @__PURE__ */ jsx(User, { className: `h-12 w-12 ${formData.isAlone === "seul" ? "text-[#fd521a]" : "text-gray-400"}` }),
            /* @__PURE__ */ jsx("span", { className: "text-lg font-medium", children: "Seul" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => updateField("isAlone", "plusieurs"), className: `flex flex-col items-center gap-3 rounded-2xl border-2 p-8 transition-all ${formData.isAlone === "plusieurs" ? "border-[#fd521a] bg-[#fd521a]/5" : "border-gray-200 bg-white hover:border-gray-300"}`, children: [
            /* @__PURE__ */ jsx(Users, { className: `h-12 w-12 ${formData.isAlone === "plusieurs" ? "text-[#fd521a]" : "text-gray-400"}` }),
            /* @__PURE__ */ jsx("span", { className: "text-lg font-medium", children: "À plusieurs" })
          ] })
        ] })
      ] }),
      currentStep === 3 && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Vos informations" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "Pour vous contacter et créer votre dossier" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700", children: "Prénom" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: formData.firstName, onChange: (e) => updateField("firstName", e.target.value), className: "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20", placeholder: "Jean" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700", children: "Nom" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: formData.lastName, onChange: (e) => updateField("lastName", e.target.value), className: "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20", placeholder: "Dupont" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700", children: "Email" }),
            /* @__PURE__ */ jsx("input", { type: "email", value: formData.email, onChange: (e) => updateField("email", e.target.value), className: "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20", placeholder: "jean.dupont@email.com" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700", children: "Téléphone" }),
            /* @__PURE__ */ jsx("input", { type: "tel", value: formData.phone, onChange: (e) => updateField("phone", e.target.value), className: "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20", placeholder: "06 12 34 56 78" })
          ] })
        ] })
      ] }),
      currentStep === 4 && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Votre expérience" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "Parlez-nous de votre parcours" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-3 block text-sm font-medium text-gray-700", children: "Avez-vous la carte VTC ?" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["Oui", "Non", "En cours"].map((option) => /* @__PURE__ */ jsx("button", { onClick: () => updateField("hasVtcLicense", option.toLowerCase()), className: `flex-1 rounded-xl border-2 px-4 py-3 font-medium transition-all ${formData.hasVtcLicense === option.toLowerCase() ? "border-[#fd521a] bg-[#fd521a]/5 text-[#fd521a]" : "border-gray-200 bg-white hover:border-gray-300"}`, children: option }, option)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-3 block text-sm font-medium text-gray-700", children: "Années d'expérience VTC" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["0-1 an", "1-3 ans", "3+ ans"].map((option) => /* @__PURE__ */ jsx("button", { onClick: () => updateField("yearsExperience", option), className: `flex-1 rounded-xl border-2 px-4 py-3 font-medium transition-all ${formData.yearsExperience === option ? "border-[#fd521a] bg-[#fd521a]/5 text-[#fd521a]" : "border-gray-200 bg-white hover:border-gray-300"}`, children: option }, option)) })
          ] })
        ] })
      ] }),
      currentStep === 5 && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Votre véhicule" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "Informations sur votre véhicule" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-3 block text-sm font-medium text-gray-700", children: "Avez-vous un véhicule ?" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["Oui", "Non", "En location"].map((option) => /* @__PURE__ */ jsx("button", { onClick: () => updateField("hasVehicle", option.toLowerCase()), className: `flex-1 rounded-xl border-2 px-4 py-3 font-medium transition-all ${formData.hasVehicle === option.toLowerCase() ? "border-[#fd521a] bg-[#fd521a]/5 text-[#fd521a]" : "border-gray-200 bg-white hover:border-gray-300"}`, children: option }, option)) })
          ] }),
          formData.hasVehicle === "oui" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700", children: "Type de véhicule" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.vehicleType, onChange: (e) => updateField("vehicleType", e.target.value), className: "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20", placeholder: "Ex: Tesla Model 3, Mercedes Classe E..." })
          ] })
        ] })
      ] }),
      currentStep === 6 && /* @__PURE__ */ jsxs("div", { className: "animate-fade-in", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl font-bold", children: "Vos objectifs" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "Pour mieux vous accompagner" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-3 block text-sm font-medium text-gray-700", children: "CA mensuel visé" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: ["3000-4000€", "4000-5000€", "5000-7000€", "7000€+"].map((option) => /* @__PURE__ */ jsx("button", { onClick: () => updateField("monthlyRevenue", option), className: `rounded-xl border-2 px-4 py-3 font-medium transition-all ${formData.monthlyRevenue === option ? "border-[#fd521a] bg-[#fd521a]/5 text-[#fd521a]" : "border-gray-200 bg-white hover:border-gray-300"}`, children: option }, option)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700", children: "Quand souhaitez-vous démarrer ?" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: formData.expectedStartDate, onChange: (e) => updateField("expectedStartDate", e.target.value), className: "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20", placeholder: "Ex: Dès que possible, Dans 1 mois..." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "fixed bottom-0 left-0 w-full border-t border-gray-200/50 bg-white/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-20 max-w-2xl items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs("button", { onClick: prevStep, disabled: currentStep === 1, className: `flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all ${currentStep === 1 ? "cursor-not-allowed text-gray-300" : "text-gray-600 hover:bg-gray-100"}`, children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" }),
        "Retour"
      ] }),
      currentStep < TOTAL_STEPS ? /* @__PURE__ */ jsxs("button", { onClick: nextStep, disabled: !canProceed(), className: `flex items-center gap-2 rounded-full px-8 py-3 font-bold transition-all ${canProceed() ? "bg-[#fd521a] text-white shadow-lg hover:shadow-xl" : "cursor-not-allowed bg-gray-200 text-gray-400"}`, children: [
        "Continuer",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
      ] }) : /* @__PURE__ */ jsxs("button", { onClick: handleSubmit, disabled: !canProceed() || isSubmitting, className: `flex items-center gap-2 rounded-full px-8 py-3 font-bold transition-all ${canProceed() && !isSubmitting ? "bg-[#fd521a] text-white shadow-lg hover:shadow-xl" : "cursor-not-allowed bg-gray-200 text-gray-400"}`, children: [
        isSubmitting ? "Envoi..." : "Envoyer ma candidature",
        /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" })
      ] })
    ] }) })
  ] });
}
export {
  InscriptionPage as component
};

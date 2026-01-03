import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { MessageCircle, Calculator, Rocket, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
import { P as PageLayout } from "./PageLayout-C-EQsMZ0.js";
import { v as validateForm, r as reunionFormSchema } from "./validations-L2IWRFpm.js";
import "zod";
function ReunionPage() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const getSlotAvailability = useMemo(() => {
    const availabilityMap = {};
    return (dayDate) => {
      if (!availabilityMap[dayDate]) {
        const dayNum = new Date(dayDate).getDate();
        availabilityMap[dayDate] = slots.map((_, idx) => {
          return !((dayNum + idx) % 4 === 0);
        });
      }
      return availabilityMap[dayDate];
    };
  }, []);
  const getDays = () => {
    const today = /* @__PURE__ */ new Date();
    today.setDate(today.getDate() + currentWeekOffset * 7);
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push({
          date: date.toISOString(),
          dayName: dayNames[dayOfWeek],
          dayNum: date.getDate()
        });
      }
      if (days.length >= 5) break;
    }
    return days;
  };
  const getMonthLabel = () => {
    const today = /* @__PURE__ */ new Date();
    today.setDate(today.getDate() + currentWeekOffset * 7);
    return today.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric"
    });
  };
  const handleConfirm = async () => {
    const formData = {
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      date: selectedDay || "",
      time: selectedSlot || ""
    };
    const validation = validateForm(reunionFormSchema, formData);
    if (!validation.success) {
      const firstError = Object.values(validation.errors)[0];
      toast.error(firstError || "Veuillez remplir tous les champs");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: selectedDay,
          time: selectedSlot,
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone
        })
      });
      toast.success("Créneau réservé ! Vous recevrez un email de confirmation.");
      setTimeout(() => {
        navigate({
          to: "/inscription/confirmation"
        });
      }, 1500);
    } catch (error) {
      console.error("Error booking meeting:", error);
      toast.error("Erreur lors de la réservation");
    } finally {
      setIsSubmitting(false);
    }
  };
  const changeWeek = (direction) => {
    const newOffset = currentWeekOffset + direction;
    if (newOffset < 0) return;
    setCurrentWeekOffset(newOffset);
    setSelectedDay(null);
    setSelectedSlot(null);
  };
  const isFormValid = selectedDay && selectedSlot && contactInfo.name && contactInfo.email && contactInfo.phone;
  return /* @__PURE__ */ jsxs(PageLayout, { showNavLinks: false, children: [
    /* @__PURE__ */ jsx("main", { className: "mx-auto max-w-[900px] px-4 pb-20 pt-32 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-4 text-3xl font-bold tracking-tight", children: "Réservez votre appel" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-500", children: "15 minutes pour découvrir Driivo et poser toutes vos questions à un conseiller." }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Réponses à vos questions" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Comment ça marche, combien ça coûte, etc." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(Calculator, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Simulation personnalisée" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "On calcule ensemble votre salaire net." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]", children: /* @__PURE__ */ jsx(Rocket, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Prochaines étapes" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "On vous explique comment démarrer en 48h." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-4 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm font-bold", children: "MF" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "Mehdi F." }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Conseiller Driivo" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-6 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => changeWeek(-1), disabled: currentWeekOffset === 0, className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-bold capitalize", children: getMonthLabel() }),
          /* @__PURE__ */ jsx("button", { onClick: () => changeWeek(1), className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-6 grid grid-cols-5 gap-2", children: getDays().map((day) => /* @__PURE__ */ jsxs("button", { onClick: () => {
          setSelectedDay(day.date);
          setSelectedSlot(null);
        }, className: `rounded-xl border p-3 text-center transition-all ${selectedDay === day.date ? "border-[#fd521a] bg-[#fd521a] text-white" : "border-gray-200 hover:border-[#fd521a]/50 hover:bg-[#fd521a]/5"}`, children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] opacity-70", children: day.dayName }),
          /* @__PURE__ */ jsx("div", { className: "font-bold", children: day.dayNum })
        ] }, day.date)) }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-xs font-bold text-gray-400", children: selectedDay ? "Créneaux disponibles" : "Sélectionnez un jour" }),
          selectedDay && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: slots.map((slot, idx) => {
            const availability = getSlotAvailability(selectedDay);
            const available = availability[idx];
            return /* @__PURE__ */ jsx("button", { disabled: !available, onClick: () => setSelectedSlot(slot), className: `rounded-lg border px-3 py-2 text-sm font-medium transition-all ${selectedSlot === slot ? "border-[#fd521a] bg-[#fd521a]/10 text-[#fd521a]" : available ? "border-gray-200 hover:border-[#fd521a] hover:bg-[#fd521a]/5" : "cursor-not-allowed border-gray-100 text-gray-300"}`, children: slot }, slot);
          }) })
        ] }),
        selectedSlot && /* @__PURE__ */ jsxs("div", { className: "mb-6 space-y-3 border-t border-gray-200 pt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-gray-400", children: "Vos coordonnées" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Votre nom", value: contactInfo.name, onChange: (e) => setContactInfo({
            ...contactInfo,
            name: e.target.value
          }), className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/10" }),
          /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Votre email", value: contactInfo.email, onChange: (e) => setContactInfo({
            ...contactInfo,
            email: e.target.value
          }), className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/10" }),
          /* @__PURE__ */ jsx("input", { type: "tel", placeholder: "Votre téléphone", value: contactInfo.phone, onChange: (e) => setContactInfo({
            ...contactInfo,
            phone: e.target.value
          }), className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/10" })
        ] }),
        /* @__PURE__ */ jsxs("button", { disabled: !isFormValid || isSubmitting, onClick: handleConfirm, className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0", children: [
          isSubmitting ? "Réservation..." : "Confirmer le créneau",
          /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "py-6 text-center text-xs text-gray-400", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-[#fd521a]", children: "← Retour à l'accueil" }) })
  ] });
}
export {
  ReunionPage as component
};

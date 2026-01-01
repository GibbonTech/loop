import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Calculator, Rocket, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
function ReunionPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const getDays = () => {
    const today = /* @__PURE__ */ new Date();
    today.setDate(today.getDate() + currentWeekOffset * 7);
    const days = [];
    for (let i = 0; i < 7; i++) {
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
    if (!selectedDay || !selectedSlot) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: selectedDay,
          time: selectedSlot
        })
      });
      toast.success("Créneau réservé ! Vous recevrez un email de confirmation.");
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white", children: [
    /* @__PURE__ */ jsx("nav", { className: "fixed left-0 top-6 z-50 flex w-full justify-center px-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-8 rounded-full border border-white/40 bg-white/60 px-3 py-2 pl-6 shadow-[0_8px_32px_-4px_rgba(168,162,158,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-2xl", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-lg font-bold tracking-tighter text-black", children: [
      /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
      "DRIIVO"
    ] }) }) }),
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
          /* @__PURE__ */ jsx("button", { onClick: () => changeWeek(-1), className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }),
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
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-xs font-bold text-gray-400", children: selectedDay ? "Créneaux disponibles" : "Sélectionnez un jour" }),
          selectedDay && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: slots.map((slot) => {
            const available = Math.random() > 0.3;
            return /* @__PURE__ */ jsx("button", { disabled: !available, onClick: () => setSelectedSlot(slot), className: `rounded-lg border px-3 py-2 text-sm font-medium transition-all ${selectedSlot === slot ? "border-[#fd521a] bg-[#fd521a]/10" : available ? "border-gray-200 hover:border-[#fd521a] hover:bg-[#fd521a]/5" : "cursor-not-allowed border-gray-100 text-gray-300"}`, children: slot }, slot);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("button", { disabled: !selectedDay || !selectedSlot || isSubmitting, onClick: handleConfirm, className: "mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0", children: [
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

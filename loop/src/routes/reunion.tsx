import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { MessageCircle, Calculator, Rocket, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reunion")({
  component: ReunionPage,
  head: () => ({
    meta: [
      { title: "Réserver un Appel | Driivo" },
      { name: "description", content: "Réservez un appel de 15 minutes avec un conseiller Driivo pour découvrir le statut d'entrepreneur salarié." },
    ],
  }),
});

function ReunionPage() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Deterministic slot availability based on day and slot
  const getSlotAvailability = useMemo(() => {
    const availabilityMap: Record<string, boolean[]> = {};
    return (dayDate: string) => {
      if (!availabilityMap[dayDate]) {
        // Use day of month as seed for deterministic "randomness"
        const dayNum = new Date(dayDate).getDate();
        availabilityMap[dayDate] = slots.map((_, idx) => {
          // Simple deterministic pattern: most slots available, some blocked
          return !((dayNum + idx) % 4 === 0);
        });
      }
      return availabilityMap[dayDate];
    };
  }, []);

  const getDays = () => {
    const today = new Date();
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
          dayNum: date.getDate(),
        });
      }
      if (days.length >= 5) break;
    }
    return days;
  };

  const getMonthLabel = () => {
    const today = new Date();
    today.setDate(today.getDate() + currentWeekOffset * 7);
    return today.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  };

  const handleConfirm = async () => {
    if (!selectedDay || !selectedSlot || !contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDay,
          time: selectedSlot,
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
        }),
      });
      toast.success("Créneau réservé ! Vous recevrez un email de confirmation.");
      // Redirect to confirmation after short delay
      setTimeout(() => {
        navigate({ to: "/inscription/confirmation" });
      }, 1500);
    } catch (error) {
      console.error("Error booking meeting:", error);
      toast.error("Erreur lors de la réservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeWeek = (direction: number) => {
    const newOffset = currentWeekOffset + direction;
    if (newOffset < 0) return;
    setCurrentWeekOffset(newOffset);
    setSelectedDay(null);
    setSelectedSlot(null);
  };

  const isFormValid = selectedDay && selectedSlot && contactInfo.name && contactInfo.email && contactInfo.phone;

  return (
    <div className="min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white">
      {/* Navigation */}
      <nav className="fixed left-0 top-6 z-50 flex w-full justify-center px-4">
        <div className="flex items-center gap-8 rounded-full border border-white/40 bg-white/60 px-3 py-2 pl-6 shadow-[0_8px_32px_-4px_rgba(168,162,158,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
            DRIIVO
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-[900px] px-4 pb-20 pt-32 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Info */}
          <div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight">
              Réservez votre appel
            </h1>
            <p className="mb-8 text-gray-500">
              15 minutes pour découvrir Driivo et poser toutes vos questions à
              un conseiller.
            </p>

            {/* What to expect */}
            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Réponses à vos questions</div>
                  <div className="text-xs text-gray-500">
                    Comment ça marche, combien ça coûte, etc.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                  <Calculator className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Simulation personnalisée</div>
                  <div className="text-xs text-gray-500">
                    On calcule ensemble votre salaire net.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                  <Rocket className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Prochaines étapes</div>
                  <div className="text-xs text-gray-500">
                    On vous explique comment démarrer en 48h.
                  </div>
                </div>
              </div>
            </div>

            {/* Advisor */}
            <div className="flex items-center gap-4 rounded-xl border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-4 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                MF
              </div>
              <div>
                <div className="text-sm font-bold">Mehdi F.</div>
                <div className="text-xs text-gray-400">Conseiller Driivo</div>
              </div>
            </div>
          </div>

          {/* Right: Calendar & Form */}
          <div className="rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-6 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
            {/* Calendar Header */}
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => changeWeek(-1)}
                disabled={currentWeekOffset === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-bold capitalize">{getMonthLabel()}</span>
              <button
                onClick={() => changeWeek(1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Days */}
            <div className="mb-6 grid grid-cols-5 gap-2">
              {getDays().map((day) => (
                <button
                  key={day.date}
                  onClick={() => {
                    setSelectedDay(day.date);
                    setSelectedSlot(null);
                  }}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    selectedDay === day.date
                      ? "border-[#fd521a] bg-[#fd521a] text-white"
                      : "border-gray-200 hover:border-[#fd521a]/50 hover:bg-[#fd521a]/5"
                  }`}
                >
                  <div className="text-[10px] opacity-70">{day.dayName}</div>
                  <div className="font-bold">{day.dayNum}</div>
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <div className="mb-3 text-xs font-bold text-gray-400">
                {selectedDay ? "Créneaux disponibles" : "Sélectionnez un jour"}
              </div>
              {selectedDay && (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot, idx) => {
                    const availability = getSlotAvailability(selectedDay);
                    const available = availability[idx];
                    return (
                      <button
                        key={slot}
                        disabled={!available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                          selectedSlot === slot
                            ? "border-[#fd521a] bg-[#fd521a]/10 text-[#fd521a]"
                            : available
                              ? "border-gray-200 hover:border-[#fd521a] hover:bg-[#fd521a]/5"
                              : "cursor-not-allowed border-gray-100 text-gray-300"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Contact Form */}
            {selectedSlot && (
              <div className="mb-6 space-y-3 border-t border-gray-200 pt-6">
                <div className="text-xs font-bold text-gray-400">Vos coordonnées</div>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/10"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/10"
                />
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/10"
                />
              </div>
            )}

            {/* Confirm Button */}
            <button
              disabled={!isFormValid || isSubmitting}
              onClick={handleConfirm}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Réservation..." : "Confirmer le créneau"}
              <Check className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400">
        <Link to="/" className="hover:text-[#fd521a]">
          ← Retour à l&apos;accueil
        </Link>
      </footer>
    </div>
  );
}

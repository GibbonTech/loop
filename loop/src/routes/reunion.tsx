import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Calculator, Rocket, Check } from "lucide-react";

export const Route = createFileRoute("/reunion")({
  component: ReunionPage,
});

function ReunionPage() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const getDays = () => {
    const today = new Date();
    today.setDate(today.getDate() + currentWeekOffset * 7);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      // Skip weekends
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push({
          date: date.toISOString(),
          dayName: dayNames[dayOfWeek],
          dayNumber: date.getDate(),
        });
      }
    }
    return days.slice(0, 5);
  };

  const getMonthLabel = () => {
    const today = new Date();
    today.setDate(today.getDate() + currentWeekOffset * 7);
    return today.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  };

  const getAvailableSlots = () => {
    // Mock availability - in real app would come from API
    return slots.filter(() => Math.random() > 0.3);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (selectedDay && selectedSlot && formData.firstName && formData.email) {
      setIsSubmitting(true);
      try {
        await fetch("/api/meetings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            email: formData.email,
            phone: formData.phone,
            scheduledDate: selectedDay,
            timeSlot: selectedSlot,
            duration: 15,
          }),
        });
        alert("Créneau réservé ! Vous recevrez un email de confirmation.");
        window.location.href = "/espace";
      } catch (error) {
        console.error("Error booking meeting:", error);
        alert("Erreur lors de la réservation. Veuillez réessayer.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const availableSlots = getAvailableSlots();

  return (
    <div className="min-h-screen bg-[#f2f2f0] selection:bg-[#fd521a] selection:text-white">
      {/* Navigation */}
      <nav className="fixed left-0 top-6 z-50 flex w-full justify-center px-4">
        <div className="flex items-center gap-8 rounded-full bg-white/70 px-3 py-2 pl-6 shadow-lg backdrop-blur-xl">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
            LOOP
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-[900px] px-4 pb-20 pt-32 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Info */}
          <div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight">Réservez votre appel</h1>
            <p className="mb-8 text-gray-500">
              15 minutes pour découvrir Loop et poser toutes vos questions à un conseiller.
            </p>

            {/* What to expect */}
            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Réponses à vos questions</div>
                  <div className="text-xs text-gray-500">Comment ça marche, combien ça coûte, etc.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                  <Calculator className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Simulation personnalisée</div>
                  <div className="text-xs text-gray-500">On calcule ensemble votre salaire net.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                  <Rocket className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">Prochaines étapes</div>
                  <div className="text-xs text-gray-500">On vous explique comment démarrer en 48h.</div>
                </div>
              </div>
            </div>

            {/* Advisor */}
            <div className="flex items-center gap-4 rounded-xl border border-white/60 bg-white/50 p-4 shadow-sm backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                MF
              </div>
              <div>
                <div className="text-sm font-bold">Mehdi F.</div>
                <div className="text-xs text-gray-400">Conseiller Loop</div>
              </div>
            </div>
          </div>

          {/* Right: Calendar */}
          <div className="rounded-[2rem] border border-white/60 bg-white/50 p-6 shadow-lg backdrop-blur-sm">
            {/* Calendar Header */}
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setCurrentWeekOffset((prev) => Math.max(0, prev - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-bold capitalize">{getMonthLabel()}</span>
              <button
                onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
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
                      : "border-gray-200 hover:bg-[#fd521a]/5"
                  }`}
                >
                  <div className="text-[10px] text-current opacity-60">{day.dayName}</div>
                  <div className="font-bold">{day.dayNumber}</div>
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <div className="mb-3 text-xs font-bold text-gray-400">
                {selectedDay ? "Créneaux disponibles" : "Sélectionnez un jour"}
              </div>
              {selectedDay && (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => {
                    const isAvailable = availableSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => isAvailable && setSelectedSlot(slot)}
                        disabled={!isAvailable}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                          selectedSlot === slot
                            ? "border-[#fd521a] bg-[#fd521a]/10 text-[#fd521a]"
                            : isAvailable
                              ? "border-gray-200 hover:border-[#fd521a]"
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

            {/* Contact Form - shown after selecting slot */}
            {selectedDay && selectedSlot && (
              <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                <div className="text-xs font-bold text-gray-400">Vos coordonnées</div>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                />
                <input
                  type="tel"
                  placeholder="Téléphone (optionnel)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                />
              </div>
            )}

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!selectedDay || !selectedSlot || !formData.firstName || !formData.email || isSubmitting}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold transition-all ${
                selectedDay && selectedSlot && formData.firstName && formData.email && !isSubmitting
                  ? "bg-[#fd521a] text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
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
          ← Retour à l'accueil
        </Link>
      </footer>
    </div>
  );
}

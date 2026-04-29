import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MessageCircle, Calculator, Rocket, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "~/components/layout";
import { reunionFormSchema, validateForm } from "~/lib/validations";
import { useSession } from "~/lib/auth/auth-client";

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
  const { data: session } = useSession();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [existingMeeting, setExistingMeeting] = useState<{
    id: string;
    scheduledDate: string;
    timeSlot: string;
  } | null>(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!session?.user) return;
    setContactInfo((prev) => ({
      name: prev.name || session.user.name || "",
      email: prev.email || session.user.email || "",
      phone: prev.phone,
    }));
  }, [session]);

  useEffect(() => {
    if (!session?.user) return;

    const fetchExistingMeeting = async () => {
      try {
        const res = await fetch("/api/meetings");
        const result = await res.json();
        if (!result.success) return;
        const scheduled = (result.data || [])
          .filter((meeting: { status: string }) => meeting.status === "SCHEDULED")
          .sort(
            (
              a: { scheduledDate: string },
              b: { scheduledDate: string },
            ) =>
              new Date(a.scheduledDate).getTime() -
              new Date(b.scheduledDate).getTime(),
          )[0];
        if (scheduled) setExistingMeeting(scheduled);
      } catch (error) {
        console.error("Error fetching existing meeting:", error);
      }
    };

    fetchExistingMeeting();
  }, [session]);

  // Fetch real availability from database
  useEffect(() => {
    const fetchAvailability = async () => {
      setLoadingAvailability(true);
      try {
        const today = new Date();
        today.setDate(today.getDate() + currentWeekOffset * 7);
        const start = formatDateKey(today);
        
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 14);
        const end = formatDateKey(endDate);

        const res = await fetch(`/api/meetings?mode=availability&start=${start}&end=${end}`);
        const result = await res.json();
        if (result.success) {
          setBookedSlots(result.data || {});
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoadingAvailability(false);
      }
    };
    
    fetchAvailability();
  }, [currentWeekOffset]);

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
              date: formatDateKey(date),
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
    if (existingMeeting) {
      toast.error("Vous avez déjà un rendez-vous programmé.");
      return;
    }

    const formData = {
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      date: selectedDay || "",
      time: selectedSlot || "",
    };
    
    const validation = validateForm(reunionFormSchema, formData);
    if (!validation.success) {
      const firstError = Object.values(validation.errors)[0];
      toast.error(firstError || "Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/meetings", {
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
      const result = await res.json();
      if (!res.ok || !result.success) {
        toast.error(result.error || "Erreur lors de la réservation");
        if (result.data?.id) {
          setExistingMeeting(result.data);
        }
        return;
      }
      setExistingMeeting({
        id: result.id,
        scheduledDate: result.data?.scheduledDate || selectedDay || "",
        timeSlot: result.data?.timeSlot || selectedSlot || "",
      });
      toast.success("Créneau réservé ! Vous recevrez un email de confirmation.");
      // Redirect to espace after short delay
      setTimeout(() => {
        window.location.href = session?.user ? "/espace" : "/confirmation";
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
  const hasActiveMeeting = Boolean(existingMeeting);

  return (
    <PageLayout showNavLinks={false}>
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

            {existingMeeting && (
              <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <div className="font-bold">Rendez-vous déjà réservé</div>
                <div className="mt-0.5 text-xs text-emerald-800">
                  {new Date(existingMeeting.scheduledDate).toLocaleDateString("fr-FR")} à{" "}
                  {existingMeeting.timeSlot}. Un seul créneau peut être actif à
                  la fois.
                </div>
              </div>
            )}

            {/* Days */}
            <div className="mb-6 grid grid-cols-5 gap-2">
              {getDays().map((day) => (
                <button
                  key={day.date}
                  disabled={hasActiveMeeting}
                  onClick={() => {
                    setSelectedDay(day.date);
                    setSelectedSlot(null);
                  }}
                  className={`rounded-xl border p-3 text-center transition-all ${
                    selectedDay === day.date
                      ? "border-[#fd521a] bg-[#fd521a] text-white"
                      : "border-white/60 bg-white/50 shadow-sm hover:border-[#fd521a]/50 hover:bg-[#fd521a]/5"
                  }`}
                >
                  <div className="text-xs opacity-70">{day.dayName}</div>
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
                  {slots.map((slot) => {
                    const dateKey = selectedDay;
                    const isBooked = bookedSlots[dateKey]?.includes(slot) || false;
                    const available = !isBooked;
                    return (
                      <button
                        key={slot}
                        disabled={!available || loadingAvailability || hasActiveMeeting}
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                          selectedSlot === slot
                            ? "border-[#fd521a] bg-[#fd521a]/10 text-[#fd521a]"
                            : available
                              ? "border-white/60 bg-white/50 shadow-sm hover:border-[#fd521a] hover:bg-[#fd521a]/5"
                              : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through"
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
              <div className="mb-6 space-y-3 border-t border-white/40 pt-6">
                <div className="text-xs font-bold text-gray-400">Vos coordonnées</div>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm shadow-sm backdrop-blur-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                />
                <input
                  type="email"
                  required
                  placeholder="Votre email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm shadow-sm backdrop-blur-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                />
                <input
                  type="tel"
                  required
                  placeholder="Votre téléphone"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm shadow-sm backdrop-blur-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                />
              </div>
            )}

            {/* Confirm Button */}
            <button
              disabled={!isFormValid || isSubmitting || hasActiveMeeting}
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
        <a href="https://driivo.fr" className="hover:text-[#fd521a]">
          ← Retour à l&apos;accueil
        </a>
      </footer>
    </PageLayout>
  );
}

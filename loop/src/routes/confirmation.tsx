import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, Calendar, LayoutDashboard, Gift } from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "~/components/layout";

export const Route = createFileRoute("/confirmation")({
  component: ConfirmationPage,
  head: () => ({
    meta: [
      { title: "Candidature Envoyée | Driivo" },
      { name: "description", content: "Votre candidature a été envoyée avec succès. Découvrez les prochaines étapes." },
    ],
  }),
});

function ConfirmationPage() {
  useEffect(() => {
    // Confetti effect
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
          confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
          confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
          confetti.style.animation = "fall 3s linear forwards";
          container.appendChild(confetti);

          setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
      }
    }
  }, []);

  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://driivo.fr/r/JD2025");
    toast.success("Lien copié !");
  };

  return (
    <PageLayout showNavbar={false}>
      {/* Confetti Container */}
      <div
        id="confetti-container"
        className="pointer-events-none fixed inset-0 z-50"
      ></div>

      {/* CSS for confetti animation */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center px-4 py-20">
        <div className="w-full max-w-[500px]">
          {/* Success Card */}
          <div className="mb-8 rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-10 text-center shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
            {/* Check Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check className="h-10 w-10" />
            </div>

            <h1 className="mb-3 text-3xl font-bold tracking-tight">
              Candidature envoyée !
            </h1>
            <p className="mb-8 text-gray-500">
              Merci d&apos;avoir choisi Driivo. Notre équipe va examiner votre
              dossier et vous contacter dans les 24h.
            </p>

            {/* Next Steps */}
            <div className="mb-8 rounded-2xl bg-gray-50 p-6 text-left">
              <h3 className="mb-4 text-sm font-bold">Prochaines étapes</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fd521a] text-xs font-bold text-white">
                    1
                  </div>
                  <div>
                    <div className="text-sm font-bold">Vérification (24h)</div>
                    <div className="text-xs text-gray-500">
                      On valide vos documents
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                    2
                  </div>
                  <div>
                    <div className="text-sm font-bold">Entretien (15 min)</div>
                    <div className="text-xs text-gray-500">
                      On répond à vos questions
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                    3
                  </div>
                  <div>
                    <div className="text-sm font-bold">Signature</div>
                    <div className="text-xs text-gray-500">Contrat en ligne</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-green-600">
                      Vous roulez !
                    </div>
                    <div className="text-xs text-gray-500">Démarrage en 48h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                to="/reunion"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]"
              >
                <Calendar className="h-5 w-5" />
                Réserver un créneau d&apos;appel
              </Link>
              <Link
                to="/espace"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111] py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#fd521a]"
              >
                <LayoutDashboard className="h-5 w-5" />
                Accéder à mon espace
              </Link>
            </div>
          </div>

          {/* Referral Card */}
          <div className="rounded-2xl border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-6 text-center shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Gift className="h-5 w-5 text-[#fd521a]" />
              <span className="text-sm font-bold">Parrainez un ami</span>
            </div>
            <p className="mb-4 text-xs text-gray-500">
              Pour chaque chauffeur que vous parrainez, recevez 100€ après son
              activation.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value="https://driivo.fr/r/JD2025"
                readOnly
                className="flex-1 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-xs"
              />
              <button
                onClick={copyReferralLink}
                className="rounded-lg bg-[#fd521a] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#e0410e]"
              >
                Copier
              </button>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-[#fd521a]">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}

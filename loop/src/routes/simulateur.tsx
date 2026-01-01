import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, Clock, Phone, ShieldCheck, Heart, PiggyBank } from "lucide-react";

export const Route = createFileRoute("/simulateur")({
  component: SimulateurPage,
});

function SimulateurPage() {
  const navigate = useNavigate();
  const [ca, setCa] = useState(5000);
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    telephone: "",
  });

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save lead to database
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.prenom,
          email: formData.email,
          phone: formData.telephone,
          monthlyRevenue: ca.toString(),
          source: "SIMULATEUR",
        }),
      });
    } catch (error) {
      console.error("Error saving lead:", error);
    }

    // Navigate to results
    navigate({
      to: "/resultats",
      search: {
        ca: ca.toString(),
        prenom: formData.prenom,
        email: formData.email,
        tel: formData.telephone,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white">
      {/* Navigation */}
      <nav className="fixed left-0 top-6 z-50 flex w-full justify-center px-4">
        <div className="flex max-w-3xl items-center gap-8 rounded-full border border-white/40 bg-white/60 px-3 py-2 pl-6 shadow-[0_8px_32px_-4px_rgba(168,162,158,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
            DRIIVO
          </Link>
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            <Link to="/" className="transition-colors hover:text-black">
              Accueil
            </Link>
            <Link to="/inscription" className="transition-colors hover:text-black">
              Rejoindre
            </Link>
          </div>
          <Link
            to="/inscription"
            className="rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg transition-colors hover:bg-[#fd521a]"
          >
            REJOINDRE
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-[800px] px-4 pb-20 pt-32 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Combien vous reste-t-il
            <br />
            en <span className="text-[#fd521a]">net</span> chaque mois ?
          </h1>
          <p className="mx-auto max-w-md text-gray-500">
            Glissez le curseur. On calcule tout : salaire, cotisations,
            protection sociale.
          </p>
        </div>

        {/* Simulator Card */}
        <div className="mb-8 rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl md:p-12">
          {/* Slider Section */}
          <div className="mb-10">
            <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Votre chiffre d&apos;affaires mensuel (CA HT)
            </label>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-6xl font-bold tracking-tighter text-[#111] md:text-7xl">
                {formatNumber(ca)}
              </span>
              <span className="text-3xl text-gray-300">€</span>
            </div>
            <input
              type="range"
              min="2000"
              max="12000"
              step="500"
              value={ca}
              onChange={(e) => setCa(parseInt(e.target.value))}
              className="w-full accent-[#fd521a]"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>2 000 €</span>
              <span>12 000 €</span>
            </div>
          </div>

          {/* Results Preview (Blurred) */}
          <div className="relative">
            <div className="pointer-events-none select-none blur-sm">
              <div className="mb-6 rounded-2xl border border-white bg-white/60 p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]">
                      Votre salaire net
                    </div>
                    <div className="text-4xl font-bold tracking-tight">
                      3 800 €
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Cotisations payées
                    </div>
                    <div className="text-2xl font-bold text-gray-500">
                      1 200 €
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-green-50 p-4">
                  <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-green-600" />
                  <div className="text-xs font-bold text-green-700">Chômage</div>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <Heart className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                  <div className="text-xs font-bold text-blue-700">Mutuelle</div>
                </div>
                <div className="rounded-xl bg-purple-50 p-4">
                  <PiggyBank className="mx-auto mb-2 h-6 w-6 text-purple-600" />
                  <div className="text-xs font-bold text-purple-700">Retraite</div>
                </div>
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/30 backdrop-blur-[2px]">
              <div className="text-center">
                <Lock className="mx-auto mb-3 h-8 w-8 text-gray-400" />
                <p className="mb-1 text-sm font-bold text-gray-600">
                  Résultats personnalisés
                </p>
                <p className="text-xs text-gray-400">
                  Entrez vos infos pour voir vos résultats
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Gate Form */}
        <div className="rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Votre prénom
              </label>
              <input
                type="text"
                required
                placeholder="Jean"
                value={formData.prenom}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
                className="w-full rounded-xl border border-black/8 bg-white/80 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Votre email
              </label>
              <input
                type="email"
                required
                placeholder="jean@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-xl border border-black/8 bg-white/80 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Votre téléphone
              </label>
              <input
                type="tel"
                required
                placeholder="06 12 34 56 78"
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
                className="w-full rounded-xl border border-black/8 bg-white/80 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)]"
            >
              Voir mes résultats
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-center text-[10px] text-gray-400">
              En continuant, vous acceptez notre politique de confidentialité.
              Nous ne spammons pas.
            </p>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#fd521a]" /> Réponse en 24h
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#fd521a]" /> On vous rappelle
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

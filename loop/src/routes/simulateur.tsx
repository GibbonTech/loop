import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock, Phone, ShieldCheck, Heart, PiggyBank, Check, X, Sparkles } from "lucide-react";
import { PageLayout } from "~/components/layout";
import { formatNumber, getSalaryBreakdown, calculateAutoEntrepreneurNet, calculateSASUNet } from "~/lib/utils";
import { simulateurFormSchema, validateForm } from "~/lib/validations";

export const Route = createFileRoute("/simulateur")({
  component: SimulateurPage,
  head: () => ({
    meta: [
      { title: "Simulateur de Revenus | Driivo" },
      { name: "description", content: "Comparez votre salaire net entre Auto-entrepreneur, SASU et Driivo. Calculez vos revenus en tant qu'entrepreneur salarié VTC." },
    ],
  }),
});

// Status comparison data
const statusFeatures = [
  { label: "Chômage", key: "chomage" },
  { label: "Retraite complète", key: "retraite" },
  { label: "Mutuelle incluse", key: "mutuelle" },
  { label: "Fiche de paie", key: "fichePaie" },
  { label: "Gestion simplifiée", key: "gestionSimple" },
  { label: "Liberté totale", key: "liberte" },
] as const;

const statusData = {
  autoEntrepreneur: {
    name: "Auto-entrepreneur",
    description: "Statut simple et rapide à créer. Liberté totale mais aucune protection sociale réelle.",
    features: {
      chomage: false,
      retraite: false,
      mutuelle: false,
      fichePaie: false,
      gestionSimple: true,
      liberte: true,
    },
  },
  sasu: {
    name: "SASU",
    description: "Flexibilité juridique mais charges très élevées. Gestion complexe et coûteuse.",
    features: {
      chomage: false,
      retraite: true,
      mutuelle: false,
      fichePaie: true,
      gestionSimple: false,
      liberte: true,
    },
  },
  driivo: {
    name: "Driivo",
    description: "Le meilleur des deux mondes : liberté de l'indépendant + protection du salarié.",
    features: {
      chomage: true,
      retraite: true,
      mutuelle: true,
      fichePaie: true,
      gestionSimple: true,
      liberte: true,
    },
  },
};

function SimulateurPage() {
  const navigate = useNavigate();
  const [ca, setCa] = useState(5000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    telephone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate net income for each status
  const driivoBreakdown = getSalaryBreakdown(ca);
  const autoEntrepreneurNet = calculateAutoEntrepreneurNet(ca);
  const sasuNet = calculateSASUNet(ca);
  const driivoNet = driivoBreakdown.net;

  // Calculate advantage over auto-entrepreneur
  const advantage = driivoNet - autoEntrepreneurNet;

  const handleSubmit = async (e: React.FormEvent) => {
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
    } finally {
      setIsSubmitting(false);
    }

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
    <PageLayout navbarVariant="minimal">
      <main className="mx-auto max-w-[1100px] px-4 pb-20 pt-32 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Comparez les <span className="text-[#fd521a]">statuts</span>
          </h1>
          <p className="mx-auto max-w-lg text-gray-500">
            Glissez le curseur pour voir combien vous gagnez réellement avec chaque statut.
          </p>
        </div>

        {/* CA Slider Card */}
        <div className="mb-10 rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl md:p-12">
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

        {/* 3-Way Comparison Cards */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {/* Auto-entrepreneur Card */}
          <div className="relative rounded-[2rem] border border-black/5 bg-gradient-to-b from-[#f7f7f5] to-[#f2f2f0] p-6 transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-bold">{statusData.autoEntrepreneur.name}</h3>
              <p className="text-xs leading-relaxed text-gray-500">
                {statusData.autoEntrepreneur.description}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Vous touchez
              </div>
              <div className="text-4xl font-bold tracking-tight text-[#111]">
                {formatNumber(autoEntrepreneurNet)} €
              </div>
              <div className="text-xs text-gray-400">/mois</div>
            </div>

            <div className="space-y-2">
              {statusFeatures.map((feature) => (
                <div key={feature.key} className="flex items-center gap-2 text-sm">
                  {statusData.autoEntrepreneur.features[feature.key] ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50">
                      <X className="h-3 w-3 text-red-400" />
                    </div>
                  )}
                  <span className={statusData.autoEntrepreneur.features[feature.key] ? "text-gray-700" : "text-gray-400"}>
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Driivo Card - Highlighted */}
          <div className="relative rounded-[2rem] border-2 border-[#fd521a] bg-gradient-to-br from-white to-[#fafaf9] p-6 shadow-[0_20px_40px_-12px_rgba(253,82,26,0.15)] transition-all duration-300 hover:-translate-y-1">
            {/* Recommended Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 rounded-full bg-[#fd521a] px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                <Sparkles className="h-3 w-3" />
                Recommandé
              </div>
            </div>

            <div className="mb-4 pt-2">
              <h3 className="mb-2 text-lg font-bold text-[#fd521a]">{statusData.driivo.name}</h3>
              <p className="text-xs leading-relaxed text-gray-500">
                {statusData.driivo.description}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#fd521a]">
                Vous touchez
              </div>
              <div className="text-4xl font-bold tracking-tight text-green-600">
                {formatNumber(driivoNet)} €
              </div>
              <div className="text-xs text-gray-400">/mois</div>
              {advantage < 0 && (
                <div className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                  +{formatNumber(Math.abs(advantage))} € vs auto-entrepreneur
                </div>
              )}
            </div>

            <div className="space-y-2">
              {statusFeatures.map((feature) => (
                <div key={feature.key} className="flex items-center gap-2 text-sm">
                  {statusData.driivo.features[feature.key] ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50">
                      <X className="h-3 w-3 text-red-400" />
                    </div>
                  )}
                  <span className="font-medium text-gray-700">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SASU Card */}
          <div className="relative rounded-[2rem] border border-black/5 bg-gradient-to-b from-[#f7f7f5] to-[#f2f2f0] p-6 transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-bold">{statusData.sasu.name}</h3>
              <p className="text-xs leading-relaxed text-gray-500">
                {statusData.sasu.description}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Vous touchez
              </div>
              <div className="text-4xl font-bold tracking-tight text-[#111]">
                {formatNumber(sasuNet)} €
              </div>
              <div className="text-xs text-gray-400">/mois</div>
            </div>

            <div className="space-y-2">
              {statusFeatures.map((feature) => (
                <div key={feature.key} className="flex items-center gap-2 text-sm">
                  {statusData.sasu.features[feature.key] ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50">
                      <X className="h-3 w-3 text-red-400" />
                    </div>
                  )}
                  <span className={statusData.sasu.features[feature.key] ? "text-gray-700" : "text-gray-400"}>
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-10 rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-6 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
          <div className="mb-4 text-center text-sm font-bold text-gray-400">
            Avec Driivo, vous bénéficiez de
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-green-50 p-4">
              <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <div className="text-xs font-bold text-green-700">Chômage</div>
              <div className="text-[10px] text-green-600">Cotisé</div>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <Heart className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <div className="text-xs font-bold text-blue-700">Mutuelle</div>
              <div className="text-[10px] text-blue-600">Incluse</div>
            </div>
            <div className="rounded-xl bg-purple-50 p-4">
              <PiggyBank className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <div className="text-xs font-bold text-purple-700">Retraite</div>
              <div className="text-[10px] text-purple-600">Cotisée</div>
            </div>
          </div>
        </div>

        {/* Email Gate Form */}
        <div className="rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-bold">Prêt à gagner plus ?</h2>
            <p className="text-sm text-gray-500">
              Recevez votre simulation détaillée et un appel de notre équipe.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Votre prénom
              </label>
              <input
                type="text"
                placeholder="Jean"
                value={formData.prenom}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
                className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-[3px] ${errors.prenom ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-black/8 focus:border-[#fd521a] focus:ring-[#fd521a]/10'}`}
              />
              {errors.prenom && <p className="mt-1 text-xs text-red-500">{errors.prenom}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Votre email
              </label>
              <input
                type="email"
                placeholder="jean@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-[3px] ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-black/8 focus:border-[#fd521a] focus:ring-[#fd521a]/10'}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Votre téléphone
              </label>
              <input
                type="tel"
                placeholder="06 12 34 56 78"
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
                className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-sm transition-all focus:outline-none focus:ring-[3px] ${errors.telephone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-black/8 focus:border-[#fd521a] focus:ring-[#fd521a]/10'}`}
              />
              {errors.telephone && <p className="mt-1 text-xs text-red-500">{errors.telephone}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Chargement..." : "Rejoindre Driivo"}
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
    </PageLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, ShieldCheck, Heart, PiggyBank, FileText } from "lucide-react";

type ResultsSearch = {
  ca?: string;
  prenom?: string;
  email?: string;
  tel?: string;
};

export const Route = createFileRoute("/resultats")({
  validateSearch: (search: Record<string, unknown>): ResultsSearch => {
    return {
      ca: search.ca as string | undefined,
      prenom: search.prenom as string | undefined,
      email: search.email as string | undefined,
      tel: search.tel as string | undefined,
    };
  },
  component: ResultatsPage,
});

function ResultatsPage() {
  const { ca: caParam, prenom } = Route.useSearch();

  const ca = parseInt(caParam || "5000");
  const userName = prenom || "Jean";

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Calculate values
  const fees = Math.round(ca * 0.1);
  const cotisations = Math.round(ca * 0.14);
  const net = ca - fees - cotisations;
  const aeNet = Math.round(ca * 0.75); // Auto-entrepreneur ~25% charges

  return (
    <div className="min-h-screen bg-[#f2f2f0] selection:bg-[#fd521a] selection:text-white">
      {/* Navigation */}
      <nav className="fixed left-0 top-6 z-50 flex w-full justify-center px-4">
        <div className="flex max-w-3xl items-center gap-8 rounded-full bg-white/70 px-3 py-2 pl-6 shadow-lg backdrop-blur-xl">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
            LOOP
          </Link>
          <Link
            to="/inscription"
            className="rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg transition-colors hover:bg-[#fd521a]"
          >
            REJOINDRE
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-[900px] px-4 pb-20 pt-32 md:px-8">
        {/* Personalized Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {userName}, voilà ce que ça donne
          </h1>
          <p className="text-gray-500">
            Pour un CA de <strong>{formatNumber(ca)} €</strong>/mois
          </p>
        </div>

        {/* Main Results Card */}
        <div className="mb-8 rounded-[2.5rem] border border-white/60 bg-white/50 p-8 shadow-lg backdrop-blur-sm md:p-12">
          {/* Big Number */}
          <div className="mb-10 text-center">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]">
              Votre salaire net mensuel
            </div>
            <div className="text-6xl font-bold tracking-tighter text-[#111] md:text-7xl">
              {formatNumber(net)} €
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Après cotisations sociales et frais Loop
            </p>
          </div>

          {/* Breakdown */}
          <div className="mb-8 rounded-2xl border border-white bg-white/60 p-6">
            <h3 className="mb-4 text-sm font-bold">Détail de votre rémunération</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Chiffre d'affaires HT</span>
                <span className="font-bold">{formatNumber(ca)} €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Frais Loop (10%)</span>
                <span className="font-bold text-[#fd521a]">- {formatNumber(fees)} €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cotisations sociales</span>
                <span className="font-bold text-gray-500">- {formatNumber(cotisations)} €</span>
              </div>
              <div className="my-2 h-px w-full bg-gray-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800">Salaire net</span>
                <span className="text-xl font-bold text-green-600">{formatNumber(net)} €</span>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-green-50 p-4 text-center">
              <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <div className="text-xs font-bold text-green-700">Chômage</div>
              <div className="text-[10px] text-green-600">Cotisé</div>
            </div>
            <div className="rounded-xl bg-blue-50 p-4 text-center">
              <Heart className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <div className="text-xs font-bold text-blue-700">Mutuelle</div>
              <div className="text-[10px] text-blue-600">Incluse</div>
            </div>
            <div className="rounded-xl bg-purple-50 p-4 text-center">
              <PiggyBank className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <div className="text-xs font-bold text-purple-700">Retraite</div>
              <div className="text-[10px] text-purple-600">Cotisée</div>
            </div>
            <div className="rounded-xl bg-amber-50 p-4 text-center">
              <FileText className="mx-auto mb-2 h-6 w-6 text-amber-600" />
              <div className="text-xs font-bold text-amber-700">Fiche de paie</div>
              <div className="text-[10px] text-amber-600">Mensuelle</div>
            </div>
          </div>

          {/* Comparison */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h3 className="mb-4 text-sm font-bold">Comparaison avec votre statut actuel</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <div className="mb-2 text-xs font-bold text-gray-400">Auto-Entrepreneur</div>
                <div className="text-2xl font-bold text-gray-400 line-through">
                  {formatNumber(aeNet)} €
                </div>
                <div className="mt-1 text-[10px] text-red-500">❌ Pas de chômage ni retraite</div>
              </div>
              <div className="rounded-xl border border-[#fd521a]/20 bg-[#fd521a]/5 p-4">
                <div className="mb-2 text-xs font-bold text-[#fd521a]">Avec Loop</div>
                <div className="text-2xl font-bold text-[#111]">{formatNumber(net)} €</div>
                <div className="mt-1 text-[10px] text-green-600">✓ Protection sociale complète</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-[2rem] border border-white/60 bg-white/50 p-8 text-center shadow-lg backdrop-blur-sm">
          <h2 className="mb-3 text-2xl font-bold">Ça vous paraît bien ?</h2>
          <p className="mb-6 text-gray-500">On peut démarrer ensemble en 48h.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/inscription"
              className="flex items-center justify-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              C'est parti
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/reunion"
              className="flex items-center justify-center gap-2 rounded-full bg-[#111] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#fd521a]"
            >
              J'ai des questions
              <MessageCircle className="h-5 w-5" />
            </Link>
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

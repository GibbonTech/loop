import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, ShieldCheck, Heart, PiggyBank, FileText } from "lucide-react";
import { PageLayout } from "~/components/layout";
import { formatNumber, getSalaryBreakdown } from "~/lib/utils";

export const Route = createFileRoute("/resultats")({
  component: ResultatsPage,
  head: () => ({
    meta: [
      { title: "Vos Résultats | Driivo" },
      { name: "description", content: "Découvrez votre salaire net estimé en tant qu'entrepreneur salarié VTC." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => {
    return {
      ca: (search.ca as string) || "5000",
      prenom: (search.prenom as string) || "Jean",
      email: (search.email as string) || "",
      tel: (search.tel as string) || "",
    };
  },
});

function ResultatsPage() {
  const { ca, prenom } = Route.useSearch();
  const caNum = parseInt(ca) || 5000;
  const { fees, cotisations, net } = getSalaryBreakdown(caNum);
  const aeNet = Math.round(caNum * 0.75);

  return (
    <PageLayout navbarVariant="minimal" showNavLinks={false}>
      {/* Main Content */}
      <main className="mx-auto max-w-[900px] px-4 pb-20 pt-32 md:px-8">
        {/* Personalized Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {prenom}, voilà ce que ça donne
          </h1>
          <p className="text-gray-500">
            Pour un CA de <strong>{formatNumber(caNum)} €</strong>/mois
          </p>
        </div>

        {/* Main Results Card */}
        <div className="mb-8 rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl md:p-12">
          {/* Big Number */}
          <div className="mb-10 text-center">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]">
              Votre salaire net mensuel
            </div>
            <div className="text-6xl font-bold tracking-tighter text-[#111] md:text-7xl">
              {formatNumber(net)} €
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Après cotisations sociales et frais Driivo
            </p>
          </div>

          {/* Breakdown */}
          <div className="mb-8 rounded-2xl border border-white bg-white/60 p-6">
            <h3 className="mb-4 text-sm font-bold">Détail de votre rémunération</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Chiffre d&apos;affaires HT</span>
                <span className="font-bold">{formatNumber(caNum)} €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Frais Driivo (10%)</span>
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
                <div className="mt-1 text-[10px] text-red-500">
                  ❌ Pas de chômage ni retraite
                </div>
              </div>
              <div className="rounded-xl border border-[#fd521a]/20 bg-[#fd521a]/5 p-4">
                <div className="mb-2 text-xs font-bold text-[#fd521a]">Avec Driivo</div>
                <div className="text-2xl font-bold text-[#111]">{formatNumber(net)} €</div>
                <div className="mt-1 text-[10px] text-green-600">
                  ✓ Protection sociale complète
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 text-center shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl">
          <h2 className="mb-3 text-2xl font-bold">Ça vous paraît bien ?</h2>
          <p className="mb-6 text-gray-500">On peut démarrer ensemble en 48h.</p>
          <div className="flex flex-col justify-center gap-4">
            <Link
              to="/inscription"
              className="flex items-center justify-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-lg font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)]"
            >
              Rejoindre Driivo maintenant
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/reunion"
              className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#fd521a]"
            >
              <MessageCircle className="h-4 w-4" />
              J&apos;ai des questions, je veux en parler
            </Link>
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

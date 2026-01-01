import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Car,
  ArrowLeftRight,
  CreditCard,
  Unlock,
  ShieldCheck,
  Check,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [ca, setCa] = useState(5000);
  const net = Math.round(ca * 0.76);
  const charges = ca - net;

  return (
    <div
      className="min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(253, 82, 26, 0.03) 0%, transparent 50%)",
      }}
    >
      {/* Navigation */}
      <nav className="fixed left-0 top-6 z-50 flex w-full justify-center px-4">
        <div className="flex max-w-3xl items-center gap-8 rounded-full bg-white/70 px-3 py-2 pl-6 shadow-lg backdrop-blur-xl">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
            LOOP
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            <a href="#mission" className="transition-colors hover:text-black">
              Mission
            </a>
            <Link
              to="/simulateur"
              className="transition-colors hover:text-black"
            >
              Simulateur
            </Link>
            <a href="#revenus" className="transition-colors hover:text-black">
              Gains
            </a>
          </div>

          <Link
            to="/inscription"
            className="rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg transition-colors hover:bg-[#fd521a]"
          >
            REJOINDRE
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-[1040px] px-4 pt-32 md:px-8 md:pt-40">
        {/* Hero Section */}
        <section className="mb-24 flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 animate-fade-in rounded-full border border-white/50 bg-white/60 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#fd521a] shadow-sm backdrop-blur-md">
            La Première Coopérative VTC
          </div>

          <h1 className="mb-6 text-6xl font-bold tracking-tight text-[#111] md:text-7xl lg:text-[5.5rem]">
            Indépendant.
            <br />
            <span className="text-gray-400/80">Protégé.</span>
          </h1>

          <p className="mb-10 max-w-lg text-xl font-medium leading-relaxed text-gray-600">
            Transformez votre activité VTC en{" "}
            <span className="font-bold text-[#111]">salaire</span> sans jamais
            avoir de patron.
            <span className="mt-2 block text-base text-gray-400">
              Le statut de salarié. La liberté de l&apos;indépendant.
            </span>
          </p>

          <div className="mb-16 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/simulateur"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl sm:w-auto"
            >
              Simulez vos revenus
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/inscription"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white/50 px-6 py-4 text-base font-bold backdrop-blur-sm transition-all hover:-translate-y-1 sm:w-auto"
            >
              Rejoindre maintenant
            </Link>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-3 gap-8 opacity-40 grayscale transition-opacity duration-500 hover:opacity-100 hover:grayscale-0 md:gap-16">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-[#111]">10%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Frais seulement
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-[#111]">0</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Paperasse
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-[#111]">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Liberté
              </span>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mb-10 py-16">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Comment ça marche ?</h2>
            <p className="mx-auto max-w-lg text-gray-500">
              On ne change rien à votre façon de travailler. On change juste ce
              que vous gagnez.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm">
              <div className="absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5">
                1
              </div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">Vous roulez</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Uber, Bolt, Heetch... Gardez vos applis, vos clients, votre
                voiture. Vous restez le patron.
              </p>
            </div>

            <div className="group relative rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm">
              <div className="absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5">
                2
              </div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]">
                <ArrowLeftRight className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">On transforme</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Loop encaisse votre CA, déduit la TVA et les frais, et
                transforme le reste en salaire net.
              </p>
            </div>

            <div className="group relative rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm">
              <div className="absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5">
                3
              </div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">Vous encaissez</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Fiche de paie, cotisations chômage, retraite. Tout est payé.
                Vous recevez votre net.
              </p>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION */}
        <section id="mission" className="py-16">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="flex min-h-[300px] flex-col justify-between rounded-[2.5rem] border border-white/60 bg-white/50 p-10 shadow-sm backdrop-blur-sm md:col-span-7">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <Unlock className="h-3 w-3" /> Liberté Totale
                </div>
                <h3 className="mb-4 text-3xl font-bold">
                  Pas de patron.
                  <br />
                  Jamais.
                </h3>
                <p className="max-w-sm text-gray-500">
                  Contrairement aux &quot;startups&quot; qui veulent vous
                  salarier, Loop est une coopérative. Vous êtes membre, pas
                  employé.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600">
                  Vos Horaires
                </div>
                <div className="rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600">
                  Vos Zones
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-10 shadow-sm backdrop-blur-sm md:col-span-5">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <ShieldCheck className="h-3 w-3" /> Sécurité
              </div>
              <h3 className="mb-4 text-2xl font-bold">
                Le filet de sécurité du salarié.
              </h3>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </div>
                  Chômage & Retraite
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </div>
                  Mutuelle Santé
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </div>
                  Prévoyance Accident
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SIMULATOR */}
        <section id="revenus" className="py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-bold">Simulateur</h3>
              <div className="mb-8">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Votre CA Mensuel
                </label>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold tracking-tighter text-[#111]">
                    {ca}
                  </span>
                  <span className="text-2xl text-gray-300">€</span>
                </div>
              </div>
              <input
                type="range"
                min="3000"
                max="10000"
                step="500"
                value={ca}
                onChange={(e) => setCa(parseInt(e.target.value))}
                className="mb-10 w-full accent-[#fd521a]"
              />

              <div className="rounded-2xl border border-white bg-white/60 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]">
                      Net dans votre poche
                    </div>
                    <div className="text-4xl font-bold tracking-tight">
                      {net} €
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Frais & Charges
                    </div>
                    <div className="text-lg font-bold text-gray-500">
                      {charges} €
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="scale-105 rounded-[2rem] bg-[#fd521a] p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">LOOP</h4>
                    <p className="mt-1 text-xs font-bold text-[#ff8a65]">
                      10% • Protection Totale
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#fd521a]">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-2xl py-20">
          <h2 className="mb-10 text-center text-2xl font-bold">
            Questions Fréquentes
          </h2>
          <div className="space-y-3">
            <details className="group cursor-pointer rounded-2xl border border-white/60 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
              <summary className="flex list-none select-none items-center justify-between text-sm font-bold">
                Est-ce un CDI ?
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Non, vous restez indépendant. C&apos;est un statut hybride
                (Entrepreneur Salarié) qui combine le meilleur des deux mondes.
              </p>
            </details>
            <details className="group cursor-pointer rounded-2xl border border-white/60 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
              <summary className="flex list-none select-none items-center justify-between text-sm font-bold">
                Engagement de durée ?
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Aucun. Vous partez quand vous voulez. Liberté totale.
              </p>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center">
          <Link
            to="/inscription"
            className="rounded-full bg-[#fd521a] px-10 py-4 text-lg font-bold text-white shadow-xl transition-transform hover:scale-105"
          >
            Devenir Membre Loop
          </Link>
          <p className="mt-6 text-xs uppercase tracking-widest text-gray-400">
            Sans engagement • Démarrage 48h
          </p>
        </section>

        <footer className="border-t border-gray-200/50 py-10 text-center text-xs font-medium text-gray-400">
          <p>
            © 2025 Coopérative Loop. Fait par des chauffeurs, pour des
            chauffeurs.
          </p>
        </footer>
      </main>
    </div>
  );
}

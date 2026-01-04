import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { signIn, useSession } from "~/lib/auth/auth-client";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import {
  ArrowRight,
  Car,
  ArrowLeftRight,
  CreditCard,
  Unlock,
  ShieldCheck,
  Check,
  ChevronDown,
  CheckCircle,
  ShieldOff,
  FileX2,
  Ban,
  Star,
} from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

// Server function to detect hostname from request headers
const getHostname = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  const host = request.headers.get("host") || "";
  return { isAppDomain: host === "app.driivo.fr" || host.startsWith("app.") };
});

export const Route = createFileRoute("/")({
  component: IndexPage,
  loader: async () => {
    return await getHostname();
  },
  head: () => ({
    meta: [
      { title: "Driivo - Devenez Entrepreneur Salarié VTC" },
      { name: "description", content: "Restez indépendant tout en bénéficiant d'un vrai CDI : fiche de paie, retraite, mutuelle, chômage. La liberté en plus, la sécurité en prime." },
    ],
  }),
});

function IndexPage() {
  const { isAppDomain } = Route.useLoaderData();

  if (isAppDomain) {
    return <LoginPage />;
  }

  return <LandingPage />;
}

function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Identifiants incorrects");
      } else {
        toast.success("Connexion réussie");
        const user = result.data?.user as { role?: string } | undefined;
        if (user?.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/espace";
        }
      }
    } catch {
      toast.error("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  if (session?.user) {
    const userRole = (session.user as { role?: string }).role;
    if (userRole === "ADMIN") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/espace";
    }
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f2f0]">
      <header className="px-4 py-6">
        <a href="https://driivo.fr" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#fd521a]">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </a>
      </header>
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <a href="https://driivo.fr" className="inline-block">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fd521a]">
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </div>
            </a>
            <h1 className="mb-2 text-2xl font-bold text-[#1c1917]">Connexion</h1>
            <p className="text-gray-600">Accédez à votre espace Driivo</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#1c1917]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[#1c1917] placeholder:text-gray-400 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#1c1917]">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[#1c1917] placeholder:text-gray-400 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#fd521a] px-4 py-3 font-bold text-white transition-colors hover:bg-[#e04819] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Pas encore inscrit ?{" "}
            <a href="https://app.driivo.fr/inscription" className="font-medium text-[#fd521a] hover:underline">
              Rejoindre Driivo
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

function LandingPage() {
  const [ca, setCa] = useState(5000);

  // Calculate results
  const fees = Math.round(ca * 0.1);
  const cotisations = Math.round(ca * 0.14);
  const net = ca - fees - cotisations;

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, " ");
  };

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
        <div className="flex max-w-3xl items-center gap-8 rounded-full border border-white/40 bg-white/60 px-3 py-2 pl-6 shadow-[0_8px_32px_-4px_rgba(168,162,158,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
            DRIIVO
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            <a href="#probleme" className="transition-colors hover:text-black">
              Le Problème
            </a>
            <a href="#solution" className="transition-colors hover:text-black">
              La Solution
            </a>
            <Link to="/simulateur" className="transition-colors hover:text-black">
              Simulateur
            </Link>
            <a href="#faq" className="transition-colors hover:text-black">
              FAQ
            </a>
          </div>

          <a
            href="https://app.driivo.fr/inscription"
            className="rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#fd521a] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)]"
          >
            REJOINDRE
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-[1040px] px-4 pt-32 md:px-8 md:pt-40">
        {/* HERO SECTION */}
        <section className="mb-16 flex min-h-[70vh] flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-full border border-white/50 bg-white/60 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#fd521a] shadow-sm backdrop-blur-md">
            Nouveau Statut VTC
          </div>

          <h1 className="mb-6 text-6xl font-[650] leading-[0.9] tracking-[-0.06em] text-[#111] md:text-7xl lg:text-[5.5rem]">
            Devenez
            <br />
            <span className="text-[#fd521a]">entrepreneur salarié</span>
          </h1>

          <p className="mb-10 max-w-xl text-xl font-medium leading-relaxed text-gray-600">
            Restez indépendant tout en bénéficiant d&apos;un{" "}
            <span className="font-bold text-[#111]">vrai CDI</span> : fiche de
            paie, retraite, mutuelle, chômage.
            <span className="mt-2 block text-base text-gray-400">
              La liberté en plus. La sécurité en prime.
            </span>
          </p>

          <div className="mb-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/simulateur"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)] sm:w-auto"
            >
              Simulez vos revenus
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://app.driivo.fr/inscription"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-6 py-4 text-base font-bold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/80 sm:w-auto"
            >
              Rejoindre maintenant
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> Démarrage 48h
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> Sans engagement
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> 100% légal
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 border-t border-gray-200/50 pt-10 md:gap-16">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold text-[#111] md:text-4xl">500+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Chauffeurs actifs
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold text-[#fd521a] md:text-4xl">+500€</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Gain moyen / mois
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-bold text-[#111] md:text-4xl">10%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Frais seulement
              </span>
            </div>
          </div>
        </section>

        {/* MINI CALCULATOR - Inline Value Preview */}
        <section id="simulateur" className="mb-10 py-8">
          <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl md:p-10">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold">Combien vous reste-t-il en net ?</h2>
              <p className="text-sm text-gray-500">Glissez le curseur pour voir votre salaire</p>
            </div>

            {/* Slider */}
            <div className="mb-6">
              <div className="mb-4 flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold tracking-tighter text-[#111]">{formatNumber(ca)}</span>
                <span className="text-2xl text-gray-300">€/mois</span>
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

            {/* Results */}
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-green-50 p-4 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-green-600">Votre salaire net</div>
                <div className="text-3xl font-bold text-green-700">{formatNumber(net)} €</div>
              </div>
              <div className="rounded-2xl bg-gray-100 p-4 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Cotisations payées</div>
                <div className="text-2xl font-bold text-gray-600">{formatNumber(cotisations)} €</div>
                <div className="text-[10px] text-gray-400">Chômage, retraite, mutuelle inclus</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/simulateur"
                className="flex items-center justify-center gap-2 rounded-full bg-[#fd521a] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]"
              >
                Simulation détaillée
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://app.driivo.fr/inscription"
                className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-[#fd521a] hover:text-[#fd521a]"
              >
                Rejoindre maintenant
              </a>
            </div>
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section id="probleme" className="mb-10 py-16">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Le constat
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Chauffeur VTC n&apos;est pas
              <br />
              un métier facile.
            </h2>
            <p className="mx-auto max-w-lg text-gray-500">
              Le statut indépendant promet la liberté. Mais à quel prix ?
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-black/5 bg-gradient-to-b from-[#f7f7f5] to-[#f2f2f0] p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <ShieldOff className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">Zéro protection sociale</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Pas de chômage si vous arrêtez. Pas de retraite digne. Une
                mutuelle hors de prix. En cas de pépin, vous êtes seul.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-gradient-to-b from-[#f7f7f5] to-[#f2f2f0] p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                <FileX2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">La paperasse sans fin</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Urssaf, TVA, comptabilité... Vous passez vos dimanches sur des
                formulaires au lieu de vous reposer ou d&apos;être en famille.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-gradient-to-b from-[#f7f7f5] to-[#f2f2f0] p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                <Ban className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">Les portes fermées</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Prêt immobilier refusé. Loueur qui exige des garanties. Sans
                fiche de paie, vous n&apos;existez pas pour les banques.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm italic text-gray-400">
              Et si vous pouviez garder la liberté... sans les inconvénients ?
            </p>
          </div>
        </section>

        {/* THE SOLUTION SECTION */}
        <section id="solution" className="mb-10 py-16">
          <div className="mb-16 text-center">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]">
              La solution
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Driivo transforme votre CA
              <br />
              en salaire.
            </h2>
            <p className="mx-auto max-w-lg text-gray-500">
              On ne change rien à votre façon de travailler. On change juste ce
              que vous gagnez.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85">
              <div className="absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5">
                1
              </div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">Vous roulez</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Uber, Bolt, Heetch... Gardez vos applis, vos clients, votre
                voiture. Vous restez le patron de vos horaires.
              </p>
            </div>

            <div className="group relative rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85">
              <div className="absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5">
                2
              </div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]">
                <ArrowLeftRight className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">On transforme</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Driivo encaisse votre CA, déduit la TVA et les frais, et
                transforme le reste en un vrai salaire net.
              </p>
            </div>

            <div className="group relative rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85">
              <div className="absolute right-6 top-6 -z-10 text-6xl font-bold text-gray-100 transition-colors group-hover:text-[#fd521a]/5">
                3
              </div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fd521a]/10 text-[#fd521a]">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold">Vous êtes payé</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Fiche de paie mensuelle, cotisations chômage et retraite payées.
                Vous recevez votre net, point final.
              </p>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION BENTO */}
        <section className="py-16">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="flex min-h-[300px] flex-col justify-between rounded-[2.5rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-10 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl md:col-span-7">
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
                  employer, Driivo est une coopérative. Vous êtes membre, pas
                  employé. Vos décisions restent les vôtres.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600">
                  Vos Horaires
                </div>
                <div className="rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600">
                  Vos Zones
                </div>
                <div className="rounded-xl border border-white/60 bg-white/50 px-4 py-2 text-xs font-bold text-gray-600">
                  Vos Applis
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/50 bg-white/40 p-10 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl md:col-span-5">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <ShieldCheck className="h-3 w-3" /> Sécurité Totale
              </div>
              <h3 className="mb-4 text-2xl font-bold">
                Le filet de sécurité
                <br />
                du salarié.
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
                <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3 w-3" />
                  </div>
                  Fiche de paie mensuelle
                </li>
              </ul>
            </div>

            {/* THE DEAL CARD */}
            <div className="relative mt-4 overflow-hidden rounded-[2.5rem] border border-[#fd521a]/10 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl md:col-span-12 md:p-12">
              <div className="absolute -mr-20 -mt-20 right-0 top-0 h-64 w-64 rounded-full bg-[#fd521a]/5 blur-3xl"></div>

              <div className="relative z-10 flex flex-col items-end justify-between gap-8 md:flex-row md:items-center">
                <div className="max-w-md">
                  <div className="mb-4 inline-block rounded-full bg-[#fd521a]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#fd521a]">
                    Le Pacte Driivo
                  </div>
                  <h3 className="mb-2 text-3xl font-bold">90% pour vous.</h3>
                  <p className="text-gray-500">
                    On prend 10% pour faire tourner la coopérative. Le reste est
                    à vous. C&apos;est ça, la transparence.
                  </p>
                </div>

                <div className="w-full rounded-3xl border border-white/60 bg-white/50 p-6 md:w-1/2">
                  <div className="mb-6">
                    <div className="mb-2 flex justify-between text-sm font-bold">
                      <span>Votre Part</span>
                      <span className="text-green-600">90%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-[90%] rounded-r-full bg-[#111]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between text-sm font-bold">
                      <span className="text-[#fd521a]">Frais Driivo</span>
                      <span className="text-[#fd521a]">10%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-[10%] rounded-r-full bg-[#fd521a]"></div>
                    </div>
                    <p className="mt-2 text-right text-[10px] text-gray-400">
                      *Contre 15-20% chez les concurrents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Ils nous font confiance
            </div>
            <h2 className="mb-4 text-3xl font-bold">
              Ce que les chauffeurs disent de nous
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <div className="mb-4 flex items-center gap-1 text-[#fd521a]">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                &quot;Depuis que j&apos;ai rejoint en Mars, j&apos;ai enfin pu
                obtenir un prêt pour ma maison. La fiche de paie change
                tout.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                  KM
                </div>
                <div>
                  <div className="text-sm font-bold">Karim M.</div>
                  <div className="text-xs text-gray-400">
                    Chauffeur depuis 4 ans • Paris
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <div className="mb-4 flex items-center gap-1 text-[#fd521a]">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                &quot;Je gagne pareil qu&apos;avant mais maintenant je cotise
                pour ma retraite. Et surtout, plus de galère avec
                l&apos;Urssaf.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                  AB
                </div>
                <div>
                  <div className="text-sm font-bold">Abdel B.</div>
                  <div className="text-xs text-gray-400">
                    Chauffeur depuis 2 ans • Lyon
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/85 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <div className="mb-4 flex items-center gap-1 text-[#fd521a]">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                &quot;J&apos;étais sceptique au début. Mais quand j&apos;ai vu
                ma première fiche de paie avec les cotisations, j&apos;ai
                compris.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                  SD
                </div>
                <div>
                  <div className="text-sm font-bold">Sofiane D.</div>
                  <div className="text-xs text-gray-400">
                    Chauffeur depuis 6 ans • Marseille
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Compatible avec toutes vos applis préférées
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              <div className="text-2xl font-bold tracking-tighter">Uber</div>
              <div className="text-2xl font-bold tracking-tighter">Bolt</div>
              <div className="text-2xl font-bold tracking-tighter">Heetch</div>
              <div className="text-2xl font-bold tracking-tighter">FreeNow</div>
              <div className="text-2xl font-bold tracking-tighter">+6</div>
            </div>
          </div>
        </section>

        {/* 5 STEPS TO JOIN */}
        <section className="py-16">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Inscription
            </div>
            <h2 className="mb-4 text-3xl font-bold">
              5 étapes pour devenir chauffeur Driivo
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <div className="p-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fd521a] font-bold text-white">
                1
              </div>
              <h4 className="mb-1 text-sm font-bold">Candidature</h4>
              <p className="text-xs text-gray-400">2 minutes en ligne</p>
            </div>
            <div className="p-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
                2
              </div>
              <h4 className="mb-1 text-sm font-bold">Vérification</h4>
              <p className="text-xs text-gray-400">On valide vos docs</p>
            </div>
            <div className="p-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
                3
              </div>
              <h4 className="mb-1 text-sm font-bold">Entretien</h4>
              <p className="text-xs text-gray-400">Appel de 15 min</p>
            </div>
            <div className="p-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-600">
                4
              </div>
              <h4 className="mb-1 text-sm font-bold">Signature</h4>
              <p className="text-xs text-gray-400">Contrat en ligne</p>
            </div>
            <div className="p-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 font-bold text-white">
                <Check className="h-5 w-5" />
              </div>
              <h4 className="mb-1 text-sm font-bold">C&apos;est parti !</h4>
              <p className="text-xs text-gray-400">Roulez dès 48h</p>
            </div>
          </div>

          {/* CTA for 5-step section */}
          <div className="mt-10 text-center">
            <a
              href="https://app.driivo.fr/inscription"
              className="inline-flex items-center gap-2 rounded-full bg-[#fd521a] px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]"
            >
              Commencer ma candidature
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-2xl py-20">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              FAQ
            </div>
            <h2 className="mb-4 text-3xl font-bold">
              Les réponses à vos questions
            </h2>
          </div>
          <div className="space-y-3">
            <details className="group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
              <summary className="flex list-none select-none items-center justify-between text-sm font-bold">
                C&apos;est quoi exactement l&apos;Entrepreneur Salarié ?
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                C&apos;est un statut légal (CESA) qui vous permet de rester
                totalement indépendant dans votre activité, tout en étant
                rattaché à une coopérative (comme Driivo) qui vous verse un
                salaire. Vous gardez votre liberté, mais vous gagnez la
                protection sociale d&apos;un salarié.
              </p>
            </details>

            <details className="group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
              <summary className="flex list-none select-none items-center justify-between text-sm font-bold">
                Est-ce que c&apos;est un vrai CDI ?
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Oui. C&apos;est un CDI inscrit au registre du commerce. Vous
                recevez une fiche de paie tous les mois, vous cotisez pour la
                retraite et le chômage, et vous bénéficiez d&apos;une mutuelle.
                C&apos;est le statut le plus protecteur qui existe pour un
                chauffeur VTC.
              </p>
            </details>

            <details className="group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
              <summary className="flex list-none select-none items-center justify-between text-sm font-bold">
                Je garde mes horaires et mes applis ?
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                100% oui. Vous travaillez quand vous voulez, où vous voulez, sur
                les plateformes que vous voulez (Uber, Bolt, Heetch...). Driivo
                ne vous impose rien. C&apos;est ça, le modèle coopératif.
              </p>
            </details>

            <details className="group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
              <summary className="flex list-none select-none items-center justify-between text-sm font-bold">
                Combien ça coûte ?
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                10% de votre chiffre d&apos;affaires HT. C&apos;est tout. Pas de
                frais cachés, pas de coûts d&apos;inscription. On est moins cher
                que la concurrence (15-20%), et vous récupérez la TVA sur vos
                achats (essence, entretien...).
              </p>
            </details>

            <details className="group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
              <summary className="flex list-none select-none items-center justify-between text-sm font-bold">
                Il y a un engagement de durée ?
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Non. Vous pouvez partir quand vous voulez, sans frais ni
                pénalités. On ne vous retient pas. Si Driivo ne vous convient
                pas, vous êtes libre.
              </p>
            </details>

            <details className="group cursor-pointer rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-5 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
              <summary className="flex list-none select-none items-center justify-between text-sm font-bold">
                Quelles sont les conditions pour rejoindre ?
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Avoir votre carte VTC et un véhicule. C&apos;est tout. Si vous
                roulez déjà en indépendant, vous avez déjà ce qu&apos;il faut.
                On s&apos;occupe du reste.
              </p>
            </details>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20">
          <div className="relative overflow-hidden rounded-[3rem] border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 p-12 text-center shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
            <div className="absolute -ml-32 -mt-32 left-0 top-0 h-64 w-64 rounded-full bg-[#fd521a]/10 blur-3xl"></div>
            <div className="absolute -mb-32 -mr-32 bottom-0 right-0 h-64 w-64 rounded-full bg-[#fd521a]/10 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                On commence quand ?
              </h2>
              <p className="mx-auto mb-8 max-w-md text-gray-500">
                48h pour passer de &quot;intéressé&quot; à &quot;premier salaire
                versé&quot;.
              </p>
              <a
                href="https://app.driivo.fr/inscription"
                className="inline-block rounded-full bg-[#fd521a] px-10 py-4 text-lg font-bold text-white shadow-xl transition-transform hover:scale-105"
              >
                Je me lance
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gray-200/50 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black">
              <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
              DRIIVO
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-400">
              <a href="#" className="transition-colors hover:text-black">
                Mentions Légales
              </a>
              <a href="#" className="transition-colors hover:text-black">
                CGV
              </a>
              <a href="#" className="transition-colors hover:text-black">
                Politique de Cookies
              </a>
              <a href="#" className="transition-colors hover:text-black">
                Contact
              </a>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            © 2025 Coopérative Driivo. Tous droits réservés.
          </p>
        </footer>
      </main>
    </div>
  );
}

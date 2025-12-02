"use client";

import { useState } from "react";
import {
  TrendingDown,
  AlertCircle,
  XCircle,
  Check,
  Wallet,
  ShieldCheck,
  PiggyBank,
  Download,
  Link,
  PieChart,
  FileText,
  Signal,
  Wifi,
  BatteryFull,
  Bell,
  ScanLine,
  Home,
  Folder,
  User,
  ChevronDown,
  ArrowRight,
  Info,
} from "lucide-react";

export default function HomePage() {
  const [ca, setCa] = useState(5000);
  const net = Math.round(ca * 0.76);
  const charges = ca - net;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="ambient-light"></div>
      <div className="glow-spot w-[800px] h-[800px] top-[-200px] left-1/2 -translate-x-1/2 animate-fluid fixed"></div>
      <div className="fixed inset-0 grid-pattern pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <div className="liquid-glass px-2 pl-6 py-2 rounded-full flex items-center gap-6 md:gap-10">
          <a href="#" className="font-bold text-lg tracking-tighter flex items-center gap-2.5" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-3 h-3 rounded-full bg-[#fd521a] shadow-[0_0_15px_#fd521a]"></div>
            LOOP
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#comparatif" className="hover:text-white transition-colors duration-300">Comparatif</a>
            <a href="#etapes" className="hover:text-white transition-colors duration-300">Fonctionnement</a>
            <a href="#revenus" className="hover:text-white transition-colors duration-300">Revenus</a>
            <a href="#fonctionnalites" className="hover:text-white transition-colors duration-300">L&apos;App</a>
          </div>

          <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#fd521a] hover:text-white transition-all duration-300 shadow-lg">
            Candidater
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 pt-40 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="min-h-[75vh] flex flex-col items-center text-center justify-center -mt-10">
          <div className="mb-10 px-4 py-1.5 rounded-full border border-[#fd521a]/10 bg-[#fd521a]/[0.03] text-[10px] font-bold tracking-[0.2em] uppercase text-[#fd521a]/80">
            Commissions réduites à 10%
          </div>

          <h1 className="heading-hero text-6xl md:text-8xl lg:text-[6.5rem] font-semibold mb-8 text-white tracking-tighter">
            Indépendant.<br />
            <span className="text-white/20">Jamais seul.</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-white/50 leading-relaxed font-light mb-12">
            Le statut ultime pour chauffeur VTC. <span className="text-white font-medium">Récupérez la TVA, cotisez au chômage et gagnez plus</span> qu&apos;en auto-entreprise. Stop aux frais cachés. Stop à la précarité.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button onClick={() => scrollTo("revenus")} className="w-full sm:w-auto px-10 py-4 btn-primary rounded-full text-white font-medium shadow-[0_0_40px_rgba(253,82,26,0.4)] text-lg">
              Simuler mes gains
            </button>
            <button onClick={() => scrollTo("etapes")} className="w-full sm:w-auto px-10 py-4 btn-secondary rounded-full text-white font-medium flex items-center gap-3 justify-center text-lg">
              <Info className="w-5 h-5" /> Comment ça marche
            </button>
          </div>

          <div className="mt-24 pt-10 border-t border-white/5 w-full max-w-2xl">
            <p className="text-xs text-white/20 uppercase tracking-[0.2em] mb-8 font-medium">Compatible avec vos plateformes</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-30 hover:opacity-80 transition-opacity duration-700">
              <span className="text-xl font-bold tracking-tighter">UBER</span>
              <span className="text-xl font-bold tracking-tighter">BOLT</span>
              <span className="text-xl font-bold tracking-tighter">HEETCH</span>
              <span className="text-xl font-bold tracking-tighter">FREENOW</span>
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section id="comparatif" className="py-32">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">Pourquoi Loop est <br /><span className="text-[#fd521a]">mathématiquement gagnant.</span></h2>
            <p className="text-white/50 text-xl font-light">Comparatif financier réel pour 5000€ de CA/mois.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Card 1: Auto-Entrepreneur */}
            <div className="liquid-glass rounded-[2rem] p-8 border border-white/5 relative group hover:border-red-500/20 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>

              <h3 className="text-xl font-semibold mb-2 text-white/60">Auto-Entrepreneur</h3>
              <div className="text-sm text-red-400 font-medium mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Pertes Cachées
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <TrendingDown className="w-5 h-5 text-red-500 shrink-0" />
                  <div className="text-sm font-medium text-white/80">TVA Essence perdue <br /><span className="text-[10px] uppercase tracking-wide text-red-400">20% de perte sèche</span></div>
                </div>
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <div className="text-sm text-white/60">Protection Sociale 0€ <br /><span className="text-[10px] uppercase tracking-wide opacity-60">Maladie = 0 revenus</span></div>
                </div>
                <div className="flex items-start gap-4">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <div className="text-sm text-white/60">Zéro Chômage <br /><span className="text-[10px] uppercase tracking-wide opacity-60">Risque total</span></div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-center">
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Bilan Financier</div>
                  <div className="text-red-400 font-bold">Fragile & Risqué</div>
                </div>
              </div>
            </div>

            {/* Card 2: Competitors */}
            <div className="liquid-glass rounded-[2rem] p-8 border border-white/5 relative group hover:border-orange-500/20 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-50"></div>

              <h3 className="text-xl font-semibold mb-2 text-white">Portage Classique</h3>
              <div className="text-sm text-orange-400 font-medium mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Coût Élevé
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Check className="w-5 h-5 text-white/40 shrink-0" />
                  <div className="text-sm text-white/60">TVA Récupérée</div>
                </div>
                <div className="flex items-start gap-4">
                  <Check className="w-5 h-5 text-white/40 shrink-0" />
                  <div className="text-sm text-white/60">Chômage & Retraite</div>
                </div>
                <div className="flex items-start gap-4">
                  <Wallet className="w-5 h-5 text-orange-500 shrink-0" />
                  <div className="text-sm font-bold text-white">Commissions 15% <br /><span className="text-[10px] uppercase tracking-wide text-orange-400">~1800€ perdus / an</span></div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-center">
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Bilan Financier</div>
                  <div className="text-orange-400 font-bold">Sécurisé mais Cher</div>
                </div>
              </div>
            </div>

            {/* Card 3: Loop */}
            <div className="liquid-glass rounded-[2rem] p-8 border border-[#fd521a]/30 relative group bg-gradient-to-b from-[#fd521a]/[0.05] to-transparent shadow-[0_0_50px_-10px_rgba(253,82,26,0.15)] transform scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fd521a] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">Le plus rentable</div>

              <h3 className="text-2xl font-bold mb-2 text-white">LOOP</h3>
              <div className="text-sm text-[#fd521a] font-bold mb-8 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#fd521a] animate-pulse"></div> Sécurité + Cash
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#fd521a] flex items-center justify-center text-white shrink-0"><Check className="w-3 h-3" /></div>
                  <div className="text-sm font-bold text-white">TVA Récupérée (+20%) <br /><span className="text-[10px] uppercase tracking-wide opacity-60 font-normal">Gain immédiat sur frais</span></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#fd521a] flex items-center justify-center text-white shrink-0"><ShieldCheck className="w-3 h-3" /></div>
                  <div className="text-sm font-medium">Chômage Inclus <br /><span className="text-[10px] uppercase tracking-wide opacity-60">Sécurité financière</span></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#fd521a] flex items-center justify-center text-white shrink-0"><PiggyBank className="w-3 h-3" /></div>
                  <div className="text-sm font-bold text-[#fd521a]">Frais Minimes (10%) <br /><span className="text-[10px] uppercase tracking-wide text-white opacity-80 font-normal">Gain de +250€ / mois</span></div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Bilan Financier</div>
                  <div className="text-[#fd521a] font-bold">Optimisation Maximale</div>
                </div>
              </div>

              <button onClick={() => scrollTo("revenus")} className="w-full mt-8 py-4 bg-[#fd521a] rounded-xl font-bold text-white hover:bg-white hover:text-black transition-all shadow-lg">
                Passer chez Loop
              </button>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section id="etapes" className="py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Démarrer en 48h chrono</h2>
            <p className="text-white/50 text-lg">Pas de création d&apos;entreprise. Pas de comptable. Juste vous et la route.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="liquid-glass p-8 rounded-[2rem] relative overflow-hidden group">
              <div className="text-[6rem] font-bold text-white/5 absolute -top-4 -right-4 group-hover:text-[#fd521a]/5 transition-colors duration-500 select-none">1</div>
              <div className="w-12 h-12 rounded-xl bg-[#fd521a]/5 border border-[#fd521a]/10 flex items-center justify-center text-[#fd521a] mb-6 group-hover:bg-[#fd521a]/10 transition-colors duration-500">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Téléchargez Loop</h3>
              <p className="text-white/50 text-sm leading-relaxed">Créez votre compte et signez votre contrat de travail directement dans l&apos;application. Zéro papier.</p>
            </div>
            {/* Step 2 */}
            <div className="liquid-glass p-8 rounded-[2rem] relative overflow-hidden group">
              <div className="text-[6rem] font-bold text-white/5 absolute -top-4 -right-4 group-hover:text-[#fd521a]/5 transition-colors duration-500 select-none">2</div>
              <div className="w-12 h-12 rounded-xl bg-[#fd521a]/5 border border-[#fd521a]/10 flex items-center justify-center text-[#fd521a] mb-6 group-hover:bg-[#fd521a]/10 transition-colors duration-500">
                <Link className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Connectez vos Apps</h3>
              <p className="text-white/50 text-sm leading-relaxed">Liez vos comptes Uber, Bolt, etc. Loop récupère automatiquement votre chiffre d&apos;affaires.</p>
            </div>
            {/* Step 3 */}
            <div className="liquid-glass p-8 rounded-[2rem] relative overflow-hidden group">
              <div className="text-[6rem] font-bold text-white/5 absolute -top-4 -right-4 group-hover:text-[#fd521a]/5 transition-colors duration-500 select-none">3</div>
              <div className="w-12 h-12 rounded-xl bg-[#fd521a]/5 border border-[#fd521a]/10 flex items-center justify-center text-[#fd521a] mb-6 group-hover:bg-[#fd521a]/10 transition-colors duration-500">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Recevez votre Salaire</h3>
              <p className="text-white/50 text-sm leading-relaxed">Transformez votre CA en salaire net + fiches de paie + cotisations sociales. Automatiquement.</p>
            </div>
          </div>
        </section>

        {/* Dashboard / App Showcase */}
        <section id="fonctionnalites" className="py-24">
          <div className="liquid-glass rounded-[3rem] p-1.5 overflow-hidden relative border border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fd521a]/5 via-transparent to-transparent opacity-30 pointer-events-none"></div>

            <div className="bg-[#050505] rounded-[2.7rem] p-8 md:p-16 relative overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div className="order-2 lg:order-1 relative z-10">
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-[1.1]">
                    Votre copilote financier.<br />
                    <span className="text-white/20">Tout en un.</span>
                  </h2>
                  <p className="text-white/50 text-lg mb-12 leading-relaxed font-light">
                    Loop centralise vos données VTC pour vous offrir une vision claire de votre activité. Plus besoin de jongler entre 4 applications.
                  </p>

                  <div className="space-y-4">
                    <div className="group flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-default">
                      <div className="w-12 h-12 rounded-xl bg-[#fd521a]/5 border border-[#fd521a]/10 flex items-center justify-center text-[#fd521a] shrink-0">
                        <PieChart className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white transition-colors mb-1">Analyse des Revenus</h3>
                        <p className="text-sm text-white/40 leading-relaxed">Vue détaillée par plateforme (Uber vs Bolt). Comprenez où vous gagnez le plus.</p>
                      </div>
                    </div>

                    <div className="group flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-default">
                      <div className="w-12 h-12 rounded-xl bg-[#fd521a]/5 border border-[#fd521a]/10 flex items-center justify-center text-[#fd521a] shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white transition-colors mb-1">Documents Administratifs</h3>
                        <p className="text-sm text-white/40 leading-relaxed">Contrats, fiches de paie, attestation employeur. Tout est téléchargeable en PDF.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Mockup */}
                <div className="relative h-[700px] flex justify-center items-center order-1 lg:order-2">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#fd521a]/20 blur-[150px] rounded-full opacity-40"></div>

                  <div className="phone-frame w-[320px] h-[640px] relative z-10 overflow-hidden bg-[#0a0a0a] flex flex-col border border-white/10 shadow-2xl">
                    {/* Status Bar */}
                    <div className="h-10 w-full flex justify-between px-6 items-center pt-3">
                      <div className="text-xs text-white font-semibold tracking-wide">9:41</div>
                      <div className="flex gap-1.5">
                        <Signal className="w-3 h-3 text-white" />
                        <Wifi className="w-3 h-3 text-white" />
                        <BatteryFull className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="flex-1 overflow-y-auto app-scroll relative pb-20">
                      {/* Header Profile */}
                      <div className="px-6 pt-5 pb-6 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-950 border border-white/10"></div>
                          <div>
                            <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium mb-0.5">Bonjour,</div>
                            <div className="text-lg font-bold tracking-tight">Karim B.</div>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 relative hover:bg-white/10 transition-colors cursor-pointer">
                          <Bell className="w-4 h-4 text-white/80" />
                          <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#fd521a] rounded-full border border-[#0a0a0a]"></div>
                        </div>
                      </div>

                      {/* Main Balance Card */}
                      <div className="px-6 mb-6">
                        <div className="bg-gradient-to-br from-[#151515] to-[#0a0a0a] p-6 rounded-[1.5rem] border border-white/10 relative overflow-hidden group shadow-lg">
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#fd521a]/10 blur-[60px] rounded-full"></div>
                          <div className="relative z-10">
                            <div className="flex justify-between items-start mb-5">
                              <div>
                                <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Salaire Net Estimé</div>
                                <div className="text-3xl font-bold text-white tracking-tighter">3 250<span className="text-white/40 text-xl">,40 €</span></div>
                              </div>
                              <div className="bg-[#fd521a]/10 text-[#fd521a] px-2 py-1 rounded-full text-[10px] font-bold border border-[#fd521a]/20">+12%</div>
                            </div>

                            <div className="flex items-end gap-1.5 h-14 mb-5">
                              <div className="w-full bg-white/5 h-[40%] rounded-sm"></div>
                              <div className="w-full bg-white/5 h-[60%] rounded-sm"></div>
                              <div className="w-full bg-white/5 h-[30%] rounded-sm"></div>
                              <div className="w-full bg-white/5 h-[80%] rounded-sm"></div>
                              <div className="w-full bg-[#fd521a] h-[100%] rounded-sm shadow-[0_0_15px_#fd521a]"></div>
                              <div className="w-full bg-white/5 h-[50%] rounded-sm"></div>
                            </div>

                            <div className="flex gap-2">
                              <div className="bg-white/5 px-2 py-1 rounded-md border border-white/5 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-white"></div> <span className="text-[10px] font-medium opacity-80">Uber</span>
                              </div>
                              <div className="bg-white/5 px-2 py-1 rounded-md border border-white/5 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> <span className="text-[10px] font-medium opacity-80">Bolt</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="px-6 mb-6">
                        {/* API SYNC STATUS ROW */}
                        <div className="flex gap-3 mb-4 overflow-x-auto pb-1">
                          <div className="bg-white/5 px-3 py-2 rounded-xl flex items-center gap-2 border border-white/5 whitespace-nowrap">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-medium">Uber Connecté</span>
                          </div>
                          <div className="bg-white/5 px-3 py-2 rounded-xl flex items-center gap-2 border border-white/5 whitespace-nowrap">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-medium">Bolt Connecté</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-[#151515] p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer active:scale-95 duration-200">
                            <div className="w-8 h-8 rounded-full bg-[#fd521a]/5 border border-[#fd521a]/10 flex items-center justify-center text-[#fd521a] mb-2">
                              <Download className="w-4 h-4" />
                            </div>
                            <div className="text-xs font-bold text-white mb-0.5">Fiche de Paie</div>
                            <div className="text-[10px] text-white/40 font-medium">Octobre 2025</div>
                          </div>
                          <div className="bg-[#151515] p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer active:scale-95 duration-200">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
                              <ScanLine className="w-4 h-4" />
                            </div>
                            <div className="text-xs font-bold text-white mb-0.5">Scanner Reçu</div>
                            <div className="text-[10px] text-white/40 font-medium">Récup. TVA</div>
                          </div>
                        </div>
                      </div>

                      {/* History */}
                      <div className="px-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-[#151515] border border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">⛽️</div>
                              <div>
                                <div className="text-xs font-bold text-white">Station BP</div>
                                <div className="text-[10px] text-white/40">10:23</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold text-white">- 50,00 €</div>
                              <div className="text-[9px] text-green-400 font-medium">TVA OK</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl bg-[#151515] border border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">🏦</div>
                              <div>
                                <div className="text-xs font-bold text-white">Virement Loop</div>
                                <div className="text-[10px] text-white/40">Hier</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold text-[#fd521a]">+ 3 100 €</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="absolute bottom-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-between items-center z-30 pb-6">
                      <div className="flex flex-col items-center gap-1 text-[#fd521a] cursor-pointer">
                        <Home className="w-5 h-5" />
                        <span className="text-[9px] font-bold tracking-wide">Accueil</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-white/30 hover:text-white transition-colors cursor-pointer">
                        <PieChart className="w-5 h-5" />
                        <span className="text-[9px] font-medium tracking-wide">Revenus</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-white/30 hover:text-white transition-colors cursor-pointer">
                        <Folder className="w-5 h-5" />
                        <span className="text-[9px] font-medium tracking-wide">Documents</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-white/30 hover:text-white transition-colors cursor-pointer">
                        <User className="w-5 h-5" />
                        <span className="text-[9px] font-medium tracking-wide">Profil</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Simulator */}
        <section id="revenus" className="py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Votre rentabilité <br /><span className="text-[#fd521a]">maximisée.</span></h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed font-light">
                Contrairement aux auto-entrepreneurs, nous récupérons la TVA sur vos frais. Contrairement aux concurrents (15%), nous ne prenons que <span className="text-white font-bold">10%</span>.
              </p>
              <div className="p-6 rounded-2xl bg-[#fd521a]/10 border border-[#fd521a]/20 mb-8">
                <div className="text-sm text-[#fd521a] font-bold uppercase tracking-widest mb-1">Le Gain Loop</div>
                <div className="text-2xl text-white font-bold">+ 250€ / mois</div>
                <div className="text-white/40 text-sm">par rapport aux autres sociétés de portage.</div>
              </div>
              <ul className="space-y-4 text-white/80 text-base">
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#fd521a]/10 border border-[#fd521a]/20 flex items-center justify-center text-[#fd521a]"><Check className="w-3 h-3" /></div> Récupération TVA incluse</li>
                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#fd521a]/10 border border-[#fd521a]/20 flex items-center justify-center text-[#fd521a]"><Check className="w-3 h-3" /></div> Salaire versé sous 48h</li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="liquid-glass p-10 rounded-[2.5rem] border border-white/5 relative">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] font-bold text-white/40 mb-3 block">Chiffre d&apos;Affaires Mensuel</label>
                    <div className="flex items-baseline gap-2">
                      <div className="text-6xl md:text-7xl font-medium tracking-tighter text-white">{ca}</div>
                      <div className="text-3xl text-white/30 font-light">€</div>
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min="3000"
                  max="10000"
                  step="500"
                  value={ca}
                  onChange={(e) => setCa(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer mb-16 focus:outline-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
                  <div>
                    <div className="text-sm font-medium text-white/50 mb-1">Frais Loop (10%) & Charges</div>
                    <div className="text-xl text-white/70 tracking-tight">- {charges} €</div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-sm text-[#fd521a] mb-1 font-bold uppercase tracking-wide">Net dans votre poche</div>
                    <div className="text-4xl font-bold text-white tracking-tighter">{net} €</div>
                    <div className="text-xs text-white/30 mt-1 font-medium">Incluant indemnités km</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-4">Questions Fréquentes</h2>
            <p className="text-white/50 text-lg">On répond à tout, en toute transparence.</p>
          </div>

          <div className="space-y-4">
            <details className="liquid-glass rounded-2xl p-6 group cursor-pointer transition-all duration-300 open:bg-white/[0.07]">
              <summary className="flex justify-between items-center font-medium text-lg list-none select-none">
                Est-ce que je perds mon indépendance ?
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:bg-[#fd521a] group-open:text-white transition-all">
                  <ChevronDown className="w-5 h-5 text-white/50 group-open:text-white group-open:rotate-180 transition-transform" />
                </div>
              </summary>
              <p className="text-white/60 mt-4 leading-relaxed text-base font-light">
                Absolument pas. Vous restez 100% maître de votre activité. Vous choisissez vos horaires, vos applications (Uber, Bolt...), vos courses et vos zones. Loop n&apos;est que votre &quot;boîte à outils&quot; administrative pour transformer votre CA en salaire et vous protéger.
              </p>
            </details>

            <details className="liquid-glass rounded-2xl p-6 group cursor-pointer transition-all duration-300 open:bg-white/[0.07]">
              <summary className="flex justify-between items-center font-medium text-lg list-none select-none">
                Pourquoi Loop est moins cher que Stairling ?
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:bg-[#fd521a] group-open:text-white transition-all">
                  <ChevronDown className="w-5 h-5 text-white/50 group-open:text-white group-open:rotate-180 transition-transform" />
                </div>
              </summary>
              <p className="text-white/60 mt-4 leading-relaxed text-base font-light">
                Nous avons automatisé 90% des processus grâce à notre technologie. Moins de coûts de gestion pour nous = moins de frais pour vous. Nous prenons 10% tout compris, contre environ 15% chez nos concurrents.
              </p>
            </details>

            <details className="liquid-glass rounded-2xl p-6 group cursor-pointer transition-all duration-300 open:bg-white/[0.07]">
              <summary className="flex justify-between items-center font-medium text-lg list-none select-none">
                Puis-je toucher le chômage avec Loop ?
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:bg-[#fd521a] group-open:text-white transition-all">
                  <ChevronDown className="w-5 h-5 text-white/50 group-open:text-white group-open:rotate-180 transition-transform" />
                </div>
              </summary>
              <p className="text-white/60 mt-4 leading-relaxed text-base font-light">
                Oui. En tant que salarié porté, vous cotisez à l&apos;assurance chômage chaque mois. En cas d&apos;arrêt d&apos;activité, vous avez droit aux allocations chômage (ARE), contrairement au statut d&apos;auto-entrepreneur ou de président de SASU.
              </p>
            </details>

            <details className="liquid-glass rounded-2xl p-6 group cursor-pointer transition-all duration-300 open:bg-white/[0.07]">
              <summary className="flex justify-between items-center font-medium text-lg list-none select-none">
                Comment récupérer la TVA sur mon essence ?
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:bg-[#fd521a] group-open:text-white transition-all">
                  <ChevronDown className="w-5 h-5 text-white/50 group-open:text-white group-open:rotate-180 transition-transform" />
                </div>
              </summary>
              <p className="text-white/60 mt-4 leading-relaxed text-base font-light">
                C&apos;est très simple. Vous prenez une photo de votre ticket de caisse via l&apos;application Loop. Nous traitons la note de frais et le montant de la TVA vous est reversé directement, augmentant ainsi votre net à payer.
              </p>
            </details>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 px-4 max-w-4xl mx-auto">
          <div className="liquid-glass rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden group">
            {/* Inner Glow Animation */}
            <div className="absolute inset-0 bg-[#fd521a]/5 blur-xl pointer-events-none group-hover:bg-[#fd521a]/10 transition-colors duration-700"></div>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#fd521a]/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
                Plus d&apos;argent.<br />Plus de sécurité.
              </h2>
              <p className="text-lg text-white/60 mb-10 max-w-xl font-light leading-relaxed">
                Rejoignez 1 000+ chauffeurs qui ont quitté le statut précaire d&apos;auto-entrepreneur pour la force du modèle Loop.
              </p>

              <button className="px-10 py-5 bg-[#fd521a] rounded-full text-white text-lg font-bold hover:scale-105 transition-transform shadow-[0_0_50px_rgba(253,82,26,0.3)] border border-white/10 flex items-center gap-3 group">
                Commencer l&apos;inscription
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="mt-8 text-xs text-white/30 uppercase tracking-widest font-medium">
                Sans engagement • Démarrage en 48h
              </p>
            </div>
          </div>
        </section>

        {/* Simplified Enterprise Footer */}
        <footer className="border-t border-white/10 mt-20 pt-12 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#fd521a] shadow-[0_0_10px_#fd521a]"></div>
              <span className="font-bold text-lg tracking-tight">LOOP</span>
              <span className="text-white/20 text-sm ml-4 font-medium">© 2025</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-white/40">
              <a href="#" className="hover:text-white transition-colors">Légal</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="mailto:hello@loop.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

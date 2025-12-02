"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Car,
  ArrowLeftRight,
  CreditCard,
  Unlock,
  ShieldCheck,
  Check,
  User,
  Fuel,
  ScanLine,
  Smartphone,
  X,
  Minus,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  const [ca, setCa] = useState(5000);
  const net = Math.round(ca * 0.76);
  const charges = ca - net;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(253, 82, 26, 0.03) 0%, transparent 50%)' }}>
      {/* Navigation */}
      <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <div className="liquid-glass px-3 pl-6 py-2 rounded-full flex items-center gap-8 max-w-3xl">
          <a href="#" className="font-bold text-lg tracking-tighter flex items-center gap-2 text-black" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
            LOOP
          </a>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#mission" className="hover:text-black transition-colors">Mission</a>
            <a href="#comparatif" className="hover:text-black transition-colors">Offre</a>
            <a href="#revenus" className="hover:text-black transition-colors">Gains</a>
            <a href="#app" className="hover:text-black transition-colors">App</a>
          </div>

          <button className="bg-[#111] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#fd521a] transition-colors shadow-lg tracking-wide">
            REJOINDRE
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 pt-32 md:pt-40 px-4 md:px-8 max-w-[1040px] mx-auto">
        
        {/* Hero Section */}
        <section className="min-h-[60vh] flex flex-col items-center text-center justify-center mb-24">
          
          <div className="mb-6 px-5 py-2 rounded-full bg-white/60 border border-white/50 shadow-sm text-[11px] font-bold tracking-[0.15em] uppercase text-[#fd521a] backdrop-blur-md animate-fade-in">
            La Première Coopérative VTC
          </div>
          
          <h1 className="heading-hero text-6xl md:text-7xl lg:text-[5.5rem] mb-6 text-[#111] tracking-tight">
            Indépendant.<br />
            <span className="text-gray-400/80">Protégé.</span>
          </h1>
          
          <p className="max-w-lg text-xl text-gray-600 leading-relaxed font-medium mb-10">
            Transformez votre activité VTC en <span className="text-[#111] font-bold">salaire</span> sans jamais avoir de patron.
            <span className="block mt-2 text-base text-gray-400">Le statut de salarié. La liberté de l&apos;indépendant.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-16">
            <button onClick={() => scrollTo("revenus")} className="w-full sm:w-auto px-8 py-4 btn-primary rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Simuler mes revenus
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <CheckCircle className="w-4 h-4 text-green-500" /> Démarrage 48h
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-[#111]">10%</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Frais seulement</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-[#111]">0</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Paperasse</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold text-[#111]">100%</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Liberté</span>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 mb-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-gray-500 max-w-lg mx-auto">On ne change rien à votre façon de travailler. On change juste ce que vous gagnez.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="liquid-card p-8 rounded-[2rem] relative group">
              <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 -z-10 group-hover:text-[#fd521a]/5 transition-colors">1</div>
              <div className="w-12 h-12 rounded-2xl bg-[#fd521a]/10 text-[#fd521a] flex items-center justify-center mb-6"><Car className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg mb-3">Vous roulez</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Uber, Bolt, Heetch... Gardez vos applis, vos clients, votre voiture. Vous restez le patron.</p>
            </div>
            
            <div className="liquid-card p-8 rounded-[2rem] relative group">
              <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 -z-10 group-hover:text-[#fd521a]/5 transition-colors">2</div>
              <div className="w-12 h-12 rounded-2xl bg-[#fd521a]/10 text-[#fd521a] flex items-center justify-center mb-6"><ArrowLeftRight className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg mb-3">On transforme</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Loop encaisse votre CA, déduit la TVA et les frais, et transforme le reste en salaire net.</p>
            </div>
            
            <div className="liquid-card p-8 rounded-[2rem] relative group">
              <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 -z-10 group-hover:text-[#fd521a]/5 transition-colors">3</div>
              <div className="w-12 h-12 rounded-2xl bg-[#fd521a]/10 text-[#fd521a] flex items-center justify-center mb-6"><CreditCard className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg mb-3">Vous encaissez</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Fiche de paie, cotisations chômage, retraite. Tout est payé. Vous recevez votre net.</p>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION */}
        <section id="mission" className="py-16">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7 liquid-card p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-6">
                  <Unlock className="w-3 h-3" /> Liberté Totale
                </div>
                <h3 className="text-3xl font-bold mb-4">Pas de patron.<br />Jamais.</h3>
                <p className="text-gray-500 max-w-sm">Contrairement aux &quot;startups&quot; qui veulent vous salarier, Loop est une coopérative. Vous êtes membre, pas employé.</p>
              </div>
              <div className="flex gap-4 mt-8">
                <div className="bg-white/50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 border border-white/60">Vos Horaires</div>
                <div className="bg-white/50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 border border-white/60">Vos Zones</div>
              </div>
            </div>

            <div className="md:col-span-5 liquid-card p-10 rounded-[2.5rem] bg-white/40">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-6">
                <ShieldCheck className="w-3 h-3" /> Sécurité
              </div>
              <h3 className="text-2xl font-bold mb-4">Le filet de sécurité du salarié.</h3>
              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                  Chômage & Retraite
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                  Mutuelle Santé
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                  Prévoyance Accident
                </li>
              </ul>
            </div>

            {/* THE DEAL CARD */}
            <div className="md:col-span-12 liquid-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden mt-4 border-[#fd521a]/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#fd521a]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-8 relative z-10">
                <div className="max-w-md">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#fd521a] bg-[#fd521a]/5 px-3 py-1 rounded-full inline-block mb-4">Le Pacte Loop</div>
                  <h3 className="text-3xl font-bold mb-2">90% pour vous.</h3>
                  <p className="text-gray-500">On prend le minimum pour faire tourner la boutique. Le reste est à vous. C&apos;est ça, une coopérative.</p>
                </div>

                <div className="w-full md:w-1/2 bg-white/50 p-6 rounded-3xl border border-white/60">
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>Votre Part</span>
                      <span className="text-green-600">90%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#111] w-[90%] rounded-r-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-[#fd521a]">Frais Loop</span>
                      <span className="text-[#fd521a]">10%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#fd521a] w-[10%] rounded-r-full"></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 text-right">*Contre 15-20% chez les concurrents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APP SHOWCASE */}
        <section id="app" className="py-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <div className="phone-frame-glass w-[300px] mx-auto h-[600px] relative overflow-hidden shadow-2xl border-4 border-white/20">
                <div className="absolute top-0 w-full h-24 bg-white/90 backdrop-blur-md z-20 border-b border-gray-100 flex flex-col justify-end p-5 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Dashboard</span>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><User className="w-4 h-4" /></div>
                  </div>
                </div>
                
                <div className="w-full h-full bg-[#F5F5F7] pt-28 px-4 overflow-y-auto no-scrollbar">
                  <div className="bg-[#111] text-white p-6 rounded-3xl shadow-lg mb-4">
                    <p className="text-[10px] font-bold uppercase opacity-60 mb-1">Net à payer</p>
                    <h3 className="text-3xl font-bold">3 420,50€</h3>
                    <div className="flex gap-2 mt-4">
                      <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold">Fiche de paie générée</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-4">
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Activité du mois</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-black text-white rounded-xl flex items-center justify-center text-xs font-bold">U</div>
                          <span className="text-xs font-bold">Uber</span>
                        </div>
                        <span className="text-xs font-bold">+ 2 100€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-xl flex items-center justify-center text-xs font-bold">B</div>
                          <span className="text-xs font-bold">Bolt</span>
                        </div>
                        <span className="text-xs font-bold">+ 1 400€</span>
                      </div>
                      <div className="w-full h-px bg-gray-100 my-2"></div>
                      <div className="flex justify-between items-center text-red-500">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xs"><Fuel className="w-4 h-4" /></div>
                          <span className="text-xs font-bold">Essence</span>
                        </div>
                        <span className="text-xs font-bold">- 320€</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 animate-float z-30">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check className="w-4 h-4" /></div>
                  <div>
                    <div className="text-[9px] font-bold uppercase text-gray-400">TVA Récupérée</div>
                    <div className="text-xs font-bold">+ 450€ sur ce mois</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6">Votre bureau,<br />c&apos;est votre téléphone.</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">Fini la paperasse le dimanche soir. Loop centralise toutes vos applis, récupère vos factures, et gère votre comptabilité.</p>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#fd521a]/10 text-[#fd521a] flex items-center justify-center shrink-0 mt-1"><ScanLine className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-base">Scanner de Frais</h4>
                    <p className="text-sm text-gray-500">Prenez votre essence en photo. On récupère la TVA. C&apos;est tout.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#fd521a]/10 text-[#fd521a] flex items-center justify-center shrink-0 mt-1"><Smartphone className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-base">Centralisation Auto</h4>
                    <p className="text-sm text-gray-500">Connectez vos comptes Uber/Bolt. On aspire le CA automatiquement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIMULATOR & COMPARISON */}
        <section id="revenus" className="py-20">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="liquid-card p-8 rounded-[2.5rem]">
              <h3 className="text-2xl font-bold mb-6">Simulateur</h3>
              <div className="mb-8">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">Votre CA Mensuel</label>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold tracking-tighter text-[#111]">{ca}</span>
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
                className="w-full mb-10 accent-[#fd521a]"
              />
              
              <div className="bg-white/60 rounded-2xl p-6 border border-white">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-[#fd521a] mb-1">Net dans votre poche</div>
                    <div className="text-4xl font-bold tracking-tight">{net} €</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Frais & Charges</div>
                    <div className="text-lg font-bold text-gray-500">{charges} €</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="liquid-card p-6 rounded-[2rem] flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                <div>
                  <h4 className="font-bold text-gray-500">Auto-Entrepreneur</h4>
                  <p className="text-xs text-red-400 font-bold mt-1">Précaire • Pas de chômage</p>
                </div>
                <X className="w-5 h-5 text-red-300" />
              </div>
              <div className="liquid-card p-6 rounded-[2rem] flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                <div>
                  <h4 className="font-bold text-gray-500">Les &quot;Startups&quot;</h4>
                  <p className="text-xs text-amber-500 font-bold mt-1">Cher • 15-20% com</p>
                </div>
                <Minus className="w-5 h-5 text-amber-400" />
              </div>
              <div className="bg-[#fd521a] text-white p-6 rounded-[2rem] flex items-center justify-between shadow-xl scale-105">
                <div>
                  <h4 className="font-bold text-white">LOOP</h4>
                  <p className="text-xs text-[#ff8a65] font-bold mt-1">10% • Protection Totale</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-[#fd521a] flex items-center justify-center"><Check className="w-4 h-4" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Questions Fréquentes</h2>
          <div className="space-y-3">
            <details className="liquid-card rounded-2xl p-5 group cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-sm list-none select-none">
                Est-ce un CDI ?
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">Non, vous restez indépendant. C&apos;est un statut hybride (Entrepreneur Salarié) qui combine le meilleur des deux mondes.</p>
            </details>
            <details className="liquid-card rounded-2xl p-5 group cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-sm list-none select-none">
                Engagement de durée ?
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">Aucun. Vous partez quand vous voulez. Liberté totale.</p>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center">
          <button className="px-10 py-4 bg-[#fd521a] rounded-full text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform">
            Devenir Membre Loop
          </button>
          <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest">Sans engagement • Démarrage 48h</p>
        </section>

        <footer className="py-10 border-t border-gray-200/50 text-center text-xs text-gray-400 font-medium">
          <p>© 2025 Coopérative Loop. Fait par des chauffeurs, pour des chauffeurs.</p>
        </footer>
      </main>
    </div>
  );
}

"use client";

import {
  TrendingDown,
  ShieldOff,
  FileX,
  Wallet,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Link,
  Banknote,
  Check,
  X,
  Target,
  TrendingUp,
  Users,
  Eye,
  Zap,
} from "lucide-react";

export default function DeckPage() {
  return (
    <div className="bg-black min-h-screen p-10">
      {/* SLIDE 1: COVER */}
      <Slide>
        <Glow className="top-[-200px] right-[-100px]" />
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#fd521a]/20 bg-[#fd521a]/5 text-[11px] font-bold tracking-[0.25em] uppercase text-[#fd521a] mb-8">
              Pitch Deck 2025
            </div>
            <h1 className="text-[7rem] font-semibold leading-[0.9] tracking-[-0.04em] mb-6">
              LOOP
            </h1>
            <p className="text-2xl text-white/50 font-light max-w-xl">
              L&apos;indépendance protégée pour les chauffeurs VTC
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fd521a] shadow-[0_0_30px_rgba(253,82,26,0.5)]"></div>
            <span className="text-white/30 text-sm font-medium">Coopérative d&apos;Activité et d&apos;Emploi</span>
          </div>
        </div>
      </Slide>

      {/* SLIDE 2: LE PROBLÈME */}
      <Slide>
        <Glow className="top-[-100px] left-[-200px]" />
        <SlideHeader num="01" title="Le Problème" />

        <div className="flex-1 grid grid-cols-2 gap-12">
          <div>
            <h3 className="text-6xl font-bold text-white mb-4 tracking-tight">71 000+</h3>
            <p className="text-xl text-white/50 mb-8">chauffeurs VTC en France, majoritairement en auto-entreprise</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Revenus instables</h4>
                  <p className="text-white/40 text-sm">Pas de filet de sécurité, revenus irréguliers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <ShieldOff className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Zéro protection</h4>
                  <p className="text-white/40 text-sm">Pas de chômage, pas de congés payés, maladie = 0€</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <FileX className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Paperasse complexe</h4>
                  <p className="text-white/40 text-sm">URSSAF, TVA, comptabilité à gérer seul</p>
                </div>
              </div>
            </div>
          </div>

          <Glass className="p-8 flex flex-col justify-center">
            <div className="text-center">
              <div className="text-red-400 text-sm font-bold uppercase tracking-widest mb-4">TVA perdue chaque année</div>
              <div className="text-6xl font-bold text-white mb-2">~3 000€</div>
              <p className="text-white/40">par chauffeur auto-entrepreneur</p>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center">
              <p className="text-white/50 text-lg italic">&quot;Des chauffeurs livrés à eux-mêmes face aux plateformes&quot;</p>
            </div>
          </Glass>
        </div>
      </Slide>

      {/* SLIDE 3: LA SOLUTION */}
      <Slide>
        <Glow className="bottom-[-200px] right-[-100px]" />
        <SlideHeader num="02" title="La Solution LOOP" />

        <div className="flex-1 flex items-center">
          <div className="grid grid-cols-2 gap-16 w-full">
            <div>
              <h3 className="text-5xl font-bold text-white leading-tight mb-6">
                La sécurité du CDI.<br />
                <span className="text-white/30">La liberté de l&apos;indépendant.</span>
              </h3>
              <p className="text-xl text-white/50 leading-relaxed mb-8">
                LOOP est une coopérative d&apos;activité et d&apos;emploi qui transforme votre CA en salaire protégé, tout en préservant votre autonomie totale.
              </p>
              <div className="inline-block px-6 py-3 bg-[#fd521a]/10 border border-[#fd521a]/20 rounded-full">
                <span className="text-[#fd521a] font-bold">Statut entrepreneur-salarié = 100% indépendant</span>
              </div>
            </div>

            <div className="space-y-4">
              <Glass className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#fd521a]/10 flex items-center justify-center">
                  <Wallet className="w-7 h-7 text-[#fd521a]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Jusqu&apos;à 83% de votre CA</h4>
                  <p className="text-white/40">Transformé en salaire net optimisé</p>
                </div>
              </Glass>
              <Glass className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#fd521a]/10 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-[#fd521a]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Protection complète</h4>
                  <p className="text-white/40">Chômage, retraite, mutuelle, prévoyance</p>
                </div>
              </Glass>
              <Glass className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#fd521a]/10 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-[#fd521a]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Zéro paperasse</h4>
                  <p className="text-white/40">URSSAF, TVA, comptabilité = on gère tout</p>
                </div>
              </Glass>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 4: COMMENT ÇA MARCHE */}
      <Slide>
        <Glow className="top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
        <SlideHeader num="03" title="Comment ça marche" />

        <div className="flex-1 flex items-center">
          <div className="grid grid-cols-3 gap-8 w-full">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#fd521a]/10 border border-[#fd521a]/20 flex items-center justify-center mb-6">
                <Smartphone className="w-10 h-10 text-[#fd521a]" />
              </div>
              <div className="text-[#fd521a] font-bold text-sm mb-3">ÉTAPE 1</div>
              <h3 className="text-2xl font-bold text-white mb-3">Inscrivez-vous</h3>
              <p className="text-white/50">Téléchargez l&apos;app, signez votre contrat en ligne. Démarrage en 48h.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#fd521a]/10 border border-[#fd521a]/20 flex items-center justify-center mb-6">
                <Link className="w-10 h-10 text-[#fd521a]" />
              </div>
              <div className="text-[#fd521a] font-bold text-sm mb-3">ÉTAPE 2</div>
              <h3 className="text-2xl font-bold text-white mb-3">Connectez vos apps</h3>
              <p className="text-white/50">Liez Uber, Bolt, Heetch. On récupère votre CA automatiquement.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#fd521a]/10 border border-[#fd521a]/20 flex items-center justify-center mb-6">
                <Banknote className="w-10 h-10 text-[#fd521a]" />
              </div>
              <div className="text-[#fd521a] font-bold text-sm mb-3">ÉTAPE 3</div>
              <h3 className="text-2xl font-bold text-white mb-3">Recevez votre salaire</h3>
              <p className="text-white/50">Salaire net + fiche de paie + cotisations. Versé sous 48h.</p>
            </div>
          </div>
        </div>

        <Glass className="p-6 flex items-center justify-center gap-8 mt-8">
          <span className="text-white/50">Compatible avec</span>
          <span className="text-xl font-bold text-white/80">UBER</span>
          <span className="text-xl font-bold text-white/80">BOLT</span>
          <span className="text-xl font-bold text-white/80">HEETCH</span>
          <span className="text-xl font-bold text-white/80">FREENOW</span>
        </Glass>
      </Slide>

      {/* SLIDE 5: SIMULATION REVENUS */}
      <Slide>
        <Glow className="top-[-100px] right-[-100px]" />
        <SlideHeader num="04" title="Simulation de revenus" />

        <div className="flex-1 grid grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-white/40 text-sm uppercase tracking-widest mb-2">Exemple pour</div>
            <div className="text-6xl font-bold text-white mb-2">4 000€</div>
            <div className="text-xl text-white/50 mb-8">de chiffre d&apos;affaires TTC / mois</div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60">Commission LOOP</span>
                <span className="text-white font-medium">10% (400€)</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60">TVA récupérée</span>
                <span className="text-green-400 font-medium">+316€</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60">Indemnités kilométriques</span>
                <span className="text-white font-medium">2 215€</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/60">Salaire net</span>
                <span className="text-white font-medium">784€</span>
              </div>
            </div>
          </div>

          <Glass className="p-10 bg-gradient-to-br from-[#fd521a]/10 to-transparent border-[#fd521a]/20">
            <div className="text-center">
              <div className="text-[#fd521a] text-sm font-bold uppercase tracking-widest mb-4">Total dans votre poche</div>
              <div className="text-8xl font-bold text-white mb-2">~3 000€</div>
              <div className="text-2xl text-white/50 mb-6">soit 83% de votre CA</div>

              <div className="inline-block px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="text-green-400 font-bold">Impôt 0% — Non imposable</span>
              </div>
            </div>
          </Glass>
        </div>
      </Slide>

      {/* SLIDE 6: COMPARATIF */}
      <Slide>
        <SlideHeader num="05" title="Comparatif des statuts" />

        <div className="flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 text-white/40 text-sm font-medium w-1/4"></th>
                <th className="py-4 text-center">
                  <div className="inline-block px-4 py-2 bg-[#fd521a]/10 border border-[#fd521a]/30 rounded-full">
                    <span className="text-[#fd521a] font-bold">LOOP</span>
                  </div>
                </th>
                <th className="py-4 text-white/40 text-sm font-medium text-center">Auto-Entreprise</th>
                <th className="py-4 text-white/40 text-sm font-medium text-center">SASU/EURL</th>
                <th className="py-4 text-white/40 text-sm font-medium text-center">Salariat classique</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                ["Liberté horaires", true, true, true, false],
                ["Chômage", true, false, false, true],
                ["Récupération TVA", true, false, true, false],
                ["Congés payés", true, false, false, true],
                ["Zéro paperasse", true, false, false, true],
                ["Accès crédit bancaire", true, "Difficile", "Difficile", true],
                ["Arrêts maladie indemnisés", true, "Faible", "Faible", true],
              ].map(([label, loop, auto, sasu, salariat], i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-4 text-white/80">{label}</td>
                  <td className="py-4 text-center">{loop === true ? <Check className="inline w-5 h-5 text-[#fd521a]" /> : <X className="inline w-5 h-5 text-white/20" />}</td>
                  <td className="py-4 text-center">{auto === true ? <Check className="inline w-5 h-5 text-white/30" /> : auto === false ? <X className="inline w-5 h-5 text-white/20" /> : <span className="text-white/30 text-xs">{auto}</span>}</td>
                  <td className="py-4 text-center">{sasu === true ? <Check className="inline w-5 h-5 text-white/30" /> : sasu === false ? <X className="inline w-5 h-5 text-white/20" /> : <span className="text-white/30 text-xs">{sasu}</span>}</td>
                  <td className="py-4 text-center">{salariat === true ? <Check className="inline w-5 h-5 text-white/30" /> : <X className="inline w-5 h-5 text-white/20" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Slide>

      {/* SLIDE 7: LE MARCHÉ */}
      <Slide>
        <Glow className="bottom-[-200px] left-[-100px]" />
        <SlideHeader num="06" title="Le Marché" />

        <div className="flex-1 grid grid-cols-3 gap-8">
          <Glass className="p-8 text-center flex flex-col justify-center">
            <div className="text-6xl font-bold text-white mb-2">71 000+</div>
            <div className="text-[#fd521a] font-bold uppercase tracking-widest text-sm mb-4">Chauffeurs VTC</div>
            <p className="text-white/40">actifs en France en 2024</p>
          </Glass>

          <Glass className="p-8 text-center flex flex-col justify-center bg-gradient-to-b from-[#fd521a]/5 to-transparent border-[#fd521a]/20">
            <div className="text-6xl font-bold text-white mb-2">≈4 Mds€</div>
            <div className="text-[#fd521a] font-bold uppercase tracking-widest text-sm mb-4">Marché VTC France</div>
            <p className="text-white/40">en croissance continue</p>
          </Glass>

          <Glass className="p-8 text-center flex flex-col justify-center">
            <div className="text-6xl font-bold text-white mb-2">81%</div>
            <div className="text-[#fd521a] font-bold uppercase tracking-widest text-sm mb-4">Île-de-France</div>
            <p className="text-white/40">concentration de l&apos;activité</p>
          </Glass>
        </div>

        <Glass className="p-6 mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-[#fd521a]" />
            <span className="text-white font-medium">Cible initiale : Île-de-France</span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="text-white/60">Marché en forte croissance depuis 2015</span>
          </div>
        </Glass>
      </Slide>

      {/* SLIDE 8: NOS VALEURS */}
      <Slide>
        <Glow className="top-[50%] right-[-200px]" />
        <SlideHeader num="07" title="Nos Valeurs" />

        <div className="flex-1 grid grid-cols-3 gap-8">
          <Glass className="p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#fd521a]/10 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-[#fd521a]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Solidarité</h3>
            <p className="text-white/50 leading-relaxed">
              Chaque chauffeur est membre de la coopérative. Nous mutualisons les moyens pour offrir plus de sécurité et de soutien.
            </p>
          </Glass>

          <Glass className="p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#fd521a]/10 flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-[#fd521a]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Transparence</h3>
            <p className="text-white/50 leading-relaxed">
              Aucun coût caché, des règles claires. Chaque euro est expliqué, chaque décision prise dans l&apos;intérêt des chauffeurs.
            </p>
          </Glass>

          <Glass className="p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#fd521a]/10 flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-[#fd521a]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Autonomie</h3>
            <p className="text-white/50 leading-relaxed">
              Liberté de choisir ses plateformes, horaires et rythme. LOOP donne le cadre, le chauffeur reste acteur de son activité.
            </p>
          </Glass>
        </div>
      </Slide>

      {/* SLIDE 9: L'ÉQUIPE */}
      <Slide>
        <Glow className="top-[-100px] left-[50%] -translate-x-1/2" />
        <SlideHeader num="08" title="L'Équipe" />

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-24">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
                <span className="text-5xl font-bold text-white/20">AE</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Adil Essakaki</h3>
              <div className="w-12 h-1 bg-[#fd521a] mx-auto rounded-full mb-4"></div>
              <p className="text-white/40">Co-fondateur</p>
            </div>

            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
                <span className="text-5xl font-bold text-white/20">IB</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Ilyes Bouguellab</h3>
              <div className="w-12 h-1 bg-[#fd521a] mx-auto rounded-full mb-4"></div>
              <p className="text-white/40">Co-fondateur</p>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 10: CLOSING */}
      <Slide>
        <Glow className="top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 !w-[800px] !h-[800px]" />
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#fd521a] shadow-[0_0_60px_rgba(253,82,26,0.5)] mb-8"></div>
            <h2 className="text-7xl font-bold text-white mb-4 tracking-tight">LOOP</h2>
            <p className="text-2xl text-white/50 mb-12">L&apos;indépendance protégée</p>
          </div>

          <Glass className="px-12 py-8 inline-block">
            <div className="text-white/40 text-sm uppercase tracking-widest mb-2">Contact</div>
            <div className="text-2xl text-white font-medium">hello@loop-vtc.fr</div>
          </Glass>

          <div className="mt-12 text-white/20 text-sm">
            2025 — Pitch Deck
          </div>
        </div>
      </Slide>
    </div>
  );
}

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[1280px] h-[720px] bg-black relative overflow-hidden mx-auto mb-10 border border-white/10 rounded-2xl">
      <div className="p-[60px_80px] h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}

function SlideHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-[#fd521a] font-bold text-sm">{num}</span>
      <h2 className="text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function Glow({ className }: { className?: string }) {
  return (
    <div
      className={`absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(253,82,26,0.15)_0%,transparent_70%)] blur-[80px] pointer-events-none ${className}`}
    />
  );
}

function Glass({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/[0.03] border border-white/[0.08] rounded-3xl ${className}`}>
      {children}
    </div>
  );
}

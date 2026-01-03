import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, FileText, Car, ArrowRight, Check, Lock } from "lucide-react";
import { PageLayout } from "~/components/layout";

export const Route = createFileRoute("/inscription")({
  component: InscriptionPage,
  head: () => ({
    meta: [
      { title: "Rejoindre Driivo | Candidature" },
      { name: "description", content: "Rejoignez Driivo en 3 étapes simples et devenez entrepreneur salarié VTC." },
    ],
  }),
});

function InscriptionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    ville: "",
    carteVtc: "",
    numeroCarteVtc: "",
    experience: "",
    vehicule: "",
    vehiculeModele: "",
    plateformes: [] as string[],
    caMensuel: "",
  });

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePlateforme = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      plateformes: prev.plateformes.includes(platform)
        ? prev.plateformes.filter((p) => p !== platform)
        : [...prev.plateformes, platform],
    }));
  };

  const nextStep = (step: number) => {
    setCurrentStep(step);
  };

  const prevStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map form fields to API expected fields
      const apiData = {
        firstName: formData.prenom,
        lastName: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        activityType: "VTC",
        hasVtcLicense: formData.carteVtc,
        yearsExperience: formData.experience,
        currentPlatforms: formData.plateformes,
        hasVehicle: formData.vehicule ? "yes" : "no",
        vehicleType: formData.vehiculeModele,
        monthlyRevenue: formData.caMensuel,
      };
      
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });
      // Use window.location for clean navigation to avoid hydration issues
      window.location.href = "/inscription/confirmation";
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout showNavLinks={false}>
      {/* Main Content */}
      <main className="mx-auto max-w-[600px] px-4 pb-20 pt-32 md:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Rejoindre Driivo
          </h1>
          <p className="text-gray-500">3 étapes simples. Moins de 5 minutes.</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10 flex items-center justify-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
              currentStep >= 1
                ? currentStep > 1
                  ? "bg-green-500 text-white"
                  : "bg-[#fd521a] text-white"
                : "bg-gray-200"
            }`}
          >
            {currentStep > 1 ? <Check className="h-5 w-5" /> : "1"}
          </div>
          <div className="h-1 w-12 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-[#fd521a] transition-all duration-300"
              style={{ width: currentStep > 1 ? "100%" : "0%" }}
            ></div>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
              currentStep >= 2
                ? currentStep > 2
                  ? "bg-green-500 text-white"
                  : "bg-[#fd521a] text-white"
                : "bg-gray-200"
            }`}
          >
            {currentStep > 2 ? <Check className="h-5 w-5" /> : "2"}
          </div>
          <div className="h-1 w-12 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-[#fd521a] transition-all duration-300"
              style={{ width: currentStep > 2 ? "100%" : "0%" }}
            ></div>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
              currentStep >= 3 ? "bg-[#fd521a] text-white" : "bg-gray-200"
            }`}
          >
            3
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 p-8 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold">Vos informations</h2>
                    <p className="text-xs text-gray-400">Dites-nous qui vous êtes</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jean"
                        value={formData.prenom}
                        onChange={(e) => updateField("prenom", e.target.value)}
                        className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dupont"
                        value={formData.nom}
                        onChange={(e) => updateField("nom", e.target.value)}
                        className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jean@example.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="06 12 34 56 78"
                      value={formData.telephone}
                      onChange={(e) => updateField("telephone", e.target.value)}
                      className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Ville *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Paris"
                      value={formData.ville}
                      onChange={(e) => updateField("ville", e.target.value)}
                      className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => nextStep(2)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]"
                >
                  Continuer
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Step 2: Documents */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold">Vos documents</h2>
                    <p className="text-xs text-gray-400">Confirmez votre éligibilité</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Avez-vous une carte VTC ? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all hover:border-[#fd521a] ${
                          formData.carteVtc === "oui"
                            ? "border-[#fd521a] bg-[#fd521a]/5"
                            : "border-black/8 bg-white/90"
                        }`}
                      >
                        <input
                          type="radio"
                          name="carteVtc"
                          value="oui"
                          checked={formData.carteVtc === "oui"}
                          onChange={(e) => updateField("carteVtc", e.target.value)}
                          className="accent-[#fd521a]"
                        />
                        <span>Oui</span>
                      </label>
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all hover:border-[#fd521a] ${
                          formData.carteVtc === "non"
                            ? "border-[#fd521a] bg-[#fd521a]/5"
                            : "border-black/8 bg-white/90"
                        }`}
                      >
                        <input
                          type="radio"
                          name="carteVtc"
                          value="non"
                          checked={formData.carteVtc === "non"}
                          onChange={(e) => updateField("carteVtc", e.target.value)}
                          className="accent-[#fd521a]"
                        />
                        <span>Non (en cours)</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Numéro de carte VTC
                    </label>
                    <input
                      type="text"
                      placeholder="VTC-XXXXXXXX"
                      value={formData.numeroCarteVtc}
                      onChange={(e) => updateField("numeroCarteVtc", e.target.value)}
                      className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                    />
                    <p className="mt-1 text-[10px] text-gray-400">
                      Optionnel pour le moment
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Depuis combien de temps roulez-vous ? *
                    </label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => updateField("experience", e.target.value)}
                      className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="moins_1an">Moins d&apos;1 an</option>
                      <option value="1_3ans">1 à 3 ans</option>
                      <option value="3_5ans">3 à 5 ans</option>
                      <option value="plus_5ans">Plus de 5 ans</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => prevStep(1)}
                    className="flex-1 rounded-xl border border-gray-200 bg-white py-4 text-base font-bold transition-colors hover:bg-gray-50"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => nextStep(3)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]"
                  >
                    Continuer
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Vehicle */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fd521a]/10 text-[#fd521a]">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold">Votre véhicule</h2>
                    <p className="text-xs text-gray-400">Décrivez votre outil de travail</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Avez-vous un véhicule ? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all hover:border-[#fd521a] ${
                          formData.vehicule === "oui"
                            ? "border-[#fd521a] bg-[#fd521a]/5"
                            : "border-black/8 bg-white/90"
                        }`}
                      >
                        <input
                          type="radio"
                          name="vehicule"
                          value="oui"
                          checked={formData.vehicule === "oui"}
                          onChange={(e) => updateField("vehicule", e.target.value)}
                          className="accent-[#fd521a]"
                        />
                        <span>Oui</span>
                      </label>
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all hover:border-[#fd521a] ${
                          formData.vehicule === "besoin"
                            ? "border-[#fd521a] bg-[#fd521a]/5"
                            : "border-black/8 bg-white/90"
                        }`}
                      >
                        <input
                          type="radio"
                          name="vehicule"
                          value="besoin"
                          checked={formData.vehicule === "besoin"}
                          onChange={(e) => updateField("vehicule", e.target.value)}
                          className="accent-[#fd521a]"
                        />
                        <span>J&apos;en ai besoin</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Marque et modèle
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Tesla Model 3"
                      value={formData.vehiculeModele}
                      onChange={(e) => updateField("vehiculeModele", e.target.value)}
                      className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Sur quelles plateformes roulez-vous ? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["uber", "bolt", "heetch", "freenow"].map((platform) => (
                        <label
                          key={platform}
                          className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all hover:border-[#fd521a] ${
                            formData.plateformes.includes(platform)
                              ? "border-[#fd521a] bg-[#fd521a]/5"
                              : "border-black/8 bg-white/90"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.plateformes.includes(platform)}
                            onChange={() => togglePlateforme(platform)}
                            className="accent-[#fd521a]"
                          />
                          <span className="capitalize">{platform}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Chiffre d&apos;affaires mensuel moyen
                    </label>
                    <select
                      value={formData.caMensuel}
                      onChange={(e) => updateField("caMensuel", e.target.value)}
                      className="w-full rounded-xl border border-black/8 bg-white/90 px-4 py-3 text-sm transition-all focus:border-[#fd521a] focus:outline-none focus:ring-[3px] focus:ring-[#fd521a]/10"
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="moins_3000">Moins de 3 000 €</option>
                      <option value="3000_5000">3 000 € - 5 000 €</option>
                      <option value="5000_7000">5 000 € - 7 000 €</option>
                      <option value="7000_10000">7 000 € - 10 000 €</option>
                      <option value="plus_10000">Plus de 10 000 €</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => prevStep(2)}
                    className="flex-1 rounded-xl border border-gray-200 bg-white py-4 text-base font-bold transition-colors hover:bg-gray-50"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#fd521a] py-4 text-base font-bold text-white shadow-[0_8px_20px_-4px_rgba(253,82,26,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#e0410e] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Envoi..." : "Envoyer ma candidature"}
                    <Check className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Trust Element */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Lock className="h-4 w-4" />
            <span>Vos données sont sécurisées et ne seront jamais partagées.</span>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}

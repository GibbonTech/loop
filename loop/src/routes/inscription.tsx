import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Car, Users, User, Briefcase, Truck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/inscription")({
  component: InscriptionPage,
});

interface FormData {
  activityType: string;
  isAlone: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hasVtcLicense: string;
  yearsExperience: string;
  currentPlatforms: string[];
  hasVehicle: string;
  vehicleType: string;
  monthlyRevenue: string;
  expectedStartDate: string;
}

const TOTAL_STEPS = 6;

const activityOptions = [
  { id: "vtc", label: "Chauffeur VTC", icon: Car },
  { id: "livraison", label: "Livraison", icon: Truck },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "commerce", label: "Commerce", icon: ShoppingBag },
];

function InscriptionPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    activityType: "",
    isAlone: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hasVtcLicense: "",
    yearsExperience: "",
    currentPlatforms: [],
    hasVehicle: "",
    vehicleType: "",
    monthlyRevenue: "",
    expectedStartDate: "",
  });

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Candidature envoyée avec succès !");
        navigate({ to: "/inscription/confirmation" });
      } else {
        toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      toast.error("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.activityType !== "";
      case 2:
        return formData.isAlone !== "";
      case 3:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 4:
        return formData.hasVtcLicense !== "" && formData.yearsExperience !== "";
      case 5:
        return formData.hasVehicle !== "";
      case 6:
        return formData.monthlyRevenue !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f0]">
      {/* Header */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tighter">
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a]"></div>
            DRIIVO
          </Link>
          <div className="text-sm text-gray-500">
            Étape {currentStep} sur {TOTAL_STEPS}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-100">
          <div
            className="h-full bg-[#fd521a] transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 pb-32 pt-28">
        {/* Step 1: Activity Type */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <h1 className="mb-2 text-3xl font-bold">Quel est votre domaine d'activité ?</h1>
            <p className="mb-8 text-gray-500">Sélectionnez votre activité principale</p>
            <div className="grid grid-cols-2 gap-4">
              {activityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateField("activityType", option.id)}
                  className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all ${
                    formData.activityType === option.id
                      ? "border-[#fd521a] bg-[#fd521a]/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <option.icon
                    className={`h-8 w-8 ${
                      formData.activityType === option.id ? "text-[#fd521a]" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">{option.label}</span>
                  {formData.activityType === option.id && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fd521a] text-white">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Solo or Team */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h1 className="mb-2 text-3xl font-bold">Vous lancez votre activité :</h1>
            <p className="mb-8 text-gray-500">Seul ou à plusieurs ?</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => updateField("isAlone", "seul")}
                className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-8 transition-all ${
                  formData.isAlone === "seul"
                    ? "border-[#fd521a] bg-[#fd521a]/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <User className={`h-12 w-12 ${formData.isAlone === "seul" ? "text-[#fd521a]" : "text-gray-400"}`} />
                <span className="text-lg font-medium">Seul</span>
              </button>
              <button
                onClick={() => updateField("isAlone", "plusieurs")}
                className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-8 transition-all ${
                  formData.isAlone === "plusieurs"
                    ? "border-[#fd521a] bg-[#fd521a]/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <Users className={`h-12 w-12 ${formData.isAlone === "plusieurs" ? "text-[#fd521a]" : "text-gray-400"}`} />
                <span className="text-lg font-medium">À plusieurs</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Personal Info */}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h1 className="mb-2 text-3xl font-bold">Vos informations</h1>
            <p className="mb-8 text-gray-500">Pour vous contacter et créer votre dossier</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                    placeholder="Dupont"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                  placeholder="jean.dupont@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Experience */}
        {currentStep === 4 && (
          <div className="animate-fade-in">
            <h1 className="mb-2 text-3xl font-bold">Votre expérience</h1>
            <p className="mb-8 text-gray-500">Parlez-nous de votre parcours</p>
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">Avez-vous la carte VTC ?</label>
                <div className="flex gap-4">
                  {["Oui", "Non", "En cours"].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField("hasVtcLicense", option.toLowerCase())}
                      className={`flex-1 rounded-xl border-2 px-4 py-3 font-medium transition-all ${
                        formData.hasVtcLicense === option.toLowerCase()
                          ? "border-[#fd521a] bg-[#fd521a]/5 text-[#fd521a]"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">Années d'expérience VTC</label>
                <div className="flex gap-4">
                  {["0-1 an", "1-3 ans", "3+ ans"].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField("yearsExperience", option)}
                      className={`flex-1 rounded-xl border-2 px-4 py-3 font-medium transition-all ${
                        formData.yearsExperience === option
                          ? "border-[#fd521a] bg-[#fd521a]/5 text-[#fd521a]"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Vehicle */}
        {currentStep === 5 && (
          <div className="animate-fade-in">
            <h1 className="mb-2 text-3xl font-bold">Votre véhicule</h1>
            <p className="mb-8 text-gray-500">Informations sur votre véhicule</p>
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">Avez-vous un véhicule ?</label>
                <div className="flex gap-4">
                  {["Oui", "Non", "En location"].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField("hasVehicle", option.toLowerCase())}
                      className={`flex-1 rounded-xl border-2 px-4 py-3 font-medium transition-all ${
                        formData.hasVehicle === option.toLowerCase()
                          ? "border-[#fd521a] bg-[#fd521a]/5 text-[#fd521a]"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {formData.hasVehicle === "oui" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Type de véhicule</label>
                  <input
                    type="text"
                    value={formData.vehicleType}
                    onChange={(e) => updateField("vehicleType", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                    placeholder="Ex: Tesla Model 3, Mercedes Classe E..."
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 6: Revenue */}
        {currentStep === 6 && (
          <div className="animate-fade-in">
            <h1 className="mb-2 text-3xl font-bold">Vos objectifs</h1>
            <p className="mb-8 text-gray-500">Pour mieux vous accompagner</p>
            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">CA mensuel visé</label>
                <div className="grid grid-cols-2 gap-4">
                  {["3000-4000€", "4000-5000€", "5000-7000€", "7000€+"].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField("monthlyRevenue", option)}
                      className={`rounded-xl border-2 px-4 py-3 font-medium transition-all ${
                        formData.monthlyRevenue === option
                          ? "border-[#fd521a] bg-[#fd521a]/5 text-[#fd521a]"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Quand souhaitez-vous démarrer ?</label>
                <input
                  type="text"
                  value={formData.expectedStartDate}
                  onChange={(e) => updateField("expectedStartDate", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                  placeholder="Ex: Dès que possible, Dans 1 mois..."
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-200/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-2xl items-center justify-between px-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all ${
              currentStep === 1
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            Retour
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center gap-2 rounded-full px-8 py-3 font-bold transition-all ${
                canProceed()
                  ? "bg-[#fd521a] text-white shadow-lg hover:shadow-xl"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
            >
              Continuer
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={`flex items-center gap-2 rounded-full px-8 py-3 font-bold transition-all ${
                canProceed() && !isSubmitting
                  ? "bg-[#fd521a] text-white shadow-lg hover:shadow-xl"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
            >
              {isSubmitting ? "Envoi..." : "Envoyer ma candidature"}
              <Check className="h-5 w-5" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

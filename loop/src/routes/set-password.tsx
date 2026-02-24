import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resetPassword } from "~/lib/auth/auth-client";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/set-password")({
  component: SetPasswordPage,
  validateSearch: (search: Record<string, unknown>) => ({
    token: (search.token as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Créer votre mot de passe - Driivo" },
    ],
  }),
});

function SetPasswordPage() {
  const { token } = Route.useSearch();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const isValid = password.length >= 8 && password === confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !token) return;

    setIsLoading(true);
    try {
      const result = await resetPassword({
        newPassword: password,
        token,
      });

      if (result.error) {
        toast.error(result.error.message || "Lien expiré ou invalide. Contactez-nous.");
      } else {
        setDone(true);
        toast.success("Mot de passe créé !");
      }
    } catch {
      toast.error("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f2f0]">
        <div className="max-w-sm text-center">
          <h1 className="mb-2 text-xl font-bold">Lien invalide</h1>
          <p className="mb-6 text-sm text-gray-500">
            Ce lien ne contient pas de jeton valide. Vérifiez votre email ou contactez-nous.
          </p>
          <a
            href="https://driivo.fr"
            className="text-sm font-medium text-[#fd521a] hover:underline"
          >
            Retour au site
          </a>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f2f0]">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <Check className="h-7 w-7 text-green-600" />
          </div>
          <h1 className="mb-2 text-xl font-bold">C&apos;est bon !</h1>
          <p className="mb-6 text-sm text-gray-500">
            Votre mot de passe a été créé. Connectez-vous pour accéder à votre espace.
          </p>
          <a
            href="https://app.driivo.fr"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f0] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a href="https://driivo.fr" className="mb-6 inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
            <div className="h-2 w-2 rounded-full bg-[#fd521a]"></div>
            Driivo
          </a>
          <h1 className="mb-1 text-xl font-semibold text-gray-900">
            Créez votre mot de passe
          </h1>
          <p className="text-sm text-gray-500">
            Choisissez un mot de passe pour accéder à votre espace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 caractères"
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Confirmer
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Retapez le mot de passe"
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              required
            />
            {confirm.length > 0 && password !== confirm && (
              <p className="mt-1 text-xs text-red-500">Les mots de passe ne correspondent pas</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="h-10 w-full rounded-md bg-gray-900 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Création..." : "Créer mon mot de passe"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <Lock className="h-3 w-3" />
          <span>Connexion sécurisée</span>
        </div>
      </div>
    </div>
  );
}

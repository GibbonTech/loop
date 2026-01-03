import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { signIn, useSession } from "~/lib/auth/auth-client";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Connexion | Driivo" },
      { name: "description", content: "Connectez-vous à votre espace Driivo." },
    ],
  }),
});

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
        // Check user role and redirect accordingly
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

  // If already logged in, redirect based on role
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
      {/* Header */}
      <header className="px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#fd521a]">
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fd521a]">
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </div>
            </Link>
            <h1 className="text-2xl font-bold">Connexion</h1>
            <p className="mt-2 text-gray-500">Accédez à votre espace Driivo</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#fd521a] py-3 font-bold text-white transition-all hover:bg-[#e0410e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Pas encore inscrit ?{" "}
              <Link to="/inscription" className="font-medium text-[#fd521a] hover:underline">
                Rejoindre Driivo
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

import { Link } from "@tanstack/react-router";

interface NavbarProps {
  showNavLinks?: boolean;
  variant?: "default" | "minimal";
}

export function Navbar({ showNavLinks = true, variant = "default" }: NavbarProps) {
  return (
    <nav className="fixed left-0 top-6 z-50 flex w-full justify-center px-4">
      <div className="flex max-w-3xl items-center gap-8 rounded-full border border-white/40 bg-white/60 px-3 py-2 pl-6 shadow-[0_8px_32px_-4px_rgba(168,162,158,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
          DRIIVO
        </Link>

        {showNavLinks && variant === "default" && (
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            <a href="/#probleme" className="transition-colors hover:text-black">
              Le Problème
            </a>
            <a href="/#solution" className="transition-colors hover:text-black">
              La Solution
            </a>
            <Link to="/simulateur" className="transition-colors hover:text-black">
              Simulateur
            </Link>
            <a href="/#faq" className="transition-colors hover:text-black">
              FAQ
            </a>
          </div>
        )}

        {showNavLinks && variant === "minimal" && (
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            <Link to="/" className="transition-colors hover:text-black">
              Accueil
            </Link>
            <a href="https://app.driivo.fr/inscription" className="transition-colors hover:text-black">
              Rejoindre
            </a>
          </div>
        )}

        <div className="flex items-center gap-3">
          <a
            href="https://app.driivo.fr"
            className="hidden text-xs font-medium text-gray-600 transition-colors hover:text-[#fd521a] md:block"
          >
            Connexion
          </a>
          <a
            href="https://app.driivo.fr/inscription"
            className="rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#fd521a] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)]"
          >
            REJOINDRE
          </a>
        </div>
      </div>
    </nav>
  );
}

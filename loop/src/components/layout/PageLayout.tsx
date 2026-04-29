import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Navbar } from "./Navbar";

interface PageLayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  navbarVariant?: "default" | "minimal";
  showNavLinks?: boolean;
  withGradient?: boolean;
}

const whatsappContactUrl =
  import.meta.env.VITE_WHATSAPP_URL ||
  "https://wa.me/?text=Bonjour%20Driivo%2C%20je%20souhaite%20avoir%20des%20informations%20sur%20le%20statut%20entrepreneur%20salari%C3%A9%20VTC.";

export function PageLayout({
  children,
  showNavbar = true,
  navbarVariant = "default",
  showNavLinks = true,
  withGradient = false,
}: PageLayoutProps) {
  return (
    <div
      className="min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white"
      style={
        withGradient
          ? {
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(253, 82, 26, 0.03) 0%, transparent 50%)",
            }
          : undefined
      }
    >
      {showNavbar && <Navbar variant={navbarVariant} showNavLinks={showNavLinks} />}
      {children}
      <a
        href={whatsappContactUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter Driivo sur WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}

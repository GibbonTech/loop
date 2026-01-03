import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface PageLayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  navbarVariant?: "default" | "minimal";
  showNavLinks?: boolean;
  withGradient?: boolean;
}

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
    </div>
  );
}

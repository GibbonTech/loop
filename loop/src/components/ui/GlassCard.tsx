import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "light" | "prominent";
  padding?: "sm" | "md" | "lg";
}

const variantStyles = {
  default:
    "border border-white/50 bg-gradient-to-br from-white/70 to-[#fafaf9]/50 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15),inset_0_1px_0_0_rgba(255,255,255,0.8)] backdrop-blur-3xl",
  light:
    "border border-white/50 bg-gradient-to-br from-white/80 to-[#fafaf9]/60 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl",
  prominent:
    "border border-white/50 bg-white/40 shadow-[0_20px_40px_-12px_rgba(168,162,158,0.15)] backdrop-blur-3xl",
};

const paddingStyles = {
  sm: "p-6",
  md: "p-8 md:p-10",
  lg: "p-8 md:p-12",
};

export function GlassCard({
  children,
  className,
  variant = "default",
  padding = "md",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-[2.5rem]",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

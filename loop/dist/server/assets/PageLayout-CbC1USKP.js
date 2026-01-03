import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function Navbar({ showNavLinks = true, variant = "default" }) {
  return /* @__PURE__ */ jsx("nav", { className: "fixed left-0 top-6 z-50 flex w-full justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex max-w-3xl items-center gap-8 rounded-full border border-white/40 bg-white/60 px-3 py-2 pl-6 shadow-[0_8px_32px_-4px_rgba(168,162,158,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-2xl", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        className: "flex items-center gap-2 text-lg font-bold tracking-tighter text-black",
        children: [
          /* @__PURE__ */ jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]" }),
          "DRIIVO"
        ]
      }
    ),
    showNavLinks && variant === "default" && /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex", children: [
      /* @__PURE__ */ jsx("a", { href: "/#probleme", className: "transition-colors hover:text-black", children: "Le Problème" }),
      /* @__PURE__ */ jsx("a", { href: "/#solution", className: "transition-colors hover:text-black", children: "La Solution" }),
      /* @__PURE__ */ jsx(Link, { to: "/simulateur", className: "transition-colors hover:text-black", children: "Simulateur" }),
      /* @__PURE__ */ jsx("a", { href: "/#faq", className: "transition-colors hover:text-black", children: "FAQ" })
    ] }),
    showNavLinks && variant === "minimal" && /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "transition-colors hover:text-black", children: "Accueil" }),
      /* @__PURE__ */ jsx("a", { href: "https://app.driivo.fr/inscription", className: "transition-colors hover:text-black", children: "Rejoindre" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://app.driivo.fr",
          className: "hidden text-xs font-medium text-gray-600 transition-colors hover:text-[#fd521a] md:block",
          children: "Connexion"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://app.driivo.fr/inscription",
          className: "rounded-full bg-[#111] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#fd521a] hover:shadow-[0_12px_28px_-4px_rgba(253,82,26,0.4)]",
          children: "REJOINDRE"
        }
      )
    ] })
  ] }) });
}
function PageLayout({
  children,
  showNavbar = true,
  navbarVariant = "default",
  showNavLinks = true,
  withGradient = false
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "min-h-screen bg-[#f2f2f0] text-[#1c1917] selection:bg-[#fd521a] selection:text-white",
      style: withGradient ? {
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(253, 82, 26, 0.03) 0%, transparent 50%)"
      } : void 0,
      children: [
        showNavbar && /* @__PURE__ */ jsx(Navbar, { variant: navbarVariant, showNavLinks }),
        children
      ]
    }
  );
}
export {
  PageLayout as P
};

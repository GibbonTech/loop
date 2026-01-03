import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { s as signIn } from "./auth-client-BXQiDUS6.js";
import { toast } from "sonner";
import "./router-Ba_068gO.js";
import "drizzle-orm/postgres-js";
import "postgres";
import "@t3-oss/env-core";
import "zod";
import "drizzle-orm";
import "drizzle-orm/pg-core";
import "nanoid";
import "@tanstack/router-core/ssr/client";
import "@better-auth/core/env";
import "@better-auth/core/error";
import "@better-auth/core/db/adapter";
import "@better-auth/core/context";
import "@better-auth/utils/random";
import "@better-auth/utils/hex";
import "@better-auth/utils";
import "@better-auth/utils/hash";
import "better-call";
import "@better-auth/core/utils";
import "@better-auth/core/api";
import "@better-auth/core/db";
import "kysely";
import "@noble/hashes/hkdf.js";
import "@noble/hashes/sha2.js";
import "jose";
import "@better-auth/utils/base64";
import "@better-auth/utils/binary";
import "@better-auth/utils/hmac";
import "@noble/ciphers/chacha.js";
import "@noble/ciphers/utils.js";
import "@better-auth/core/social-providers";
import "jose/errors";
import "defu";
import "@noble/hashes/scrypt.js";
import "@noble/hashes/utils.js";
import "@better-auth/telemetry";
import "@better-auth/core";
import "@better-auth/core/oauth2";
import "@better-fetch/fetch";
import "@better-auth/utils/otp";
import "bcrypt";
import "nanostores";
function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn.email({
        email,
        password
      });
      if (result.error) {
        toast.error(result.error.message || "Identifiants incorrects");
      } else {
        toast.success("Connexion réussie");
        navigate({
          to: "/admin"
        });
      }
    } catch {
      toast.error("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#f2f2f0] px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fd521a]", children: /* @__PURE__ */ jsx("div", { className: "h-3 w-3 rounded-full bg-white" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "LOOP Admin" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-500", children: "Connectez-vous pour accéder au tableau de bord" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "rounded-2xl border border-gray-200 bg-white p-8 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "mb-2 block text-sm font-medium text-gray-700", children: "Email" }),
        /* @__PURE__ */ jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20", placeholder: "admin@loop.fr", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "mb-2 block text-sm font-medium text-gray-700", children: "Mot de passe" }),
        /* @__PURE__ */ jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#fd521a] focus:outline-none focus:ring-2 focus:ring-[#fd521a]/20", placeholder: "••••••••", required: true })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: isLoading, className: "w-full rounded-xl bg-[#fd521a] py-3 font-bold text-white transition-colors hover:bg-[#e04a17] disabled:cursor-not-allowed disabled:opacity-50", children: isLoading ? "Connexion..." : "Se connecter" })
    ] })
  ] }) });
}
export {
  AdminLoginPage as component
};

import { jsx } from "react/jsx-runtime";
import { useEffect } from "react";
function AdminLoginRedirect() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#f2f2f0]", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Redirection vers la page de connexion..." }) });
}
export {
  AdminLoginRedirect as component
};

import { jsx } from "react/jsx-runtime";
import { useEffect } from "react";
function LoginRedirect() {
  useEffect(() => {
    window.location.href = "https://app.driivo.fr";
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#f2f2f0]", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Redirection..." }) });
}
export {
  LoginRedirect as component
};

import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  component: LoginRedirect,
});

function LoginRedirect() {
  useEffect(() => {
    window.location.href = "https://app.driivo.fr";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f0]">
      <p className="text-gray-500">Redirection...</p>
    </div>
  );
}

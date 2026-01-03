import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginRedirect,
});

// Redirect to unified login page
function AdminLoginRedirect() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f0]">
      <p className="text-gray-500">Redirection vers la page de connexion...</p>
    </div>
  );
}

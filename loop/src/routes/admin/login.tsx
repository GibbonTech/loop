import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/login")({
  beforeLoad: () => {
    // Redirect directly to root to avoid redirect chain
    throw redirect({ to: "/" });
  },
  component: AdminLoginRedirect,
});

function AdminLoginRedirect() {
  // This should never render due to beforeLoad redirect
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f0]">
      <p className="text-gray-500">Redirection vers la page de connexion...</p>
    </div>
  );
}

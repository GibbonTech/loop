import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    // Redirect to root - the root route will show LoginPage on app.driivo.fr
    // or LandingPage on driivo.fr
    throw redirect({ to: "/" });
  },
  component: LoginRedirect,
});

function LoginRedirect() {
  // This should never render due to beforeLoad redirect
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f0]">
      <p className="text-gray-500">Redirection...</p>
    </div>
  );
}

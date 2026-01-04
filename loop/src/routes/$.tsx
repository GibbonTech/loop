import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
    component: NotFoundPage,
    head: () => ({
        meta: [
            { title: "Page non trouvée | Driivo" },
        ],
    }),
});

function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f2f0] px-4">
            <div className="text-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-lg font-bold tracking-tighter text-black"
                >
                    <div className="h-2.5 w-2.5 rounded-full bg-[#fd521a] shadow-[0_0_10px_rgba(253,82,26,0.5)]"></div>
                    DRIIVO
                </Link>

                {/* 404 */}
                <div className="mb-6 text-8xl font-bold text-[#fd521a]">404</div>
                <h1 className="mb-3 text-2xl font-bold">Page non trouvée</h1>
                <p className="mb-8 text-gray-500">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                {/* CTA */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#fd521a] px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#e0410e]"
                >
                    ← Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}

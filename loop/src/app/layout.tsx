import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop | L'Indépendance Protégée",
  description: "Le statut ultime pour chauffeur VTC. Récupérez la TVA, cotisez au chômage et gagnez plus qu'en auto-entreprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import appCss from "~/styles.css?url";
import { Analytics } from "~/components/analytics";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Driivo - Entrepreneur Salarié VTC" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <Toaster position="top-right" richColors />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
        <Analytics />
        <style
          dangerouslySetInnerHTML={{
            __html: `body{background:#f2f2f0;opacity:0;transition:opacity .1s}body.ready{opacity:1}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('ready')})`,
          }}
        />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `body{opacity:1!important}` }} />
        </noscript>
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

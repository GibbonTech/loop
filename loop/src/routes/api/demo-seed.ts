import { createHash, timingSafeEqual } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { env } from "~/env/server";
import { seed } from "~/scripts/seed";
import { seedDemo } from "~/scripts/seed-demo";

function expectedSeedToken() {
  return createHash("sha256")
    .update(`${env.BETTER_AUTH_SECRET}:demo-seed`)
    .digest("hex");
}

function validSeedToken(token: string | null) {
  if (!token) return false;
  const expected = expectedSeedToken();
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);
  return (
    tokenBuffer.length === expectedBuffer.length &&
    timingSafeEqual(tokenBuffer, expectedBuffer)
  );
}

export const Route = createFileRoute("/api/demo-seed")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const providedToken =
          request.headers.get("x-demo-seed-token") ||
          new URL(request.url).searchParams.get("token");

        if (!validSeedToken(providedToken)) {
          return json({ success: false, error: "Not found" }, { status: 404 });
        }

        process.env.ALLOW_DEMO_SEED = "true";
        process.env.DEMO_USER_PASSWORD ||= "demo-password-123";
        process.env.ADMIN_EMAIL ||= "demo.admin@driivo.fr";
        process.env.ADMIN_NAME ||= "Demo Admin Driivo";
        process.env.ADMIN_PASSWORD ||= "DriivoDemo-2026!";

        await seedDemo();
        await seed();

        return json({
          success: true,
          seededAt: new Date().toISOString(),
          demoUsers: [
            "amine.benkacem@example.com",
            "sarah.meunier@example.com",
            "karim.ouedraogo@example.com",
            "nora.belhadj@example.com",
            "mehdi.aouad@example.com",
            "camille.rossi@example.com",
          ],
          adminEmail: process.env.ADMIN_EMAIL,
        });
      },
    },
  },
});

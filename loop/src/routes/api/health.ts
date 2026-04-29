import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { requireAdmin } from "~/lib/server/api-guards";
import {
  deleteFile,
  getDownloadUrl,
  isStorageConfigured,
  uploadFile,
} from "~/lib/server/storage";

async function checkResend() {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    return { configured: false, ok: false, status: null, domains: [] };
  }

  const response = await fetch("https://api.resend.com/domains", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const body = await response.json().catch(() => ({}));
  const domains = Array.isArray(body?.data)
    ? body.data.map((domain: Record<string, unknown>) => ({
        name: domain.name,
        status: domain.status,
        region: domain.region,
      }))
    : [];

  return {
    configured: true,
    ok: response.ok,
    status: response.status,
    domains,
  };
}

async function checkR2() {
  if (!isStorageConfigured()) {
    return { configured: false, ok: false };
  }

  const key = `audit/health-smoke-${Date.now()}.txt`;
  const content = `driivo-r2-smoke-${Date.now()}`;

  await uploadFile(key, Buffer.from(content), "text/plain");
  const url = await getDownloadUrl(key, 300);
  const response = await fetch(url);
  const downloaded = await response.text();
  await deleteFile(key);

  return {
    configured: true,
    ok: response.ok && downloaded === content,
    status: response.status,
    keyDeleted: true,
  };
}

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get("integrations") === "1") {
          const adminContext = await requireAdmin(request);
          if (adminContext instanceof Response) return adminContext;

          const [resend, r2] = await Promise.all([checkResend(), checkR2()]);
          return json({
            status: resend.ok && r2.ok ? "ok" : "degraded",
            timestamp: new Date().toISOString(),
            integrations: { resend, r2 },
          });
        }

        return json({ status: "ok", timestamp: new Date().toISOString() });
      },
    },
  },
});

import { json } from "@tanstack/react-start";
import { auth } from "~/lib/auth/auth";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type GlobalRateLimitStore = typeof globalThis & {
  __driivoRateLimit?: Map<string, RateLimitBucket>;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role?: string | null;
};

export type AuthContext = {
  user: AuthUser;
  isAdmin: boolean;
};

const globalStore = globalThis as GlobalRateLimitStore;
const rateLimitStore =
  globalStore.__driivoRateLimit ?? new Map<string, RateLimitBucket>();
globalStore.__driivoRateLimit = rateLimitStore;

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    forwardedFor?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export function enforceRateLimit(
  request: Request,
  scope: string,
  options: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const key = `${scope}:${getClientIp(request)}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  if (current.count >= options.limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return json(
      {
        success: false,
        error: "Trop de requêtes. Réessayez dans quelques instants.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  current.count += 1;
  return null;
}

export async function requireAuth(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user as AuthUser | undefined;

  if (!user?.id || !user.email) {
    return json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  return {
    user,
    isAdmin: user.role === "ADMIN",
  } satisfies AuthContext;
}

export async function requireAdmin(request: Request) {
  const authContext = await requireAuth(request);
  if (authContext instanceof Response) return authContext;

  if (!authContext.isAdmin) {
    return json(
      { success: false, error: "Admin access required" },
      { status: 403 },
    );
  }

  return authContext;
}

export function validationError(message = "Requête invalide") {
  return json({ success: false, error: message }, { status: 400 });
}

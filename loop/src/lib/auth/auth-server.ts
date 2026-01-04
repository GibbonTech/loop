import { auth } from "./auth";

/**
 * Get session from request headers (server-side only)
 * Use in beforeLoad, server handlers, and API routes
 */
export async function getServerSession(request: Request) {
  return auth.api.getSession({
    headers: request.headers,
  });
}

/**
 * Check if user has admin role
 */
export function isAdmin(user: { role?: string } | null | undefined): boolean {
  return user?.role === "ADMIN";
}

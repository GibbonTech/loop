import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getServerSession, isAdmin } from "./auth-server";

/**
 * Server function to validate session - call from beforeLoad
 */
export const validateSession = createServerFn({ method: "GET" }).handler(
    async () => {
        const request = getRequest();
        const session = await getServerSession(request);
        return {
            isAuthenticated: !!session?.user,
            user: session?.user ?? null,
            isAdmin: isAdmin(session?.user as { role?: string } | null),
        };
    }
);

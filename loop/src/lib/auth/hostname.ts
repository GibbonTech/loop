import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

/**
 * Server function to detect hostname from request headers.
 * Used by the index route loader to determine if we're on app.driivo.fr
 */
export const getHostname = createServerFn({ method: "GET" }).handler(
  async () => {
    const request = getRequest();
    const host = request.headers.get("host") || "";
    return {
      isAppDomain: host === "app.driivo.fr" || host.startsWith("app."),
    };
  }
);

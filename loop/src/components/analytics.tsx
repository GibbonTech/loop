/**
 * Google Analytics 4 integration
 * Drop <Analytics /> into __root.tsx to enable tracking
 * Set VITE_GA_MEASUREMENT_ID env var (e.g. G-XXXXXXXXXX)
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function Analytics() {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              send_page_view: true,
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Track a custom event in GA4
 */
export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track a conversion (for Google Ads)
 */
export function trackConversion(conversionLabel: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionLabel,
      value: value || 0,
      currency: "EUR",
    });
  }
}

/**
 * Extract UTM params from URL
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

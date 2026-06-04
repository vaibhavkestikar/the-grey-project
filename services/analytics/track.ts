"use client";

import type { AnalyticsEvent } from "@/types/analytics";

export function track(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    properties: {
      ...properties,
      path: window.location.pathname,
      ts: Date.now(),
    },
  };

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});

  if (typeof window !== "undefined" && "posthog" in window) {
    // @ts-expect-error optional PostHog
    window.posthog?.capture?.(event, properties);
  }
}

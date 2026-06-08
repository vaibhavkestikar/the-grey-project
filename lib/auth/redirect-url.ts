function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function isLocalhost(url: string): boolean {
  return /^https?:\/\/localhost(\b|:)/i.test(url);
}

/** Resolve the public site origin for auth email links. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL
    ? stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined;

  // In production, always use the canonical URL so it matches Supabase allow list
  // (avoids www vs non-www mismatches that cause fallback to Site URL home).
  if (fromEnv && !isLocalhost(fromEnv)) {
    return fromEnv;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return fromEnv ?? "http://localhost:3000";
}

export function getAuthCallbackUrl(): string {
  // type=signup keeps OTP verification explicit for server and client handlers.
  return `${getSiteUrl()}/auth/callback?type=signup`;
}

export function getAuthCallbackUrlWithType(
  type: "recovery" | "email_change"
): string {
  if (type === "recovery") {
    return getRecoveryCallbackUrl();
  }
  return `${getSiteUrl()}/auth/callback?type=${type}`;
}

export function getRecoveryCallbackUrl(): string {
  return `${getSiteUrl()}/auth/callback/recovery?type=recovery`;
}

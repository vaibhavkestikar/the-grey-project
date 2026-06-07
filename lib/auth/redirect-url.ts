function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** Resolve the public site origin for auth email links. */
export function getSiteUrl(): string {
  // Client: always use the current origin so links match where the user signed up.
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL
    ? stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined;

  if (fromEnv && !/^https?:\/\/localhost(\b|:)/i.test(fromEnv)) {
    return fromEnv;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return fromEnv ?? "http://localhost:3000";
}

export function getAuthCallbackUrl(): string {
  return `${getSiteUrl()}/auth/callback`;
}

export function getAuthCallbackUrlWithType(
  type: "recovery" | "email_change"
): string {
  if (type === "recovery") {
    return `${getSiteUrl()}/auth/callback/recovery`;
  }
  return `${getAuthCallbackUrl()}?type=${type}`;
}

export function getRecoveryCallbackUrl(): string {
  return `${getSiteUrl()}/auth/callback/recovery`;
}

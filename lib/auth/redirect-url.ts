export function getAuthCallbackUrl(): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");

  return `${siteUrl.replace(/\/$/, "")}/auth/callback`;
}

export function getAuthCallbackUrlWithType(
  type: "recovery" | "email_change"
): string {
  return `${getAuthCallbackUrl()}?type=${type}`;
}

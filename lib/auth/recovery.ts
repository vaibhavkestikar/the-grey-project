export const AUTH_RECOVERY_COOKIE = "auth_recovery";

const RECOVERY_COOKIE_MAX_AGE = 60 * 10;

export function isRecoveryRedirectPath(path: string): boolean {
  return path === "/reset-password" || path.startsWith("/reset-password?");
}

/** Auth pages where recovery trapping should never apply. */
export const RECOVERY_REDIRECT_EXEMPT_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/logout",
] as const;

export function isRecoveryRedirectExempt(pathname: string): boolean {
  return RECOVERY_REDIRECT_EXEMPT_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

/** Public routes where users can browse freely and exit a password reset flow. */
export function shouldAbandonRecoveryOnNavigate(pathname: string): boolean {
  if (isRecoveryRedirectExempt(pathname)) return true;
  if (pathname === "/") return true;
  if (pathname.startsWith("/workshops")) return true;
  if (pathname.startsWith("/for-colleges")) return true;
  if (pathname.startsWith("/about")) return true;
  if (pathname.startsWith("/blog")) return true;
  if (pathname.startsWith("/feedback")) return true;
  return false;
}

export function markRecoveryFlow() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_RECOVERY_COOKIE}=1; path=/; max-age=${RECOVERY_COOKIE_MAX_AGE}; samesite=lax`;
}

export function clearRecoveryFlow() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_RECOVERY_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function hasRecoveryCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`${AUTH_RECOVERY_COOKIE}=1`));
}

export async function abandonRecoveryFlow(
  signOut: () => Promise<{ error: Error | null }>
) {
  clearRecoveryFlow();
  await signOut();
}

export const AUTH_RECOVERY_COOKIE = "auth_recovery";

export function isRecoveryRedirectPath(path: string): boolean {
  return path === "/reset-password" || path.startsWith("/reset-password?");
}

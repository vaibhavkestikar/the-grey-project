export type AuthFunnelEvent =
  | "user_signup"
  | "email_sent"
  | "email_verified"
  | "signup_completed";

export async function trackAuthFunnelEvent(
  userId: string,
  event: AuthFunnelEvent
): Promise<void> {
  try {
    await fetch("/api/auth/funnel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, event }),
    });
  } catch {
    /* non-blocking */
  }
}

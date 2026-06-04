import type { AuthError } from "@supabase/supabase-js";

export function isEmailNotVerifiedError(
  error: AuthError | null | undefined
): boolean {
  if (!error) return false;
  const message = error.message.toLowerCase();
  const code = (error as AuthError & { code?: string }).code?.toLowerCase();
  return (
    message.includes("email not confirmed") ||
    message.includes("email_not_confirmed") ||
    code === "email_not_confirmed"
  );
}

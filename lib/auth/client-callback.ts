import type { EmailOtpType } from "@supabase/supabase-js";

import { trackAuthFunnelEvent } from "@/lib/auth/funnel";
import { AUTH_RECOVERY_COOKIE } from "@/lib/auth/recovery";
import { createClient } from "@/lib/supabase/client";

export type CallbackMode = "signup" | "recovery" | "email_change";

function parseHashParams(url: URL): URLSearchParams {
  const hash = url.hash.startsWith("#") ? url.hash.slice(1) : url.hash;
  return new URLSearchParams(hash);
}

function resolveOtpType(
  queryType: string | null,
  hashType: string | null,
  mode: CallbackMode
): EmailOtpType {
  const candidate = queryType ?? hashType;
  if (candidate === "recovery") return "recovery";
  if (candidate === "email_change") return "email_change";
  if (candidate === "signup" || candidate === "email") return "signup";
  if (mode === "recovery") return "recovery";
  if (mode === "email_change") return "email_change";
  return "signup";
}

export function resolveCallbackRedirect(
  url: URL,
  mode: CallbackMode
): string {
  const type = url.searchParams.get("type");
  const hashType = parseHashParams(url).get("type");
  const next = url.searchParams.get("next");

  if (
    mode === "recovery" ||
    type === "recovery" ||
    hashType === "recovery" ||
    next === "/reset-password"
  ) {
    return "/reset-password";
  }

  if (type === "email_change" || mode === "email_change") {
    return "/settings?email_updated=1";
  }

  if (next?.startsWith("/")) {
    return next;
  }

  return "/welcome";
}

function markRecoveryFlow() {
  document.cookie = `${AUTH_RECOVERY_COOKIE}=1; path=/; max-age=600; samesite=lax`;
}

export type CallbackErrorCode = "auth_callback" | "password_reset_callback";

export async function completeClientAuthCallback(mode: CallbackMode): Promise<{
  redirectPath: string;
  error?: CallbackErrorCode;
}> {
  const supabase = createClient();
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const hashParams = parseHashParams(url);
  const access_token = hashParams.get("access_token");
  const refresh_token = hashParams.get("refresh_token");
  const otpType = resolveOtpType(
    url.searchParams.get("type"),
    hashParams.get("type"),
    mode
  );
  const isRecoveryFlow =
    mode === "recovery" ||
    otpType === "recovery" ||
    resolveCallbackRedirect(url, mode).startsWith("/reset-password");
  const failureError: CallbackErrorCode = isRecoveryFlow
    ? "password_reset_callback"
    : "auth_callback";

  let authError: Error | null = null;

  if (token_hash) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: otpType,
    });
    authError = error;
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    authError = error;

    if (authError && access_token && refresh_token) {
      const fallback = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      authError = fallback.error;
    }
  } else if (access_token && refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    authError = error;
  } else {
    return { redirectPath: "/login", error: failureError };
  }

  if (authError) {
    return { redirectPath: "/login", error: failureError };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { redirectPath: "/login", error: failureError };
  }

  if (!isRecoveryFlow) {
    await trackAuthFunnelEvent(user.id, "email_verified");
  }

  const redirectPath = resolveCallbackRedirect(url, mode);

  if (redirectPath === "/welcome") {
    await trackAuthFunnelEvent(user.id, "signup_completed");
  }

  if (redirectPath.startsWith("/reset-password")) {
    markRecoveryFlow();
  }

  // Drop auth params/hash from the address bar before navigating onward.
  window.history.replaceState({}, "", redirectPath);

  return { redirectPath };
}

import type { EmailOtpType } from "@supabase/supabase-js";

import { trackAuthFunnelEvent } from "@/lib/auth/funnel";
import { markRecoveryFlow } from "@/lib/auth/recovery";
import { mergeGuestProgressOnSignIn } from "@/lib/learning/merge-guest-progress";
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

function resolveCallbackMode(url: URL, fallback: CallbackMode): CallbackMode {
  const type =
    url.searchParams.get("type") ?? parseHashParams(url).get("type");
  if (type === "recovery") return "recovery";
  if (type === "email_change") return "email_change";
  return fallback;
}

export type CallbackErrorCode =
  | "auth_callback"
  | "password_reset_callback"
  | "email_change_callback";

export async function completeClientAuthCallback(mode: CallbackMode): Promise<{
  redirectPath: string;
  error?: CallbackErrorCode;
}> {
  const supabase = createClient();
  const url = new URL(window.location.href);
  const effectiveMode = resolveCallbackMode(url, mode);
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const hashParams = parseHashParams(url);
  const access_token = hashParams.get("access_token");
  const refresh_token = hashParams.get("refresh_token");
  const otpType = resolveOtpType(
    url.searchParams.get("type"),
    hashParams.get("type"),
    effectiveMode
  );
  const redirectPath = resolveCallbackRedirect(url, effectiveMode);
  const isRecoveryFlow =
    effectiveMode === "recovery" ||
    otpType === "recovery" ||
    redirectPath.startsWith("/reset-password");
  const isEmailChangeFlow =
    effectiveMode === "email_change" ||
    otpType === "email_change" ||
    redirectPath.startsWith("/settings");
  const failureError: CallbackErrorCode = isRecoveryFlow
    ? "password_reset_callback"
    : isEmailChangeFlow
      ? "email_change_callback"
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

  if (!isRecoveryFlow && !isEmailChangeFlow) {
    await trackAuthFunnelEvent(user.id, "email_verified");
  }

  if (redirectPath === "/welcome") {
    await trackAuthFunnelEvent(user.id, "signup_completed");
  }

  if (!isRecoveryFlow && !isEmailChangeFlow) {
    await mergeGuestProgressOnSignIn();
  }

  if (redirectPath.startsWith("/reset-password")) {
    markRecoveryFlow();
  }

  // Drop auth params/hash from the address bar before navigating onward.
  window.history.replaceState({}, "", redirectPath);

  return { redirectPath };
}

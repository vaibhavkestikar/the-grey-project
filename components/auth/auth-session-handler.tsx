"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AUTH_RECOVERY_COOKIE } from "@/lib/auth/recovery";
import { createClient } from "@/lib/supabase/client";

function hasRecoveryCookie(): boolean {
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`${AUTH_RECOVERY_COOKIE}=1`));
}

function hashHasAuthTokens(): boolean {
  if (typeof window === "undefined" || !window.location.hash) return false;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return Boolean(
    hash.get("access_token") ||
      hash.get("refresh_token") ||
      hash.get("token_hash")
  );
}

export default function AuthSessionHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const onCallback = pathname.startsWith("/auth/callback");

    // Hash tokens never reach the server. Send them to the client callback page.
    if (hashHasAuthTokens() && !onCallback) {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const hashType = params.get("type");
      const target =
        type === "recovery" || hashType === "recovery"
          ? "/auth/callback/recovery"
          : "/auth/callback";
      window.location.replace(`${target}${window.location.hash}`);
      return;
    }

    // If auth params land outside callback routes, forward to the client handler.
    if ((code || tokenHash) && !onCallback) {
      const params = searchParams.toString();
      const isRecovery = type === "recovery";
      const target = isRecovery ? "/auth/callback/recovery" : "/auth/callback";
      const nextParams =
        isRecovery && !searchParams.has("type")
          ? `${params ? `${params}&` : ""}type=recovery`
          : params;
      window.location.replace(
        nextParams ? `${target}?${nextParams}` : target
      );
      return;
    }

    if (
      hasRecoveryCookie() &&
      pathname !== "/reset-password" &&
      !pathname.startsWith("/auth/callback")
    ) {
      router.replace("/reset-password");
    }
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        document.cookie = `${AUTH_RECOVERY_COOKIE}=1; path=/; max-age=600; samesite=lax`;
        router.replace("/reset-password");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return null;
}

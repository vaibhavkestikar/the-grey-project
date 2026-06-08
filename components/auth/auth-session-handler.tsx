"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  abandonRecoveryFlow,
  clearRecoveryFlow,
  hasRecoveryCookie,
  shouldAbandonRecoveryOnNavigate,
} from "@/lib/auth/recovery";
import { createClient } from "@/lib/supabase/client";

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
      const isEmailChange = type === "email_change";
      const target = isRecovery ? "/auth/callback/recovery" : "/auth/callback";
      let nextParams = params;
      if (isRecovery && !searchParams.has("type")) {
        nextParams = `${params ? `${params}&` : ""}type=recovery`;
      } else if (isEmailChange && !searchParams.has("type")) {
        nextParams = `${params ? `${params}&` : ""}type=email_change`;
      }
      window.location.replace(
        nextParams ? `${target}?${nextParams}` : target
      );
      return;
    }

    const supabase = createClient();

    void (async () => {
      if (shouldAbandonRecoveryOnNavigate(pathname)) {
        if (hasRecoveryCookie()) {
          await abandonRecoveryFlow(() => supabase.auth.signOut());
        }
        return;
      }

      if (
        pathname === "/reset-password" ||
        pathname.startsWith("/auth/callback")
      ) {
        return;
      }

      if (!hasRecoveryCookie()) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/reset-password");
        return;
      }

      clearRecoveryFlow();
    })();
  }, [pathname, router, searchParams]);

  return null;
}

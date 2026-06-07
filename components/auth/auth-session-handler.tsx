"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AUTH_RECOVERY_COOKIE } from "@/lib/auth/recovery";
import { createClient } from "@/lib/supabase/client";

function hasRecoveryCookie(): boolean {
  return document.cookie.split("; ").some((c) => c.startsWith(`${AUTH_RECOVERY_COOKIE}=1`));
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

    // If auth params land outside our callback routes, forward to the server handler.
    if ((code || tokenHash) && !onCallback) {
      const params = searchParams.toString();
      const target =
        type === "recovery" ? "/auth/callback/recovery" : "/auth/callback";
      window.location.replace(params ? `${target}?${params}` : target);
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

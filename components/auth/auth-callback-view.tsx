"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  completeClientAuthCallback,
  type CallbackMode,
} from "@/lib/auth/client-callback";

type Props = {
  mode: CallbackMode;
};

const LOADING_COPY: Record<CallbackMode, string> = {
  signup: "Finishing sign-in...",
  recovery: "Preparing password reset...",
  email_change: "Confirming email change...",
};

export default function AuthCallbackView({ mode }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState(LOADING_COPY[mode]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const result = await completeClientAuthCallback(mode);
      if (cancelled) return;

      if (result.error) {
        if (result.error === "password_reset_callback") {
          setMessage("That reset link could not be used. Redirecting...");
          router.replace("/forgot-password?error=password_reset_callback");
          return;
        }

        if (result.error === "email_change_callback") {
          setMessage("That email confirmation link could not be used. Redirecting...");
          router.replace("/settings?error=email_change_callback");
          return;
        }

        setMessage("Could not verify your link. Redirecting...");
        router.replace(`/login?error=${result.error}`);
        return;
      }

      router.replace(result.redirectPath);
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        <p className="mt-6 text-slate-600">{message}</p>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";
import { getRecoveryCallbackUrl } from "@/lib/auth/redirect-url";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [callbackError, setCallbackError] = useState(false);

  useEffect(() => {
    if (searchParams.get("error") === "password_reset_callback") {
      setCallbackError(true);
      toast.error(
        "That reset link expired or opened in a different browser tab. Request a new one below."
      );
    }
  }, [searchParams]);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getRecoveryCallbackUrl(),
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    router.push(`/forgot-password/sent?email=${encodeURIComponent(email.trim())}`);
  }

  return (
    <>
      <AuthHeader />

      <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-surface px-4 py-10 md:px-6">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

        <div className="auth-shell max-w-md">
          <h1 className="text-3xl font-black text-ink sm:text-4xl">
            Reset Password
          </h1>

          <p className="mt-3 text-base text-ink-muted">
            We will send you a reset link.
          </p>

          {callbackError && (
            <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              Your reset link expired or opened outside the browser where you requested it.
              Enter your email and we&apos;ll send a fresh link.
            </div>
          )}

          <form onSubmit={handleReset} className="mt-8 space-y-5 md:mt-10">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-cta w-full"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
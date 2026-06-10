"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";
import UnverifiedLoginPanel from "@/components/auth/unverified-login-panel";
import { isEmailNotVerifiedError } from "@/lib/auth/errors";
import { clearRecoveryFlow } from "@/lib/auth/recovery";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [unverified, setUnverified] = useState(false);
  const [callbackError, setCallbackError] = useState(false);

  useEffect(() => {
    clearRecoveryFlow();

    if (searchParams.get("password_updated") === "1") {
      void supabase.auth.signOut();
      toast.success("Password updated. Sign in with your new password.");
    }

    if (searchParams.get("error") === "auth_callback") {
      setCallbackError(true);
      toast.error(
        "That verification link could not be completed. Request a fresh link below."
      );
    }
  }, [searchParams, supabase]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setUnverified(false);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      if (isEmailNotVerifiedError(error)) {
        setUnverified(true);
        return;
      }
      toast.error(error.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user && !user.email_confirmed_at) {
      await supabase.auth.signOut();
      setUnverified(true);
      return;
    }

    router.refresh();
    router.push("/learning");
  }

  return (
    <>
      <AuthHeader />
      <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-surface px-4 py-10">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />
        <div className="auth-shell">
          <h1 className="text-3xl font-black text-ink sm:text-4xl">Welcome Back</h1>
          <p className="mt-3 text-base text-ink-muted">Continue your AI journey.</p>

          {callbackError && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              Your verification link expired or opened in a different browser tab.
              Enter your email and use <strong>Resend Verification</strong> below.
            </div>
          )}

          {unverified && email && (
            <div className="mt-6">
              <UnverifiedLoginPanel email={email} />
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
            <button type="submit" disabled={loading} className="btn-cta w-full">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:justify-between">
            <Link href="/register" className="font-medium text-brand-accent">
              Create account
            </Link>
            <Link href="/forgot-password" className="text-ink-muted">
              Forgot password?
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

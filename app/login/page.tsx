"use client";

import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";
import UnverifiedLoginPanel from "@/components/auth/unverified-login-panel";
import { isEmailNotVerifiedError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [unverified, setUnverified] = useState(false);

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

    const { data: { user } } = await supabase.auth.getUser();
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
      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />
        <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-10">
          <h1 className="text-4xl font-black text-slate-900">Welcome Back</h1>
          <p className="mt-4 text-slate-600">Continue your AI journey.</p>

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
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-violet-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-violet-600 py-4 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-8 flex justify-between text-sm">
            <Link href="/register" className="font-medium text-violet-600">
              Create account
            </Link>
            <Link href="/forgot-password" className="text-slate-500">
              Forgot password?
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

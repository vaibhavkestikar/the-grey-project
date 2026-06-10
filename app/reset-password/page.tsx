"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";
import { clearRecoveryFlow } from "@/lib/auth/recovery";
import { waitForAuthSession } from "@/lib/auth/wait-for-session";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async () => {
      const session = await waitForAuthSession(supabase);
      if (!session) {
        clearRecoveryFlow();
        router.replace("/forgot-password");
        return;
      }

      setReady(true);
    })();
  }, [router, supabase]);

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password updated successfully");

      clearRecoveryFlow();
      await supabase.auth.signOut();

      router.replace("/login?password_updated=1");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Preparing password reset...</p>
      </main>
    );
  }

  return (
    <>
      <AuthHeader />

      <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-surface px-4 py-10 md:px-6">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

        <div className="auth-shell">
          <div className="mb-8 text-left">
            <h1 className="text-3xl font-black leading-tight text-ink sm:text-4xl">
              Reset Password
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Enter your new password.
            </p>
          </div>

          <form onSubmit={updatePassword} className="space-y-5">
            <input
              type="password"
              required
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />

            <button type="submit" disabled={loading} className="btn-cta w-full">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

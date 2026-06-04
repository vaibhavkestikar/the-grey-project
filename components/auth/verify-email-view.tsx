"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import AuthHeader from "@/components/auth/auth-header";
import { getAuthCallbackUrl } from "@/lib/auth/redirect-url";
import { trackAuthFunnelEvent } from "@/lib/auth/funnel";
import { createClient } from "@/lib/supabase/client";

const POLL_MS = 5000;
const RESEND_COOLDOWN = 60;

export default function VerifyEmailView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  const check = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) setEmail(user.email);
    if (user?.email_confirmed_at) {
      setVerified(true);
      if (user.id) await trackAuthFunnelEvent(user.id, "email_verified");
      return true;
    }
    return false;
  }, [supabase]);

  useEffect(() => {
    const stored = sessionStorage.getItem("pending_verify_email");
    if (!email && stored) setEmail(stored);
    void check();
  }, [email, check]);

  useEffect(() => {
    if (verified) return;
    const id = setInterval(() => void check(), POLL_MS);
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user?.email_confirmed_at) setVerified(true);
    });
    return () => {
      clearInterval(id);
      subscription.unsubscribe();
    };
  }, [verified, check, supabase.auth]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  async function resend() {
    if (!email || cooldown > 0) return;
    setResending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: getAuthCallbackUrl() },
    });
    setResending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Verification email sent.");
    setCooldown(RESEND_COOLDOWN);
  }

  if (verified) {
    return (
      <>
        <AuthHeader />
        <main className="flex min-h-[calc(100dvh-68px)] items-center justify-center px-4 py-8">
          <div className="w-full max-w-lg rounded-[2rem] border border-emerald-200 bg-white p-10 text-center shadow-2xl">
            <p className="text-5xl">✓</p>
            <h1 className="mt-6 text-3xl font-black">Email Verified</h1>
            <button
              type="button"
              onClick={() => router.push("/learning")}
              className="mt-8 w-full rounded-2xl bg-violet-600 py-4 font-semibold text-white"
            >
              Start Learning
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AuthHeader />
      <main className="flex min-h-[calc(100dvh-68px)] items-center justify-center overflow-x-hidden px-4 py-8">
        <div className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-10">
          <motion.div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-4xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ✉️
          </motion.div>
          <h1 className="mt-8 text-center text-3xl font-black">Check Your Email</h1>
          <p className="mt-3 text-center text-slate-600">
            We sent a verification link to:
          </p>
          <p className="mt-2 break-all text-center font-bold text-violet-700">{email}</p>

          <ol className="mt-8 space-y-2 text-sm text-slate-600">
            <li>1. Open your email</li>
            <li>2. Click verification</li>
            <li>3. Return here and we detect it automatically</li>
          </ol>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border py-3 text-center text-sm font-semibold"
            >
              Open Gmail
            </a>
            <a
              href="https://outlook.live.com/mail"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border py-3 text-center text-sm font-semibold"
            >
              Open Outlook
            </a>
          </div>

          <button
            type="button"
            onClick={resend}
            disabled={resending || cooldown > 0}
            className="mt-4 w-full rounded-2xl bg-violet-600 py-4 font-semibold text-white disabled:opacity-50"
          >
            {resending ? "Sending..." : cooldown > 0 ? `Resend (${cooldown}s)` : "Resend Email"}
          </button>

          <Link href="/register" className="mt-3 block text-center text-sm text-violet-600">
            Change email
          </Link>
          <Link href="/" className="mt-4 block text-center text-sm text-slate-500">
            ← Back home
          </Link>
        </div>
      </main>
    </>
  );
}

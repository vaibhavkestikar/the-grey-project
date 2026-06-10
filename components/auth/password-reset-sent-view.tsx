"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";

import AuthHeader from "@/components/auth/auth-header";
import NumberedStepList from "@/components/ui/numbered-step-list";
import { getRecoveryCallbackUrl } from "@/lib/auth/redirect-url";
import { createClient } from "@/lib/supabase/client";

const RESET_STEPS = [
  "Open your email",
  "Click the reset link",
  "Choose a new password on the next screen",
] as const;

export default function PasswordResetSentView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const email = searchParams.get("email") ?? "";

  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  async function resend() {
    if (!email) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getRecoveryCallbackUrl(),
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Reset link sent again.");
  }

  if (!email) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </main>
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
            🔑
          </motion.div>
          <h1 className="mt-8 text-center text-3xl font-black">Check Your Email</h1>
          <p className="mt-3 text-center text-slate-600">
            We sent a password reset link to:
          </p>
          <p className="mt-2 break-all text-center font-bold text-violet-700">{email}</p>

          <NumberedStepList steps={RESET_STEPS} className="mt-8" />

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
            className="mt-4 w-full rounded-2xl bg-violet-600 py-4 font-semibold text-white"
          >
            Resend reset link
          </button>

          <Link
            href="/login"
            className="mt-4 block text-center text-sm font-medium text-violet-600"
          >
            Back to sign in
          </Link>
          <Link href="/" className="mt-3 block text-center text-sm text-slate-500">
            Back home
          </Link>
        </div>
      </main>
    </>
  );
}

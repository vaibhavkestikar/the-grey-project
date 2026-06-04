"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { getAuthCallbackUrl } from "@/lib/auth/redirect-url";
import { createClient } from "@/lib/supabase/client";

type Props = { email: string };

export default function UnverifiedLoginPanel({ email }: Props) {
  const [resending, setResending] = useState(false);
  const supabase = createClient();

  async function resend() {
    setResending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: getAuthCallbackUrl() },
    });
    setResending(false);
    if (error) toast.error(error.message);
    else toast.success("Verification email sent.");
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <h2 className="font-bold text-amber-950">Please verify your email first</h2>
      <p className="mt-2 text-sm text-amber-900">
        Check <strong className="break-all">{email}</strong> for the verification link.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={resend}
          disabled={resending}
          className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend Verification"}
        </button>
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-xl border bg-white py-3 text-center text-sm font-semibold"
        >
          Open Email
        </a>
      </div>
      <Link
        href={`/verify-email?email=${encodeURIComponent(email)}`}
        className="mt-3 block text-center text-sm font-medium text-violet-700"
      >
        Go to verification page →
      </Link>
    </div>
  );
}

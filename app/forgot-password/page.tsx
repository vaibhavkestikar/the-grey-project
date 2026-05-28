"use client";

import { useState } from "react";
import { toast } from "sonner";
import AuthHeader from "@/components/auth/auth-header";

import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {

  const supabase = createClient();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleReset(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            "http://localhost:3000/reset-password",
        }
      );

    setLoading(false);

    if (error) {

      toast.error(error.message);

      return;

    }

    toast.success(
    "Password reset email sent."
    );

  }

  return (

    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6">

      <AuthHeader />

      <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl">

        <h1 className="text-5xl font-black text-slate-900">
          Reset Password
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          We’ll send you a reset link.
        </p>

        <form
          onSubmit={handleReset}
          className="mt-10 space-y-5"
        >

          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

      </div>

    </main>

  );
}
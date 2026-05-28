"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";

import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {

  const supabase =
    createClient();

  const router =
    useRouter();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function updatePassword() {

    try {

      setLoading(true);

      const {
        error,
      } =
        await supabase.auth.updateUser({

          password,

        });

      if (error) {

        toast.error(error.message);

        return;

      }

      toast.success(
        "Password updated successfully"
      );

      router.push("/login");

    } catch (err) {

      console.error(err);

      alert(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6">

      <AuthHeader />

      <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

      <div className="relative z-10 w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl">

        <div className="mb-8">

          <h1 className="text-5xl font-black text-slate-950">
            Reset Password
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Enter your new password.
          </p>

        </div>

        <div className="space-y-5">

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none transition focus:border-violet-500"
          />

          <button
            onClick={updatePassword}
            disabled={loading}
            className="w-full rounded-2xl bg-violet-600 px-5 py-4 text-lg font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </div>

      </div>

    </main>

  );
}
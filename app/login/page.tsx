"use client";

import { toast } from "sonner";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {

  const router = useRouter();

  const supabase = createClient();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {

      toast.error(error.message);

      return;

    }

    router.push("/learning");

  }

  return (

    <>
      <AuthHeader />

      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 md:px-6">

        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

        <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-10">

          <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Welcome Back
          </h1>

          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Continue learning AI deeply.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5 md:mt-10"
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

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          <div className="mt-8 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">

            <Link
              href="/register"
              className="font-medium text-violet-600"
            >
              Create account
            </Link>

            <Link
              href="/forgot-password"
              className="font-medium text-slate-500"
            >
              Forgot password?
            </Link>

          </div>

        </div>

      </main>
    </>

  );
}
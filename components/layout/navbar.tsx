"use client";

import Link from "next/link";

import { useAuth } from "@/components/providers/auth-provider";

export default function Navbar() {

  const {
    user,
    loading,
  } = useAuth();

  return (

    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LEFT */}

        <Link
          href="/"
          className="flex flex-col justify-center transition hover:opacity-90"
        >

          <h1 className="text-3xl font-black tracking-tight text-violet-600">
            The Grey Project
          </h1>

          <p className="mt-1 text-center text-[11px] uppercase tracking-[0.35em] text-slate-500">
            UNCOVERING THE GREY IN AI
          </p>

        </Link>

        {/* CENTER */}

        <nav className="hidden items-center gap-10 md:flex">

          <Link
            href="/"
            className="font-medium text-slate-600 transition hover:text-violet-600"
          >
            Home
          </Link>

          <Link
            href="/learning"
            className="font-medium text-slate-600 transition hover:text-violet-600"
          >
            Learning
          </Link>

          <Link
            href="/blog"
            className="font-medium text-slate-600 transition hover:text-violet-600"
          >
            Blog
          </Link>

          <Link
            href="/about"
            className="font-medium text-slate-600 transition hover:text-violet-600"
          >
            About
          </Link>

          <Link
            href="/settings"
            className="font-medium text-slate-600 transition hover:text-violet-600"
          >
            Settings
          </Link>

        </nav>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {!loading && !user && (

            <>

              <Link
                href="/login"
                className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium transition hover:border-violet-300 hover:text-violet-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
              >
                Get Started
              </Link>

            </>

          )}

          {!loading && user && (

            <div className="flex items-center gap-4">

              <div className="hidden text-right md:block">

                <p className="text-sm font-semibold text-slate-900">
                  {user.email}
                </p>

                <p className="text-xs text-slate-500">
                  AI Learner
                </p>

              </div>

              <Link
                href="/logout"
                className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium transition hover:border-red-300 hover:text-red-600"
              >
                Logout
              </Link>

            </div>

          )}

        </div>

      </div>

    </header>

  );
}
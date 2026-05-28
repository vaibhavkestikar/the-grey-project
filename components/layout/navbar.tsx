"use client";

import Link from "next/link";

import { useState } from "react";

import { Menu, X } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";

export default function Navbar() {

  const {
    user,
    loading,
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (

    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-6">

        {/* LEFT */}

        <Link
          href="/"
          className="min-w-0"
        >

          <h1 className="truncate text-xl font-black tracking-tight text-violet-600 sm:text-2xl md:text-3xl">
            The Grey Project
          </h1>

          <p className="mt-1 text-[7px] uppercase tracking-[0.28em] text-slate-500 sm:text-[9px] md:text-[11px] md:tracking-[0.35em]">
            UNCOVERING THE GREY IN AI
          </p>

        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-8 lg:flex">

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

          {/* SETTINGS BACK */}

          {user && (

            <Link
              href="/settings"
              className="font-medium text-slate-600 transition hover:text-violet-600"
            >
              Settings
            </Link>

          )}

        </nav>

        {/* RIGHT */}

        <div className="hidden items-center gap-4 lg:flex">

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

              <div className="text-right">

                <p className="max-w-[180px] truncate text-sm font-semibold text-slate-900">
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

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white lg:hidden"
        >

          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}

      {mobileMenuOpen && (

        <div className="border-t border-slate-200 bg-white lg:hidden">

          <div className="flex flex-col px-4 py-4">

            <Link
              href="/"
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              href="/learning"
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Learning
            </Link>

            <Link
              href="/blog"
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Blog
            </Link>

            <Link
              href="/about"
              className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              About
            </Link>

            {/* SETTINGS MOBILE */}

            {user && (

              <Link
                href="/settings"
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Settings
              </Link>

            )}

            {!loading && !user && (

              <div className="mt-4 flex flex-col gap-3">

                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-5 py-3 text-center font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-violet-600 px-5 py-3 text-center font-medium text-white"
                >
                  Get Started
                </Link>

              </div>

            )}

            {!loading && user && (

              <Link
                href="/logout"
                className="mt-4 rounded-xl border border-red-200 px-5 py-3 text-center font-medium text-red-600"
              >
                Logout
              </Link>

            )}

          </div>

        </div>

      )}

    </header>

  );
}
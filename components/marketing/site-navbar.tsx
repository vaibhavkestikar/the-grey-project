"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Menu, X } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import GreyPointsNavPill from "@/components/learning/grey-points-nav-pill";
import { firstNameFromEmail } from "@/lib/utils/name";

export default function SiteNavbar() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const firstName = firstNameFromEmail(user?.email);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-6">
        <Link href="/" className="min-w-0">
          <span className="gradient-text gradient-text-shine block truncate text-lg font-black tracking-tight sm:text-xl md:text-2xl">
            The Grey Project
          </span>
          <span className="brand-subtitle gradient-text gradient-text-shine opacity-90">
            UNCOVERING THE GREY IN AI
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
            Home
          </Link>
          <Link href="/learning" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
            Learning paths
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
            Blog
          </Link>
          <Link href="/feedback" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
            Feedback
          </Link>
          {user && (
            <Link href="/account" className="text-sm font-medium text-slate-300 transition hover:text-cyan-300">
              Profile
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300 lg:hidden"
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
          </Link>
          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="hidden rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300 lg:inline-flex lg:px-4"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="hidden rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_16px_rgba(34,211,238,0.35)] lg:inline-flex lg:px-5 lg:py-2.5"
              >
                Register
              </Link>
            </>
          )}
          {!loading && user && (
            <>
              <GreyPointsNavPill />
              <span className="hidden text-sm font-semibold text-slate-200 lg:inline">
                Hi, {firstName}
              </span>
              <Link
                href="/learning"
                className="hidden rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(34,211,238,0.35)] lg:inline-flex"
              >
                Continue
              </Link>
              <Link
                href="/logout"
                className="hidden rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-red-400/50 hover:text-red-300 lg:inline-flex"
              >
                Logout
              </Link>
            </>
          )}

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-200 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
          {user && (
            <div className="flex items-center justify-between gap-3 px-4 pb-2">
              <p className="text-sm font-semibold text-slate-200">
                Hi, {firstName}
              </p>
              <GreyPointsNavPill />
            </div>
          )}
          <Link
            href="/"
            className="block rounded-xl px-4 py-3 font-medium text-slate-200 hover:bg-slate-900"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/learning"
            className="block rounded-xl px-4 py-3 font-medium text-slate-200 hover:bg-slate-900"
            onClick={() => setOpen(false)}
          >
            Learning paths
          </Link>
          <Link
            href="/blog"
            className="block rounded-xl px-4 py-3 font-medium text-slate-200 hover:bg-slate-900"
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/feedback"
            className="block rounded-xl px-4 py-3 font-medium text-slate-200 hover:bg-slate-900"
            onClick={() => setOpen(false)}
          >
            Feedback
          </Link>
          {user && (
            <Link
              href="/account"
              className="block rounded-xl px-4 py-3 font-medium text-slate-200 hover:bg-slate-900"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
          )}
          {!user ? (
            <>
              <Link
                href="/login"
                className="mt-2 block rounded-xl border border-slate-700 px-4 py-3 text-center font-semibold text-slate-200"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="mt-2 block rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-3 text-center font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              href="/logout"
              className="mt-2 block rounded-xl border border-red-500/30 px-4 py-3 text-center font-semibold text-red-300"
              onClick={() => setOpen(false)}
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

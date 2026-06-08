"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import GreyPointsNavPill from "@/components/learning/grey-points-nav-pill";
import { firstNameFromEmail } from "@/lib/utils/name";

export default function SiteNavbar() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const firstName = firstNameFromEmail(user?.email);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-6">
        <Link href="/" className="min-w-0">
          <span className="block truncate text-lg font-black tracking-tight text-violet-600 sm:text-xl md:text-2xl">
            The Grey Project
          </span>
          <span className="mt-0.5 block text-[8px] uppercase tracking-[0.28em] text-slate-500 sm:text-[9px] md:text-[10px]">
            UNCOVERING THE GREY IN AI
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/learning" className="text-sm font-medium text-slate-600 hover:text-violet-600">
            Learning paths
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-violet-600">
            Blog
          </Link>
          <Link href="/feedback" className="text-sm font-medium text-slate-600 hover:text-violet-600">
            Feedback
          </Link>
          {user && (
            <Link href="/account" className="text-sm font-medium text-slate-600 hover:text-violet-600">
              Profile
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 sm:px-4"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 sm:px-4 lg:px-5 lg:py-2.5"
              >
                Register
              </Link>
            </>
          )}
          {!loading && user && (
            <>
              <GreyPointsNavPill />
              <span className="hidden text-sm font-semibold text-slate-700 lg:inline">
                Hi, {firstName}
              </span>
              <Link
                href="/learning"
                className="hidden rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 lg:inline-flex"
              >
                Continue
              </Link>
              <Link
                href="/logout"
                className="hidden rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600 lg:inline-flex"
              >
                Logout
              </Link>
            </>
          )}

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          {user && (
            <div className="flex items-center justify-between gap-3 px-4 pb-2">
              <p className="text-sm font-semibold text-slate-700">
                Hi, {firstName}
              </p>
              <GreyPointsNavPill />
            </div>
          )}
          <Link href="/learning" className="block rounded-xl px-4 py-3 font-medium" onClick={() => setOpen(false)}>
            Learning paths
          </Link>
          <Link href="/blog" className="block rounded-xl px-4 py-3 font-medium" onClick={() => setOpen(false)}>
            Blog
          </Link>
          <Link href="/feedback" className="block rounded-xl px-4 py-3 font-medium" onClick={() => setOpen(false)}>
            Feedback
          </Link>
          {user && (
            <Link href="/account" className="block rounded-xl px-4 py-3 font-medium" onClick={() => setOpen(false)}>
              Profile
            </Link>
          )}
          {!user ? (
            <>
              <Link
                href="/login"
                className="mt-2 block rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold text-slate-800"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="mt-2 block rounded-xl bg-violet-600 px-4 py-3 text-center font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              href="/logout"
              className="mt-2 block rounded-xl border border-red-200 px-4 py-3 text-center font-semibold text-red-600"
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

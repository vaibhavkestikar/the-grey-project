"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
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
          <Link href="/try/prediction" className="text-sm font-medium text-slate-600 hover:text-violet-600">
            Start Learning
          </Link>
          <Link href="/learning" className="text-sm font-medium text-slate-600 hover:text-violet-600">
            Learning paths
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-violet-600">
            Blog
          </Link>
          {user && (
            <Link href="/account" className="text-sm font-medium text-slate-600 hover:text-violet-600">
              Profile
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:text-violet-600"
              >
                Login
              </Link>
              <Link
                href="/try/prediction"
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 hover:bg-violet-700"
              >
                Start Learning
              </Link>
            </>
          )}
          {!loading && user && (
            <>
              <span className="text-sm font-semibold text-slate-700">
                Hi, {firstName}
              </span>
              <Link
                href="/learning"
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Continue
              </Link>
              <Link
                href="/logout"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
              >
                Logout
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          {user && (
            <p className="px-4 pb-2 text-sm font-semibold text-slate-700">
              Hi, {firstName}
            </p>
          )}
          <Link href="/try/prediction" className="block rounded-xl px-4 py-3 font-medium" onClick={() => setOpen(false)}>
            Start Learning
          </Link>
          <Link href="/learning" className="block rounded-xl px-4 py-3 font-medium" onClick={() => setOpen(false)}>
            Learning paths
          </Link>
          <Link href="/blog" className="block rounded-xl px-4 py-3 font-medium" onClick={() => setOpen(false)}>
            Blog
          </Link>
          {user && (
            <Link href="/account" className="block rounded-xl px-4 py-3 font-medium" onClick={() => setOpen(false)}>
              Profile
            </Link>
          )}
          {!user ? (
            <Link
              href="/register"
              className="mt-2 block rounded-xl bg-violet-600 px-4 py-3 text-center font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
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

"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";

export default function Navbar() {

  const {
    user,
    loading,
  } = useAuth();

  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (

    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

        {/* LEFT */}

        <Link
          href="/"
          className="min-w-0"
        >

          <h1 className="text-2xl font-black leading-none tracking-tight text-violet-600 md:text-3xl">
            The Grey Project
          </h1>

          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-slate-500 md:text-[11px]">
            UNCOVERING THE GREY IN AI
          </p>

        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-8 md:flex">

          <Link href="/" className="font-medium text-slate-600 hover:text-violet-600">
            Home
          </Link>

          <Link href="/learning" className="font-medium text-slate-600 hover:text-violet-600">
            Learning
          </Link>

          <Link href="/blog" className="font-medium text-slate-600 hover:text-violet-600">
            Blog
          </Link>

          <Link href="/about" className="font-medium text-slate-600 hover:text-violet-600">
            About
          </Link>

        </nav>

        {/* RIGHT */}

        <div className="hidden items-center gap-4 md:flex">

          {!loading && !user && (

            <>

              <Link
                href="/login"
                className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white"
              >
                Get Started
              </Link>

            </>

          )}

          {!loading && user && (

            <Link
              href="/logout"
              className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium"
            >
              Logout
            </Link>

          )}

        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 md:hidden"
        >

          {mobileMenu
            ? <X size={28} />
            : <Menu size={28} />}

        </button>

      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="border-t border-slate-200 bg-white p-6 md:hidden">

          <div className="flex flex-col gap-4">

            <Link href="/" onClick={() => setMobileMenu(false)}>
              Home
            </Link>

            <Link href="/learning" onClick={() => setMobileMenu(false)}>
              Learning
            </Link>

            <Link href="/blog" onClick={() => setMobileMenu(false)}>
              Blog
            </Link>

            <Link href="/about" onClick={() => setMobileMenu(false)}>
              About
            </Link>

            {!loading && !user && (

              <>
                <Link href="/login">
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-violet-600 px-5 py-3 text-center font-semibold text-white"
                >
                  Get Started
                </Link>
              </>

            )}

            {!loading && user && (

              <Link
                href="/logout"
                className="rounded-xl border border-slate-200 px-5 py-3 text-center"
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
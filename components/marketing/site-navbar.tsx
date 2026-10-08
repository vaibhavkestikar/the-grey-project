"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Menu, X } from "lucide-react";

import { WORKSHOP_INQUIRY_HREF } from "@/data/workshops";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/workshops", label: "Workshops" },
  { href: "/for-colleges", label: "For Colleges" },
  { href: "/blog", label: "Blog" },
  { href: "/feedback", label: "Feedback" },
] as const;

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);

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
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300 lg:hidden"
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
          </Link>
          <Link
            href={WORKSHOP_INQUIRY_HREF}
            className="hidden min-h-[44px] items-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(34,211,238,0.35)] lg:inline-flex"
          >
            Book a workshop
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 text-slate-200 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block min-h-[48px] rounded-xl px-4 py-3 font-medium text-slate-200 hover:bg-slate-900"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={WORKSHOP_INQUIRY_HREF}
            className="mt-2 block min-h-[48px] rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-3 text-center font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Book a workshop
          </Link>
        </div>
      ) : null}
    </header>
  );
}

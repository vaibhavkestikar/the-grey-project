import type { Metadata } from "next";
import Link from "next/link";

import SiteFooter from "@/components/marketing/site-footer";
import SiteNavbar from "@/components/marketing/site-navbar";
import { WORKSHOP_INQUIRY_HREF, WORKSHOP_SESSIONS } from "@/data/workshops";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Two live sessions for engineering colleges: Theory & Industry Landscape, then Agentic AI Project Build.",
};

export default function WorkshopsPage() {
  return (
    <main className="site-page">
      <SiteNavbar />
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Workshops</p>
        <h1 className="mt-3 text-3xl font-black text-slate-50 md:text-5xl">
          What we run on campus
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          One workshop, two sessions. Theory first so the room shares a map of the industry. Then a
          build session so students leave with a project and a certificate of completion.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {WORKSHOP_SESSIONS.map((session) => (
            <Link
              key={session.slug}
              href={session.href}
              className="home-card block p-5 transition hover:border-cyan-400/40 md:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                {session.eyebrow}
              </p>
              <h2 className="mt-2 text-xl font-black text-slate-50">{session.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{session.summary}</p>
              <p className="mt-4 text-sm font-semibold text-cyan-200">Session details →</p>
            </Link>
          ))}
        </div>
        <Link
          href={WORKSHOP_INQUIRY_HREF}
          className="btn-home-cta mt-10 inline-flex min-h-[48px] w-full items-center justify-center sm:w-auto"
        >
          Book a workshop for your college
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}

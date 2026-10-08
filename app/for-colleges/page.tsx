import type { Metadata } from "next";
import Link from "next/link";

import CollegeInquiryForm from "@/components/marketing/college-inquiry-form";
import SiteFooter from "@/components/marketing/site-footer";
import SiteNavbar from "@/components/marketing/site-navbar";
import { WORKSHOP_SESSIONS } from "@/data/workshops";

export const metadata: Metadata = {
  title: "For Colleges",
  description:
    "Book a live AI workshop for your engineering college. Theory plus a project build. Flat fee, not per-student. Inquiry form for TPOs, clubs, and admins.",
};

export default function ForCollegesPage() {
  return (
    <main className="site-page">
      <SiteNavbar />
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
          For TPOs, clubs, and admins
        </p>
        <h1 className="mt-3 text-3xl font-black text-slate-50 md:text-5xl">
          Bring a live AI workshop to campus
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          We run a paid, in-person workshop for engineering colleges. Session one maps the industry.
          Session two is a project students can show. You get a single flat fee — not a per-student
          checkout.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-50">Format</h2>
          <ol className="mt-4 space-y-4">
            {WORKSHOP_SESSIONS.map((session, i) => (
              <li
                key={session.slug}
                className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {i + 1}. {session.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{session.summary}</p>
                <Link href={session.href} className="mt-3 inline-block text-sm font-semibold text-cyan-200">
                  Full outline →
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-50">Pricing</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
            Quoted as a <strong className="text-slate-100">flat workshop fee</strong> for the college
            (batch size agreed in advance). Not a per-student product. Send an inquiry with headcount
            and dates for a quote.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-50">What colleges get</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
            <li>Live delivery of both sessions, on an agreed campus date</li>
            <li>Certificate of completion for attending students (resume / LinkedIn)</li>
            <li>
              Logo-use rights for the college to mention the workshop in placement communications —
              details in the booking note
            </li>
            <li>Sample student outcomes from the project session (projects, not scores)</li>
          </ul>
          <p className="mt-4 rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-500">
            [testimonial pending first workshop]
          </p>
        </section>

        <section id="inquiry" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-black text-slate-50">Inquiry</h2>
          <p className="mt-2 text-sm text-slate-400">
            Name, college, role, headcount, and preferred dates. We reply with availability and a
            fee.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5 md:p-6">
            <CollegeInquiryForm />
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

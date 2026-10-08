import type { Metadata } from "next";
import Link from "next/link";

import FounderSection from "@/components/marketing/founder-section";
import HomeFeedbackSection from "@/components/marketing/home/home-feedback-section";
import HomeHero from "@/components/marketing/home-hero";
import SectionDivider from "@/components/marketing/home/section-divider";
import SiteFooter from "@/components/marketing/site-footer";
import SiteNavbar from "@/components/marketing/site-navbar";
import { WORKSHOP_INQUIRY_HREF, WORKSHOP_SESSIONS } from "@/data/workshops";

export const metadata: Metadata = {
  title: "Live AI Workshops for Engineering Colleges",
  description:
    "Paid, in-person AI workshops for engineering colleges: industry landscape plus a hands-on agentic project. Flat fee. Certificate of completion.",
  openGraph: {
    title: "The Grey Project: Live AI workshops for engineering colleges",
    description:
      "Hands-on AI education delivered live to campus. Book a workshop for your college.",
  },
};

export default function HomePage() {
  return (
    <main className="site-page">
      <SiteNavbar />
      <HomeHero />
      <SectionDivider />

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
            The format
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-50 md:text-4xl">
            Two sessions. One workshop.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            For placement cells, student clubs, and college admins. Students get a project and a
            certificate of completion — not a login and a point balance.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {WORKSHOP_SESSIONS.map((session) => (
              <Link
                key={session.slug}
                href={session.href}
                className="home-card block p-5 transition hover:border-cyan-400/40 md:p-6"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  {session.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-black text-slate-50">{session.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{session.summary}</p>
                <p className="mt-4 text-sm font-semibold text-cyan-200">See the session →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-slate-50 md:text-3xl">Who this is for</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "TPOs and placement cells",
                text: "A campus workshop you can schedule, price as a flat fee, and report as a skills outcome.",
              },
              {
                title: "Student clubs and faculty",
                text: "A structured day that does not depend on students finishing a self-paced course.",
              },
              {
                title: "Engineering students",
                text: "Show up, build, leave with a project and a certificate of completion for LinkedIn.",
              },
            ].map((item) => (
              <div key={item.title} className="home-card p-5">
                <h3 className="text-base font-black text-slate-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
          <Link
            href={WORKSHOP_INQUIRY_HREF}
            className="btn-home-cta mt-8 inline-flex min-h-[48px] w-full items-center justify-center sm:w-auto"
          >
            Book a workshop for your college
          </Link>
        </div>
      </section>

      <FounderSection />
      <HomeFeedbackSection />
      <SiteFooter />
    </main>
  );
}

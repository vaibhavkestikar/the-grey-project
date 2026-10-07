import Link from "next/link";
import type { Metadata } from "next";

import SiteNavbar from "@/components/marketing/site-navbar";
import SiteFooter from "@/components/marketing/site-footer";
import GeneralFeedbackForm from "@/components/feedback/general-feedback-form";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share notes on The Grey Project campus workshops — format, timing, and what would help your college.",
};

export default function FeedbackPage() {
  return (
    <main className="site-page">
      <SiteNavbar />
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
        <Link href="/" className="text-sm font-medium text-slate-500 hover:text-cyan-400">
          ← Back home
        </Link>
        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-cyan-400">Feedback</p>
        <h1 className="mt-2 text-4xl font-black text-slate-50 md:text-5xl">Workshop notes</h1>
        <p className="mt-4 text-lg text-slate-400">
          If you have run, hosted, or attended a session — or you are considering one for your
          campus — tell us what would make it worth the time.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Direct is useful. Case studies will be published here once we have completed workshops.
        </p>
        <div className="mt-10">
          <GeneralFeedbackForm />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}

import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";
import GeneralFeedbackForm from "@/components/feedback/general-feedback-form";

export const metadata = {
  title: "Feedback",
  description: "Tell us what is working. Help a solo builder make The Grey Project better.",
};

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <SiteNavbar />
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
        <Link href="/" className="text-sm font-medium text-slate-500 hover:text-violet-600">
          ← Back home
        </Link>
        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-violet-600">
          Feedback
        </p>
        <h1 className="mt-2 text-4xl font-black text-slate-950 md:text-5xl">
          Talk to the human
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          The Grey Project is early, small, and built by one person who genuinely wants this to
          work. Your answers help calculate NPS, track what lands, and decide what ships next.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Brutal honesty welcome. Gentle delivery appreciated.
        </p>
        <div className="mt-10">
          <GeneralFeedbackForm />
        </div>
      </div>
    </main>
  );
}

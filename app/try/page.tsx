import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";
import PathLessonList from "@/components/learning/path-lesson-list";
import LearningPathPill from "@/components/learning/learning-path-pill";
import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
} from "@/data/curious-builders-path";

export default function TryPage() {
  const totalMinutes = CURIOUS_BUILDERS_LESSONS.slice(0, 2).reduce(
    (s, l) => s + l.durationMinutes,
    0
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <SiteNavbar />

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Link href="/" className="text-sm font-medium text-slate-500 hover:text-violet-600">
          ← Back home
        </Link>

        <LearningPathPill className="mt-6" />
        <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
          {CURIOUS_BUILDERS_PATH.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Two free lessons. About {totalMinutes} minutes. Built for people already
          using AI tools daily who want to make better decisions, not become ML engineers.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Who</p>
            <p className="mt-2 text-sm text-slate-700">Founders, PMs, analysts, creators, and builders.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Why</p>
            <p className="mt-2 text-sm text-slate-700">Turn daily AI usage into clear product intuition.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Outcomes</p>
            <p className="mt-2 text-sm text-slate-700">Stronger prompts, better trade offs, fewer production surprises.</p>
          </div>
        </div>

        <div className="mt-10">
          <PathLessonList
            lessons={CURIOUS_BUILDERS_LESSONS.slice(0, 2)}
            baseHref="/try"
          />
        </div>

        <div className="premium-card mt-12 p-8 text-center">
          <p className="font-semibold text-slate-900">
            Liked what you saw? Save progress and unlock all 7 lessons.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Still free. Still no credit card. Still no &ldquo;limited time offer&rdquo; nonsense.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-flex rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
          >
            Create free account
          </Link>
        </div>
      </div>
    </main>
  );
}

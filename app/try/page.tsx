import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";
import PathLessonList from "@/components/learning/path-lesson-list";
import { getFreeLessons, CURIOUS_BUILDERS_PATH } from "@/data/curious-builders-path";

export default function TryPage() {
  const freeLessons = getFreeLessons();
  const totalMinutes = freeLessons.reduce((s, l) => s + l.durationMinutes, 0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <SiteNavbar />

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Link href="/" className="text-sm font-medium text-slate-500 hover:text-violet-600">
          ← Back home
        </Link>

        <span className="mt-6 inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800">
          No login required
        </span>

        <h1 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
          Free {CURIOUS_BUILDERS_PATH.title} lessons
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          About {totalMinutes} minutes of interactive learning. Same engine as the full path, so you can try before you sign up.
        </p>

        <div className="mt-10">
          <PathLessonList lessons={freeLessons} baseHref="/try" showFreeBadge />
        </div>

        <div className="premium-card mt-12 p-8 text-center">
          <p className="font-semibold text-slate-900">Want the full path + saved progress?</p>
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

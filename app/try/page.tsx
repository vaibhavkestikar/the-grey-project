import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";
import PathLessonList from "@/components/learning/path-lesson-list";
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

        <h1 className="mt-6 text-4xl font-black text-slate-950 md:text-5xl">
          {CURIOUS_BUILDERS_PATH.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Start with interactive lessons. About {totalMinutes} minutes to build
          real intuition before you create an account.
        </p>

        <div className="mt-10">
          <PathLessonList
            lessons={CURIOUS_BUILDERS_LESSONS.slice(0, 2)}
            baseHref="/try"
          />
        </div>

        <div className="premium-card mt-12 p-8 text-center">
          <p className="font-semibold text-slate-900">
            Ready for the full path and saved progress?
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

import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";
import PathLessonList from "@/components/learning/path-lesson-list";
import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
} from "@/data/curious-builders-path";

export default function CuriousBuildersPathPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <SiteNavbar />
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Link href="/learning" className="text-sm font-medium text-slate-500 hover:text-violet-600">
          ← All learning paths
        </Link>
        <h1 className="mt-6 text-4xl font-black text-slate-950">
          {CURIOUS_BUILDERS_PATH.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{CURIOUS_BUILDERS_PATH.subtitle}</p>
        <div className="mt-10">
          <PathLessonList
            lessons={CURIOUS_BUILDERS_LESSONS}
            baseHref="/learning/curious-builders"
            showFreeBadge
          />
        </div>
      </div>
    </main>
  );
}

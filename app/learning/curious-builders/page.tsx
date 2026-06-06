import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";
import PathLessonList from "@/components/learning/path-lesson-list";
import LearningPathPill from "@/components/learning/learning-path-pill";
import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
} from "@/data/curious-builders-path";

export default function CuriousBuildersPathPage() {
  const outcomes = [
    "Explain AI as prediction and map that model to real product features.",
    "Choose rules versus learning with clear trade offs in messy scenarios.",
    "Write stronger prompts with reliable structure instead of guesswork.",
    "Understand tokens and embeddings and their effect on cost, speed, and context.",
    "Handle hallucinations using grounding, refusal behavior, and better system design.",
    "Think end to end: frame, evaluate, ship, monitor, and iterate AI features.",
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <SiteNavbar />
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Link href="/learning" className="text-sm font-medium text-slate-500 hover:text-violet-600">
          ← All learning paths
        </Link>
        <LearningPathPill className="mt-6" />
        <h1 className="mt-3 text-4xl font-black text-slate-950">
          {CURIOUS_BUILDERS_PATH.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{CURIOUS_BUILDERS_PATH.subtitle}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Who this is for</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Founders, PMs, analysts, creators, and curious builders using AI tools daily.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Why this exists</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Most people can use AI tools, but cannot explain or evaluate how they work.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">What changes after</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              You make clearer AI product decisions and ship features with fewer surprises.
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-700">
            What you will be able to do
          </p>
          <ul className="mt-4 space-y-3">
            {outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 text-slate-800">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                <span className="leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        <details className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 group">
          <summary className="cursor-pointer list-none rounded-xl px-2 py-2 text-left font-bold text-slate-900 marker:content-none">
            <span className="group-open:hidden">
              Show chapters ({CURIOUS_BUILDERS_PATH.lessonCount})
            </span>
            <span className="hidden group-open:inline">
              Hide chapters ({CURIOUS_BUILDERS_PATH.lessonCount})
            </span>
          </summary>
          <div className="mt-4">
            <PathLessonList
              lessons={CURIOUS_BUILDERS_LESSONS}
              baseHref="/learning/curious-builders"
            />
          </div>
        </details>
      </div>
    </main>
  );
}

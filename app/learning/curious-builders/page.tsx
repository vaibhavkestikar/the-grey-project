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
    "Explain AI as prediction — and map that one idea to every product feature you will ever evaluate.",
    "Choose rules versus learning with clear trade-offs, not gut feel.",
    "Write prompts that are structured, testable, and ten times more reliable.",
    "Understand token economics and their direct effect on cost, speed, and context limits.",
    "Explain embedding-based search and why it beats keyword matching.",
    "Recognise hallucinations, design grounding, and build honest refusal into any AI feature.",
    "Walk the full ML workflow — frame, data, train, evaluate, deploy, monitor — and know the failure mode at each stage.",
  ];

  const howItWorks = [
    {
      icon: "✦",
      label: "Interactive every step",
      detail:
        "Every lesson is a sequence of steps — not a video, not a wall of text. Each step is a concept, an interaction, a checkpoint, or a Python sandbox.",
    },
    {
      icon: "🐍",
      label: "Python runs in your browser",
      detail:
        "No setup. No environment. You write spam filters, simulate data leakage, and run the sigmoid function inside every AI neuron — in code you can edit.",
    },
    {
      icon: "✓",
      label: "Checkpoints that sting",
      detail:
        "Wrong answers don't send you back. They show you exactly why you were wrong, with the insight that makes the right answer stick.",
    },
    {
      icon: "⚡",
      label: "Apply block in every lesson",
      detail:
        "Every lesson ends with a role-specific action for PMs, founders, builders, and analysts — something you can do today, not someday.",
    },
  ];

  return (
    <main className="site-page">
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

        {/* WHO / WHY / WHAT */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Who this is for</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Founders, PMs, analysts, and curious builders who use AI tools daily and want clear intuition, not hype.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Why this exists</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Most people can use AI tools. Very few can explain, evaluate, or improve them. This path closes that gap.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300">What changes after</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              You make clearer AI product decisions, write better prompts, and catch hallucination risks before they ship.
            </p>
          </div>
        </div>

        {/* HOW IT WORKS DIFFERENTLY */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-900 bg-slate-950 p-6 text-white md:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400">
            How this path works
          </p>
          <h2 className="mt-2 text-xl font-black text-white md:text-2xl">
            Learn by doing — not by watching
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            I built this because most AI courses feel written by people who have never debugged a model at 2 a.m.
            Every lesson is interactive. Every concept has Python code you can run and edit — right here, in your browser,
            no setup required.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {howItWorks.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-lg leading-none">{item.icon}</p>
                <p className="mt-3 text-sm font-bold text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-relaxed text-slate-400">
            <span className="font-semibold text-slate-200">One lesson flow: </span>
            Read for 90 seconds → run actual Python in the browser → drag a slider → answer to continue → apply to your work today.
            No video. No passive consumption. Every step is something you do.
          </p>
        </section>

        {/* OUTCOMES */}
        <section className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-700">
            What you will be able to do after
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

        {/* LESSON LIST */}
        <details className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 group">
          <summary className="cursor-pointer list-none rounded-xl px-2 py-2 text-left font-bold text-slate-900 marker:content-none">
            <span className="group-open:hidden">
              Show lessons ({CURIOUS_BUILDERS_PATH.lessonCount} lessons + certificate)
            </span>
            <span className="hidden group-open:inline">
              Hide lessons ({CURIOUS_BUILDERS_PATH.lessonCount} lessons + certificate)
            </span>
          </summary>
          <div className="mt-4">
            <PathLessonList
              lessons={CURIOUS_BUILDERS_LESSONS}
              baseHref="/learning/curious-builders"
              pathId={CURIOUS_BUILDERS_PATH.id}
              showCertificate
            />
          </div>
        </details>
      </div>
    </main>
  );
}

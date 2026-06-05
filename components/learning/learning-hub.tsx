import Link from "next/link";

import LearningPathsView from "@/components/learning/learning-paths-view";

export default function LearningHub() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-14 md:px-6 md:py-20">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">
            Learn AI. Never Forget.
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Your learning paths
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-600">
            Interactive arcs you actually remember: hook → visual → play →
            checkpoint → build → reflect.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/try/prediction"
              className="rounded-2xl bg-violet-600 px-8 py-4 text-center font-semibold text-white shadow-lg"
            >
              Start Learning
            </Link>
            <Link
              href="/learning/curious-builders"
              className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-center font-semibold text-slate-800"
            >
              Open live learning path
            </Link>
          </div>
        </div>
      </section>

      <LearningPathsView collapsibleLive />
    </>
  );
}

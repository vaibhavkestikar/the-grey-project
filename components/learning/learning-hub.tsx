import LearningPathsView from "@/components/learning/learning-paths-view";
import PathMetaPills from "@/components/learning/path-meta-pills";
import { CURIOUS_BUILDERS_PILLS } from "@/types/paths";

export default function LearningHub() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-14 md:px-6 md:py-20">
        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />
        <div className="pointer-events-none absolute -right-8 top-16 hidden h-24 w-24 rotate-12 rounded-2xl border-2 border-dashed border-violet-200 md:block" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <span className="inline-flex -rotate-1 rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-white shadow-md">
            Learn AI. Never Forget.
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            AI learning paths
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-600">
            Interactive lessons for builders who ship AI, not just collect certificates.
          </p>
          <p className="mt-2 max-w-2xl text-base text-slate-500">
            Start with Curious Builders (free). Stack more paths when you are ready.
          </p>
          <PathMetaPills labels={[...CURIOUS_BUILDERS_PILLS]} className="mt-5" />
        </div>
      </section>

      <LearningPathsView collapsibleLive />
    </>
  );
}

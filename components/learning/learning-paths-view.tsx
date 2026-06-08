import LivePathCard from "@/components/learning/live-path-card";
import ComingSoonPathCard from "@/components/growth/coming-soon-path-card";
import FirstBuildSpotlight from "@/components/growth/first-build-spotlight";
import { AUDIENCE_PATHS } from "@/types/paths";

type Props = {
  collapsibleLive?: boolean;
  compact?: boolean;
  heading?: string;
  subheading?: string;
};

export default function LearningPathsView({
  collapsibleLive = true,
  compact = false,
  heading = "Learning Paths",
  subheading = "Stackable AI paths with interactive lessons, Grey Points, and skill badges. Curious Builders is free. Start today.",
}: Props) {
  const comingSoon = AUDIENCE_PATHS.filter(
    (p) => p.status !== "live" && !p.featured
  );

  return (
    <section className="relative px-4 py-16 md:px-6 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-8 h-32 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <span className="inline-flex -rotate-1 rounded-lg bg-slate-950 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg">
            Stackable paths
          </span>
          <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{subheading}</p>
          {!compact && (
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Earn Grey Points",
                "Collect skill badges",
                "Redeem practical PDFs",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <LivePathCard collapsible={collapsibleLive} compact={compact} />
        </div>

        <div className="mt-14">
          <FirstBuildSpotlight />
        </div>

        {comingSoon.length > 0 && (
          <>
            <div className="mt-14">
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-800">
                On the roadmap
              </span>
              <h3 className="mt-3 text-xl font-black text-slate-900 md:text-2xl">
                More paths cooking
              </h3>
              <p className="mt-2 max-w-2xl text-slate-600">
                Production AI, agentic workflows, and strategy. First 3 lessons free on each path.
              </p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {comingSoon.map((path, index) => (
                <ComingSoonPathCard
                  key={path.id}
                  title={path.title}
                  tagline={path.tagline}
                  description={path.description}
                  who={path.who}
                  why={path.why}
                  outcomes={path.outcomes}
                  waitlistKey={path.waitlistKey}
                  pathNumber={index + 3}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

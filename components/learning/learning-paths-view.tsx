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
    <section className="relative px-4 py-14 md:px-6 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-8 h-32 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <span className="inline-flex rounded-lg bg-brand-dark px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
            Stackable paths
          </span>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">
            {subheading}
          </p>
          {!compact && (
            <div className="mt-4 flex flex-wrap gap-2">
              {["Grey Points", "Skill badges", "Practical PDFs"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-brand-primary/25 bg-white px-3 py-1 text-xs font-semibold text-brand-dark"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <LivePathCard collapsible={collapsibleLive} compact={compact} />
          <FirstBuildSpotlight />

          {comingSoon.length > 0 && (
            <>
              <div className="pt-4">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
                  On the roadmap
                </span>
                <h3 className="mt-3 text-xl font-black">
                  More paths cooking
                </h3>
                <p className="mt-2 text-base text-ink-muted">
                  First 3 lessons free on each path when they launch.
                </p>
              </div>

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
            </>
          )}
        </div>
      </div>
    </section>
  );
}

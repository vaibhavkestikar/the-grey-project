import LivePathCard from "@/components/learning/live-path-card";
import ComingSoonPathCard from "@/components/growth/coming-soon-path-card";
import FreshersSpotlight from "@/components/growth/freshers-spotlight";
import { AUDIENCE_PATHS } from "@/types/paths";

type Props = {
  collapsibleLive?: boolean;
  heading?: string;
  subheading?: string;
};

export default function LearningPathsView({
  collapsibleLive = true,
  heading = "Learning Paths",
  subheading = "Curious Builders is live for teams already using AI daily who want clearer decisions, stronger prompts, and more reliable AI features. Freshers launches soon with limited free seats.",
}: Props) {
  const comingSoon = AUDIENCE_PATHS.filter(
    (p) => p.status !== "live" && !p.featured
  );

  return (
    <section className="px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black text-slate-950 md:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{subheading}</p>

        <div className="mt-10">
          <LivePathCard collapsible={collapsibleLive} />
        </div>

        <div className="mt-14">
          <FreshersSpotlight />
        </div>

        {comingSoon.length > 0 && (
          <>
            <h3 className="mt-14 text-xl font-black text-slate-900">
              More paths on the way
            </h3>
            <p className="mt-2 text-slate-600">
              Built for specific roles. Same interactive energy. Zero buzzword bingo.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoon.map((path) => (
                <ComingSoonPathCard
                  key={path.id}
                  title={path.title}
                  description={path.description}
                  waitlistKey={path.waitlistKey}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

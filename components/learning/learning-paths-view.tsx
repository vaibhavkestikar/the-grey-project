import LivePathCard from "@/components/learning/live-path-card";
import ComingSoonPathCard from "@/components/growth/coming-soon-path-card";
import { AUDIENCE_PATHS } from "@/types/paths";

type Props = {
  collapsibleLive?: boolean;
  heading?: string;
  subheading?: string;
};

export default function LearningPathsView({
  collapsibleLive = true,
  heading = "Learning Paths",
  subheading = "One live learning path today. More unlock as we ship them. Join a waitlist to get notified.",
}: Props) {
  const comingSoon = AUDIENCE_PATHS.filter((p) => p.status !== "live");

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

        <h3 className="mt-14 text-xl font-black text-slate-900">
          Coming soon
        </h3>
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
      </div>
    </section>
  );
}

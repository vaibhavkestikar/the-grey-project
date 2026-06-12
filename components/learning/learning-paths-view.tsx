"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import LivePathCard from "@/components/learning/live-path-card";
import ComingSoonPathCard from "@/components/growth/coming-soon-path-card";
import FirstBuildSpotlight from "@/components/growth/first-build-spotlight";
import SectionReveal from "@/components/marketing/home/section-reveal";
import TiltCard from "@/components/marketing/home/tilt-card";
import { AUDIENCE_PATHS } from "@/types/paths";

type Props = {
  collapsibleLive?: boolean;
  compact?: boolean;
  showStatPills?: boolean;
  heading?: string;
  subheading?: string;
  /** @deprecated All pages now use the dark theme; kept for API compatibility. */
  variant?: "default" | "homepage";
};

const STAT_PILLS = ["Grey Points", "Skill badges", "Certificate"];

function StatPill({ label, index }: { label: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="home-stat-pill"
    >
      <span className="relative inline-flex h-6 w-6 items-center justify-center">
        <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="12" cy="12" r="10" fill="rgba(34,211,238,0.12)" />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.15, duration: 0.8, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 3px rgba(34,211,238,0.8))" }}
          />
        </svg>
        <span className="relative text-[10px] font-black text-cyan-300">{index + 1}</span>
      </span>
      {label}
    </motion.span>
  );
}

export default function LearningPathsView({
  collapsibleLive = true,
  compact = false,
  showStatPills,
  heading = "Learning Paths",
  subheading = "Stackable AI paths with interactive lessons, Grey Points, and skill badges. Curious Builders is free. Start today.",
}: Props) {
  const pillsVisible = showStatPills ?? !compact;
  const comingSoon = AUDIENCE_PATHS.filter(
    (p) => p.status !== "live" && !p.featured
  );

  const wrapCard = (node: ReactNode) => <TiltCard>{node}</TiltCard>;

  return (
    <section className="relative px-4 py-14 md:px-6 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-8 h-40 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <SectionReveal className="relative">
          <span className="inline-flex rounded-lg border border-cyan-500/30 bg-slate-900/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
            Stackable paths
          </span>
          <h2 className="mt-4 text-3xl font-black text-slate-50 md:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-400 md:text-lg">
            {subheading}
          </p>
          {pillsVisible && (
            <div className="mt-4 flex flex-wrap gap-2">
              {STAT_PILLS.map((pill, index) => (
                <StatPill key={pill} label={pill} index={index} />
              ))}
            </div>
          )}
        </SectionReveal>

        <div className="mt-8 flex flex-col gap-6">
          {wrapCard(<LivePathCard collapsible={collapsibleLive} compact={compact} />)}
          {wrapCard(<FirstBuildSpotlight />)}

          {comingSoon.length > 0 && (
            <>
              <SectionReveal className="pt-4">
                <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-300">
                  On the roadmap
                </span>
                <h3 className="mt-3 text-xl font-black text-slate-50">
                  More paths cooking
                </h3>
                <p className="mt-2 text-base text-slate-400">
                  First 3 lessons free on each path when they launch.
                </p>
              </SectionReveal>

              {comingSoon.map((path, index) =>
                wrapCard(
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
                )
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

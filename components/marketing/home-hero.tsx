"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Scale,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import LlmPipelineDemo from "@/components/playgrounds/llm-pipeline-demo";
import VantaNetBackground from "@/components/marketing/vanta-net-background";

type UspItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  card: string;
  iconWrap: string;
  accent: string;
  wide?: boolean;
};

const USP_ITEMS: UspItem[] = [
  {
    icon: Trophy,
    title: "Gamified progress",
    text: "Grey Points, leaderboards, and code you can flex on LinkedIn.",
    card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-green-50/80",
    iconWrap: "bg-emerald-600 text-white shadow-md shadow-emerald-300/50",
    accent: "text-emerald-800",
  },
  {
    icon: Scale,
    title: "Balanced learning",
    text: "Practical decisions plus code. Not a 600-slide PDF.",
    card: "border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-sky-50/80",
    iconWrap: "bg-indigo-600 text-white shadow-md shadow-indigo-300/50",
    accent: "text-indigo-700",
  },
  {
    icon: Users,
    title: "Real pressure",
    text: "Job-like chaos: stakeholders, budgets, latency, and oh-no incidents.",
    card: "border-violet-200/80 bg-gradient-to-br from-violet-50 to-purple-50/80",
    iconWrap: "bg-violet-600 text-white shadow-md shadow-violet-300/50",
    accent: "text-violet-700",
  },
  {
    icon: BarChart3,
    title: "Business impact",
    text: "Variables that show what your choice actually costs. Ouch.",
    card: "border-cyan-200/80 bg-gradient-to-br from-cyan-50 to-teal-50/80",
    iconWrap: "bg-cyan-600 text-white shadow-md shadow-cyan-300/50",
    accent: "text-cyan-800",
  },
  {
    icon: Briefcase,
    title: "Built for shippers",
    text: "For students, developers, founders, PMs, and builders shipping real AI.",
    card: "border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/70",
    iconWrap: "bg-amber-600 text-white shadow-md shadow-amber-300/50",
    accent: "text-amber-900",
    wide: true,
  },
];

const heroHeading = (
  <>
    Uncover the Grey
    <br />
    <span className="gradient-text gradient-text-shine">in AI</span>
  </>
);

const demoHeading = "See an LLM answer a question, step by step";

export default function HomeHero() {
  const { user, loading } = useAuth();

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16">
      <VantaNetBackground />
      <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {heroHeading}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink sm:text-xl">
              AI isn&apos;t magic. It&apos;s understandable once you see the grey.
            </p>

            <p className="mt-5 max-w-xl rounded-2xl border-l-4 border-brand-accent bg-white/80 px-4 py-3 text-base font-semibold leading-relaxed text-brand-heading shadow-sm sm:text-lg">
              Learn like you work, with friction that builds real capability.
            </p>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-violet-200/60 bg-gradient-to-br from-violet-600/5 via-white to-purple-50/80 p-5 shadow-lg shadow-violet-100/60 md:p-6">
              <div>
                <h3 className="text-lg font-black text-violet-800 sm:text-xl">
                  Why The Grey Project
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">
                  Not another passive course catalog.
                </p>
              </div>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {USP_ITEMS.map(({ icon: Icon, title, text, card, iconWrap, accent, wide }) => (
                  <li
                    key={title}
                    className={`flex gap-3 rounded-2xl border p-4 shadow-sm transition hover:shadow-md ${card} ${
                      wide ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-sm font-black ${accent}`}>{title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink sm:text-base">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/try/prediction" className="btn-cta text-center">
                Start free lesson
              </Link>
              {!loading && !user && (
                <Link
                  href="/login"
                  className="btn-secondary hidden text-center sm:inline-flex"
                >
                  Sign in
                </Link>
              )}
              <Link href="/learning" className="btn-secondary text-center">
                View learning paths
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="min-w-0 lg:sticky lg:top-24"
          >
            <h2 className="text-center text-lg font-black leading-snug sm:text-xl lg:text-left lg:text-2xl">
              {demoHeading}
            </h2>
            <p className="mb-4 mt-3 text-center text-base text-ink-muted lg:hidden">
              Tap a prompt. Watch tokens, attention, and output unfold.
            </p>
            <div className="mt-3 lg:mt-0">
              <LlmPipelineDemo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

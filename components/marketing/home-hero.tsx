"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import NeuralCanvas from "@/components/marketing/home/neural-canvas";
import FloatingTokens from "@/components/marketing/home/floating-tokens";
import SectionReveal from "@/components/marketing/home/section-reveal";

type UspItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  iconWrap: string;
  accent: string;
  wide?: boolean;
};

const USP_ITEMS: UspItem[] = [
  {
    icon: Trophy,
    title: "Gamified progress",
    text: "Grey Points, leaderboards, and code you can flex on LinkedIn.",
    iconWrap: "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30",
    accent: "text-emerald-300",
  },
  {
    icon: Scale,
    title: "Balanced learning",
    text: "Practical decisions plus code. Not a 600-slide PDF.",
    iconWrap: "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30",
    accent: "text-cyan-300",
  },
  {
    icon: Users,
    title: "Real pressure",
    text: "Job-like chaos: stakeholders, budgets, latency, and oh-no incidents.",
    iconWrap: "bg-violet-500/20 text-violet-300 ring-1 ring-violet-400/30",
    accent: "text-violet-300",
  },
  {
    icon: BarChart3,
    title: "Business impact",
    text: "Variables that show what your choice actually costs. Ouch.",
    iconWrap: "bg-sky-500/20 text-sky-300 ring-1 ring-sky-400/30",
    accent: "text-sky-300",
  },
  {
    icon: Briefcase,
    title: "Built for shippers",
    text: "For students, developers, founders, PMs, and builders shipping real AI.",
    iconWrap: "bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30",
    accent: "text-amber-300",
    wide: true,
  },
];

const demoHeading = "See an LLM answer a question, step by step";

/** Headline rendered as "tokens" that assemble into place one by one. */
function TokenHeadline() {
  const lineOne = ["Uncover", "the", "Grey"];
  const lineTwo = ["in", "AI"];

  const tokenVariants = {
    hidden: {
      opacity: 0,
      y: 34,
      scale: 0.82,
      filter: "blur(10px)",
    },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.12 + index * 0.13,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <h1
      aria-label="Uncover the Grey in AI"
      className="text-4xl font-black leading-[1.05] tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl"
    >
      <span aria-hidden className="block">
        {lineOne.map((word, index) => (
          <motion.span
            key={word}
            custom={index}
            variants={tokenVariants}
            initial="hidden"
            animate="show"
            className="mr-[0.28em] inline-block last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span aria-hidden className="block">
        {lineTwo.map((word, index) => (
          <motion.span
            key={word}
            custom={lineOne.length + index}
            variants={tokenVariants}
            initial="hidden"
            animate="show"
            className="home-gradient-text home-gradient-text-shine mr-[0.28em] inline-block last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function HomeHero() {
  const { user, loading } = useAuth();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowOneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowTwoY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const tokensY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-20 pt-12 md:px-6 md:pb-28 md:pt-20"
    >
      <NeuralCanvas className="opacity-80" />
      <motion.div
        style={{ y: glowOneY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_45%)]"
      />
      <motion.div
        style={{ y: glowTwoY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.12),transparent_40%)]"
      />
      <motion.div style={{ y: tokensY }} className="absolute inset-0">
        <FloatingTokens />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-x-16">
          <div>
            <TokenHeadline />

            <motion.p
              variants={fadeUp}
              custom={0.55}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl"
            >
              AI isn&apos;t magic. It&apos;s understandable once you see the grey.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={0.7}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-900/70 px-4 py-3 text-base font-semibold leading-relaxed text-cyan-100 shadow-[inset_0_0_30px_rgba(34,211,238,0.08)] sm:text-lg"
            >
              Learn like you work, with friction that builds real capability.
            </motion.p>

            <SectionReveal className="mt-8" delay={0.15}>
              <div className="home-panel p-5 md:p-6">
                <div>
                  <h3 className="text-lg font-black text-slate-50 sm:text-xl">
                    Why The Grey Project
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-400">
                    Not another passive course catalog.
                  </p>
                </div>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {USP_ITEMS.map(({ icon: Icon, title, text, iconWrap, accent, wide }) => (
                    <li
                      key={title}
                      className={`home-card flex gap-3 p-4 ${wide ? "sm:col-span-2" : ""}`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className={`text-sm font-black ${accent}`}>{title}</p>
                        <p className="mt-1 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                          {text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            <SectionReveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" delay={0.2}>
              <Link href="/try/prediction" className="btn-home-cta text-center">
                Start free lesson
              </Link>
              {!loading && !user && (
                <Link href="/login" className="btn-home-secondary hidden text-center sm:inline-flex">
                  Sign in
                </Link>
              )}
              <Link href="/learning" className="btn-home-secondary text-center">
                View learning paths
              </Link>
            </SectionReveal>
          </div>

          <SectionReveal className="min-w-0 lg:sticky lg:top-24" delay={0.1}>
            <h2 className="text-center text-lg font-black leading-snug text-slate-50 sm:text-xl lg:text-left lg:text-2xl">
              {demoHeading}
            </h2>
            <p className="mb-4 mt-3 text-center text-base text-slate-400 lg:hidden">
              Tap a prompt. Watch tokens, attention, and output unfold.
            </p>
            <motion.div
              className="relative mt-0 lg:mt-0"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-fuchsia-500/30 blur-lg" />
              <div className="relative rounded-[1.75rem] border border-cyan-500/25 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                <LlmPipelineDemo />
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

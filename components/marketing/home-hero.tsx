"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import NeuronSandbox from "@/components/playgrounds/neuron-sandbox";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16">
      <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">
            Learn AI. Never Forget.
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Understand AI
            <br />
            <span className="gradient-text">Like You Built It.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Interactive lessons. Visual sandboxes. Real intuition, no hype and no fear.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/try"
              className="rounded-2xl bg-violet-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-xl shadow-violet-200 transition hover:bg-violet-700"
            >
              Try Free Lesson
            </Link>
            <Link
              href="/learning"
              className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-center text-lg font-semibold text-slate-800 transition hover:border-violet-300"
            >
              Explore Paths
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="min-w-0"
        >
          <NeuronSandbox compact />
        </motion.div>
      </div>
    </section>
  );
}

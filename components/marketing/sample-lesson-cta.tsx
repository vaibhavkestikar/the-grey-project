"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import SectionReveal from "@/components/marketing/home/section-reveal";

export default function SampleLessonCta() {
  return (
    <section className="relative px-4 py-16 md:px-6 md:py-24">
      <SectionReveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-cyan-500/25 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-center shadow-[0_0_60px_rgba(34,211,238,0.12)] md:p-14">
          <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
          <p className="relative text-sm font-bold uppercase tracking-widest text-cyan-300/90">
            Stop nodding. Start knowing.
          </p>
          <h2 className="relative mt-4 text-3xl font-black text-white md:text-5xl">
            Build real AI intuition in minutes
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Hook, visual, play, checkpoint, reflect. Five steps. One lesson. Curious
            Builders is completely free. Finish the path for your certificate.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/try/prediction"
              className="relative mt-8 inline-flex rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-10 py-4 text-lg font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            >
              Start free
            </Link>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
}

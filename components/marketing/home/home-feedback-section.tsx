"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import SectionReveal from "@/components/marketing/home/section-reveal";

export default function HomeFeedbackSection() {
  return (
    <section className="relative px-4 py-12 md:px-6 md:py-16">
      <SectionReveal>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-violet-500/20 bg-slate-900/70 p-8 text-center shadow-[0_0_40px_rgba(167,139,250,0.1)] backdrop-blur md:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-300">
            Roast us (nicely)
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-50 md:text-3xl">
            Built by one person. Your feedback actually moves the roadmap.
          </h2>
          <p className="mt-3 text-slate-400">
            Early days. Small team (team = me, plus excessive coffee). Tell me what
            clicked, what confused you, and what made you close the tab.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/feedback"
              className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-8 py-4 font-semibold text-white shadow-[0_0_24px_rgba(167,139,250,0.35)]"
            >
              Leave feedback
            </Link>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
}

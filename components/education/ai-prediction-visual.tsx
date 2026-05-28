"use client";

import { motion } from "framer-motion";

export default function AIPredictionVisual() {

  return (

    <section className="relative my-20 overflow-hidden rounded-[3rem] border border-violet-200 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 p-16 text-white shadow-2xl">

      <div className="absolute inset-0 opacity-20">
        <div className="hero-glow" />
      </div>

      <div className="relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >

          <div className="mb-6 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">
            AI Prediction Engine
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Modern AI Is Fundamentally
            <span className="gradient-text block">
              Prediction
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-300">
            AI systems learn statistical patterns from historical data to predict future outcomes.
          </p>

        </motion.div>

      </div>

    </section>

  );
}
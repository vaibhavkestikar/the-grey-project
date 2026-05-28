"use client";

import { motion } from "framer-motion";

export default function StoryBoard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      viewport={{ once: true }}
      className="my-20 overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-12 text-white shadow-2xl"
    >

      <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
        ENGINEERING INSIGHT
      </div>

      <h3 className="mt-8 text-5xl font-black leading-tight">
        {title}
      </h3>

      <p className="mt-6 max-w-3xl text-2xl leading-relaxed text-slate-300">
        {subtitle}
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">

        {children}

      </div>

    </motion.div>
  );
}
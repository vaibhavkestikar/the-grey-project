"use client";

import { motion } from "framer-motion";

export default function MentalModel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true }}
      className="my-16 rounded-3xl border border-slate-200 bg-slate-50 p-10"
    >

      <div className="text-sm font-bold uppercase tracking-wide text-violet-700">
        Mental Model
      </div>

      <h3 className="mt-4 text-3xl font-black text-slate-900">
        {title}
      </h3>

      <div className="mt-6 text-[1.15rem] leading-[2rem] text-slate-700">
        {children}
      </div>

    </motion.div>
  );
}
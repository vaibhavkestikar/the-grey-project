"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
};

export default function Insight({
  title,
  description,
}: Props) {

  return (

    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="my-20 overflow-hidden rounded-[2.5rem] border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-10 shadow-xl"
    >

      <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-violet-700">
        Core Insight
      </div>

      <h2 className="text-4xl font-black leading-tight text-slate-950">
        {title}
      </h2>

      <p className="mt-6 text-xl leading-9 text-slate-700">
        {description}
      </p>

    </motion.section>

  );
}
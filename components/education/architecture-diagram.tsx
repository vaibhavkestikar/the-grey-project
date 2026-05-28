"use client";

import { motion } from "framer-motion";

const items = [
  "Massive Data",
  "Neural Networks",
  "Optimization",
  "Predictions",
];

export default function ArchitectureDiagram() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true }}
      className="my-16 rounded-3xl border border-slate-200 bg-white p-10"
    >

      <h3 className="text-3xl font-black text-slate-900">
        How Modern AI Systems Work
      </h3>

      <div className="mt-10 grid gap-4 md:grid-cols-4">

        {items.map((item, index) => (

          <motion.div
            key={item}
            whileHover={{
              y: -4,
            }}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
          >

            <div className="text-sm font-bold text-violet-700">
              STEP {index + 1}
            </div>

            <div className="mt-3 text-xl font-bold text-slate-900">
              {item}
            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}
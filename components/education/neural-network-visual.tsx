"use client";

import { motion } from "framer-motion";

const layers = [3, 5, 5, 4, 2];

export default function NeuralNetworkVisual() {

  return (

    <section className="my-24 overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-12 shadow-xl">

      <div className="mb-16 text-center">

        <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-violet-700">
          Representation Learning
        </div>

        <h2 className="text-5xl font-black text-slate-950">
          Neural Networks Learn Patterns
        </h2>

      </div>

      <div className="flex items-center justify-center gap-16">

        {layers.map((count, layerIndex) => (

          <div
            key={layerIndex}
            className="flex flex-col gap-5"
          >

            {Array.from({ length: count }).map((_, i) => (

              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2 + layerIndex * 0.3,
                }}
                className="h-6 w-6 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg"
              />

            ))}

          </div>

        ))}

      </div>

    </section>

  );
}
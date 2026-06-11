"use client";

import { useId } from "react";
import { motion } from "framer-motion";

/**
 * Synapse connection between sections: an SVG axon that draws itself on
 * scroll, with neuron nodes that light up as the path completes.
 */
export default function SectionDivider() {
  const gradientId = useId();

  return (
    <div aria-hidden className="mx-auto max-w-5xl px-4 md:px-6">
      <motion.svg
        viewBox="0 0 800 48"
        fill="none"
        className="h-12 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.path
          d="M0 24 C 120 24, 160 8, 250 8 S 380 40, 470 40 S 620 16, 800 24"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1.4, ease: "easeInOut" },
            },
          }}
        />
        {[
          { cx: 250, cy: 8, delay: 0.5 },
          { cx: 470, cy: 40, delay: 0.9 },
          { cx: 400, cy: 24, delay: 1.2 },
        ].map((node) => (
          <motion.circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r="3.5"
            fill="#22d3ee"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { delay: node.delay, duration: 0.35 },
              },
            }}
            style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.9))" }}
          />
        ))}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgba(34,211,238,0)" />
            <stop offset="0.25" stopColor="#22d3ee" />
            <stop offset="0.6" stopColor="#a78bfa" />
            <stop offset="1" stopColor="rgba(192,132,252,0)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Scroll progress styled like a neural pathway: a glowing gradient axon
 * with a pulsing signal node travelling at the leading edge.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const nodeLeft = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1.5">
      <div className="absolute inset-0 bg-slate-900/60" />
      <motion.div
        className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_14px_rgba(34,211,238,0.7)]"
        style={{ scaleX: progress }}
      />
      <motion.div
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,1),0_0_28px_rgba(167,139,250,0.8)]"
        style={{ left: nodeLeft, x: "-50%" }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/60" />
      </motion.div>
    </div>
  );
}

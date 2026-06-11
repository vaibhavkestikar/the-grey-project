"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TokenSpec = {
  label: string;
  top: string;
  left: string;
  drift: number;
  duration: number;
  delay: number;
};

const TOKENS: TokenSpec[] = [
  { label: "token", top: "12%", left: "6%", drift: -18, duration: 9, delay: 0 },
  { label: "attention", top: "30%", left: "88%", drift: 14, duration: 11, delay: 0.8 },
  { label: "embedding", top: "62%", left: "4%", drift: -12, duration: 10, delay: 1.6 },
  { label: "context", top: "78%", left: "90%", drift: 16, duration: 12, delay: 0.4 },
  { label: "logits", top: "8%", left: "72%", drift: -15, duration: 10.5, delay: 1.2 },
  { label: "grey", top: "88%", left: "40%", drift: 12, duration: 9.5, delay: 2 },
];

/**
 * Drifting LLM "tokens" floating over a section. They glow and snap toward
 * the pointer on hover. Desktop only; hidden on touch + reduced motion.
 */
export default function FloatingTokens({ className = "" }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 hidden lg:block ${className}`}>
      {TOKENS.map((token) => (
        <motion.span
          key={token.label}
          className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-default select-none rounded-full border border-cyan-500/20 bg-slate-900/70 px-3 py-1 font-mono text-[11px] font-semibold text-cyan-300/60 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-300/70 hover:text-cyan-100 hover:shadow-[0_0_24px_rgba(34,211,238,0.5)]"
          style={{ top: token.top, left: token.left }}
          animate={{ y: [0, token.drift, 0], x: [0, -token.drift / 2, 0] }}
          transition={{
            duration: token.duration,
            delay: token.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.25 }}
        >
          {token.label}
        </motion.span>
      ))}
    </div>
  );
}

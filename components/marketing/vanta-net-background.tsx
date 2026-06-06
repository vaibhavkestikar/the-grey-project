"use client";

import { useEffect, useRef } from "react";

type VantaEffect = { destroy: () => void };

export default function VantaNetBackground() {
  const elRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    if (!elRef.current || effectRef.current) return;

    let cancelled = false;

    Promise.all([
      import("three"),
      import("vanta/dist/vanta.net.min"),
    ]).then(([THREE, VANTA]) => {
      if (cancelled || !elRef.current) return;

      effectRef.current = VANTA.default({
        el: elRef.current,
        THREE,
        /* visual config */
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        /* cool near-white canvas, blends with the white page */
        backgroundColor: 0xfafbff,
        /* very subtle slate-blue lines/dots */
        color: 0xbbc8e8,
        /* sparse: few nodes so text stays readable */
        points: 6.0,
        /* short connection radius, tight precise links */
        maxDistance: 22.0,
        /* wide grid spacing, airy not dense */
        spacing: 22.0,
        /* slow ambient drift */
        speed: 0.6,
        showDots: true,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 0.75,
      });
    });

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
    />
  );
}

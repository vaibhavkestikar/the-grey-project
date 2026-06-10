"use client";

import { useEffect, useRef } from "react";

type VantaEffect = { destroy: () => void };

export default function VantaNetBackground() {
  const elRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    if (!elRef.current || effectRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let cancelled = false;

    Promise.all([
      import("three"),
      import("vanta/dist/vanta.net.min"),
    ]).then(([THREE, VANTA]) => {
      if (cancelled || !elRef.current) return;

      effectRef.current = VANTA.default({
        el: elRef.current,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        backgroundColor: 0xf8fafc,
        color: 0x829cbc,
        points: isMobile ? 4.0 : 6.0,
        maxDistance: isMobile ? 18.0 : 22.0,
        spacing: isMobile ? 26.0 : 22.0,
        speed: isMobile ? 0.35 : 0.55,
        showDots: true,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 0.65,
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
      className="pointer-events-none absolute inset-0 z-0 opacity-40 md:opacity-50"
    />
  );
}

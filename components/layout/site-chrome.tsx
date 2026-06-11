"use client";

import CursorGlow from "@/components/marketing/home/cursor-glow";
import ScrollProgress from "@/components/marketing/home/scroll-progress";

/** Global scroll progress + cursor glow applied site-wide. */
export default function SiteChrome() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
    </>
  );
}

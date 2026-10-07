import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteFooter from "@/components/marketing/site-footer";
import SiteNavbar from "@/components/marketing/site-navbar";
import WorkshopSessionPage from "@/components/marketing/workshop-session-page";
import { getWorkshopBySlug } from "@/data/workshops";

export const metadata: Metadata = {
  title: "Agentic AI Project Build",
  description:
    "Hands-on campus session: build end-to-end software with agentic AI coding, stay in control of generated work, and leave with a portfolio project.",
};

export default function AgenticProjectWorkshopPage() {
  const session = getWorkshopBySlug("agentic-project");
  if (!session) notFound();

  return (
    <main className="site-page">
      <SiteNavbar />
      <WorkshopSessionPage session={session} />
      <SiteFooter />
    </main>
  );
}

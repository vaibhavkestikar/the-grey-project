import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteFooter from "@/components/marketing/site-footer";
import SiteNavbar from "@/components/marketing/site-navbar";
import WorkshopSessionPage from "@/components/marketing/workshop-session-page";
import { getWorkshopBySlug } from "@/data/workshops";

export const metadata: Metadata = {
  title: "Theory & Industry Landscape",
  description:
    "What AI actually looks like in Indian industry: roles, skills, and what is automatable versus not. First session of The Grey Project campus workshop.",
};

export default function TheoryWorkshopPage() {
  const session = getWorkshopBySlug("theory");
  if (!session) notFound();

  return (
    <main className="site-page">
      <SiteNavbar />
      <WorkshopSessionPage session={session} />
      <SiteFooter />
    </main>
  );
}

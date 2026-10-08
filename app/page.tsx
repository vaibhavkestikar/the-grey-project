import HomeHero from "@/components/marketing/home-hero";
import HomeFeedbackSection from "@/components/marketing/home/home-feedback-section";
import SectionDivider from "@/components/marketing/home/section-divider";
import LearningPathsView from "@/components/learning/learning-paths-view";
import SampleLessonCta from "@/components/marketing/sample-lesson-cta";
import FounderSection from "@/components/marketing/founder-section";
import SiteNavbar from "@/components/marketing/site-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn How AI Actually Works: Interactive Lessons",
  description:
    "Free interactive AI courses with browser Python sandboxes. Learn LLMs, machine learning, and production AI. Earn Grey Points and skill badges at The Grey Project.",
  openGraph: {
    title: "The Grey Project: Learn How AI Actually Works",
    description:
      "Interactive AI learning paths with live sandboxes. Start free with Curious Builders.",
  },
};

export default function HomePage() {
  return (
    <main className="site-page">
      <SiteNavbar />
      <HomeHero />
      <SectionDivider />
      <LearningPathsView
        collapsibleLive={false}
        compact
        showStatPills
        subheading="Free Curious Builders path live now. Earn Grey Points, unlock badges, and stack advanced paths next."
      />
      <SectionDivider />
      <SampleLessonCta />
      <SectionDivider />
      <FounderSection />
      <HomeFeedbackSection />
      <footer className="border-t border-slate-800 px-4 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} The Grey Project. Learn AI. Never Forget.
      </footer>
    </main>
  );
}

import SiteNavbar from "@/components/marketing/site-navbar";
import HomeHero from "@/components/marketing/home-hero";
import LearningPathsView from "@/components/learning/learning-paths-view";
import SampleLessonCta from "@/components/marketing/sample-lesson-cta";
import FounderSection from "@/components/marketing/founder-section";
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
    <main className="min-h-screen overflow-x-hidden bg-white">
      <SiteNavbar />
      <HomeHero />
      <LearningPathsView
        collapsibleLive={false}
        compact
        subheading="Free Curious Builders path live now. Earn Grey Points, unlock badges, and stack advanced paths next."
      />
      <SampleLessonCta />
      <FounderSection />
      <section className="border-t border-slate-200 bg-violet-50 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Roast us (nicely)
          </p>
          <h2 className="mt-3 text-2xl font-black md:text-3xl">
            Built by one person. Your feedback actually moves the roadmap.
          </h2>
          <p className="mt-3 text-slate-600">
            Early days. Small team (team = me, plus excessive coffee). Tell me what
            clicked, what confused you, and what made you close the tab.
          </p>
          <a
            href="/feedback"
            className="mt-6 inline-flex rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white shadow-lg"
          >
            Leave feedback
          </a>
        </div>
      </section>
      <footer className="border-t border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} The Grey Project. Learn AI. Never Forget.
      </footer>
    </main>
  );
}

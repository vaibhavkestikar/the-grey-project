import SiteNavbar from "@/components/marketing/site-navbar";
import HomeHero from "@/components/marketing/home-hero";
import LearningPathsView from "@/components/learning/learning-paths-view";
import SampleLessonCta from "@/components/marketing/sample-lesson-cta";
import FounderSection from "@/components/marketing/founder-section";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <SiteNavbar />
      <HomeHero />
      <LearningPathsView
        collapsibleLive={false}
        subheading="Built for curious builders first. More learning paths unlock as we grow. Join a waitlist to get notified."
      />
      <SampleLessonCta />
      <FounderSection />
      <footer className="border-t border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} The Grey Project · Learn AI. Never Forget.
      </footer>
    </main>
  );
}

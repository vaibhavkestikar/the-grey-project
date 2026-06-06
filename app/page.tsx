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
        subheading="Curious Builders is live for founders, PMs, analysts, creators, and builders using AI daily who want practical intuition and better product decisions. Freshers launches soon with limited free seats."
      />
      <SampleLessonCta />
      <FounderSection />
      <section className="border-t border-slate-200 bg-violet-50 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Help us improve
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-950 md:text-3xl">
            Built by one person. Your feedback matters.
          </h2>
          <p className="mt-3 text-slate-600">
            Early days, small team (team = me). Share honest thoughts so we know what to fix and
            what to build next.
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
        © {new Date().getFullYear()} The Grey Project · Learn AI. Never Forget. · No buzzwords were harmed.
      </footer>
    </main>
  );
}

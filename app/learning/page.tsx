import SiteNavbar from "@/components/marketing/site-navbar";
import LearningHub from "@/components/learning/learning-hub";
import ResumeLearning from "@/components/learning/resume-learning";

export default function LearningPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <SiteNavbar />
      <ResumeLearning />
      <LearningHub />
    </main>
  );
}

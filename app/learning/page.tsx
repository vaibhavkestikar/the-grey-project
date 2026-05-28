import Navbar from "@/components/layout/navbar";

import LearningHero from "@/components/learning/learning-hero";

import FeaturedPath from "@/components/learning/featured-path";

import LearningGrid from "@/components/learning/learning-grid";

import Philosophy from "@/components/learning/philosophy";

import ResumeLearning from "@/components/learning/resume-learning";

export default function LearningPage() {

  return (

    <main className="min-h-screen overflow-x-hidden bg-white">

      <Navbar />

      <ResumeLearning />

      <LearningHero />

      <FeaturedPath />

      <LearningGrid />

      <Philosophy />

    </main>

  );
}
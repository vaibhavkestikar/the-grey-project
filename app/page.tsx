import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
    </main>
  );
}
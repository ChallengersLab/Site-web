import { Hero } from "@/components/sections/Hero";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import { Results } from "@/components/sections/Results";
import { TrustBar } from "@/components/sections/TrustBar";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <Results />
      <TrustBar />
      <FinalCTA />
      <Footer />
    </main>
  );
}

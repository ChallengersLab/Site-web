import { Hero } from "@/components/sections/Hero";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import { Results } from "@/components/sections/Results";
import { TrustBar } from "@/components/sections/TrustBar";
import { Method } from "@/components/sections/Method";
import { Testimonials } from "@/components/sections/Testimonials";
import { RessourcesPreview } from "@/components/sections/RessourcesPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <Results />
      <TrustBar />
      <Method />
      <Testimonials />
      <RessourcesPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}

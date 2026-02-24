import { Hero } from "@/components/sections/Hero";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import { Results } from "@/components/sections/Results";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <Results />
    </main>
  );
}

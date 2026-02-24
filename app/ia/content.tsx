"use client";

import { iaConfig } from "@/lib/bu-config";
import { ServicePageHero } from "@/components/sections/ServicePageHero";
import { PainPoints } from "@/components/sections/PainPoints";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { BUMethodology } from "@/components/sections/BUMethodology";
import { TeamMember } from "@/components/sections/TeamMember";
import { BUTestimonials } from "@/components/sections/BUTestimonials";
import { BURessources } from "@/components/sections/BURessources";
import { BUCTA } from "@/components/sections/BUCTA";
import { Footer } from "@/components/layout/Footer";

export function IAPageContent() {
  return (
    <main id="main-content">
      <ServicePageHero config={iaConfig} />
      <PainPoints painPoints={iaConfig.painPoints} accent={iaConfig.accent} />
      <ServicesDetail services={iaConfig.services} accent={iaConfig.accent} />
      <BUMethodology
        methodology={iaConfig.methodology}
        accent={iaConfig.accent}
        badge="Méthode IA"
        relatedArticleSlugs={iaConfig.relatedArticleSlugs}
      />
      <TeamMember director={iaConfig.director} accent={iaConfig.accent} />
      <BUTestimonials testimonials={iaConfig.testimonials} accent={iaConfig.accent} />
      <BURessources articleSlugs={iaConfig.relatedArticleSlugs} accent={iaConfig.accent} />
      <BUCTA config={iaConfig} />
      <Footer />
    </main>
  );
}

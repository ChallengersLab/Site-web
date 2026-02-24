"use client";

import { salesConfig } from "@/lib/bu-config";
import { ServicePageHero } from "@/components/sections/ServicePageHero";
import { PainPoints } from "@/components/sections/PainPoints";
import { ServicesDetail } from "@/components/sections/ServicesDetail";
import { BUMethodology } from "@/components/sections/BUMethodology";
import { TeamMember } from "@/components/sections/TeamMember";
import { BUTestimonials } from "@/components/sections/BUTestimonials";
import { BURessources } from "@/components/sections/BURessources";
import { BUCTA } from "@/components/sections/BUCTA";
import { Footer } from "@/components/layout/Footer";

export function SalesPageContent() {
  return (
    <main id="main-content">
      <ServicePageHero config={salesConfig} />
      <PainPoints painPoints={salesConfig.painPoints} accent={salesConfig.accent} />
      <ServicesDetail services={salesConfig.services} accent={salesConfig.accent} />
      <BUMethodology
        methodology={salesConfig.methodology}
        accent={salesConfig.accent}
        badge="Méthode Sales"
        relatedArticleSlugs={salesConfig.relatedArticleSlugs}
      />
      <TeamMember director={salesConfig.director} accent={salesConfig.accent} />
      <BUTestimonials testimonials={salesConfig.testimonials} accent={salesConfig.accent} />
      <BURessources articleSlugs={salesConfig.relatedArticleSlugs} accent={salesConfig.accent} />
      <BUCTA config={salesConfig} />
      <Footer />
    </main>
  );
}

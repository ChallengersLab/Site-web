"use client";

import { IAHero } from "@/components/ia/IAHero";
import { IACapabilities } from "@/components/ia/IACapabilities";
import { IAUseCases } from "@/components/ia/IAUseCases";
import { IAMethod } from "@/components/ia/IAMethod";
import { IAPricing } from "@/components/ia/IAPricing";
import { IAFAQ } from "@/components/ia/IAFAQ";
import { IACTA } from "@/components/ia/IACTA";
import { Footer } from "@/components/layout/Footer";

export function IAContent() {
  return (
    <main id="main-content">
      <IAHero />
      <IACapabilities />
      <IAUseCases />
      <IAMethod />
      <IAPricing />
      <IAFAQ />
      <IACTA />
      <Footer />
    </main>
  );
}

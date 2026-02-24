"use client";

import { IAHero } from "@/components/ia/IAHero";
import { IABeforeAfter } from "@/components/ia/IABeforeAfter";
import { IAStack } from "@/components/ia/IAStack";
import { IAPricing } from "@/components/ia/IAPricing";
import { IAProof } from "@/components/ia/IAProof";
import { IACTA } from "@/components/ia/IACTA";
import { IAFAQ } from "@/components/ia/IAFAQ";
import { Footer } from "@/components/layout/Footer";

export function IAContent() {
  return (
    <main id="main-content">
      <IAHero />
      <IABeforeAfter />
      <IAStack />
      <IAPricing />
      <IAProof />
      <IAFAQ />
      <IACTA />
      <Footer />
    </main>
  );
}

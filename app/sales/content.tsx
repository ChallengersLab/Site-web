"use client";

import { SalesHero } from "@/components/sales/SalesHero";
import { SalesPainPoints } from "@/components/sales/SalesPainPoints";
import { SalesMethod } from "@/components/sales/SalesMethod";
import { SalesPricing } from "@/components/sales/SalesPricing";
import { SalesProof } from "@/components/sales/SalesProof";
import { SalesCTA } from "@/components/sales/SalesCTA";
import { SalesFAQ } from "@/components/sales/SalesFAQ";
import { Footer } from "@/components/layout/Footer";

export function SalesContent() {
  return (
    <main id="main-content">
      <SalesHero />
      <SalesPainPoints />
      <SalesMethod />
      <SalesPricing />
      <SalesProof />
      <SalesFAQ />
      <SalesCTA />
      <Footer />
    </main>
  );
}

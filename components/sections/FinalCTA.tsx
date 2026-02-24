"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-40 overflow-hidden" id="contact">
      {/* Multiple layered orbs */}
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123,94,255,0.25) 0%, transparent 60%)",
          filter: "blur(100px)",
          animation: "pulse-soft 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-[40%] top-[30%] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "float-orb 15s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[700px] px-6 text-center">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
            Prêt à passer devant{" "}
            <em className="gradient-text">vos concurrents ?</em>
          </h2>
          <p className="mx-auto mt-7 max-w-md text-[16px] leading-[1.7] text-white/35">
            30 minutes. Un appel. On vous dit ce qu&apos;on peut faire pour
            vous — et surtout ce qu&apos;on ne fera pas.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href="#contact"
            className="btn-glow mt-10 inline-flex items-center gap-3 rounded-xl px-10 py-5 text-[16px]"
          >
            <span>Réserver mon appel gratuit</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-5 text-[12px] text-white/15">
            Gratuit &middot; Sans engagement &middot; Max 5 clients / trimestre
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

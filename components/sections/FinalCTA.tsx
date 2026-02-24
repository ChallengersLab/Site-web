"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-32" id="contact">
      {/* Background glow orbs */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, #7B5EFF 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/3 top-1/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, #00F5FF 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Prêt à passer devant{" "}
            <span className="gradient-text">vos concurrents ?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/45">
            30 minutes. Un appel. On vous dit ce qu&apos;on peut faire pour
            vous &mdash; et surtout ce qu&apos;on ne fera pas.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href="#contact"
            className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-5 text-base font-semibold text-black transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Réserver mon appel gratuit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-5 text-sm text-white/25">
            Gratuit &middot; Sans engagement &middot; Max 5 nouveaux clients / trimestre
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const logos = [
  "ScaleUp AI",
  "TechVentures",
  "DataFlow",
  "CloudNine",
  "SynapseIO",
  "NeuralPath",
];

export function TrustBar() {
  return (
    <section className="relative py-16">
      <ScrollReveal>
        <p className="text-center text-xs font-medium uppercase tracking-widest text-white/40">
          Ils nous font confiance
        </p>

        <div className="relative mx-auto mt-10 max-w-5xl overflow-hidden px-6">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

          <div className="flex items-center justify-center gap-12 md:gap-16">
            {logos.map((name) => (
              <div
                key={name}
                className="flex h-10 items-center whitespace-nowrap text-lg font-bold tracking-tight text-white/20"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const stats = [
  { value: 320, prefix: "+", suffix: "%", label: "de leads générés" },
  { value: 47, prefix: "", suffix: "", label: "clients accompagnés" },
  { value: 98, prefix: "", suffix: "%", label: "taux de rétention" },
  { value: 24, prefix: "", suffix: "h", label: "délai de livraison" },
];

function StatCard({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}) {
  const { ref, value: displayValue } = useCountUp(value);

  return (
    <div className="glassmorphism rounded-2xl p-8 text-center">
      <span ref={ref} className="gradient-text text-4xl font-bold">
        {prefix}
        {displayValue}
        {suffix}
      </span>
      <p className="mt-2 text-white/60">{label}</p>
    </div>
  );
}

export function Results() {
  return (
    <section className="relative py-24">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="text-center text-5xl font-bold">
            Performance Delivered in 24-48h
          </h2>
        </ScrollReveal>

        {/* Video with glow border */}
        <ScrollReveal delay={0.2}>
          <div
            className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl border border-white/10"
            style={{ boxShadow: "0 0 60px rgba(123,94,255,0.3)" }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-contain"
            >
              <source src="/videos/results.mp4" type="video/mp4" />
            </video>
            {/* Fallback gradient when no video */}
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-accent-start/10 to-accent-end/10">
              <span className="text-lg text-white/30">
                Video de résultats
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Stat cards */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 * i}>
              <StatCard {...stat} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center">
            <MagneticButton href="#audit">
              Commencer maintenant
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";

const steps = [
  {
    number: "01",
    phase: "Diagnostic",
    timeline: "Semaines 1–2",
    description:
      "On audite vos process sales, votre stack, vos données. On identifie les quick wins et les chantiers structurants.",
    deliverable: "Roadmap priorisée",
    accent: "#7B5EFF",
  },
  {
    number: "02",
    phase: "Implémentation",
    timeline: "Semaines 3–10",
    description:
      "On construit, on configure, on forme. Nouveaux workflows, intégrations IA, machines de prospection. On fait, on ne théorise pas.",
    deliverable: "Systèmes opérationnels",
    accent: "#a78bfa",
  },
  {
    number: "03",
    phase: "Optimisation",
    timeline: "Semaine 10+",
    description:
      "On mesure, on itère, on scale. Chaque action est trackée. Si ça ne performe pas, on ajuste. Zéro complaisance.",
    deliverable: "Croissance mesurable",
    accent: "#00F5FF",
  },
];

export function Method() {
  return (
    <section className="relative py-32 overflow-hidden" id="method">
      <div className="section-divider mx-auto mb-32 w-full max-w-[1100px]" />

      {/* Ambient orb */}
      <div
        className="absolute left-[10%] top-[40%] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float-orb 25s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left: sticky heading */}
          <div className="lg:sticky lg:top-32 lg:w-[360px] lg:shrink-0">
            <ScrollReveal>
              <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
                Notre méthode
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-display mt-8 text-[clamp(2.2rem,4vw,3.5rem)] leading-[1] tracking-[-0.02em]">
                3 étapes.
                <br />
                90 jours.
                <br />
                <em className="gradient-text">Des résultats.</em>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.7] text-white/30">
                Pas de consulting à rallonge. Un process clair, mesurable, et
                orienté ROI dès le départ.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: step cards */}
          <div className="flex-1 space-y-5">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.12 * i}>
                <TiltCard
                  className="group p-8 transition-all duration-500"
                  intensity={4}
                >
                  <div className="flex items-start gap-6">
                    <span
                      className="font-display text-6xl leading-none tracking-tight opacity-25 transition-opacity duration-500 group-hover:opacity-70"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl text-white">
                          {step.phase}
                        </h3>
                        <span className="rounded-full bg-white/[0.04] px-3 py-0.5 text-[11px] text-white/25">
                          {step.timeline}
                        </span>
                      </div>
                      <p className="mt-3 text-[14px] leading-[1.7] text-white/35">
                        {step.description}
                      </p>
                    </div>

                    <span
                      className="hidden shrink-0 self-center rounded-lg px-4 py-2 text-[12px] font-semibold md:inline-flex"
                      style={{
                        background: `${step.accent}10`,
                        border: `1px solid ${step.accent}20`,
                        color: step.accent,
                      }}
                    >
                      {step.deliverable}
                    </span>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

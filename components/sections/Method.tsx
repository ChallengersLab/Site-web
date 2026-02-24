"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Notre méthode
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            3 étapes. 90 jours.{" "}
            <em className="gradient-text">Des résultats.</em>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-white/30">
            Pas de consulting à rallonge. Un process clair, mesurable, et
            orienté ROI dès le départ.
          </p>
        </ScrollReveal>

        <div className="relative mt-20 space-y-5">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={0.12 * i}>
              <div className="glass-card group flex flex-col gap-6 p-8 transition-all duration-500 md:flex-row md:items-start md:gap-10">
                {/* Number */}
                <div className="shrink-0">
                  <span
                    className="font-display text-6xl tracking-tight opacity-20 transition-opacity duration-500 group-hover:opacity-60"
                    style={{ color: step.accent }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl text-white">
                      {step.phase}
                    </h3>
                    <span className="rounded-full bg-white/4 px-3 py-0.5 text-[11px] text-white/25">
                      {step.timeline}
                    </span>
                  </div>

                  <p className="mt-3 text-[14px] leading-[1.7] text-white/35">
                    {step.description}
                  </p>
                </div>

                {/* Deliverable */}
                <div className="shrink-0 md:self-center">
                  <span
                    className="inline-flex rounded-lg px-4 py-2 text-[12px] font-semibold"
                    style={{
                      background: `${step.accent}10`,
                      border: `1px solid ${step.accent}20`,
                      color: step.accent,
                    }}
                  >
                    {step.deliverable}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

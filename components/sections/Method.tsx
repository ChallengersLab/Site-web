"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    phase: "Diagnostic",
    timeline: "Semaines 1-2",
    description:
      "On audite vos process sales, votre stack, vos données. On identifie les quick wins et les chantiers structurants.",
    deliverable: "Livrable : roadmap priorisée",
  },
  {
    number: "02",
    phase: "Implémentation",
    timeline: "Semaines 3-10",
    description:
      "On construit, on configure, on forme. Nouveaux workflows, intégrations IA, machines de prospection. On fait, on ne théorise pas.",
    deliverable: "Livrable : systèmes opérationnels",
  },
  {
    number: "03",
    phase: "Optimisation",
    timeline: "Semaine 10+",
    description:
      "On mesure, on itère, on scale. Chaque action est trackée. Si ça ne performe pas, on ajuste. Zéro complaisance.",
    deliverable: "Livrable : croissance mesurable",
  },
];

export function Method() {
  return (
    <section className="relative py-28" id="method">
      <div className="section-divider mx-auto mb-28 w-full max-w-6xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-xs font-medium">
            Notre méthode
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            3 étapes. 90 jours.{" "}
            <span className="gradient-text">Des résultats.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/40">
            Pas de consulting à rallonge. Un process clair, mesurable, et
            orienté ROI dès le départ.
          </p>
        </ScrollReveal>

        <div className="relative mt-20">
          {/* Vertical connecting line */}
          <div className="absolute bottom-0 left-[27px] top-0 hidden w-px bg-gradient-to-b from-accent-start/30 via-accent-end/20 to-transparent md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.15 * i}>
                <div className="group flex gap-8">
                  {/* Step number */}
                  <div className="relative hidden shrink-0 md:block">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-surface font-display text-lg font-bold text-white/60 transition-all duration-300 group-hover:border-accent-start/30 group-hover:text-accent-start group-hover:shadow-[0_0_20px_rgba(123,94,255,0.15)]">
                      {step.number}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 rounded-2xl border border-white/6 bg-surface p-8 transition-all duration-300 hover:border-white/10 hover:bg-surface-light">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-xl font-bold text-white md:hidden">
                        {step.number}.
                      </span>
                      <h3 className="font-display text-xl font-bold text-white">
                        {step.phase}
                      </h3>
                      <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs text-white/35">
                        {step.timeline}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-white/45">
                      {step.description}
                    </p>

                    <p className="mt-4 text-xs font-semibold text-accent-start/70">
                      {step.deliverable}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

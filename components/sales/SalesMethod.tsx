"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    phase: "Audit",
    timeline: "Sem. 1-2",
    description:
      "Pipeline, stack, process, équipe. On repère ce qui peut bouger vite et ce qui demande du travail de fond.",
    deliverables: ["Diagnostic complet", "Roadmap priorisée", "KPIs cibles"],
    accent: "#7C9EFF",
  },
  {
    number: "02",
    phase: "Déploiement",
    timeline: "Sem. 3-10",
    description:
      "Lancement prospection, setup CRM, coaching équipe, scripts, séquences. On fait.",
    deliverables: ["Process opérationnels", "Équipe formée", "Pipeline actif"],
    accent: "#7C9EFF",
  },
  {
    number: "03",
    phase: "Optimisation",
    timeline: "Sem. 10+",
    description:
      "On mesure et on ajuste. Ce qui ne performe pas, on le change. Pas de complaisance.",
    deliverables: ["Croissance mesurable", "Autonomie équipe", "Playbook finalisé"],
    accent: "#4ECBA0",
  },
];

export function SalesMethod() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Vertical line fills as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          y: orbY,
          width: 600,
          height: 600,
          background: "rgba(124,158,255,0.12)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <div className="section-divider mb-16 w-full" />

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
          <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-white/30">
            Pas de consulting à rallonge. Un process clair, mesurable, avec du ROI dès le départ.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line — left side */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px md:left-[23px]">
            {/* Track */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, #7C9EFF, #7C9EFF, #4ECBA0)",
                opacity: 0.08,
              }}
            />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #7C9EFF, #7C9EFF, #4ECBA0)",
                opacity: 0.5,
                boxShadow: "0 0 16px rgba(124,158,255,0.25)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-14">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.1 * i}>
                <div className="group relative flex gap-6 md:gap-10">
                  {/* Dot */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12">
                    <div
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle, ${step.accent}25 0%, transparent 70%)`,
                      }}
                    />
                    <span
                      className="font-display relative text-[13px] font-bold tracking-wide md:text-[15px]"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content — no card, just text */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-xl text-white md:text-2xl">
                        {step.phase}
                      </h3>
                      <span className="text-[11px] tracking-widest text-white/20 uppercase">
                        {step.timeline}
                      </span>
                    </div>

                    <p className="mt-3 max-w-lg text-[14px] leading-[1.7] text-white/35">
                      {step.description}
                    </p>

                    {/* Deliverables as inline tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.deliverables.map((d) => (
                        <span
                          key={d}
                          className="rounded-full px-3 py-1 text-[11px] font-medium"
                          style={{
                            background: `${step.accent}08`,
                            border: `1px solid ${step.accent}12`,
                            color: `${step.accent}90`,
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
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

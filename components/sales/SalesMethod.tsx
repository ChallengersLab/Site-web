"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";

const steps = [
  {
    number: "01",
    phase: "Audit",
    timeline: "Sem. 1–2",
    description:
      "Pipeline, stack, process, équipe. On identifie les quick wins et les chantiers structurants.",
    deliverables: ["Diagnostic complet", "Roadmap priorisée", "KPIs cibles"],
    accent: "#7B5EFF",
  },
  {
    number: "02",
    phase: "Déploiement",
    timeline: "Sem. 3–10",
    description:
      "Lancement prospection, setup CRM, coaching équipe, scripts, séquences. On fait.",
    deliverables: ["Process opérationnels", "Équipe formée", "Pipeline actif"],
    accent: "#a78bfa",
  },
  {
    number: "03",
    phase: "Optimisation",
    timeline: "Sem. 10+",
    description:
      "On mesure, on itère, on scale. Si ça ne performe pas, on ajuste. Zéro complaisance.",
    deliverables: ["Croissance mesurable", "Autonomie équipe", "Playbook finalisé"],
    accent: "#00F5FF",
  },
];

export function SalesMethod() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          y: orbY,
          width: 600,
          height: 600,
          background: "rgba(123,94,255,0.12)",
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
            Pas de consulting à rallonge. Un process clair, mesurable, et orienté ROI dès le départ.
          </p>
        </ScrollReveal>

        {/* Horizontal progress bar (desktop only) */}
        <div className="mt-16 hidden lg:block">
          <div className="relative mx-auto mb-10 h-px max-w-[80%]">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, #7B5EFF, #a78bfa, #00F5FF)",
                opacity: 0.3,
              }}
            />
            {/* Step dots on the line */}
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${i * 50}%` }}
              >
                <div
                  className="h-3 w-3 rounded-full border-2"
                  style={{
                    borderColor: step.accent,
                    background: "#0a0a0a",
                    boxShadow: `0 0 12px ${step.accent}50`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Step cards */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={0.12 * i}>
              <TiltCard className="group h-full p-8 transition-all duration-500" intensity={5}>
                {/* Step number + phase */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-display text-4xl tracking-tight opacity-25 transition-opacity duration-500 group-hover:opacity-70"
                    style={{ color: step.accent }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-white">{step.phase}</h3>
                    <span className="text-[11px] text-white/20">{step.timeline}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-[14px] leading-[1.7] text-white/35">
                  {step.description}
                </p>

                {/* Deliverables */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {step.deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-full px-3 py-1 text-[11px] font-medium"
                      style={{
                        background: `${step.accent}10`,
                        border: `1px solid ${step.accent}15`,
                        color: step.accent,
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

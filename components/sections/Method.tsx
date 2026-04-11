"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "Cadrage",
    timeline: "Semaines 1–2",
    description:
      "On valide votre idée, on définit le MVP juste — pas plus, pas moins. On mappe vos process et on identifie ce qu'on peut automatiser dès le départ.",
    deliverable: "Scope MVP + roadmap",
    accent: "#EEFF66",
  },
  {
    number: "02",
    phase: "Construction",
    timeline: "Semaines 3–10",
    description:
      "On build votre app, votre site optimisé SEO/GEO, et vos workflows automatisés. Propulsé par l'IA, testé avec de vrais utilisateurs.",
    deliverable: "MVP + site + automatisations",
    accent: "#7C9EFF",
  },
  {
    number: "03",
    phase: "Premiers clients",
    timeline: "Semaine 10+",
    description:
      "SEO/GEO en place, stratégie d'acquisition lancée, accompagnement hands-on sur vos premières ventes. On ne part pas tant que ça ne rapporte pas.",
    deliverable: "Revenue + clients payants",
    accent: "#4ECBA0",
  },
];

export function Method() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" id="method">
      <div className="section-divider mx-auto mb-32 w-full max-w-[1100px]" />

      {/* Ambient orb */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[10%] top-[40%] h-[380px] w-[380px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(238,255,102,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float-orb 25s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left: sticky heading */}
          <div className="lg:sticky lg:top-32 lg:w-[360px] lg:shrink-0">
            <ScrollReveal>
              <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase">
                Notre méthode
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="mt-7 text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                3 étapes.<br />
                90 jours.<br />
                <em className="gradient-text not-italic">Des résultats.</em>
              </h2>
              <p className="mt-5 text-[14px] leading-[1.7] text-white/30">
                De l'idée au premier euro. Un process clair, des livrables concrets.
              </p>
              <Link
                href="/offre"
                className="group/link mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#EEFF66]/60 transition-all hover:text-[#EEFF66]"
              >
                Voir l'offre complète
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right: step cards */}
          <div className="flex-1 space-y-4">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.1 * i}>
                <TiltCard
                  className="group p-7 transition-all duration-500"
                  intensity={4}
                >
                  <div className="flex items-start gap-6">
                    <span
                      className="text-6xl font-medium leading-none tracking-[-0.04em] opacity-20 transition-opacity duration-500 group-hover:opacity-60"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-[15px] font-medium text-[#E8E8E2]">
                          {step.phase}
                        </h3>
                        <span className="rounded-full bg-white/[0.04] px-3 py-0.5 text-[10px] text-white/25 tracking-[0.04em]">
                          {step.timeline}
                        </span>
                      </div>
                      <p className="mt-3 text-[13px] leading-[1.7] text-white/35">
                        {step.description}
                      </p>
                    </div>

                    <span
                      className="hidden shrink-0 self-center rounded-lg px-3.5 py-2 text-[11px] font-medium md:inline-flex"
                      style={{
                        background: `${step.accent}0D`,
                        border: `0.5px solid ${step.accent}22`,
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

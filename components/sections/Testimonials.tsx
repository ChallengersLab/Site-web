"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";

const testimonials = [
  {
    quote:
      "En 3 mois, notre pipeline a triplé. L'équipe ChallengersLab ne vend pas du rêve, ils livrent.",
    name: "Thomas M.",
    role: "CEO, SaaS B2B",
    detail: "45 collaborateurs",
    metric: "×3",
    metricLabel: "pipeline",
    accent: "#7B5EFF",
  },
  {
    quote:
      "Le coaching Challenger Sales a transformé notre approche commerciale. On ne vend plus pareil. Et ça se voit sur les chiffres.",
    name: "Sophie L.",
    role: "Dir. Commerciale",
    detail: "Scale-up fintech",
    metric: "+85%",
    metricLabel: "close rate",
    accent: "#00F5FF",
  },
  {
    quote:
      "L'automatisation qu'ils ont mise en place nous fait gagner 15h par semaine. 15 heures. Par personne.",
    name: "Marc K.",
    role: "COO, Agence digitale",
    detail: "30 collaborateurs",
    metric: "15h",
    metricLabel: "/ semaine",
    accent: "#a78bfa",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [50, -70]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[10%] bottom-[10%] h-[350px] w-[350px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float-orb-reverse 20s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Témoignages
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Nos clients parlent<br />
            <em className="gradient-text">mieux que nous</em>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={0.12 * i}>
              <TiltCard className="group flex h-full flex-col p-8 transition-all duration-500" intensity={5}>
                {/* Metric badge */}
                <div className="mb-5 flex items-end gap-2">
                  <span
                    className="font-display text-4xl tracking-tight"
                    style={{ color: t.accent }}
                  >
                    {t.metric}
                  </span>
                  <span className="mb-1 text-[10px] uppercase tracking-widest text-white/25">
                    {t.metricLabel}
                  </span>
                </div>

                <blockquote className="flex-1 text-[14px] leading-[1.75] text-white/50">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-8 border-t border-white/6 pt-5">
                  <p className="text-[14px] font-semibold text-white/80">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[12px] text-white/30">
                    {t.role} &middot; {t.detail}
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

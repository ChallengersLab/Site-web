"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Clock, AlertTriangle, CreditCard } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    stat: "60%",
    statLabel: "du temps perdu",
    title: "Vos commerciaux perdent 60% de leur temps",
    description:
      "Recherche de leads manuelle, qualification approximative, relances oubliées. Pendant ce temps, vos concurrents automatisent.",
    accentColor: "#7B5EFF",
  },
  {
    icon: AlertTriangle,
    stat: "2019",
    statLabel: "vos process datent",
    title: "Vos process sont ceux de 2019",
    description:
      "CRM mal configuré, données en silos, reporting approximatif. Vous pilotez à vue dans un marché qui accélère.",
    accentColor: "#00F5FF",
  },
  {
    icon: CreditCard,
    stat: "20%",
    statLabel: "d'adoption",
    title: "Vous payez des outils que personne n'utilise",
    description:
      "3k€/mois de stack SaaS pour 20% d'adoption. L'outil n'est pas le problème. C'est l'implémentation.",
    accentColor: "#a78bfa",
  },
];

export function Results() {
  return (
    <section className="relative py-32 overflow-hidden" id="results">
      <div
        className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123,94,255,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Le constat
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            80% des PME B2B vont se faire<br />
            <span className="gradient-text"><em>dépasser dans les 2 ans</em></span>
          </h2>
        </ScrollReveal>

        {/* Asymmetric layout: 1 large featured + 2 stacked */}
        <div className="mt-16 grid gap-5 lg:grid-cols-5">
          {/* Featured card — spans 3 cols */}
          <ScrollReveal delay={0} className="lg:col-span-3">
            <TiltCard className="h-full p-10 transition-all duration-500">
              <div className="flex items-end gap-4">
                <span
                  className="font-display text-7xl tracking-tight md:text-8xl"
                  style={{ color: painPoints[0].accentColor }}
                >
                  {painPoints[0].stat}
                </span>
                <span className="mb-3 text-[11px] uppercase tracking-widest text-white/25">
                  {painPoints[0].statLabel}
                </span>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `${painPoints[0].accentColor}12`,
                    border: `1px solid ${painPoints[0].accentColor}20`,
                  }}
                >
                  <Clock className="h-5 w-5" style={{ color: painPoints[0].accentColor }} />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-white/90">
                    {painPoints[0].title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14px] leading-[1.7] text-white/35">
                    {painPoints[0].description}
                  </p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* 2 stacked cards — span 2 cols */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {painPoints.slice(1).map((point, i) => (
              <ScrollReveal key={point.title} delay={0.15 * (i + 1)}>
                <TiltCard className="h-full p-7 transition-all duration-500" intensity={8}>
                  <div className="flex items-end gap-3">
                    <span
                      className="font-display text-4xl tracking-tight"
                      style={{ color: point.accentColor }}
                    >
                      {point.stat}
                    </span>
                    <span className="mb-0.5 text-[10px] uppercase tracking-widest text-white/25">
                      {point.statLabel}
                    </span>
                  </div>

                  <div
                    className="mt-4 flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      background: `${point.accentColor}12`,
                      border: `1px solid ${point.accentColor}20`,
                    }}
                  >
                    <point.icon className="h-4 w-4" style={{ color: point.accentColor }} />
                  </div>

                  <h3 className="mt-4 text-[14px] font-semibold leading-snug text-white/90">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.7] text-white/30">
                    {point.description}
                  </p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

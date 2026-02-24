"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
      {/* Ambient glow */}
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

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {painPoints.map((point, i) => (
            <ScrollReveal key={point.title} delay={0.12 * i}>
              <div className="glass-card group h-full p-8 transition-all duration-500">
                {/* Stat highlight */}
                <div className="mb-6 flex items-end gap-3">
                  <span
                    className="font-display text-5xl tracking-tight"
                    style={{ color: point.accentColor }}
                  >
                    {point.stat}
                  </span>
                  <span className="mb-1 text-[11px] uppercase tracking-widest text-white/25">
                    {point.statLabel}
                  </span>
                </div>

                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    background: `${point.accentColor}12`,
                    border: `1px solid ${point.accentColor}20`,
                  }}
                >
                  <point.icon className="h-4 w-4" style={{ color: point.accentColor }} />
                </div>

                <h3 className="mt-5 text-[15px] font-semibold leading-snug text-white/90">
                  {point.title}
                </h3>

                <p className="mt-3 text-[13px] leading-[1.7] text-white/35">
                  {point.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

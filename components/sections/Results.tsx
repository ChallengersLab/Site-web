"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AlertTriangle, Clock, CreditCard } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    title: "Vos commerciaux perdent 60% de leur temps",
    description:
      "Recherche de leads manuelle, qualification approximative, relances oubliées. Pendant ce temps, vos concurrents automatisent.",
    accent: "#7B5EFF",
  },
  {
    icon: AlertTriangle,
    title: "Vos process sont ceux de 2019",
    description:
      "CRM mal configuré, données en silos, reporting approximatif. Vous pilotez à vue dans un marché qui accélère.",
    accent: "#00F5FF",
  },
  {
    icon: CreditCard,
    title: "Vous payez des outils que personne n'utilise",
    description:
      "3k€/mois de stack SaaS pour 20% d'adoption. L'outil n'est pas le problème. C'est l'implémentation.",
    accent: "#a78bfa",
  },
];

export function Results() {
  return (
    <section className="relative py-28" id="results">
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, #7B5EFF 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-xs font-medium">
            Le constat
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-white">80% des PME B2B vont se faire</span>
            <br />
            <span className="gradient-text">dépasser dans les 2 ans</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {painPoints.map((point, i) => (
            <ScrollReveal key={point.title} delay={0.15 * i}>
              <div className="group relative h-full rounded-2xl border border-white/6 bg-surface p-8 transition-all duration-300 hover:border-white/12 hover:bg-surface-light">
                {/* Top accent line */}
                <div
                  className="absolute left-8 right-8 top-0 h-px opacity-40"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${point.accent}, transparent)`,
                  }}
                />

                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `${point.accent}15`,
                    border: `1px solid ${point.accent}25`,
                  }}
                >
                  <point.icon
                    className="h-5 w-5"
                    style={{ color: point.accent }}
                  />
                </div>

                <h3 className="font-display mt-5 text-lg font-bold text-white">
                  {point.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/45">
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

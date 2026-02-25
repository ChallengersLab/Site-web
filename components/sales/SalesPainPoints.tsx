"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Phone, Route, BarChart3 } from "lucide-react";

const painPoints = [
  {
    icon: Phone,
    stat: "x3",
    statLabel: "de volume possible",
    title: "Pas de culture outbound, ou une prospection pleine de trous",
    description:
      "Soit vos équipes n'ont jamais prospecté et tout repose sur l'entrant. Soit elles prospectent, mais sur des listes mal ciblées, avec un discours pas testé et sans vraie méthode. Dans les deux cas, le pipeline stagne. On corrige le ciblage, le message et le rythme.",
    accentColor: "#7B5EFF",
  },
  {
    icon: Route,
    stat: "90j",
    statLabel: "pour structurer",
    title: "Un playbook, des scripts, un onboarding : vos résultats ne dépendent plus d'une seule personne",
    description:
      "Quand le process est dans la tête du meilleur commercial, tout repart à zéro à chaque départ. On pose les méthodes et la formation pour que la perf tienne, même quand quelqu'un s'en va.",
    accentColor: "#a78bfa",
  },
  {
    icon: BarChart3,
    stat: "KPIs",
    statLabel: "clairs dès le mois 1",
    title: "Piloter par les chiffres : MRR, conversion, coût d'acquisition",
    description:
      "Sans tableau de bord fiable, chaque décision est un pari. On installe les KPIs qui comptent et le reporting qui tourne tout seul. Vous recrutez, investissez et scalez avec les bons chiffres sous les yeux.",
    accentColor: "#00F5FF",
  },
];

export function SalesPainPoints() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123,94,255,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Le constat
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Vous avez le produit.
            <br />
            <span className="gradient-text">
              <em>Il manque la machine.</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-white/30">
            La plupart des startups et scale-ups B2B qu&apos;on accompagne ont le même point de départ. Un bon produit, pas encore de système commercial en place.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {painPoints.map((point, i) => (
            <ScrollReveal key={point.title} delay={0.12 * i}>
              <TiltCard className="group h-full p-8 transition-all duration-500" intensity={6}>
                <div className="flex items-end gap-3">
                  <span
                    className="font-display text-4xl tracking-tight md:text-5xl"
                    style={{ color: point.accentColor }}
                  >
                    {point.stat}
                  </span>
                  <span className="mb-1 text-[10px] uppercase tracking-widest text-white/25">
                    {point.statLabel}
                  </span>
                </div>

                <div
                  className="mt-5 flex h-9 w-9 items-center justify-center rounded-xl"
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
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

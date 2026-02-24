"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Clock, AlertTriangle, CreditCard, Target, Users } from "lucide-react";

/* ── Prospection pains (row 1: 1 featured + 2 stacked) ── */
const prospectionPains = [
  {
    icon: Clock,
    stat: "20",
    statLabel: "appels/jour max",
    title: "Vos SDR composent un par un pendant que d'autres en passent 80",
    description:
      "Sans power dialer, vos commerciaux passent plus de temps à chercher des numéros qu'à parler à des prospects. Avec les bons outils, un SDR triple son volume d'appels — et vous ne payez pas 3 commerciaux pour le travail d'un seul.",
    accentColor: "#7B5EFF",
  },
  {
    icon: AlertTriangle,
    stat: "x0",
    statLabel: "process reproductible",
    title: "Chaque commercial invente sa méthode — et vous recommencez à zéro à chaque départ",
    description:
      "Pas de playbook, pas de scripts, pas de séquences. Les bons résultats dépendent de la personne, pas du process. Quand elle part, tout repart à zéro.",
    accentColor: "#a78bfa",
  },
  {
    icon: CreditCard,
    stat: "0",
    statLabel: "trace de vos calls",
    title: "Vos appels disparaissent — zéro trace, zéro apprentissage",
    description:
      "Pas de transcription, pas de synthèse, pas de CRM mis à jour après l'appel. L'IA sait aujourd'hui transcrire, résumer et qualifier un call en temps réel. Vos concurrents l'utilisent déjà pour coacher leurs équipes et raccourcir leurs cycles de vente.",
    accentColor: "#00F5FF",
  },
];

/* ── Direction commerciale pains (row 2: 2 equal cards) ── */
const dirCoPains = [
  {
    icon: Target,
    stat: "0",
    statLabel: "KPI suivi",
    title: "Vous pilotez votre croissance au feeling — pas aux chiffres",
    description:
      "Pas de MRR tracké, pas de taux de conversion par étape, pas de coût d'acquisition mesuré. Sans tableau de bord commercial fiable, chaque décision est un pari. Et quand ça ne marche pas, vous ne savez pas pourquoi.",
    accentColor: "#7B5EFF",
  },
  {
    icon: Users,
    stat: "6",
    statLabel: "mois pour être rentable",
    title: "Chaque recrutement commercial est un coup de poker à 30K€",
    description:
      "Pas de fiche de poste calibrée, pas d'onboarding structuré, pas de méthode de vente transmise. Votre nouveau SDR met 6 mois à performer — quand il ne part pas avant. Sans direction commerciale, vous recrutez à l'instinct et formez au cas par cas.",
    accentColor: "#a78bfa",
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
            Votre offre est bonne.
            <br />
            <span className="gradient-text">
              <em>Votre machine commerciale, non.</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-white/30">
            On voit les mêmes problèmes dans 80% des PME B2B. La bonne nouvelle : ils se règlent en 90 jours.
          </p>
        </ScrollReveal>

        {/* ── Row 1: Prospection pains — 1 large featured + 2 stacked ── */}
        <div className="mt-16 grid gap-5 lg:grid-cols-5">
          {/* Featured card — spans 3 cols */}
          <ScrollReveal delay={0} className="lg:col-span-3">
            <TiltCard className="h-full p-10 transition-all duration-500">
              <div className="flex items-end gap-4">
                <span
                  className="font-display text-7xl tracking-tight md:text-8xl"
                  style={{ color: prospectionPains[0].accentColor }}
                >
                  {prospectionPains[0].stat}
                </span>
                <span className="mb-3 text-[11px] uppercase tracking-widest text-white/25">
                  {prospectionPains[0].statLabel}
                </span>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `${prospectionPains[0].accentColor}12`,
                    border: `1px solid ${prospectionPains[0].accentColor}20`,
                  }}
                >
                  <Clock className="h-5 w-5" style={{ color: prospectionPains[0].accentColor }} />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-white/90">
                    {prospectionPains[0].title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14px] leading-[1.7] text-white/35">
                    {prospectionPains[0].description}
                  </p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* 2 stacked cards — span 2 cols */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {prospectionPains.slice(1).map((point, i) => (
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

        {/* ── Row 2: Direction commerciale pains — 2 equal cards ── */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {dirCoPains.map((point, i) => (
            <ScrollReveal key={point.title} delay={0.1 * i}>
              <TiltCard className="h-full p-8 transition-all duration-500" intensity={6}>
                <div className="flex items-end gap-4">
                  <span
                    className="font-display text-5xl tracking-tight md:text-6xl"
                    style={{ color: point.accentColor }}
                  >
                    {point.stat}
                  </span>
                  <span className="mb-2 text-[11px] uppercase tracking-widest text-white/25">
                    {point.statLabel}
                  </span>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: `${point.accentColor}12`,
                      border: `1px solid ${point.accentColor}20`,
                    }}
                  >
                    <point.icon className="h-4 w-4" style={{ color: point.accentColor }} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug text-white/90">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-white/35">
                      {point.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

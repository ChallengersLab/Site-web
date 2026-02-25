"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Workflow, Code2, Globe, Brain } from "lucide-react";

const capabilities = [
  {
    icon: Workflow,
    title: "Automatisation workflow",
    before: "3h de copier-coller par jour entre vos outils",
    after: "Vos outils se parlent. Tout seuls.",
    description:
      "Make, n8n, Zapier. On connecte votre stack et on automatise ce qui vous bouffe du temps.",
    accent: "#7B5EFF",
  },
  {
    icon: Code2,
    title: "Apps sur mesure IA-first",
    before: "6 mois avec une agence, et le résultat ne colle pas à votre métier",
    after: "Une app qui colle à vos process, pas l'inverse.",
    description:
      "Développement sur mesure avec l'IA. Intégration à l'existant, logique métier complexe, CRM, dashboards.",
    accent: "#00F5FF",
  },
  {
    icon: Globe,
    title: "Sites web intelligents",
    before: "Un site vitrine qui ne fait rien pour vous",
    after: "Un site qui qualifie, répond et convertit.",
    description:
      "Sites avec chatbots, personnalisation, génération de contenu IA.",
    accent: "#a78bfa",
  },
  {
    icon: Brain,
    title: "Intégration & enrichissement IA",
    before: "Des décisions au feeling, zéro data",
    after: "Chaque donnée enrichie, scorée, exploitable.",
    description:
      "OpenAI, Claude, Mistral. Scoring, matching, enrichissement automatique sur vos données.",
    accent: "#00F5FF",
  },
];

export function IACapabilities() {
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
            background:
              "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Ce qu&apos;on fait
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Quatre piliers.{" "}
            <em className="gradient-text">Zéro bullshit.</em>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-white/30">
            Process manuel, app qui manque, données inexploitées. On règle le problème.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={0.1 * i}>
              <TiltCard
                className="group h-full p-8 transition-all duration-500"
                intensity={6}
              >
                {/* Icon */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `${cap.accent}12`,
                    border: `1px solid ${cap.accent}20`,
                  }}
                >
                  <cap.icon
                    className="h-5 w-5"
                    style={{ color: cap.accent }}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-[17px] font-semibold leading-snug text-white/90">
                  {cap.title}
                </h3>

                {/* Before / After */}
                <div className="mt-4 space-y-2">
                  <p className="text-[13px] leading-[1.6] text-white/25 line-through decoration-white/15">
                    {cap.before}
                  </p>
                  <p
                    className="text-[14px] font-medium leading-[1.6]"
                    style={{ color: cap.accent }}
                  >
                    {cap.after}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-4 text-[13px] leading-[1.7] text-white/35">
                  {cap.description}
                </p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

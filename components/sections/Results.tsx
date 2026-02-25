"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Phone, Workflow, Settings } from "lucide-react";

const painPoints = [
  {
    icon: Phone,
    title: "Le bouche-à-oreille ne suffit plus",
    description:
      "Le réseau vous a amenés jusque-là. Mais pour passer un cap, il faut une prospection structurée, un pipe prévisible, et un process qui ne dépend pas que des relations.",
    accentColor: "#7B5EFF",
  },
  {
    icon: Workflow,
    title: "Vos opérations tournent à la main",
    description:
      "Copier-coller entre outils, reporting manuel, données éparpillées. Chaque heure perdue là-dessus, c'est une heure en moins sur le business.",
    accentColor: "#00F5FF",
  },
  {
    icon: Settings,
    title: "Personne pour connecter les deux",
    description:
      "Vous cherchez un commercial qui comprend la tech, ou un tech qui comprend le business. Bonne chance. Généralement, vous finissez avec deux prestataires qui ne se parlent pas.",
    accentColor: "#a78bfa",
  },
];

export function Results() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" id="results">
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
            Bon produit.{" "}
            <em className="gradient-text">Croissance qui stagne.</em>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {painPoints.map((point, i) => (
            <ScrollReveal key={point.title} delay={0.12 * i}>
              <TiltCard className="group h-full p-8 transition-all duration-500" intensity={6}>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `${point.accentColor}12`,
                    border: `1px solid ${point.accentColor}20`,
                  }}
                >
                  <point.icon className="h-5 w-5" style={{ color: point.accentColor }} />
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

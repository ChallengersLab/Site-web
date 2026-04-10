"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Phone, Workflow, Settings } from "lucide-react";

const painPoints = [
  {
    icon: Phone,
    title: "Le bouche-à-oreille a ses limites",
    description:
      "Le réseau vous a amenés jusque-là. Pour passer un cap, il faut un pipe structuré et une prospection prévisible — pas juste des introductions.",
    accentColor: "#7C9EFF",
  },
  {
    icon: Workflow,
    title: "Vous perdez des heures sur des tâches évitables",
    description:
      "Copier-coller, reporting manuel, relances oubliées. Chaque heure passée là-dessus, c'est une heure de moins sur ce qui fait vraiment avancer le business.",
    accentColor: "#EEFF66",
  },
  {
    icon: Settings,
    title: "Sales et tech ne parlent pas le même langage",
    description:
      "Vous cherchez quelqu'un qui comprend le business ET les outils. Souvent, ça veut dire deux prestataires — qui ne se coordonnent jamais vraiment.",
    accentColor: "#4ECBA0",
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
        className="absolute right-[5%] top-[20%] h-[380px] w-[380px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,158,255,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-iris inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase">
            Le constat
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            Vous êtes dans{" "}
            <em className="gradient-text not-italic">l&apos;une de ces situations ?</em>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {painPoints.map((point, i) => (
            <ScrollReveal key={point.title} delay={0.1 * i}>
              <TiltCard className="group h-full p-7 transition-all duration-500" intensity={6}>
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    background: `${point.accentColor}10`,
                    border: `0.5px solid ${point.accentColor}22`,
                  }}
                >
                  <point.icon className="h-4 w-4" style={{ color: point.accentColor }} />
                </div>

                <h3 className="mt-5 text-[14px] font-medium leading-snug text-[#E8E8E2]">
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

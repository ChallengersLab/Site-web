"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Phone, Workflow, Settings } from "lucide-react";

const painPoints = [
  {
    icon: Phone,
    title: "Vous avez l'idée, mais pas le CTO",
    description:
      "Votre concept est solide, mais entre le prototype et un vrai produit, il y a un gouffre. Recruter un CTO coûte cher et prend du temps. Vous avez besoin de quelqu'un qui build — maintenant.",
    accentColor: "#7C9EFF",
  },
  {
    icon: Workflow,
    title: "Vos process sont manuels et ne scalent pas",
    description:
      "Onboarding à la main, relances oubliées, données éparpillées. Vous passez plus de temps à gérer qu'à construire. Ce qui marchait à 10 utilisateurs explose à 100.",
    accentColor: "#EEFF66",
  },
  {
    icon: Settings,
    title: "Un site en ligne ne suffit pas — il faut des clients",
    description:
      "Votre app est live, votre landing page est jolie, mais personne ne vient. Le SEO prend des mois, les ads coûtent cher, et vous ne savez pas par où commencer pour signer vos premiers payants.",
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

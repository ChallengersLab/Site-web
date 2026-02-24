"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import type { BUConfig } from "@/lib/bu-config";

interface TeamMemberProps {
  director: BUConfig["director"];
  accent: string;
}

export function TeamMember({ director, accent }: TeamMemberProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [50, -70]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="section-divider mx-auto mb-32 w-full max-w-[1100px]" />

      {/* Ambient orb with parallax */}
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[5%] top-[20%] h-[350px] w-[350px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
            filter: "blur(80px)",
            animation: "float-orb-reverse 20s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Votre interlocuteur
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-16 max-w-2xl">
            <TiltCard
              className="group flex flex-col sm:flex-row items-center gap-8 p-8 transition-all duration-500"
              intensity={4}
            >
              {/* Avatar placeholder */}
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(to bottom right, ${accent}, transparent)`,
                }}
              >
                <span className="font-display text-2xl text-white">
                  {director.photoPlaceholder}
                </span>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-display text-2xl text-white">
                  {director.name}
                </h3>
                <p className="mt-1 flex items-center gap-2 text-[14px] text-white/40">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  {director.title}
                </p>
                <p className="mt-3 text-[15px] leading-[1.7] text-white/40">
                  {director.bio}
                </p>
              </div>
            </TiltCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

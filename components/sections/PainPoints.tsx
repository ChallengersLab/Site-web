"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import type { BUConfig } from "@/lib/bu-config";

export function PainPoints({
  painPoints,
  accent,
}: {
  painPoints: BUConfig["painPoints"];
  accent: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden" id="pain-points">
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent}26 0%, transparent 70%)`,
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
            Pourquoi ça ne{" "}
            <span className="gradient-text">
              <em>scale pas</em>
            </span>
          </h2>
        </ScrollReveal>

        {/* Asymmetric layout: 1 large featured + 2 stacked */}
        <div className="mt-16 grid gap-5 lg:grid-cols-5">
          {/* Featured card — spans 3 cols */}
          {(() => {
            const featured = painPoints[0];
            const FeaturedIcon = featured.icon;
            return (
              <ScrollReveal delay={0} className="lg:col-span-3">
                <TiltCard className="h-full p-10 transition-all duration-500">
                  <div className="flex items-end gap-4">
                    <span
                      className="font-display text-7xl tracking-tight md:text-8xl"
                      style={{ color: accent }}
                    >
                      {featured.stat}
                    </span>
                    <span className="mb-3 text-[11px] uppercase tracking-widest text-white/25">
                      {featured.statLabel}
                    </span>
                  </div>

                  <div className="mt-8 flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: `${accent}12`,
                        border: `1px solid ${accent}20`,
                      }}
                    >
                      <FeaturedIcon className="h-5 w-5" style={{ color: accent }} />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-semibold text-white/90">
                        {featured.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[14px] leading-[1.7] text-white/35">
                        {featured.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })()}

          {/* 2 stacked cards — span 2 cols */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {painPoints.slice(1).map((point, i) => {
              const Icon = point.icon;
              return (
                <ScrollReveal key={point.title} delay={0.15 * (i + 1)}>
                  <TiltCard className="h-full p-7 transition-all duration-500" intensity={8}>
                    <div className="flex items-end gap-3">
                      <span
                        className="font-display text-4xl tracking-tight"
                        style={{ color: accent }}
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
                        background: `${accent}12`,
                        border: `1px solid ${accent}20`,
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: accent }} />
                    </div>

                    <h3 className="mt-4 text-[14px] font-semibold leading-snug text-white/90">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-[1.7] text-white/30">
                      {point.description}
                    </p>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

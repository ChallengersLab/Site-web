"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Check } from "lucide-react";
import type { BUConfig } from "@/lib/bu-config";

interface ServicesDetailProps {
  services: BUConfig["services"];
  accent: string;
}

export function ServicesDetail({ services, accent }: ServicesDetailProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const primary = services.filter((s) => s.isPrimary);
  const secondary = services.filter((s) => !s.isPrimary);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Ambient orb with parallax */}
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[5%] top-[30%] h-[400px] w-[400px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent}1F 0%, transparent 70%)`,
            filter: "blur(80px)",
            animation: "float-orb 25s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Nos services
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Ce qu&apos;on fait.
            <br />
            <em className="gradient-text">Concr&egrave;tement.</em>
          </h2>
        </ScrollReveal>

        {/* Primary services – larger cards */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {primary.map((service, i) => (
            <ScrollReveal key={service.title} delay={0.15 * i}>
              <TiltCard
                className="group h-full overflow-hidden p-10 transition-all duration-500"
                intensity={5}
              >
                {/* Hover corner glow */}
                <div
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                  style={{ background: accent, filter: "blur(50px)" }}
                />

                {/* Icon box */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `${accent}12`,
                    border: `1px solid ${accent}20`,
                  }}
                >
                  <service.icon className="h-5 w-5" style={{ color: accent }} />
                </div>

                <h3 className="font-display mt-6 text-xl text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.7] text-white/35">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-[13px] text-white/40"
                    >
                      <Check
                        className="h-3 w-3 shrink-0"
                        style={{ color: accent }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Secondary services – smaller cards */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {secondary.map((service, i) => (
            <ScrollReveal key={service.title} delay={0.15 * i + 0.3}>
              <TiltCard
                className="group h-full overflow-hidden p-8 transition-all duration-500"
                intensity={4}
              >
                {/* Hover corner glow */}
                <div
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                  style={{ background: accent, filter: "blur(50px)" }}
                />

                {/* Icon box */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `${accent}12`,
                    border: `1px solid ${accent}20`,
                  }}
                >
                  <service.icon className="h-5 w-5" style={{ color: accent }} />
                </div>

                <h3 className="font-display mt-5 text-lg text-white">
                  {service.title}
                </h3>

                <p className="mt-2 text-[14px] leading-[1.7] text-white/35">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-[13px] text-white/40"
                    >
                      <Check
                        className="h-3 w-3 shrink-0"
                        style={{ color: accent }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

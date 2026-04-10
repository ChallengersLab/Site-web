"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { useCountUp } from "@/hooks/use-count-up";

/* ------------------------------------------------------------------ */
/*  CountUpStat — animated number that counts up when scrolled in view */
/* ------------------------------------------------------------------ */
function CountUpStat({
  end,
  prefix,
  suffix,
  label,
  accent,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  accent: string;
}) {
  const { ref, value } = useCountUp(end, 2200);
  return (
    <div>
      <p
        className="font-display text-5xl tracking-tight"
        style={{ color: accent }}
      >
        <span ref={ref}>
          {prefix}
          {value}
          {suffix}
        </span>
      </p>
      <p className="mt-3 text-[13px] text-white/30">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  StaticStat — non-animated stat display                            */
/* ------------------------------------------------------------------ */
function StaticStat({
  text,
  label,
  accent,
}: {
  text: string;
  label: string;
  accent: string;
}) {
  return (
    <div>
      <p
        className="font-display text-5xl tracking-tight"
        style={{ color: accent }}
      >
        {text}
      </p>
      <p className="mt-3 text-[13px] text-white/30">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SalesMetrics                                                      */
/* ------------------------------------------------------------------ */
export function SalesMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* ---------- parallax orb ---------- */}
      <motion.div
        className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,158,255,0.5) 0%, transparent 70%)",
          y: orbY,
        }}
      />

      <div className="mx-auto max-w-[1100px] px-6">
        {/* ---------- divider ---------- */}
        <div className="section-divider mx-auto mb-16 w-full max-w-[1100px]" />

        {/* ---------- badge ---------- */}
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            R&eacute;sultats
          </span>
        </ScrollReveal>

        {/* ---------- heading ---------- */}
        <ScrollReveal delay={0.05}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Ce que nos clients obtiennent
            <br />
            <em className="gradient-text">en 90 jours</em>
          </h2>
        </ScrollReveal>

        {/* ---------- stat cards ---------- */}
        <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {/* 1 — +320% */}
          <ScrollReveal delay={0}>
            <TiltCard className="p-8 text-center">
              <CountUpStat
                end={320}
                prefix="+"
                suffix="%"
                label="Pipeline g&eacute;n&eacute;r&eacute;"
                accent="#7C9EFF"
              />
            </TiltCard>
          </ScrollReveal>

          {/* 2 — x3 */}
          <ScrollReveal delay={0.1}>
            <TiltCard className="p-8 text-center">
              <StaticStat
                text="\u00d73"
                label="RDV qualifi&eacute;s"
                accent="#7C9EFF"
              />
            </TiltCard>
          </ScrollReveal>

          {/* 3 — <90j */}
          <ScrollReveal delay={0.2}>
            <TiltCard className="p-8 text-center">
              <CountUpStat
                end={90}
                prefix="<"
                suffix="j"
                label="Pour des r&eacute;sultats"
                accent="#7C9EFF"
              />
            </TiltCard>
          </ScrollReveal>

          {/* 4 — 0 */}
          <ScrollReveal delay={0.3}>
            <TiltCard className="p-8 text-center">
              <StaticStat
                text="0"
                label="Recrutement n&eacute;cessaire"
                accent="#4ECBA0"
              />
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

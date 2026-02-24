"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BUConfig } from "@/lib/bu-config";

const stagger = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.1, staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ServicePageHero({ config }: { config: BUConfig }) {
  // Split headline around the gradient portion
  const headlineParts = config.headline.split(config.headlineGradient);
  const before = headlineParts[0] ?? "";
  const after = headlineParts[1] ?? "";

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* ---- Background layers ---- */}
      <div
        className="absolute -left-[20%] -top-[10%] h-[700px] w-[700px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${config.accent}59 0%, transparent 65%)`,
          animation: "float-orb 18s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-[15%] -right-[15%] h-[600px] w-[600px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${config.accent}33 0%, transparent 65%)`,
          animation: "float-orb-reverse 22s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div className="hero-grid absolute inset-0" />

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pt-36 pb-24 md:pt-44 md:pb-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="badge-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: config.accent,
                  boxShadow: `0 0 8px 2px ${config.accent}99`,
                }}
              />
              {config.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="mt-10">
            <span className="font-display block text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-white">
              {before.trimEnd()}
            </span>
            <span className="font-display block text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.92] tracking-[-0.02em] gradient-text mt-2">
              <em>{config.headlineGradient}{after}</em>
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-lg text-[17px] leading-[1.7] text-white/40"
          >
            {config.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={config.ctaHref}
              className="btn-glow inline-flex items-center gap-3 rounded-xl px-8 py-4 text-[15px]"
            >
              <span>{config.ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Proof */}
          <motion.p variants={fadeUp} className="mt-6 text-[13px] text-white/20">
            {config.proofText}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

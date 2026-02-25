"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
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

export function SalesHero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background orbs - PURPLE */}
      <div
        className="absolute -left-[20%] -top-[10%] h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123,94,255,0.35) 0%, transparent 65%)",
          animation: "float-orb 18s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-[15%] -right-[15%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123,94,255,0.2) 0%, transparent 65%)",
          animation: "float-orb-reverse 22s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div className="hero-grid absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 pt-36 pb-24 md:pt-44 md:pb-32 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="badge-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#7B5EFF]"
                style={{ boxShadow: "0 0 8px 2px rgba(123,94,255,0.6)" }}
              />
              Sales
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="mt-10">
            <span className="font-display block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] text-white">
              Vous avez le produit.
            </span>
            <span className="font-display block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] gradient-text mt-2">
              <em>Il manque la machine.</em>
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-lg text-[17px] leading-[1.7] text-white/40"
          >
            La plupart des startups et scale-ups B2B qu&apos;on accompagne ont le même point de départ.{" "}
            <span className="text-white/75">
              Un bon produit, pas encore de système commercial en place.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10">
            <a
              href="#contact-sales"
              className="btn-glow inline-flex items-center gap-3 rounded-xl px-8 py-4 text-[15px]"
            >
              <span>Réserver un appel stratégique</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Proof */}
          <motion.p variants={fadeUp} className="mt-6 text-[13px] text-white/20">
            30 min &middot; Gratuit &middot; Sans engagement
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

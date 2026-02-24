"use client";

import { useState, useEffect } from "react";
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

const terminalLines = [
  { text: "$ cl connect --crm hubspot --source apollo", color: "text-white/60" },
  { text: "✓ Connecting CRM...                     done", color: "text-[#00F5FF]/70" },
  { text: "✓ Enriching 247 leads with Clay...      done", color: "text-[#00F5FF]/70" },
  { text: "✓ Building scoring model...             done", color: "text-[#00F5FF]/70" },
  { text: "✓ Generating sequences (Claude)...      done", color: "text-[#00F5FF]/70" },
  { text: "✓ Deploying dashboard...                live", color: "text-[#00F5FF]/70" },
  { text: "", color: "" },
  { text: "Pipeline ready. 247 leads scored. 3 workflows active.", color: "text-white/80" },
];

export function IAHero() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background orbs - CYAN */}
      <div
        className="absolute -left-[20%] -top-[10%] h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 65%)",
          animation: "float-orb 18s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-[15%] -right-[15%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 65%)",
          animation: "float-orb-reverse 22s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div className="hero-grid absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 pt-36 pb-24 md:pt-44 md:pb-32">
        <motion.div variants={stagger} initial="hidden" animate="show" className="text-center">
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="badge-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#00F5FF]"
                style={{ boxShadow: "0 0 8px 2px rgba(0,245,255,0.6)" }}
              />
              IA &amp; Automatisation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="mt-10">
            <span className="font-display block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] text-white">
              Automatisez ce que vos concurrents
            </span>
            <span className="font-display block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] gradient-text mt-2">
              <em>font encore à la main.</em>
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-lg text-[17px] leading-[1.7] text-white/40"
          >
            Sites IA, applications métier, workflows automatisés.{" "}
            <span className="text-white/75">
              On connecte l&apos;intelligence artificielle à votre business.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10">
            <a
              href="#contact-ia"
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

        {/* Terminal animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          className="mx-auto mt-16 max-w-[600px]"
        >
          <div className="glass-card overflow-hidden rounded-xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <span className="ml-2 text-[11px] text-white/20 font-mono">workflow.sh</span>
            </div>
            {/* Terminal body */}
            <div className="bg-[#0a0a0a] p-5 font-mono text-[13px] leading-[1.8]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={line.color}>
                  {line.text || "\u00A0"}
                </div>
              ))}
              {visibleLines < terminalLines.length && (
                <span className="inline-block h-4 w-1.5 animate-pulse bg-[#00F5FF]/60" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

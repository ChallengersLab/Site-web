"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Ambient gradient orbs */}
      <div
        className="absolute -left-[300px] top-[10%] h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #7B5EFF 0%, transparent 70%)",
          animation: "float-slow 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[200px] bottom-[10%] h-[500px] w-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #00F5FF 0%, transparent 70%)",
          animation: "float-slow-reverse 25s ease-in-out infinite",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="badge-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-end" style={{ boxShadow: "0 0 6px #00F5FF" }} />
              Agence AI & Sales pour PME et Scale-ups B2B
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display mt-8 text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
          >
            <span className="gradient-text-subtle">Vos concurrents</span>
            <br />
            <span className="gradient-text-subtle">utilisent déjà l&apos;IA.</span>
            <br />
            <span className="gradient-text">Et vous ?</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl"
          >
            On restructure vos ventes et vos process avec l&apos;IA.
            Pas de slides, pas de théorie.{" "}
            <span className="text-white/80 font-medium">
              Des résultats mesurables en 90 jours.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-base font-semibold text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Réserver un appel stratégique
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#sales"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-7 py-4 text-base font-medium text-white/70 transition-all hover:border-white/20 hover:text-white"
            >
              Découvrir nos offres
            </a>
          </motion.div>

          {/* Proof line */}
          <motion.p
            variants={item}
            className="mt-8 text-sm text-white/30"
          >
            30 min &middot; Gratuit &middot; Sans engagement &middot; Max 5 nouveaux clients / trimestre
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mt-20 grid grid-cols-3 gap-6 border-t border-white/8 pt-10 max-w-3xl"
        >
          {[
            { value: "47+", label: "Entreprises accompagnées" },
            { value: "+320%", label: "Croissance pipeline moyenne" },
            { value: "<90j", label: "Pour voir les premiers résultats" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-white/40 md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

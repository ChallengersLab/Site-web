"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Video background (black fallback until user provides video) */}
      <div className="absolute inset-0 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

      {/* Particle background */}
      <ParticleBackground />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.h1
          variants={item}
          className="glow-text font-bold tracking-[-0.05em]"
          style={{ fontSize: "clamp(3rem, 8vw, 10rem)" }}
        >
          Challengerslab
          <sup className="ml-2 text-xl text-accent-end" style={{
            textShadow: "0 0 10px rgba(0,245,255,0.8), 0 0 30px rgba(0,245,255,0.4)",
          }}>
            ESN
          </sup>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 font-semibold text-white/90"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)" }}
        >
          L&apos;avenir de la performance commerciale est IA
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 text-white/60"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)" }}
        >
          Cold Call &times; DIR CO &times; Sites IA &times; No-Code &mdash; Scale &times;3 en 30 jours
        </motion.p>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-[12%] left-0 right-0 z-10 text-center"
      >
        <MagneticButton href="#audit" size="large">
          Lancer mon audit gratuit 15 min
        </MagneticButton>
        <p className="mt-4 text-sm text-white/50">
          Résultats mesurables &middot; Sans engagement &middot; 47 scale-ups accompagnées
        </p>
      </motion.div>
    </section>
  );
}

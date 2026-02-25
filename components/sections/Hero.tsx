"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

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

function CountUpStat({
  end,
  prefix,
  suffix,
  label,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const { ref, value } = useCountUp(end, 2200);

  return (
    <div className="flex-1 text-center">
      <p className="font-display text-4xl tracking-tight md:text-5xl gradient-text">
        <span ref={ref}>
          {prefix}
          {value}
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-[13px] text-white/30">{label}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* ---- Background layers ---- */}
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
          background: "radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 65%)",
          animation: "float-orb-reverse 22s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div className="hero-grid absolute inset-0" />

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Left column — text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:w-[42%] lg:shrink-0"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="badge-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent-end"
                  style={{ boxShadow: "0 0 8px 2px rgba(0,245,255,0.6)" }}
                />
                Sales &times; AI &mdash; Paris
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="mt-10">
              <span className="font-display block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] text-white">
                Commerce & IA,
              </span>
              <span className="font-display block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] gradient-text mt-2">
                <em>on fait les deux.</em>
              </span>
            </motion.h1>

            {/* Sub copy */}
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-lg text-[17px] leading-[1.7] text-white/40"
            >
              Structurer vos ventes, automatiser vos process, connecter vos outils.{" "}
              <span className="text-white/75">
                On s&apos;adapte à votre situation et on avance ensemble.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="btn-glow inline-flex items-center gap-3 rounded-xl px-8 py-4 text-[15px]"
              >
                <span>Discuter de votre projet</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#sales"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/8 px-7 py-4 text-[15px] font-medium text-white/50 transition-all hover:border-white/15 hover:text-white/80"
              >
                Découvrir nos offres
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Proof */}
            <motion.p variants={fadeUp} className="mt-6 text-[13px] text-white/20">
              30 min &middot; Gratuit &middot; Sans engagement
            </motion.p>
          </motion.div>

          {/* Right column — video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="hidden md:block lg:flex-1"
          >
            <VideoPlayer
              webmSrc="/videos/circle-animation.webm"
              mp4Src="/videos/circle-animation.mp4"
              className="aspect-[16/9] w-full"
            />
          </motion.div>
        </div>

        {/* Stats bar — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass-card mt-20 flex flex-col items-center gap-8 px-8 py-8 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/[0.06]"
        >
          <CountUpStat end={20} suffix="+" label="Entreprises accompagnées" />
          <CountUpStat end={30} suffix="-90j" label="Pour des premiers résultats" />
          <div className="flex-1 text-center">
            <p className="font-display text-4xl tracking-tight md:text-5xl gradient-text">
              À la carte
            </p>
            <p className="mt-2 text-[13px] text-white/30">Commerce & tech, sur mesure</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

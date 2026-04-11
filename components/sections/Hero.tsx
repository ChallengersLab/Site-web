"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

const stagger = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
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
      <p className="text-4xl font-medium tracking-[-0.04em] md:text-5xl gradient-text">
        <span ref={ref}>
          {prefix}{value}{suffix}
        </span>
      </p>
      <p className="mt-2 text-[12px] text-white/30">{label}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background orbs */}
      <div
        className="absolute -left-[15%] -top-[5%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(238,255,102,0.1) 0%, transparent 65%)",
          animation: "float-orb 20s ease-in-out infinite",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(78,203,160,0.1) 0%, transparent 65%)",
          animation: "float-orb-reverse 25s ease-in-out infinite",
          filter: "blur(90px)",
        }}
      />
      <div className="hero-grid absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">

          {/* Left — text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:w-[46%] lg:shrink-0"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="badge-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "#4ECBA0", boxShadow: "0 0 6px 2px rgba(78,203,160,0.5)" }}
                />
                MVP &times; Automatisation &times; Premiers clients &mdash; Paris
              </span>
            </motion.div>

            {/* H1 — deux couleurs */}
            <motion.h1 variants={fadeUp} className="mt-8">
              <span className="block text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                {/* Chaque ligne a son propre dégradé calibré pour que l'ensemble soit continu */}
                <span
                  style={{
                    background: "linear-gradient(90deg, #EEFF66 0%, #9EE583 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Votre meilleure idée
                </span>
                {" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #9EE583 0%, #4ECBA0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  mérite d'exister.
                </span>
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-[16px] leading-[1.7] text-white/45"
            >
              On accompagne les fondateurs qui lancent leur SaaS à l'ère de l'IA :<br />
              <span className="text-white/65">on construit votre MVP complet, on automatise vos process, et on vous accompagne jusqu'aux premiers clients payants.</span>
            </motion.p>

            {/* Offer tags */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-2.5">
              {/* IA — vert */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "#4ECBA0" }}
                />
                {["MVP App", "Site SEO/GEO", "Automatisations"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-medium"
                    style={{ color: "#4ECBA0" }}
                  >
                    {tag}
                    <span className="ml-2 text-white/15">·</span>
                  </span>
                ))}
              </div>
              {/* Sales — jaune */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "#EEFF66" }}
                />
                {["Acquisition", "Premiers clients", "SEO/GEO"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-medium"
                    style={{ color: "#EEFF66" }}
                  >
                    {tag}
                    <span className="ml-2 text-white/15">·</span>
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="btn-glow inline-flex items-center justify-center gap-2.5 rounded-lg px-7 py-3.5 text-[14px] font-semibold"
              >
                Concrétiser mon idée
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/offre"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-[14px] font-medium text-white/45 transition-all hover:border-white/[0.14] hover:text-white/70"
              >
                Voir l'offre
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-5 text-[12px] text-white/20">
              30 min &middot; Gratuit &middot; Sans engagement
            </motion.p>
          </motion.div>

          {/* Right — video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="hidden md:block lg:flex-1"
          >
            <VideoPlayer
              webmSrc="/videos/circle-animation.webm"
              mp4Src="/videos/circle-animation.mp4"
              className="aspect-[16/9] w-full"
            />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass-card mt-16 flex flex-col items-center gap-8 px-8 py-7 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/[0.05]"
        >
          <CountUpStat end={20} suffix="+" label="Projets livrés" />
          <CountUpStat end={90} prefix="<" suffix="j" label="Pour les premiers clients" />
          <div className="flex-1 text-center">
            <p className="text-4xl font-medium tracking-[-0.04em] md:text-5xl gradient-text">
              Sur mesure
            </p>
            <p className="mt-2 text-[12px] text-white/30">Build + Automate + Grow</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

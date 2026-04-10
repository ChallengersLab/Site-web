"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

export function SalesCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden" id="contact-sales">
      {/* Orbs */}
      <motion.div
        style={{ y: orbY1, scale: orbScale }}
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,158,255,0.25) 0%, transparent 60%)",
            filter: "blur(100px)",
            animation: "pulse-soft 8s ease-in-out infinite",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: orbY2 }}
        className="absolute left-[40%] top-[30%] h-[400px] w-[400px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
            animation: "float-orb 15s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[700px] px-6 text-center">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
            On en parle{" "}
            <em className="gradient-text">de vos ventes ?</em>
          </h2>
          <p className="mx-auto mt-7 max-w-md text-[16px] leading-[1.7] text-white/35">
            30 minutes. Un appel. On vous dit ce qui peut bouger côté ventes, et ce qui n&apos;en vaut pas la peine.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href="#contact-sales"
            className="btn-glow mt-10 inline-flex items-center gap-3 rounded-xl px-10 py-5 text-[16px]"
          >
            <span>Réserver un appel stratégique</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-5 text-[12px] text-white/15">
            Gratuit &middot; Sans engagement
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [50, -70]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div
        style={{ y: orbY }}
        className="absolute left-[10%] bottom-[10%] h-[320px] w-[320px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(78,203,160,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float-orb-reverse 20s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-mint inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase">
            Témoignages
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            Nos clients parlent<br />
            <em className="gradient-text not-italic">mieux que nous</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-14 flex items-center justify-center rounded-2xl border border-white/[0.04] bg-white/[0.02] py-20 px-8">
            <p className="text-center text-[14px] text-white/35 leading-relaxed max-w-md">
              Leurs retours arrivent bientôt.<br />
              <span className="text-white/15">En attendant, on bosse.</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

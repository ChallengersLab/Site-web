"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const articles = [
  {
    label: "Lire le guide prospection B2B",
    href: "/ressources/prospection-b2b-ia-guide-complet",
  },
  {
    label: "Méthode Challenger Sales",
    href: "/ressources/challenger-sales-methode-b2b",
  },
];

export function SalesProof() {
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
        className="absolute left-[10%] bottom-[10%] h-[350px] w-[350px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,158,255,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float-orb-reverse 20s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Témoignages
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Nos clients parlent<br />
            <em className="gradient-text">mieux que nous</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 flex items-center justify-center rounded-2xl border border-white/[0.04] bg-white/[0.02] py-20 px-8">
            <p className="text-center text-[15px] text-white/40 leading-relaxed max-w-md">
              Leurs retours arrivent bientôt.<br />
              <span className="text-white/20">En attendant, on bosse.</span>
            </p>
          </div>
        </ScrollReveal>

        {/* Article links */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group inline-flex items-center gap-2 text-[13px] text-white/30 hover:text-white/60 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              {article.label}
              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

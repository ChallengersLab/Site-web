"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowRight } from "lucide-react";
import { ressources } from "@/lib/ressources";

const categories = [
  { id: "all", label: "Tout" },
  { id: "sales", label: "Sales" },
  { id: "ia", label: "IA & Auto" },
  { id: "guide", label: "Guides" },
  { id: "outil", label: "Outils" },
];

export function RessourcesHub() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? ressources
      : ressources.filter((r) => r.category === activeCategory);

  return (
    <section className="relative min-h-screen overflow-hidden pt-36 pb-32">
      {/* Background orbs */}
      <div
        className="absolute -left-[15%] top-[10%] h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(123,94,255,0.2) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "float-orb 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "float-orb-reverse 25s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        {/* Header */}
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Ressources
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-display mt-8 text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]">
            Sales &times; IA :{" "}
            <em className="gradient-text">les ressources</em>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-white/40">
            Guides pratiques, articles de fond et outils gratuits pour
            structurer vos ventes et intégrer l&apos;IA dans vos process B2B.
          </p>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-accent-start/20 text-accent-start border border-accent-start/30"
                    : "text-white/30 border border-white/[0.06] hover:text-white/50 hover:border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2">
          {filtered.map((r, i) => (
            <ScrollReveal key={r.slug} delay={0.08 * i}>
              <TiltCard
                className="group flex h-full flex-col p-8 transition-all duration-500"
                intensity={4}
              >
                {r.soon && (
                  <div className="absolute right-6 top-6 rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-medium text-white/30">
                    Bientôt
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{
                      background: `${r.tagColor}12`,
                      border: `1px solid ${r.tagColor}25`,
                      color: r.tagColor,
                    }}
                  >
                    {r.tag}
                  </span>
                  <span className="text-[11px] text-white/20">
                    {r.readTime}
                  </span>
                </div>

                <h2 className="font-display mt-5 text-[20px] leading-[1.2] text-white/90 transition-colors group-hover:text-white">
                  {r.title}
                </h2>

                <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-white/35">
                  {r.description}
                </p>

                <div className="mt-6">
                  {r.soon ? (
                    <span className="text-[13px] text-white/20">
                      Disponible prochainement
                    </span>
                  ) : (
                    <Link
                      href={`/ressources/${r.slug}`}
                      className="group/link inline-flex items-center gap-2 text-[13px] font-semibold transition-all"
                      style={{ color: r.tagColor }}
                    >
                      Lire l&apos;article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  )}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

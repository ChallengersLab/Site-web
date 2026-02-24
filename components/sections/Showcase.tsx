"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const features = [
  { label: "Prospection", active: true },
  { label: "Pipeline", active: false },
  { label: "Automation", active: false },
  { label: "Analytics", active: false },
];

const rows = [
  { name: "Acme Corp", status: "Qualifié", score: 92, stage: "Démo planifiée", accent: "#7B5EFF" },
  { name: "TechFlow SAS", status: "Nurturing", score: 78, stage: "Séquence email", accent: "#00F5FF" },
  { name: "DataBridge", status: "Chaud", score: 95, stage: "Proposition envoyée", accent: "#7B5EFF" },
  { name: "CloudSync Pro", status: "Qualifié", score: 85, stage: "Call booking", accent: "#a78bfa" },
  { name: "NeuroLab AI", status: "Chaud", score: 91, stage: "Négociation", accent: "#00F5FF" },
];

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.98]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="section-divider mx-auto mb-32 w-full max-w-[1100px]" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <div className="text-center">
          <ScrollReveal>
            <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
              En action
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display mx-auto mt-8 max-w-2xl text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
              Vos outils, <em className="gradient-text">enfin bien utilisés</em>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.7] text-white/30">
              On configure, on connecte, on automatise. Voici ce que votre
              CRM devrait ressembler après notre passage.
            </p>
          </ScrollReveal>
        </div>

        {/* Browser frame mockup */}
        <ScrollReveal delay={0.2}>
          <motion.div
            style={{ y, scale }}
            className="mt-16 overflow-hidden rounded-2xl border border-white/[0.06]"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3.5">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="rounded-lg bg-white/[0.04] px-16 py-1.5 text-[11px] text-white/20">
                  app.challengerslab.com/pipeline
                </div>
              </div>
            </div>

            {/* App content */}
            <div className="bg-[#060608] p-6 md:p-8">
              {/* Top nav tabs */}
              <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1 w-fit">
                {features.map((f) => (
                  <button
                    key={f.label}
                    className={`rounded-lg px-4 py-2 text-[12px] font-medium transition-all ${
                      f.active
                        ? "bg-accent-start/20 text-accent-start shadow-sm"
                        : "text-white/25 hover:text-white/40"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { label: "Leads actifs", value: "2,847", change: "+12% vs M-1" },
                  { label: "Taux réponse", value: "34%", change: "+8pts" },
                  { label: "Meetings bookés", value: "156", change: "+23%" },
                  { label: "Pipeline généré", value: "1.2M€", change: "+41%" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-white/20">
                      {stat.label}
                    </p>
                    <p className="mt-2 font-display text-2xl text-white/80">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-accent-end/60">
                      {stat.change}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Data table */}
              <div className="mt-6 rounded-xl border border-white/[0.04] overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-[1.5fr,1fr,80px,1.2fr] gap-4 border-b border-white/[0.04] bg-white/[0.02] px-5 py-3 text-[10px] uppercase tracking-widest text-white/20">
                  <span>Entreprise</span>
                  <span>Statut</span>
                  <span>Score</span>
                  <span>Étape</span>
                </div>
                {/* Table rows */}
                {rows.map((row, i) => (
                  <motion.div
                    key={row.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                    className="grid grid-cols-[1.5fr,1fr,80px,1.2fr] gap-4 items-center border-b border-white/[0.03] px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="text-[13px] font-medium text-white/60">
                      {row.name}
                    </span>
                    <span
                      className="inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                      style={{
                        background: `${row.accent}15`,
                        color: row.accent,
                        border: `1px solid ${row.accent}25`,
                      }}
                    >
                      {row.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${row.score}%`,
                            background: `linear-gradient(90deg, ${row.accent}, ${row.accent}80)`,
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-white/30">{row.score}</span>
                    </div>
                    <span className="text-[12px] text-white/35">{row.stage}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

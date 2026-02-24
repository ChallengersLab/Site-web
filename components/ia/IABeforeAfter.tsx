"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { X, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const beforeItems = [
  { text: "30 min de saisie par lead", detail: "Copié-collé LinkedIn → Excel → CRM. À chaque nouveau lead." },
  { text: "5 outils qui ne se parlent pas", detail: "HubSpot d'un côté, Notion de l'autre, Slack au milieu. Zéro synchro." },
  { text: "6 mois pour livrer une app métier", detail: "Cahier des charges, agence, allers-retours. Et au final, personne ne l'utilise." },
  { text: "Reporting bricolé sur Excel", detail: "Chiffres de la semaine dernière, formules cassées, 3 versions différentes." },
  { text: "Des décisions au feeling", detail: "Pas de données fiables → pas de pilotage → pas d'optimisation." },
];

const afterItems = [
  { text: "3 secondes par lead", detail: "Enrichissement, scoring et routing automatiques via IA." },
  { text: "1 workflow unifié", detail: "Vos outils connectés en temps réel. Une donnée saisie une fois, partout." },
  { text: "48h pour une app no-code", detail: "Bubble, FlutterFlow, Retool — opérationnel en jours, pas en mois." },
  { text: "Dashboard live, zéro maintenance", detail: "KPIs actualisés à la seconde. Plus jamais de reporting manuel." },
  { text: "Des décisions data-driven", detail: "Chaque action trackée, chaque euro mesuré." },
];

export function IABeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* ── Parallax orb ── */}
      <motion.div
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          y: orbY,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        {/* ── Section divider ── */}
        <div className="section-divider mx-auto mb-16 w-full max-w-[1100px]" />

        {/* ── Badge ── */}
        <div className="text-center">
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Le constat
          </span>
        </div>

        {/* ── Heading ── */}
        <h2 className="font-display mt-8 text-center text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
          Avant vs Après
          <br />
          <em className="gradient-text">l&apos;automatisation</em>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-center text-[15px] leading-[1.7] text-white/30">
          Ce n&apos;est pas de la théorie. C&apos;est ce qu&apos;on met en place chez nos clients en quelques semaines.
        </p>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          {/* Left — Avant */}
          <ScrollReveal delay={0}>
            <div className="glass-card p-8 opacity-60">
              <h3 className="font-display text-lg text-white/50 mb-6">Avant</h3>
              <div className="space-y-5">
                {beforeItems.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <X className="h-4 w-4 mt-0.5 shrink-0 text-red-400/50" />
                    <div>
                      <span className="text-[14px] leading-[1.7] text-white/35 line-through decoration-white/10">
                        {item.text}
                      </span>
                      <p className="text-[12px] text-white/15 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Après */}
          <ScrollReveal delay={0.2}>
            <div className="glass-card p-8 border border-[#00F5FF]/10">
              <h3 className="font-display text-lg text-white mb-6">Après</h3>
              <div className="space-y-5">
                {afterItems.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#00F5FF]" />
                    <div>
                      <span className="text-[14px] leading-[1.7] text-white/70">
                        {item.text}
                      </span>
                      {item.detail && (
                        <p className="text-[12px] text-white/25 mt-1">{item.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  ArrowRight,
  Zap,
  Code2,
  Workflow,
  Link2,
  Brain,
  Settings,
  BarChart3,
  Layers,
} from "lucide-react";

const offers = [
  {
    tag: "Done for you",
    title: "Automatisation",
    description:
      "On connecte vos outils et on automatise vos process. Make, n8n, Zapier. Ça tourne tout seul.",
    pricing: [{ amount: "2 000€", detail: "HT", label: "À partir de" }],
    features: [
      { icon: Workflow, text: "Workflows automatisés end-to-end" },
      { icon: Link2, text: "Connexion de votre stack existante" },
      { icon: Brain, text: "Enrichissement & scoring IA" },
      { icon: Settings, text: "Monitoring et maintenance" },
    ],
    accent: "#7B5EFF",
    ctaLabel: "Automatiser mes process",
    ctaHref: "#contact-ia",
  },
  {
    tag: "Build",
    title: "Projet sur mesure",
    recommended: true,
    description:
      "Apps métier, sites IA, CRM, dashboards. On développe avec l'IA, on intègre à votre existant, on livre.",
    pricing: [{ amount: "Sur devis", detail: "", label: "Forfait projet" }],
    features: [
      { icon: Code2, text: "Apps métier, sites IA, CRM, dashboards" },
      { icon: Layers, text: "Intégration à votre existant" },
      { icon: Brain, text: "Développement IA-first" },
      { icon: BarChart3, text: "Accompagnement de A à Z" },
    ],
    accent: "#00F5FF",
    ctaLabel: "Discuter de mon projet",
    ctaHref: "#contact-ia",
  },
];

export function IAPricing() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="section-divider mx-auto mb-16 w-full max-w-[1100px]" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Nos offres
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Deux offres.{" "}
            <em className="gradient-text">Zéro surprise.</em>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-white/30">
            Automatisation clé en main ou projet sur mesure. Périmètre clair, résultats mesurés.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {offers.map((offer, i) => (
            <ScrollReveal key={offer.title} delay={0.15 * i}>
              <TiltCard
                className={`group relative h-full overflow-hidden p-10 transition-all duration-500 ${
                  "recommended" in offer && offer.recommended
                    ? "border border-[#00F5FF]/15"
                    : ""
                }`}
                intensity={5}
              >
                {/* Hover corner glow */}
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full transition-opacity duration-700 ${
                    "recommended" in offer && offer.recommended
                      ? "opacity-20 group-hover:opacity-50"
                      : "opacity-0 group-hover:opacity-40"
                  }`}
                  style={{ background: offer.accent, filter: "blur(50px)" }}
                />

                {/* Tags */}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{
                      background: `${offer.accent}10`,
                      border: `1px solid ${offer.accent}25`,
                      color: offer.accent,
                    }}
                  >
                    {offer.tag}
                  </span>
                  {"recommended" in offer && offer.recommended && (
                    <span className="inline-flex rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#00F5FF]">
                      Recommandé
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display mt-6 text-[clamp(1.5rem,3vw,2rem)] leading-[1.1] text-white">
                  {offer.title}
                </h3>

                {/* Pricing */}
                <div className="mt-5 flex flex-wrap items-end gap-5">
                  {offer.pricing.map((p) => (
                    <div key={p.label}>
                      <span className="text-[10px] uppercase tracking-widest text-white/20">
                        {p.label}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span
                          className="font-display text-3xl tracking-tight"
                          style={{ color: offer.accent }}
                        >
                          {p.amount}
                        </span>
                        {p.detail && (
                          <span className="text-[13px] text-white/25">
                            {p.detail}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="mt-5 text-[14px] leading-[1.7] text-white/35">
                  {offer.description}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {offer.features.map((f) => (
                    <li
                      key={f.text}
                      className="flex items-start gap-3 text-[13px] text-white/50"
                    >
                      <f.icon
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: offer.accent }}
                      />
                      {f.text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={offer.ctaHref}
                  className="group/link mt-8 inline-flex items-center gap-2 text-[13px] font-semibold transition-all"
                  style={{ color: offer.accent }}
                >
                  {offer.ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

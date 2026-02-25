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
  BookOpen,
  Target,
  Users,
  Sparkles,
} from "lucide-react";

const offers = [
  {
    tag: "Done with you",
    title: "Ateliers IA",
    audience: "TPE & indépendants",
    description:
      "4 ateliers ciblés autour de vos sujets. On transmet, on aide à faire. On ne travaille pas votre projet — on vous rend autonome.",
    pricing: [{ amount: "1 000€", detail: "HT", label: "Forfait" }],
    features: [
      { icon: BookOpen, text: "4 sessions adaptées à votre contexte" },
      { icon: Target, text: "Sujets définis avec vous en amont" },
      { icon: Users, text: "Format pratique : on fait ensemble, pas un cours" },
      { icon: Sparkles, text: "Objectif autonomie, pas dépendance" },
    ],
    accent: "#FFB800",
    ctaLabel: "Planifier mes ateliers",
    ctaHref: "#contact-ia",
  },
  {
    tag: "Done for you",
    title: "Automatisation",
    audience: "PME & scale-ups",
    description:
      "Vous avez déjà vos outils mais rien ne se parle. On connecte, on automatise, ça tourne tout seul.",
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
    tag: "Done for you",
    title: "Projet sur mesure",
    audience: "PME & scale-ups",
    recommended: true,
    description:
      "Il vous manque un outil et rien n'existe sur le marché. On le construit, on l'intègre à votre existant, on livre.",
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
            Trois formules.{" "}
            <em className="gradient-text">Zéro surprise.</em>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-white/30">
            De la formation à la réalisation complète. Périmètre clair, zéro bullshit.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
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

                {/* Audience */}
                {"audience" in offer && offer.audience && (
                  <p className="mt-2 text-[11px] uppercase tracking-widest text-white/20">
                    {offer.audience}
                  </p>
                )}

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

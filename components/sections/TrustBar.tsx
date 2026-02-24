"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  ArrowRight, Phone, Zap, Bot, BarChart3,
  Users, Settings, Workflow, LayoutDashboard, BookOpen,
} from "lucide-react";

const pillars = [
  {
    tag: "Sales",
    id: "sales",
    title: "Restructurez vos ventes",
    description:
      "On ne fait pas de la prospection à l'ancienne. On construit des machines à pipeline.",
    features: [
      { icon: Phone, text: "Prospection externalisée multicanal" },
      { icon: Users, text: "Coaching Challenger Sales" },
      { icon: BarChart3, text: "Head of Sales fractionné" },
      { icon: Settings, text: "Setup CRM & cycle de vente" },
    ],
    accent: "#7B5EFF",
    articleSlug: "prospection-b2b-ia-guide-complet",
    articleLabel: "Lire le guide prospection B2B",
  },
  {
    tag: "AI & Auto",
    id: "ai",
    title: "Automatisez l'essentiel",
    description:
      "L'IA n'est pas un gadget. C'est un levier de productivité ×10 quand c'est bien implémenté.",
    features: [
      { icon: Bot, text: "Prompt engineering & intégration IA" },
      { icon: LayoutDashboard, text: "Interfaces & dashboards sur mesure" },
      { icon: Zap, text: "Applications métier automatisées" },
      { icon: Workflow, text: "Workflows (Make, n8n, Zapier)" },
    ],
    accent: "#00F5FF",
    articleSlug: "automatisation-crm-workflows-ia",
    articleLabel: "Lire le comparatif Make vs n8n vs Zapier",
  },
];

export function TrustBar() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(123,94,255,0.08) 0%, rgba(0,245,255,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Nos deux piliers
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Sales <span className="gradient-text">&times;</span> AI{" "}
            <span className="text-white/30">: la combinaison</span>
            <br />
            <span className="text-white/30">qui </span>
            <em className="gradient-text">change tout</em>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.id} delay={0.15 * i}>
              <TiltCard
                className="group h-full overflow-hidden p-10 transition-all duration-500"
                intensity={5}
              >
                {/* Hover corner glow */}
                <div
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                  style={{ background: pillar.accent, filter: "blur(50px)" }}
                />

                <span
                  id={pillar.id}
                  className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
                  style={{
                    background: `${pillar.accent}10`,
                    border: `1px solid ${pillar.accent}25`,
                    color: pillar.accent,
                  }}
                >
                  {pillar.tag}
                </span>

                <h3 className="font-display mt-7 text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] text-white">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-[15px] leading-[1.7] text-white/35">
                  {pillar.description}
                </p>

                <ul className="mt-8 space-y-4">
                  {pillar.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-[14px] text-white/50">
                      <f.icon className="h-4 w-4 shrink-0" style={{ color: pillar.accent }} />
                      {f.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#contact"
                    className="group/link inline-flex items-center gap-2 text-[13px] font-semibold transition-all"
                    style={{ color: pillar.accent }}
                  >
                    Découvrir l&apos;offre
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </a>
                  <Link
                    href={`/ressources/${pillar.articleSlug}`}
                    className="group/link inline-flex items-center gap-2 text-[12px] text-white/25 transition-all hover:text-white/50"
                  >
                    <BookOpen className="h-3 w-3" />
                    {pillar.articleLabel}
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

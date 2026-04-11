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
    tag: "Build",
    id: "build",
    title: "On construit votre MVP",
    description:
      "App sur mesure, site optimisé, propulsé par l'IA. Du prototype au produit qui tourne.",
    features: [
      { icon: Bot, text: "Application web / SaaS" },
      { icon: LayoutDashboard, text: "Site vitrine haute conversion" },
      { icon: Settings, text: "Dashboards & interfaces métier" },
      { icon: Zap, text: "Intégration IA (chatbots, génération)" },
    ],
    accent: "#4ECBA0",
    surface: "#060F0A",
    surfaceBorder: "#183D25",
    articleSlug: null as string | null,
    articleLabel: null as string | null,
  },
  {
    tag: "Automate",
    id: "automate",
    title: "On automatise vos process",
    description:
      "Workflows, intégrations, CRM. Ce qui est répétitif tourne tout seul.",
    features: [
      { icon: Workflow, text: "Workflows (Make, n8n, Zapier)" },
      { icon: Settings, text: "CRM & outils internes" },
      { icon: Zap, text: "Automatisation end-to-end" },
      { icon: Bot, text: "Prompt engineering & IA" },
    ],
    accent: "#EEFF66",
    surface: "#0F0D05",
    surfaceBorder: "#3D3520",
    articleSlug: "automatisation-crm-workflows-ia",
    articleLabel: "Lire le comparatif Make vs n8n vs Zapier",
  },
  {
    tag: "Grow",
    id: "grow",
    title: "On vous amène vos premiers clients",
    description:
      "SEO/GEO, acquisition, et on vous accompagne sur les premières ventes.",
    features: [
      { icon: BarChart3, text: "SEO & GEO (IA search)" },
      { icon: Users, text: "Stratégie d'acquisition" },
      { icon: Phone, text: "Coaching premières ventes" },
      { icon: ArrowRight, text: "Outreach & conversion" },
    ],
    accent: "#7C9EFF",
    surface: "#0F0F22",
    surfaceBorder: "#2A3070",
    articleSlug: "prospection-b2b-ia-guide-complet",
    articleLabel: "Lire le guide prospection B2B",
  },
];

export function TrustBar() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(124,158,255,0.07) 0%, rgba(78,203,160,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase">
            Notre offre
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-7 text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            De l&apos;idée aux premiers revenus.{" "}
            <strong className="gradient-text">Tout compris.</strong>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.id} delay={0.12 * i}>
              <TiltCard
                className="group h-full overflow-hidden p-9 transition-all duration-500"
                intensity={5}
                style={{
                  background: pillar.surface,
                  border: `0.5px solid ${pillar.surfaceBorder}`,
                }}
              >
                {/* Hover corner glow */}
                <div
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-30"
                  style={{ background: pillar.accent, filter: "blur(50px)" }}
                />

                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{
                    background: `${pillar.accent}10`,
                    border: `0.5px solid ${pillar.accent}25`,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {pillar.tag}
                </span>

                <h3 className="mt-6 text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#E8E8E2]">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.7] text-white/35">
                  {pillar.description}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {pillar.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-[13px] text-white/45">
                      <f.icon className="h-4 w-4 shrink-0" style={{ color: pillar.accent }} />
                      {f.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href={`/offre#${pillar.id}`}
                    className="group/link inline-flex items-center gap-2 text-[13px] font-medium transition-all"
                    style={{ color: pillar.accent }}
                  >
                    En savoir plus
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                  {pillar.articleSlug && pillar.articleLabel && (
                    <Link
                      href={`/ressources/${pillar.articleSlug}`}
                      className="group/link inline-flex items-center gap-2 text-[12px] text-white/20 transition-all hover:text-white/45"
                    >
                      <BookOpen className="h-3 w-3" />
                      {pillar.articleLabel}
                    </Link>
                  )}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

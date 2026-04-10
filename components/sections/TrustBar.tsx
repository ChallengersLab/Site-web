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
      "Prospection structurée, pipe prévisible, équipe qui monte en compétence.",
    features: [
      { icon: Phone, text: "Prospection externalisée multicanal" },
      { icon: Users, text: "Coaching Challenger Sales" },
      { icon: BarChart3, text: "Head of Sales fractionné" },
      { icon: Settings, text: "Setup CRM & cycle de vente" },
    ],
    accent: "#7C9EFF",
    surface: "#0F0F22",
    surfaceBorder: "#2A3070",
    articleSlug: "prospection-b2b-ia-guide-complet",
    articleLabel: "Lire le guide prospection B2B",
  },
  {
    tag: "IA & Auto",
    id: "ai",
    title: "Automatisez l'essentiel",
    description:
      "Automatiser ce qui peut l'être pour que vous puissiez vous concentrer sur ce qui compte vraiment.",
    features: [
      { icon: Bot, text: "Intégration IA dans vos process" },
      { icon: LayoutDashboard, text: "Interfaces & dashboards sur mesure" },
      { icon: Zap, text: "Applications métier automatisées" },
      { icon: Workflow, text: "Workflows (Make, n8n, Zapier)" },
    ],
    accent: "#4ECBA0",
    surface: "#060F0A",
    surfaceBorder: "#183D25",
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
          background: "radial-gradient(ellipse, rgba(124,158,255,0.07) 0%, rgba(78,203,160,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.08em] uppercase">
            Nos deux piliers
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-7 text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            <span style={{ color: "#7C9EFF" }}>Sales</span>{" "}
            <span className="text-white/20">&times;</span>{" "}
            <span style={{ color: "#4ECBA0" }}>IA</span>{" "}
            <span className="text-white/25">: deux expertises,</span>
            <br />
            <em className="gradient-text not-italic">une seule équipe</em>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
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
                    color: pillar.accent,
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

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={pillar.id === "ai" ? "/ia" : `/${pillar.id}`}
                    className="group/link inline-flex items-center gap-2 text-[13px] font-medium transition-all"
                    style={{ color: pillar.accent }}
                  >
                    En savoir plus
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                  <Link
                    href={`/ressources/${pillar.articleSlug}`}
                    className="group/link inline-flex items-center gap-2 text-[12px] text-white/20 transition-all hover:text-white/45"
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

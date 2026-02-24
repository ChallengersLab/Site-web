"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Phone, Zap, Bot, BarChart3, Users, Settings, Workflow, LayoutDashboard } from "lucide-react";

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
      { icon: Settings, text: "Setup CRM & optimisation cycle de vente" },
    ],
    accent: "#7B5EFF",
    href: "#contact",
  },
  {
    tag: "AI & Automation",
    id: "ai",
    title: "Automatisez l'essentiel",
    description:
      "L'IA n'est pas un gadget. C'est un levier de productivité ×10 quand c'est bien implémenté.",
    features: [
      { icon: Bot, text: "Prompt engineering & intégration IA" },
      { icon: LayoutDashboard, text: "Interfaces & dashboards sur mesure" },
      { icon: Zap, text: "Applications métier automatisées" },
      { icon: Workflow, text: "Workflows automatisés (Make, n8n, Zapier)" },
    ],
    accent: "#00F5FF",
    href: "#contact",
  },
];

export function TrustBar() {
  return (
    <section className="relative py-28">
      {/* Background orb */}
      <div
        className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-8 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7B5EFF 0%, #00F5FF 40%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-xs font-medium">
            Nos deux piliers
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Sales <span className="gradient-text">&times;</span> AI
            <span className="text-white/40 font-normal"> : la combinaison qui change tout</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.id} delay={0.15 * i}>
              <div
                id={pillar.id}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/6 bg-surface p-10 transition-all duration-500 hover:border-white/12"
              >
                {/* Corner glow on hover */}
                <div
                  className="absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-20"
                  style={{ background: pillar.accent }}
                />

                <span
                  className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    background: `${pillar.accent}12`,
                    border: `1px solid ${pillar.accent}30`,
                    color: pillar.accent,
                  }}
                >
                  {pillar.tag}
                </span>

                <h3 className="font-display mt-6 text-2xl font-bold text-white md:text-3xl">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-base text-white/45 leading-relaxed">
                  {pillar.description}
                </p>

                <ul className="mt-8 space-y-4">
                  {pillar.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-center gap-3 text-sm text-white/60"
                    >
                      <feature.icon
                        className="h-4 w-4 shrink-0"
                        style={{ color: pillar.accent }}
                      />
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <a
                  href={pillar.href}
                  className="group/link mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: pillar.accent }}
                >
                  Découvrir l&apos;offre
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

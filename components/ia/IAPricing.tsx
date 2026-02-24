"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowRight, LayoutDashboard, Zap, Users } from "lucide-react";

const offers = [
  {
    tag: "Done for you",
    title: "Projets no-code",
    price: "5 000€",
    priceDetail: "à partir de",
    description:
      "Sites web, dashboards, applications métier. On construit, vous utilisez. Live en jours, pas en mois.",
    features: [
      "Landing pages & sites haute conversion",
      "Dashboards interactifs",
      "Applications métier sur mesure",
      "Intégration IA (chatbots, génération)",
    ],
    icon: LayoutDashboard,
    accent: "#00F5FF",
    ctaLabel: "Lancer mon projet",
    ctaHref: "#contact-ia",
  },
  {
    tag: "Done for you",
    title: "Automatisations",
    price: "2 000€",
    priceDetail: "à partir de",
    description:
      "On connecte vos outils, on automatise vos process. Make, n8n, Zapier — ça tourne tout seul.",
    features: [
      "Workflows automatisés end-to-end",
      "Connexion de votre stack existante",
      "Enrichissement & scoring IA",
      "Monitoring et maintenance",
    ],
    icon: Zap,
    accent: "#7B5EFF",
    ctaLabel: "Automatiser mes process",
    ctaHref: "#contact-ia",
  },
  {
    tag: "Done with you",
    title: "Ateliers & coaching",
    price: "1 000€",
    priceDetail: "à partir de / 2h par semaine",
    description:
      "On vous accompagne pour monter en compétence. Vous apprenez, vous faites, on guide.",
    features: [
      "Sessions hebdomadaires de 2h",
      "Mise en place accompagnée",
      "Formation outils & IA",
      "Support entre les sessions",
    ],
    icon: Users,
    accent: "#a78bfa",
    ctaLabel: "Démarrer un atelier",
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
            On construit pour vous, ou on vous accompagne. Dans les deux cas,
            des livrables concrets et un périmètre clair.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <ScrollReveal key={offer.title} delay={0.12 * i}>
                <TiltCard
                  className="group relative h-full overflow-hidden p-8 transition-all duration-500"
                  intensity={5}
                >
                  {/* Hover corner glow */}
                  <div
                    className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                    style={{ background: offer.accent, filter: "blur(50px)" }}
                  />

                  {/* Tag */}
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

                  {/* Icon */}
                  <div
                    className="mt-5 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: `${offer.accent}12`,
                      border: `1px solid ${offer.accent}20`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: offer.accent }} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display mt-5 text-xl leading-[1.1] text-white">
                    {offer.title}
                  </h3>

                  {/* Price */}
                  <div className="mt-3">
                    <span className="text-[12px] text-white/25">
                      {offer.priceDetail}
                    </span>
                    <span
                      className="ml-1 font-display text-3xl tracking-tight"
                      style={{ color: offer.accent }}
                    >
                      {offer.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-[14px] leading-[1.7] text-white/35">
                    {offer.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-6 space-y-3">
                    {offer.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[13px] text-white/45"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: `${offer.accent}80` }}
                        />
                        {f}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

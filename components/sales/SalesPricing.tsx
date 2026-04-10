"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  ArrowRight, Phone, BarChart3, Users, Settings,
  Target, UserPlus, FileText, Headphones, BookOpen,
  Compass,
} from "lucide-react";

const offers = [
  {
    tag: "Done with you",
    title: "Bras droit Founder",
    audience: "Fondateurs en lancement",
    description:
      "Vous lancez votre boîte et tout repose sur vous. On devient votre sparring partner : 1 à 2h par semaine sur tous les sujets. On ne fait pas à votre place — on vous aide à décider et avancer.",
    pricing: [
      { amount: "1 000€", detail: "HT / mois", label: "Forfait" },
    ],
    timeline: "1 à 2h / semaine — sans engagement",
    features: [
      { icon: Compass, text: "Stratégie, positionnement & go-to-market" },
      { icon: Target, text: "Priorisation : quoi vendre, à qui, comment" },
      { icon: Users, text: "Premiers recrutements & structuration" },
      { icon: Phone, text: "Sparring pricing, négo, décisions clés" },
    ],
    accent: "#FFB800",
    ctaLabel: "Réserver un échange",
    ctaHref: "#contact-sales",
  },
  {
    tag: "Done for you",
    title: "Prospection externalisée",
    audience: "Équipes en croissance",
    description:
      "Vous avez un produit qui marche, il faut remplir le pipe. On génère les RDV qualifiés sur vos cibles pendant que vous closez.",
    pricing: [
      { amount: "1 500€", detail: "HT / mois", label: "Fixe mensuel" },
      { amount: "200€", detail: "HT / RDV qualifié", label: "Variable" },
    ],
    features: [
      { icon: Target, text: "Création & qualification de base de données sur mesure (IA)" },
      { icon: Phone, text: "Prospection multicanal : cold call, LinkedIn, e-mail séquencé" },
      { icon: BarChart3, text: "Alimentation directe du pipeline CRM avec les RDV pris" },
      { icon: FileText, text: "Reporting hebdomadaire (appels, RDV, temps d'appel effectif)" },
    ],
    accent: "#7C9EFF",
    ctaLabel: "Lancer ma prospection",
    ctaHref: "#contact-sales",
  },
  {
    tag: "Done with you",
    title: "Accompagnement CRO",
    audience: "Équipes sales existantes",
    recommended: true,
    description:
      "Vous avez une équipe commerciale mais ça manque de structure. On pose les process, on forme, on transmet. À la fin, ça tourne sans nous.",
    pricing: [
      { amount: "1 000€", detail: "HT / jour", label: "TJM" },
    ],
    timeline: "3 mois renouvelable — dégressif",
    features: [
      { icon: UserPlus, text: "Recrutement SDR : fiche de poste, KPIs, grille de variable" },
      { icon: BarChart3, text: "Mise en place des KPIs : MRR, churn, upsell" },
      { icon: Settings, text: "Fluidification OPS : reporting, outils, intégration CRM" },
      { icon: Headphones, text: "Formation prospection : scripts, objections, écoute active" },
      { icon: BookOpen, text: "Formation closing : méthode Challenger Sale appliquée" },
      { icon: Users, text: "Playbook complet Engine 1 : du RDV au paiement client" },
    ],
    rythme: [
      { phase: "Mois 1-2", intensity: "2-3j / semaine", label: "Structuration" },
      { phase: "Mois 2-3", intensity: "1j / semaine", label: "Transmission" },
      { phase: "Après", intensity: "À la carte", label: "Ponctuel" },
    ],
    accent: "#4ECBA0",
    ctaLabel: "Structurer mes ventes",
    ctaHref: "#contact-sales",
  },
];

export function SalesPricing() {
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
            Du sparring ponctuel à l&apos;exécution complète. Tarifs affichés, périmètre clair.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <ScrollReveal key={offer.title} delay={0.15 * i}>
              <TiltCard
                className={`group relative h-full overflow-hidden p-10 transition-all duration-500 ${"recommended" in offer && offer.recommended ? "border border-[#4ECBA0]/15" : ""}`}
                intensity={5}
              >
                {/* Hover corner glow */}
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full transition-opacity duration-700 ${"recommended" in offer && offer.recommended ? "opacity-20 group-hover:opacity-50" : "opacity-0 group-hover:opacity-40"}`}
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
                    <span className="inline-flex rounded-full bg-[#4ECBA0]/10 border border-[#4ECBA0]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#4ECBA0]">
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
                        <span className="text-[13px] text-white/25">{p.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline badge if present */}
                {"timeline" in offer && offer.timeline && (
                  <span className="mt-3 inline-block rounded-full bg-white/[0.04] px-3 py-1 text-[11px] text-white/25">
                    {offer.timeline}
                  </span>
                )}

                {/* Description */}
                <p className="mt-5 text-[14px] leading-[1.7] text-white/35">
                  {offer.description}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {offer.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3 text-[13px] text-white/50">
                      <f.icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: offer.accent }} />
                      {f.text}
                    </li>
                  ))}
                </ul>

                {/* Rythme if present */}
                {"rythme" in offer && offer.rythme && (
                  <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-5">
                    <p className="text-[10px] uppercase tracking-widest text-white/20">
                      Rythme d&apos;intervention
                    </p>
                    {offer.rythme.map((r) => (
                      <div key={r.phase} className="flex items-center justify-between text-[12px]">
                        <span className="text-white/50">{r.phase}</span>
                        <span className="text-white/25">{r.intensity}</span>
                      </div>
                    ))}
                  </div>
                )}

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

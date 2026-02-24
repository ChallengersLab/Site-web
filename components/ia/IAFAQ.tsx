"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const faqs = [
  {
    question: "Combien de temps pour livrer un projet no-code ?",
    answer:
      "Entre 48h et 3 semaines selon la complexité. Une landing page ou un dashboard : quelques jours. Une application métier complète avec authentification, rôles et intégrations : 2 à 3 semaines. On cadre le périmètre ensemble avant de démarrer.",
  },
  {
    question: "Et si mes outils changent demain ?",
    answer:
      "Les workflows qu'on construit sont modulaires. Si vous passez de HubSpot à Pipedrive, ou de Make à n8n, on adapte les connecteurs sans tout reconstruire. C'est l'avantage du no-code : la flexibilité est native.",
  },
  {
    question: "C'est fiable, le no-code en production ?",
    answer:
      "Oui, à condition de bien l'architecturer. Bubble, Retool et FlutterFlow font tourner des apps en production pour des milliers d'utilisateurs. Le piège, c'est de bricoler sans structure. C'est pour ça qu'on intervient : on construit propre, documenté, et maintenable.",
  },
  {
    question: "Vous formez mon équipe à maintenir les automatisations ?",
    answer:
      "C'est le principe de la formule Ateliers. En mode Done for you, on vous livre clé en main avec une documentation. En mode coaching, on construit ensemble et votre équipe est autonome à la fin.",
  },
  {
    question: "Quelle différence avec un développeur freelance ?",
    answer:
      "Un dev code sur mesure en 3-6 mois. On livre en jours avec du no-code et de l'automatisation. Moins cher, plus rapide, plus facile à maintenir. Si votre besoin nécessite du code custom, on vous le dit — mais dans 80% des cas, ce n'est pas nécessaire.",
  },
  {
    question: "Quels types de process peut-on automatiser ?",
    answer:
      "Tout ce qui est répétitif et basé sur des règles : qualification de leads, enrichissement de données, reporting, onboarding client, relances, synchronisation CRM, génération de documents. Si vous le faites plus de 3 fois par semaine à la main, on peut probablement l'automatiser.",
  },
];

export function IAFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="section-divider mx-auto mb-16 w-full max-w-[1100px]" />

      <div className="mx-auto max-w-[800px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Questions fréquentes
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,3.5rem)] leading-[1] tracking-[-0.02em]">
            Vos questions.{" "}
            <em className="gradient-text">Nos réponses.</em>
          </h2>
        </ScrollReveal>

        <div className="mt-12 space-y-2">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.question} delay={0.05 * i}>
              <div
                className="rounded-2xl border border-white/[0.04] bg-white/[0.02] transition-colors duration-300 hover:border-white/[0.08]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-white/70">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 shrink-0 text-white/20" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[14px] leading-[1.7] text-white/35">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

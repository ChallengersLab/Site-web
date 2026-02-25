"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const faqs = [
  {
    question: "Vous travaillez dans quels secteurs ?",
    answer:
      "Immobilier, sport, SaaS, services, SEO, e-commerce. Le secteur importe moins que le problème : si vous avez un process manuel, des données sous-exploitées ou un outil qui manque, on peut vous aider.",
  },
  {
    question: "C'est quoi un site IA-first ?",
    answer:
      "Un site qui ne se contente pas d'afficher du contenu. Il qualifie les visiteurs avec un chatbot, personnalise l'expérience, génère du contenu dynamique. Le site travaille pour vous, même quand vous dormez.",
  },
  {
    question: "Combien de temps pour un projet sur mesure ?",
    answer:
      "Ça dépend de la complexité. Une automatisation simple : quelques jours. Une app métier complète avec intégration à l'existant : plusieurs mois. On cadre le périmètre ensemble avant de démarrer, avec des jalons clairs.",
  },
  {
    question: "Et si mes outils changent demain ?",
    answer:
      "Les workflows qu'on construit sont modulaires. Si vous passez de HubSpot à Pipedrive, ou de Make à n8n, on adapte les connecteurs sans tout reconstruire.",
  },
  {
    question: "Quelle différence avec une agence dev classique ?",
    answer:
      "Une agence dev code pendant 6 mois et vous livre un produit figé. Nous, on intègre l'IA dès le départ, on itère vite, et on construit pour que ça évolue. Si votre besoin change, le produit s'adapte.",
  },
  {
    question: "Quels types de process peut-on automatiser ?",
    answer:
      "Tout ce qui est répétitif : collecte de données, enrichissement, reporting, relances, synchronisation entre outils, génération de documents. Si vous le faites plus de 3 fois par semaine à la main, on peut probablement l'automatiser.",
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
              <div className="rounded-2xl border border-white/[0.04] bg-white/[0.02] transition-colors duration-300 hover:border-white/[0.08]">
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
                      transition={{
                        duration: 0.25,
                        ease: [0.25, 0.46, 0.45, 0.94] as const,
                      }}
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

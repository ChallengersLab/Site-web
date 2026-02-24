"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const faqs = [
  {
    question: "Combien de temps avant les premiers résultats ?",
    answer:
      "Les premiers RDV qualifiés tombent dès la semaine 3-4 en prospection externalisée. Pour l'accompagnement CRO, les premiers effets structurants (process, KPIs, pipeline propre) sont visibles dès le premier mois. Le vrai shift se mesure à 90 jours.",
  },
  {
    question: "Et si ça ne marche pas ?",
    answer:
      "On ne s'engage pas sur du vent. L'audit initial identifie précisément ce qui est faisable. Si on estime qu'on ne peut pas générer de résultats, on vous le dit avant de commencer. Pendant la mission, on mesure tout — si un canal ne performe pas, on pivote.",
  },
  {
    question: "C'est quoi la méthode Challenger Sale ?",
    answer:
      "C'est une méthodologie de vente B2B basée sur la recherche de Matthew Dixon. Au lieu de chercher à \"plaire\" au prospect, le commercial challenge sa vision, apporte un éclairage nouveau et pousse à l'action. C'est la méthode la plus efficace en vente complexe — et on forme vos équipes à l'appliquer.",
  },
  {
    question: "Vous travaillez dans quels secteurs ?",
    answer:
      "PME et scale-ups B2B, principalement SaaS, services et tech. Ce qui compte, c'est un cycle de vente de plus de 2 semaines et un panier moyen qui justifie une approche structurée. Si vous vendez un produit à 50€/mois en self-serve, on n'est pas le bon fit.",
  },
  {
    question: "On peut commencer par la prospection seule ?",
    answer:
      "Oui, c'est le cas le plus fréquent. On lance la prospection externalisée en parallèle de votre activité. Si les résultats confirment le potentiel, on peut ensuite structurer la direction commerciale ensemble.",
  },
  {
    question: "Quelle différence avec une agence de lead gen classique ?",
    answer:
      "Une agence vous envoie des leads et c'est fini. Nous, on construit votre machine : process, outils, formation, playbook. L'objectif est que vous soyez autonome. On ne crée pas de dépendance — on transfère les compétences.",
  },
];

export function SalesFAQ() {
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

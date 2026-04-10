"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  BarChart3,
  Users,
  Settings,
  ChevronDown,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* ─── data ─── */

const primaryServices = [
  {
    icon: Phone,
    title: "Prospection externalisée multicanal",
    description:
      "Cold call, email, LinkedIn. On construit votre machine à pipeline et on la fait tourner.",
    deliverables: [
      "Séquences multicanal personnalisées",
      "Enrichissement et scoring des leads",
      "Reporting hebdomadaire pipeline",
      "Intégration CRM automatisée",
    ],
  },
  {
    icon: BarChart3,
    title: "Head of Sales fractionné",
    description:
      "Direction commerciale sans embaucher. Stratégie, management d'équipe, coaching.",
    deliverables: [
      "Stratégie commerciale complète",
      "Management de votre équipe sales",
      "Process de vente reproductible",
      "KPIs et tableaux de bord",
    ],
  },
];

const secondaryServices = [
  {
    icon: Users,
    title: "Coaching Challenger Sales",
    description:
      "Formez vos commerciaux à la méthode qui transforme les vendeurs en conseillers stratégiques.",
  },
  {
    icon: Settings,
    title: "Setup CRM & cycle de vente",
    description:
      "Configuration, automatisation, adoption. Votre CRM devient enfin un outil de croissance.",
  },
];

/* ─── component ─── */

export function SalesServices() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* ── header ── */}
        <ScrollReveal>
          <div className="text-center">
            <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
              Nos services
            </span>

            <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
              Ce qu&apos;on fait.
              <br />
              <em className="gradient-text">Concrètement.</em>
            </h2>
          </div>
        </ScrollReveal>

        {/* ── primary services (accordion) ── */}
        <div className="mt-16 space-y-3">
          {primaryServices.map((service, index) => {
            const isExpanded = expanded === index;
            const Icon = service.icon;

            return (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div
                  className={`glass-card transition-colors duration-200 ${
                    isExpanded ? "border-l-2 border-[#7C9EFF]" : "border-l-2 border-transparent"
                  }`}
                >
                  {/* collapsed row */}
                  <div
                    className="flex items-center gap-4 p-6 cursor-pointer"
                    onClick={() =>
                      setExpanded(isExpanded ? null : index)
                    }
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: "#7C9EFF12",
                        border: "1px solid #7C9EFF20",
                      }}
                    >
                      <Icon className="h-5 w-5 text-[#7C9EFF]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[17px] font-semibold text-white/90">
                        {service.title}
                      </p>
                      <p className="text-[14px] text-white/35">
                        {service.description}
                      </p>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-white/40" />
                    </motion.div>
                  </div>

                  {/* expanded panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1] as const,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2">
                          <ul className="space-y-2">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-[14px] text-white/55"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C9EFF]/60" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── secondary services (compact grid) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {secondaryServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div className="glass-card p-6">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: "#7C9EFF12",
                      border: "1px solid #7C9EFF20",
                    }}
                  >
                    <Icon className="h-5 w-5 text-[#7C9EFF]" />
                  </div>

                  <p className="mt-4 text-[17px] font-semibold text-white/90">
                    {service.title}
                  </p>
                  <p className="mt-1 text-[14px] text-white/35">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

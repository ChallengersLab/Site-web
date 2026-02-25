"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Smartphone,
  BarChart3,
  Users,
  Globe,
} from "lucide-react";

const useCases = [
  {
    icon: Database,
    type: "Automatisation de données",
    problem:
      "Des heures à collecter, nettoyer et croiser des données à la main.",
    solution:
      "On automatise l'extraction, le traitement et l'enrichissement. Les données arrivent propres, à jour, prêtes à exploiter.",
    example: "Ex : extraction et analyse DVF automatisée pour l'immobilier",
    tools: ["Make", "n8n", "Claude", "API"],
    accent: "#7B5EFF",
  },
  {
    icon: Smartphone,
    type: "Apps no-code boostées IA",
    problem:
      "Besoin d'une app métier mais pas le budget ni le temps pour du dev classique.",
    solution:
      "On construit des applications fonctionnelles en no-code, avec de l'IA intégrée pour automatiser la logique métier.",
    example: "Ex : app de suivi sportif avec programmes personnalisés par IA",
    tools: ["Bubble", "FlutterFlow", "OpenAI"],
    accent: "#00F5FF",
  },
  {
    icon: BarChart3,
    type: "Reporting automatisé",
    problem:
      "Vos reportings sont manuels, en retard, et personne ne leur fait confiance.",
    solution:
      "On connecte vos sources de données et on génère des dashboards live. Fini le copier-coller et les fichiers Excel.",
    example: "Ex : dashboards SEO générés depuis la Search Console",
    tools: ["n8n", "Airtable", "Looker Studio"],
    accent: "#a78bfa",
  },
  {
    icon: Users,
    type: "CRM & matching intelligent",
    problem:
      "Votre CRM est un cimetière de contacts. Pas de scoring, pas de matching.",
    solution:
      "On enrichit vos données, on score vos leads et on automatise le matching entre offre et demande via IA.",
    example: "Ex : CRM intercab avec enrichissement et matching IA",
    tools: ["Claude", "Make", "HubSpot", "API"],
    accent: "#7B5EFF",
  },
  {
    icon: Globe,
    type: "Sites web IA-first",
    problem:
      "Votre site est une brochure en ligne. Il ne qualifie personne et ne convertit pas.",
    solution:
      "On construit des sites intelligents avec chatbots, personnalisation du contenu et qualification automatique.",
    example: "Ex : site B2B avec chatbot et qualification intelligente",
    tools: ["Next.js", "Claude", "Vercel"],
    accent: "#00F5FF",
  },
];

export function IAUseCases() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 400;
    el.scrollBy({
      left: direction === "left" ? -cardWidth - 20 : cardWidth + 20,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="section-divider mx-auto mb-16 w-full max-w-[1100px]" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <ScrollReveal>
              <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
                Cas d&apos;usage
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
                L&apos;IA appliquée.{" "}
                <em className="gradient-text">Concrètement.</em>
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-white/30">
                Chaque projet est différent. Voici le type de missions qu&apos;on mène.
              </p>
            </ScrollReveal>
          </div>

          {/* Nav arrows */}
          <ScrollReveal delay={0.2}>
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all hover:border-white/20 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 text-white/60" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all hover:border-white/20 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4 text-white/60" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {useCases.map((uc) => (
            <div
              key={uc.type}
              className="w-[340px] shrink-0 snap-start rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-colors duration-300 hover:border-white/[0.12] md:w-[380px]"
            >
              {/* Icon */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: `${uc.accent}12`,
                  border: `1px solid ${uc.accent}20`,
                }}
              >
                <uc.icon className="h-5 w-5" style={{ color: uc.accent }} />
              </div>

              <h3
                className="mt-5 text-[16px] font-semibold leading-snug"
                style={{ color: uc.accent }}
              >
                {uc.type}
              </h3>

              {/* Problem */}
              <p className="mt-4 text-[13px] leading-[1.6] text-white/25">
                {uc.problem}
              </p>

              {/* Solution */}
              <p className="mt-3 text-[14px] leading-[1.7] text-white/50">
                {uc.solution}
              </p>

              {/* Example */}
              <p className="mt-4 text-[12px] italic text-white/20">
                {uc.example}
              </p>

              {/* Tool badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {uc.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                    style={{
                      background: `${uc.accent}08`,
                      border: `1px solid ${uc.accent}12`,
                      color: `${uc.accent}80`,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

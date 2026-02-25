# IA Page Refonte — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the /ia page with capabilities-first structure, use case carousel, method timeline, and 2-offer pricing to match the quality and credibility of the /sales page.

**Architecture:** 7 components total. Rewrite IAHero (remove terminal), IAPricing (2 offers), IAFAQ (new questions). Create 3 new components: IACapabilities, IAUseCases, IAMethod. Delete 3 old ones: IABeforeAfter, IAStack, IAProof. Keep IACTA unchanged.

**Tech Stack:** Next.js, React, Tailwind CSS, framer-motion, lucide-react. Existing shared components: ScrollReveal, TiltCard.

---

### Task 1: Rewrite IAHero — Simple headline, no terminal

**Files:**
- Modify: `components/ia/IAHero.tsx` (full rewrite)

**Step 1: Rewrite IAHero.tsx**

Replace the entire file. Remove terminal animation, useState, useEffect. Keep the same pattern as SalesHero (badge + headline + subcopy + CTA + proof) with cyan orbs instead of purple.

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function IAHero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background orbs - CYAN */}
      <div
        className="absolute -left-[20%] -top-[10%] h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 65%)",
          animation: "float-orb 18s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-[15%] -right-[15%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 65%)",
          animation: "float-orb-reverse 22s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div className="hero-grid absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 pt-36 pb-24 md:pt-44 md:pb-32 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="badge-glow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-wider uppercase">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#00F5FF]"
                style={{ boxShadow: "0 0 8px 2px rgba(0,245,255,0.6)" }}
              />
              IA &amp; Automatisation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="mt-10">
            <span className="font-display block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] text-white">
              L&apos;IA ne remplace personne.
            </span>
            <span className="font-display block text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92] tracking-[-0.02em] gradient-text mt-2">
              <em>Elle supprime ce que personne ne veut faire.</em>
            </span>
          </motion.h1>

          {/* Sub copy */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-lg text-[17px] leading-[1.7] text-white/40"
          >
            Automatisation, apps sur mesure, sites intelligents.{" "}
            <span className="text-white/75">
              On branche l&apos;IA là où ça compte dans votre business.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10">
            <a
              href="#contact-ia"
              className="btn-glow inline-flex items-center gap-3 rounded-xl px-8 py-4 text-[15px]"
            >
              <span>Réserver un appel stratégique</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Proof */}
          <motion.p variants={fadeUp} className="mt-6 text-[13px] text-white/20">
            30 min &middot; Gratuit &middot; Sans engagement
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

**Step 3: Commit**

```bash
git add components/ia/IAHero.tsx
git commit -m "refactor(ia): simplify Hero — remove terminal, headline-first"
```

---

### Task 2: Create IACapabilities — 4 piliers avec avant/après

**Files:**
- Create: `components/ia/IACapabilities.tsx`

**Step 1: Create IACapabilities.tsx**

4 TiltCards in a 2x2 grid. Each card has: icon, title, before (strikethrough/dimmed), after (cyan), description. Pattern follows SalesPainPoints layout.

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Workflow, Code2, Globe, Brain } from "lucide-react";

const capabilities = [
  {
    icon: Workflow,
    title: "Automatisation workflow",
    before: "3h de copié-collé par jour entre vos outils",
    after: "Vos outils se parlent. Tout seuls.",
    description:
      "Make, n8n, Zapier. On connecte votre stack et on automatise ce qui vous bouffe du temps.",
    accent: "#7B5EFF",
  },
  {
    icon: Code2,
    title: "Apps sur mesure IA-first",
    before: "6 mois avec une agence, et ça ne colle pas à votre métier",
    after: "Une app qui colle à vos process, pas l'inverse.",
    description:
      "Développement sur mesure avec l'IA. Intégration à l'existant, logique métier complexe, CRM, dashboards.",
    accent: "#00F5FF",
  },
  {
    icon: Globe,
    title: "Sites web intelligents",
    before: "Un site vitrine qui ne fait rien pour vous",
    after: "Un site qui qualifie, répond et convertit.",
    description:
      "Sites avec chatbots, personnalisation, génération de contenu IA.",
    accent: "#a78bfa",
  },
  {
    icon: Brain,
    title: "Intégration & enrichissement IA",
    before: "Des décisions au feeling, zéro data",
    after: "Chaque donnée enrichie, scorée, exploitable.",
    description:
      "OpenAI, Claude, Mistral. Scoring, matching, enrichissement automatique sur vos données.",
    accent: "#00F5FF",
  },
];

export function IACapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div
        style={{ y: orbY }}
        className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Ce qu&apos;on fait
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Quatre piliers.{" "}
            <em className="gradient-text">Un seul objectif.</em>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-white/30">
            Que votre problème soit un process manuel, une app qui manque ou des données inexploitées, on a la réponse.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={0.1 * i}>
              <TiltCard
                className="group h-full p-8 transition-all duration-500"
                intensity={6}
              >
                {/* Icon */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: `${cap.accent}12`,
                    border: `1px solid ${cap.accent}20`,
                  }}
                >
                  <cap.icon
                    className="h-5 w-5"
                    style={{ color: cap.accent }}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-[17px] font-semibold leading-snug text-white/90">
                  {cap.title}
                </h3>

                {/* Before / After */}
                <div className="mt-4 space-y-2">
                  <p className="text-[13px] leading-[1.6] text-white/25 line-through decoration-white/15">
                    {cap.before}
                  </p>
                  <p
                    className="text-[14px] font-medium leading-[1.6]"
                    style={{ color: cap.accent }}
                  >
                    {cap.after}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-4 text-[13px] leading-[1.7] text-white/35">
                  {cap.description}
                </p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build (component not yet imported in page).

**Step 3: Commit**

```bash
git add components/ia/IACapabilities.tsx
git commit -m "feat(ia): add Capabilities section — 4 pillars with before/after"
```

---

### Task 3: Create IAUseCases — Carrousel sectoriel

**Files:**
- Create: `components/ia/IAUseCases.tsx`

**Step 1: Create IAUseCases.tsx**

Horizontal scroll carousel with CSS scroll-snap and prev/next buttons. 5 slides. Each slide is a glass card with icon, type, problem, solution, tool badges. Uses useRef for scroll control, no external library needed.

```tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ChevronLeft, ChevronRight, Database, Smartphone, BarChart3, Users, Globe } from "lucide-react";

const useCases = [
  {
    icon: Database,
    type: "Automatisation de données",
    problem: "Des heures à collecter, nettoyer et croiser des données manuellement.",
    solution:
      "On automatise l'extraction, le traitement et l'enrichissement. Les données arrivent propres, à jour, prêtes à exploiter.",
    example: "Ex : extraction et analyse DVF automatisée pour l'immobilier",
    tools: ["Make", "n8n", "Claude", "API"],
    accent: "#7B5EFF",
  },
  {
    icon: Smartphone,
    type: "Apps no-code boostées IA",
    problem: "Besoin d'une app métier mais pas le budget ni le temps pour du dev classique.",
    solution:
      "On construit des applications fonctionnelles en no-code, avec de l'IA intégrée pour automatiser la logique métier.",
    example: "Ex : app de suivi sportif avec programmes personnalisés par IA",
    tools: ["Bubble", "FlutterFlow", "OpenAI"],
    accent: "#00F5FF",
  },
  {
    icon: BarChart3,
    type: "Reporting automatisé",
    problem: "Vos reportings sont manuels, en retard, et personne ne leur fait confiance.",
    solution:
      "On connecte vos sources de données et on génère des dashboards live. Plus de copié-collé, plus de fichiers Excel.",
    example: "Ex : dashboards SEO générés depuis la Search Console",
    tools: ["n8n", "Airtable", "Looker Studio"],
    accent: "#a78bfa",
  },
  {
    icon: Users,
    type: "CRM & matching intelligent",
    problem: "Votre CRM est un cimetière de contacts. Pas de scoring, pas de matching.",
    solution:
      "On enrichit vos données, on score vos leads et on automatise le matching entre offre et demande via IA.",
    example: "Ex : CRM intercab avec enrichissement et matching IA",
    tools: ["Claude", "Make", "HubSpot", "API"],
    accent: "#7B5EFF",
  },
  {
    icon: Globe,
    type: "Sites web IA-first",
    problem: "Votre site est une brochure. Il ne qualifie pas, ne répond pas, ne convertit pas.",
    solution:
      "On construit des sites intelligents avec chatbots, personnalisation du contenu et qualification automatique des visiteurs.",
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
          className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {useCases.map((uc) => (
            <div
              key={uc.type}
              className="w-[340px] shrink-0 snap-start rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-colors duration-300 hover:border-white/[0.12] md:w-[380px]"
            >
              {/* Icon + Type */}
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
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add components/ia/IAUseCases.tsx
git commit -m "feat(ia): add UseCases carousel — 5 project types with examples"
```

---

### Task 4: Create IAMethod — 3 étapes timeline

**Files:**
- Create: `components/ia/IAMethod.tsx`

**Step 1: Create IAMethod.tsx**

Mirror of SalesMethod. Same timeline structure (vertical animated line, numbered dots, deliverable tags). Different content: Cadrage / Construction / Itération.

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    phase: "Cadrage",
    timeline: "Sem. 1-2",
    description:
      "On comprend votre métier, vos outils, vos irritants. On identifie les quick wins et on priorise.",
    deliverables: ["Audit process", "Quick wins identifiés", "Mapping stack"],
    accent: "#7B5EFF",
  },
  {
    number: "02",
    phase: "Construction",
    timeline: "Sem. 2+",
    description:
      "On développe les automatisations, les apps, les intégrations. On teste avec votre équipe, on ajuste.",
    deliverables: ["Développement", "Intégration IA", "Tests terrain"],
    accent: "#a78bfa",
  },
  {
    number: "03",
    phase: "Itération",
    timeline: "Continu",
    description:
      "Mise en production, monitoring, optimisation. On reste tant que c'est utile. L'objectif : vous êtes autonome.",
    deliverables: ["Mise en prod", "Monitoring", "Autonomie"],
    accent: "#00F5FF",
  },
];

export function IAMethod() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          y: orbY,
          width: 600,
          height: 600,
          background: "rgba(0,245,255,0.12)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <div className="section-divider mb-16 w-full" />

        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Notre méthode
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            On cadre. On construit.{" "}
            <em className="gradient-text">On itère.</em>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-white/30">
            Pas de cahier des charges de 80 pages. Un process agile, des
            livrables concrets à chaque étape.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px md:left-[23px]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, #7B5EFF, #a78bfa, #00F5FF)",
                opacity: 0.08,
              }}
            />
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background:
                  "linear-gradient(to bottom, #7B5EFF, #a78bfa, #00F5FF)",
                opacity: 0.5,
                boxShadow: "0 0 16px rgba(0,245,255,0.25)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-14">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.1 * i}>
                <div className="group relative flex gap-6 md:gap-10">
                  {/* Dot */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12">
                    <div
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle, ${step.accent}25 0%, transparent 70%)`,
                      }}
                    />
                    <span
                      className="font-display relative text-[13px] font-bold tracking-wide md:text-[15px]"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-xl text-white md:text-2xl">
                        {step.phase}
                      </h3>
                      <span className="text-[11px] tracking-widest text-white/20 uppercase">
                        {step.timeline}
                      </span>
                    </div>

                    <p className="mt-3 max-w-lg text-[14px] leading-[1.7] text-white/35">
                      {step.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.deliverables.map((d) => (
                        <span
                          key={d}
                          className="rounded-full px-3 py-1 text-[11px] font-medium"
                          style={{
                            background: `${step.accent}08`,
                            border: `1px solid ${step.accent}12`,
                            color: `${step.accent}90`,
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add components/ia/IAMethod.tsx
git commit -m "feat(ia): add Method section — 3-step timeline mirroring Sales"
```

---

### Task 5: Rewrite IAPricing — 2 offres

**Files:**
- Modify: `components/ia/IAPricing.tsx` (full rewrite)

**Step 1: Rewrite IAPricing.tsx**

Rewrite from 3 offers to 2 offers. Mirror SalesPricing layout (2-column grid, TiltCards). Offer 1: Automatisation (à partir de 2 000€). Offer 2: Projet sur mesure (Sur devis, recommended).

```tsx
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  ArrowRight,
  Zap,
  Code2,
  Workflow,
  Link2,
  Brain,
  Settings,
  BarChart3,
  Layers,
} from "lucide-react";

const offers = [
  {
    tag: "Done for you",
    title: "Automatisation",
    description:
      "On connecte vos outils et on automatise vos process. Make, n8n, Zapier. Ça tourne tout seul.",
    pricing: [
      { amount: "2 000€", detail: "HT", label: "À partir de" },
    ],
    features: [
      { icon: Workflow, text: "Workflows automatisés end-to-end" },
      { icon: Link2, text: "Connexion de votre stack existante" },
      { icon: Brain, text: "Enrichissement & scoring IA" },
      { icon: Settings, text: "Monitoring et maintenance" },
    ],
    accent: "#7B5EFF",
    ctaLabel: "Automatiser mes process",
    ctaHref: "#contact-ia",
  },
  {
    tag: "Build",
    title: "Projet sur mesure",
    recommended: true,
    description:
      "Apps métier, sites IA, CRM, dashboards. On développe avec l'IA, on intègre à votre existant, on livre.",
    pricing: [
      { amount: "Sur devis", detail: "", label: "Forfait projet" },
    ],
    features: [
      { icon: Code2, text: "Apps métier, sites IA, CRM, dashboards" },
      { icon: Layers, text: "Intégration à votre existant" },
      { icon: Brain, text: "Développement IA-first" },
      { icon: BarChart3, text: "Accompagnement de A à Z" },
    ],
    accent: "#00F5FF",
    ctaLabel: "Discuter de mon projet",
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
            Deux offres.{" "}
            <em className="gradient-text">Zéro surprise.</em>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-white/30">
            Automatisation clé en main ou projet sur mesure. Dans les deux cas, périmètre clair et résultats mesurés.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {offers.map((offer, i) => (
            <ScrollReveal key={offer.title} delay={0.15 * i}>
              <TiltCard
                className={`group relative h-full overflow-hidden p-10 transition-all duration-500 ${"recommended" in offer && offer.recommended ? "border border-[#00F5FF]/15" : ""}`}
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
                    <span className="inline-flex rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#00F5FF]">
                      Recommandé
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display mt-6 text-[clamp(1.5rem,3vw,2rem)] leading-[1.1] text-white">
                  {offer.title}
                </h3>

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
                        {p.detail && (
                          <span className="text-[13px] text-white/25">
                            {p.detail}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="mt-5 text-[14px] leading-[1.7] text-white/35">
                  {offer.description}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {offer.features.map((f) => (
                    <li
                      key={f.text}
                      className="flex items-start gap-3 text-[13px] text-white/50"
                    >
                      <f.icon
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: offer.accent }}
                      />
                      {f.text}
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
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add components/ia/IAPricing.tsx
git commit -m "refactor(ia): rewrite Pricing — 2 offers (automation + custom project)"
```

---

### Task 6: Rewrite IAFAQ — New questions

**Files:**
- Modify: `components/ia/IAFAQ.tsx` (data only, keep accordion structure)

**Step 1: Replace FAQ data**

Only replace the `faqs` array. Keep the entire component/accordion JSX unchanged.

Replace the faqs array (lines 8-38) with:

```ts
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
```

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build.

**Step 3: Commit**

```bash
git add components/ia/IAFAQ.tsx
git commit -m "refactor(ia): rewrite FAQ with broader, sector-agnostic questions"
```

---

### Task 7: Wire everything — Update content.tsx, delete old components, update metadata

**Files:**
- Modify: `app/ia/content.tsx` (update imports and component order)
- Modify: `app/ia/page.tsx` (update metadata and FAQ schema)
- Delete: `components/ia/IABeforeAfter.tsx`
- Delete: `components/ia/IAStack.tsx`
- Delete: `components/ia/IAProof.tsx`

**Step 1: Rewrite app/ia/content.tsx**

```tsx
"use client";

import { IAHero } from "@/components/ia/IAHero";
import { IACapabilities } from "@/components/ia/IACapabilities";
import { IAUseCases } from "@/components/ia/IAUseCases";
import { IAMethod } from "@/components/ia/IAMethod";
import { IAPricing } from "@/components/ia/IAPricing";
import { IAFAQ } from "@/components/ia/IAFAQ";
import { IACTA } from "@/components/ia/IACTA";
import { Footer } from "@/components/layout/Footer";

export function IAContent() {
  return (
    <main id="main-content">
      <IAHero />
      <IACapabilities />
      <IAUseCases />
      <IAMethod />
      <IAPricing />
      <IAFAQ />
      <IACTA />
      <Footer />
    </main>
  );
}
```

**Step 2: Update FAQ schema in app/ia/page.tsx**

Replace the FAQPage schema (the last object in the jsonLd array) with the new questions matching IAFAQ.

**Step 3: Delete old components**

```bash
rm components/ia/IABeforeAfter.tsx
rm components/ia/IAStack.tsx
rm components/ia/IAProof.tsx
```

**Step 4: Full build verification**

Run: `npm run build`
Expected: Clean build, zero errors. No imports referencing deleted files.

**Step 5: Commit**

```bash
git add -A
git commit -m "refactor(ia): wire new page structure, remove BeforeAfter/Stack/Proof"
```

---

### Task 8: Final review & humanizer pass

**Files:**
- All IA components created/modified in tasks 1-7

**Step 1: Run the copywriting/humanizer skill on all new copy**

Review all French copy across components for:
- AI-generated patterns (rule of three, promotional language, etc.)
- Consistency in tone with the Sales page
- Natural, conversational French

**Step 2: Production build**

Run: `npm run build`
Expected: Clean build.

**Step 3: Final commit**

```bash
git add -A
git commit -m "polish(ia): humanizer pass on all new copy"
```

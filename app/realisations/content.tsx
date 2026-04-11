"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";

/* ─────────────────────────────────────────────
   Section accent colors
───────────────────────────────────────────── */
const SITES_COLOR = "#4ECBA0";
const APPS_COLOR = "#7C9EFF";

/* ─────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────── */
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

/* ─────────────────────────────────────────────
   Projects data
───────────────────────────────────────────── */
const projects = [
  // Sites web
  {
    name: "ImmoMatch",
    what: "Agent IA pour le matching immobilier",
    how: "Site vitrine Next.js avec animations Framer Motion",
    tags: ["Next.js", "Framer Motion", "IA"],
    url: null,
    category: "site" as const,
    image: "/realisations/immomatch.png",
    video: "/realisations/immomatch.mp4",
  },
  {
    name: "IzaIA",
    what: "Formation IA de 2 jours pour non-techniques",
    how: "Landing page haute conversion + formulaire d'inscription",
    tags: ["Next.js", "Tailwind", "SEO"],
    url: null,
    category: "site" as const,
    image: "/realisations/izaia.png",
    video: null,
  },
  {
    name: "GTM DeepTech",
    what: "Go-to-market pour startups deeptech",
    how: "Site premium dark theme + copywriting B2B",
    tags: ["Next.js", "Tailwind", "Copywriting"],
    url: null,
    category: "site" as const,
    image: "/realisations/gtm-deeptech.png",
    video: null,
  },
  {
    name: "Setting",
    what: "Prospection LinkedIn B2B automatisée",
    how: "Site produit avec pricing, démo et onboarding",
    tags: ["Next.js", "Tailwind", "SaaS"],
    url: null,
    category: "site" as const,
    image: "/realisations/setting.png",
    video: null,
  },
  {
    name: "EstimeIA",
    what: "Site vitrine pour outil d'estimation immobilière IA",
    how: "Landing page + démo produit + SEO",
    tags: ["Next.js", "Tailwind", "SEO", "IA"],
    url: null,
    category: "site" as const,
    image: "/realisations/estimeia-site.png",
    video: null,
  },
  // Apps
  {
    name: "ImmoV2",
    what: "App de matching immobilier IA",
    how: "MVP complet : app Next.js + Supabase + auth",
    tags: ["Next.js", "Supabase", "IA", "Auth"],
    url: null,
    category: "app" as const,
    image: null,
    video: null,
  },
  {
    name: "EstimeIA",
    what: "Estimation immobilière en 15 secondes",
    how: "App avec données DVF + géolocalisation + IA",
    tags: ["Next.js", "API DVF", "IA", "Maps"],
    url: null,
    category: "app" as const,
    image: null,
    video: null,
  },
  {
    name: "PushQuest",
    what: "App fitness gamifiée avec combats RPG",
    how: "App React avec système de progression et boss fights",
    tags: ["React", "Gamification", "IA"],
    url: null,
    category: "app" as const,
    image: null,
    video: null,
  },
  {
    name: "Clone IA",
    what: "Clone conversationnel IA",
    how: "En cours de développement",
    tags: ["IA", "LLM", "Next.js"],
    url: null,
    category: "app" as const,
    image: null,
    video: null,
  },
];

const siteProjects = projects.filter((p) => p.category === "site");
const appProjects = projects.filter((p) => p.category === "app");

/* ─────────────────────────────────────────────
   Section header
───────────────────────────────────────────── */
function SectionHeader({
  pillar,
  subtext,
  color,
}: {
  pillar: string;
  subtext: string;
  color: string;
}) {
  return (
    <div className="mb-12">
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase"
        style={{
          background: `rgba(${hexToRgb(color)},0.08)`,
          border: `1px solid rgba(${hexToRgb(color)},0.2)`,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {pillar}
      </div>
      <p className="mt-3 text-[15px] text-white/40">{subtext}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Project card
───────────────────────────────────────────── */
interface Project {
  name: string;
  what: string;
  how: string;
  tags: string[];
  url: string | null;
  category: "site" | "app";
  image: string | null;
  video: string | null;
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <ScrollReveal delay={delay}>
      <TiltCard className="group overflow-hidden" intensity={5}>
        {/* Media area */}
        <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.02]">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-top"
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white/10 text-sm">
              Vidéo à venir
            </div>
          )}
        </div>
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-white">{project.name}</h3>
              <p className="mt-1 text-[13px] text-white/50">{project.what}</p>
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg p-2 text-white/20 transition-colors hover:bg-white/[0.05] hover:text-white/60"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
          <p className="mt-2 text-[12px] text-white/30">{project.how}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white/40"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}

/* ─────────────────────────────────────────────
   Main content component
───────────────────────────────────────────── */
export function RealisationsContent() {
  return (
    <main id="main-content">
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <ScrollReveal>
            <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
              Nos réalisations
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display mt-8 text-[clamp(2.8rem,6vw,5rem)] leading-[1] tracking-[-0.03em]">
              On build.
              <br />
              <strong className="gradient-text font-display">Voici la preuve.</strong>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-[560px] text-[16px] leading-[1.7] text-white/40">
              Sites web, applications, automatisations. Chaque projet est un problème résolu.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Sites web ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionHeader
            pillar="Sites web"
            subtext="Des sites qui convertissent, pas juste qui existent."
            color={SITES_COLOR}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Applications ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionHeader
            pillar="Applications"
            subtext="Des apps qui règlent de vrais problèmes."
            color={APPS_COLOR}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FinalCTA + Footer ── */}
      <FinalCTA />
      <Footer />
    </main>
  );
}

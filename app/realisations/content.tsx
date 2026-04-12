"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, X, Maximize2 } from "lucide-react";
import Image from "next/image";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";

/* ─────────────────────────────────────────────
   Lightbox modal
───────────────────────────────────────────── */
function Lightbox({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="relative w-[90vw] max-w-[1200px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="relative aspect-[16/9]">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="h-full w-full object-contain"
              />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-contain"
              />
            ) : null}
          </div>
          <div className="px-6 py-4 border-t border-white/5">
            <h3 className="text-lg font-medium text-white">{project.name}</h3>
            <p className="mt-1 text-[13px] text-white/50">{project.what}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    what: "Matching IA entre lifestyle client et biens immobiliers intercabinet",
    how: "Site vitrine animé pour présenter le produit aux réseaux de mandataires",
    tags: ["Next.js", "Framer Motion", "IA"],
    url: null,
    category: "site" as const,
    image: "/realisations/immomatch.png",
    video: "/realisations/immomatch.mp4",
  },
  {
    name: "IzaIA",
    what: "Formation IA pour dirigeants et équipes non-techniques",
    how: "Landing page de vente avec inscription et programme détaillé",
    tags: ["Next.js", "Tailwind", "SEO"],
    url: null,
    category: "site" as const,
    image: "/realisations/izaia.png",
    video: "/realisations/izaia.mp4",
  },
  {
    name: "GTM DeepTech",
    what: "Cabinet de conseil go-to-market pour fondateurs deeptech B2B",
    how: "Site corporate premium avec positionnement et offres",
    tags: ["Next.js", "Tailwind", "Copywriting"],
    url: null,
    category: "site" as const,
    image: "/realisations/gtm-deeptech.png",
    video: "/realisations/gtm-deeptech.mp4",
  },
  {
    name: "Setting",
    what: "Service de prospection LinkedIn clé en main pour solopreneurs B2B",
    how: "Site produit avec pricing, social proof et onboarding",
    tags: ["Next.js", "Tailwind", "SaaS"],
    url: null,
    category: "site" as const,
    image: "/realisations/setting.png",
    video: "/realisations/setting.mp4",
  },
  {
    name: "EstimeIA",
    what: "Outil d'estimation immobilière IA pour agents et mandataires",
    how: "Landing page produit avec démo interactive et FAQ",
    tags: ["Next.js", "Tailwind", "SEO", "IA"],
    url: null,
    category: "site" as const,
    image: "/realisations/estimeia-site.png",
    video: null,
  },
  // Apps
  {
    name: "ImmoMatch",
    what: "CRM immobilier intercabinet avec matching IA lifestyle et pipeline de deals",
    how: "MVP complet : dashboard, gestion biens/clients, briefing IA quotidien",
    tags: ["Next.js", "Supabase", "IA", "Auth"],
    url: null,
    category: "app" as const,
    image: null,
    video: "/realisations/immomatch-app.mp4",
  },
  {
    name: "EstimeIA",
    what: "Estimation immobilière en moins d'une minute, données marché + IA",
    how: "App avec recherche d'adresse, analyse multi-sources et génération de dossier PDF",
    tags: ["Next.js", "IA", "Data", "Maps"],
    url: null,
    category: "app" as const,
    image: null,
    video: "/realisations/estimeia-app.mp4",
  },
  {
    name: "PushQuest",
    what: "App fitness gamifiée avec détection de mouvement par caméra",
    how: "Détection pose en temps réel, système de progression RPG, combats de boss",
    tags: ["React", "Computer Vision", "Gamification"],
    url: null,
    category: "app" as const,
    image: null,
    video: "/realisations/pushquest.mp4",
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

function ProjectCard({ project, delay, onExpand }: { project: Project; delay: number; onExpand: (p: Project) => void }) {
  const hasMedia = project.video || project.image;
  return (
    <ScrollReveal delay={delay}>
      <TiltCard className="group overflow-hidden" intensity={5}>
        {/* Media area */}
        <div
          className={`relative aspect-[16/9] overflow-hidden bg-white/[0.02]${hasMedia ? " cursor-pointer" : ""}`}
          onClick={() => hasMedia && onExpand(project)}
        >
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-contain"
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
          {hasMedia && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
              <Maximize2 className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
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
  const [expanded, setExpanded] = useState<Project | null>(null);

  return (
    <main id="main-content">
      {expanded && (
        <Lightbox project={expanded} onClose={() => setExpanded(null)} />
      )}
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
              Quelques projets récents, du site vitrine au MVP complet.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Sites web ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionHeader
            pillar="Sites web"
            subtext="Sites vitrines, landing pages, sites produit."
            color={SITES_COLOR}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} delay={i * 0.1} onExpand={setExpanded} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Applications ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionHeader
            pillar="Applications"
            subtext="MVP, outils métier, apps grand public."
            color={APPS_COLOR}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} delay={i * 0.1} onExpand={setExpanded} />
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

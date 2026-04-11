"use client";

import {
  Bot,
  LayoutDashboard,
  Settings,
  Zap,
  Workflow,
  BarChart3,
  Users,
  Phone,
  ArrowRight,
} from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";

/* ─────────────────────────────────────────────
   Section accent colors
───────────────────────────────────────────── */
const BUILD_COLOR = "#4ECBA0";
const AUTOMATE_COLOR = "#EEFF66";
const GROW_COLOR = "#7C9EFF";

/* ─────────────────────────────────────────────
   Shared helpers
───────────────────────────────────────────── */
function iconBox(color: string) {
  return {
    background: `rgba(${hexToRgb(color)},0.07)`,
    border: `1px solid rgba(${hexToRgb(color)},0.125)`,
  };
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

/* ─────────────────────────────────────────────
   Large card (col-span-2) with corner glow + feature list
───────────────────────────────────────────── */
interface LargeCardProps {
  color: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  delay: number;
}

function LargeCard({ color, icon, title, description, items, delay }: LargeCardProps) {
  return (
    <ScrollReveal delay={delay} className="lg:col-span-2">
      <TiltCard className="group relative overflow-hidden p-8 h-full">
        <div
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-40"
          style={{ background: color, filter: "blur(50px)" }}
        />
        <div className="relative z-10">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
            style={iconBox(color)}
          >
            <span style={{ color }}>{icon}</span>
          </div>
          <h3 className="font-display text-xl text-white mt-5">{title}</h3>
          <p className="text-[14px] leading-[1.7] text-white/35 mt-3">{description}</p>
          <div className="mt-6 space-y-2">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13px] text-white/40">
                <span
                  className="h-1 w-1 rounded-full shrink-0"
                  style={{ background: `rgba(${hexToRgb(color)},0.5)` }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}

/* ─────────────────────────────────────────────
   Small card (col-span-1) — no glow, no list
───────────────────────────────────────────── */
interface SmallCardProps {
  color: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function SmallCard({ color, icon, title, description, delay }: SmallCardProps) {
  return (
    <ScrollReveal delay={delay} className="lg:col-span-1">
      <TiltCard className="group relative overflow-hidden p-8 h-full">
        <div className="relative z-10">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
            style={iconBox(color)}
          >
            <span style={{ color }}>{icon}</span>
          </div>
          <h3 className="font-display text-xl text-white mt-5">{title}</h3>
          <p className="text-[14px] leading-[1.7] text-white/35 mt-3">{description}</p>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}

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
          color,
        }}
      >
        {pillar}
      </div>
      <p className="mt-3 text-[15px] text-white/40">{subtext}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main content component
───────────────────────────────────────────── */
export function OffreContent() {
  return (
    <main id="main-content">
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6 text-center">
          <ScrollReveal>
            <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
              Notre offre
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display mt-8 text-[clamp(2.8rem,6vw,5rem)] leading-[1] tracking-[-0.03em]">
              De l&apos;idée aux premiers revenus.
              <br />
              <strong className="gradient-text font-display">Tout compris.</strong>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-[560px] text-[16px] leading-[1.7] text-white/40">
              On construit votre MVP, on automatise vos process, et on vous accompagne
              jusqu&apos;aux premiers clients payants.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── #build ── */}
      <section id="build" className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionHeader
            pillar="Build"
            subtext="On construit votre MVP"
            color={BUILD_COLOR}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <LargeCard
              color={BUILD_COLOR}
              icon={<Bot className="h-5 w-5" />}
              title="Applications & MVP SaaS"
              description="Application web sur mesure, SaaS complet, interfaces métier, intégration IA native."
              items={[
                "Next.js, SvelteKit, React",
                "Supabase, Stripe, Auth",
                "API & intégrations tierces",
                "Architecture scalable",
              ]}
              delay={0}
            />
            <SmallCard
              color={BUILD_COLOR}
              icon={<LayoutDashboard className="h-5 w-5" />}
              title="Sites haute conversion"
              description="Landing pages, sites vitrine optimisés SEO/GEO. Design premium, performance maximale."
              delay={0.1}
            />
            <SmallCard
              color={BUILD_COLOR}
              icon={<Settings className="h-5 w-5" />}
              title="Dashboards & Interfaces"
              description="Tableaux de bord interactifs, portails clients, outils internes sur mesure."
              delay={0.2}
            />
            <LargeCard
              color={BUILD_COLOR}
              icon={<Zap className="h-5 w-5" />}
              title="Intégration IA"
              description="Chatbots, génération de contenu, analyse automatisée. L'IA au service de votre produit, pas comme gadget."
              items={[
                "Chatbots & assistants IA",
                "Génération de contenu",
                "Analyse automatisée",
                "RAG & embeddings",
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── #automate ── */}
      <section id="automate" className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionHeader
            pillar="Automate"
            subtext="On automatise vos process"
            color={AUTOMATE_COLOR}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <LargeCard
              color={AUTOMATE_COLOR}
              icon={<Workflow className="h-5 w-5" />}
              title="Workflows automatisés"
              description="Make, n8n, Zapier. De la lead capture au reporting, vos process tournent tout seuls."
              items={[
                "Make, n8n, Zapier",
                "Intégrations API",
                "Triggers & webhooks",
                "Monitoring & alertes",
              ]}
              delay={0}
            />
            <SmallCard
              color={AUTOMATE_COLOR}
              icon={<Settings className="h-5 w-5" />}
              title="CRM & outils internes"
              description="Setup, configuration et automatisation de votre CRM. Intégration avec votre stack existante."
              delay={0.1}
            />
            <SmallCard
              color={AUTOMATE_COLOR}
              icon={<Bot className="h-5 w-5" />}
              title="Prompt engineering & IA"
              description="On intègre l'IA là où elle a un vrai impact. Pas de gadget, du ROI."
              delay={0.2}
            />
            <LargeCard
              color={AUTOMATE_COLOR}
              icon={<Zap className="h-5 w-5" />}
              title="Automatisation end-to-end"
              description="Onboarding, facturation, relances, reporting. Tout ce qui peut tourner seul, tourne seul."
              items={[
                "Onboarding automatisé",
                "Facturation & relances",
                "Reporting temps réel",
                "Alertes & notifications",
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── #grow ── */}
      <section id="grow" className="relative py-20 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionHeader
            pillar="Grow"
            subtext="On vous amène vos premiers clients"
            color={GROW_COLOR}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <LargeCard
              color={GROW_COLOR}
              icon={<BarChart3 className="h-5 w-5" />}
              title="SEO & GEO"
              description="Optimisation pour Google et les moteurs IA (ChatGPT, Perplexity, Claude). Votre site visible là où vos clients cherchent."
              items={[
                "SEO technique & on-page",
                "GEO (Generative Engine Optimization)",
                "Contenu optimisé IA",
                "Suivi de positions",
              ]}
              delay={0}
            />
            <SmallCard
              color={GROW_COLOR}
              icon={<Users className="h-5 w-5" />}
              title="Stratégie d'acquisition"
              description="Canaux, messaging, ciblage. On construit votre machine à prospects."
              delay={0.1}
            />
            <SmallCard
              color={GROW_COLOR}
              icon={<Phone className="h-5 w-5" />}
              title="Coaching premières ventes"
              description="Accompagnement hands-on : scripts, objections, closing. On ne part pas tant que ça ne rapporte pas."
              delay={0.2}
            />
            <LargeCard
              color={GROW_COLOR}
              icon={<ArrowRight className="h-5 w-5" />}
              title="Outreach & conversion"
              description="Cold email, LinkedIn, partnerships. On teste, on mesure, on scale ce qui marche."
              items={[
                "Cold email & séquences",
                "LinkedIn outbound",
                "Partnerships stratégiques",
                "A/B testing & optimisation",
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── FinalCTA + Footer ── */}
      <FinalCTA />
      <Footer />
    </main>
  );
}

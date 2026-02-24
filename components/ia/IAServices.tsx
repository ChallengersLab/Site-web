"use client";

import { LayoutDashboard, Workflow, Bot, Zap } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function IAServices() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* ── Badge ── */}
        <div className="text-center">
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Nos services
          </span>
        </div>

        {/* ── Heading ── */}
        <h2 className="font-display mt-8 text-center text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
          Ce qu&apos;on construit.
          <br />
          <em className="gradient-text">Pour vous.</em>
        </h2>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-16">
          {/* ── Row 1 — Large card: Sites & interfaces IA ── */}
          <ScrollReveal delay={0} className="lg:col-span-2">
            <TiltCard className="group relative overflow-hidden p-8 h-full">
              {/* Corner glow on hover */}
              <div
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                style={{ background: "#00F5FF", filter: "blur(50px)" }}
              />

              <div className="relative z-10">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(0,245,255,0.07)",
                    border: "1px solid rgba(0,245,255,0.125)",
                  }}
                >
                  <LayoutDashboard className="h-5 w-5 text-[#00F5FF]" />
                </div>

                <h3 className="font-display text-xl text-white mt-5">
                  Sites &amp; interfaces IA
                </h3>
                <p className="text-[14px] leading-[1.7] text-white/35 mt-3">
                  Sites web, dashboards, interfaces m&eacute;tier. Design premium, live en 48h.
                </p>

                <div className="mt-6 space-y-2">
                  {[
                    "Landing pages haute conversion",
                    "Dashboards interactifs",
                    "Interfaces métier sur mesure",
                    "Intégration IA (chatbots, génération)",
                  ].map((d) => (
                    <div key={d} className="flex items-center gap-2 text-[13px] text-white/40">
                      <span className="h-1 w-1 rounded-full bg-[#00F5FF]/50 shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* ── Row 1 — Small card: Workflows automatisés ── */}
          <ScrollReveal delay={0.1} className="lg:col-span-1">
            <TiltCard className="group relative overflow-hidden p-8 h-full">
              <div className="relative z-10">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(0,245,255,0.07)",
                    border: "1px solid rgba(0,245,255,0.125)",
                  }}
                >
                  <Workflow className="h-5 w-5 text-[#00F5FF]" />
                </div>

                <h3 className="font-display text-xl text-white mt-5">
                  Workflows automatis&eacute;s
                </h3>
                <p className="text-[14px] leading-[1.7] text-white/35 mt-3">
                  Make, n8n, Zapier — vos process tournent tout seuls. De la lead capture au
                  reporting.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* ── Row 2 — Small card: Prompt engineering ── */}
          <ScrollReveal delay={0.2} className="lg:col-span-1">
            <TiltCard className="group relative overflow-hidden p-8 h-full">
              <div className="relative z-10">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(0,245,255,0.07)",
                    border: "1px solid rgba(0,245,255,0.125)",
                  }}
                >
                  <Bot className="h-5 w-5 text-[#00F5FF]" />
                </div>

                <h3 className="font-display text-xl text-white mt-5">
                  Prompt engineering &amp; IA
                </h3>
                <p className="text-[14px] leading-[1.7] text-white/35 mt-3">
                  On int&egrave;gre l&apos;IA l&agrave; o&ugrave; elle a un vrai impact. Pas de
                  gadget, du ROI.
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* ── Row 2 — Large card: Applications métier ── */}
          <ScrollReveal delay={0.3} className="lg:col-span-2">
            <TiltCard className="group relative overflow-hidden p-8 h-full">
              {/* Corner glow on hover */}
              <div
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                style={{ background: "#00F5FF", filter: "blur(50px)" }}
              />

              <div className="relative z-10">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(0,245,255,0.07)",
                    border: "1px solid rgba(0,245,255,0.125)",
                  }}
                >
                  <Zap className="h-5 w-5 text-[#00F5FF]" />
                </div>

                <h3 className="font-display text-xl text-white mt-5">
                  Applications m&eacute;tier automatis&eacute;es
                </h3>
                <p className="text-[14px] leading-[1.7] text-white/35 mt-3">
                  Apps no-code connect&eacute;es &agrave; votre stack. Bubble, FlutterFlow, Retool
                  — op&eacute;rationnel en jours, pas en mois.
                </p>

                <div className="mt-6 space-y-2">
                  {[
                    "CRM & outils internes",
                    "Apps de gestion sur mesure",
                    "Portails clients",
                    "Automatisation end-to-end",
                  ].map((d) => (
                    <div key={d} className="flex items-center gap-2 text-[13px] text-white/40">
                      <span className="h-1 w-1 rounded-full bg-[#00F5FF]/50 shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

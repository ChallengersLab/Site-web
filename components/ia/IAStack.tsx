"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const tools = [
  { name: "Make", emoji: "\u26A1" },
  { name: "n8n", emoji: "\uD83D\uDD17" },
  { name: "Zapier", emoji: "\u2699\uFE0F" },
  { name: "Bubble", emoji: "\uD83E\uDEE7" },
  { name: "FlutterFlow", emoji: "\uD83D\uDCF1" },
  { name: "Retool", emoji: "\uD83D\uDEE0" },
  { name: "OpenAI", emoji: "\uD83E\uDD16" },
  { name: "Claude", emoji: "\uD83E\uDDE0" },
  { name: "Mistral", emoji: "\uD83C\uDF2C" },
  { name: "Airtable", emoji: "\uD83D\uDCCA" },
  { name: "Notion", emoji: "\uD83D\uDCDD" },
  { name: "HubSpot", emoji: "\uD83C\uDFAF" },
];

export function IAStack() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="section-divider mx-auto mb-16 w-full max-w-[1100px]" />

      <div className="mx-auto max-w-[1100px] px-6">
        <div className="text-center">
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            Notre stack
          </span>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Les outils
            <br />
            <em className="gradient-text">qu&apos;on ma&icirc;trise</em>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={0.05 * i}>
              <div className="glass-card group flex flex-col items-center gap-3 rounded-xl p-5 transition-all duration-300 hover:border-[#00F5FF]/20 hover:scale-105 cursor-default">
                <span className="text-2xl">{tool.emoji}</span>
                <span className="text-[12px] font-semibold text-white/50 group-hover:text-white/80 transition-colors">
                  {tool.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

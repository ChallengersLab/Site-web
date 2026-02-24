"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

const categories = [
  {
    label: "Automatisation",
    tools: [
      { name: "Make", monogram: "Mk" },
      { name: "n8n", monogram: "n8" },
      { name: "Zapier", monogram: "Zp" },
    ],
  },
  {
    label: "No-code",
    tools: [
      { name: "Bubble", monogram: "Bb" },
      { name: "FlutterFlow", monogram: "FF" },
      { name: "Retool", monogram: "Rt" },
    ],
  },
  {
    label: "IA",
    tools: [
      { name: "OpenAI", monogram: "Oi" },
      { name: "Claude", monogram: "Cl" },
      { name: "Mistral", monogram: "Ms" },
    ],
  },
  {
    label: "Data & CRM",
    tools: [
      { name: "Airtable", monogram: "At" },
      { name: "Notion", monogram: "Nt" },
      { name: "HubSpot", monogram: "Hs" },
    ],
  },
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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, catIdx) => (
            <ScrollReveal key={cat.label} delay={0.08 * catIdx}>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/20">
                  {cat.label}
                </span>
                <div className="mt-3 space-y-2">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="group flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-[#00F5FF]/15 hover:bg-white/[0.04]"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold tracking-tight transition-colors duration-300"
                        style={{
                          background: "rgba(0,245,255,0.06)",
                          border: "1px solid rgba(0,245,255,0.1)",
                          color: "rgba(0,245,255,0.5)",
                        }}
                      >
                        {tool.monogram}
                      </span>
                      <span className="text-[13px] font-medium text-white/50 group-hover:text-white/80 transition-colors">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

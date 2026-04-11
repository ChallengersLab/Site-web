"use client";

interface Tool {
  name: string;
  color: string;
}

const toolsRow1: Tool[] = [
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Vercel", color: "#FFFFFF" },
  { name: "Make", color: "#A855F7" },
  { name: "n8n", color: "#EA4B71" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "Claude", color: "#D4A574" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "Zapier", color: "#FF4F00" },
  { name: "Notion", color: "#E8E8E2" },
];

const toolsRow2: Tool[] = [
  { name: "Stripe", color: "#635BFF" },
  { name: "SvelteKit", color: "#FF3E00" },
  { name: "Mistral", color: "#F7931E" },
  { name: "Airtable", color: "#18BFFF" },
  { name: "Retool", color: "#F76808" },
  { name: "Tailwind", color: "#38BDF8" },
  { name: "Framer", color: "#0055FF" },
];

function Row({ tools, reverse = false }: { tools: Tool[]; reverse?: boolean }) {
  return (
    <div
      className="flex gap-10"
      style={{
        animation: `marquee ${reverse ? "40" : "35"}s linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {[...tools, ...tools].map((tool, i) => (
        <span key={`${tool.name}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span
            className="text-[12px] font-semibold uppercase tracking-[0.15em] transition-all duration-300"
            style={{
              color: tool.color,
              opacity: 0.55,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.textShadow = `0 0 16px ${tool.color}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.55";
              e.currentTarget.style.textShadow = "none";
            }}
          >
            {tool.name}
          </span>
          <span className="h-[3px] w-[3px] rounded-full" style={{ background: "rgba(238,255,102,0.25)" }} />
        </span>
      ))}
    </div>
  );
}

export function MarqueeBanner() {
  return (
    <section
      className="relative overflow-hidden py-10"
      style={{
        background: "#0B1628",
        borderTop: "0.5px solid #1D2E55",
        borderBottom: "0.5px solid #1D2E55",
      }}
    >
      {/* Subtle navy glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(124,158,255,0.06) 0%, transparent 70%)",
        }}
      />

      <p className="mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7C9EFF]/60">
        Les outils qu&apos;on maîtrise
      </p>

      <div className="space-y-4 overflow-hidden">
        <div className="overflow-hidden">
          <Row tools={toolsRow1} />
        </div>
        <div className="overflow-hidden">
          <Row tools={toolsRow2} reverse />
        </div>
      </div>
    </section>
  );
}

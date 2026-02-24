"use client";

interface Tool {
  name: string;
  color: string;
}

const toolsRow1: Tool[] = [
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Vercel", color: "#FFFFFF" },
  { name: "Make", color: "#6D00CC" },
  { name: "n8n", color: "#EA4B71" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "Claude", color: "#D4A574" },
  { name: "Lemlist", color: "#4B5DFF" },
  { name: "La Growth Machine", color: "#00C49A" },
  { name: "Zapier", color: "#FF4F00" },
  { name: "Notion", color: "#EFEFEF" },
];

const toolsRow2: Tool[] = [
  { name: "Pipedrive", color: "#017737" },
  { name: "Apollo.io", color: "#4C6EF5" },
  { name: "Clay", color: "#6C5CE7" },
  { name: "Mistral", color: "#F7931E" },
  { name: "Airtable", color: "#18BFFF" },
  { name: "Retool", color: "#F76808" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "FlutterFlow", color: "#6E35D4" },
  { name: "Dropcontact", color: "#FF5733" },
  { name: "Modjo", color: "#7B68EE" },
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
        <span key={`${tool.name}-${i}`} className="flex items-center gap-10 whitespace-nowrap group/tool">
          <span
            className="text-[13px] font-semibold uppercase tracking-[0.15em] transition-all duration-300"
            style={{
              color: tool.color,
              opacity: 0.3,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.textShadow = `0 0 20px ${tool.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.3";
              e.currentTarget.style.textShadow = "none";
            }}
          >
            {tool.name}
          </span>
          <span className="h-[3px] w-[3px] rounded-full bg-accent-start/30" />
        </span>
      ))}
    </div>
  );
}

export function MarqueeBanner() {
  return (
    <section className="relative overflow-hidden bg-bg-elevated py-8">
      <div className="section-divider absolute top-0 w-full" />
      <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white">
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
      <div className="section-divider absolute bottom-0 w-full" />
    </section>
  );
}

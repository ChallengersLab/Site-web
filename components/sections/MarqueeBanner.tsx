"use client";

const toolsRow1 = [
  "HubSpot", "Salesforce", "Make", "n8n", "OpenAI", "Claude",
  "Lemlist", "La Growth Machine", "Zapier", "Notion",
];

const toolsRow2 = [
  "Pipedrive", "Apollo.io", "Clay", "Mistral", "Airtable",
  "Retool", "Bubble", "FlutterFlow", "Dropcontact", "Modjo",
];

function Row({ tools, reverse = false }: { tools: string[]; reverse?: boolean }) {
  return (
    <div
      className="flex gap-10"
      style={{
        animation: `marquee ${reverse ? "40" : "35"}s linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {[...tools, ...tools].map((tool, i) => (
        <span key={`${tool}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white/15 transition-colors duration-300 hover:text-white/40">
            {tool}
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
      <p className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-white/20">
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

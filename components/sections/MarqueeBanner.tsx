"use client";

const tools = [
  "HubSpot",
  "Salesforce",
  "Make",
  "n8n",
  "OpenAI",
  "Claude",
  "Langchain",
  "Notion",
  "Airtable",
  "Lemlist",
  "La Growth Machine",
  "Zapier",
  "Bubble",
  "FlutterFlow",
  "Retool",
  "Mistral",
];

function MarqueeRow() {
  return (
    <>
      {tools.map((tool, i) => (
        <span
          key={`${tool}-${i}`}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-white/25 transition-colors hover:text-white/50">
            {tool}
          </span>
          <span className="h-1 w-1 rounded-full bg-accent-start/40" />
        </span>
      ))}
    </>
  );
}

export function MarqueeBanner() {
  return (
    <section className="relative overflow-hidden bg-bg-elevated py-6">
      <div className="section-divider absolute top-0 w-full" />

      <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
        Les outils qu&apos;on maîtrise. Vos concurrents les découvrent.
      </p>

      <div className="animate-marquee flex gap-8">
        <MarqueeRow />
        <MarqueeRow />
      </div>

      <div className="section-divider absolute bottom-0 w-full" />
    </section>
  );
}

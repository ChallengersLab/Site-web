"use client";

const tools = [
  "HubSpot", "Salesforce", "Make", "n8n", "OpenAI", "Claude",
  "Langchain", "Notion", "Airtable", "Lemlist", "La Growth Machine",
  "Zapier", "Bubble", "FlutterFlow", "Retool", "Mistral",
];

function Row() {
  return (
    <>
      {tools.map((tool, i) => (
        <span key={`${tool}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white/15 transition-colors duration-300 hover:text-white/40">
            {tool}
          </span>
          <span className="h-[3px] w-[3px] rounded-full bg-accent-start/30" />
        </span>
      ))}
    </>
  );
}

export function MarqueeBanner() {
  return (
    <section className="relative overflow-hidden bg-bg-elevated py-8">
      <div className="section-divider absolute top-0 w-full" />
      <p className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-white/20">
        Les outils qu&apos;on maîtrise
      </p>
      <div className="animate-marquee flex gap-10">
        <Row />
        <Row />
      </div>
      <div className="section-divider absolute bottom-0 w-full" />
    </section>
  );
}

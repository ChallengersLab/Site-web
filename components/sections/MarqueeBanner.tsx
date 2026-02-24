"use client";

const items = [
  "Cold Calls à +42% de conversion",
  "DIR CO externalisé",
  "Sites IA live en 48h",
  "Apps no-code scalables",
  "+320% de leads",
  "Revenue Rocket garanti",
];

function MarqueeContent() {
  return (
    <>
      {items.map((text, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span
            className="text-sm font-medium text-white/80"
            style={{ textShadow: "0 0 20px rgba(123,94,255,0.3)" }}
          >
            {text}
          </span>
          <span className="text-accent-start text-xs">&#9670;</span>
        </span>
      ))}
    </>
  );
}

export function MarqueeBanner() {
  return (
    <section className="relative overflow-hidden bg-bg-elevated py-5">
      {/* Top glow border */}
      <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-accent-start to-transparent" />

      {/* Scrolling content (duplicated for seamless loop) */}
      <div className="animate-marquee flex gap-8">
        <MarqueeContent />
        <MarqueeContent />
      </div>

      {/* Bottom glow border */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-accent-start to-transparent" />
    </section>
  );
}

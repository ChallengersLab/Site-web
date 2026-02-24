"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowRight } from "lucide-react";
import { ressources } from "@/lib/ressources";

interface BURessourcesProps {
  articleSlugs: string[];
  accent: string;
}

export function BURessources({ articleSlugs, accent }: BURessourcesProps) {
  const articles = ressources.filter((r) => articleSlugs.includes(r.slug));
  const gridCols =
    articles.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="section-divider mx-auto mb-32 w-full max-w-[1100px]" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <ScrollReveal>
              <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
                Ressources
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-display mt-8 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
                Pour aller <em className="gradient-text">plus loin</em>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15}>
            <Link
              href="/ressources"
              className="group/link inline-flex items-center gap-2 text-[13px] font-semibold text-white/40 transition-all hover:text-white/70"
            >
              Toutes les ressources
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        <div className={`mt-12 grid gap-5 ${gridCols}`}>
          {articles.map((r, i) => (
            <ScrollReveal key={r.slug} delay={0.1 * i}>
              <Link href={`/ressources/${r.slug}`}>
                <TiltCard
                  className="group flex h-full flex-col p-7 transition-all duration-500"
                  intensity={4}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{
                        background: `${r.tagColor}12`,
                        border: `1px solid ${r.tagColor}25`,
                        color: r.tagColor,
                      }}
                    >
                      {r.tag}
                    </span>
                    <span className="text-[11px] text-white/20">
                      {r.readTime}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 flex-1 text-[17px] leading-[1.25] text-white/80 transition-colors group-hover:text-white">
                    {r.title}
                  </h3>

                  <div className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-white/30 transition-all group-hover:text-white/50">
                    Lire
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </TiltCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

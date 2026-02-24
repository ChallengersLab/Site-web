"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    metric: "15h/semaine",
    quote:
      "On a r\u00E9cup\u00E9r\u00E9 15h par semaine en automatisant nos process de qualification. L\u2019\u00E9quipe se concentre enfin sur ce qui compte.",
    name: "Marc K.",
    role: "COO, SaaS B2B \u00B7 30 employ\u00E9s",
    initials: "MK",
  },
  {
    metric: "10j delivery",
    quote:
      "Notre app interne a \u00E9t\u00E9 livr\u00E9e en 10 jours. On attendait depuis 6 mois avec notre prestataire pr\u00E9c\u00E9dent.",
    name: "Julie R.",
    role: "Head of Ops, Scale-up \u00B7 80 employ\u00E9s",
    initials: "JR",
  },
];

export function IAProof() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="text-center">
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
            T&eacute;moignages
          </span>
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
            Ils en parlent
            <br />
            <em className="gradient-text">mieux que nous</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          {testimonials.map((testimonial) => (
            <ScrollReveal key={testimonial.initials}>
              <TiltCard className="p-8">
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[12px] font-bold"
                  style={{ background: "#00F5FF15", color: "#00F5FF" }}
                >
                  {testimonial.metric}
                </span>
                <blockquote className="mt-6 text-[15px] leading-[1.7] text-white/50 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#7B5EFF] flex items-center justify-center text-[10px] font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/70">
                      {testimonial.name}
                    </p>
                    <p className="text-[11px] text-white/30">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/ressources/automatisation-crm-workflows-ia"
            className="group inline-flex items-center gap-2 text-[13px] text-white/30 hover:text-white/60 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Automatisation CRM &amp; workflows IA
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            href="/ressources/roi-ia-ventes-b2b"
            className="group inline-flex items-center gap-2 text-[13px] text-white/30 hover:text-white/60 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            ROI de l&apos;IA sur les ventes B2B
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    metric: "\u00d73 pipeline",
    quote:
      "En 3 mois, notre pipeline a tripl\u00e9. L\u2019\u00e9quipe n\u2019y croyait pas au d\u00e9but.",
    name: "Thomas M.",
    role: "CEO, SaaS B2B \u00b7 45 employ\u00e9s",
    initials: "TM",
  },
  {
    metric: "+85% close rate",
    quote:
      "Le coaching Challenger Sales a transform\u00e9 notre approche. On ne vend plus, on conseille.",
    name: "Sophie L.",
    role: "Head of Sales, Scale-up \u00b7 120 employ\u00e9s",
    initials: "SL",
  },
];

const articles = [
  {
    label: "Lire le guide prospection B2B",
    href: "/ressources/prospection-b2b-ia-guide-complet",
  },
  {
    label: "M\u00e9thode Challenger Sales",
    href: "/ressources/challenger-sales-methode-b2b",
  },
];

export function SalesProof() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center">
          <ScrollReveal>
            <span className="badge">T\u00e9moignages</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-[-0.02em]">
              Ils en parlent
              <br />
              <em className="gradient-text">mieux que nous</em>
            </h2>
          </ScrollReveal>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.initials} delay={0.15 * i}>
              <TiltCard className="p-8">
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[12px] font-bold"
                  style={{ background: "#7B5EFF15", color: "#7B5EFF" }}
                >
                  {testimonial.metric}
                </span>
                <blockquote className="mt-6 text-[15px] leading-[1.7] text-white/50 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7B5EFF] to-[#a78bfa] flex items-center justify-center text-[10px] font-bold text-white">
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

        {/* Article links */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group inline-flex items-center gap-2 text-[13px] text-white/30 hover:text-white/60 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              {article.label}
              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

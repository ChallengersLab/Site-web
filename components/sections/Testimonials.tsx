"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "En 3 mois, notre pipeline a triplé. L'équipe ChallengersLab ne vend pas du rêve, ils livrent.",
    name: "Thomas M.",
    role: "CEO, SaaS B2B (45 collaborateurs)",
  },
  {
    quote:
      "Le coaching Challenger Sales a transformé notre approche commerciale. On ne vend plus pareil. Et ça se voit sur les chiffres.",
    name: "Sophie L.",
    role: "Directrice commerciale, Scale-up fintech",
  },
  {
    quote:
      "L'automatisation qu'ils ont mise en place nous fait gagner 15h par semaine. 15 heures. Par personne.",
    name: "Marc K.",
    role: "COO, Agence digitale (30 collaborateurs)",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <span className="badge-glow inline-flex rounded-full px-3 py-1 text-xs font-medium">
            Témoignages
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Nos clients parlent{" "}
            <span className="gradient-text">mieux que nous</span>
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={0.15 * i}>
              <div className="group relative flex h-full flex-col rounded-2xl border border-white/6 bg-surface p-8 transition-all duration-300 hover:border-white/12 hover:bg-surface-light">
                <Quote className="mb-4 h-5 w-5 text-accent-start/40" />

                <blockquote className="flex-1 text-base leading-relaxed text-white/70">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-6 border-t border-white/6 pt-5">
                  <p className="font-display text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-xs text-white/35">{t.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

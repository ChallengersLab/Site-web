"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function FinalCTA() {
  return (
    <section className="relative py-32 text-center">
      {/* Background glow orb */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(123,94,255,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h2 className="text-5xl font-bold">
            Prêt à scaler votre performance commerciale ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/60">
            Rejoignez les 47 scale-ups qui ont transformé leur acquisition
            client avec l&apos;IA
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10">
            <MagneticButton href="#audit" size="large">
              Réserver mon audit gratuit
            </MagneticButton>
          </div>
          <p className="mt-4 text-sm text-white/40">
            15 minutes &middot; Sans engagement &middot; Résultats garantis
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

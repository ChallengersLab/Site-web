"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Loader2, Check } from "lucide-react";

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l\u2019envoi.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l\u2019envoi. Réessayez ou écrivez-nous directement."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-5 py-4 text-[14px] text-[#E8E8E2] placeholder:text-white/20 outline-none transition-all focus:border-[#EEFF66]/30 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#EEFF66]/15";

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden" id="contact">
      {/* Orbs */}
      <motion.div
        style={{ y: orbY1, scale: orbScale }}
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(238,255,102,0.08) 0%, transparent 60%)",
            filter: "blur(100px)",
            animation: "pulse-soft 8s ease-in-out infinite",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: orbY2 }}
        className="absolute left-[40%] top-[30%] h-[350px] w-[350px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(78,203,160,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
            animation: "float-orb 15s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[560px] px-6">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-[clamp(2.5rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              On en parle{" "}
              <em className="gradient-text not-italic">ensemble ?</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.7] text-white/30">
              30 minutes pour comprendre votre situation et voir si on peut vous aider.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-10 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Votre nom *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClasses}
                />
                <input
                  type="email"
                  required
                  placeholder="votre@email.com *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <input
                type="text"
                placeholder="Entreprise (optionnel)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={inputClasses}
              />
              <textarea
                required
                rows={4}
                placeholder="Décrivez votre situation en quelques mots... *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClasses} resize-none`}
              />

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-5 py-3 text-[13px] text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow flex w-full items-center justify-center gap-3 rounded-lg px-10 py-4 text-[15px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer mon message</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-4 pt-1">
                <div className="h-px flex-1 bg-white/[0.05]" />
                <span className="text-[11px] text-white/20">ou</span>
                <div className="h-px flex-1 bg-white/[0.05]" />
              </div>

              <a
                href="https://calendly.com/a-brakha-challengerslab/echange-decouverte-challengerslab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-10 py-4 text-[15px] font-medium text-white/45 transition-all hover:border-white/[0.1] hover:bg-white/[0.04] hover:text-white/70"
              >
                <span>Réserver un appel de 30 min</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <p className="text-center text-[11px] text-white/15">
                Gratuit &middot; Sans engagement
              </p>
            </form>
          ) : (
            <div className="mt-12 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#EEFF66]/25 bg-[#EEFF66]/08">
                <Check className="h-7 w-7 text-[#EEFF66]" />
              </div>
              <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-medium tracking-[-0.03em] leading-[1.1]">
                Message envoyé
              </h3>
              <p className="mt-4 text-[15px] text-white/40">
                Merci ! On revient vers vous sous 48h.
              </p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

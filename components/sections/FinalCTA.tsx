"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Check, Loader2 } from "lucide-react";

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
        throw new Error(
          data.error || "Erreur lors de l\u2019envoi."
        );
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
    "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 text-[15px] text-white placeholder:text-white/25 outline-none transition-all focus:border-[#7B5EFF]/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-[#7B5EFF]/30";

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden" id="contact">
      {/* Multiple layered orbs with parallax */}
      <motion.div
        style={{ y: orbY1, scale: orbScale }}
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(123,94,255,0.25) 0%, transparent 60%)",
            filter: "blur(100px)",
            animation: "pulse-soft 8s ease-in-out infinite",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: orbY2 }}
        className="absolute left-[40%] top-[30%] h-[400px] w-[400px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
            animation: "float-orb 15s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[600px] px-6">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
              On en parle{" "}
              <em className="gradient-text">ensemble ?</em>
            </h2>
            <p className="mx-auto mt-7 max-w-md text-[16px] leading-[1.7] text-white/35">
              30 minutes pour comprendre votre situation et voir comment on peut vous aider.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mt-12 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Votre nom *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClasses}
                />
                <input
                  type="email"
                  required
                  placeholder="votre@email.com *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClasses}
                />
              </div>
              <input
                type="text"
                placeholder="Entreprise (optionnel)"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className={inputClasses}
              />
              <textarea
                required
                rows={4}
                placeholder="Décrivez votre situation en quelques mots... *"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`${inputClasses} resize-none`}
              />

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-[14px] text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow flex w-full items-center justify-center gap-3 rounded-xl px-10 py-5 text-[16px] disabled:opacity-60 disabled:cursor-not-allowed"
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

              <p className="text-center text-[12px] text-white/15">
                Gratuit &middot; Sans engagement &middot; Réponse sous 48h
              </p>
            </form>
          ) : (
            <div className="mt-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#7B5EFF]/30 bg-[#7B5EFF]/10">
                <Check className="h-8 w-8 text-[#7B5EFF]" />
              </div>
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1]">
                Message envoyé
              </h3>
              <p className="mt-4 text-[16px] text-white/50">
                Merci ! On revient vers vous sous 48h.
              </p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

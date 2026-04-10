import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(238,255,102,0.2) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[600px] px-6 text-center">
          <span className="font-display text-[120px] leading-none tracking-tight gradient-text">
            404
          </span>
          <h1 className="font-display mt-4 text-[28px] text-white/80">
            Page introuvable
          </h1>
          <p className="mt-4 text-[15px] leading-[1.7] text-white/35">
            Cette page n&apos;existe pas ou a été déplacée. Pas de panique.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="btn-glow inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px]"
            >
              Retour à l&apos;accueil
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ressources"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/8 px-7 py-4 text-[15px] font-medium text-white/50 transition-all hover:border-white/15 hover:text-white/80"
            >
              Voir les ressources
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

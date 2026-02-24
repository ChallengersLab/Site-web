import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mentions légales | ChallengersLab",
  description:
    "Mentions légales du site ChallengersLab, agence Sales & IA pour PME B2B à Paris.",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden pt-36 pb-32">
        <div className="relative z-10 mx-auto max-w-[720px] px-6">
          <h1 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white">
            Mentions légales
          </h1>

          <div className="mt-10 space-y-8 text-[15px] leading-[1.85] text-white/45">
            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Éditeur du site
              </h2>
              <p>
                ChallengersLab<br />
                Agence Sales &amp; IA pour PME B2B<br />
                Paris, France<br />
                SIRET : [à compléter]<br />
                Directeur de la publication : [à compléter]
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Hébergement
              </h2>
              <p>
                Vercel Inc.<br />
                440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
                Site : vercel.com
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus (textes, images, graphismes, logo,
                icônes, etc.) présents sur le site challengerslab.com est
                protégé par le droit d&apos;auteur et reste la propriété
                exclusive de ChallengersLab, sauf mention contraire. Toute
                reproduction, représentation, modification ou adaptation, totale
                ou partielle, est interdite sans autorisation écrite préalable.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Contact
              </h2>
              <p>
                Pour toute question relative aux mentions légales, vous pouvez
                nous contacter via le formulaire du site ou par email à :{" "}
                <span className="text-white/60">[email à compléter]</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

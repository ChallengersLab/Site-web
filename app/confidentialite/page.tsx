import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité | ChallengersLab",
  description:
    "Politique de confidentialité et protection des données personnelles du site ChallengersLab.",
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden pt-36 pb-32">
        <div className="relative z-10 mx-auto max-w-[720px] px-6">
          <h1 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white">
            Politique de confidentialité
          </h1>

          <div className="mt-10 space-y-8 text-[15px] leading-[1.85] text-white/45">
            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Responsable du traitement
              </h2>
              <p>
                ChallengersLab, agence Sales &amp; IA basée à Paris, est
                responsable du traitement des données collectées sur le site
                challengerslab.com.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Données collectées
              </h2>
              <p>
                Nous pouvons collecter les données suivantes dans le cadre de
                nos services :
              </p>
              <ul className="mt-3 space-y-1 pl-5 list-disc marker:text-white/15">
                <li>Nom et prénom</li>
                <li>Adresse email professionnelle</li>
                <li>Nom de l&apos;entreprise et fonction</li>
                <li>Numéro de téléphone (facultatif)</li>
                <li>
                  Données de navigation (cookies analytiques, pages visitées)
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Finalité du traitement
              </h2>
              <p>
                Les données collectées sont utilisées exclusivement pour :
              </p>
              <ul className="mt-3 space-y-1 pl-5 list-disc marker:text-white/15">
                <li>Répondre à vos demandes de contact</li>
                <li>Planifier des appels stratégiques</li>
                <li>Améliorer l&apos;expérience utilisateur du site</li>
                <li>
                  Envoyer des communications commerciales (avec votre
                  consentement)
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Durée de conservation
              </h2>
              <p>
                Les données personnelles sont conservées pour une durée maximale
                de 3 ans à compter du dernier contact, conformément aux
                recommandations de la CNIL.
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Vos droits
              </h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
                accès, rectification, suppression, portabilité, limitation et
                opposition au traitement de vos données. Pour exercer ces
                droits, contactez-nous à :{" "}
                <span className="text-white/60">[email à compléter]</span>
              </p>
            </div>

            <div>
              <h2 className="font-display mb-3 text-[20px] text-white/85">
                Cookies
              </h2>
              <p>
                Le site utilise des cookies strictement nécessaires au
                fonctionnement du site. Aucun cookie publicitaire ou de tracking
                tiers n&apos;est utilisé sans votre consentement explicite.
              </p>
            </div>

            <p className="text-[13px] text-white/20">
              Dernière mise à jour : février 2026
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

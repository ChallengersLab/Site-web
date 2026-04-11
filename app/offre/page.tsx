import type { Metadata } from "next";
import { OffreContent } from "./content";

export const metadata: Metadata = {
  title: "Offre — MVP SaaS, Automatisations & Premiers Clients | ChallengersLab",
  description:
    "On construit votre MVP, on automatise vos process, et on vous accompagne jusqu'aux premiers clients payants. Découvrez notre offre complète.",
  alternates: { canonical: "/offre" },
  openGraph: {
    title: "Offre — MVP SaaS, Automatisations & Premiers Clients | ChallengersLab",
    description:
      "On construit votre MVP, on automatise vos process, et on vous accompagne jusqu'aux premiers clients payants. Découvrez notre offre complète.",
    url: "/offre",
    type: "website",
  },
};

export default function OffrePage() {
  return <OffreContent />;
}

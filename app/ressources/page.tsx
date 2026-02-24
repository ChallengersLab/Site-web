import type { Metadata } from "next";
import { RessourcesHub } from "@/components/sections/RessourcesHub";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:
    "Ressources Sales & IA pour B2B — Guides, Articles & Outils | ChallengersLab",
  description:
    "Guides pratiques, articles de fond et outils gratuits sur la prospection B2B, le coaching commercial, l'automatisation IA et la structuration des ventes. Par ChallengersLab, agence Sales & IA à Paris.",
  keywords: [
    "guide prospection B2B",
    "automatisation ventes IA",
    "Challenger Sales guide",
    "CRM B2B bonnes pratiques",
    "IA pour commerciaux",
    "workflows automatisation entreprise",
    "ressources sales B2B",
    "outils IA ventes",
  ],
  openGraph: {
    title: "Ressources Sales & IA pour B2B | ChallengersLab",
    description:
      "Guides, articles et outils gratuits pour structurer vos ventes et intégrer l'IA dans vos process B2B.",
    url: "https://challengerslab.com/ressources",
  },
  alternates: {
    canonical: "https://challengerslab.com/ressources",
  },
};

export default function RessourcesPage() {
  return (
    <main>
      <RessourcesHub />
      <Footer />
    </main>
  );
}

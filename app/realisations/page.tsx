import type { Metadata } from "next";
import { RealisationsContent } from "./content";

export const metadata: Metadata = {
  title: "Réalisations — Sites web, Apps & Automatisations | ChallengersLab",
  description: "Nos projets : MVP SaaS, sites haute conversion, apps métier et automatisations. Découvrez ce qu'on a construit.",
  alternates: { canonical: "/realisations" },
  openGraph: {
    title: "Réalisations — Sites web, Apps & Automatisations | ChallengersLab",
    description: "Nos projets : MVP SaaS, sites haute conversion, apps métier et automatisations.",
    url: "/realisations",
    type: "website",
  },
};

export default function RealisationsPage() {
  return <RealisationsContent />;
}

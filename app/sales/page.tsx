import type { Metadata } from "next";
import { SalesContent } from "./content";

export const metadata: Metadata = {
  title: "Sales — Prospection B2B & Direction Commerciale | ChallengersLab",
  description:
    "Prospection externalisée multicanal, coaching Challenger Sales, Head of Sales fractionné. On construit votre machine à pipeline B2B en 90 jours.",
  keywords: [
    "prospection B2B",
    "direction commerciale externalisée",
    "Head of Sales fractionné",
    "Challenger Sales",
    "pipeline B2B",
    "coaching commercial",
    "CRM",
    "ChallengersLab",
  ],
  alternates: { canonical: "/sales" },
  openGraph: {
    title: "Sales — Prospection B2B & Direction Commerciale | ChallengersLab",
    description:
      "Prospection externalisée multicanal, coaching Challenger Sales, Head of Sales fractionné. On construit votre machine à pipeline B2B en 90 jours.",
    url: "/sales",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Prospection B2B & Direction Commerciale",
    description:
      "Prospection externalisée multicanal, coaching Challenger Sales, Head of Sales fractionné pour PME et scale-ups B2B.",
    provider: {
      "@type": "Organization",
      name: "ChallengersLab",
      url: "https://challengerslab.com",
    },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: "Sales Consulting",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://challengerslab.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sales",
        item: "https://challengerslab.com/sales",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdelhay Bekkali",
    jobTitle: "Directeur BU Sales",
    worksFor: {
      "@type": "Organization",
      name: "ChallengersLab",
    },
  },
];

export default function SalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SalesContent />
    </>
  );
}

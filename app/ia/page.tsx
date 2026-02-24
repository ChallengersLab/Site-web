import type { Metadata } from "next";
import { IAContent } from "./content";

export const metadata: Metadata = {
  title:
    "IA & Automatisation — Sites, Apps & Workflows sur mesure | ChallengersLab",
  description:
    "Sites web IA, applications métier no-code, workflows automatisés (Make, n8n, Zapier). On connecte l'intelligence artificielle à votre business B2B.",
  keywords: [
    "automatisation IA",
    "workflows automatisés",
    "Make",
    "n8n",
    "Zapier",
    "applications no-code",
    "Bubble",
    "FlutterFlow",
    "Retool",
    "intelligence artificielle B2B",
    "ChallengersLab",
  ],
  alternates: { canonical: "/ia" },
  openGraph: {
    title:
      "IA & Automatisation — Sites, Apps & Workflows sur mesure | ChallengersLab",
    description:
      "Sites web IA, applications métier no-code, workflows automatisés. On connecte l'intelligence artificielle à votre business B2B.",
    url: "/ia",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "IA & Automatisation",
    description:
      "Sites web IA, applications métier no-code, workflows automatisés pour PME et scale-ups B2B.",
    provider: {
      "@type": "Organization",
      name: "ChallengersLab",
      url: "https://challengerslab.com",
    },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: "AI & Automation Consulting",
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
        name: "IA & Automatisation",
        item: "https://challengerslab.com/ia",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abraham Brakha",
    jobTitle: "Directeur BU IA & Automatisation",
    worksFor: {
      "@type": "Organization",
      name: "ChallengersLab",
    },
  },
];

export default function IAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IAContent />
    </>
  );
}

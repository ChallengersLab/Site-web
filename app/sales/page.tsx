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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien de temps avant les premiers résultats ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les premiers RDV qualifiés tombent dès la semaine 3-4 en prospection externalisée. Pour l'accompagnement CRO, les premiers effets structurants sont visibles dès le premier mois. Le vrai shift se mesure à 90 jours.",
        },
      },
      {
        "@type": "Question",
        name: "C'est quoi la méthode Challenger Sale ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "C'est une méthodologie de vente B2B basée sur la recherche de Matthew Dixon. Au lieu de chercher à plaire au prospect, le commercial challenge sa vision, apporte un éclairage nouveau et pousse à l'action. C'est la méthode la plus efficace en vente complexe.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle différence avec une agence de lead gen classique ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Une agence vous envoie des leads et c'est fini. Nous, on construit votre machine : process, outils, formation, playbook. L'objectif est que vous soyez autonome. On ne crée pas de dépendance — on transfère les compétences.",
        },
      },
    ],
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

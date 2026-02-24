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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien de temps pour livrer un projet no-code ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entre 48h et 3 semaines selon la complexité. Une landing page ou un dashboard : quelques jours. Une application métier complète : 2 à 3 semaines.",
        },
      },
      {
        "@type": "Question",
        name: "C'est fiable, le no-code en production ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, à condition de bien l'architecturer. Bubble, Retool et FlutterFlow font tourner des apps en production pour des milliers d'utilisateurs.",
        },
      },
      {
        "@type": "Question",
        name: "Quels types de process peut-on automatiser ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tout ce qui est répétitif et basé sur des règles : qualification de leads, enrichissement de données, reporting, onboarding client, relances, synchronisation CRM, génération de documents.",
        },
      },
    ],
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

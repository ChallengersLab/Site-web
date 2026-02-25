import type { Metadata } from "next";
import { IAContent } from "./content";

export const metadata: Metadata = {
  title:
    "IA & Automatisation — Sites, Apps & Workflows sur mesure | ChallengersLab",
  description:
    "Automatisation, apps sur mesure, sites intelligents. On branche l'IA là où ça compte dans votre business B2B.",
  keywords: [
    "automatisation IA",
    "workflows automatisés",
    "apps sur mesure IA",
    "sites web IA",
    "Make",
    "n8n",
    "développement IA-first",
    "intelligence artificielle B2B",
    "ChallengersLab",
  ],
  alternates: { canonical: "/ia" },
  openGraph: {
    title:
      "IA & Automatisation — Sites, Apps & Workflows sur mesure | ChallengersLab",
    description:
      "Automatisation, apps sur mesure, sites intelligents. On branche l'IA là où ça compte dans votre business B2B.",
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
      "Automatisation, apps sur mesure, sites intelligents pour PME et scale-ups B2B.",
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
        name: "Vous travaillez dans quels secteurs ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Immobilier, sport, SaaS, services, SEO, e-commerce. Le secteur importe moins que le problème : si vous avez un process manuel, des données sous-exploitées ou un outil qui manque, on peut vous aider.",
        },
      },
      {
        "@type": "Question",
        name: "Combien de temps pour un projet sur mesure ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ça dépend de la complexité. Une automatisation simple : quelques jours. Une app métier complète avec intégration à l'existant : plusieurs mois. On cadre le périmètre ensemble avant de démarrer.",
        },
      },
      {
        "@type": "Question",
        name: "Quels types de process peut-on automatiser ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tout ce qui est répétitif : collecte de données, enrichissement, reporting, relances, synchronisation entre outils, génération de documents. Si vous le faites plus de 3 fois par semaine à la main, on peut probablement l'automatiser.",
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

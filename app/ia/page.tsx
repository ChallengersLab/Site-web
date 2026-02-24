import { Metadata } from "next";
import { iaConfig } from "@/lib/bu-config";
import { IAPageContent } from "./content";

export const metadata: Metadata = {
  title: iaConfig.seo.title,
  description: iaConfig.seo.description,
  keywords: iaConfig.seo.keywords,
  alternates: { canonical: "/ia" },
  openGraph: {
    title: iaConfig.seo.title,
    description: iaConfig.seo.description,
    url: "https://challengerslab.com/ia",
    siteName: "ChallengersLab",
    locale: "fr_FR",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ChallengersLab — BU IA & Automatisation",
    description: iaConfig.seo.description,
    provider: { "@id": "https://challengerslab.com/#organization" },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: [
      "Sites IA",
      "Applications no-code",
      "Workflows automatisés",
      "Intégration IA",
    ],
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
];

export default function IAPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <IAPageContent />
    </>
  );
}

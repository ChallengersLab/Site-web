import { Metadata } from "next";
import { salesConfig } from "@/lib/bu-config";
import { SalesPageContent } from "./content";

export const metadata: Metadata = {
  title: salesConfig.seo.title,
  description: salesConfig.seo.description,
  keywords: salesConfig.seo.keywords,
  alternates: { canonical: "/sales" },
  openGraph: {
    title: salesConfig.seo.title,
    description: salesConfig.seo.description,
    url: "https://challengerslab.com/sales",
    siteName: "ChallengersLab",
    locale: "fr_FR",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ChallengersLab — BU Sales",
    description: salesConfig.seo.description,
    provider: { "@id": "https://challengerslab.com/#organization" },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: [
      "Prospection externalisée",
      "Direction commerciale fractionnée",
      "Coaching Challenger Sales",
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
        name: "Sales",
        item: "https://challengerslab.com/sales",
      },
    ],
  },
];

export default function SalesPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SalesPageContent />
    </>
  );
}

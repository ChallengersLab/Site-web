import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://challengerslab.com"),
  title:
    "ChallengersLab — Agence Sales & IA pour PME B2B | Prospection, CRM, Automatisation",
  description:
    "ChallengersLab est l'agence B2B qui croise expertise commerciale et intelligence artificielle. Prospection externalisée, coaching Challenger Sales, automatisation CRM et workflows IA. +320% de pipeline en 90 jours pour les PME et scale-ups en France.",
  keywords: [
    "agence sales B2B",
    "agence IA B2B",
    "consulting commercial IA",
    "prospection externalisée B2B",
    "automatisation ventes B2B",
    "coaching Challenger Sales",
    "CRM IA PME",
    "agence growth B2B France",
    "externalisation commerciale",
    "head of sales fractionné",
    "automatisation workflows IA",
    "agence prospection B2B Paris",
    "intégration IA entreprise",
  ],
  openGraph: {
    title: "ChallengersLab — L'agence qui croise Sales & IA pour les B2B",
    description:
      "Prospection externalisée, coaching Challenger Sales, automatisation CRM et workflows IA. L'agence de référence pour les PME et scale-ups B2B en France.",
    url: "https://challengerslab.com",
    siteName: "ChallengersLab",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChallengersLab — Agence Sales & IA pour B2B",
    description:
      "L'agence qui croise expertise commerciale et IA pour les PME B2B. +320% pipeline en 90 jours.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://challengerslab.com",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://challengerslab.com/#organization",
    name: "ChallengersLab",
    url: "https://challengerslab.com",
    logo: "https://challengerslab.com/logo.png",
    description:
      "ChallengersLab est une agence B2B spécialisée dans l'intersection entre Sales et Intelligence Artificielle. Elle accompagne les PME et scale-ups B2B en France dans la restructuration de leurs ventes et l'automatisation de leurs process grâce à l'IA.",
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    knowsAbout: [
      "Prospection B2B",
      "Challenger Sales",
      "Intelligence Artificielle appliquée aux ventes",
      "Automatisation CRM",
      "Workflows IA (Make, n8n, Zapier)",
      "Head of Sales fractionné",
      "Coaching commercial B2B",
      "Prompt engineering",
      "No-code & low-code",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services ChallengersLab",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Prospection externalisée multicanal",
            description:
              "Génération de pipeline B2B via prospection multicanal (email, LinkedIn, téléphone) assistée par IA.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Coaching Challenger Sales",
            description:
              "Formation et coaching des équipes commerciales à la méthodologie Challenger Sales.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Head of Sales fractionné",
            description:
              "Direction commerciale externalisée à temps partagé pour PME et scale-ups B2B.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automatisation IA & Workflows",
            description:
              "Intégration d'IA et automatisation de process métier via Make, n8n, Zapier et applications sur mesure.",
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://challengerslab.com/#website",
    url: "https://challengerslab.com",
    name: "ChallengersLab",
    publisher: { "@id": "https://challengerslab.com/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qu'est-ce que ChallengersLab ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ChallengersLab est une agence B2B basée à Paris qui combine expertise commerciale (prospection, coaching Challenger Sales, direction commerciale fractionnée) et intelligence artificielle (automatisation, workflows IA, prompt engineering) pour aider les PME et scale-ups à générer plus de pipeline et accélérer leur croissance.",
        },
      },
      {
        "@type": "Question",
        name: "Quels résultats obtiennent les clients de ChallengersLab ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les clients de ChallengersLab constatent en moyenne +320% de croissance pipeline, un triplement du nombre de rendez-vous qualifiés, et un gain de 15h par semaine par personne grâce à l'automatisation. Les premiers résultats sont visibles en moins de 90 jours.",
        },
      },
      {
        "@type": "Question",
        name: "À qui s'adresse ChallengersLab ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ChallengersLab s'adresse aux PME et scale-ups B2B de 10 à 200 collaborateurs en France qui veulent structurer leurs ventes, adopter l'IA et automatiser leurs process pour ne pas se faire dépasser par la concurrence.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la différence entre ChallengersLab et un cabinet de conseil classique ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ChallengersLab ne vend pas du conseil à rallonge. L'agence implémente directement : configuration CRM, séquences de prospection, workflows d'automatisation, intégrations IA. Le modèle repose sur un diagnostic de 2 semaines, une implémentation de 8 semaines, puis une optimisation continue avec des résultats mesurables.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} font-body antialiased`}
      >
        <CursorGlow />
        <Navbar />
        {children}
        <GrainTexture />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://challengerslab.com"),
  title:
    "ChallengersLab — MVP SaaS, Automatisations & Premiers Clients",
  description:
    "On accompagne les fondateurs qui lancent leur SaaS à l'ère de l'IA : MVP complet, automatisations, et accompagnement jusqu'aux premiers clients payants.",
  keywords: [
    "MVP SaaS",
    "construire un SaaS",
    "automatisation process",
    "premiers clients SaaS",
    "SEO GEO",
    "agence MVP",
    "développement SaaS",
    "automatisation IA",
    "site web optimisé",
    "acquisition clients",
    "workflow automatisé",
    "fondateur SaaS",
    "lancer un SaaS",
  ],
  openGraph: {
    title: "ChallengersLab — MVP SaaS, Automatisations & Premiers Clients",
    description:
      "On accompagne les fondateurs qui lancent leur SaaS à l'ère de l'IA : MVP complet, automatisations, et accompagnement jusqu'aux premiers clients payants.",
    url: "https://challengerslab.com",
    siteName: "ChallengersLab",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChallengersLab — MVP SaaS, Automatisations & Premiers Clients",
    description:
      "On accompagne les fondateurs qui lancent leur SaaS à l'ère de l'IA : MVP complet, automatisations, et accompagnement jusqu'aux premiers clients payants.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://challengerslab.com",
    languages: {
      "fr-FR": "https://challengerslab.com",
    },
  },
  category: "technology",
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
      "ChallengersLab accompagne les fondateurs qui lancent leur SaaS à l'ère de l'IA. On construit votre MVP complet (app + site web optimisé SEO/GEO), on automatise vos process, et on vous accompagne jusqu'aux premiers clients payants.",
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
      "Développement MVP SaaS",
      "Automatisation de process",
      "Intelligence Artificielle",
      "SEO & GEO",
      "Workflows IA (Make, n8n, Zapier)",
      "Acquisition premiers clients",
      "Next.js, SvelteKit, Supabase",
      "Prompt engineering",
      "Stratégie d'acquisition SaaS",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services ChallengersLab",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Build — MVP SaaS",
            description:
              "Construction de MVP complets : applications web, sites optimisés SEO/GEO, dashboards et intégrations IA.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automate — Automatisations",
            description:
              "Workflows automatisés (Make, n8n, Zapier), CRM, automatisation end-to-end et intégration IA dans vos process.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Grow — Premiers clients",
            description:
              "SEO/GEO, stratégie d'acquisition, coaching premières ventes et accompagnement jusqu'aux premiers clients payants.",
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
          text: "ChallengersLab accompagne les fondateurs qui lancent leur SaaS à l'ère de l'IA. On construit votre MVP complet (app + site web optimisé SEO/GEO), on automatise vos process, et on vous accompagne jusqu'aux premiers clients payants.",
        },
      },
      {
        "@type": "Question",
        name: "Que comprend l'offre ChallengersLab ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'offre couvre 3 piliers : Build (MVP app, site web optimisé, intégration IA), Automate (workflows Make/n8n/Zapier, CRM, automatisation end-to-end), et Grow (SEO/GEO, stratégie d'acquisition, coaching premières ventes).",
        },
      },
      {
        "@type": "Question",
        name: "À qui s'adresse ChallengersLab ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ChallengersLab s'adresse aux fondateurs qui ont une idée de SaaS et veulent la concrétiser rapidement avec l'IA, sans recruter un CTO. Du MVP aux premiers clients payants en moins de 90 jours.",
        },
      },
      {
        "@type": "Question",
        name: "En combien de temps obtient-on des résultats ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre méthode en 3 étapes (Cadrage, Construction, Premiers clients) est conçue pour livrer un MVP fonctionnel et atteindre les premiers clients payants en moins de 90 jours.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment lancer son SaaS avec l'IA en 90 jours",
    description:
      "La méthode ChallengersLab en 3 étapes pour passer de l'idée au premier euro : cadrage, construction, premiers clients.",
    totalTime: "P90D",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Cadrage",
        text: "Validation de l'idée, définition du MVP juste, mapping des process à automatiser. Livrable : scope MVP + roadmap.",
        url: "https://challengerslab.com/#method",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Construction",
        text: "Build de l'app, du site optimisé SEO/GEO, et des workflows automatisés. Propulsé par l'IA, testé avec de vrais utilisateurs. Livrable : MVP + site + automatisations.",
        url: "https://challengerslab.com/#method",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Premiers clients",
        text: "SEO/GEO en place, stratégie d'acquisition lancée, accompagnement hands-on sur les premières ventes. Livrable : revenue + clients payants.",
        url: "https://challengerslab.com/#method",
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
        <meta name="theme-color" content="#0D0D0D" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${inter.variable} font-body antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent-start focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
        >
          Aller au contenu principal
        </a>
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        {children}
        <BackToTop />
        <GrainTexture />
      </body>
    </html>
  );
}

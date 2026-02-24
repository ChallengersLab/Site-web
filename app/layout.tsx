import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { GrainTexture } from "@/components/effects/GrainTexture";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://challengerslab.com"),
  title: "ChallengersLab | Vos concurrents utilisent déjà l'IA. Et vous ?",
  description:
    "On restructure vos ventes et vos process avec l'IA. Pas de slides, pas de théorie. Des résultats mesurables en 90 jours.",
  keywords: [
    "ESN",
    "performance commerciale",
    "IA ventes",
    "automatisation",
    "cold call",
    "directeur commercial externalisé",
    "CRM",
    "no-code",
  ],
  openGraph: {
    title: "ChallengersLab | Sales × AI pour PME & Scale-ups B2B",
    description:
      "On restructure vos ventes et vos process avec l'IA. Résultats mesurables en 90 jours.",
    url: "https://challengerslab.com",
    siteName: "ChallengersLab",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChallengersLab",
    description: "Vos concurrents utilisent déjà l'IA. Et vous ?",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ChallengersLab",
  url: "https://challengerslab.com",
  description:
    "Agence AI & Sales pour les PME et scale-ups B2B qui refusent le statu quo.",
  foundingDate: "2024",
  areaServed: "FR",
  priceRange: "€€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  serviceType: [
    "Consulting AI",
    "Sales Consulting",
    "Business Automation",
    "No-Code Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} font-body antialiased`}
      >
        <Navbar />
        {children}
        <GrainTexture />
      </body>
    </html>
  );
}

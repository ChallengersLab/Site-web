import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GrainTexture } from "@/components/effects/GrainTexture";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Challengerslab | L'avenir de la performance commerciale est IA",
  description:
    "ESN spécialisée en performance commerciale et IA. Cold Call, DIR CO externalisé, Sites IA, Apps No-Code. Scale x3 en 30 jours.",
  keywords: [
    "ESN",
    "performance commerciale",
    "cold call",
    "directeur commercial externalisé",
    "site web IA",
    "no-code",
  ],
  openGraph: {
    title: "Challengerslab | ESN Performance Commerciale & IA",
    description: "Scale x3 en 30 jours avec l'IA",
    url: "https://challengerslab.com",
    siteName: "Challengerslab",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Challengerslab",
    description: "L'avenir de la performance commerciale est IA",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <GrainTexture />
      </body>
    </html>
  );
}

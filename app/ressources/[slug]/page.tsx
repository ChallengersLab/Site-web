import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRessource, getAllSlugs } from "@/lib/ressources";
import { ArticleLayout } from "@/components/sections/ArticleLayout";
import { Footer } from "@/components/layout/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ressource = getRessource(slug);
  if (!ressource) return {};

  return {
    title: ressource.metaTitle,
    description: ressource.metaDescription,
    openGraph: {
      title: ressource.metaTitle,
      description: ressource.metaDescription,
      url: `https://challengerslab.com/ressources/${ressource.slug}`,
      type: "article",
      publishedTime: ressource.publishedAt,
      modifiedTime: ressource.updatedAt || ressource.publishedAt,
      authors: ["ChallengersLab"],
      siteName: "ChallengersLab",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: ressource.metaTitle,
      description: ressource.metaDescription,
    },
    alternates: {
      canonical: `https://challengerslab.com/ressources/${ressource.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const ressource = getRessource(slug);
  if (!ressource || ressource.soon) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ressource.title,
    description: ressource.metaDescription,
    datePublished: ressource.publishedAt,
    dateModified: ressource.updatedAt || ressource.publishedAt,
    author: {
      "@type": "Organization",
      "@id": "https://challengerslab.com/#organization",
      name: "ChallengersLab",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://challengerslab.com/#organization",
      name: "ChallengersLab",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://challengerslab.com/ressources/${ressource.slug}`,
    },
    url: `https://challengerslab.com/ressources/${ressource.slug}`,
    inLanguage: "fr-FR",
  };

  const faqJsonLd = ressource.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: ressource.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  const breadcrumbJsonLd = {
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
        name: "Ressources",
        item: "https://challengerslab.com/ressources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ressource.title,
        item: `https://challengerslab.com/ressources/${ressource.slug}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ArticleLayout ressource={ressource} />
      <Footer />
    </main>
  );
}

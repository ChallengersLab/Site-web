import type { MetadataRoute } from "next";
import { getPublishedRessources } from "@/lib/ressources";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://challengerslab.com";

  const articles = getPublishedRessources();

  const articleUrls = articles.map((r) => ({
    url: `${baseUrl}/ressources/${r.slug}`,
    lastModified: new Date(r.updatedAt || r.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sales`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ressources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...articleUrls,
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date("2026-02-24"),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date("2026-02-24"),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}

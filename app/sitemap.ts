import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/ressources";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://challengerslab.com";

  const articleUrls = getAllSlugs().map((slug) => ({
    url: `${baseUrl}/ressources/${slug}`,
    lastModified: new Date(),
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
      url: `${baseUrl}/ressources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...articleUrls,
  ];
}

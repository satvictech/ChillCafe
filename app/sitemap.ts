import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/visit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/room`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/story`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}

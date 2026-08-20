import type { MetadataRoute } from "next";
import { DOMAINS } from "@/data/domains";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gces.net.in"; // keep in sync with layout.tsx SITE_URL
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tech-stack`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/achievements`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/recruit`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/domains`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
  const domainRoutes: MetadataRoute.Sitemap = DOMAINS.map((d) => ({
    url: `${base}/domain/${d.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...domainRoutes];
}

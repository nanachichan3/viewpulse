import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // NOTE: /use-cases/* routes removed — they do not exist in the codebase.
  // Re-add them here once the pages are built.
  const routes = [""];


  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "weekly",
    priority: 1,
    lastModified: new Date()
  }));
}

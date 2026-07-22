import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/why-uae", priority: 0.9 },
  { path: "/features", priority: 0.9 },
  { path: "/security", priority: 0.7 },
  { path: "/roadmap", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static marketing site — one build stamp for every page is accurate.
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}

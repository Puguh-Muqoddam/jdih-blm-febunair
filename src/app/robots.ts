import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

// =============================================================================
// JDIH BLM FEB UNAIR - Robots.txt Resmi untuk Mesin Pencari (Googlebot)
// File konvensi App Router: /robots.txt
// =============================================================================

// Daftar bot AI scrapers & LLM crawlers yang dilarang merayapi portal
const BLOCKED_AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "Diffbot",
  "FacebookBot",
  "Meta-ExternalAgent",
  "Google-Extended",
  "PerplexityBot",
  "Amazonbot",
  "Applebot-Extended",
  "Omgilibot",
  "Omgili",
  "ImagesiftBot",
  "YouBot",
  "DataForSeoBot",
];

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  const aiRules = BLOCKED_AI_BOTS.map((bot) => ({
    userAgent: bot,
    disallow: "/",
  }));

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/pencarian*"],
      },
      ...aiRules,
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/pencarian*"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Google-Favicon",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/pencarian*"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

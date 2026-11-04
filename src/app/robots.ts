import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

// =============================================================================
// JDIH BLM FEB UNAIR - Robots.txt Resmi untuk Mesin Pencari (Googlebot)
// File konvensi App Router: /robots.txt
// =============================================================================

// Bot scraper agresif / commercial bulk scrapers yang dilarang merayapi portal
const BLOCKED_SCRAPER_BOTS = [
  "Bytespider",
  "CCBot",
  "DataForSeoBot",
  "ImagesiftBot",
  "Omgilibot",
  "Omgili",
];

// Bot mesin pencari & bot AI penemuan (AI Discovery / Chatbot Citations) yang DIIZINKAN
const ALLOWED_SEARCH_AND_AI_BOTS = [
  "Googlebot",
  "Google-Extended", // Pelatihan Gemini & Google AI Overviews
  "Bingbot",
  "Applebot",
  "Applebot-Extended", // Siri & Spotlight AI Search
  "GPTBot", // OpenAI crawler
  "ChatGPT-User", // Penjelajahan web real-time pengguna ChatGPT
  "ClaudeBot", // Anthropic Claude crawler
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity AI search & citation engine
];

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  const scraperDisallows = BLOCKED_SCRAPER_BOTS.map((bot) => ({
    userAgent: bot,
    disallow: "/",
  }));

  const allowedBotRules = ALLOWED_SEARCH_AND_AI_BOTS.map((bot) => ({
    userAgent: bot,
    allow: "/",
    disallow: ["/admin", "/admin/", "/pencarian*"],
  }));

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/pencarian*"],
      },
      ...scraperDisallows,
      ...allowedBotRules,
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Google-Favicon",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

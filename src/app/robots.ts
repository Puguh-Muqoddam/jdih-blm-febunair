import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

// =============================================================================
// JDIH BLM FEB UNAIR - Robots.txt Resmi untuk Mesin Pencari (Googlebot)
// File konvensi App Router: /robots.txt
// =============================================================================

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/"],
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
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

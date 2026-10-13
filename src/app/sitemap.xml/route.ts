import { NextResponse } from "next/server";
import { LEGAL_DOCUMENTS } from "@/lib/data/mock-documents";

// =============================================================================
// JDIH BLM FEB UNAIR - Sitemap XML Dinamis
// Route: GET /sitemap.xml
// Referensi: IMPLEMENTATION_PLAN.md §13 (SEO & Mesin Pencari)
// =============================================================================

export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://jdih-blm.febunair.ac.id";
  const now = new Date().toISOString();

  const staticPages = [
    { path: "", changefreq: "daily", priority: "1.0" },
    { path: "/produk-hukum", changefreq: "daily", priority: "0.9" },
    { path: "/pencarian", changefreq: "weekly", priority: "0.8" },
    { path: "/permohonan", changefreq: "monthly", priority: "0.8" },
    { path: "/statistik", changefreq: "weekly", priority: "0.7" },
    { path: "/panduan-penomoran", changefreq: "monthly", priority: "0.7" },
    { path: "/tentang", changefreq: "monthly", priority: "0.6" },
    // Jenis
    { path: "/produk-hukum/jenis/undang-undang", changefreq: "weekly", priority: "0.8" },
    { path: "/produk-hukum/jenis/ketetapan-blm", changefreq: "weekly", priority: "0.8" },
    { path: "/produk-hukum/jenis/surat-keputusan", changefreq: "weekly", priority: "0.8" },
    { path: "/produk-hukum/jenis/lembaran-parlemen", changefreq: "weekly", priority: "0.8" },
    // Topik
    { path: "/topik/pemira", changefreq: "weekly", priority: "0.7" },
    { path: "/topik/orientasi-studi", changefreq: "weekly", priority: "0.7" },
    { path: "/topik/lppm-sektor", changefreq: "weekly", priority: "0.7" },
    { path: "/topik/keanggotaan-blm", changefreq: "weekly", priority: "0.7" },
    { path: "/topik/pengawasan-bem", changefreq: "weekly", priority: "0.7" },
  ];

  const staticUrlsXml = staticPages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  const documentUrlsXml = LEGAL_DOCUMENTS.map((doc) => {
    const loc = `${baseUrl}/produk-hukum/${doc.typeSlug}/${doc.year}/${doc.sequenceNumber}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date(doc.enactedDate).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrlsXml}
${documentUrlsXml}
</urlset>`;

  return new NextResponse(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

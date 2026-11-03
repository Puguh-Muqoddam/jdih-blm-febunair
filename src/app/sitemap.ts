import type { MetadataRoute } from "next";
import { LEGAL_DOCUMENTS } from "@/lib/data/mock-documents";
import { getBaseUrl, getDocumentUrl } from "@/lib/seo";

// =============================================================================
// JDIH BLM FEB UNAIR - Sitemap XML Resmi untuk Mesin Pencari (Google Search)
// File konvensi App Router: /sitemap.xml
// =============================================================================

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const now = new Date();

  // 1. Halaman Publik Utama
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/produk-hukum`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/pencarian`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/panduan-penomoran`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/tentang`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/statistik`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/permohonan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Kategori Produk Hukum Resmi
  const categoryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/produk-hukum/jenis/undang-undang`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/produk-hukum/jenis/ketetapan-blm`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/produk-hukum/jenis/surat-keputusan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/produk-hukum/jenis/lembaran-parlemen`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // 3. Topik Regulasi Unggulan
  const topicRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/topik/pemira`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/topik/orientasi-studi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/topik/lppm-sektor`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/topik/keanggotaan-blm`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/topik/pengawasan-bem`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  // 4. Seluruh 70 Dokumen Produk Hukum Faktual
  const documentRoutes: MetadataRoute.Sitemap = LEGAL_DOCUMENTS.map((doc) => {
    let date = now;
    if (doc.enactedDate) {
      const parsed = new Date(doc.enactedDate);
      if (!isNaN(parsed.getTime())) {
        date = parsed;
      }
    }
    return {
      url: getDocumentUrl(doc.type, doc.typeSlug, doc.year, doc.sequenceNumber),
      lastModified: date,
      changeFrequency: "monthly",
      priority: 0.9,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...topicRoutes, ...documentRoutes];
}

import { NextResponse } from "next/server";
import { LEGAL_DOCUMENTS } from "@/lib/data/mock-documents";

// =============================================================================
// JDIH BLM FEB UNAIR - RSS 2.0 Feed Produk Hukum Resmi
// Route: GET /feed.xml
// Referensi: IMPLEMENTATION_PLAN.md §13 (SEO & Sindikasi)
// =============================================================================

export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://jdih-blm.febunair.ac.id";

  const sortedDocs = [...LEGAL_DOCUMENTS].sort(
    (a, b) => new Date(b.enactedDate).getTime() - new Date(a.enactedDate).getTime()
  );

  const itemsXml = sortedDocs
    .map((doc) => {
      const docUrl = `${baseUrl}/produk-hukum/${doc.typeSlug}/${doc.year}/${doc.sequenceNumber}`;
      const pubDate = new Date(doc.enactedDate).toUTCString();

      return `    <item>
      <title><![CDATA[${doc.officialNumber} - ${doc.title}]]></title>
      <link>${docUrl}</link>
      <guid isPermaLink="true">${docUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${doc.summary}]]></description>
      <category>${doc.typeName}</category>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>JDIH BLM FEB UNAIR - Produk Hukum Resmi</title>
    <link>${baseUrl}</link>
    <description>Portal Jaringan Dokumentasi dan Informasi Hukum Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { getDb, isDbConfigured } from "@/lib/db";
import { LEGAL_DOCUMENTS } from "@/lib/data/mock-documents";
import { getFileFromR2, generateR2Key, sanitizeDownloadFileName } from "@/lib/r2";
import { getAdminSession } from "@/lib/auth";

// =============================================================================
// JDIH BLM FEB UNAIR - Endpoint Pratinjau Inline PDF
// Route: GET /dokumen/[slug]/lihat
// Referensi: IMPLEMENTATION_PLAN.md §8 (Pratinjau Browser & Pembatasan Draf)
// =============================================================================

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  let docData: {
    id: string;
    slug: string;
    type: string;
    sequenceNumber: number;
    year: number;
    title: string;
    publicationState: string;
    r2Key?: string;
  } | null = null;

  // 1. Ambil data dokumen dari DB atau mock dataset
  if (await isDbConfigured()) {
    try {
      const db = await getDb();
      const doc = await db.legalDocument.findUnique({
        where: { slug },
        include: { type: true, currentFile: true },
      });

      if (doc) {
        docData = {
          id: doc.id,
          slug: doc.slug,
          type: doc.type.code,
          sequenceNumber: doc.sequenceNumber,
          year: doc.year,
          title: doc.title,
          publicationState: doc.publicationState,
          r2Key: doc.currentFile?.r2Key,
        };
      }
    } catch {
      // Fallback ke mock jika query DB gagal
    }
  }

  if (!docData) {
    const mock = LEGAL_DOCUMENTS.find((d) => d.slug === slug);
    if (mock) {
      docData = {
        id: mock.id,
        slug: mock.slug,
        type: mock.type,
        sequenceNumber: mock.sequenceNumber,
        year: mock.year,
        title: mock.title,
        publicationState: mock.publicationState,
      };
    }
  }

  // 2. Jika dokumen tidak ditemukan -> 404
  if (!docData) {
    return new NextResponse("Dokumen tidak ditemukan dalam arsip resmi.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // 3. Keamanan Publikasi: Dokumen DRAFT dilarang diakses publik (404)
  if (docData.publicationState === "DRAFT") {
    const session = await getAdminSession();
    if (!session) {
      return new NextResponse("Dokumen tidak ditemukan dalam arsip resmi.", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  }

  // 4. Tentukan nama berkas tampilan
  const downloadFileName = sanitizeDownloadFileName(
    docData.type,
    docData.sequenceNumber,
    docData.year,
    docData.title
  );

  const r2Key =
    docData.r2Key ||
    generateR2Key(docData.type, docData.year, docData.slug, 1);

  // 5. Coba ambil berkas dari Cloudflare R2
  const r2Object = await getFileFromR2(r2Key);

  // Jika berkas fisik ada di R2, alirkan secara inline
  if (r2Object && r2Object.body) {
    // Naikkan counter view jika DB aktif (non-blocking)
    if (await isDbConfigured()) {
      getDb()
        .then((db) =>
          db.legalDocument.update({
            where: { id: docData!.id },
            data: { viewCount: { increment: 1 } },
          })
        )
        .catch(() => {});
    }

    return new NextResponse(r2Object.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${downloadFileName}"`,
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
        ETag: r2Object.httpEtag || `"${docData.slug}"`,
      },
    });
  }

  const mockDoc = LEGAL_DOCUMENTS.find((d) => d.slug === slug);

  // Jika r2Key berupa URL Google Drive atau mock memiliki driveViewUrl, arahkan langsung ke Google Drive Resmi
  const driveTargetUrl =
    (docData.r2Key && docData.r2Key.startsWith("https://drive.google.com")
      ? docData.r2Key
      : undefined) ||
    mockDoc?.driveViewUrl ||
    mockDoc?.drivePreviewUrl ||
    mockDoc?.driveFolderUrl;

  if (driveTargetUrl) {
    return NextResponse.redirect(driveTargetUrl, 302);
  }

  // Fallback dev/sandbox: Hasilkan representasi naskah resmi jika belum diunggah ke R2 maupun Drive
  const fallbackPdf = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R >> endobj
4 0 obj << /Length 120 >> stream
BT
/F1 12 Tf
72 750 Td
(JDIH BLM FEB UNAIR - Pratinjau Naskah Digital) Tj
0 -20 Td
(${docData.slug.toUpperCase()}) Tj
ET
endstream endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000210 00000 n 
trailer << /Root 1 0 R /Size 5 >>
startxref
380
%%EOF`;

  return new NextResponse(fallbackPdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${downloadFileName}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

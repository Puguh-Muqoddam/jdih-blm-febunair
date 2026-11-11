import { cache } from "react";
import { getDb, isDbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import {
  LEGAL_DOCUMENTS,
  type LegalDocumentItem,
} from "@/lib/data/mock-documents";

// =============================================================================
// JDIH BLM FEB UNAIR - Helper Data Publik Terpusat (DB + Fallback Faktual)
// Memastikan dokumen berstatus DRAFT tidak pernah bocor ke halaman publik,
// sitemap.xml, maupun feed.xml.
// =============================================================================

const MONTH_NAMES_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatDateIndonesian(date: Date, precision: string = "DAY"): string {
  const d = new Date(date);
  const monthName = MONTH_NAMES_ID[d.getUTCMonth()] || "Januari";
  const year = d.getUTCFullYear();
  if (precision === "MONTH") {
    return `${monthName} ${year}`;
  }
  return `${d.getUTCDate()} ${monthName} ${year}`;
}

function sortByNewestFirst(docs: LegalDocumentItem[]): LegalDocumentItem[] {
  return [...docs].sort((a, b) => {
    const dateDiff =
      new Date(b.enactedDate).getTime() - new Date(a.enactedDate).getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.sequenceNumber - a.sequenceNumber;
  });
}

/**
 * Mengonversi baris LegalDocument dari Prisma menjadi struktur LegalDocumentItem.
 */
function mapPrismaToDocumentItem(row: any): LegalDocumentItem {
  const mockMatch = LEGAL_DOCUMENTS.find((m) => m.slug === row.slug);
  const enactedIso =
    row.enactedDate instanceof Date
      ? row.enactedDate.toISOString().slice(0, 10)
      : String(row.enactedDate).slice(0, 10);

  return {
    id: row.id,
    slug: row.slug,
    type: (row.type?.code || mockMatch?.type || "SK") as LegalDocumentItem["type"],
    typeName: row.type?.name || mockMatch?.typeName || "Surat Keputusan",
    typeSlug: row.type?.slug || mockMatch?.typeSlug || "surat-keputusan",
    year: row.year,
    sequenceNumber: row.sequenceNumber,
    officialNumber: row.officialNumber,
    legacyNumber: row.legacyNumber || undefined,
    nature: row.nature || undefined,
    abbreviationCode: row.abbreviationCode || undefined,
    title: row.title,
    summary: row.summary || mockMatch?.summary || "",
    forum: row.forum?.name || mockMatch?.forum || "Sidang Pleno BLM",
    enactedDate: enactedIso,
    enactedDateFormatted:
      mockMatch?.enactedDateFormatted ||
      formatDateIndonesian(new Date(row.enactedDate), row.enactedDatePrecision),
    romanMonth: row.romanMonth,
    placeOfEnactment: row.placeOfEnactment || "Surabaya",
    legalStatus: row.legalStatus,
    publicationState: row.publicationState,
    tags:
      Array.isArray(row.tags) && row.tags.length > 0
        ? row.tags.map((t: any) => t.tag?.name || t).filter(Boolean)
        : mockMatch?.tags || [],
    viewCount: typeof row.viewCount === "number" ? row.viewCount : mockMatch?.viewCount || 0,
    downloadCount:
      typeof row.downloadCount === "number"
        ? row.downloadCount
        : mockMatch?.downloadCount || 0,
    pdfFileName: row.currentFile?.fileName || mockMatch?.pdfFileName,
    driveFileId: mockMatch?.driveFileId,
    drivePreviewUrl: mockMatch?.drivePreviewUrl,
    driveViewUrl: mockMatch?.driveViewUrl,
    driveDownloadUrl: mockMatch?.driveDownloadUrl,
    supabaseStorageUrl:
      mockMatch?.supabaseStorageUrl ||
      `https://sfobevvfofvckkhshzlx.supabase.co/storage/v1/object/public/produk-hukum/${row.slug}.pdf`,
    attachments: mockMatch?.attachments,
  };
}

/**
 * Mengambil seluruh dokumen yang berstatus publik (PUBLISHED atau ARCHIVED),
 * diurutkan dari tanggal publikasi / agenda terbaru ke terlama.
 * Dokumen berstatus DRAFT disaring secara ketat agar tidak pernah tampil di publik.
 */
export const publicVisibleDocuments = cache(
  async (): Promise<LegalDocumentItem[]> => {
    if (await isDbConfigured()) {
      try {
        const db = await getDb();
        const rows = await db.legalDocument.findMany({
          where: {
            publicationState: {
              in: ["PUBLISHED", "ARCHIVED"],
            },
          },
          include: {
            type: true,
            forum: true,
            currentFile: true,
            tags: {
              include: { tag: true },
            },
          },
          orderBy: [{ enactedDate: "desc" }, { sequenceNumber: "desc" }],
        });

        if (rows.length > 0) {
          return rows.map(mapPrismaToDocumentItem);
        }
      } catch {
        // Fallback ke dataset faktual jika query DB mengalami kendala
      }
    }

    return sortByNewestFirst(
      LEGAL_DOCUMENTS.filter((doc) => doc.publicationState !== "DRAFT")
    );
  }
);

/**
 * Mengambil seluruh dokumen untuk keperluan panel Admin (termasuk DRAFT).
 * Wajib sesi admin: jangan hanya mengandalkan pengecekan di admin/layout.tsx,
 * karena layout tidak selalu dirender ulang pada request navigasi (RSC).
 */
export const getAllAdminDocuments = cache(
  async (): Promise<LegalDocumentItem[]> => {
    await requireAdmin();
    if (await isDbConfigured()) {
      try {
        const db = await getDb();
        const rows = await db.legalDocument.findMany({
          include: {
            type: true,
            forum: true,
            currentFile: true,
            tags: {
              include: { tag: true },
            },
          },
          orderBy: [{ enactedDate: "desc" }, { sequenceNumber: "desc" }],
        });

        if (rows.length > 0) {
          return rows.map(mapPrismaToDocumentItem);
        }
      } catch {
        // Fallback ke dataset faktual
      }
    }

    return sortByNewestFirst(LEGAL_DOCUMENTS);
  }
);

/**
 * Mengambil satu dokumen publik berdasarkan parameter rute [jenis]/[tahun]/[nomor].
 * Mengembalikan null jika dokumen tidak ditemukan atau masih berstatus DRAFT.
 */
export async function getPublicDocumentByRoute(
  typeSlug: string,
  year: number,
  sequenceNumber: number
): Promise<LegalDocumentItem | null> {
  const docs = await publicVisibleDocuments();
  const found = docs.find(
    (d) =>
      d.typeSlug.toLowerCase() === typeSlug.toLowerCase() &&
      d.year === year &&
      d.sequenceNumber === sequenceNumber
  );
  if (!found || found.publicationState === "DRAFT") {
    return null;
  }
  return found;
}

/**
 * Pencarian dokumen di sisi server (menggunakan Postgres Full-Text Search tsvector
 * jika DB terhubung, atau filter server-side pada daftar dokumen publik).
 */
export async function searchPublicDocumentsServer(params: {
  query?: string;
  type?: string;
  status?: string;
}): Promise<LegalDocumentItem[]> {
  const q = (params.query || "").trim();
  const selectedType = params.type || "all";
  const selectedStatus = params.status || "all";

  // Jika ada query teks dan DB aktif, gunakan full-text search PostgreSQL (searchVector)
  if (q && (await isDbConfigured())) {
    try {
      const db = await getDb();
      const matchedIds = await db.$queryRaw<{ id: string }[]>`
        SELECT "id"
        FROM "LegalDocument"
        WHERE "publicationState" IN ('PUBLISHED', 'ARCHIVED')
          AND (
            "searchVector" @@ websearch_to_tsquery('simple', unaccent(${q}))
            OR "officialNumber" ILIKE ${`%${q}%`}
            OR "legacyNumber" ILIKE ${`%${q}%`}
            OR "title" ILIKE ${`%${q}%`}
          )
        ORDER BY
          ts_rank("searchVector", websearch_to_tsquery('simple', unaccent(${q}))) DESC,
          "enactedDate" DESC
        LIMIT 100
      `;

      if (matchedIds.length > 0) {
        const allPublic = await publicVisibleDocuments();
        const idSet = new Set(matchedIds.map((r) => r.id));
        return allPublic.filter((doc) => {
          if (!idSet.has(doc.id)) return false;
          if (
            selectedType !== "all" &&
            doc.typeSlug !== selectedType &&
            doc.type !== selectedType
          ) {
            return false;
          }
          if (selectedStatus !== "all" && doc.legalStatus !== selectedStatus) {
            return false;
          }
          return true;
        });
      }
    } catch {
      // Fallback ke filter aplikasi jika ekstensi unaccent belum diaktifkan
    }
  }

  const allDocs = await publicVisibleDocuments();
  return allDocs.filter((doc) => {
    if (q) {
      const lower = q.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(lower);
      const matchNumber = doc.officialNumber.toLowerCase().includes(lower);
      const matchSummary = doc.summary.toLowerCase().includes(lower);
      const matchLegacy = doc.legacyNumber?.toLowerCase().includes(lower) ?? false;
      const matchCode = doc.abbreviationCode?.toLowerCase().includes(lower) ?? false;
      const matchForum = doc.forum.toLowerCase().includes(lower);
      const matchTags = doc.tags.some((t) => t.toLowerCase().includes(lower));

      if (
        !matchTitle &&
        !matchNumber &&
        !matchSummary &&
        !matchLegacy &&
        !matchCode &&
        !matchForum &&
        !matchTags
      ) {
        return false;
      }
    }

    if (
      selectedType !== "all" &&
      doc.typeSlug !== selectedType &&
      doc.type !== selectedType
    ) {
      return false;
    }

    if (selectedStatus !== "all" && doc.legalStatus !== selectedStatus) {
      return false;
    }

    return true;
  });
}

/**
 * Meringkas objek LegalDocumentItem sebelum dikirim ke Client Component
 * untuk memperkecil ukuran payload serialisasi RSC / bundle klien.
 */
export function toClientDocumentList(
  docs: LegalDocumentItem[]
): LegalDocumentItem[] {
  return docs.map((d) => ({
    id: d.id,
    slug: d.slug,
    type: d.type,
    typeName: d.typeName,
    typeSlug: d.typeSlug,
    year: d.year,
    sequenceNumber: d.sequenceNumber,
    officialNumber: d.officialNumber,
    legacyNumber: d.legacyNumber,
    nature: d.nature,
    abbreviationCode: d.abbreviationCode,
    title: d.title,
    summary: d.summary,
    forum: d.forum,
    enactedDate: d.enactedDate,
    enactedDateFormatted: d.enactedDateFormatted,
    romanMonth: d.romanMonth,
    placeOfEnactment: d.placeOfEnactment,
    legalStatus: d.legalStatus,
    publicationState: d.publicationState,
    tags: d.tags,
    viewCount: d.viewCount,
    downloadCount: d.downloadCount,
  }));
}

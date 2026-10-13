"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSuperAdmin } from "@/lib/auth";
import { getDb, isDbConfigured } from "@/lib/db";
import {
  formatOfficialNumber,
  generateDocumentSlug,
  toRoman,
  LegalDocumentType,
  SkNatureCode,
} from "@/lib/numbering";

// =============================================================================
// JDIH BLM FEB UNAIR - Server Actions Produk Hukum
// Referensi: IMPLEMENTATION_PLAN.md §5, §6.2 (Concurrency Lock), §12 (Otorisasi)
//
// Aturan Keamanan & Integritas:
// 1. Setiap mutasi wajib melewati requireSuperAdmin() (puguhmuqoddam151@gmail.com).
// 2. Pembuatan nomor baru dibungkus transaksi PostgreSQL `SELECT ... FOR UPDATE`
//    pada tabel NumberCounter guna mencegah race condition / nomor ganda.
// 3. Setiap perubahan status dan terbitan dicatat pada AuditLog (append-only).
// =============================================================================

export const createDocumentSchema = z.object({
  type: z.enum(["UU", "TAP", "SK", "LP"]),
  sequenceNumber: z.number().int().min(1).max(9999),
  year: z.number().int().min(2000).max(2100),
  month: z.number().int().min(1).max(12),
  nature: z.enum(["A_INTERNAL", "B_EXTERNAL"]).optional().nullable(),
  abbreviationCode: z.string().max(80).optional().nullable(),
  title: z.string().min(5).max(500),
  summary: z.string().max(2000).optional().nullable(),
  forumName: z.string().max(120).optional().nullable(),
  enactedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD"),
  placeOfEnactment: z.string().max(100).default("Surabaya"),
  legalStatus: z.enum(["BERLAKU", "DIUBAH", "DICABUT", "TIDAK_BERLAKU"]).default("BERLAKU"),
  publicationState: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("PUBLISHED"),
  tags: z.array(z.string()).default([]),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;

export const updateDocumentStatusSchema = z.object({
  id: z.string().min(1),
  legalStatus: z.enum(["BERLAKU", "DIUBAH", "DICABUT", "TIDAK_BERLAKU"]),
  note: z.string().max(500).optional(),
});

export const updatePublicationStateSchema = z.object({
  id: z.string().min(1),
  publicationState: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]),
  note: z.string().max(500).optional(),
});

/**
 * Server Action: Menyimpan produk hukum baru dengan Concurrency Lock PostgreSQL
 */
export async function createDocumentAction(input: CreateDocumentInput) {
  // 1. Otorisasi Ketat: Hanya Super Admin yang diizinkan
  const session = await requireSuperAdmin();

  // 2. Validasi Skema Zod
  const data = createDocumentSchema.parse(input);

  // Jika SK, nature dan abbreviationCode wajib ada
  if (data.type === "SK") {
    if (!data.nature) {
      throw new Error("Sifat SK (Internal A / Eksternal B) wajib dipilih untuk jenis SK.");
    }
    if (!data.abbreviationCode || data.abbreviationCode.trim() === "") {
      throw new Error("Kode singkatan SK wajib diisi untuk jenis SK.");
    }
  }

  // 3. Bentuk format kanonikal nomor resmi & slug
  const natureCode: SkNatureCode | undefined = data.nature === "A_INTERNAL" ? "A" : data.nature === "B_EXTERNAL" ? "B" : undefined;
  const officialNumber = formatOfficialNumber(data.type, {
    seq: data.sequenceNumber,
    month: data.month,
    year: data.year,
    nature: natureCode,
    code: data.abbreviationCode,
  });

  const slug = generateDocumentSlug(data.type, data.year, data.sequenceNumber);
  const romanMonth = toRoman(data.month);

  // 4. Jika koneksi database belum tersedia (misal lingkungan sandbox/test tanpa PG), return data valid
  if (!(await isDbConfigured())) {
    return {
      success: true,
      mode: "dry-run",
      document: {
        id: `mock-${slug}`,
        slug,
        officialNumber,
        title: data.title,
        publicationState: data.publicationState,
        legalStatus: data.legalStatus,
        createdBy: session.email,
      },
    };
  }

  const db = await getDb();

  // 5. Transaksi Concurrency Lock PostgreSQL: SELECT ... FOR UPDATE pada NumberCounter
  const createdDocument = await db.$transaction(async (tx) => {
    // A. Cari DocumentType berdasarkan kode (UU, TAP, SK, LP)
    const docTypeRecord = await tx.documentType.findUnique({
      where: { code: data.type },
    });

    if (!docTypeRecord) {
      throw new Error(`Jenis dokumen '${data.type}' belum terdaftar dalam master DocumentType.`);
    }

    // B. Concurrency Lock: Kunci baris counter nomor untuk jenis & tahun terkait
    // Menggunakan raw SQL SELECT ... FOR UPDATE
    await tx.$executeRaw`
      INSERT INTO "NumberCounter" ("typeId", "year", "lastNumber", "updatedAt")
      VALUES (${docTypeRecord.id}, ${data.year}, 0, NOW())
      ON CONFLICT ("typeId", "year") DO NOTHING;
    `;

    const counterRow = await tx.$queryRaw<Array<{ lastNumber: number }>>`
      SELECT "lastNumber" FROM "NumberCounter"
      WHERE "typeId" = ${docTypeRecord.id} AND "year" = ${data.year}
      FOR UPDATE;
    `;

    const currentCounter = counterRow[0]?.lastNumber ?? 0;

    // C. Pastikan nomor urut belum pernah digunakan pada kombinasi unik (typeId, year, sequenceNumber)
    const existingDoc = await tx.legalDocument.findUnique({
      where: {
        typeId_year_sequenceNumber: {
          typeId: docTypeRecord.id,
          year: data.year,
          sequenceNumber: data.sequenceNumber,
        },
      },
    });

    if (existingDoc) {
      throw new Error(
        `Nomor urut ${data.sequenceNumber} untuk jenis ${data.type} tahun ${data.year} sudah digunakan oleh: ${existingDoc.officialNumber}.`
      );
    }

    // D. Hubungkan atau buat Forum jika ada
    let forumId: string | null = null;
    if (data.forumName && data.forumName.trim()) {
      const forumSlug = data.forumName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const forum = await tx.forum.upsert({
        where: { name: data.forumName.trim() },
        create: { name: data.forumName.trim(), slug: forumSlug },
        update: {},
      });
      forumId = forum.id;
    }

    // E. Simpan LegalDocument
    const newDoc = await tx.legalDocument.create({
      data: {
        slug,
        typeId: docTypeRecord.id,
        year: data.year,
        sequenceNumber: data.sequenceNumber,
        officialNumber,
        abbreviationCode: data.abbreviationCode || null,
        nature: data.nature || null,
        title: data.title,
        summary: data.summary || null,
        forumId,
        enactedDate: new Date(data.enactedDate),
        romanMonth,
        placeOfEnactment: data.placeOfEnactment,
        legalStatus: data.legalStatus,
        publicationState: data.publicationState,
        publishedAt: data.publicationState === "PUBLISHED" ? new Date() : null,
        createdBy: session.email,
        updatedBy: session.email,
      },
    });

    // F. Hubungkan Tag
    if (data.tags && data.tags.length > 0) {
      for (const tagName of data.tags) {
        const cleanTag = tagName.trim();
        if (!cleanTag) continue;
        const tagSlug = cleanTag.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const tag = await tx.tag.upsert({
          where: { slug: tagSlug },
          create: { name: cleanTag, slug: tagSlug },
          update: {},
        });
        await tx.documentTag.create({
          data: {
            documentId: newDoc.id,
            tagId: tag.id,
          },
        });
      }
    }

    // G. Perbarui counter nomor urut tertinggi jika nomor ini lebih besar
    if (data.sequenceNumber > currentCounter) {
      await tx.numberCounter.update({
        where: {
          typeId_year: {
            typeId: docTypeRecord.id,
            year: data.year,
          },
        },
        data: {
          lastNumber: data.sequenceNumber,
        },
      });
    }

    // H. Catat ke AuditLog (Append-only)
    await tx.auditLog.create({
      data: {
        actorEmail: session.email,
        action: "CREATE",
        entity: "LegalDocument",
        entityId: newDoc.id,
        diff: {
          officialNumber: newDoc.officialNumber,
          title: newDoc.title,
          status: newDoc.legalStatus,
          publication: newDoc.publicationState,
        },
      },
    });

    return newDoc;
  });

  // Revalidasi cache halaman publik
  revalidatePath("/");
  revalidatePath("/produk-hukum");
  revalidatePath(`/produk-hukum/${createdDocument.slug}`);
  revalidatePath("/admin/produk-hukum");
  revalidatePath("/admin");

  return {
    success: true,
    document: createdDocument,
  };
}

/**
 * Server Action: Mengubah status keberlakuan hukum produk hukum
 */
export async function updateDocumentStatusAction(input: z.infer<typeof updateDocumentStatusSchema>) {
  const session = await requireSuperAdmin();
  const { id, legalStatus, note } = updateDocumentStatusSchema.parse(input);

  if (!(await isDbConfigured())) {
    return { success: true, mode: "dry-run", id, legalStatus };
  }

  const db = await getDb();

  const updated = await db.$transaction(async (tx) => {
    const existing = await tx.legalDocument.findUnique({ where: { id } });
    if (!existing) {
      throw new Error("Dokumen hukum tidak ditemukan.");
    }

    const doc = await tx.legalDocument.update({
      where: { id },
      data: {
        legalStatus,
        notes: note ? `${existing.notes ? existing.notes + "\n" : ""}${note}` : existing.notes,
        updatedBy: session.email,
      },
    });

    await tx.auditLog.create({
      data: {
        actorEmail: session.email,
        action: "STATUS_CHANGE",
        entity: "LegalDocument",
        entityId: id,
        diff: {
          oldStatus: existing.legalStatus,
          newStatus: legalStatus,
          note,
        },
      },
    });

    return doc;
  });

  revalidatePath("/produk-hukum");
  revalidatePath(`/produk-hukum/${updated.slug}`);
  revalidatePath("/admin/produk-hukum");

  return { success: true, document: updated };
}

/**
 * Server Action: Mengubah status publikasi (PUBLISHED, DRAFT, ARCHIVED)
 */
export async function updatePublicationStateAction(input: z.infer<typeof updatePublicationStateSchema>) {
  const session = await requireSuperAdmin();
  const { id, publicationState, note } = updatePublicationStateSchema.parse(input);

  if (!(await isDbConfigured())) {
    return { success: true, mode: "dry-run", id, publicationState };
  }

  const db = await getDb();

  const updated = await db.$transaction(async (tx) => {
    const existing = await tx.legalDocument.findUnique({ where: { id } });
    if (!existing) {
      throw new Error("Dokumen hukum tidak ditemukan.");
    }

    const doc = await tx.legalDocument.update({
      where: { id },
      data: {
        publicationState,
        publishedAt: publicationState === "PUBLISHED" ? existing.publishedAt || new Date() : existing.publishedAt,
        archivedAt: publicationState === "ARCHIVED" ? new Date() : null,
        updatedBy: session.email,
      },
    });

    await tx.auditLog.create({
      data: {
        actorEmail: session.email,
        action: publicationState === "PUBLISHED" ? "PUBLISH" : publicationState === "ARCHIVED" ? "ARCHIVE" : "UNPUBLISH",
        entity: "LegalDocument",
        entityId: id,
        diff: {
          oldState: existing.publicationState,
          newState: publicationState,
          note,
        },
      },
    });

    return doc;
  });

  revalidatePath("/");
  revalidatePath("/produk-hukum");
  revalidatePath(`/produk-hukum/${updated.slug}`);
  revalidatePath("/admin/produk-hukum");

  return { success: true, document: updated };
}

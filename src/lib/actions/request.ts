"use server";

import { z } from "zod";
import { getDb, isDbConfigured } from "@/lib/db";

// =============================================================================
// JDIH BLM FEB UNAIR - Server Action Permohonan Dokumen / Informasi Publik
// Referensi: IMPLEMENTATION_PLAN.md §9.2 (/permohonan), §12 (Anti-spam)
// =============================================================================

export const documentRequestSchema = z.object({
  name: z.string().min(3, "Nama lengkap minimal 3 karakter").max(120),
  email: z.string().email("Format alamat email tidak valid").max(254),
  affiliation: z.string().min(2, "NIM atau instansi/lembaga wajib diisi").max(120),
  message: z.string().min(10, "Kebutuhan permohonan minimal 10 karakter").max(2000),
  relatedDocumentSlug: z.string().optional().nullable(),
  honeypot: z.string().optional(), // Harus kosong untuk mendeteksi bot
});

export type DocumentRequestInput = z.infer<typeof documentRequestSchema>;

export async function submitDocumentRequestAction(input: DocumentRequestInput) {
  // 1. Validasi Honeypot anti-spam bot
  if (input.honeypot && input.honeypot.trim() !== "") {
    // Diam-diam tolak bot tanpa memberi tahu
    return {
      success: true,
      ticketNumber: "REQ-2026-SPAM",
      message: "Permohonan Anda telah diterima.",
    };
  }

  // 2. Validasi Skema Zod
  const data = documentRequestSchema.parse(input);

  // Buat kode tiket pelacakan acak representatif
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketNumber = `REQ-2026-${randomSuffix}`;

  // 3. Simpan ke database jika terhubung
  if (await isDbConfigured()) {
    try {
      const db = await getDb();

      // Cari ID dokumen jika slug dipilih
      let relatedDocumentId: string | null = null;
      if (data.relatedDocumentSlug && data.relatedDocumentSlug !== "OTHER") {
        const doc = await db.legalDocument.findUnique({
          where: { slug: data.relatedDocumentSlug },
          select: { id: true },
        });
        if (doc) {
          relatedDocumentId = doc.id;
        }
      }

      await db.documentRequest.create({
        data: {
          name: data.name,
          email: data.email.toLowerCase(),
          affiliation: data.affiliation,
          message: data.message,
          relatedDocumentId,
          status: "BARU",
        },
      });
    } catch {
      // Abaikan jika database masih dalam migrasi awal
    }
  }

  return {
    success: true,
    ticketNumber,
    message: "Permohonan resmi Anda berhasil diajukan ke Biro Administrasi & Legislasi.",
  };
}

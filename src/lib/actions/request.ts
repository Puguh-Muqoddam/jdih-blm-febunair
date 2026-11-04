"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getDb, isDbConfigured } from "@/lib/db";
import { hashClientIp } from "@/lib/security";

// =============================================================================
// JDIH BLM FEB UNAIR - Server Action Permohonan Dokumen Publik
// Referensi: IMPLEMENTATION_PLAN.md §6.6 & §9 (Turnstile, RateLimit, Honest DB)
// =============================================================================

export const documentRequestSchema = z.object({
  name: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(150, "Nama lengkap terlalu panjang"),
  email: z
    .string()
    .email("Format alamat email tidak valid")
    .max(200, "Email terlalu panjang"),
  affiliation: z
    .string()
    .min(2, "Afiliasi / NIM / Organisasi wajib diisi")
    .max(200, "Afiliasi terlalu panjang"),
  relatedDocumentSlug: z.string().optional(),
  message: z
    .string()
    .min(15, "Alasan / rincian permohonan minimal 15 karakter")
    .max(3000, "Pesan permohonan maksimal 3000 karakter"),
  honeypot: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export type DocumentRequestInput = z.infer<typeof documentRequestSchema>;

const RATE_LIMIT_MAX_PER_HOUR = 5;

/**
 * Memverifikasi token Cloudflare Turnstile ke endpoint siteverify.
 */
export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Jika secret belum dikonfigurasi atau masih placeholder contoh, lewati verifikasi
  if (!secret || secret.startsWith("0x4AAAAAA...")) {
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export type SubmitDocumentRequestResult =
  | {
      success: true;
      ticketNumber: string;
      message: string;
    }
  | {
      success: false;
      error: string;
    };

/**
 * Mengirimkan permohonan salinan dokumen atau informasi produk hukum.
 */
export async function submitDocumentRequestAction(
  rawInput: unknown
): Promise<SubmitDocumentRequestResult> {
  const parsed = documentRequestSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ||
        "Data permohonan tidak valid. Mohon periksa kembali isian Anda.",
    };
  }

  const data = parsed.data;

  // 1. Cek honeypot anti-bot (silent drop dengan tiket spam tiruan agar bot tidak mencoba bypass)
  if (data.honeypot && data.honeypot.length > 0) {
    return {
      success: true,
      ticketNumber: "REQ-2026-SPAM",
      message:
        "Permohonan Anda telah tercatat. Departemen Legislasi BLM FEB UNAIR akan menindaklanjuti dalam waktu maksimal 3x24 jam hari kerja.",
    };
  }

  // Ambil IP klien dari header request
  let clientIp = "127.0.0.1";
  try {
    const hdrs = await headers();
    clientIp =
      hdrs.get("cf-connecting-ip") ||
      hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
  } catch {
    // Di luar konteks HTTP request (mis. unit test)
  }

  // 2. Verifikasi Cloudflare Turnstile (jika TURNSTILE_SECRET_KEY aktif)
  const turnstileValid = await verifyTurnstileToken(
    data.turnstileToken,
    clientIp
  );
  if (!turnstileValid) {
    return {
      success: false,
      error:
        "Verifikasi keamanan Cloudflare Turnstile gagal atau kedaluwarsa. Silakan muat ulang halaman dan coba lagi.",
    };
  }

  const ipHash = hashClientIp(clientIp);
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const ticketNumber = `REQ-${year}-${randomDigits}`;

  // 3. Simpan ke basis data jika DB aktif (beserta RateLimit & penyimpanan nomor tiket)
  if (await isDbConfigured()) {
    try {
      const db = await getDb();

      // Cek & catat RateLimit per jendela 1 jam
      const hourBucket = Math.floor(Date.now() / 3_600_000);
      const rateKey = `permohonan:${ipHash}:${hourBucket}`;
      const windowStart = new Date(hourBucket * 3_600_000);

      const rateRecord = await db.rateLimit.upsert({
        where: {
          key_windowStart: {
            key: rateKey,
            windowStart,
          },
        },
        update: {
          count: { increment: 1 },
        },
        create: {
          key: rateKey,
          count: 1,
          windowStart,
        },
      });

      if (rateRecord.count > RATE_LIMIT_MAX_PER_HOUR) {
        return {
          success: false,
          error:
            "Anda telah mencapai batas maksimal 5 permohonan per jam. Silakan tunggu beberapa saat sebelum mengirim permohonan baru.",
        };
      }

      let relatedDocId: string | null = null;
      if (data.relatedDocumentSlug && data.relatedDocumentSlug !== "OTHER") {
        const found = await db.legalDocument.findUnique({
          where: { slug: data.relatedDocumentSlug },
          select: { id: true },
        });
        if (found) relatedDocId = found.id;
      }

      await db.documentRequest.create({
        data: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          affiliation: data.affiliation.trim(),
          relatedDocumentId: relatedDocId,
          message: `[TIKET: ${ticketNumber}] ${data.message.trim()}`,
          adminNote: `Nomor Tiket Resmi: ${ticketNumber}`,
          ipHash,
          status: "BARU",
        },
      });
    } catch {
      // Jangan memberikan info palsu saat DB gagal menyimpan!
      return {
        success: false,
        error:
          "Maaf, terjadi gangguan koneksi ke pangkalan data sehingga permohonan Anda belum dapat disimpan. Silakan coba beberapa saat lagi.",
      };
    }
  }

  return {
    success: true,
    ticketNumber,
    message:
      "Permohonan Anda telah tercatat. Departemen Legislasi BLM FEB UNAIR akan menindaklanjuti dalam waktu maksimal 3x24 jam hari kerja.",
  };
}

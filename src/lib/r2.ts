import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// =============================================================================
// JDIH BLM FEB UNAIR - Modul Cloudflare R2 Bucket Binding (Private Storage)
// Referensi: IMPLEMENTATION_PLAN.md §8 (Kunci R2, Versioning, Streaming)
//
// Aturan:
// 1. Kunci R2 terstandar: `produk-hukum/{jenis}/{tahun}/{slug}/v{version}.pdf`
// 2. Berkas PDF privat, tidak diekspos melalui public URL R2.
// 3. Hanya dilayani melalui Worker setelah pengecekan hak akses dan status publikasi.
// =============================================================================

export interface R2FileMetadata {
  contentType: string;
  size: number;
  etag: string;
  uploadedAt: Date;
}

/**
 * Mengambil instance Cloudflare R2Bucket dari binding worker (DOCS_BUCKET).
 */
export async function getDocsBucket(): Promise<any | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const cfEnv = env as { DOCS_BUCKET?: any };
    return cfEnv?.DOCS_BUCKET || null;
  } catch {
    // Di luar runtime Worker (mis. unit test lokal atau next dev standar)
    return null;
  }
}

/**
 * Menghasilkan kunci R2 kanonikal sesuai spesifikasi §8.
 * Format: `produk-hukum/{jenis}/{tahun}/{slug}/v{version}.pdf`
 */
export function generateR2Key(
  typeSlugOrCode: string,
  year: number,
  slug: string,
  version: number = 1
): string {
  const cleanType = typeSlugOrCode.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `produk-hukum/${cleanType}/${year}/${slug}/v${version}.pdf`;
}

/**
 * Menghasilkan nama file unduhan yang bersih dan representatif untuk pengguna.
 * Contoh: `TAP-BLM-002-2026-Kebijakan-Orientasi-Studi.pdf`
 */
export function sanitizeDownloadFileName(
  type: string,
  seq: number,
  year: number,
  title: string
): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);

  return `${type}-${seq}-${year}-${cleanTitle}.pdf`;
}

/**
 * Mengambil objek berkas dari Cloudflare R2
 */
export async function getFileFromR2(key: string) {
  const bucket = await getDocsBucket();
  if (!bucket) return null;

  try {
    const object = await bucket.get(key);
    return object;
  } catch {
    return null;
  }
}

/**
 * Menyimpan berkas ke Cloudflare R2
 */
export async function putFileToR2(
  key: string,
  data: ReadableStream | ArrayBuffer | Uint8Array,
  options?: {
    contentType?: string;
    sha256?: string;
  }
) {
  const bucket = await getDocsBucket();
  if (!bucket) {
    throw new Error("Cloudflare R2 DOCS_BUCKET tidak terhubung pada runtime saat ini.");
  }

  return await bucket.put(key, data, {
    httpMetadata: {
      contentType: options?.contentType || "application/pdf",
    },
    customMetadata: {
      sha256: options?.sha256 || "",
    },
  });
}

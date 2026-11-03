import { padSequence } from "./numbering";

/**
 * Mengambil URL basis kanonikal portal JDIH.
 * Membaca SITE_URL, NEXT_PUBLIC_SITE_URL, atau fallback ke Cloudflare Workers domain resmi.
 */
export function getBaseUrl(): string {
  const url =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://jdih-blm-febunair.puguhmuqoddam151.workers.dev";
  return url.replace(/\/+$/, "");
}

/**
 * Menghasilkan URL kanonikal lengkap untuk detail produk hukum resmi.
 * Format nomor sesuai standar legislatif (SK 4 digit, UU 2 digit, TAP/LP 3 digit).
 */
export function getDocumentUrl(
  type: string,
  typeSlug: string,
  year: number,
  sequenceNumber: number
): string {
  const padding = type === "SK" ? 4 : type === "UU" ? 2 : 3;
  const paddedSeq = padSequence(sequenceNumber, padding);
  return `${getBaseUrl()}/produk-hukum/${typeSlug}/${year}/${paddedSeq}`;
}

/**
 * Menghasilkan path relatif kanonikal untuk detail produk hukum.
 */
export function getDocumentPath(
  type: string,
  typeSlug: string,
  year: number,
  sequenceNumber: number
): string {
  const padding = type === "SK" ? 4 : type === "UU" ? 2 : 3;
  const paddedSeq = padSequence(sequenceNumber, padding);
  return `/produk-hukum/${typeSlug}/${year}/${paddedSeq}`;
}

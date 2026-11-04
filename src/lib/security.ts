import { createHash } from "crypto";

/**
 * Menghasilkan hash SHA-256 satu arah dari alamat IP pengunjung + salt rahasia.
 * Digunakan untuk rate limiting tanpa menyimpan PII (IP asli) secara gamblang di database.
 */
export function hashClientIp(ip: string, salt?: string): string {
  const effectiveSalt =
    salt ||
    process.env.IP_HASH_SALT ||
    "jdih_blm_feb_unair_parlemen_cakrasena_2026_salt";
  return createHash("sha256")
    .update(`${ip.trim()}:${effectiveSalt}`)
    .digest("hex");
}

import "server-only";
import { cache } from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// =============================================================================
// Klien Database Prisma 7 untuk Cloudflare Workers & Supabase via Hyperdrive
// Pola arsitektur: brave-franklin (React cache + maxUses: 1)
// =============================================================================

/**
 * Membuat instance PrismaClient baru dengan pg adapter.
 * maxUses: 1 memastikan koneksi I/O tidak bocor antar-request di Worker.
 */
export function createPrismaClient(connectionString: string): PrismaClient {
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString, maxUses: 1 }),
  });
}

/**
 * Menyelesaikan connection string dari binding Hyperdrive atau environment variable fallback.
 */
export async function resolveConnectionString(): Promise<string | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const cfEnv = env as { HYPERDRIVE?: { connectionString?: string } };
    if (cfEnv?.HYPERDRIVE?.connectionString) {
      return cfEnv.HYPERDRIVE.connectionString;
    }
  } catch {
    // Berjalan di luar lingkungan Cloudflare Workers (mis. next dev, next build, vitest)
  }

  return process.env.DATABASE_URL || process.env.DIRECT_URL || null;
}

/**
 * Mengambil instance PrismaClient yang di-cache per-request via React cache().
 */
export const getDb = cache(async (): Promise<PrismaClient> => {
  const connectionString = await resolveConnectionString();
  if (!connectionString) {
    throw new Error(
      "Koneksi basis data tidak ditemukan. Pastikan binding HYPERDRIVE atau DATABASE_URL telah dikonfigurasi."
    );
  }
  return createPrismaClient(connectionString);
});

/**
 * Mengecek apakah konfigurasi database sudah tersedia (untuk fallback fixture jika env belum disetel).
 */
export async function isDbConfigured(): Promise<boolean> {
  const connectionString = await resolveConnectionString();
  return connectionString !== null;
}

export type { PrismaClient };
export * from "@/generated/prisma/client";

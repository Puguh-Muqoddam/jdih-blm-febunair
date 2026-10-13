import "dotenv/config";
import { defineConfig } from "prisma/config";

// CLI (migrate/seed) memakai DIRECT_URL. Untuk Supabase gratis gunakan Session Pooler
// port 5432 (direct connection hanya IPv6). Runtime Worker memakai Hyperdrive, bukan ini.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Kosong saat generate/build tanpa DB; migrate akan gagal jelas bila belum diisi.
    url: process.env.DIRECT_URL ?? "",
  },
});

# Panduan Penerbitan & Operasional (Deployment Guide)
## JDIH BLM FEB UNAIR (Jaringan Dokumentasi dan Informasi Hukum)

> **Arsitektur:** Next.js 16.3.8 App Router + Tailwind CSS v4 + Cloudflare Workers (`@opennextjs/cloudflare`) + Cloudflare R2 (`DOCS_BUCKET`) + Supabase Postgres via Cloudflare Hyperdrive (`HYPERDRIVE`).

---

### 1. Prasyarat Infrastruktur

1. **Akun Cloudflare (Free Tier):**
   - Mendukung Workers, R2 Bucket, dan Hyperdrive.
   - Login lokal melalui terminal:
     ```bash
     npx wrangler login
     ```

2. **Basis Data Supabase Postgres (Free Tier):**
   - Wilayah yang disarankan: `ap-southeast-1` (Singapura) untuk latensi terendah dari Indonesia.
   - Ambil connection string dari dashboard Supabase: **Project Settings > Database > Connection string (URI) > Session pooler (Port 5432)**.

---

### 2. Penyiapan Layanan Cloudflare (Sekali Saja)

#### A. Buat Cloudflare R2 Bucket untuk Berkas Naskah PDF
Jalankan di terminal:
```bash
npx wrangler r2 bucket create jdih-blm-docs
```

#### B. Buat Cloudflare Hyperdrive untuk Koneksi Cepat Supabase
Jalankan di terminal (ganti nilai dengan connection string Supabase Anda):
```bash
npx wrangler hyperdrive create jdih-hyperdrive --connection-string="postgres://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
```
Setelah dibuat, salin ID Hyperdrive yang dihasilkan (misal `7a1b...`), lalu buka file [`wrangler.jsonc`](file:///c:/Users/ThinkPad/OneDrive/Dokumen/AG/JDIH%20BLM/wrangler.jsonc) dan perbarui:
```jsonc
"hyperdrive": [
  { "binding": "HYPERDRIVE", "id": "<ID_HYPERDRIVE_DARI_TERMINAL>" }
]
```

---

### 3. Eksekusi Migrasi & Seeding 49 Produk Hukum

Sebelum deploy, inisialisasi tabel dan masukkan seluruh 49 dokumen register ke Supabase:

1. **Jalankan Skrip DDL:**
   Jalankan file SQL [`prisma/manual/00-setup-database-baru.sql`](file:///c:/Users/ThinkPad/OneDrive/Dokumen/AG/JDIH%20BLM/prisma/manual/00-setup-database-baru.sql) pada menu **SQL Editor** di Dashboard Supabase. Skrip ini secara otomatis memasang:
   - Constraint tahun 2000–2100 & nomor urut positif.
   - Trigger unaccent full-text search (`tsvector`).
   - Trigger append-only pada tabel `AuditLog`.
   - Kebijakan Zero-Trust RLS (`REVOKE ALL` dari `anon`/`authenticated`).

2. **Jalankan Seeding 49 Data Resmi 2026:**
   Pastikan variabel `DATABASE_URL` telah disetel di file `.env`, lalu jalankan:
   ```bash
   npx tsx prisma/seed/import-register.ts
   ```
   *Output akan mengonfirmasi 49 produk hukum resmi (2 UU, 3 TAP, 39 SK, 5 LP) + 3 reservasi (BIRAD 171-173) berhasil di-seed.*

---

### 4. Konfigurasi Rahasia (Secrets) di Cloudflare Workers

Tambahkan variabel rahasia ke Cloudflare Workers agar server dapat memvalidasi login admin:
```bash
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put SUPER_ADMIN_EMAILS
```
*(Saat diminta nilai `SUPER_ADMIN_EMAILS`, masukkan: `puguhmuqoddam151@gmail.com`)*.

---

### 5. Kompilasi & Deploy ke Cloudflare Workers

Jalankan perintah build dan deploy:
```bash
npm run deploy
```

Atau secara bertahap:
```bash
# 1. Jalankan unit test
npm test

# 2. Periksa tipe TypeScript
npm run typecheck

# 3. Kompilasi untuk Cloudflare Workers
npx opennextjs-cloudflare build

# 4. Deploy langsung ke Cloudflare
npx wrangler deploy
```

Setelah proses selesai, Cloudflare memberikan URL publik portal hukum:
```
https://jdih-blm-febunair.puguhmuqoddam151.workers.dev
```
- **Status Produksi:** Aktif & Online (HTTP 200 OK)
- **Deployment Version ID Terkini:** `691df4c6-64e1-4035-8d2a-f65c77ed0f85`
- **Fitur Baru Terpasang:** Aset logo resmi BLM & Cakrasena, struktur komisi A/B/C, filosofi lambang, favicon, dan sekretariat GKM Lt. 1 FEB UNAIR

---

### 6. Verifikasi Pascadeploy (Smoke Test)

1. **Portal Publik:**
   - Kunjungi `/` (Beranda dengan hero search & counter statistik).
   - Kunjungi `/produk-hukum` (Katalog 49 produk hukum dengan filter Grid/Tabel).
   - Kunjungi `/produk-hukum/undang-undang/2026/01` (Detail UU No. 01 PEMIRA dengan sitasi resmi).
   - Kunjungi `/permohonan` (Uji form permohonan informasi pengunjung).
   - Kunjungi `/feed.xml` dan `/sitemap.xml` (Verifikasi format XML).
2. **Panel Admin:**
   - Kunjungi `/admin/login` dan masuk menggunakan email `puguhmuqoddam151@gmail.com`.
   - Buka `/admin` (Dasbor KPI dan peringatan rekonsiliasi data §10).
   - Buka `/admin/produk-hukum/baru` (Uji mesin penomoran otomatis 4-digit live preview).

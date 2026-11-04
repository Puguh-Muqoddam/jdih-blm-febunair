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

#### B. Cloudflare Hyperdrive untuk Akselerasi Basis Data Supabase
Hyperdrive resmi telah dibuat dan aktif terhubung ke Supabase PostgreSQL:
- **Nama Hyperdrive:** `jdih-postgres`
- **ID Konfigurasi:** `80dfc667eaa84b4dae9b979ab999ce9e`
- **Binding di [`wrangler.jsonc`](file:///c:/Users/ThinkPad/OneDrive/Dokumen/AG/JDIH%20BLM/wrangler.jsonc):**
```jsonc
"hyperdrive": [
  {
    "binding": "HYPERDRIVE",
    "id": "80dfc667eaa84b4dae9b979ab999ce9e",
    "localConnectionString": "postgresql://postgres:legisbisasemua@db.sfobevvfofvckkhshzlx.supabase.co:5432/postgres"
  }
]
```
Jika perlu membuat ulang di kemudian hari:
```bash
npx wrangler hyperdrive create jdih-postgres --connection-string="postgresql://postgres:PASSWORD@db.sfobevvfofvckkhshzlx.supabase.co:5432/postgres"
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

Tambahkan variabel rahasia ke Cloudflare Workers agar server dapat memvalidasi login admin, koneksi Supabase, dan keamanan rate limiting:
```bash
# URL & Kunci API Supabase Resmi (Project sfobevvfofvckkhshzlx)
npx wrangler secret put NEXT_PUBLIC_SUPABASE_URL
npx wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# Daftar Email Otorisasi Super Admin
npx wrangler secret put SUPER_ADMIN_EMAILS
# (Masukkan: puguhmuqoddam151@gmail.com)

# Koneksi Database PostgreSQL Supabase
npx wrangler secret put DATABASE_URL

# Salt Keamanan IP Hashing untuk Anti-Spam Permohonan
npx wrangler secret put IP_HASH_SALT

# Cloudflare Turnstile CAPTCHA (Site & Secret Key)
npx wrangler secret put TURNSTILE_SECRET_KEY
```

---

### 5. Kompilasi & Deploy ke Cloudflare Workers

Jalankan perintah build dan deploy (gunakan awalan DNS IPv4 pada Windows):
```powershell
$env:NODE_OPTIONS="--dns-result-order=ipv4first"
npm run deploy
```

Atau secara bertahap:
```powershell
# 1. Jalankan unit test (52 pengujian)
npm test

# 2. Periksa tipe TypeScript
npm run typecheck

# 3. Lakukan linting kode
npm run lint

# 4. Kompilasi untuk Cloudflare Workers
npx opennextjs-cloudflare build

# 5. Deploy langsung ke Cloudflare
npx wrangler deploy
```

Setelah proses selesai, situs aktif pada domain kustom kanonikal:
```
https://jdih-blm-febunair.my.id
```
*(URL pekerja Cloudflare alternatif: `https://jdih-blm-febunair.puguhmuqoddam151.workers.dev`)*.
- **Status Produksi:** Aktif & Online (HTTP 200 OK)
- **Deployment Version ID Terkini:** `d988caea-d2c1-4fad-980c-8d3bb983740e`
- **Fitur Baru Terpasang:** Akselerasi Hyperdrive Postgres, Edge firewall pemblokir scraper liar, proteksi login berbasis verifikasi email `email_confirmed_at`, form permohonan rate-limited + Turnstile, dan kompatibilitas sitasi AI (ChatGPT, Claude, Perplexity, Gemini).

---

### 6. Verifikasi Pascadeploy (Smoke Test)

1. **Portal Publik:**
   - Kunjungi `/` (Beranda dengan hero search & counter statistik).
   - Kunjungi `/produk-hukum` (Katalog 49 produk hukum dengan filter Grid/Tabel).
   - Kunjungi `/produk-hukum/undang-undang/2026/01` (Detail UU No. 01 PEMIRA dengan sitasi resmi).
   - Kunjungi `/permohonan` (Uji form permohonan informasi pengunjung).
   - Kunjungi `/feed.xml` dan `/sitemap.xml` (Verifikasi format XML).
2. **Panel Admin:**
   - Kunjungi `/admin/login` dan masuk menggunakan akun pengurus resmi (`puguhmuqoddam151@gmail.com`).
   - Buka `/admin` (Dasbor KPI dan status dokumen live).
   - Buka `/admin/produk-hukum/baru` (Uji mesin penomoran otomatis 4-digit live preview dan penerbitan produk hukum baru).

---

### 7. Kebijakan Perayapan Web & Bot AI (Crawlers Policy)

Portal JDIH BLM FEB UNAIR mengadopsi kebijakan visibilitas hukum modern:
- **DIIZINKAN (Allow):**
  - **Mesin Pencari:** Googlebot, Googlebot-Image, Google-Favicon, Bingbot.
  - **Pencarian AI & Apple:** Applebot, Applebot-Extended.
  - **AI Chatbot & Discovery:** GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended (Gemini & AI Overviews).
  - *Catatan:* Seluruh bot dibatasi dari URL dinamis `/pencarian*` agar tidak membombardir database dengan kata kunci acak.
- **DIBLOKIR DI EDGE (403 Forbidden):**
  - Bot scraper komersial non-pencari yang rakus bandwidth dan tidak memberikan manfaat sitasi: `Bytespider` (ByteDance/TikTok), `CCBot`, `DataForSeoBot`, `ImagesiftBot`, `Omgilibot`. Ditolak dalam <0.1 ms di level Edge Middleware tanpa membebani kuota Worker.

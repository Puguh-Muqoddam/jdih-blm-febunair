# Panduan Konfigurasi, Struktur Database, & Tata Kelola Data Faktual Supabase
## JDIH Badan Legislatif Mahasiswa (BLM) FEB Universitas Airlangga — Parlemen Cakrasena 2026

Dokumen ini merupakan panduan teknis dan operasional resmi untuk mengelola basis data **Supabase PostgreSQL**, autentikasi pengurus **Departemen Legislasi**, serta aturan penyimpanan berkas (**Storage**) pada portal **JDIH BLM FEB UNAIR**. Panduan ini disusun agar seluruh isi situs web benar-benar bersumber dari **data faktual resmi parlemen** (bukan data rekayasa/generatif) serta mematuhi standar keamanan dan integritas hukum organisasi.

---

## 1. Identitas & Kredensial Project Supabase

Berikut adalah rincian konfigurasi resmi project Supabase yang terhubung dengan portal JDIH BLM FEB UNAIR:

| Parameter | Nilai Faktual Project | Keterangan Penggunaan |
| :--- | :--- | :--- |
| **Project Reference ID** | `sfobevvfofvckkhshzlx` | ID unik tenant Supabase |
| **Project URL** | `https://sfobevvfofvckkhshzlx.supabase.co` | Endpoint REST & Auth API (`NEXT_PUBLIC_SUPABASE_URL`) |
| **Publishable / Anon Key** | `sb_publishable_KV66XFWixhFydC9c89J3dA_DXny5uw6` | Kunci publik klien untuk sesi login (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) |
| **Direct Connection URI** | `postgresql://postgres:[YOUR-PASSWORD]@db.sfobevvfofvckkhshzlx.supabase.co:5432/postgres` | Koneksi langsung ke host DB utama (IPv6). Gunakan untuk migrasi skema langsung. |
| **Session Pooler URI (Disarankan)** | `postgresql://postgres.sfobevvfofvckkhshzlx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres` | Koneksi via Supavisor Session Pooler (IPv4 & IPv6). **Wajib dipakai pada Windows/ISP lokal & Cloudflare Hyperdrive** jika jaringan tidak mendukung IPv6. |

> **Catatan Penting Password Database:** Ganti bagian `[YOUR-PASSWORD]` dengan kata sandi database PostgreSQL yang Anda buat saat menginisialisasi project Supabase (dapat diatur ulang melalui menu **Project Settings > Database > Database password** di Dashboard Supabase). Jika kata sandi mengandung karakter khusus (seperti `@`, `#`, `:`, `/`), pastikan ditulis dalam format *URL-encoded* (misal `@` menjadi `%40`).

---

## 2. Konfigurasi Variabel Lingkungan (`Environment Variables`)

Agar aplikasi lokal (`npm run dev`), skrip pengisian data (*seeding*), dan server produksi (**Cloudflare Workers**) terhubung ke Supabase secara faktual, atur variabel berikut pada file `.env` di root project:

```env
# ==============================================================================
# JDIH BLM FEB UNAIR - KONFIGURASI FAKTUAL SUPABASE (.env)
# ==============================================================================

# 1. Koneksi Database PostgreSQL
# Gunakan Direct URI (jika jaringan mendukung IPv6) atau Session Pooler URI (kompatibel IPv4):
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.sfobevvfofvckkhshzlx.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.sfobevvfofvckkhshzlx.supabase.co:5432/postgres"

# Koneksi lokal untuk simulasi Cloudflare Hyperdrive:
CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgresql://postgres:[YOUR-PASSWORD]@db.sfobevvfofvckkhshzlx.supabase.co:5432/postgres"

# 2. Supabase API & Autentikasi
NEXT_PUBLIC_SUPABASE_URL="https://sfobevvfofvckkhshzlx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_KV66XFWixhFydC9c89J3dA_DXny5uw6"

# Opsional: Diambil dari Project Settings > API > service_role secret (JANGAN diekspos ke publik)
SUPABASE_SERVICE_ROLE_KEY="<ISI_DENGAN_SECRET_SERVICE_ROLE_KEY_JIKA_DIPERLUKAN>"

# 3. Otorisasi Pengurus Departemen Legislasi (Daftar Putih Email Admin)
SUPER_ADMIN_EMAILS="puguhmuqoddam151@gmail.com"
ADMIN_EMAILS="puguhmuqoddam151@gmail.com"

# 4. Konfigurasi Situs & Keamanan Anti-Spam
NEXT_PUBLIC_SITE_URL="https://jdih-blm-febunair.puguhmuqoddam151.workers.dev"
IP_HASH_SALT="jdih_blm_feb_unair_parlemen_cakrasena_2026_salt_resmi"
```

### Menyetel Variabel di Produksi (Cloudflare Workers)
Jalankan perintah berikut di terminal untuk menanamkan kredensial Supabase ke worker produksi:
```powershell
$env:NODE_OPTIONS="--dns-result-order=ipv4first"
npx wrangler secret put NEXT_PUBLIC_SUPABASE_URL
# Masukkan: https://sfobevvfofvckkhshzlx.supabase.co

npx wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
# Masukkan: sb_publishable_KV66XFWixhFydC9c89J3dA_DXny5uw6

npx wrangler secret put DATABASE_URL
# Masukkan: postgresql://postgres:[YOUR-PASSWORD]@db.sfobevvfofvckkhshzlx.supabase.co:5432/postgres

npx wrangler secret put SUPER_ADMIN_EMAILS
# Masukkan: puguhmuqoddam151@gmail.com
```

---

## 3. Tahapan Penyiapan Supabase dari Awal hingga Siap Pakai

Ikuti **4 tahapan berurutan** berikut agar database terisi dengan skema, aturan keamanan, dan data produk hukum faktual Departemen Legislasi:

### Tahap 1: Eksekusi Skema, Constraint, Trigger, & Keamanan RLS
1. Buka [Dashboard Supabase Project `sfobevvfofvckkhshzlx`](https://supabase.com/dashboard/project/sfobevvfofvckkhshzlx).
2. Pilih menu **SQL Editor** di bilah kiri, lalu klik **New query**.
3. Buka file [`prisma/manual/00-setup-database-baru.sql`](./prisma/manual/00-setup-database-baru.sql) dari repositori ini, salin seluruh isinya, tempelkan ke SQL Editor, lalu klik **Run**.
4. **Apa yang dilakukan skrip ini secara otomatis?**
   - Mengaktifkan ekstensi PostgreSQL `pg_trgm` (pencarian *typo-tolerant*) dan `unaccent`.
   - Membuat **8 tipe ENUM** dan **13 tabel relasional** sesuai standar JDIH.
   - Memasang **CHECK Constraints** (validasi tahun, nomor urut positif, aturan kode sifat SK A/B).
   - Memasang **Trigger `update_legal_document_search_vector`** untuk indeks pencarian teks penuh otomatis.
   - Memasang **Trigger `prevent_audit_log_modification`** agar tabel `AuditLog` bersifat *append-only* (tidak bisa dihapus/diubah oleh siapa pun).
   - Mengaktifkan **Row Level Security (RLS) Zero-Trust** dan mencabut akses langsung (`REVOKE ALL`) dari role publik `anon` serta `authenticated`.
   - Mengisi **Data Master Awal**: 4 Jenis Produk Hukum (`UU`, `TAP`, `SK`, `LP`), 5 Forum Persidangan, Counter Tahun 2026, serta akun Super Admin utama (`puguhmuqoddam151@gmail.com`).

### Tahap 2: Impor 70 Produk Hukum Faktual & Tautan PDF Google Drive
Seluruh **70 produk hukum resmi** dari [Folder Google Drive JDIH BLM FEB UNAIR](https://drive.google.com/drive/folders/1f4iTq6ABdHVRXfEVd6fAZRfLmiWdeH2U?usp=drive_link) telah dikodifikasi ke dalam skrip SQL siap pakai.

1. Di **SQL Editor** Dashboard Supabase, buat query baru (**New query**).
2. Buka file [`prisma/manual/01-seed-produk-hukum-drive.sql`](./prisma/manual/01-seed-produk-hukum-drive.sql), salin seluruh isinya, tempelkan ke SQL Editor, lalu klik **Run**.
3. *(Alternatif via Terminal Lokal)* Anda juga dapat menjalankan seeder berbasis TypeScript:
   ```powershell
   npx tsx prisma/seed/import-register.ts --dry-run
   npx tsx prisma/seed/import-register.ts
   ```
4. **Rincian 70 Dokumen Faktual & Berkas PDF Google Drive yang Masuk ke Database (`LegalDocument` & `DocumentFile`):**
   - **4 Dokumen Konstitusi & Undang-Undang (`UU`):** Termasuk `AD-ART BLM FEB UNAIR 2026.pdf`, `KONSTITUSI ORMAWA BLM FEB UNAIR 2026.pdf`, `UU No. 01 Tahun 2026 (PEMIRA)`, dan `UU No. 02 Tahun 2026 (Perubahan UU PEMIRA)`.
   - **3 Ketetapan BLM (`TAP`):** `TAP 001 (Prosedur Tetap Persidangan)`, `TAP 002 (Kebijakan Ospek FEB)`, dan `TAP 003 (Kepengurusan Sementara LPPM SEKTOR)`.
   - **57 Surat Keputusan (`SK`):** Mencakup SK Awal Tahun (`0005`–`0009`, `0019`), SK Komisi & Pleno II (`0042`–`0048`), SK Pleno I (`0100`–`0108` beserta lampiran & notulensi ringkas), SK PEMIRA (`0126`–`0130`), SK Pleno III & SEKTOR (`0141`–`0152`), hingga SK Rekomendasi & Sanksi Ospek (`0158`–`0175`).
   - **6 Surat Laporan & Berita Acara (`LP`):** `LP 001` s.d. `LP 005` serta `Surat Rekomendasi DKPP PEMIRA FEB UNAIR 2026.pdf`.

### Tahap 3: Konfigurasi Autentikasi Pengurus (`Supabase Auth`)
1. Di Dashboard Supabase, buka menu **Authentication > Providers > Email**.
2. Pastikan provider **Email** aktif (*Enabled*).
3. Buka menu **Authentication > Users**, lalu klik **Add user > Create new user**:
   - **Email:** `puguhmuqoddam151@gmail.com`
   - **Password:** *(Buat password login panel admin Anda)*
   - Centang **Auto Confirm User**, lalu klik **Create user**.
4. Buka menu **Authentication > URL Configuration**:
   - **Site URL:** `https://jdih-blm-febunair.puguhmuqoddam151.workers.dev`
   - **Redirect URLs:** Tambahkan `https://jdih-blm-febunair.puguhmuqoddam151.workers.dev/**` dan `http://localhost:3000/**`.
5. **Keamanan Berlapis:** Meskipun seseorang mencoba membuat akun tanpa izin, modul [`src/lib/auth.ts`](./src/lib/auth.ts) dan tabel `AdminUser` menerapkan sistem **Allowlist Ketat** — hanya email yang terdaftar dengan `isActive = true` di tabel `AdminUser` yang diizinkan mengakses `/admin`.

### Tahap 4: Konfigurasi Supabase Storage & Sinkronisasi Berkas PDF
Agar seluruh 70 produk hukum tersimpan dan disajikan langsung dari **Supabase Storage** (sehingga akses ke Google Drive tertutup rapat bagi publik):

1. **Jalankan Skrip SQL Setup Storage:**
   - Di **SQL Editor** Supabase, jalankan file [`prisma/manual/02-setup-storage-supabase.sql`](./prisma/manual/02-setup-storage-supabase.sql).
   - Skrip ini akan membuat bucket `produk-hukum` (Public read, batas 50 MB, format khusus PDF) beserta RLS policy-nya secara otomatis.

2. **Jalankan Skrip Sinkronisasi Otomatis:**
   ```powershell
   npx tsx scripts/sync-drive-to-supabase.ts
   ```
   - Skrip ini akan mengunduh ke-70 berkas PDF resmi dari Google Drive secara internal (menggunakan ID berkas privat), lalu mengunggahnya langsung ke Supabase Storage.
   - Hasil publikasi tiap dokumen dapat diakses langsung melalui:
     `https://sfobevvfofvckkhshzlx.supabase.co/storage/v1/object/public/produk-hukum/{slug}.pdf`

3. **Keamanan & Pembatasan Akses Google Drive:**
   - Folder Google Drive kini **100% terlindung dan tidak dapat dijelajahi oleh publik**, karena website tidak lagi menyediakan tautan atau tombol yang mengarah ke folder Google Drive.
   - Pengunjung hanya dapat membaca pratinjau dan mengunduh berkas PDF dokumen terkait melalui portal JDIH.

---

## 4. Struktur Faktual 13 Tabel Database Supabase

Seluruh tabel berada pada skema `public`. Berikut adalah rincian fungsi dan aturan pengisian setiap tabel:

### A. Kelompok Tabel Master (Referensi Baku)

#### 1. Tabel `DocumentType` (Master Jenis Produk Hukum)
Menyimpan aturan penomoran dan hierarki untuk setiap jenis regulasi. **Jangan menghapus baris pada tabel ini.**

| `id` | `code` | `name` | `slug` | `numberPattern` | `numberPadding` | `requiresNature` | `autoSequence` | `hierarchyLevel` |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| `dt_uu` | `UU` | Undang-Undang | `undang-undang` | `{seq}/UU/BLMFEBUNAIR/{roman}/{year}` | `2` (`01`) | `false` | `true` | `1` (Tertinggi) |
| `dt_tap` | `TAP` | Ketetapan BLM | `ketetapan-blm` | `{seq}/TAP/BLM/{roman}/{year}` | `3` (`001`) | `false` | `true` | `2` |
| `dt_sk` | `SK` | Surat Keputusan | `surat-keputusan` | `{seq}/UN.3.1.4/{nature}/{code}/BLM/{roman}/{year}` | `4` (`0001`) | `true` | `false` | `3` |
| `dt_lp` | `LP` | Surat Laporan | `lembaran-parlemen` | `{seq}/LP/BLM/{roman}/{year}` | `3` (`001`) | `false` | `true` | `4` |

#### 2. Tabel `Forum` (Master Forum Persidangan)
Menyimpan daftar forum resmi tempat disahkannya suatu produk hukum:
- `forum_pleno` $\rightarrow$ **Sidang Pleno BLM** (`sidang-pleno-blm`)
- `forum_protap` $\rightarrow$ **Sidang Prosedur Tetap (Protap)** (`sidang-protap`)
- `forum_komisi` $\rightarrow$ **Sidang Komisi BLM** (`sidang-komisi-blm`)
- `forum_pimpinan` $\rightarrow$ **Rapat Pimpinan BLM** (`rapat-pimpinan-blm`)
- `forum_kerja` $\rightarrow$ **Rapat Kerja BLM** (`rapat-kerja-blm`)

#### 3. Tabel `Tag` (Master Topik / Klaster Bahasan)
Menyimpan pengelompokan tematik regulasi untuk memudahkan penelusuran mahasiswa:
- `pemira` (Pemilihan Raya Mahasiswa)
- `orientasi-studi` (Orientasi Studi & Pengenalan Kampus)
- `lppm-sektor` (Lembaga Pers & Penerbitan Mahasiswa SEKTOR)
- `tata-tertib` (Tata Tertib & Prosedur Persidangan)
- `pengawasan` (Pengawasan & Evaluasi Ormawa)

---

### B. Kelompok Tabel Inti Produk Hukum

#### 4. Tabel `LegalDocument` (Tabel Utama Produk Hukum)
Setiap baris merepresentasikan 1 produk hukum resmi yang tampil di katalog publik.

| Nama Kolom | Tipe Data | Wajib? | Aturan & Penjelasan Faktual |
| :--- | :--- | :---: | :--- |
| `id` | `TEXT (CUID)` | Ya | Primary key unik (mis. `clx...` atau `doc_uu_2026_01`). |
| `slug` | `VARCHAR(120)` | Ya | URL kanonikal unik berformat `{jenis}-{tahun}-{nomor_padded}` (contoh: `uu-2026-01`, `sk-2026-0148`). |
| `typeId` | `TEXT` | Ya | Foreign key ke `DocumentType.id` (`dt_uu`, `dt_tap`, `dt_sk`, `dt_lp`). |
| `year` | `SMALLINT` | Ya | Tahun penetapan. Dibatasi constraint `BETWEEN 2000 AND 2100`. |
| `sequenceNumber` | `INTEGER` | Ya | Nomor urut dokumen (`> 0`). Untuk SK adalah Nomor Buku Departemen Legislasi (mis. `148`). |
| `officialNumber` | `VARCHAR(200)` | Ya | Nomor resmi lengkap terformat baku (contoh: `0148/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026`). |
| `legacyNumber` | `VARCHAR(200)` | Tidak | Nomor asli dari buku lama jika pernah dinormalisasi (mis. `148/UN.3.1.4/...` tanpa nol di depan). Tetap bisa dicari di mesin pencari. |
| `nature` | `ENUM SkNature` | Khusus SK | Wajib diisi untuk `SK`: `A_INTERNAL` (Internal BLM) atau `B_EXTERNAL` (Eksternal/Ormawa). Untuk `UU`/`TAP`/`LP` wajib `NULL`. |
| `abbreviationCode` | `VARCHAR(80)` | Khusus SK | Kode singkatan kapital tanpa spasi sesuai Buku Departemen Legislasi (mis. `SKAGENDA`, `SKTATIB`, `SKREKOMENDASIPEMIRA`). |
| `title` | `VARCHAR(500)` | Ya | Judul resmi produk hukum sesuai kepala naskah. |
| `summary` | `VARCHAR(2000)` | Tidak | Ringkasan eksekutif isi pokok produk hukum untuk pratinjau katalog. |
| `contentText` | `TEXT` | Tidak | Teks penuh hasil ekstraksi isi PDF untuk pencarian mendalam (*full-text search*). |
| `forumId` | `TEXT` | Tidak | Foreign key ke `Forum.id`. |
| `enactedDate` | `DATE` | Ya | Tanggal ditetapkan (`YYYY-MM-DD`). Jika arsip lama hanya mencantumkan bulan, isi tanggal `01` dengan `enactedDatePrecision = 'MONTH'`. |
| `enactedDatePrecision`| `ENUM DatePrecision`| Ya | `'DAY'` (tanggal lengkap diketahui) atau `'MONTH'` (hanya bulan & tahun yang diketahui). |
| `romanMonth` | `VARCHAR(4)` | Ya | Angka Romawi bulan penetapan (`I` s.d. `XII`). |
| `placeOfEnactment` | `VARCHAR(100)` | Ya | Tempat penetapan, default: `'Surabaya'`. |
| `legalStatus` | `ENUM LegalStatus`| Ya | Status keberlakuan hukum: `'BERLAKU'`, `'DIUBAH'`, `'DICABUT'`, atau `'TIDAK_BERLAKU'`. |
| `publicationState` | `ENUM PublicationState`| Ya | `'DRAFT'` (tersembunyi dari publik), `'PUBLISHED'` (tampil di publik), atau `'ARCHIVED'` (tampil dengan penanda arsip). |
| `currentFileId` | `TEXT` | Tidak | Menunjuk ke `DocumentFile.id` versi PDF terbaru yang aktif. |
| `searchVector` | `TSVECTOR` | Otomatis | Diisi otomatis oleh *trigger* database setiap kali judul, nomor, ringkasan, atau isi teks berubah. **Jangan diisi manual.** |

#### 5. Tabel `DocumentFile` (Riwayat Berkas PDF)
Menyimpan metadata berkas fisik PDF yang diunggah.
- `documentId`: ID dokumen pemilik berkas.
- `version`: Nomor versi berkas (`1`, `2`, dst. — selalu bertambah, tidak pernah menimpa versi lama).
- `r2Key`: Path penyimpanan berkas berformat `produk-hukum/{jenis}/{tahun}/{slug}/v{version}.pdf`.
- `fileName`: Nama berkas unduhan yang bersih untuk pengguna.
- `mimeType`: Wajib `'application/pdf'`.
- `sizeBytes`: Ukuran berkas dalam satuan byte (`> 0`).
- `sha256`: Sidik jari kriptografi 64 karakter hex untuk menjamin keaslian berkas PDF.

#### 6. Tabel `DocumentRelation` (Jejak Hubungan Hukum Antar-Dokumen)
Mencatat hubungan yuridis antara dua produk hukum (misalnya UU Nomor 02 mengubah UU Nomor 01):
- `fromId`: Dokumen sumber (yang baru ditetapkan).
- `toId`: Dokumen target (yang dikenai dampak).
- `type`: Jenis relasi (`'MENGUBAH'`, `'MENCABUT'`, `'MENGESAHKAN'`, `'MELAKSANAKAN'`, `'TERKAIT'`).
- **Constraint:** `fromId` tidak boleh sama dengan `toId` (`fromId <> toId`).

#### 7. Tabel `DocumentTag` (Relasi Dokumen ke Topik)
Tabel penghubung (*many-to-many*) yang memasangkan `documentId` dengan `tagId`.

---

### C. Kelompok Tabel Penomoran, Administrasi, & Interaksi Publik

#### 8. Tabel `NumberCounter` (Penghitung Nomor Urut Atomik)
Menjaga urutan nomor terakhir (`lastNumber`) per `typeId` dan `year`. Saat admin menerbitkan dokumen baru melalui Server Action, baris pada tabel ini dikunci menggunakan `SELECT ... FOR UPDATE` agar tidak pernah terjadi nomor ganda (*race condition*).

#### 9. Tabel `NumberReservation` (Pemesanan Nomor Pra-Sidang)
Digunakan apabila Departemen Legislasi perlu memesan nomor urut terlebih dahulu sebelum naskah selesai disidangkan (contoh faktual pada arsip 2026: nomor urut `171`, `172`, dan `173`).

#### 10. Tabel `AdminUser` (Daftar Pengurus Berizin)
Mengatur siapa saja yang boleh masuk ke panel `/admin`:
- `email`: Wajib ditulis dalam **huruf kecil seluruhnya** (dijaga oleh constraint `email = lower(email)`).
- `role`: `'SUPER_ADMIN'` (hak penuh termasuk mencabut publikasi & kelola admin) atau `'EDITOR'` (mengelola draf & unggah dokumen).
- `isActive`: `true` (aktif) atau `false` (akses dicabut).

#### 11. Tabel `AuditLog` (Rekam Jejak Akuntabilitas *Append-Only*)
Mencatat setiap tindakan mutasi data (`CREATE`, `UPDATE`, `PUBLISH`, `STATUS_CHANGE`, `FILE_UPLOAD`, dll.) beserta `actorEmail`, perubahan nilai (`diff` dalam JSONB), dan waktu kejadian. **Dilindungi oleh trigger PostgreSQL sehingga baris log tidak dapat diubah (`UPDATE`) maupun dihapus (`DELETE`).**

#### 12. Tabel `DocumentRequest` (Kotak Masuk Permohonan Informasi Publik)
Menampung pengajuan dari mahasiswa/publik melalui formulir di halaman `/permohonan`:
- Menyimpan `name`, `email`, `affiliation` (NIM / Ormawa / Instansi), `message`, serta `relatedDocumentId` (jika pemohon menunjuk dokumen tertentu).
- `status`: `'BARU'` $\rightarrow$ `'DIPROSES'` $\rightarrow$ `'SELESAI'` atau `'DITOLAK'`.
- Pengurus Departemen Legislasi dapat menindaklanjuti dan mencatat tanggapan pada kolom `adminNote` serta `handledBy`.

#### 13. Tabel `RateLimit` (Pelindung Anti-Spam)
Menyimpan pencacah batas pengiriman per jendela waktu berdasarkan hash IP (`ipHash`) agar formulir publik `/permohonan` dan endpoint autentikasi terlindung dari serangan *flooding* / *brute-force*.

---

## 5. Batasan-Batasan Teknis & Aturan Validasi Wajib

Agar database dan storage selalu bersih, faktual, serta bebas dari kerusakan format, sistem menerapkan batasan (*constraints*) berikut:

### 1. Batasan Berkas & Storage (File Constraints)
- **Format Berkas Wajib:** Hanya menerima **`application/pdf` (`.pdf`)**. Berkas Word (`.docx`), gambar lepas (`.jpg`/`.png`), atau arsip (`.zip`/`.rar`) tidak diizinkan untuk diunggah sebagai naskah produk hukum.
- **Ukuran Maksimal Berkas:** **15 MB (`15.728.640 bytes`)** per berkas PDF. Untuk kenyamanan akses mahasiswa di jaringan seluler, sangat disarankan melakukan *optimize/compress PDF* hingga berukuran **500 KB – 5 MB** dengan teks yang tetap dapat diseleksi (*searchable PDF*, bukan sekadar hasil foto buram).
- **Kewajiban Checksum SHA-256:** Setiap berkas PDF wajib memiliki hash SHA-256 sepanjang tepat **64 karakter heksadesimal** pada kolom `DocumentFile.sha256`.
- **Aturan Penamaan Kunci Storage (`r2Key`):**
  ```text
  produk-hukum/{kode_jenis_lowercase}/{tahun}/{slug_dokumen}/v{nomor_versi}.pdf
  ```
  *Contoh Faktual:*
  - `produk-hukum/uu/2026/uu-2026-01/v1.pdf`
  - `produk-hukum/sk/2026/sk-2026-0148/v1.pdf`

### 2. Batasan Format Penomoran Departemen Legislasi
- **Undang-Undang (`UU`):** Nomor urut wajib **2 digit** dengan *leading zero* (`01`, `02`, dst.). Klausul institusi ditulis rapat **`BLMFEBUNAIR`** tanpa spasi/titik.
  - *Contoh Valid:* `01/UU/BLMFEBUNAIR/VIII/2026`
- **Ketetapan (`TAP`):** Nomor urut wajib **3 digit** (`001`, `002`, dst.).
  - *Contoh Valid:* `002/TAP/BLM/VII/2026`
- **Surat Keputusan (`SK`):** Nomor Buku Departemen Legislasi wajib **4 digit** (`0100`, `0148`, `0163`, dst.), wajib memilih kode sifat **`A`** (Internal) atau **`B`** (Eksternal), dan wajib menyertakan kode singkatan kapital tanpa spasi.
  - *Contoh Valid:* `0163/UN.3.1.4/B/SKREKOMENDASIPEMIRA/BLM/IX/2026`
- **Surat Laporan (`LP`):** Nomor urut wajib **3 digit** (`001`, `002`, dst.).
  - *Contoh Valid:* `004/LP/BLM/IX/2026`

### 3. Batasan Keamanan & Privasi Data
- **Zero-Trust RLS:** Jangan pernah mematikan (*Disable*) fitur **RLS (Row Level Security)** pada tabel mana pun di Dashboard Supabase. Karena seluruh 13 tabel diakses oleh server Next.js menggunakan koneksi PostgreSQL (`postgres` role via `DATABASE_URL`), pengguna publik dari luar tidak akan bisa menyedot atau memodifikasi tabel melalui `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Kerahasiaan Draf:** Dokumen yang masih berstatus `publicationState = 'DRAFT'` hanya boleh terlihat di dalam dasbor `/admin` dan tidak akan pernah dimunculkan di katalog publik, RSS feed (`/feed.xml`), maupun peta situs (`/sitemap.xml`).

---

## 6. Contoh Kueri Operasional di SQL Editor Supabase

Jika pengurus Departemen Legislasi ingin memeriksa atau memperbarui data secara langsung melalui **SQL Editor** di Dashboard Supabase, gunakan kueri standar berikut:

### A. Melihat Rekapitulasi Jumlah Produk Hukum Faktual per Jenis
```sql
SELECT 
  dt."code" AS "Kode",
  dt."name" AS "Jenis Produk Hukum",
  COUNT(ld."id") AS "Total Dokumen"
FROM "DocumentType" dt
LEFT JOIN "LegalDocument" ld ON ld."typeId" = dt."id"
GROUP BY dt."id", dt."code", dt."name", dt."sortOrder"
ORDER BY dt."sortOrder" ASC;
```

### B. Menambahkan Pengurus Baru Departemen Legislasi ke Daftar Admin
```sql
INSERT INTO "AdminUser" ("id", "email", "name", "role", "isActive", "createdAt", "updatedAt")
VALUES (
  'usr_legislasi_02',
  'staff.legislasi@feb.unair.ac.id', -- Wajib huruf kecil semua
  'Staf Departemen Legislasi',
  'EDITOR',                          -- Gunakan 'EDITOR' atau 'SUPER_ADMIN'
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO UPDATE SET
  "isActive" = true,
  "updatedAt" = CURRENT_TIMESTAMP;
```

### C. Memeriksa Daftar Permohonan Informasi Publik yang Masuk (`/permohonan`)
```sql
SELECT 
  "createdAt" AS "Waktu Pengajuan",
  "name" AS "Nama Pemohon",
  "email" AS "Email",
  "affiliation" AS "NIM / Instansi",
  "message" AS "Isi Permohonan",
  "status" AS "Status"
FROM "DocumentRequest"
ORDER BY "createdAt" DESC;
```

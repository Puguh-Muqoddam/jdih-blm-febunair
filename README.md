<div align="center">

# 🏛️ JDIH BLM FEB UNAIR
### Jaringan Dokumentasi dan Informasi Hukum
**Badan Legislatif Mahasiswa • Fakultas Ekonomi dan Bisnis • Universitas Airlangga**  
*Parlemen Cakrasena 2026*

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Deployed-F38020?style=for-the-badge&logo=cloudflare)](https://jdih-blm-febunair.puguhmuqoddam151.workers.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-41_Passed-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)

🌐 **Live Deployment:** [https://jdih-blm-febunair.puguhmuqoddam151.workers.dev](https://jdih-blm-febunair.puguhmuqoddam151.workers.dev)  
📦 **Repository:** [https://github.com/Puguh-Muqoddam/jdih-blm-febunair](https://github.com/Puguh-Muqoddam/jdih-blm-febunair)

</div>

---

## 📌 Tentang Proyek

**JDIH BLM FEB UNAIR** adalah sistem pangkalan data dan portal temu kembali informasi hukum resmi Badan Legislatif Mahasiswa (BLM) Fakultas Ekonomi dan Bisnis Universitas Airlangga. Dikembangkan dan dikelola di bawah naungan **Departemen Legislasi Parlemen Cakrasena 2026**, portal ini mengadopsi standar tata kelola dan metadata **JDIHN (Jaringan Dokumentasi dan Informasi Hukum Nasional)** untuk menjamin akuntabilitas, transparansi regulasi, serta kemudahan akses hukum bagi seluruh sivitas akademika FEB UNAIR.

Sistem ini mengelola **49 produk hukum resmi** periode 2026 yang terbagi ke dalam empat instrumen hukum:
1. **Undang-Undang Mahasiswa (UU):** Peraturan tertinggi tingkat fakultas yang disahkan bersama BEM.
2. **Ketetapan BLM (TAP):** Keputusan normatif yang mengikat ke dalam sidang dan kelembagaan legislatif.
3. **Surat Keputusan (SK):** Penetapan administratif berkekuatan hukum, dibagi menjadi:
   - **Sifat A (Internal):** Keputusan internal kelembagaan BLM (kode singkatan: `SKT...`).
   - **Sifat B (Eksternal):** Pengesahan pengurus BEM, HMD/HIMA, UKM, atau kepanitiaan (kode singkatan: `SK...`).
4. **Surat Laporan Parlemen (LP):** Risalah resmi, laporan dengar pendapat, dan pengawasan berkala.

---

## ✨ Fitur Unggulan

### 1. 🔍 Katalog & Temu Kembali Cepat
- **Full-Text Search:** Pencarian instan berdasarkan nomor resmi, nomor fisik lama, perihal judul, forum penetapan, dan kata kunci tag.
- **Filter Multi-Kategori:** Penyaringan fleksibel berdasarkan jenis dokumen, status keberlakuan hukum (*Berlaku*, *Diubah*, *Dicabut*), sifat surat (*Internal A* vs *Eksternal B*), dan tahun penerbitan.
- **Klaster Topik:** Pengelompokan regulasi tematik seperti *Pemira*, *Orientasi Studi / PKP*, *LPPM & Sektor*, dan *Keorganisasian*.

### 2. 📜 Standardisasi & Penomoran Kanonikal Otomatis
- **Mesin Penomoran Kanonikal:** Otomatisasi pembentukan nomor dokumen berformat baku, termasuk konversi bulan ke angka Romawi.
- **Normalisasi SK 4-Digit:** Standarisasi nomor urut SK 4-digit (misal: SK No. `100` dinormalisasi menjadi `0100/SK/BLMFEBUNAIR/...`) dengan tetap mempertahankan nomor fisik asli pada audit log.
- **Generator Sitasi Hukum:** Format sitasi standar perundang-undangan siap salin satu-klik untuk keperluan karya ilmiah, proposal, atau rujukan rapat.

### 3. 📄 Viewer & Berkas Digital PDF Resmi
- Salinan digital resmi bertanda tangan dari Departemen Legislasi BLM FEB UNAIR.
- Integrasi penyimpanan awan privat Cloudflare R2 dengan verifikasi integritas hash SHA-256.
- Pratinjau langsung di peramban serta tombol unduh berkas cepat.

### 4. 📬 Layanan Permohonan Informasi Hukum Mahasiswa
- Pengajuan informasi publik atau salinan naskah akademik/risalah sidang secara daring.
- Penerbitan **Nomor Tiket Registrasi Unik** (format `REQ-2026-XXXX`).
- Standar Pelayanan Minimal (SLA) respon resmi dalam **3 hari kerja**.

### 5. 📊 Dasbor Statistik & Analisis Parlemen
- Grafik proporsi instrumen hukum per jenis regulasi.
- Diagram status hukum keberlakuan peraturan (aktif vs dicabut/diubah).
- Visualisasi sebaran sifat keputusan administratif (Sifat A vs Sifat B).
- Linimasa produktivitas legislasi bulanan.

### 6. 🛡️ Panel Administrasi & Audit Rekonsiliasi (§10)
- Dasbor khusus pengurus dengan pengamanan sesi zero-trust.
- Pengelolaan metadata, penambahan produk hukum baru, dan pengunggahan berkas digital.
- Fitur audit rekonsiliasi data: deteksi berkas 3-digit fisik lama dan rekonsiliasi tipografi tahun (koreksi otomatis cetak fisik `2926` ke tahun kanonikal `2026` pada UU No. 02).

---

## 🎨 Palet Warna Desain (Modern Warmth)

Desain antarmuka memadukan wibawa lembaga legislatif formal dengan nuansa hangat kemahasiswaan:

| Peran | Nama Warna | Hex Code | Penerapan Antarmuka |
|---|---|---|---|
| **Primary** | Deep Blue | `#1B67BC` | Header bar, navigasi aktif, tombol utama, identitas resmi |
| **Secondary** | Medium Blue | `#3885CC` | Hover state, garis aksen, chevron navigasi, badge LP |
| **Light** | Light Blue | `#A3D0EE` | Border kartu, garis pembatas, outline input formulir |
| **Lightest** | Ice Blue | `#C6E8F7` | Background halaman (`body`), kontainer kartu, tag filter |
| **Accent** | Terracotta | `#b96d41` | Tombol CTA aksi utama, badge TAP, sorotan statistik |
| **Dark** | Charcoal | `#1A1A1A` | Tipografi teks utama, judul peraturan, badge UU |

---

## 🛠️ Tech Stack & Arsitektur

- **Frontend & App Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Deployment Platform:** [Cloudflare Workers](https://workers.cloudflare.com/) via `@opennextjs/cloudflare` & `@opennextjs/aws`
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Icons & Ilustrasi:** [Lucide React](https://lucide.dev/)
- **Database & ORM:** [Prisma ORM 7](https://www.prisma.io/) & PostgreSQL / Supabase
- **Pengujian Unit:** [Vitest 3](https://vitest.dev/) (41 unit tests lulus)
- **Type Safety:** TypeScript 5 (Strict Mode)

---

## 📂 Struktur Direktori

```plaintext
jdih-blm-febunair/
├── public/                     # Aset statis & logo resmi (BLM, Cakrasena, Favicon)
│   ├── images/
│   │   ├── blm_logo.png
│   │   ├── parliament_logo.png
│   │   └── cover-blm.png
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Panel pengurus & login admin
│   │   │   ├── login/
│   │   │   ├── produk-hukum/   # Manajemen & form input baru
│   │   │   └── page.tsx        # Dasbor utama admin
│   │   ├── panduan-penomoran/  # Dokumentasi aturan format nomor
│   │   ├── pencarian/          # Halaman pencarian terpadu
│   │   ├── permohonan/         # Layanan pengajuan informasi & SLA
│   │   ├── produk-hukum/       # Katalog & detail naskah digital
│   │   │   ├── [jenis]/[tahun]/[nomor]/
│   │   │   └── jenis/[slug]/
│   │   ├── statistik/          # Visualisasi analitik data regulasi
│   │   ├── tentang/            # Profil BLM, visi-misi, komisi & lambang
│   │   ├── topik/[slug]/       # Pengelompokan regulasi bertopik
│   │   ├── globals.css         # Variabel warna CSS & Tailwind Theme
│   │   ├── layout.tsx          # Root layout portal
│   │   └── page.tsx            # Halaman beranda utama
│   ├── components/             # Komponen antarmuka modular
│   │   ├── layout/             # SiteHeader, SiteFooter
│   │   ├── public/             # HeroSearchBar, DocumentCard, DocumentTable, CatalogClient
│   │   └── ui/                 # TypeBadge, StatusBadge, CitationBox, CopyButton
│   └── lib/                    # Logika bisnis & data
│       ├── data/               # Mock pangkalan 49 dokumen regulasi
│       ├── numbering.ts        # Algoritma penomoran kanonikal & sitasi
│       └── db.ts               # Inisialisasi Prisma & Database Client
├── tests/                      # Pengujian otomatis (Unit Tests)
│   └── unit/
│       ├── numbering.test.ts
│       ├── import-and-sitemap.test.ts
│       └── backend-security.test.ts
├── open-next.config.ts         # Konfigurasi build OpenNext Cloudflare
├── wrangler.jsonc              # Konfigurasi Cloudflare Workers
└── package.json
```

---

## 🚀 Memulai (Instalasi Lokal)

### Prasyarat
- [Node.js](https://nodejs.org/) v20.x atau lebih baru
- npm v10.x atau lebih baru
- Git

### Langkah Instalasi

1. **Clone repositori:**
   ```bash
   git clone https://github.com/Puguh-Muqoddam/jdih-blm-febunair.git
   cd jdih-blm-febunair
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables:**
   Salin file `.env.example` ke `.env`:
   ```bash
   cp .env.example .env
   ```
   Sesuaikan parameter database Supabase / PostgreSQL dan kunci sesi jika diperlukan.

4. **Jalankan server pengembangan lokal:**
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 🧪 Skrip Perintah (NPM Scripts)

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server lokal pengembangan Next.js |
| `npm run build` | Melakukan build OpenNext untuk bundle Cloudflare Workers |
| `npm run build:next` | Melakukan build standar Next.js produksi |
| `npm run typecheck` | Memvalidasi seluruh tipe data TypeScript (`tsc --noEmit`) |
| `npm test` | Menjalankan seluruh pengujian unit Vitest |
| `npm run lint` | Menjalankan pemeriksaan kode ESLint |
| `npm run deploy` | Melakukan build dan deployment otomatis ke Cloudflare Workers |

---

## ⚖️ Penyelarasan Standar JDIHN

Sistem katalog ini menerapkan metadata baku yang selaras dengan ketentuan JDIHN:
- **Judul Produk Hukum:** Penulisan resmi lengkap tanpa singkatan informal.
- **Nomor Registrasi Kanonikal:** Penomoran terpadu dengan identitas penerbit `BLMFEBUNAIR`.
- **Status Keberlakuan:** Pelacakan relasi perubahan (*Diubah oleh*) atau pencabutan (*Dicabut oleh*).
- **Abstrak & Subjek:** Intisari pertimbangan menimbang dan kata kunci pencarian tematik.
- **Integritas Dokumen Digital:** Naskah tersimpan dalam format PDF terverifikasi.

---

## 👥 Pengembang & Hak Cipta

- **Pengembang & Pemegang Hak Cipta:** Puguh Muqoddam
- **Lembaga:** Badan Legislatif Mahasiswa, Fakultas Ekonomi dan Bisnis, Universitas Airlangga
- **Kepengurusan:** Parlemen Cakrasena 2026
- **Departemen:** Departemen Legislasi
- **Kontak & Narahubung:**
  - Sekretariat: Graha Krida Mahasiswa (GKM) Lantai 1, Fakultas Ekonomi dan Bisnis, Universitas Airlangga, Jl. Airlangga No. 4-6, Surabaya
  - Surel: `blm.feb@unair.ac.id` / `puguhmuqoddam151@gmail.com`
  - Instagram: [@blmfebunair](https://instagram.com/blmfebunair)

---
<div align="center">
  <small>© 2026 Puguh Muqoddam • Departemen Legislasi BLM FEB UNAIR • Parlemen Cakrasena. Seluruh Hak Cipta Dilindungi.</small>
</div>

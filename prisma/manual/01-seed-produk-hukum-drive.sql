-- =============================================================================
-- JDIH BLM FEB UNAIR - SEED 70 PRODUK HUKUM FAKTUAL & LINK GOOGLE DRIVE PDF
-- File: prisma/manual/01-seed-produk-hukum-drive.sql
-- Sumber: https://drive.google.com/drive/folders/1f4iTq6ABdHVRXfEVd6fAZRfLmiWdeH2U
-- Cara Pakai: Salin dan jalankan di SQL Editor Dashboard Supabase.
-- =============================================================================

BEGIN;

-- 01/UU/BLMFEBUNAIR/VIII/2026: Undang-Undang Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga tentang Pemilihan Umum Raya (UU PEMIRA)
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_uu_2026_01',
  'uu-2026-01',
  'dt_uu',
  2026,
  1,
  '01/UU/BLMFEBUNAIR/VIII/2026',
  NULL,
  NULL,
  NULL,
  'Undang-Undang Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga tentang Pemilihan Umum Raya (UU PEMIRA)',
  'Peraturan dasar yang mengatur tentang tata kelola, penyelenggara, tahapan, asas pelaksanaan, serta mekanisme pengawasan Pemilihan Umum Raya Mahasiswa di lingkungan FEB UNAIR.',
  'forum_pleno',
  '2026-08-01',
  'MONTH',
  'VIII',
  'Surabaya',
  'DIUBAH',
  'PUBLISHED',
  142,
  48,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_uu_2026_01_v1',
  'doc_uu_2026_01',
  1,
  'https://drive.google.com/file/d/1F3BwFyUkGeole50zfMTxP7gRgzOyGoAK/view?usp=sharing',
  '01_UU_BLMFEBUNAIR_VIII_2026 - UU PEMIRA 2026.pdf',
  'application/pdf',
  524288,
  '1f3bafaaaaeaae50afaaaa7aaaaaaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_uu_2026_01_v1' WHERE "id" = 'doc_uu_2026_01';

-- 02/UU/BLMFEBUNAIR/VIII/2026: Perubahan atas Undang-Undang Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga tentang Pemilihan Umum Raya
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_uu_2026_02',
  'uu-2026-02',
  'dt_uu',
  2026,
  2,
  '02/UU/BLMFEBUNAIR/VIII/2026',
  '02/UU/BLMFEBUNAIR/VIII/2926',
  NULL,
  NULL,
  'Perubahan atas Undang-Undang Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga tentang Pemilihan Umum Raya',
  'Perubahan pasal-pasal ketentuan teknis penyelenggaraan PEMIRA guna menjamin kepastian hukum, transparansi penghitungan suara, dan integritas panitia pemilihan.',
  'forum_pleno',
  '2026-08-01',
  'MONTH',
  'VIII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  205,
  76,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_uu_2026_02_v1',
  'doc_uu_2026_02',
  1,
  'https://drive.google.com/file/d/1kP26Aj2Pr-mXs9yvrRzRU-FH83VMPKAN/view?usp=sharing',
  '02_UU_BLMFEBUNAIR_VIII_2026 - Amandemen UU PEMIRA 2026.pdf',
  'application/pdf',
  524288,
  '1aa26aa2aaaaaa9aaaaaaaafa83aaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_uu_2026_02_v1' WHERE "id" = 'doc_uu_2026_02';

-- 001/TAP/BLM/IV/2026: Prosedur Tetap Pengawasan BLM terhadap BEM FEB UNAIR 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_tap_2026_001',
  'tap-2026-001',
  'dt_tap',
  2026,
  1,
  '001/TAP/BLM/IV/2026',
  NULL,
  NULL,
  NULL,
  'Prosedur Tetap Pengawasan BLM terhadap BEM FEB UNAIR 2026',
  'Ketetapan Prosedur Tetap (Protap) yang menetapkan instrumen pengawasan, jadwal evaluasi kerja berkala, serta indikator kinerja akuntabilitas program kerja Badan Eksekutif Mahasiswa FEB UNAIR.',
  'forum_protap',
  '2026-04-01',
  'MONTH',
  'IV',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  89,
  31,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_tap_2026_001_v1',
  'doc_tap_2026_001',
  1,
  'https://drive.google.com/file/d/1foHPuhFC2d_WJj92eT2dq5zqGldlL4Eg/view?usp=sharing',
  '001_TAP_BLM_IV_2026 - Prosedur Tetap Pengawasan BLM terhadap BEM FEB UNAIR 2026.pdf',
  'application/pdf',
  524288,
  '1faaaaafc2daaaa92ea2da5aaaadaa4ea0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_tap_2026_001_v1' WHERE "id" = 'doc_tap_2026_001';

-- 002/TAP/BLM/VII/2026: Kebijakan Orientasi Studi dan Pengenalan Kampus di Lingkungan FEB UNAIR
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_tap_2026_002',
  'tap-2026-002',
  'dt_tap',
  2026,
  2,
  '002/TAP/BLM/VII/2026',
  NULL,
  NULL,
  NULL,
  'Kebijakan Orientasi Studi dan Pengenalan Kampus di Lingkungan FEB UNAIR',
  'Landasan kebijakan pembinaan mahasiswa baru yang bebas dari kekerasan fisik dan verbal, mewajibkan nilai-nilai intelektual, dan mengatur sanksi pelanggaran Ospek Jurusan.',
  'forum_pleno',
  '2026-07-28',
  'DAY',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  310,
  112,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_tap_2026_002_v1',
  'doc_tap_2026_002',
  1,
  'https://drive.google.com/file/d/1DTLLLY8mU30F3N1pAUKH4m1Fgx8dMGRo/view?usp=sharing',
  '002_TAP_BLM_VII_2026 - Kebijakan Orientasi Studi dan Pengenalan Kampus BLM FEB UNAIR 2026.pdf',
  'application/pdf',
  524288,
  '1daaaaa8aa30f3a1aaaaa4a1faa8daaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_tap_2026_002_v1' WHERE "id" = 'doc_tap_2026_002';

-- 003/TAP/BLM/IX/2026: Kepengurusan Sementara LPPM SEKTOR
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_tap_2026_003',
  'tap-2026-003',
  'dt_tap',
  2026,
  3,
  '003/TAP/BLM/IX/2026',
  NULL,
  NULL,
  NULL,
  'Kepengurusan Sementara LPPM SEKTOR',
  'Ketetapan Sidang Pleno BLM terkait penetapan pelaksana tugas kepengurusan sementara Lembaga Pers dan Penerbitan Mahasiswa SEKTOR pasca evaluasi kekosongan organisasi.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  124,
  29,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_tap_2026_003_v1',
  'doc_tap_2026_003',
  1,
  'https://drive.google.com/file/d/19QEa1n7KIscgMpMCSkfp7WB2L4W-vShu/view?usp=sharing',
  '003_TAP_BLM_IX_2026 - TAP Kepengurusan Sementara LPPM SEKTOR.pdf',
  'application/pdf',
  524288,
  '19aea1a7aaacaaaacaafa7ab2a4aaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_tap_2026_003_v1' WHERE "id" = 'doc_tap_2026_003';

-- 001/LP/BLM/VII/2026: Laporan Pelanggaran dan Rekomendasi Sanksi terhadap Anggota BLM
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_lp_2026_001',
  'lp-2026-001',
  'dt_lp',
  2026,
  1,
  '001/LP/BLM/VII/2026',
  NULL,
  NULL,
  NULL,
  'Laporan Pelanggaran dan Rekomendasi Sanksi terhadap Anggota BLM',
  'Laporan hasil pemeriksaan Badan Kehormatan / Sidang Protap mengenai dugaan ketidakhadiran berulang dan pelanggaran kode etik oleh oknum anggota legislatif.',
  'forum_protap',
  '2026-07-27',
  'DAY',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  75,
  19,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_lp_2026_001_v1',
  'doc_lp_2026_001',
  1,
  'https://drive.google.com/file/d/1KbfwTkqJps5U4PvZK-KmOoN_sznE3vc6/view?usp=sharing',
  '001_LP_BLM_VII_2026 - Laporan dan Pertimbangan Pemberian Surat Peringatan 1 (Bagian 1).pdf',
  'application/pdf',
  524288,
  '1abfaaaaaaa5a4aaaaaaaaaaaaaae3ac60000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_lp_2026_001_v1' WHERE "id" = 'doc_lp_2026_001';

-- 002/LP/BLM/VII/2026: Laporan Pelanggaran dan Rekomendasi Sanksi terhadap Anggota BLM (Tindak Lanjut Pleno)
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_lp_2026_002',
  'lp-2026-002',
  'dt_lp',
  2026,
  2,
  '002/LP/BLM/VII/2026',
  NULL,
  NULL,
  NULL,
  'Laporan Pelanggaran dan Rekomendasi Sanksi terhadap Anggota BLM (Tindak Lanjut Pleno)',
  'Laporan resmi pembahasan tingkat Sidang Pleno mengenai putusan sanksi etik dan tindak lanjut keanggotaan berdasarkan hasil verifikasi forum sebelumnya.',
  'forum_pleno',
  '2026-07-27',
  'DAY',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  68,
  16,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_lp_2026_002_v1',
  'doc_lp_2026_002',
  1,
  'https://drive.google.com/file/d/1MxfRb5EXLIrMFKucKU629Ca0lBfT5ZgT/view?usp=sharing',
  '002_LP_BLM_VII_2026 - Laporan dan Pertimbangan Pemberian Surat Peringatan 1 (Bagian 2).pdf',
  'application/pdf',
  524288,
  '1aafab5eaaaaafaacaa629ca0abfa5aaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_lp_2026_002_v1' WHERE "id" = 'doc_lp_2026_002';

-- 003/LP/BLM/IX/2026: Laporan Kondisi Kekosongan Kepengurusan LPPM SEKTOR
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_lp_2026_003',
  'lp-2026-003',
  'dt_lp',
  2026,
  3,
  '003/LP/BLM/IX/2026',
  NULL,
  NULL,
  NULL,
  'Laporan Kondisi Kekosongan Kepengurusan LPPM SEKTOR',
  'Laporan investigasi Komisi Pengawasan mengenai terhentinya aktivitas keredaksian LPPM SEKTOR yang mendasari pembentukan caretaker kepengurusan.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  92,
  22,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_lp_2026_003_v1',
  'doc_lp_2026_003',
  1,
  'https://drive.google.com/file/d/15qQSGg0GzWjyvZ3_ejYT5998JFu4NvK2/view?usp=sharing',
  '003_LP_BLM_IX_2026 - Surat Laporan Pembiaran Surat Peringatan.docx',
  'application/pdf',
  524288,
  '15aaaaa0aaaaaaa3aeaaa5998afa4aaa20000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_lp_2026_003_v1' WHERE "id" = 'doc_lp_2026_003';

-- 004/LP/BLM/IX/2026: Laporan Hasil Pengawasan Pelanggaran SK Kebijakan Ospek Jurusan FEB UNAIR 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_lp_2026_004',
  'lp-2026-004',
  'dt_lp',
  2026,
  4,
  '004/LP/BLM/IX/2026',
  NULL,
  NULL,
  NULL,
  'Laporan Hasil Pengawasan Pelanggaran SK Kebijakan Ospek Jurusan FEB UNAIR 2026',
  'Temuan pelanggaran materi dan durasi kegiatan pengenalan jurusan serta rekomendasi pemanggilan panitia HIMA terkait ke Sidang Pleno.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  184,
  57,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_lp_2026_004_v1',
  'doc_lp_2026_004',
  1,
  'https://drive.google.com/file/d/1Z9LPStqkrP1WRz8W5iM9faGAK8ILezas/view?usp=sharing',
  '004_LP_BLM_IX_2026 - Surat Laporan Hasil Pengawasan Pelanggaran SK Kebijakan Ospek Jurusan FEB UNAIR 2026.docx',
  'application/pdf',
  524288,
  '1a9aaaaaaaa1aaa8a5aa9faaaa8aaeaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_lp_2026_004_v1' WHERE "id" = 'doc_lp_2026_004';

-- 005/LP/BLM/IX/2026: Laporan Ketidakhadiran Berulang HIMA Manajemen dalam Forum Bawashim 1 dan 2
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_lp_2026_005',
  'lp-2026-005',
  'dt_lp',
  2026,
  5,
  '005/LP/BLM/IX/2026',
  NULL,
  NULL,
  NULL,
  'Laporan Ketidakhadiran Berulang HIMA Manajemen dalam Forum Bawashim 1 dan 2',
  'Laporan ketidakhadiran koordinasi pengawasan himpunan mahasiswa departemen manajemen dalam forum resmi Badan Pengawas HIMA (Bawashim).',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  115,
  34,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_lp_2026_005_v1',
  'doc_lp_2026_005',
  1,
  'https://drive.google.com/file/d/1dXN7sRvcSaKrEjZ2mSgwYUVma0XPXNyn/view?usp=sharing',
  '005_LP_BLM_IX_2026 - Surat Laporan Departemen Pengawasan tentang Absent dalam Forum Bawashim.docx',
  'application/pdf',
  524288,
  '1daa7aaacaaaaeaa2aaaaaaaaa0aaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_lp_2026_005_v1' WHERE "id" = 'doc_lp_2026_005';

-- 0100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026: SK Sidang Pleno I
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0100',
  'sk-2026-0100',
  'dt_sk',
  2026,
  100,
  '0100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026',
  '100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026',
  'SKPLENOI',
  'A_INTERNAL',
  'SK Sidang Pleno I',
  'Ketetapan pengesahan agenda dan pembukaan rangkaian Sidang Pleno I BLM FEB UNAIR periode kerja 2026.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  45,
  12,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0100_v1',
  'doc_sk_2026_0100',
  1,
  'https://drive.google.com/file/d/1BF9sJsLi0cE-Nrl2M23VdaIpf5jLVEAs/view?usp=sharing',
  '100_UN.3.1.4_A_SKPLENOI_BLM_VII_2026 - SK Sidang Pleno I (TTD).pdf',
  'application/pdf',
  524288,
  '1bf9aaaaa0ceaaaa2a23adaaaf5aaaeaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0100_v1' WHERE "id" = 'doc_sk_2026_0100';

-- 0101/UN.3.1.4/B/SKPLENOII/BLM/VII/2026: SK Sidang Pleno II
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0101',
  'sk-2026-0101',
  'dt_sk',
  2026,
  101,
  '0101/UN.3.1.4/B/SKPLENOII/BLM/VII/2026',
  '101/UN.3.1.4/B/SKPLENOII/BLM/VII/2026',
  'SKPLENOII',
  'B_EXTERNAL',
  'SK Sidang Pleno II',
  'Keputusan Sidang Pleno II mengenai pengesahan hasil koordinasi eksternal ormawa fakultas.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  52,
  14,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0101_v1',
  'doc_sk_2026_0101',
  1,
  'https://drive.google.com/file/d/1G3LvhEmlJZyyiWaaGg4Ws3XmROkDnpxH/view?usp=sharing',
  '101_UN.3.1.4_B_SKPLENOII_BLM_VII_2026 - SK Sidang Pleno II (TTD).pdf',
  'application/pdf',
  524288,
  '1a3aaaeaaaaaaaaaaaa4aa3aaaaadaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0101_v1' WHERE "id" = 'doc_sk_2026_0101';

-- 0102/UN.3.1.4/A/SKPLENOIII/BLM/VII/2026: SK Sidang Pleno III
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0102',
  'sk-2026-0102',
  'dt_sk',
  2026,
  102,
  '0102/UN.3.1.4/A/SKPLENOIII/BLM/VII/2026',
  '102/UN.3.1.4/A/SKPLENOIII/BLM/VII/2026',
  'SKPLENOIII',
  'A_INTERNAL',
  'SK Sidang Pleno III',
  'Keputusan penetapan tata kelola fraksi dan komisi kerja internal legislatif mahasiswa.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  38,
  8,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0102_v1',
  'doc_sk_2026_0102',
  1,
  'https://drive.google.com/file/d/1OCQT_oqEexWcUVHAVDhMvFgRFdZ1Y2-r/view?usp=sharing',
  '102_UN.3.1.4_A_SKPLENOIII_BLM_VII_2026 - SK Sidang Pleno III (TTD).pdf',
  'application/pdf',
  524288,
  '1acaaaaaeeaacaaaaadaaafaafda1a2aa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0102_v1' WHERE "id" = 'doc_sk_2026_0102';

-- 0103/UN.3.1.4/A/SKPLENOIV/BLM/VII/2026: SK Sidang Pleno IV
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0103',
  'sk-2026-0103',
  'dt_sk',
  2026,
  103,
  '0103/UN.3.1.4/A/SKPLENOIV/BLM/VII/2026',
  '103/UN.3.1.4/A/SKPLENOIV/BLM/VII/2026',
  'SKPLENOIV',
  'A_INTERNAL',
  'SK Sidang Pleno IV',
  'Keputusan pengesahan hasil evaluasi tengah tahun program kerja komisi-komisi BLM.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  41,
  10,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0103_v1',
  'doc_sk_2026_0103',
  1,
  'https://drive.google.com/file/d/1QF7VcZfXGuwOTV3XRbMZ1WdKc52XHJhv/view?usp=sharing',
  '103_UN.3.1.4_A_SKPLENOIV_BLM_VII_2026 - SK Sidang Pleno IV (TTD).pdf',
  'application/pdf',
  524288,
  '1af7acafaaaaaaa3aabaa1adac52aaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0103_v1' WHERE "id" = 'doc_sk_2026_0103';

-- 0104/UN.3.1.4/A/SKAGENDAACARAPLENO/BLM/VII/2026: SK Agenda Acara Sidang Pleno
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0104',
  'sk-2026-0104',
  'dt_sk',
  2026,
  104,
  '0104/UN.3.1.4/A/SKAGENDAACARAPLENO/BLM/VII/2026',
  '104/UN.3.1.4/A/SKAGENDAACARAPLENO/BLM/VII/2026',
  'SKAGENDAACARAPLENO',
  'A_INTERNAL',
  'SK Agenda Acara Sidang Pleno',
  'Penetapan susunan jadwal dan agenda acara persidangan Pleno Juli BLM FEB UNAIR.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  35,
  9,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0104_v1',
  'doc_sk_2026_0104',
  1,
  'https://drive.google.com/file/d/16zI-Qf-KmK_h403L9u8glJNoI9gzat6I/view?usp=sharing',
  '104_UN.3.1.4_A_SKAGENDAACARAPLENO_BLM_VII_2026 - SK Agenda Acara Sidang Pleno (TTD).pdf',
  'application/pdf',
  524288,
  '16aaaafaaaaaa403a9a8aaaaaa9aaaa6a0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0104_v1' WHERE "id" = 'doc_sk_2026_0104';

-- 0105/UN.3.1.4/A/SKTATATERTIBPLENO/BLM/VII/2026: SK Tata Tertib Sidang Pleno
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0105',
  'sk-2026-0105',
  'dt_sk',
  2026,
  105,
  '0105/UN.3.1.4/A/SKTATATERTIBPLENO/BLM/VII/2026',
  '105/UN.3.1.4/A/SKTATATERTIBPLENO/BLM/VII/2026',
  'SKTATATERTIBPLENO',
  'A_INTERNAL',
  'SK Tata Tertib Sidang Pleno',
  'Pedoman tata tertib persidangan, hak suara, hak bicara, dan kuorum pengambilan keputusan sidang pleno.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  64,
  18,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0105_v1',
  'doc_sk_2026_0105',
  1,
  'https://drive.google.com/file/d/1q0sI7tX2Vk4ElVId3X47Je7tXMJ2tqJt/view?usp=sharing',
  '105_UN.3.1.4_A_SKTATATERTIBPLENO_BLM_VII_2026 - SK Tata Tertib Sidang Pleno (TTD).pdf',
  'application/pdf',
  524288,
  '1a0aa7aa2aa4eaaad3a47ae7aaaa2aaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0105_v1' WHERE "id" = 'doc_sk_2026_0105';

-- 0106/UN.3.1.4/A/SKKEBIJAKANORIENTASIPLENO/BLM/VII/2026: SK Kebijakan Orientasi Studi
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0106',
  'sk-2026-0106',
  'dt_sk',
  2026,
  106,
  '0106/UN.3.1.4/A/SKKEBIJAKANORIENTASIPLENO/BLM/VII/2026',
  '106/UN.3.1.4/A/SKKEBIJAKANORIENTASIPLENO/BLM/VII/2026',
  'SKKEBIJAKANORIENTASIPLENO',
  'A_INTERNAL',
  'SK Kebijakan Orientasi Studi',
  'Ketetapan teknis internal terkait pengawasan komisi terhadap pelaksanaan orientasi studi fakultas.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  130,
  42,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0106_v1',
  'doc_sk_2026_0106',
  1,
  'https://drive.google.com/file/d/1vXVxBYuw846UsNs6WWB_8UaIiBlF6gx8/view?usp=sharing',
  '106_UN.3.1.4_B_SKKEBIJAKANORIENTASIPLENO_BLM_VII_2026 - SK Kebijakan Orientasi Studi dan Pengenalan Kampus BLM FEB UNAIR.pdf',
  'application/pdf',
  524288,
  '1aaaabaaa846aaaa6aaba8aaaabaf6aa80000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0106_v1' WHERE "id" = 'doc_sk_2026_0106';

-- 0107/UN.3.1.4/A/SKPENGUNDURANDIRIBLMPLENO/BLM/VII/2026: SK Pengunduran Diri Anggota
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0107',
  'sk-2026-0107',
  'dt_sk',
  2026,
  107,
  '0107/UN.3.1.4/A/SKPENGUNDURANDIRIBLMPLENO/BLM/VII/2026',
  '107/UN.3.1.4/A/SKPENGUNDURANDIRIBLMPLENO/BLM/VII/2026',
  'SKPENGUNDURANDIRIBLMPLENO',
  'A_INTERNAL',
  'SK Pengunduran Diri Anggota',
  'Persetujuan permohonan pengunduran diri salah satu anggota Badan Legislatif Mahasiswa periode 2026.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  59,
  11,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0107_v1',
  'doc_sk_2026_0107',
  1,
  'https://drive.google.com/file/d/1t8RrQAMjhkD5lsLRXQyY6bNaQFn-ODqa/view?usp=sharing',
  '107_UN.3.1.4_A_SKPENGUNDURANDIRIBLMPLENO_BLM_VII_2026 - SK Pengunduran Diri Anggota BLM (TTD).pdf',
  'application/pdf',
  524288,
  '1a8aaaaaaaad5aaaaaaaa6baaafaaadaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0107_v1' WHERE "id" = 'doc_sk_2026_0107';

-- 0108/UN.3.1.4/A/SKPEMBERIANSURATPERINGATANPLENO/BLM/VII/2026: SK Pemberian SP 1
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0108',
  'sk-2026-0108',
  'dt_sk',
  2026,
  108,
  '0108/UN.3.1.4/A/SKPEMBERIANSURATPERINGATANPLENO/BLM/VII/2026',
  '108/UN.3.1.4/A/SKPEMBERIANSURATPERINGATANPLENO/BLM/VII/2026',
  'SKPEMBERIANSURATPERINGATANPLENO',
  'A_INTERNAL',
  'SK Pemberian SP 1',
  'Pemberian Surat Peringatan Tingkat Pertama (SP 1) kepada anggota legislatif atas evaluasi kedisiplinan sidang.',
  'forum_pleno',
  '2026-07-01',
  'MONTH',
  'VII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  71,
  15,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0108_v1',
  'doc_sk_2026_0108',
  1,
  'https://drive.google.com/file/d/1kkrQUz2_kZl5RrsBk3vZ_piqqhvGKd1M/view?usp=sharing',
  '108_UN.3.1.4_A_SKPEMBERIANSURATPERINGATANPLENO_BLM_VII_2026 - SK Pemberian Surat Peringatan 1 (TTD).pdf',
  'application/pdf',
  524288,
  '1aaaaaa2aaaa5aaaba3aaaaaaaaaaad1a0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0108_v1' WHERE "id" = 'doc_sk_2026_0108';

-- 0126/UN.3.1.4/B/SKAGENDAACARAPEMIRA/BLM/VIII/2026: SK Agenda Acara PEMIRA
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0126',
  'sk-2026-0126',
  'dt_sk',
  2026,
  126,
  '0126/UN.3.1.4/B/SKAGENDAACARAPEMIRA/BLM/VIII/2026',
  NULL,
  'SKAGENDAACARAPEMIRA',
  'B_EXTERNAL',
  'SK Agenda Acara PEMIRA',
  'Penetapan jadwal resmi tahapan pendaftaran, verifikasi, kampanye, dan pemungutan suara PEMIRA FEB UNAIR 2026.',
  'forum_pleno',
  '2026-08-01',
  'MONTH',
  'VIII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  188,
  65,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0126_v1',
  'doc_sk_2026_0126',
  1,
  'https://drive.google.com/file/d/1kJQnSXLGBF4HdlZvG-unthmRqJv3j-Zn/view?usp=sharing',
  '0126_UN.3.1.4_B_SKAGENDAACARAPEMIRA_BLM_VIII_2026 - SK Agenda Acara Sidang UU PEMIRA 2026.pdf',
  'application/pdf',
  524288,
  '1aaaaaaaabf4adaaaaaaaaaaaaaa3aaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0126_v1' WHERE "id" = 'doc_sk_2026_0126';

-- 0127/UN.3.1.4/B/SKTATATERTIBPEMIRA/BLM/VIII/2026: SK Tata Tertib PEMIRA
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0127',
  'sk-2026-0127',
  'dt_sk',
  2026,
  127,
  '0127/UN.3.1.4/B/SKTATATERTIBPEMIRA/BLM/VIII/2026',
  NULL,
  'SKTATATERTIBPEMIRA',
  'B_EXTERNAL',
  'SK Tata Tertib PEMIRA',
  'Aturan teknis kampanye, larangan politik uang, etika sosialisasi, dan sanksi pelanggaran pemilihan raya mahasiswa.',
  'forum_pleno',
  '2026-08-01',
  'MONTH',
  'VIII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  165,
  52,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0127_v1',
  'doc_sk_2026_0127',
  1,
  'https://drive.google.com/file/d/1RAYPmFQSCdog_Do9X07iG4bzDtHlovfq/view?usp=sharing',
  '0127_UN.3.1.4_B_SKTATATERTIBPEMIRA_BLM_VIII_2026 - SK Tata Tertib Sidang UU PEMIRA 2026.docx.pdf',
  'application/pdf',
  524288,
  '1aaaaafaacdaaada9a07aa4badaaaaafa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0127_v1' WHERE "id" = 'doc_sk_2026_0127';

-- 0128/UN.3.1.4/B/SKPLENOIPEMIRA/BLM/VIII/2026: SK Pleno I PEMIRA
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0128',
  'sk-2026-0128',
  'dt_sk',
  2026,
  128,
  '0128/UN.3.1.4/B/SKPLENOIPEMIRA/BLM/VIII/2026',
  NULL,
  'SKPLENOIPEMIRA',
  'B_EXTERNAL',
  'SK Pleno I PEMIRA',
  'Pengesahan pembukaan rangkaian musyawarah pleno persiapan regulasi pemilihan umum raya.',
  'forum_pleno',
  '2026-08-01',
  'MONTH',
  'VIII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  94,
  28,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0128_v1',
  'doc_sk_2026_0128',
  1,
  'https://drive.google.com/file/d/1M0TuPZRIPAluMRo9-pT47EYeB81lM1M9/view?usp=sharing',
  '0128_UN.3.1.4_B_SKPLENOIPEMIRA_BLM_VIII_2026 - SK Pleno I SIDANG UU PEMIRA 2026.docx.pdf',
  'application/pdf',
  524288,
  '1a0aaaaaaaaaaaaa9aaa47eaeb81aa1a90000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0128_v1' WHERE "id" = 'doc_sk_2026_0128';

-- 0129/UN.3.1.4/B/SKUUPEMIRA/BLM/VIII/2026: SK Pengesahan UU PEMIRA
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0129',
  'sk-2026-0129',
  'dt_sk',
  2026,
  129,
  '0129/UN.3.1.4/B/SKUUPEMIRA/BLM/VIII/2026',
  NULL,
  'SKUUPEMIRA',
  'B_EXTERNAL',
  'SK Pengesahan UU PEMIRA',
  'Surat Keputusan pengesahan naskah resmi Undang-Undang Pemilihan Umum Raya Mahasiswa FEB UNAIR.',
  'forum_pleno',
  '2026-08-01',
  'MONTH',
  'VIII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  245,
  91,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0129_v1',
  'doc_sk_2026_0129',
  1,
  'https://drive.google.com/file/d/1MZvkEhvhbpss7yqv1rdsxgOwk6BAOr8g/view?usp=sharing',
  '0129_UN.3.1.4_B_SKUUPEMIRA_BLM_VIII_2026 - SK Pengesahan UU PEMIRA 2026.pdf',
  'application/pdf',
  524288,
  '1aaaaeaaabaaa7aaa1adaaaaaa6baaa8a0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0129_v1' WHERE "id" = 'doc_sk_2026_0129';

-- 0130/UN.3.1.4/B/SKPLENOIIPEMIRA/BLM/VIII/2026: SK Pleno II PEMIRA
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0130',
  'sk-2026-0130',
  'dt_sk',
  2026,
  130,
  '0130/UN.3.1.4/B/SKPLENOIIPEMIRA/BLM/VIII/2026',
  NULL,
  'SKPLENOIIPEMIRA',
  'B_EXTERNAL',
  'SK Pleno II PEMIRA',
  'Keputusan penetapan kuota pemilih dan pembagian daerah pemilihan pemilihan umum raya mahasiswa.',
  'forum_pleno',
  '2026-08-01',
  'MONTH',
  'VIII',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  110,
  33,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0130_v1',
  'doc_sk_2026_0130',
  1,
  'https://drive.google.com/file/d/1T_ZCpyxbNYJydNMDiG0qlm8nPKnsREGf/view?usp=sharing',
  '0130_UN.3.1.4_B_SKPLENOIIPEMIRA_BLM_VIII_2026 - SK Pleno II SIDANG UU PEMIRA 2026.pdf',
  'application/pdf',
  524288,
  '1aaacaaabaaaadaadaa0aaa8aaaaaaeaf0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0130_v1' WHERE "id" = 'doc_sk_2026_0130';

-- 0141/UN.3.1.4/A/SKPLENOI/BLM/IX/2026: SK Sidang Pleno I (Sidang pleno part 2)
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0141',
  'sk-2026-0141',
  'dt_sk',
  2026,
  141,
  '0141/UN.3.1.4/A/SKPLENOI/BLM/IX/2026',
  NULL,
  'SKPLENOI',
  'A_INTERNAL',
  'SK Sidang Pleno I (Sidang pleno part 2)',
  'Pembukaan sidang pleno lanjutan September untuk evaluasi kelembagaan kemahasiswaan.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  48,
  12,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0141_v1',
  'doc_sk_2026_0141',
  1,
  'https://drive.google.com/file/d/1Ybpg4_K1ojp5y9mJTLFRNjE2hX-4rc5B/view?usp=sharing',
  '0141_UN.3.1.4_A_SKPLENOI_BLM_IX_2026 - SK Pleno I Sidang Pleno Part 2.pdf',
  'application/pdf',
  524288,
  '1abaa4aa1aaa5a9aaaafaaae2aaa4ac5b0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0141_v1' WHERE "id" = 'doc_sk_2026_0141';

-- 0142/UN.3.1.4/B/SKPLENOII/BLM/IX/2026: SK Sidang Pleno II (sidang pleno part 2)
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0142',
  'sk-2026-0142',
  'dt_sk',
  2026,
  142,
  '0142/UN.3.1.4/B/SKPLENOII/BLM/IX/2026',
  NULL,
  'SKPLENOII',
  'B_EXTERNAL',
  'SK Sidang Pleno II (sidang pleno part 2)',
  'Pengesahan rekomendasi eksternal pembinaan organisasi kemahasiswaan tingkat program studi.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  54,
  16,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0142_v1',
  'doc_sk_2026_0142',
  1,
  'https://drive.google.com/file/d/1RWKNJ9u47eb7OV9Pk18LK0k8k3UojKSk/view?usp=sharing',
  '0142_UN.3.1.4_B_SKPLENOII_BLM_IX_2026 - SK Pleno II Sidang Pleno Part 2.docx',
  'application/pdf',
  524288,
  '1aaaaa9a47eb7aa9aa18aa0a8a3aaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0142_v1' WHERE "id" = 'doc_sk_2026_0142';

-- 0143/UN.3.1.4/A/SKPLENOIII/BLM/IX/2026: SK Sidang Pleno III
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0143',
  'sk-2026-0143',
  'dt_sk',
  2026,
  143,
  '0143/UN.3.1.4/A/SKPLENOIII/BLM/IX/2026',
  NULL,
  'SKPLENOIII',
  'A_INTERNAL',
  'SK Sidang Pleno III',
  'Keputusan internal persidangan pleno ketiga BLM bulan September 2026.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  39,
  8,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0143_v1',
  'doc_sk_2026_0143',
  1,
  'https://drive.google.com/file/d/1zFAACeGWkFEz7sYErdhPJ4sWvK-YFlNU/view?usp=sharing',
  '0146_UN.3.1.4_A_SKPLENOIII_BLM_IX_2026 - SK Pleno III Sidang Pleno Part 2.pdf',
  'application/pdf',
  524288,
  '1afaaceaaafea7aaeadaaa4aaaaaafaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0143_v1' WHERE "id" = 'doc_sk_2026_0143';

-- 0144/UN.3.1.4/B/SKPLENOIV/BLM/IX/2026: SK Sidang Pleno IV
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0144',
  'sk-2026-0144',
  'dt_sk',
  2026,
  144,
  '0144/UN.3.1.4/B/SKPLENOIV/BLM/IX/2026',
  NULL,
  'SKPLENOIV',
  'B_EXTERNAL',
  'SK Sidang Pleno IV',
  'Pengesahan tindak lanjut evaluasi program kerja BEM FEB UNAIR triwulan ketiga.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  44,
  10,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;

-- 0145/UN.3.1.4/B/SKPLENOV/BLM/IX/2026: SK Sidang Pleno V
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0145',
  'sk-2026-0145',
  'dt_sk',
  2026,
  145,
  '0145/UN.3.1.4/B/SKPLENOV/BLM/IX/2026',
  NULL,
  'SKPLENOV',
  'B_EXTERNAL',
  'SK Sidang Pleno V',
  'Keputusan pengesahan penutupan sesi pleno maraton awal September 2026.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  37,
  7,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0145_v1',
  'doc_sk_2026_0145',
  1,
  'https://drive.google.com/file/d/12leW5oqpWS8mxdqKRAv0vDRjr0_Zi4g9/view?usp=sharing',
  '0145_UN.3.1.4_B_SKPLENOV_BLM_IX_2026 - SK Pleno V Sidang Pleno Part 2.pdf',
  'application/pdf',
  524288,
  '12aea5aaaaa8aadaaaaa0adaaa0aaa4a90000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0145_v1' WHERE "id" = 'doc_sk_2026_0145';

-- 0146/UN.3.1.4/A/SKAGENDAACARA/BLM/IX/2026: SK Agenda Acara Sidang Pleno
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0146',
  'sk-2026-0146',
  'dt_sk',
  2026,
  146,
  '0146/UN.3.1.4/A/SKAGENDAACARA/BLM/IX/2026',
  NULL,
  'SKAGENDAACARA',
  'A_INTERNAL',
  'SK Agenda Acara Sidang Pleno',
  'Penetapan jadwal acara Sidang Pleno 5 September 2026.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  31,
  6,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0146_v1',
  'doc_sk_2026_0146',
  1,
  'https://drive.google.com/file/d/1AWKcUL8KSGMBWKe7cbZiHlR8j3pACZQu/view?usp=sharing',
  '0146_UN.3.1.4_A_SKAGENDAACARA_BLM_IX_2026 - SK Agenda Acara Sidang Pleno Part 2.pdf',
  'application/pdf',
  524288,
  '1aaacaa8aaaabaae7cbaaaaa8a3aacaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0146_v1' WHERE "id" = 'doc_sk_2026_0146';

-- 0147/UN.3.1.4/A/SKTATATERTIB/BLM/IX/2026: SK Tata Tertib Sidang Pleno
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0147',
  'sk-2026-0147',
  'dt_sk',
  2026,
  147,
  '0147/UN.3.1.4/A/SKTATATERTIB/BLM/IX/2026',
  NULL,
  'SKTATATERTIB',
  'A_INTERNAL',
  'SK Tata Tertib Sidang Pleno',
  'Pemberlakuan tata tertib sidang pada sesi persidangan pleno September 2026.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  42,
  9,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0147_v1',
  'doc_sk_2026_0147',
  1,
  'https://drive.google.com/file/d/1ie8C6ShCzFjWfTU8_DGZ0qUYrRmwu4fO/view?usp=sharing',
  '0147_UN.3.1.4_A_SKTATATERTIB_BLM_IX_2026 - SK Tata Tertib Sidang Pleno Part 2.pdf',
  'application/pdf',
  524288,
  '1ae8c6aacafaafaa8adaa0aaaaaaaa4fa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0147_v1' WHERE "id" = 'doc_sk_2026_0147';

-- 0148/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026: SK Kepengurusan Sementara LPPM SEKTOR
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0148',
  'sk-2026-0148',
  'dt_sk',
  2026,
  148,
  '0148/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026',
  NULL,
  'SKKEPENGURUSANSEMENTARA',
  'B_EXTERNAL',
  'SK Kepengurusan Sementara LPPM SEKTOR',
  'Penetapan struktur kepengurusan sementara (caretaker) LPPM SEKTOR demi kelancaran organisasi penerbitan kampus.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  118,
  39,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0148_v1',
  'doc_sk_2026_0148',
  1,
  'https://drive.google.com/file/d/1s9ERa_kXzmJQsCXei2YFCoV-gPO_fPov/view?usp=sharing',
  '0148_UN.3.1.4_B_SKKEPENGURUSANSEMENTARA_.pdf',
  'application/pdf',
  524288,
  '1a9eaaaaaaaaaacaea2afcaaaaaaafaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0148_v1' WHERE "id" = 'doc_sk_2026_0148';

-- 0149/UN.3.1.4/A/SKPENGUNDURANDIRIBLM/BLM/IX/2026: SK Pengunduran Diri Anggota BLM
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0149',
  'sk-2026-0149',
  'dt_sk',
  2026,
  149,
  '0149/UN.3.1.4/A/SKPENGUNDURANDIRIBLM/BLM/IX/2026',
  NULL,
  'SKPENGUNDURANDIRIBLM',
  'A_INTERNAL',
  'SK Pengunduran Diri Anggota BLM',
  'Persetujuan permohonan pengunduran diri anggota legislatif mahasiswa pada rapat pleno September.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  60,
  14,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0149_v1',
  'doc_sk_2026_0149',
  1,
  'https://drive.google.com/file/d/1j8cvndvQaHbSlPXGXK5qIrF3JNUnpqEt/view?usp=sharing',
  '0149_UN.3.1.4_A_SKPENGUNDURANDIRIBLM_BLM_IX_2026 - SK Pengunduran Diri Anggota BLM.pdf',
  'application/pdf',
  524288,
  '1a8caadaaaabaaaaaaa5aaaf3aaaaaaea0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0149_v1' WHERE "id" = 'doc_sk_2026_0149';

-- 0150/UN.3.1.4/A/SKTPEMBERHENTIANANGGOTA/BLM/IX/2026: SK Pemberhentian Anggota BLM
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0150',
  'sk-2026-0150',
  'dt_sk',
  2026,
  150,
  '0150/UN.3.1.4/A/SKTPEMBERHENTIANANGGOTA/BLM/IX/2026',
  NULL,
  'SKTPEMBERHENTIANANGGOTA',
  'A_INTERNAL',
  'SK Pemberhentian Anggota BLM',
  'Pemberhentian dengan hormat anggota Badan Legislatif Mahasiswa FEB UNAIR.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  88,
  25,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0150_v1',
  'doc_sk_2026_0150',
  1,
  'https://drive.google.com/file/d/1inrGt9qQb35SkTmqO16sqSh_wuLea_sz/view?usp=sharing',
  '0150_UN.3.1.4_A_SKTPEMBERHENTIANANGGOTA_BLM_IX_2026 - SK Pemberhentian Anggota BLM.pdf',
  'application/pdf',
  524288,
  '1aaaaa9aab35aaaaaa16aaaaaaaaeaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0150_v1' WHERE "id" = 'doc_sk_2026_0150';

-- 0151/UN.3.1.4/B/SKREKOMENDASIPEMIRA/BLM/IX/2026: SK Rekomendasi Penetapan Calon Penyelenggara PEMIRA
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0151',
  'sk-2026-0151',
  'dt_sk',
  2026,
  151,
  '0151/UN.3.1.4/B/SKREKOMENDASIPEMIRA/BLM/IX/2026',
  NULL,
  'SKREKOMENDASIPEMIRA',
  'B_EXTERNAL',
  'SK Rekomendasi Penetapan Calon Penyelenggara PEMIRA',
  'Rekomendasi nama-nama calon anggota Komisi Pemilihan Umum Mahasiswa (KPUM) dan Panwaslu kepada Dekanat.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  153,
  47,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0151_v1',
  'doc_sk_2026_0151',
  1,
  'https://drive.google.com/file/d/1N2IS7v1buBQ0cGhz2l_jRXhroEbxpRdG/view?usp=sharing',
  '0151_UN.3.1.4_B_SKREKOMENDASIPEMIRA_BLM_.pdf',
  'application/pdf',
  524288,
  '1a2aa7a1baba0caaa2aaaaaaaaebaaada0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0151_v1' WHERE "id" = 'doc_sk_2026_0151';

-- 0152/UN.3.1.4/B/SKPEMANGGILANKHUSUS/BLM/IX/2026: SK Pemanggilan Khusus Pleno
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0152',
  'sk-2026-0152',
  'dt_sk',
  2026,
  152,
  '0152/UN.3.1.4/B/SKPEMANGGILANKHUSUS/BLM/IX/2026',
  NULL,
  'SKPEMANGGILANKHUSUS',
  'B_EXTERNAL',
  'SK Pemanggilan Khusus Pleno',
  'Pemanggilan khusus terhadap penanggung jawab kegiatan mahasiswa untuk memberikan klarifikasi pertanggungjawaban.',
  'forum_pleno',
  '2026-09-05',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  81,
  20,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0152_v1',
  'doc_sk_2026_0152',
  1,
  'https://drive.google.com/file/d/1MK8bo0xrLWYpQmBh07y1L8_FuMIe-O08/view?usp=sharing',
  '0152_UN.3.1.4_B_SKPEMANGGILANKHUSUS_BLM_IX_2026 - SK Pemanggilan Khusus Ketua LPPM SEKTOR.pdf',
  'application/pdf',
  524288,
  '1aa8ba0aaaaaaaaba07a1a8afaaaeaa080000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0152_v1' WHERE "id" = 'doc_sk_2026_0152';

-- 0158/UN.3.1.4/A/SKAGENDAACARAPLENO3/BLM/IX/2026: SK Agenda Acara Sidang Pleno Jilid 3
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0158',
  'sk-2026-0158',
  'dt_sk',
  2026,
  158,
  '0158/UN.3.1.4/A/SKAGENDAACARAPLENO3/BLM/IX/2026',
  NULL,
  'SKAGENDAACARAPLENO3',
  'A_INTERNAL',
  'SK Agenda Acara Sidang Pleno Jilid 3',
  'Penetapan susunan mata acara Sidang Pleno Jilid 3 tanggal 12 September 2026.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  33,
  7,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0158_v1',
  'doc_sk_2026_0158',
  1,
  'https://drive.google.com/file/d/1OraP_8MeXfKKRn3ptNPDRnoDyru-EHfY/view?usp=sharing',
  '0158_UN.3.1.4_A_SKAGENDAACARAPLENO3_BLM_IX_2026 - SK Agenda Acara Sidang Pleno Jilid 3.pdf',
  'application/pdf',
  524288,
  '1aaaaa8aeafaaaa3aaaadaaadaaaaeafa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0158_v1' WHERE "id" = 'doc_sk_2026_0158';

-- 0159/UN.3.1.4/A/SKTATATERTIB/BLM/IX/2026: SK Tata Tertib Sidang Pleno Jilid 3
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0159',
  'sk-2026-0159',
  'dt_sk',
  2026,
  159,
  '0159/UN.3.1.4/A/SKTATATERTIB/BLM/IX/2026',
  NULL,
  'SKTATATERTIB',
  'A_INTERNAL',
  'SK Tata Tertib Sidang Pleno Jilid 3',
  'Pemberlakuan peraturan tata tertib pada Sidang Pleno Jilid 3.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  29,
  5,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0159_v1',
  'doc_sk_2026_0159',
  1,
  'https://drive.google.com/file/d/1cabPhvlbGyfm-rbxY8GU7RGV_Y2i12UJ/view?usp=sharing',
  '0159_UN.3.1.4_A_SKTATATERTIB_BLM_IX_2026 - SK Tata Tertib Sidang Pleno Jilid 3.pdf',
  'application/pdf',
  524288,
  '1cabaaaabaafaaabaa8aa7aaaaa2a12aa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0159_v1' WHERE "id" = 'doc_sk_2026_0159';

-- 0160/UN.3.1.4/A/SKPLENOI/BLM/IX/2026: SK Sidang Pleno I
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0160',
  'sk-2026-0160',
  'dt_sk',
  2026,
  160,
  '0160/UN.3.1.4/A/SKPLENOI/BLM/IX/2026',
  NULL,
  'SKPLENOI',
  'A_INTERNAL',
  'SK Sidang Pleno I',
  'Ketetapan pembukaan sesi pertama Sidang Pleno 12 September 2026.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  36,
  8,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0160_v1',
  'doc_sk_2026_0160',
  1,
  'https://drive.google.com/file/d/1ARG_dR6k62zzFc5rLKD0E8UsNbZ9AK45/view?usp=sharing',
  '0160_UN.3.1.4_A_SKPLENOI_BLM_IX_2026 - SK Sidang Pleno I.pdf',
  'application/pdf',
  524288,
  '1aaaada6a62aafc5aaad0e8aaaba9aa450000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0160_v1' WHERE "id" = 'doc_sk_2026_0160';

-- 0161/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026: SK Pengesahan Kepengurusan Sementara LPPM SEKTOR
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0161',
  'sk-2026-0161',
  'dt_sk',
  2026,
  161,
  '0161/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026',
  NULL,
  'SKKEPENGURUSANSEMENTARA',
  'B_EXTERNAL',
  'SK Pengesahan Kepengurusan Sementara LPPM SEKTOR',
  'Pengesahan formal daftar nama dan pembagian tugas kepengurusan sementara LPPM SEKTOR.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  78,
  23,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0161_v1',
  'doc_sk_2026_0161',
  1,
  'https://drive.google.com/file/d/1jiSBl_JFk9nffvg4UFAIKcF56lUiJ9Bi/view?usp=sharing',
  '0161_UN.3.1.4_B_SKKEPENGURUSANSEMENTARA_BLM_IX_2026 - SK Pengesahan Kepengurusan Sementara LPPM SEKTOR.pdf',
  'application/pdf',
  524288,
  '1aaabaaafa9affaa4afaaacf56aaaa9ba0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0161_v1' WHERE "id" = 'doc_sk_2026_0161';

-- 0162/UN.3.1.4/B/SKPLENOII/BLM/IX/2026: SK Sidang Pleno II
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0162',
  'sk-2026-0162',
  'dt_sk',
  2026,
  162,
  '0162/UN.3.1.4/B/SKPLENOII/BLM/IX/2026',
  NULL,
  'SKPLENOII',
  'B_EXTERNAL',
  'SK Sidang Pleno II',
  'Keputusan persetujuan rekomendasi pembinaan ormawa fakultas pada sesi kedua pleno.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  40,
  9,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0162_v1',
  'doc_sk_2026_0162',
  1,
  'https://drive.google.com/file/d/1gatosJCIpxFKWIfsDcT8zUc-KjsEhq5h/view?usp=sharing',
  '0162_UN.3.1.4_B_SKPLENOII_BLM_IX_2026 - SK Sidang Pleno II.pdf',
  'application/pdf',
  524288,
  '1aaaaaacaaafaaafadca8aacaaaaeaa5a0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0162_v1' WHERE "id" = 'doc_sk_2026_0162';

-- 0163/UN.3.1.4/B/SKREKOMENDASIPEMIRA/BLM/IX/2026: SK Rekomendasi Penetapan Calon Penyelenggara PEMIRA (KPUM, Panwaslu, DKPP)
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0163',
  'sk-2026-0163',
  'dt_sk',
  2026,
  163,
  '0163/UN.3.1.4/B/SKREKOMENDASIPEMIRA/BLM/IX/2026',
  NULL,
  'SKREKOMENDASIPEMIRA',
  'B_EXTERNAL',
  'SK Rekomendasi Penetapan Calon Penyelenggara PEMIRA (KPUM, Panwaslu, DKPP)',
  'Rekomendasi penetapan susunan lengkap calon penyelenggara Pemilihan Umum Raya Mahasiswa meliputi KPUM, Bawaslu Mahasiswa, dan Dewan Kehormatan Penyelenggara Pemilu.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  220,
  84,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0163_v1',
  'doc_sk_2026_0163',
  1,
  'https://drive.google.com/file/d/1WUl4AHTf5PSthZxZtF73QnjyrPJMDiwN/view?usp=sharing',
  '0163_UN.3.1.4_B_SKREKOMENDASIPEMIRA_BLM_IX_2026 - SK Rekomendasi Penetapan Calon Penyelenggara PEMIRA.pdf',
  'application/pdf',
  524288,
  '1aaa4aaaf5aaaaaaaaf73aaaaaaaadaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0163_v1' WHERE "id" = 'doc_sk_2026_0163';

-- 0164/UN.3.1.4/B/SKPLENOIII/BLM/IX/2026: SK Sidang Pleno III
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0164',
  'sk-2026-0164',
  'dt_sk',
  2026,
  164,
  '0164/UN.3.1.4/B/SKPLENOIII/BLM/IX/2026',
  NULL,
  'SKPLENOIII',
  'B_EXTERNAL',
  'SK Sidang Pleno III',
  'Keputusan penetapan evaluasi laporan kemahasiswaan pada sesi pleno ketiga.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  38,
  7,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0164_v1',
  'doc_sk_2026_0164',
  1,
  'https://drive.google.com/file/d/1xTUwq82PEkBPIS4lwahBPsuO3HHatn7F/view?usp=sharing',
  '0164_UN.3.1.4_B_SKPLENOIII_BLM_IX_2026 - SK Sidang Pleno III.pdf',
  'application/pdf',
  524288,
  '1aaaaa82aeabaaa4aaaabaaaa3aaaaa7f0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0164_v1' WHERE "id" = 'doc_sk_2026_0164';

-- 0165/UN.3.1.4/B/SKPERINGATANOSJUR/BLM/IX/2026: SK Peringatan Pelaksanaan Ospek Jurusan FEB UNAIR 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0165',
  'sk-2026-0165',
  'dt_sk',
  2026,
  165,
  '0165/UN.3.1.4/B/SKPERINGATANOSJUR/BLM/IX/2026',
  NULL,
  'SKPERINGATANOSJUR',
  'B_EXTERNAL',
  'SK Peringatan Pelaksanaan Ospek Jurusan FEB UNAIR 2026',
  'Surat Keputusan peringatan keras kepada panitia Ospek Jurusan terkait adanya ketidaksesuaian penugasan dengan TAP Kebijakan Orientasi Studi BLM.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  295,
  104,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0165_v1',
  'doc_sk_2026_0165',
  1,
  'https://drive.google.com/file/d/1H5nwsX2oi1a0-0z6FauHY1iI0eNAMlUD/view?usp=sharing',
  '0165_UN.3.1.4_B_SKPERINGATANOSJUR_BLM_IX_2026 - SK Peringatan Pelaksanaan Ospek Jurusan FEB UNAIR 2026.pdf',
  'application/pdf',
  524288,
  '1a5aaaa2aa1a0a0a6faaaa1aa0eaaaaad0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0165_v1' WHERE "id" = 'doc_sk_2026_0165';

-- 0166/UN.3.1.4/B/SKPEMANGGILANOSJUR/BLM/IX/2026: SK Pemanggilan Khusus Panitia Ospek Jurusan HIMA Ekonomi Islam, Akuntansi, dan Ilmu Ekonomi
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0166',
  'sk-2026-0166',
  'dt_sk',
  2026,
  166,
  '0166/UN.3.1.4/B/SKPEMANGGILANOSJUR/BLM/IX/2026',
  NULL,
  'SKPEMANGGILANOSJUR',
  'B_EXTERNAL',
  'SK Pemanggilan Khusus Panitia Ospek Jurusan HIMA Ekonomi Islam, Akuntansi, dan Ilmu Ekonomi',
  'Instruksi pemanggilan pimpinan panitia Ospek tiga jurusan untuk menghadiri sidang dengar pendapat di hadapan Badan Legislatif Mahasiswa.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  240,
  79,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0166_v1',
  'doc_sk_2026_0166',
  1,
  'https://drive.google.com/file/d/1UAwY-KM4tqCH9PHaDELPbdv-CcM2d6VN/view?usp=sharing',
  '0166_UN.3.1.4_B_SKPEMANGGILANOSJUR_BLM_IX_2026 - SK Pemanggilan Khusus Panitia Ospek Jurusan HIMA EKIS, Akuntansi, dan IE.pdf',
  'application/pdf',
  524288,
  '1aaaaaaa4aaca9aaadeaabdaacca2d6aa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0166_v1' WHERE "id" = 'doc_sk_2026_0166';

-- 0167/UN.3.1.4/B/SKPLENOIV/BLM/IX/2026: SK Sidang Pleno IV
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0167',
  'sk-2026-0167',
  'dt_sk',
  2026,
  167,
  '0167/UN.3.1.4/B/SKPLENOIV/BLM/IX/2026',
  NULL,
  'SKPLENOIV',
  'B_EXTERNAL',
  'SK Sidang Pleno IV',
  'Pengesahan tanggapan hasil dengar pendapat ormawa pada persidangan pleno keempat.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  42,
  10,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0167_v1',
  'doc_sk_2026_0167',
  1,
  'https://drive.google.com/file/d/1YepljvUcToHZCTsyejHPO5RLgRXQjTU9/view?usp=sharing',
  '0167_UN.3.1.4_B_SKPLENOIV_BLM_IX_2026 - SK Sidang Pleno IV.pdf',
  'application/pdf',
  524288,
  '1aeaaaaacaaaacaaaeaaaa5aaaaaaaaa90000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0167_v1' WHERE "id" = 'doc_sk_2026_0167';

-- 0168/UN.3.1.4/B/SKPERINGATANBAWASHIM/BLM/IX/2026: SK Peringatan Ketidakhadiran Forum Bawashim kepada HIMA Manajemen
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0168',
  'sk-2026-0168',
  'dt_sk',
  2026,
  168,
  '0168/UN.3.1.4/B/SKPERINGATANBAWASHIM/BLM/IX/2026',
  NULL,
  'SKPERINGATANBAWASHIM',
  'B_EXTERNAL',
  'SK Peringatan Ketidakhadiran Forum Bawashim kepada HIMA Manajemen',
  'Surat Peringatan atas tidak terpenuhinya kewajiban kehadiran pengurus HIMA Manajemen dalam forum pengawasan ormawa.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  160,
  45,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0168_v1',
  'doc_sk_2026_0168',
  1,
  'https://drive.google.com/file/d/1fQgSCEi_eqPpxy67nwT-WwyK6HYXqGwq/view?usp=sharing',
  '0168_UN.3.1.4_B_SKPERINGATANBAWASHIM_BLM_IX_2026 - SK Peringatan Ketidakhadiran Forum Bawashim kepada HIMA Manajemen.pdf',
  'application/pdf',
  524288,
  '1faaaceaaeaaaaa67aaaaaaaa6aaaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0168_v1' WHERE "id" = 'doc_sk_2026_0168';

-- 0169/UN.3.1.4/B/SKPEMANGGILANHIMAMENE/BLM/IX/2026: SK Pemanggilan Khusus kepada HIMA Manajemen
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0169',
  'sk-2026-0169',
  'dt_sk',
  2026,
  169,
  '0169/UN.3.1.4/B/SKPEMANGGILANHIMAMENE/BLM/IX/2026',
  NULL,
  'SKPEMANGGILANHIMAMENE',
  'B_EXTERNAL',
  'SK Pemanggilan Khusus kepada HIMA Manajemen',
  'Perintah hadir resmi kepada Ketua dan Pengurus HIMA Manajemen untuk agenda klarifikasi di hadapan Komisi Pengawasan BLM.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  175,
  52,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0169_v1',
  'doc_sk_2026_0169',
  1,
  'https://drive.google.com/file/d/1x_HjBMXohOMkVSdt6WftTbnK0EhQFAb2/view?usp=sharing',
  '0169_UN.3.1.4_B_SKPEMANGGILANHIMAMENE_BLM_IX_2026 - SK Pemanggilan Khusus kepada HIMA Manajemen.pdf',
  'application/pdf',
  524288,
  '1aaaabaaaaaaaaada6afaabaa0eaafab20000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0169_v1' WHERE "id" = 'doc_sk_2026_0169';

-- 0170/UN.3.1.4/B/SKPLENOV/BLM/IX/2026: SK Sidang Pleno V
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0170',
  'sk-2026-0170',
  'dt_sk',
  2026,
  170,
  '0170/UN.3.1.4/B/SKPLENOV/BLM/IX/2026',
  NULL,
  'SKPLENOV',
  'B_EXTERNAL',
  'SK Sidang Pleno V',
  'Penutupan dan penetapan seluruh keputusan resmi Sidang Pleno Jilid 3 BLM FEB UNAIR September 2026.',
  'forum_pleno',
  '2026-09-12',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  56,
  14,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0170_v1',
  'doc_sk_2026_0170',
  1,
  'https://drive.google.com/file/d/1zw95FfLSv95GIwm5OPTBvolZYpAUqdg0/view?usp=sharing',
  '0170_UN.3.1.4_B_SKPLENOV_BLM_IX_2026 - SK Sidang Pleno V.pdf',
  'application/pdf',
  524288,
  '1aa95ffaaa95aaaa5aaabaaaaaaaaada00000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0170_v1' WHERE "id" = 'doc_sk_2026_0170';

-- 03/UU/BLMFEBUNAIR/II/2026: Konstitusi Organisasi Mahasiswa (Konstitusi Ormawa) BLM FEB UNAIR 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_uu_2026_03',
  'uu-2026-03',
  'dt_uu',
  2026,
  3,
  '03/UU/BLMFEBUNAIR/II/2026',
  NULL,
  NULL,
  NULL,
  'Konstitusi Organisasi Mahasiswa (Konstitusi Ormawa) BLM FEB UNAIR 2026',
  'Konstitusi dasar yang mengatur kedudukan, kedaulatan, struktur kelembagaan, mekanisme kerja, serta tata hubungan antar-organisasi kemahasiswaan di lingkungan Fakultas Ekonomi dan Bisnis Universitas Airlangga.',
  'forum_pleno',
  '2026-02-15',
  'MONTH',
  'II',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  318,
  142,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_uu_2026_03_v1',
  'doc_uu_2026_03',
  1,
  'https://drive.google.com/file/d/1rTdyKsRC3CcAyJuGwtE4ABa7iRXurOQL/view?usp=sharing',
  'KONSTITUSI ORMAWA BLM FEB UNAIR 2026.pdf',
  'application/pdf',
  524288,
  '1aadaaaac3ccaaaaaaae4aba7aaaaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_uu_2026_03_v1' WHERE "id" = 'doc_uu_2026_03';

-- 04/UU/BLMFEBUNAIR/III/2026: Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) BLM FEB UNAIR 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_uu_2026_04',
  'uu-2026-04',
  'dt_uu',
  2026,
  4,
  '04/UU/BLMFEBUNAIR/III/2026',
  NULL,
  NULL,
  NULL,
  'Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) BLM FEB UNAIR 2026',
  'Pedoman konstitusional internal yang mengatur fungsi legislasi, pengawasan, dan aspirasi, hak serta kewajiban anggota parlemen, struktur komisi dan departemen, serta tata kelola persidangan BLM FEB UNAIR.',
  'forum_pleno',
  '2026-03-10',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  289,
  127,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_uu_2026_04_v1',
  'doc_uu_2026_04',
  1,
  'https://drive.google.com/file/d/1yd7MR148E9ijNkdzCCiyK_y-Tm-zuJD2/view?usp=sharing',
  'AD-ART BLM FEB UNAIR 2026.pdf',
  'application/pdf',
  524288,
  '1ad7aa148e9aaaadaccaaaaaaaaaaaad20000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_uu_2026_04_v1' WHERE "id" = 'doc_uu_2026_04';

-- 006/LP/BLM/IX/2026: Surat Rekomendasi DKPP PEMIRA FEB UNAIR 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_lp_2026_006',
  'lp-2026-006',
  'dt_lp',
  2026,
  6,
  '006/LP/BLM/IX/2026',
  NULL,
  NULL,
  NULL,
  'Surat Rekomendasi DKPP PEMIRA FEB UNAIR 2026',
  'Rekomendasi resmi dan berita acara terkait pembentukan serta penetapan Dewan Kehormatan Penyelenggara Pemilihan Umum Raya (DKPP PEMIRA) FEB UNAIR 2026.',
  'forum_pleno',
  '2026-09-15',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  96,
  38,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_lp_2026_006_v1',
  'doc_lp_2026_006',
  1,
  'https://drive.google.com/file/d/1NFwi1hicsOI20I9-A1xiZB1sW1UTTLGS/view?usp=sharing',
  'Surat Rekomendasi DKPP PEMIRA FEB UNAIR 2026.pdf',
  'application/pdf',
  524288,
  '1afaa1aacaaa20a9aa1aaab1aa1aaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_lp_2026_006_v1' WHERE "id" = 'doc_lp_2026_006';

-- 0005/UN.3.1.4/B/SKPLENOIIKONSTITUSIORMAWA/BLM/II/2026: SK Pleno II Pengesahan UU Konstitusi Ormawa 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0005',
  'sk-2026-0005',
  'dt_sk',
  2026,
  5,
  '0005/UN.3.1.4/B/SKPLENOIIKONSTITUSIORMAWA/BLM/II/2026',
  NULL,
  'SKPLENOIIKONSTITUSIORMAWA',
  'B_EXTERNAL',
  'SK Pleno II Pengesahan UU Konstitusi Ormawa 2026',
  'Surat Keputusan Sidang Pleno II tentang pengesahan Undang-Undang Konstitusi Organisasi Mahasiswa (Konstitusi Ormawa) FEB UNAIR Tahun 2026.',
  'forum_pleno',
  '2026-02-15',
  'MONTH',
  'II',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  88,
  34,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0005_v1',
  'doc_sk_2026_0005',
  1,
  'https://drive.google.com/file/d/10be7Dq1Y7jvf6pauF5ClboppuNB8SC9S/view?usp=sharing',
  '0005_SK Pleno II Pengesahan UU Konstitusi Ormawa 2026.pdf',
  'application/pdf',
  524288,
  '10be7da1a7aaf6aaaf5cabaaaaab8ac9a0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0005_v1' WHERE "id" = 'doc_sk_2026_0005';

-- 0006/UN.3.1.4/B/SKPLENOIKONSTITUSIORMAWA/BLM/II/2026: SK Pleno I Konstitusi Ormawa 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0006',
  'sk-2026-0006',
  'dt_sk',
  2026,
  6,
  '0006/UN.3.1.4/B/SKPLENOIKONSTITUSIORMAWA/BLM/II/2026',
  NULL,
  'SKPLENOIKONSTITUSIORMAWA',
  'B_EXTERNAL',
  'SK Pleno I Konstitusi Ormawa 2026',
  'Surat Keputusan Sidang Pleno I dalam rangkaian pembahasan dan penetapan agenda persidangan Konstitusi Ormawa FEB UNAIR 2026.',
  'forum_pleno',
  '2026-02-15',
  'MONTH',
  'II',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  64,
  21,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0006_v1',
  'doc_sk_2026_0006',
  1,
  'https://drive.google.com/file/d/1ZGPfQ7Vjmd5G5no85orkJsEXd8hqTZhN/view?usp=sharing',
  '0006_UN3.1.4_B_SKPLENOIKONSTITUSIORMAWA_BLM_II_2026 - SK Pleno I Konstitusi Ormawa 2026.pdf',
  'application/pdf',
  524288,
  '1aaafa7aaad5a5aa85aaaaaead8aaaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0006_v1' WHERE "id" = 'doc_sk_2026_0006';

-- 0007/UN.3.1.4/B/SKPENGESAHANPIMDANGTETAPKONSTITUSIORMAWA/BLM/II/2026: SK Pengesahan Presidium Sidang Tetap Konstitusi Ormawa 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0007',
  'sk-2026-0007',
  'dt_sk',
  2026,
  7,
  '0007/UN.3.1.4/B/SKPENGESAHANPIMDANGTETAPKONSTITUSIORMAWA/BLM/II/2026',
  NULL,
  'SKPENGESAHANPIMDANGTETAPKONSTITUSIORMAWA',
  'B_EXTERNAL',
  'SK Pengesahan Presidium Sidang Tetap Konstitusi Ormawa 2026',
  'Penetapan dan pengesahan jajaran Presidium Sidang Tetap yang memimpin jalannya persidangan Konstitusi Ormawa FEB UNAIR 2026.',
  'forum_pleno',
  '2026-02-15',
  'MONTH',
  'II',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  59,
  18,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0007_v1',
  'doc_sk_2026_0007',
  1,
  'https://drive.google.com/file/d/1mQ-U8MIGCmfeupIbIuCa-POOVjW8rSN4/view?usp=sharing',
  '0007_UN3.1.4_B_SKPENGESAHANPIMDANGTETAPKONSTITUSIORMAWA_BLM_II_2026 - SK Pengesahan Presidium Sidang Tetap Konstitusi Ormawa 2026.pdf',
  'application/pdf',
  524288,
  '1aaaa8aaacafeaaabaacaaaaaaaa8aaa40000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0007_v1' WHERE "id" = 'doc_sk_2026_0007';

-- 0008/UN.3.1.4/B/SKKRITERIAPIMDANGKONSTITUSIORMAWA/BLM/II/2026: SK Kriteria Presidium Sidang Konstitusi Ormawa 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0008',
  'sk-2026-0008',
  'dt_sk',
  2026,
  8,
  '0008/UN.3.1.4/B/SKKRITERIAPIMDANGKONSTITUSIORMAWA/BLM/II/2026',
  NULL,
  'SKKRITERIAPIMDANGKONSTITUSIORMAWA',
  'B_EXTERNAL',
  'SK Kriteria Presidium Sidang Konstitusi Ormawa 2026',
  'Keputusan mengenai syarat, kriteria, dan mekanisme pemilihan Presidium Sidang Konstitusi Ormawa FEB UNAIR 2026.',
  'forum_pleno',
  '2026-02-15',
  'MONTH',
  'II',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  54,
  16,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0008_v1',
  'doc_sk_2026_0008',
  1,
  'https://drive.google.com/file/d/1NkPYXh8bd3HIjqL66fLL7Ms3d_4xqUr-/view?usp=sharing',
  '0008_UN.3.1.4_B_SKKRITERIAPIMDANGKONSTITUSIORMAWA_BLM_II_2026 - SK Kriteria Presidium Sidang Konstitusi Ormawa 2026.pdf',
  'application/pdf',
  524288,
  '1aaaaaa8bd3aaaaa66faa7aa3da4aaaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0008_v1' WHERE "id" = 'doc_sk_2026_0008';

-- 0009/UN.3.1.4/B/SKTATATERTIBSIDANGKONSTITUSIORMAWA/BLM/II/2026: SK Tata Tertib Sidang Konstitusi Ormawa 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0009',
  'sk-2026-0009',
  'dt_sk',
  2026,
  9,
  '0009/UN.3.1.4/B/SKTATATERTIBSIDANGKONSTITUSIORMAWA/BLM/II/2026',
  NULL,
  'SKTATATERTIBSIDANGKONSTITUSIORMAWA',
  'B_EXTERNAL',
  'SK Tata Tertib Sidang Konstitusi Ormawa 2026',
  'Pengesahan tata tertib persidangan yang mengatur hak suara, kuorum, dan etika peserta Sidang Konstitusi Ormawa FEB UNAIR 2026.',
  'forum_pleno',
  '2026-02-15',
  'MONTH',
  'II',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  67,
  22,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0009_v1',
  'doc_sk_2026_0009',
  1,
  'https://drive.google.com/file/d/1b-3kltIy8LVE9IDXnl1Teyr1U_E1bj_j/view?usp=sharing',
  '0009_UN.3.1.4_B_SKTATATERTIBSIDANGKONSTITUSIORMAWA_BLM_II_2026 - SK Tata Tertib Sidang Konstitusi Ormawa 2026.pdf',
  'application/pdf',
  524288,
  '1ba3aaaaa8aae9adaaa1aeaa1aae1baaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0009_v1' WHERE "id" = 'doc_sk_2026_0009';

-- 0019/UN.3.1.4/B/SKRAKERBEM/BLM/III/2026: SK Rapat Kerja (RAKER) BEM FEB UNAIR 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0019',
  'sk-2026-0019',
  'dt_sk',
  2026,
  19,
  '0019/UN.3.1.4/B/SKRAKERBEM/BLM/III/2026',
  NULL,
  'SKRAKERBEM',
  'B_EXTERNAL',
  'SK Rapat Kerja (RAKER) BEM FEB UNAIR 2026',
  'Surat Keputusan pengesahan hasil Rapat Kerja dan rancangan program kerja Badan Eksekutif Mahasiswa (BEM) FEB UNAIR periode 2026.',
  'forum_kerja',
  '2026-03-01',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  94,
  31,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0019_v1',
  'doc_sk_2026_0019',
  1,
  'https://drive.google.com/file/d/1m72oDa8HoV4uPgWx7V9mnvxAegDvysBP/view?usp=sharing',
  '0019_SK RAKER BEM FEB UNAIR 2026.pdf',
  'application/pdf',
  524288,
  '1a72ada8aaa4aaaaa7a9aaaaaeadaaaba0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0019_v1' WHERE "id" = 'doc_sk_2026_0019';

-- 0042/UN.3.1.4/A/SKAGENDAACARAADART/BLM/III/2026: SK Agenda Acara Sidang AD-ART BLM 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0042',
  'sk-2026-0042',
  'dt_sk',
  2026,
  42,
  '0042/UN.3.1.4/A/SKAGENDAACARAADART/BLM/III/2026',
  NULL,
  'SKAGENDAACARAADART',
  'A_INTERNAL',
  'SK Agenda Acara Sidang AD-ART BLM 2026',
  'Penetapan susunan agenda acara persidangan pembahasan Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) BLM FEB UNAIR 2026.',
  'forum_pleno',
  '2026-03-10',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  61,
  19,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0042_v1',
  'doc_sk_2026_0042',
  1,
  'https://drive.google.com/file/d/1TiofOlennt5EkYk5cwCA4fFAk1gp6bDX/view?usp=sharing',
  '0042_SK Agenda Acara Sidang AD-ART BLM 2026.pdf',
  'application/pdf',
  524288,
  '1aaafaaeaaa5eaaa5caca4ffaa1aa6bda0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0042_v1' WHERE "id" = 'doc_sk_2026_0042';

-- 0043/UN.3.1.4/A/SKTATATERTIBADART/BLM/III/2026: SK Tata Tertib Sidang AD-ART BLM 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0043',
  'sk-2026-0043',
  'dt_sk',
  2026,
  43,
  '0043/UN.3.1.4/A/SKTATATERTIBADART/BLM/III/2026',
  NULL,
  'SKTATATERTIBADART',
  'A_INTERNAL',
  'SK Tata Tertib Sidang AD-ART BLM 2026',
  'Pengesahan tata tertib persidangan internal dalam rangka pembahasan dan penetapan AD/ART BLM FEB UNAIR 2026.',
  'forum_pleno',
  '2026-03-10',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  58,
  17,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0043_v1',
  'doc_sk_2026_0043',
  1,
  'https://drive.google.com/file/d/1TR6Ng1HyV8jrP7JXgaNeEzLOWUu16ncH/view?usp=sharing',
  '0043_SK Tata Tertib Sidang AD-ART BLM 2026.pdf',
  'application/pdf',
  524288,
  '1aa6aa1aaa8aaa7aaaaaeeaaaaaa16aca0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0043_v1' WHERE "id" = 'doc_sk_2026_0043';

-- 0044/UN.3.1.4/A/SKKRITERIAPIMDANGADART/BLM/III/2026: SK Kriteria Pemilihan Presidium Sidang AD-ART BLM 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0044',
  'sk-2026-0044',
  'dt_sk',
  2026,
  44,
  '0044/UN.3.1.4/A/SKKRITERIAPIMDANGADART/BLM/III/2026',
  NULL,
  'SKKRITERIAPIMDANGADART',
  'A_INTERNAL',
  'SK Kriteria Pemilihan Presidium Sidang AD-ART BLM 2026',
  'Penetapan kriteria dan tata cara pemilihan Presidium Sidang Tetap pada Sidang AD/ART BLM FEB UNAIR 2026.',
  'forum_pleno',
  '2026-03-10',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  52,
  15,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0044_v1',
  'doc_sk_2026_0044',
  1,
  'https://drive.google.com/file/d/1YG5-HalGIhgotViRjGKUVIXQZ8wEd5L7/view?usp=sharing',
  '0044_SK Kriteria Pemilihan Presidium Sidang AD-ART BLM 2026.pdf',
  'application/pdf',
  524288,
  '1aa5aaaaaaaaaaaaaaaaaaaaaa8aed5a70000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0044_v1' WHERE "id" = 'doc_sk_2026_0044';

-- 0045/UN.3.1.4/A/SKPIMDANGTETAPADART/BLM/III/2026: SK Presidium Sidang Tetap AD-ART BLM 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0045',
  'sk-2026-0045',
  'dt_sk',
  2026,
  45,
  '0045/UN.3.1.4/A/SKPIMDANGTETAPADART/BLM/III/2026',
  NULL,
  'SKPIMDANGTETAPADART',
  'A_INTERNAL',
  'SK Presidium Sidang Tetap AD-ART BLM 2026',
  'Pengesahan Presidium Sidang Tetap terpilih untuk memimpin Sidang Pleno pembahasan AD/ART BLM FEB UNAIR 2026.',
  'forum_pleno',
  '2026-03-10',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  55,
  16,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0045_v1',
  'doc_sk_2026_0045',
  1,
  'https://drive.google.com/file/d/1AJ8-zNnqA4GG_Xdp71eNI-eY2WgzK7Lf/view?usp=sharing',
  '0045_SK Presidium Sidang Tetap AD-ART BLM 2026.pdf',
  'application/pdf',
  524288,
  '1aa8aaaaaa4aaaada71eaaaea2aaaa7af0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0045_v1' WHERE "id" = 'doc_sk_2026_0045';

-- 0046/UN.3.1.4/A/SKPLENOIADART/BLM/III/2026: SK Pengesahan Pleno I Sidang AD-ART BLM 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0046',
  'sk-2026-0046',
  'dt_sk',
  2026,
  46,
  '0046/UN.3.1.4/A/SKPLENOIADART/BLM/III/2026',
  NULL,
  'SKPLENOIADART',
  'A_INTERNAL',
  'SK Pengesahan Pleno I Sidang AD-ART BLM 2026',
  'Keputusan pengesahan hasil pembahasan Sidang Pleno I mengenai pasal-pasal Anggaran Dasar BLM FEB UNAIR 2026.',
  'forum_pleno',
  '2026-03-10',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  57,
  18,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0046_v1',
  'doc_sk_2026_0046',
  1,
  'https://drive.google.com/file/d/1-mOcGr02O4s19ON776_ENRyJhbKNSOi0/view?usp=sharing',
  '0046_SK Pengesahan Pleno I Sidang AD-ART BLM 2026.pdf',
  'application/pdf',
  524288,
  '1aaacaa02a4a19aa776aeaaaaabaaaaa00000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0046_v1' WHERE "id" = 'doc_sk_2026_0046';

-- 0047/UN.3.1.4/A/SKPLENOIIADART/BLM/III/2026: SK Pengesahan Pleno II Sidang AD-ART BLM 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0047',
  'sk-2026-0047',
  'dt_sk',
  2026,
  47,
  '0047/UN.3.1.4/A/SKPLENOIIADART/BLM/III/2026',
  NULL,
  'SKPLENOIIADART',
  'A_INTERNAL',
  'SK Pengesahan Pleno II Sidang AD-ART BLM 2026',
  'Keputusan pengesahan hasil pembahasan Sidang Pleno II mengenai pasal-pasal Anggaran Rumah Tangga BLM FEB UNAIR 2026.',
  'forum_pleno',
  '2026-03-10',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  59,
  19,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0047_v1',
  'doc_sk_2026_0047',
  1,
  'https://drive.google.com/file/d/1CfDsbyVKB2L7mgBpZgEvCIgCW0nVWPFm/view?usp=sharing',
  '0047_SK Pengesahan Pleno II Sidang AD-ART BLM 2026.pdf',
  'application/pdf',
  524288,
  '1cfdabaaab2a7aabaaaeacaaca0aaaafa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0047_v1' WHERE "id" = 'doc_sk_2026_0047';

-- 0048/UN.3.1.4/A/SKPENGESAHANUUADART/BLM/III/2026: SK Pengesahan UU AD-ART BLM FEB UNAIR 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0048',
  'sk-2026-0048',
  'dt_sk',
  2026,
  48,
  '0048/UN.3.1.4/A/SKPENGESAHANUUADART/BLM/III/2026',
  NULL,
  'SKPENGESAHANUUADART',
  'A_INTERNAL',
  'SK Pengesahan UU AD-ART BLM FEB UNAIR 2026',
  'Pengesahan akhir Undang-Undang Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Badan Legislatif Mahasiswa FEB UNAIR Tahun 2026.',
  'forum_pleno',
  '2026-03-10',
  'MONTH',
  'III',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  84,
  33,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0048_v1',
  'doc_sk_2026_0048',
  1,
  'https://drive.google.com/file/d/1ZTmJm8rdwlZt9w-Snyxk-d_K1lpw0Ctw/view?usp=sharing',
  '0048_SK Pengesahan UU AD-ART BLM FEB UNAIR 2026.pdf',
  'application/pdf',
  524288,
  '1aaaaa8adaaaa9aaaaaaaadaa1aaa0caa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0048_v1' WHERE "id" = 'doc_sk_2026_0048';

-- 0171/UN.3.1.4/B/SKREKOMENDASIDKPP/BLM/IX/2026: Surat Rekomendasi Penetapan DKPP PEMIRA 2026
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0171',
  'sk-2026-0171',
  'dt_sk',
  2026,
  171,
  '0171/UN.3.1.4/B/SKREKOMENDASIDKPP/BLM/IX/2026',
  NULL,
  'SKREKOMENDASIDKPP',
  'B_EXTERNAL',
  'Surat Rekomendasi Penetapan DKPP PEMIRA 2026',
  'Surat Keputusan dan Rekomendasi resmi BLM FEB UNAIR mengenai pengangkatan anggota Dewan Kehormatan Penyelenggara Pemilu (DKPP) PEMIRA 2026.',
  'forum_pleno',
  '2026-09-15',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  92,
  37,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0171_v1',
  'doc_sk_2026_0171',
  1,
  'https://drive.google.com/file/d/1AtMTZ4lh4_Py7Fky7b614xPCkjV9GUQv/view?usp=sharing',
  '0171_Surat Rekomendasi DKPP.pdf',
  'application/pdf',
  524288,
  '1aaaaa4aa4aaa7faa7b614aacaaa9aaaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0171_v1' WHERE "id" = 'doc_sk_2026_0171';

-- 0172/UN.3.1.4/B/SKUNDANGANRDPHIMAEKIS/BLM/IX/2026: Surat Undangan Rapat Dengar Pendapat (RDP) HIMA Ekonomi Islam
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0172',
  'sk-2026-0172',
  'dt_sk',
  2026,
  172,
  '0172/UN.3.1.4/B/SKUNDANGANRDPHIMAEKIS/BLM/IX/2026',
  NULL,
  'SKUNDANGANRDPHIMAEKIS',
  'B_EXTERNAL',
  'Surat Undangan Rapat Dengar Pendapat (RDP) HIMA Ekonomi Islam',
  'Panggilan resmi Rapat Dengar Pendapat (RDP) kepada pengurus HIMA Ekonomi Islam (EKIS) terkait evaluasi pelaksanaan Ospek Jurusan FEB UNAIR 2026.',
  'forum_komisi',
  '2026-09-16',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  74,
  25,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0172_v1',
  'doc_sk_2026_0172',
  1,
  'https://drive.google.com/file/d/19Mek8k1LjQrQzALcNC4HNfw3IV8j8JoG/view?usp=sharing',
  '0172_Surat Undangan RDP HIMA EKIS.pdf',
  'application/pdf',
  524288,
  '19aea8a1aaaaaaaacac4aafa3aa8a8aaa0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0172_v1' WHERE "id" = 'doc_sk_2026_0172';

-- 0173/UN.3.1.4/B/SKUNDANGANRDPHIMAMANAJEMEN/BLM/IX/2026: Surat Undangan Rapat Dengar Pendapat (RDP) HIMA Manajemen
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0173',
  'sk-2026-0173',
  'dt_sk',
  2026,
  173,
  '0173/UN.3.1.4/B/SKUNDANGANRDPHIMAMANAJEMEN/BLM/IX/2026',
  NULL,
  'SKUNDANGANRDPHIMAMANAJEMEN',
  'B_EXTERNAL',
  'Surat Undangan Rapat Dengar Pendapat (RDP) HIMA Manajemen',
  'Panggilan resmi Rapat Dengar Pendapat (RDP) kepada pengurus HIMA Manajemen terkait klarifikasi ketidakhadiran Forum Bawashim dan evaluasi ormawa.',
  'forum_komisi',
  '2026-09-16',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  81,
  28,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0173_v1',
  'doc_sk_2026_0173',
  1,
  'https://drive.google.com/file/d/1X8yShDlOP07Mg--U-LhzRhjs4jEiT0Dh/view?usp=sharing',
  '0173_Surat Undangan RDP HIMA Manajemen.pdf',
  'application/pdf',
  524288,
  '1a8aaadaaa07aaaaaaaaaaaaa4aeaa0da0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0173_v1' WHERE "id" = 'doc_sk_2026_0173';

-- 0174/UN.3.1.4/B/SKUNDANGANRDPHMAAKUNTANSI/BLM/IX/2026: Surat Undangan Rapat Dengar Pendapat (RDP) HMA Akuntansi
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0174',
  'sk-2026-0174',
  'dt_sk',
  2026,
  174,
  '0174/UN.3.1.4/B/SKUNDANGANRDPHMAAKUNTANSI/BLM/IX/2026',
  NULL,
  'SKUNDANGANRDPHMAAKUNTANSI',
  'B_EXTERNAL',
  'Surat Undangan Rapat Dengar Pendapat (RDP) HMA Akuntansi',
  'Panggilan resmi Rapat Dengar Pendapat (RDP) kepada pengurus Himpunan Mahasiswa Akuntansi (HMA) terkait evaluasi pelaksanaan Ospek Jurusan FEB UNAIR 2026.',
  'forum_komisi',
  '2026-09-16',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  73,
  24,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0174_v1',
  'doc_sk_2026_0174',
  1,
  'https://drive.google.com/file/d/1YLBnPLngZU90_Mn0BVR2qzE4T6FWvF6U/view?usp=sharing',
  '0174_Surat Undangan RDP HMA Akuntansi.pdf',
  'application/pdf',
  524288,
  '1aabaaaaaaa90aaa0baa2aae4a6faaf6a0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0174_v1' WHERE "id" = 'doc_sk_2026_0174';

-- 0175/UN.3.1.4/B/SKUNDANGANRDPHIMAIE/BLM/IX/2026: Surat Undangan Rapat Dengar Pendapat (RDP) HIMA Ilmu Ekonomi
INSERT INTO "LegalDocument" (
  "id", "slug", "typeId", "year", "sequenceNumber", "officialNumber", "legacyNumber",
  "abbreviationCode", "nature", "title", "summary", "forumId", "enactedDate",
  "enactedDatePrecision", "romanMonth", "placeOfEnactment", "legalStatus",
  "publicationState", "viewCount", "downloadCount", "publishedAt", "createdBy", "updatedAt"
) VALUES (
  'doc_sk_2026_0175',
  'sk-2026-0175',
  'dt_sk',
  2026,
  175,
  '0175/UN.3.1.4/B/SKUNDANGANRDPHIMAIE/BLM/IX/2026',
  NULL,
  'SKUNDANGANRDPHIMAIE',
  'B_EXTERNAL',
  'Surat Undangan Rapat Dengar Pendapat (RDP) HIMA Ilmu Ekonomi',
  'Panggilan resmi Rapat Dengar Pendapat (RDP) kepada pengurus HIMA Ilmu Ekonomi terkait evaluasi pelaksanaan Ospek Jurusan FEB UNAIR 2026.',
  'forum_komisi',
  '2026-09-16',
  'DAY',
  'IX',
  'Surabaya',
  'BERLAKU',
  'PUBLISHED',
  71,
  23,
  CURRENT_TIMESTAMP,
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("slug") DO UPDATE SET
  "officialNumber" = EXCLUDED."officialNumber",
  "title" = EXCLUDED."title",
  "summary" = EXCLUDED."summary",
  "legalStatus" = EXCLUDED."legalStatus",
  "publicationState" = EXCLUDED."publicationState",
  "updatedAt" = CURRENT_TIMESTAMP;
INSERT INTO "DocumentFile" (
  "id", "documentId", "version", "r2Key", "fileName", "mimeType", "sizeBytes", "sha256", "uploadedBy", "createdAt"
) VALUES (
  'file_sk_2026_0175_v1',
  'doc_sk_2026_0175',
  1,
  'https://drive.google.com/file/d/1P3sYjmF-UZ4-y4J5drA2A8PC4t36qy2Y/view?usp=sharing',
  '0175_Surat Undangan RDP HIMA Ilmu Ekonomi.pdf',
  'application/pdf',
  524288,
  '1a3aaaafaaa4aa4a5daa2a8ac4a36aa2a0000000000000000000000000000000',
  'puguhmuqoddam151@gmail.com',
  CURRENT_TIMESTAMP
) ON CONFLICT ("documentId", "version") DO UPDATE SET
  "r2Key" = EXCLUDED."r2Key",
  "fileName" = EXCLUDED."fileName";
UPDATE "LegalDocument" SET "currentFileId" = 'file_sk_2026_0175_v1' WHERE "id" = 'doc_sk_2026_0175';

-- Update NumberCounter Tahun 2026 ke angka tertinggi aktual
UPDATE "NumberCounter" SET "lastNumber" = 4, "updatedAt" = CURRENT_TIMESTAMP WHERE "typeId" = 'dt_uu' AND "year" = 2026;
UPDATE "NumberCounter" SET "lastNumber" = 3, "updatedAt" = CURRENT_TIMESTAMP WHERE "typeId" = 'dt_tap' AND "year" = 2026;
UPDATE "NumberCounter" SET "lastNumber" = 175, "updatedAt" = CURRENT_TIMESTAMP WHERE "typeId" = 'dt_sk' AND "year" = 2026;
UPDATE "NumberCounter" SET "lastNumber" = 6, "updatedAt" = CURRENT_TIMESTAMP WHERE "typeId" = 'dt_lp' AND "year" = 2026;

COMMIT;
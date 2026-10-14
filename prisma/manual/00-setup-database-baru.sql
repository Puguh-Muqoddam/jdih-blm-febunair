-- =============================================================================
-- JDIH BLM FEB UNAIR - SETUP DATABASE LENGKAP & INITIAL SEED
-- File: prisma/manual/00-setup-database-baru.sql
-- 
-- Skrip ini menggabungkan:
-- 1. Inisialisasi Ekstensi (pg_trgm, unaccent)
-- 2. Definisi Tipe ENUM
-- 3. Definisi Tabel (13 Tabel Relasional Sesuai ERD)
-- 4. Indeks Komprehensif (GIN Trigram, GIN tsvector, B-Tree)
-- 5. Hardening CHECK Constraints (Integritas Data)
-- 6. Trigger Pencarian Teks Penuh (unaccent) & AuditLog Append-Only
-- 7. Row Level Security (RLS) Zero-Trust & Pencabutan Hak Akses (anon, authenticated)
-- 8. Data Awal (DocumentType: UU, TAP, SK, LP, Forum, Counter 2026, Admin User)
--
-- CARA PENGGUNAAN:
-- Salin dan jalankan seluruh isi file ini di SQL Editor pada Dashboard Supabase.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. EKSTENSI POSTGRESQL
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Pastikan skema public ada
CREATE SCHEMA IF NOT EXISTS "public";

-- -----------------------------------------------------------------------------
-- 2. TIPE ENUM
-- -----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE "LegalStatus" AS ENUM ('BERLAKU', 'DIUBAH', 'DICABUT', 'TIDAK_BERLAKU');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "PublicationState" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "SkNature" AS ENUM ('A_INTERNAL', 'B_EXTERNAL');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "DatePrecision" AS ENUM ('DAY', 'MONTH');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "RelationType" AS ENUM ('MENGUBAH', 'MENCABUT', 'MENGESAHKAN', 'MELAKSANAKAN', 'TERKAIT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'EDITOR');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "RequestStatus" AS ENUM ('BARU', 'DIPROSES', 'SELESAI', 'DITOLAK');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "AuditAction" AS ENUM (
    'CREATE', 'UPDATE', 'PUBLISH', 'UNPUBLISH', 'ARCHIVE', 'RESTORE',
    'DELETE', 'STATUS_CHANGE', 'FILE_UPLOAD', 'RELATION_ADD', 'RELATION_REMOVE',
    'NUMBER_RESERVE', 'NUMBER_RELEASE', 'NUMBER_OVERRIDE', 'IMPORT',
    'USER_CHANGE', 'REQUEST_UPDATE'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- -----------------------------------------------------------------------------
-- 3. STRUKTUR TABEL
-- -----------------------------------------------------------------------------

-- Tabel: DocumentType (Master jenis produk hukum)
CREATE TABLE IF NOT EXISTS "DocumentType" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "description" VARCHAR(1000),
    "numberPattern" VARCHAR(120) NOT NULL,
    "numberPadding" SMALLINT NOT NULL,
    "requiresNature" BOOLEAN NOT NULL DEFAULT false,
    "autoSequence" BOOLEAN NOT NULL DEFAULT true,
    "hierarchyLevel" SMALLINT NOT NULL,
    "sortOrder" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- Tabel: Forum (Forum penetapan produk hukum)
CREATE TABLE IF NOT EXISTS "Forum" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "sortOrder" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- Tabel: Tag (Topik/Klaster bahasan)
CREATE TABLE IF NOT EXISTS "Tag" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" VARCHAR(500),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- Tabel: LegalDocument (Entitas utama produk hukum)
CREATE TABLE IF NOT EXISTS "LegalDocument" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "typeId" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "sequenceNumber" INTEGER NOT NULL,
    "officialNumber" VARCHAR(200) NOT NULL,
    "legacyNumber" VARCHAR(200),
    "abbreviationCode" VARCHAR(80),
    "nature" "SkNature",
    "title" VARCHAR(500) NOT NULL,
    "summary" VARCHAR(2000),
    "contentText" TEXT,
    "forumId" TEXT,
    "enactedDate" DATE NOT NULL,
    "enactedDatePrecision" "DatePrecision" NOT NULL DEFAULT 'DAY',
    "romanMonth" VARCHAR(4) NOT NULL,
    "placeOfEnactment" VARCHAR(100) NOT NULL DEFAULT 'Surabaya',
    "legalStatus" "LegalStatus" NOT NULL DEFAULT 'BERLAKU',
    "publicationState" "PublicationState" NOT NULL DEFAULT 'DRAFT',
    "notes" VARCHAR(1000),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "searchVector" tsvector,
    "currentFileId" TEXT,
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "createdBy" VARCHAR(254),
    "updatedBy" VARCHAR(254),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
);

-- Tabel: DocumentFile (Berkas PDF dan riwayat versi)
CREATE TABLE IF NOT EXISTS "DocumentFile" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "r2Key" VARCHAR(400) NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(100) NOT NULL DEFAULT 'application/pdf',
    "sizeBytes" INTEGER NOT NULL,
    "sha256" CHAR(64) NOT NULL,
    "extractedText" TEXT,
    "uploadedBy" VARCHAR(254),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentFile_pkey" PRIMARY KEY ("id")
);

-- Tabel: DocumentRelation (Hubungan antar-produk hukum)
CREATE TABLE IF NOT EXISTS "DocumentRelation" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "type" "RelationType" NOT NULL,
    "note" VARCHAR(500),
    "createdBy" VARCHAR(254),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentRelation_pkey" PRIMARY KEY ("id")
);

-- Tabel pivot: DocumentTag (Relasi many-to-many dokumen & tag)
CREATE TABLE IF NOT EXISTS "DocumentTag" (
    "documentId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "DocumentTag_pkey" PRIMARY KEY ("documentId","tagId")
);

-- Tabel: NumberCounter (Counter penomoran atomik per tahun)
CREATE TABLE IF NOT EXISTS "NumberCounter" (
    "typeId" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "lastNumber" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NumberCounter_pkey" PRIMARY KEY ("typeId","year")
);

-- Tabel: NumberReservation (Pemesanan nomor pra-sidang)
CREATE TABLE IF NOT EXISTS "NumberReservation" (
    "id" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,
    "sequenceNumber" INTEGER NOT NULL,
    "purpose" VARCHAR(300),
    "reservedBy" VARCHAR(254),
    "expiresAt" TIMESTAMPTZ(3),
    "documentId" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NumberReservation_pkey" PRIMARY KEY ("id")
);

-- Tabel: AdminUser (Daftar admin pengelola)
CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "name" VARCHAR(120),
    "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- Tabel: AuditLog (Catatan riwayat perubahan append-only)
CREATE TABLE IF NOT EXISTS "AuditLog" (
    "id" TEXT NOT NULL,
    "actorEmail" VARCHAR(254) NOT NULL,
    "action" "AuditAction" NOT NULL,
    "entity" VARCHAR(50) NOT NULL,
    "entityId" VARCHAR(50) NOT NULL,
    "diff" JSONB,
    "ipHash" CHAR(64),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- Tabel: DocumentRequest (Form permohonan informasi/dokumen dari pengunjung)
CREATE TABLE IF NOT EXISTS "DocumentRequest" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "affiliation" VARCHAR(120),
    "message" VARCHAR(2000) NOT NULL,
    "relatedDocumentId" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'BARU',
    "adminNote" VARCHAR(1000),
    "handledBy" VARCHAR(254),
    "ipHash" CHAR(64),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentRequest_pkey" PRIMARY KEY ("id")
);

-- Tabel: RateLimit (Rate limiting di level basis data)
CREATE TABLE IF NOT EXISTS "RateLimit" (
    "key" VARCHAR(128) NOT NULL,
    "windowStart" TIMESTAMPTZ(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("key","windowStart")
);

-- -----------------------------------------------------------------------------
-- 4. INDEKS & UNIQUE CONSTRAINTS
-- -----------------------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS "DocumentType_code_key" ON "DocumentType"("code");
CREATE UNIQUE INDEX IF NOT EXISTS "DocumentType_slug_key" ON "DocumentType"("slug");

CREATE UNIQUE INDEX IF NOT EXISTS "Forum_name_key" ON "Forum"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "Forum_slug_key" ON "Forum"("slug");

CREATE UNIQUE INDEX IF NOT EXISTS "Tag_slug_key" ON "Tag"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Tag_name_key" ON "Tag"("name");

CREATE UNIQUE INDEX IF NOT EXISTS "LegalDocument_slug_key" ON "LegalDocument"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "LegalDocument_officialNumber_key" ON "LegalDocument"("officialNumber");
CREATE UNIQUE INDEX IF NOT EXISTS "LegalDocument_currentFileId_key" ON "LegalDocument"("currentFileId");
CREATE UNIQUE INDEX IF NOT EXISTS "LegalDocument_typeId_year_sequenceNumber_key" ON "LegalDocument"("typeId", "year", "sequenceNumber");

CREATE INDEX IF NOT EXISTS "LegalDocument_publicationState_typeId_year_idx" ON "LegalDocument"("publicationState", "typeId", "year" DESC);
CREATE INDEX IF NOT EXISTS "LegalDocument_publicationState_enactedDate_idx" ON "LegalDocument"("publicationState", "enactedDate" DESC);
CREATE INDEX IF NOT EXISTS "LegalDocument_forumId_idx" ON "LegalDocument"("forumId");
CREATE INDEX IF NOT EXISTS "LegalDocument_searchVector_idx" ON "LegalDocument" USING GIN ("searchVector");
CREATE INDEX IF NOT EXISTS "LegalDocument_title_trgm_idx" ON "LegalDocument" USING GIN ("title" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "LegalDocument_officialNumber_trgm_idx" ON "LegalDocument" USING GIN ("officialNumber" gin_trgm_ops);

CREATE UNIQUE INDEX IF NOT EXISTS "DocumentFile_r2Key_key" ON "DocumentFile"("r2Key");
CREATE UNIQUE INDEX IF NOT EXISTS "DocumentFile_documentId_version_key" ON "DocumentFile"("documentId", "version");
CREATE INDEX IF NOT EXISTS "DocumentFile_sha256_idx" ON "DocumentFile"("sha256");

CREATE UNIQUE INDEX IF NOT EXISTS "DocumentRelation_fromId_toId_type_key" ON "DocumentRelation"("fromId", "toId", "type");
CREATE INDEX IF NOT EXISTS "DocumentRelation_toId_idx" ON "DocumentRelation"("toId");

CREATE INDEX IF NOT EXISTS "DocumentTag_tagId_idx" ON "DocumentTag"("tagId");

CREATE UNIQUE INDEX IF NOT EXISTS "NumberReservation_documentId_key" ON "NumberReservation"("documentId");
CREATE UNIQUE INDEX IF NOT EXISTS "NumberReservation_typeId_year_sequenceNumber_key" ON "NumberReservation"("typeId", "year", "sequenceNumber");

CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email");

CREATE INDEX IF NOT EXISTS "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");
CREATE INDEX IF NOT EXISTS "AuditLog_actorEmail_idx" ON "AuditLog"("actorEmail");
CREATE INDEX IF NOT EXISTS "AuditLog_createdAt_idx" ON "AuditLog"("createdAt" DESC);

CREATE INDEX IF NOT EXISTS "DocumentRequest_status_createdAt_idx" ON "DocumentRequest"("status", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS "DocumentRequest_relatedDocumentId_idx" ON "DocumentRequest"("relatedDocumentId");

CREATE INDEX IF NOT EXISTS "RateLimit_windowStart_idx" ON "RateLimit"("windowStart");

-- -----------------------------------------------------------------------------
-- 5. FOREIGN KEY CONSTRAINTS
-- -----------------------------------------------------------------------------

DO $$ BEGIN
  ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_typeId_fkey"
    FOREIGN KEY ("typeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_forumId_fkey"
    FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_currentFileId_fkey"
    FOREIGN KEY ("currentFileId") REFERENCES "DocumentFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentFile" ADD CONSTRAINT "DocumentFile_documentId_fkey"
    FOREIGN KEY ("documentId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentRelation" ADD CONSTRAINT "DocumentRelation_fromId_fkey"
    FOREIGN KEY ("fromId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentRelation" ADD CONSTRAINT "DocumentRelation_toId_fkey"
    FOREIGN KEY ("toId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_documentId_fkey"
    FOREIGN KEY ("documentId") REFERENCES "LegalDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_tagId_fkey"
    FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "NumberCounter" ADD CONSTRAINT "NumberCounter_typeId_fkey"
    FOREIGN KEY ("typeId") REFERENCES "DocumentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "NumberReservation" ADD CONSTRAINT "NumberReservation_typeId_fkey"
    FOREIGN KEY ("typeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "NumberReservation" ADD CONSTRAINT "NumberReservation_documentId_fkey"
    FOREIGN KEY ("documentId") REFERENCES "LegalDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentRequest" ADD CONSTRAINT "DocumentRequest_relatedDocumentId_fkey"
    FOREIGN KEY ("relatedDocumentId") REFERENCES "LegalDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- -----------------------------------------------------------------------------
-- 6. HARDENING CHECK CONSTRAINTS
-- -----------------------------------------------------------------------------

DO $$ BEGIN
  ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_year_check"
    CHECK ("year" BETWEEN 2000 AND 2100);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_sequenceNumber_check"
    CHECK ("sequenceNumber" > 0);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_sk_nature_abbreviation_check"
    CHECK ("nature" IS NULL OR "abbreviationCode" IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentType" ADD CONSTRAINT "DocumentType_padding_check"
    CHECK ("numberPadding" >= 1 AND "numberPadding" <= 10);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentType" ADD CONSTRAINT "DocumentType_hierarchyLevel_check"
    CHECK ("hierarchyLevel" >= 1);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentRelation" ADD CONSTRAINT "DocumentRelation_different_docs_check"
    CHECK ("fromId" <> "toId");
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_email_lowercase_check"
    CHECK ("email" = lower("email"));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentFile" ADD CONSTRAINT "DocumentFile_sizeBytes_check"
    CHECK ("sizeBytes" > 0);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "DocumentFile" ADD CONSTRAINT "DocumentFile_version_check"
    CHECK ("version" >= 1);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "RateLimit" ADD CONSTRAINT "RateLimit_count_check"
    CHECK ("count" >= 0);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "NumberCounter" ADD CONSTRAINT "NumberCounter_lastNumber_check"
    CHECK ("lastNumber" >= 0);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- -----------------------------------------------------------------------------
-- 7. TRIGGER PENCARIAN TEKS PENUH (tsvector unaccent)
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_legal_document_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW."searchVector" :=
    setweight(to_tsvector('simple', unaccent(coalesce(NEW."title", ''))), 'A') ||
    setweight(to_tsvector('simple', unaccent(coalesce(NEW."officialNumber", ''))), 'A') ||
    setweight(to_tsvector('simple', unaccent(coalesce(NEW."legacyNumber", ''))), 'A') ||
    setweight(to_tsvector('simple', unaccent(coalesce(NEW."summary", ''))), 'B') ||
    setweight(to_tsvector('simple', unaccent(coalesce(NEW."contentText", ''))), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_legal_document_search_vector ON "LegalDocument";
CREATE TRIGGER trg_legal_document_search_vector
  BEFORE INSERT OR UPDATE OF "title", "officialNumber", "legacyNumber", "summary", "contentText"
  ON "LegalDocument"
  FOR EACH ROW
  EXECUTE FUNCTION update_legal_document_search_vector();

-- -----------------------------------------------------------------------------
-- 8. TRIGGER AUDIT LOG APPEND-ONLY
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION prevent_audit_log_modification()
RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'AuditLog bersifat append-only. Operasi UPDATE atau DELETE dilarang.';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_audit_log_modification ON "AuditLog";
CREATE TRIGGER trg_prevent_audit_log_modification
  BEFORE UPDATE OR DELETE ON "AuditLog"
  FOR EACH ROW
  EXECUTE FUNCTION prevent_audit_log_modification();

-- -----------------------------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) ZERO-TRUST
-- -----------------------------------------------------------------------------

ALTER TABLE "DocumentType" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Forum" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Tag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LegalDocument" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DocumentFile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DocumentRelation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DocumentTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NumberCounter" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NumberReservation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminUser" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DocumentRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RateLimit" ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 10. PENCABUTAN HAK AKSES PERAN SUPABASE (anon, authenticated)
-- -----------------------------------------------------------------------------

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon, authenticated;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM anon, authenticated;

-- -----------------------------------------------------------------------------
-- 11. DATA SEED AWAL (Master Jenis, Forum, Counter 2026, Super Admin)
-- -----------------------------------------------------------------------------

-- 11.1 Master DocumentType (UU, TAP, SK, LP)
INSERT INTO "DocumentType" (
  "id", "code", "name", "slug", "description",
  "numberPattern", "numberPadding", "requiresNature", "autoSequence",
  "hierarchyLevel", "sortOrder", "createdAt", "updatedAt"
) VALUES
(
  'dt_uu',
  'UU',
  'Undang-Undang',
  'undang-undang',
  'Undang-Undang dan peraturan dasar yang disahkan oleh BLM FEB UNAIR',
  '{seq}/UU/BLMFEBUNAIR/{roman}/{year}',
  2,
  false,
  true,
  1,
  1,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'dt_tap',
  'TAP',
  'Ketetapan BLM',
  'ketetapan-blm',
  'Ketetapan sidang Badan Legislatif Mahasiswa FEB UNAIR',
  '{seq}/TAP/BLM/{roman}/{year}',
  3,
  false,
  true,
  2,
  2,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'dt_sk',
  'SK',
  'Surat Keputusan',
  'surat-keputusan',
  'Surat Keputusan Badan Legislatif Mahasiswa FEB UNAIR (Departemen Legislasi)',
  '{seq}/UN.3.1.4/{nature}/{code}/BLM/{roman}/{year}',
  4,
  true,
  false,
  3,
  3,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'dt_lp',
  'LP',
  'Surat Laporan',
  'lembaran-parlemen',
  'Surat Laporan Parlemen hasil sidang dan laporan pengawasan',
  '{seq}/LP/BLM/{roman}/{year}',
  3,
  false,
  true,
  4,
  4,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("code") DO UPDATE SET
  "name" = EXCLUDED."name",
  "numberPattern" = EXCLUDED."numberPattern",
  "numberPadding" = EXCLUDED."numberPadding",
  "requiresNature" = EXCLUDED."requiresNature",
  "autoSequence" = EXCLUDED."autoSequence",
  "hierarchyLevel" = EXCLUDED."hierarchyLevel",
  "sortOrder" = EXCLUDED."sortOrder",
  "updatedAt" = CURRENT_TIMESTAMP;

-- 11.2 Master Forum
INSERT INTO "Forum" ("id", "name", "slug", "sortOrder") VALUES
('forum_pleno', 'Sidang Pleno BLM', 'sidang-pleno-blm', 1),
('forum_protap', 'Sidang Prosedur Tetap (Protap)', 'sidang-protap', 2),
('forum_komisi', 'Sidang Komisi BLM', 'sidang-komisi-blm', 3),
('forum_pimpinan', 'Rapat Pimpinan BLM', 'rapat-pimpinan-blm', 4),
('forum_kerja', 'Rapat Kerja BLM', 'rapat-kerja-blm', 5)
ON CONFLICT ("name") DO NOTHING;

-- 11.3 Initial NumberCounter (Tahun 2026)
INSERT INTO "NumberCounter" ("typeId", "year", "lastNumber", "updatedAt") VALUES
('dt_uu', 2026, 0, CURRENT_TIMESTAMP),
('dt_tap', 2026, 0, CURRENT_TIMESTAMP),
('dt_sk', 2026, 0, CURRENT_TIMESTAMP),
('dt_lp', 2026, 0, CURRENT_TIMESTAMP)
ON CONFLICT ("typeId", "year") DO NOTHING;

-- 11.4 Super Admin Awal (puguhmuqoddam151@gmail.com)
INSERT INTO "AdminUser" (
  "id", "email", "name", "role", "isActive", "createdAt", "updatedAt"
) VALUES (
  'usr_super_puguh',
  'puguhmuqoddam151@gmail.com',
  'Puguh Muqoddam',
  'SUPER_ADMIN',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO UPDATE SET
  "role" = 'SUPER_ADMIN',
  "isActive" = true,
  "updatedAt" = CURRENT_TIMESTAMP;

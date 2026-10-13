-- =============================================================================
-- Migration: 0002_hardening
-- Deskripsi: Penerapan CHECK constraints, trigger pencarian teks penuh (tsvector),
--            trigger AuditLog append-only, dan Row Level Security (RLS) Zero-Trust.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. CHECK CONSTRAINTS
-- -----------------------------------------------------------------------------

-- Batas tahun produk hukum (mencegah salah ketik seperti 2926)
ALTER TABLE "LegalDocument"
  ADD CONSTRAINT "LegalDocument_year_check"
  CHECK ("year" BETWEEN 2000 AND 2100);

-- Nomor urut harus bilangan positif
ALTER TABLE "LegalDocument"
  ADD CONSTRAINT "LegalDocument_sequenceNumber_check"
  CHECK ("sequenceNumber" > 0);

-- Jika SK memiliki sifat (A/B), wajib memiliki kode singkatan
ALTER TABLE "LegalDocument"
  ADD CONSTRAINT "LegalDocument_sk_nature_abbreviation_check"
  CHECK ("nature" IS NULL OR "abbreviationCode" IS NOT NULL);

-- Padding penomoran harus valid (1 - 10 digit)
ALTER TABLE "DocumentType"
  ADD CONSTRAINT "DocumentType_padding_check"
  CHECK ("numberPadding" >= 1 AND "numberPadding" <= 10);

ALTER TABLE "DocumentType"
  ADD CONSTRAINT "DocumentType_hierarchyLevel_check"
  CHECK ("hierarchyLevel" >= 1);

-- Dokumen tidak boleh berelasi dengan dirinya sendiri
ALTER TABLE "DocumentRelation"
  ADD CONSTRAINT "DocumentRelation_different_docs_check"
  CHECK ("fromId" <> "toId");

-- Email admin wajib tersimpan dalam huruf kecil
ALTER TABLE "AdminUser"
  ADD CONSTRAINT "AdminUser_email_lowercase_check"
  CHECK ("email" = lower("email"));

-- Ukuran dan versi file harus positif
ALTER TABLE "DocumentFile"
  ADD CONSTRAINT "DocumentFile_sizeBytes_check"
  CHECK ("sizeBytes" > 0);

ALTER TABLE "DocumentFile"
  ADD CONSTRAINT "DocumentFile_version_check"
  CHECK ("version" >= 1);

-- Counter rate limit & penomoran tidak boleh negatif
ALTER TABLE "RateLimit"
  ADD CONSTRAINT "RateLimit_count_check"
  CHECK ("count" >= 0);

ALTER TABLE "NumberCounter"
  ADD CONSTRAINT "NumberCounter_lastNumber_check"
  CHECK ("lastNumber" >= 0);

-- -----------------------------------------------------------------------------
-- 2. FULL-TEXT SEARCH TRIGGER (tsvector dengan unaccent)
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
-- 3. AUDIT LOG APPEND-ONLY TRIGGER
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
-- 4. ROW LEVEL SECURITY (RLS) ZERO-TRUST
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
-- 5. PENCABUTAN HAK AKSES PERAN SUPABASE (anon, authenticated)
-- -----------------------------------------------------------------------------

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon, authenticated;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON SEQUENCES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM anon, authenticated;

-- =============================================================================
-- JDIH BLM FEB UNAIR — Parlemen Cakrasena 2026
-- Skrip Pembuatan Role Database dengan Hak Minimum (Least-Privilege Application Role)
-- Jalankan di: Supabase Dashboard > SQL Editor > New Query > Run
-- =============================================================================
-- Catatan: Ganti 'GANTI_DENGAN_PASSWORD_KUAT_ANDA' sebelum menjalankan skrip ini.

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'jdih_app') THEN
    CREATE ROLE jdih_app WITH LOGIN PASSWORD 'GANTI_DENGAN_PASSWORD_KUAT_ANDA' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
  END IF;
END
$$;

-- Berikan akses koneksi dan penggunaan skema public
GRANT CONNECT ON DATABASE postgres TO jdih_app;
GRANT USAGE ON SCHEMA public TO jdih_app;

-- Berikan hak baca & tulis minimum pada tabel aplikasi
GRANT SELECT, INSERT, UPDATE ON TABLE
  public."DocumentType",
  public."Forum",
  public."Tag",
  public."LegalDocument",
  public."DocumentFile",
  public."DocumentRelation",
  public."DocumentTag",
  public."NumberCounter",
  public."NumberReservation",
  public."AdminUser",
  public."DocumentRequest",
  public."RateLimit"
TO jdih_app;

-- Izinkan DELETE hanya pada tabel relasi penghubung & rate limit
GRANT DELETE ON TABLE
  public."DocumentTag",
  public."DocumentRelation",
  public."RateLimit"
TO jdih_app;

-- AuditLog HANYA boleh SELECT dan INSERT (Append-Only, dilarang UPDATE/DELETE)
GRANT SELECT, INSERT ON TABLE public."AuditLog" TO jdih_app;
REVOKE UPDATE, DELETE, TRUNCATE ON TABLE public."AuditLog" FROM jdih_app;

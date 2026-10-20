-- =============================================================================
-- JDIH BLM FEB UNAIR - Setup Supabase Storage Bucket 'produk-hukum'
-- Project Ref: sfobevvfofvckkhshzlx
-- File: prisma/manual/02-setup-storage-supabase.sql
--
-- Fungsi:
-- 1. Membuat bucket storage 'produk-hukum' untuk menyimpan seluruh 70 berkas PDF.
-- 2. Memasang kebijakan akses publik (Public Read) agar pengunjung situs
--    dapat membaca dan mengunduh berkas PDF resmi secara langsung dari Supabase
--    tanpa mengekspos folder Google Drive.
-- =============================================================================

-- 1. Buat bucket 'produk-hukum' di schema storage Supabase
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'produk-hukum',
  'produk-hukum',
  true,
  52428800, -- Batas ukuran 50 MB per berkas PDF
  ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf']::text[];

-- 2. Kebijakan Keamanan Storage Objects
-- A. Izin Baca Publik (Siapa pun dapat membaca berkas PDF produk hukum)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Read Produk Hukum'
  ) THEN
    CREATE POLICY "Public Read Produk Hukum"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'produk-hukum');
  END IF;
END $$;

-- B. Izin Unggah (Untuk proses upload dan migrasi berkas)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Upload Produk Hukum'
  ) THEN
    CREATE POLICY "Allow Upload Produk Hukum"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'produk-hukum');
  END IF;
END $$;

-- C. Izin Pembaruan (Update versi berkas)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Update Produk Hukum'
  ) THEN
    CREATE POLICY "Allow Update Produk Hukum"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'produk-hukum');
  END IF;
END $$;

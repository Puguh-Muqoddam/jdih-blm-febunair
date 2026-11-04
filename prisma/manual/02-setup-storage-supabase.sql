-- =============================================================================
-- JDIH BLM FEB UNAIR — Parlemen Cakrasena 2026
-- Skrip Otomatis Penyiapan Bucket & Kebijakan RLS Supabase Storage (HARDENED)
-- Jalankan di: Supabase Dashboard > SQL Editor > New Query > Run
-- =============================================================================

-- 1. Buat Bucket "produk-hukum" (Public Read untuk PDF Resmi, Batas 50 MB)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'produk-hukum',
  'produk-hukum',
  true,
  52428800, -- 50 MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf'];

-- 2. Hapus Policy Lama (termasuk yang belum membatasi role ke service_role)
DROP POLICY IF EXISTS "Allow Public Read Produk Hukum" ON storage.objects;
DROP POLICY IF EXISTS "Allow Upload Produk Hukum" ON storage.objects;
DROP POLICY IF EXISTS "Allow Update Produk Hukum" ON storage.objects;
DROP POLICY IF EXISTS "Allow Delete Produk Hukum" ON storage.objects;

-- 3. Kebijakan RLS: Izinkan Publik (Siapa Saja) Membaca / Mengunduh Berkas PDF
CREATE POLICY "Allow Public Read Produk Hukum"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'produk-hukum');

-- 4. Kebijakan RLS: HANYA service_role yang Boleh Mengunggah (INSERT) Berkas PDF
-- Mencegah siapa pun yang memegang anon key publik menimpa/mengunggah PDF palsu.
CREATE POLICY "Allow Upload Produk Hukum"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'produk-hukum');

-- 5. Kebijakan RLS: HANYA service_role yang Boleh Memperbarui (UPDATE) Berkas PDF
CREATE POLICY "Allow Update Produk Hukum"
ON storage.objects
FOR UPDATE
TO service_role
USING (bucket_id = 'produk-hukum')
WITH CHECK (bucket_id = 'produk-hukum');

-- 6. Kebijakan RLS: HANYA service_role yang Boleh Menghapus (DELETE) Berkas PDF
CREATE POLICY "Allow Delete Produk Hukum"
ON storage.objects
FOR DELETE
TO service_role
USING (bucket_id = 'produk-hukum');

-- =============================================================================
-- Kueri Verifikasi (Jalankan untuk memastikan roles = {service_role} pada INSERT/UPDATE/DELETE):
-- SELECT policyname, cmd, roles, qual, with_check
-- FROM pg_policies
-- WHERE schemaname = 'storage' AND tablename = 'objects';
-- =============================================================================

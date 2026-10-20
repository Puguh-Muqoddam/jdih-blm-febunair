/**
 * =============================================================================
 * JDIH BLM FEB UNAIR - Skrip Sinkronisasi PDF Google Drive ke Supabase Storage
 * File: scripts/sync-drive-to-supabase.ts
 *
 * Fungsi:
 * 1. Mengunduh 70 berkas PDF resmi dari Google Drive secara langsung via ID berkas privat.
 * 2. Mengunggahnya ke Supabase Storage bucket 'produk-hukum'.
 * 3. Menghasilkan URL Supabase Storage permanen untuk setiap produk hukum:
 *    https://sfobevvfofvckkhshzlx.supabase.co/storage/v1/object/public/produk-hukum/{slug}.pdf
 *
 * Cara Menjalankan:
 * npx tsx scripts/sync-drive-to-supabase.ts
 * =============================================================================
 */

import { createClient } from "@supabase/supabase-js";
import { LEGAL_DOCUMENTS } from "../src/lib/data/mock-documents";
import * as dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sfobevvfofvckkhshzlx.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_KV66XFWixhFydC9c89J3dA_DXny5uw6";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function downloadFileFromGoogleDrive(fileId: string): Promise<Buffer | null> {
  const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  try {
    const res = await fetch(directUrl);
    if (!res.ok) {
      console.warn(`[GDRIVE] Gagal unduh ID ${fileId}: HTTP ${res.status}`);
      return null;
    }
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.error(`[GDRIVE ERROR] Gagal fetch file ${fileId}:`, err);
    return null;
  }
}

async function uploadToSupabaseStorage(
  filePath: string,
  buffer: Buffer
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from("produk-hukum")
    .upload(filePath, buffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    console.error(`[SUPABASE STORAGE ERROR] Gagal upload ${filePath}:`, error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("produk-hukum")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

async function main() {
  console.log("==================================================================");
  console.log("JDIH BLM FEB UNAIR - Sinkronisasi PDF Google Drive ke Supabase Storage");
  console.log(`Target Supabase: ${SUPABASE_URL} (Bucket: 'produk-hukum')`);
  console.log(`Total Dokumen yang Terdaftar: ${LEGAL_DOCUMENTS.length}`);
  console.log("==================================================================\n");

  let successCount = 0;
  let skippedCount = 0;
  let failCount = 0;

  for (let i = 0; i < LEGAL_DOCUMENTS.length; i++) {
    const doc = LEGAL_DOCUMENTS[i];
    const storagePath = `${doc.slug}.pdf`;

    if (!doc.driveFileId) {
      console.log(`[${i + 1}/${LEGAL_DOCUMENTS.length}] [SKIP] ${doc.officialNumber}: Belum ada file ID di GDrive`);
      skippedCount++;
      continue;
    }

    console.log(`[${i + 1}/${LEGAL_DOCUMENTS.length}] Memproses ${doc.officialNumber} (${doc.slug})...`);
    
    // Unduh dari Google Drive via direct ID (bukan via folder)
    const pdfBuffer = await downloadFileFromGoogleDrive(doc.driveFileId);
    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.warn(`   ↳ Gagal mengunduh berkas dari Drive ID ${doc.driveFileId}`);
      failCount++;
      continue;
    }

    console.log(`   ↳ Berhasil diunduh (${(pdfBuffer.length / 1024).toFixed(1)} KB). Mengunggah ke Supabase Storage...`);
    
    const publicUrl = await uploadToSupabaseStorage(storagePath, pdfBuffer);
    if (publicUrl) {
      console.log(`   ✓ Tersimpan di Supabase Storage: ${publicUrl}`);
      successCount++;
    } else {
      failCount++;
    }

    // Delay kecil agar tidak membebani rate limit
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log("\n==================================================================");
  console.log(`Hasil Sinkronisasi Berkas:`);
  console.log(`✓ Berhasil Diunggah ke Supabase : ${successCount}`);
  console.log(`- Dilewati (Belum ada ID)       : ${skippedCount}`);
  console.log(`✗ Gagal                         : ${failCount}`);
  console.log("==================================================================");
}

main().catch(console.error);

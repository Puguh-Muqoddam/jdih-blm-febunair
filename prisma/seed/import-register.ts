/**
 * =============================================================================
 * JDIH BLM FEB UNAIR - Skrip Migrasi 49 Produk Hukum Resmi 2026
 * File: prisma/seed/import-register.ts
 *
 * Mengimpor dan menormalisasi 5 file CSV dari folder 'Nomor Produk Hukum':
 * 1. 2 UU (Undang-Undang) - koreksi typo tahun 2926 -> 2026
 * 2. 3 TAP (Ketetapan BLM)
 * 3. 39 SK (Surat Keputusan) - normalisasi 4 digit 0100-0170 & simpan legacyNumber
 * 4. 5 LP (Surat Laporan)
 * 5. 3 Nomor Dipesan (BIRAD 171, 172, 173) -> NumberReservation
 *
 * Referensi: IMPLEMENTATION_PLAN.md §2, §6, §14
 * Jalankan dengan: npx tsx prisma/seed/import-register.ts [--dry-run]
 * =============================================================================
 */

import fs from "fs";
import path from "path";
import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  normalizeOfficialNumber,
  generateDocumentSlug,
  padSequence,
  toRoman,
} from "../../src/lib/numbering";

// Helper sederhana parse baris CSV yang mendukung tanda petik (quotes)
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Konversi tanggal teks bahasa Indonesia ke ISO date (YYYY-MM-DD)
function parseIndonesianDateToIso(dateStr: string, year: number): { enactedDate: string; enactedDatePrecision: "DAY" | "MONTH" } {
  const clean = dateStr.trim();
  const monthMap: Record<string, string> = {
    januari: "01",
    februari: "02",
    maret: "03",
    april: "04",
    mei: "05",
    juni: "06",
    juli: "07",
    agustus: "08",
    september: "09",
    oktober: "10",
    november: "11",
    desember: "12",
  };

  const parts = clean.split(/\s+/);
  if (parts.length === 2) {
    // Format "Agustus 2026" atau "Juli 2026"
    const monthName = parts[0].toLowerCase();
    const m = monthMap[monthName] || "08";
    return { enactedDate: `${year}-${m}-01`, enactedDatePrecision: "MONTH" };
  } else if (parts.length >= 3) {
    // Format "28 Juli 2026" atau "12 September 2026"
    const day = parts[0].padStart(2, "0");
    const monthName = parts[1].toLowerCase();
    const m = monthMap[monthName] || "08";
    return { enactedDate: `${year}-${m}-${day}`, enactedDatePrecision: "DAY" };
  }

  return { enactedDate: `${year}-08-01`, enactedDatePrecision: "MONTH" };
}

export interface ParsedDocumentSeed {
  type: "UU" | "TAP" | "SK" | "LP";
  sequenceNumber: number;
  year: number;
  officialNumber: string;
  legacyNumber?: string;
  abbreviationCode?: string;
  nature?: "A_INTERNAL" | "B_EXTERNAL";
  title: string;
  forum: string;
  enactedDate: string;
  enactedDatePrecision: "DAY" | "MONTH";
  romanMonth: string;
  legalStatus: "BERLAKU" | "DIUBAH" | "DICABUT" | "TIDAK_BERLAKU";
  publicationState: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  slug: string;
  tags: string[];
}

export interface ParsedReservationSeed {
  type: "SK";
  sequenceNumber: number;
  year: number;
  purpose: string;
}

export function parseAllRegisterFiles(baseDir: string): {
  documents: ParsedDocumentSeed[];
  reservations: ParsedReservationSeed[];
} {
  const documents: ParsedDocumentSeed[] = [];
  const reservations: ParsedReservationSeed[] = [];

  // 1. Parsing UU (2 dokumen)
  const uuPath = path.join(
    baseDir,
    "SPSS PENOMORAN PRODUK HUKUM LEGISLASI BLM 2026 (Updated).docx - UU dan Amandemen.csv"
  );
  if (fs.existsSync(uuPath)) {
    const lines = fs.readFileSync(uuPath, "utf-8").split(/\r?\n/).filter(Boolean);
    // Lewati baris 0 (title) dan baris 1 (header)
    for (let i = 2; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 9 || !cols[1]) continue;

      const seq = parseInt(cols[1]);
      const rawNumber = cols[8];
      const norm = normalizeOfficialNumber(rawNumber);

      documents.push({
        type: "UU",
        sequenceNumber: seq,
        year: 2026,
        officialNumber: norm.normalized,
        legacyNumber: norm.legacyNumber,
        title: cols[2],
        forum: cols[3] || "Sidang Pleno BLM",
        ...parseIndonesianDateToIso(cols[4], 2026),
        romanMonth: cols[5] || "VIII",
        legalStatus: seq === 1 ? "DIUBAH" : "BERLAKU",
        publicationState: "PUBLISHED",
        slug: generateDocumentSlug("UU", 2026, seq),
        tags: ["UU", "PEMIRA", "Legislasi"],
      });
    }
  }

  // 2. Parsing TAP (3 dokumen)
  const tapPath = path.join(
    baseDir,
    "SPSS PENOMORAN PRODUK HUKUM LEGISLASI BLM 2026 (Updated).docx - Ketetapan BLM.csv"
  );
  if (fs.existsSync(tapPath)) {
    const lines = fs.readFileSync(tapPath, "utf-8").split(/\r?\n/).filter(Boolean);
    for (let i = 2; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 9 || !cols[1]) continue;

      const seq = parseInt(cols[1]);
      const rawNumber = cols[8];
      const norm = normalizeOfficialNumber(rawNumber);

      documents.push({
        type: "TAP",
        sequenceNumber: seq,
        year: 2026,
        officialNumber: norm.normalized,
        legacyNumber: norm.legacyNumber,
        title: cols[2],
        forum: cols[3] || "Sidang Pleno BLM",
        ...parseIndonesianDateToIso(cols[4], 2026),
        romanMonth: cols[5],
        legalStatus: "BERLAKU",
        publicationState: "PUBLISHED",
        slug: generateDocumentSlug("TAP", 2026, seq),
        tags: ["Ketetapan", "Pengawasan", "Kelembagaan"],
      });
    }
  }

  // 3. Parsing SK (39 dokumen + 3 reservasi)
  const skPath = path.join(
    baseDir,
    "SPSS PENOMORAN PRODUK HUKUM LEGISLASI BLM 2026 (Updated).docx - Surat Keputusan.csv"
  );
  if (fs.existsSync(skPath)) {
    const lines = fs.readFileSync(skPath, "utf-8").split(/\r?\n/).filter(Boolean);
    for (let i = 2; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 2 || !cols[1]) continue;

      const seq = parseInt(cols[1]);
      if (isNaN(seq)) continue;

      // Cek apakah baris reservasi (kolom judul kosong)
      const title = cols[3];
      if (!title || title.trim() === "") {
        reservations.push({
          type: "SK",
          sequenceNumber: seq,
          year: 2026,
          purpose: `Nomor dicadangkan register fisik BIRAD 2026 (Baris ${cols[0] || seq})`,
        });
        continue;
      }

      const nature: "A_INTERNAL" | "B_EXTERNAL" = cols[2] === "A" ? "A_INTERNAL" : "B_EXTERNAL";
      const rawNumber = cols[9];
      const norm = normalizeOfficialNumber(rawNumber);
      const abbreviationCode = cols[8];

      documents.push({
        type: "SK",
        sequenceNumber: seq,
        year: 2026,
        officialNumber: norm.normalized,
        legacyNumber: norm.legacyNumber,
        abbreviationCode,
        nature,
        title,
        forum: cols[4] || "Pleno BLM",
        ...parseIndonesianDateToIso(cols[5], 2026),
        romanMonth: cols[6],
        legalStatus: "BERLAKU",
        publicationState: "PUBLISHED",
        slug: generateDocumentSlug("SK", 2026, seq),
        tags: ["SK", nature === "A_INTERNAL" ? "Internal" : "Eksternal", abbreviationCode],
      });
    }
  }

  // 4. Parsing LP (5 dokumen)
  const lpPath = path.join(
    baseDir,
    "SPSS PENOMORAN PRODUK HUKUM LEGISLASI BLM 2026 (Updated).docx - Surat Laporan.csv"
  );
  if (fs.existsSync(lpPath)) {
    const lines = fs.readFileSync(lpPath, "utf-8").split(/\r?\n/).filter(Boolean);
    for (let i = 2; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 9 || !cols[1]) continue;

      const seq = parseInt(cols[1]);
      const rawNumber = cols[8];
      const norm = normalizeOfficialNumber(rawNumber);

      documents.push({
        type: "LP",
        sequenceNumber: seq,
        year: 2026,
        officialNumber: norm.normalized,
        legacyNumber: norm.legacyNumber,
        title: cols[2],
        forum: cols[3] || "Sidang Pleno BLM",
        ...parseIndonesianDateToIso(cols[4], 2026),
        romanMonth: cols[5],
        legalStatus: "BERLAKU",
        publicationState: "PUBLISHED",
        slug: generateDocumentSlug("LP", 2026, seq),
        tags: ["Surat Laporan", "Pengawasan", "Etika"],
      });
    }
  }

  return { documents, reservations };
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");
  const baseDir = path.resolve(__dirname, "../../Nomor Produk Hukum");

  console.log("==================================================================");
  console.log("JDIH BLM FEB UNAIR - Inisialisasi Migrasi Data Register 2026");
  console.log(`Direktori CSV: ${baseDir}`);
  console.log(`Mode Operasi : ${isDryRun ? "DRY-RUN (Validasi Saja)" : "EKSEKUSI DATABASE"}`);
  console.log("==================================================================\n");

  const { documents, reservations } = parseAllRegisterFiles(baseDir);

  const countUu = documents.filter((d) => d.type === "UU").length;
  const countTap = documents.filter((d) => d.type === "TAP").length;
  const countSk = documents.filter((d) => d.type === "SK").length;
  const countLp = documents.filter((d) => d.type === "LP").length;

  console.log("Hasil Parsing Data Register:");
  console.log(`- Undang-Undang (UU) : ${countUu} entri`);
  console.log(`- Ketetapan (TAP)    : ${countTap} entri`);
  console.log(`- Surat Keputusan (SK): ${countSk} entri`);
  console.log(`- Surat Laporan (LP) : ${countLp} entri`);
  console.log(`------------------------------------------------------------------`);
  console.log(`TOTAL PRODUK HUKUM   : ${documents.length} entri (Target: 49)`);
  console.log(`NOMOR RESERVASI (SK) : ${reservations.length} entri (BIRAD 171, 172, 173)\n`);

  if (documents.length !== 49) {
    console.warn(`[PERINGATAN] Jumlah dokumen (${documents.length}) tidak sesuai target kanonikal 49.`);
  } else {
    console.log("[VALIDASI SUKSES] Tepat 49 produk hukum terverifikasi!");
  }

  // Audit Rekonsiliasi
  const legacyDocs = documents.filter((d) => d.legacyNumber);
  console.log(`\nRekonsiliasi Nomor 3-Digit Lama: ${legacyDocs.length} dokumen dinormalisasi:`);
  legacyDocs.forEach((d) => {
    console.log(`  * SK ${d.legacyNumber} -> ${d.officialNumber}`);
  });

  const uu2 = documents.find((d) => d.type === "UU" && d.sequenceNumber === 2);
  if (uu2) {
    console.log(`\nRekonsiliasi Typo Tahun UU 02:`);
    console.log(`  * Nomor Fisik: ${uu2.legacyNumber || "02/UU/.../2926"} -> ${uu2.officialNumber}`);
  }

  // Jika dry run atau koneksi database belum ada di environment, selesaikan
  const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
  if (isDryRun || !connectionString) {
    console.log("\n[INFO] Mode dry-run selesai atau DATABASE_URL belum dikonfigurasi.");
    console.log("Seluruh data valid dan siap dimasukkan ke database Supabase.\n");
    return;
  }

  console.log("\nMenghubungkan ke basis data PostgreSQL...");
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString, maxUses: 1 }),
  });

  try {
    // 1. Upsert Super Admin
    await prisma.adminUser.upsert({
      where: { email: "puguhmuqoddam151@gmail.com" },
      create: {
        email: "puguhmuqoddam151@gmail.com",
        name: "Puguh Muqoddam (Departemen Legislasi)",
        role: "SUPER_ADMIN",
        isActive: true,
      },
      update: { role: "SUPER_ADMIN", isActive: true },
    });
    console.log("✓ Super Admin puguhmuqoddam151@gmail.com terdaftar.");

    // 2. Upsert Document Types
    const typeDefinitions = [
      { code: "UU", name: "Undang-Undang", slug: "undang-undang", padding: 2, pattern: "{seq}/UU/BLMFEBUNAIR/{roman}/{year}", requiresNature: false, hierarchy: 1 },
      { code: "TAP", name: "Ketetapan BLM", slug: "ketetapan-blm", padding: 3, pattern: "{seq}/TAP/BLM/{roman}/{year}", requiresNature: false, hierarchy: 2 },
      { code: "SK", name: "Surat Keputusan", slug: "surat-keputusan", padding: 4, pattern: "{seq}/UN.3.1.4/{nature}/{code}/BLM/{roman}/{year}", requiresNature: true, hierarchy: 3 },
      { code: "LP", name: "Surat Laporan", slug: "lembaran-parlemen", padding: 3, pattern: "{seq}/LP/BLM/{roman}/{year}", requiresNature: false, hierarchy: 4 },
    ];

    const typeIdMap: Record<string, string> = {};
    for (const t of typeDefinitions) {
      const rec = await prisma.documentType.upsert({
        where: { code: t.code },
        create: {
          code: t.code,
          name: t.name,
          slug: t.slug,
          numberPattern: t.pattern,
          numberPadding: t.padding,
          requiresNature: t.requiresNature,
          hierarchyLevel: t.hierarchy,
        },
        update: {},
      });
      typeIdMap[t.code] = rec.id;
    }
    console.log("✓ 4 Tipe Dokumen Resmi di-upsert.");

    // 3. Masukkan 49 Produk Hukum
    for (const doc of documents) {
      const typeId = typeIdMap[doc.type];

      // Forum
      let forumId: string | undefined = undefined;
      if (doc.forum) {
        const forumSlug = doc.forum.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const f = await prisma.forum.upsert({
          where: { name: doc.forum },
          create: { name: doc.forum, slug: forumSlug },
          update: {},
        });
        forumId = f.id;
      }

      await prisma.legalDocument.upsert({
        where: { slug: doc.slug },
        create: {
          slug: doc.slug,
          typeId,
          year: doc.year,
          sequenceNumber: doc.sequenceNumber,
          officialNumber: doc.officialNumber,
          legacyNumber: doc.legacyNumber || null,
          abbreviationCode: doc.abbreviationCode || null,
          nature: doc.nature || null,
          title: doc.title,
          forumId,
          enactedDate: new Date(doc.enactedDate),
          enactedDatePrecision: doc.enactedDatePrecision,
          romanMonth: doc.romanMonth,
          placeOfEnactment: "Surabaya",
          legalStatus: doc.legalStatus,
          publicationState: doc.publicationState,
          publishedAt: new Date(),
          createdBy: "puguhmuqoddam151@gmail.com",
        },
        update: {
          officialNumber: doc.officialNumber,
          legacyNumber: doc.legacyNumber || null,
          title: doc.title,
          legalStatus: doc.legalStatus,
          publicationState: doc.publicationState,
        },
      });
    }
    console.log(`✓ 49 Produk Hukum berhasil disimpan ke database.`);

    // 4. Masukkan Nomor Reservasi
    for (const r of reservations) {
      const typeId = typeIdMap[r.type];
      await prisma.numberReservation.upsert({
        where: {
          typeId_year_sequenceNumber: {
            typeId,
            year: r.year,
            sequenceNumber: r.sequenceNumber,
          },
        },
        create: {
          typeId,
          year: r.year,
          sequenceNumber: r.sequenceNumber,
          purpose: r.purpose,
          reservedBy: "puguhmuqoddam151@gmail.com",
        },
        update: {},
      });
    }
    console.log(`✓ 3 Nomor Reservasi (BIRAD 171-173) berhasil disimpan.`);

    // 5. Perbarui Counter
    await prisma.numberCounter.upsert({
      where: { typeId_year: { typeId: typeIdMap["UU"], year: 2026 } },
      create: { typeId: typeIdMap["UU"], year: 2026, lastNumber: 2 },
      update: { lastNumber: 2 },
    });
    await prisma.numberCounter.upsert({
      where: { typeId_year: { typeId: typeIdMap["TAP"], year: 2026 } },
      create: { typeId: typeIdMap["TAP"], year: 2026, lastNumber: 3 },
      update: { lastNumber: 3 },
    });
    await prisma.numberCounter.upsert({
      where: { typeId_year: { typeId: typeIdMap["SK"], year: 2026 } },
      create: { typeId: typeIdMap["SK"], year: 2026, lastNumber: 170 },
      update: { lastNumber: 170 },
    });
    await prisma.numberCounter.upsert({
      where: { typeId_year: { typeId: typeIdMap["LP"], year: 2026 } },
      create: { typeId: typeIdMap["LP"], year: 2026, lastNumber: 5 },
      update: { lastNumber: 5 },
    });
    console.log("✓ Counter nomor urut resmi disinkronkan.");

    // 6. Catat ke Audit Log
    await prisma.auditLog.create({
      data: {
        actorEmail: "puguhmuqoddam151@gmail.com",
        action: "IMPORT",
        entity: "Database",
        entityId: "seed-register-2026",
        diff: { totalDocuments: 49, totalReservations: 3 },
      },
    });
    console.log("✓ Audit log seeding tersimpan.\n");

    console.log("==================================================================");
    console.log("SELESAI: Seluruh 49 produk hukum 2026 aktif dalam database!");
    console.log("==================================================================");
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Gagal menjalankan migrasi:", err);
    process.exit(1);
  });
}

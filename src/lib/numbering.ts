/**
 * =============================================================================
 * JDIH BLM FEB UNAIR - Mesin Penomoran & Parser Produk Hukum
 * File: src/lib/numbering.ts
 *
 * Modul murni (pure functions) tanpa dependensi basis data untuk mengelola:
 * 1. Konversi Angka Romawi Bulan (I - XII)
 * 2. Padding Nomor Urut Sesuai Aturan Jenis Dokumen
 * 3. Pembuatan Nomor Resmi (format UU, TAP, SK [4 digit 0000], LP)
 * 4. Parser Nomor Resmi dengan Regex Presisi
 * 5. Normalisasi Nomor Warisan (SK 3-digit -> 4-digit, Typo Tahun 2926 -> 2026)
 * 6. Generator Usulan Kode Singkatan SK dari Judul
 * 7. Pembuat Slug Dokumen URL Ramah SEO
 * 8. Pembuat Sitasi Standar Hukum
 *
 * Referensi: IMPLEMENTATION_PLAN.md §2.2, §2.3, §6, §9.2
 * =============================================================================
 */

export type LegalDocumentType = "UU" | "TAP" | "SK" | "LP";
export type SkNatureCode = "A" | "B";
export type SkNatureEnum = "A_INTERNAL" | "B_EXTERNAL";

export interface FormatNumberOptions {
  /** Nomor urut / nomor Buku BIRAD */
  seq: number;
  /** Bulan penetapan: integer 1-12 atau string angka Romawi */
  month: number | string;
  /** Tahun penetapan (antara 2000 - 2100) */
  year: number;
  /** Sifat SK: 'A' (Internal) atau 'B' (Eksternal), wajib untuk SK */
  nature?: SkNatureCode | SkNatureEnum | null;
  /** Kode singkatan SK (mis. SKPLENOI, SKTPEMBERHENTIANANGGOTA), wajib untuk SK */
  code?: string | null;
}

export interface ParsedOfficialNumber {
  /** Jenis produk hukum yang terdeteksi */
  type: LegalDocumentType;
  /** Nomor urut dokumen atau nomor Buku BIRAD */
  sequenceNumber: number;
  /** Bulan dalam angka Romawi (I - XII) */
  romanMonth: string;
  /** Bulan dalam angka integer (1 - 12) */
  month: number;
  /** Tahun penetapan */
  year: number;
  /** Sifat SK (hanya terisi untuk SK) */
  nature?: SkNatureEnum;
  /** Kode singkatan SK verbatim (hanya terisi untuk SK) */
  abbreviationCode?: string;
  /** Nomor resmi kanonikal (standar normalisasi, mis. SK selalu 4 digit) */
  officialNumber: string;
  /** String nomor asli yang dimasukkan ke parser */
  rawNumber: string;
  /** Menandakan apakah string asli merupakan format legacy/anomali yang dinormalisasi */
  isLegacy: boolean;
  /** Nomor warisan sebelum dinormalisasi (jika berbeda dari officialNumber) */
  legacyNumber?: string;
}

// -----------------------------------------------------------------------------
// 1. ANGKAT ROMAWI
// -----------------------------------------------------------------------------

const ROMAN_MAP: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
  11: "XI",
  12: "XII",
};

const INVERSE_ROMAN_MAP: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XI: 11,
  XII: 12,
};

/**
 * Mengonversi angka bulan (1 - 12) ke angka Romawi (I - XII).
 */
export function toRoman(month: number): string {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(
      `Bulan tidak valid: ${month}. Bulan harus berupa bilangan bulat antara 1 dan 12.`
    );
  }
  return ROMAN_MAP[month];
}

/**
 * Mengonversi angka Romawi bulan (I - XII) ke angka integer (1 - 12).
 */
export function fromRoman(roman: string): number {
  if (!roman || typeof roman !== "string") {
    throw new Error("Input angka Romawi tidak boleh kosong.");
  }
  const clean = roman.trim().toUpperCase();
  const val = INVERSE_ROMAN_MAP[clean];
  if (!val) {
    throw new Error(
      `Angka Romawi bulan tidak valid: "${roman}". Harus berada di antara I dan XII.`
    );
  }
  return val;
}

/**
 * Memeriksa apakah suatu string merupakan angka Romawi bulan yang valid (I - XII).
 */
export function isValidRoman(roman: string): boolean {
  if (!roman || typeof roman !== "string") return false;
  return cleanRoman(roman) in INVERSE_ROMAN_MAP;
}

function cleanRoman(str: string): string {
  return str.trim().toUpperCase();
}

// -----------------------------------------------------------------------------
// 2. PADDING & HELPER
// -----------------------------------------------------------------------------

/**
 * Menambahkan padding nol di depan nomor urut.
 */
export function padSequence(seq: number, padding: number): string {
  if (!Number.isInteger(seq) || seq < 0) {
    throw new Error(`Nomor urut harus bilangan bulat positif: ${seq}`);
  }
  return String(seq).padStart(padding, "0");
}

/**
 * Mengonversi nilai enum sifat SK ke kode huruf ('A' | 'B').
 */
export function natureToCode(nature: SkNatureCode | SkNatureEnum): SkNatureCode {
  if (nature === "A" || nature === "A_INTERNAL") return "A";
  if (nature === "B" || nature === "B_EXTERNAL") return "B";
  throw new Error(`Sifat SK tidak valid: ${nature}`);
}

/**
 * Mengonversi kode huruf sifat SK ('A' | 'B') ke enum Prisma ('A_INTERNAL' | 'B_EXTERNAL').
 */
export function natureToEnum(code: string): SkNatureEnum {
  const clean = code.trim().toUpperCase();
  if (clean === "A" || clean === "A_INTERNAL") return "A_INTERNAL";
  if (clean === "B" || clean === "B_EXTERNAL") return "B_EXTERNAL";
  throw new Error(`Kode sifat SK tidak valid: "${code}". Harus 'A' atau 'B'.`);
}

// -----------------------------------------------------------------------------
// 3. GENERATOR NOMOR RESMI (formatOfficialNumber)
// -----------------------------------------------------------------------------

/**
 * Menghasilkan nomor resmi produk hukum sesuai aturan penomoran BLM FEB UNAIR.
 *
 * Aturan (§2.2):
 * - UU:  [2 digit]/UU/BLMFEBUNAIR/[Bulan Romawi]/[Tahun]
 * - TAP: [3 digit]/TAP/BLM/[Bulan Romawi]/[Tahun]
 * - SK:  [4 digit (0000)]/UN.3.1.4/[A|B]/[Kode Singkatan]/BLM/[Bulan Romawi]/[Tahun]
 * - LP:  [3 digit]/LP/BLM/[Bulan Romawi]/[Tahun]
 */
export function formatOfficialNumber(
  type: LegalDocumentType,
  options: FormatNumberOptions
): string {
  const { seq, year } = options;

  if (!Number.isInteger(seq) || seq <= 0) {
    throw new Error(`Nomor urut harus lebih besar dari 0. Diterima: ${seq}`);
  }

  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    throw new Error(`Tahun harus berada di rentang 2000 - 2100. Diterima: ${year}`);
  }

  // Resolve bulan Romawi
  let roman: string;
  if (typeof options.month === "number") {
    roman = toRoman(options.month);
  } else {
    const clean = options.month.trim().toUpperCase();
    if (!isValidRoman(clean)) {
      throw new Error(`Format bulan Romawi tidak valid: "${options.month}"`);
    }
    roman = clean;
  }

  switch (type) {
    case "UU": {
      const padded = padSequence(seq, 2);
      return `${padded}/UU/BLMFEBUNAIR/${roman}/${year}`;
    }

    case "TAP": {
      const padded = padSequence(seq, 3);
      return `${padded}/TAP/BLM/${roman}/${year}`;
    }

    case "SK": {
      if (!options.nature) {
        throw new Error("Sifat SK ('A' Internal atau 'B' Eksternal) wajib diisi untuk Surat Keputusan.");
      }
      if (!options.code || !options.code.trim()) {
        throw new Error("Kode singkatan SK wajib diisi untuk Surat Keputusan.");
      }

      const natureLetter = natureToCode(options.nature);
      // Sanitasi kode singkatan: huruf kapital & angka tanpa spasi
      const cleanCode = options.code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");

      if (!cleanCode) {
        throw new Error(`Kode singkatan SK tidak valid setelah disanitasi: "${options.code}"`);
      }

      // SK selalu menggunakan 4 digit (0000)
      const padded = padSequence(seq, 4);
      return `${padded}/UN.3.1.4/${natureLetter}/${cleanCode}/BLM/${roman}/${year}`;
    }

    case "LP": {
      const padded = padSequence(seq, 3);
      return `${padded}/LP/BLM/${roman}/${year}`;
    }

    default: {
      const exhaustiveCheck: never = type;
      throw new Error(`Jenis dokumen tidak dikenali: ${exhaustiveCheck}`);
    }
  }
}

// -----------------------------------------------------------------------------
// 4. PARSER NOMOR RESMI (parseOfficialNumber)
// -----------------------------------------------------------------------------

// Regex untuk UU: mendukung format resmi 01/UU/BLMFEBUNAIR/VIII/2026 serta variasi typo 2926
const REGEX_UU = /^(\d{1,4})\/UU\/BLM(?:-?FEB)?(?:-?UNAIR)?\/([IVXLCDM]+)\/(\d{4})$/i;

// Regex untuk TAP: format 001/TAP/BLM/IV/2026
const REGEX_TAP = /^(\d{1,4})\/TAP\/BLM\/([IVXLCDM]+)\/(\d{4})$/i;

// Regex untuk SK: mendukung format 3 digit (100) dan 4 digit (0100)
// Format: 0148/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026
const REGEX_SK = /^(\d{1,4})\/UN\.3\.1\.4\/([AB])\/([A-Za-z0-9_]+)\/BLM\/([IVXLCDM]+)\/(\d{4})$/i;

// Regex untuk LP: format 004/LP/BLM/IX/2026
const REGEX_LP = /^(\d{1,4})\/LP\/BLM\/([IVXLCDM]+)\/(\d{4})$/i;

/**
 * Mengurai string nomor resmi menjadi komponen terstruktur.
 * Mampu mendeteksi dan menormalkan format warisan (seperti SK 3 digit dan typo 2926).
 */
export function parseOfficialNumber(input: string): ParsedOfficialNumber | null {
  if (!input || typeof input !== "string") return null;

  const raw = input.trim();

  // 1. Cek Pola UU
  const matchUU = raw.match(REGEX_UU);
  if (matchUU) {
    const rawSeq = parseInt(matchUU[1], 10);
    const roman = matchUU[2].toUpperCase();
    let rawYear = parseInt(matchUU[3], 10);
    let isLegacy = false;
    let legacyNumber: string | undefined;

    // Koreksi otomatis typo tahun 2926 -> 2026 (§2.3 #1)
    if (rawYear === 2926) {
      isLegacy = true;
      legacyNumber = raw;
      rawYear = 2026;
    }

    if (!isValidRoman(roman)) return null;

    const officialNumber = formatOfficialNumber("UU", {
      seq: rawSeq,
      month: roman,
      year: rawYear,
    });

    if (raw !== officialNumber && !legacyNumber) {
      isLegacy = true;
      legacyNumber = raw;
    }

    return {
      type: "UU",
      sequenceNumber: rawSeq,
      romanMonth: roman,
      month: fromRoman(roman),
      year: rawYear,
      officialNumber,
      rawNumber: raw,
      isLegacy,
      legacyNumber,
    };
  }

  // 2. Cek Pola TAP
  const matchTAP = raw.match(REGEX_TAP);
  if (matchTAP) {
    const rawSeq = parseInt(matchTAP[1], 10);
    const roman = matchTAP[2].toUpperCase();
    const rawYear = parseInt(matchTAP[3], 10);

    if (!isValidRoman(roman)) return null;

    const officialNumber = formatOfficialNumber("TAP", {
      seq: rawSeq,
      month: roman,
      year: rawYear,
    });

    const isLegacy = raw !== officialNumber;

    return {
      type: "TAP",
      sequenceNumber: rawSeq,
      romanMonth: roman,
      month: fromRoman(roman),
      year: rawYear,
      officialNumber,
      rawNumber: raw,
      isLegacy,
      legacyNumber: isLegacy ? raw : undefined,
    };
  }

  // 3. Cek Pola SK
  const matchSK = raw.match(REGEX_SK);
  if (matchSK) {
    const rawSeqStr = matchSK[1];
    const rawSeq = parseInt(rawSeqStr, 10);
    const natureCode = matchSK[2].toUpperCase();
    const code = matchSK[3].toUpperCase();
    const roman = matchSK[4].toUpperCase();
    const rawYear = parseInt(matchSK[5], 10);

    if (!isValidRoman(roman)) return null;

    const natureEnum = natureToEnum(natureCode);

    // Format kanonikal: selalu 4 digit (0000)
    const officialNumber = formatOfficialNumber("SK", {
      seq: rawSeq,
      month: roman,
      year: rawYear,
      nature: natureCode as SkNatureCode,
      code,
    });

    // Menandai legacy jika panjang nomor urut < 4 digit (misal: 100 s/d 108)
    const isLegacy = rawSeqStr.length < 4 || raw !== officialNumber;

    return {
      type: "SK",
      sequenceNumber: rawSeq,
      romanMonth: roman,
      month: fromRoman(roman),
      year: rawYear,
      nature: natureEnum,
      abbreviationCode: code,
      officialNumber,
      rawNumber: raw,
      isLegacy,
      legacyNumber: isLegacy ? raw : undefined,
    };
  }

  // 4. Cek Pola LP
  const matchLP = raw.match(REGEX_LP);
  if (matchLP) {
    const rawSeq = parseInt(matchLP[1], 10);
    const roman = matchLP[2].toUpperCase();
    const rawYear = parseInt(matchLP[3], 10);

    if (!isValidRoman(roman)) return null;

    const officialNumber = formatOfficialNumber("LP", {
      seq: rawSeq,
      month: roman,
      year: rawYear,
    });

    const isLegacy = raw !== officialNumber;

    return {
      type: "LP",
      sequenceNumber: rawSeq,
      romanMonth: roman,
      month: fromRoman(roman),
      year: rawYear,
      officialNumber,
      rawNumber: raw,
      isLegacy,
      legacyNumber: isLegacy ? raw : undefined,
    };
  }

  return null;
}

/**
 * Menormalkan string nomor resmi produk hukum.
 * Mengembalikan versi standar serta mencatat jika ada perubahan.
 */
export function normalizeOfficialNumber(input: string): {
  normalized: string;
  wasModified: boolean;
  legacyNumber?: string;
} {
  const parsed = parseOfficialNumber(input);
  if (!parsed) {
    return {
      normalized: input.trim(),
      wasModified: false,
    };
  }

  return {
    normalized: parsed.officialNumber,
    wasModified: parsed.isLegacy,
    legacyNumber: parsed.legacyNumber,
  };
}

// -----------------------------------------------------------------------------
// 5. USULAN KODE SINGKATAN SK (suggestAbbreviationCode)
// -----------------------------------------------------------------------------

/**
 * Menghasilkan saran kode singkatan SK dari judul dokumen.
 * Sesuai konvensi Biro Administrasi BLM FEB UNAIR.
 *
 * Contoh:
 * - "SK Sidang Pleno I" -> "SKPLENOI"
 * - "SK Agenda Acara Sidang Pleno" -> "SKAGENDAACARAPLENO"
 * - "SK Tata Tertib Sidang Pleno" -> "SKTATATERTIBPLENO"
 * - "SK Kebijakan Orientasi Studi" -> "SKKEBIJAKANORIENTASIPLENO"
 * - "SK Pengunduran Diri Anggota BLM" -> "SKPENGUNDURANDIRIBLM"
 * - "SK Pemberhentian Anggota BLM" -> "SKPEMBERHENTIANANGGOTA"
 * - "SK Rekomendasi Penetapan Calon Penyelenggara PEMIRA" -> "SKREKOMENDASIPEMIRA"
 */
export function suggestAbbreviationCode(title: string): string {
  if (!title || typeof title !== "string") return "SK";

  let clean = title.trim();

  // Pola spesifik yang umum di register
  const patterns: Array<{ regex: RegExp; code: string }> = [
    { regex: /Sidang\s+Pleno\s+I\b/i, code: "SKPLENOI" },
    { regex: /Sidang\s+Pleno\s+II\b/i, code: "SKPLENOII" },
    { regex: /Sidang\s+Pleno\s+III\b/i, code: "SKPLENOIII" },
    { regex: /Sidang\s+Pleno\s+IV\b/i, code: "SKPLENOIV" },
    { regex: /Sidang\s+Pleno\s+V\b/i, code: "SKPLENOV" },
    { regex: /Agenda\s+Acara.*PEMIRA/i, code: "SKAGENDAACARAPEMIRA" },
    { regex: /Tata\s+Tertib.*PEMIRA/i, code: "SKTATATERTIBPEMIRA" },
    { regex: /Pleno\s+I\s+PEMIRA/i, code: "SKPLENOIPEMIRA" },
    { regex: /Pleno\s+II\s+PEMIRA/i, code: "SKPLENOIIPEMIRA" },
    { regex: /Pengesahan\s+UU\s+PEMIRA/i, code: "SKUUPEMIRA" },
    { regex: /Agenda\s+Acara.*Pleno\s+Jilid\s*3/i, code: "SKAGENDAACARAPLENO3" },
    { regex: /Agenda\s+Acara/i, code: "SKAGENDAACARAPLENO" },
    { regex: /Tata\s+Tertib/i, code: "SKTATATERTIB" },
    { regex: /Kepengurusan\s+Sementara\s+LPPM/i, code: "SKKEPENGURUSANSEMENTARA" },
    { regex: /Pengunduran\s+Diri/i, code: "SKPENGUNDURANDIRIBLM" },
    { regex: /Pemberhentian\s+Anggota/i, code: "SKPEMBERHENTIANANGGOTA" },
    { regex: /Pemberian\s+SP\s*1/i, code: "SKPEMBERIANSURATPERINGATANPLENO" },
    { regex: /Rekomendasi.*PEMIRA/i, code: "SKREKOMENDASIPEMIRA" },
    { regex: /Pemanggilan\s+Khusus\s+Pleno/i, code: "SKPEMANGGILANKHUSUS" },
    { regex: /Peringatan.*Ospek/i, code: "SKPERINGATANOSJUR" },
    { regex: /Pemanggilan.*Ospek/i, code: "SKPEMANGGILANOSJUR" },
    { regex: /Peringatan.*Bawashim/i, code: "SKPERINGATANBAWASHIM" },
    { regex: /Pemanggilan.*HIMA\s+Manajemen/i, code: "SKPEMANGGILANHIMAMENE" },
    { regex: /Kebijakan\s+Orientasi\s+Studi/i, code: "SKKEBIJAKANORIENTASIPLENO" },
  ];

  for (const p of patterns) {
    if (p.regex.test(clean)) {
      return p.code;
    }
  }

  // Fallback heuristik: bersihkan kata sambung umum, ambil huruf kapital
  // Jika tidak diawali SK, tambahkan SK
  let transformed = clean
    .replace(/^Surat\s+Keputusan\s+/i, "")
    .replace(/^SK\s+/i, "")
    .replace(/\b(dan|atau|tentang|terhadap|pada|di|dalam|atas|untuk)\b/gi, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase();

  if (!transformed.startsWith("SK")) {
    transformed = "SK" + transformed;
  }

  // Batasi panjang wajar (maksimal 30 karakter)
  return transformed.slice(0, 30) || "SK";
}

// -----------------------------------------------------------------------------
// 6. GENERATOR SLUG & PERMALINK (§9.1)
// -----------------------------------------------------------------------------

/**
 * Menghasilkan slug URL yang unik, ramah SEO, dan stabil untuk produk hukum.
 * Contoh:
 * - UU:  uu-2026-01
 * - TAP: tap-2026-002
 * - SK:  sk-2026-0148
 * - LP:  lp-2026-004
 */
export function generateDocumentSlug(
  type: LegalDocumentType,
  year: number,
  sequenceNumber: number
): string {
  const typeSlug = type.toLowerCase();
  let padding = 2;
  if (type === "TAP" || type === "LP") padding = 3;
  if (type === "SK") padding = 4;

  const paddedSeq = padSequence(sequenceNumber, padding);
  return `${typeSlug}-${year}-${paddedSeq}`;
}

// -----------------------------------------------------------------------------
// 7. FORMAT SITASI DOKUMEN (§9.2)
// -----------------------------------------------------------------------------

export interface CitationParams {
  typeName: string;
  officialNumber: string;
  title: string;
  placeOfEnactment?: string;
  enactedDateFormatted: string; // mis. "28 Juli 2026"
}

/**
 * Menghasilkan teks sitasi standar hukum untuk disalin pengunjung portal.
 * Contoh keluaran:
 * "Ketetapan BLM FEB UNAIR Nomor 002/TAP/BLM/VII/2026 tentang Kebijakan Orientasi Studi dan Pengenalan Kampus di Lingkungan FEB UNAIR, ditetapkan di Surabaya pada 28 Juli 2026."
 */
export function formatCitation(params: CitationParams): string {
  const {
    typeName,
    officialNumber,
    title,
    placeOfEnactment = "Surabaya",
    enactedDateFormatted,
  } = params;

  return `${typeName} FEB UNAIR Nomor ${officialNumber} tentang ${title}, ditetapkan di ${placeOfEnactment} pada ${enactedDateFormatted}.`;
}

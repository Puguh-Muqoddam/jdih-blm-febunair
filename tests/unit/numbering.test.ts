import { describe, it, expect } from "vitest";
import {
  toRoman,
  fromRoman,
  isValidRoman,
  padSequence,
  formatOfficialNumber,
  parseOfficialNumber,
  normalizeOfficialNumber,
  suggestAbbreviationCode,
  generateDocumentSlug,
  formatCitation,
} from "../../src/lib/numbering";

describe("Mesin Penomoran JDIH BLM FEB UNAIR (src/lib/numbering.ts)", () => {
  // ---------------------------------------------------------------------------
  // 1. Angka Romawi
  // ---------------------------------------------------------------------------
  describe("Konversi Angka Romawi", () => {
    it("harus mengonversi bulan 1 s/d 12 ke Romawi yang benar", () => {
      const expected = [
        "I", "II", "III", "IV", "V", "VI",
        "VII", "VIII", "IX", "X", "XI", "XII",
      ];
      for (let m = 1; m <= 12; m++) {
        expect(toRoman(m)).toBe(expected[m - 1]);
        expect(fromRoman(expected[m - 1])).toBe(m);
        expect(isValidRoman(expected[m - 1])).toBe(true);
      }
    });

    it("harus menangani huruf kecil dan spasi pada fromRoman", () => {
      expect(fromRoman(" vii ")).toBe(7);
      expect(fromRoman("ix")).toBe(9);
      expect(fromRoman("XII")).toBe(12);
    });

    it("harus melempar error untuk bulan di luar 1-12", () => {
      expect(() => toRoman(0)).toThrow();
      expect(() => toRoman(13)).toThrow();
      expect(() => toRoman(-1)).toThrow();
      expect(() => fromRoman("XIII")).toThrow();
      expect(() => fromRoman("ABC")).toThrow();
    });

    it("harus memvalidasi string bukan Romawi dengan benar", () => {
      expect(isValidRoman("")).toBe(false);
      expect(isValidRoman("2026")).toBe(false);
      expect(isValidRoman("XIV")).toBe(false);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Padding Nomor
  // ---------------------------------------------------------------------------
  describe("Padding Nomor Urut", () => {
    it("harus menambahkan nol di depan nomor sesuai panjang padding", () => {
      expect(padSequence(1, 2)).toBe("01");
      expect(padSequence(1, 3)).toBe("001");
      expect(padSequence(1, 4)).toBe("0001");
      expect(padSequence(148, 4)).toBe("0148");
      expect(padSequence(100, 4)).toBe("0100");
    });

    it("harus menolak nomor urut negatif", () => {
      expect(() => padSequence(-5, 3)).toThrow();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Format Nomor Resmi (formatOfficialNumber)
  // ---------------------------------------------------------------------------
  describe("Format Nomor Resmi (formatOfficialNumber)", () => {
    it("harus memformat UU dengan pola 2 digit", () => {
      const num = formatOfficialNumber("UU", {
        seq: 1,
        month: 8,
        year: 2026,
      });
      expect(num).toBe("01/UU/BLMFEBUNAIR/VIII/2026");
    });

    it("harus memformat TAP dengan pola 3 digit", () => {
      const num = formatOfficialNumber("TAP", {
        seq: 2,
        month: "VII",
        year: 2026,
      });
      expect(num).toBe("002/TAP/BLM/VII/2026");
    });

    it("harus memformat SK dengan pola 4 digit (0000) dan sifat A/B", () => {
      const skA = formatOfficialNumber("SK", {
        seq: 100,
        month: 7,
        year: 2026,
        nature: "A",
        code: "SKPLENOI",
      });
      expect(skA).toBe("0100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026");

      const skB = formatOfficialNumber("SK", {
        seq: 148,
        month: "IX",
        year: 2026,
        nature: "B_EXTERNAL",
        code: "SKKEPENGURUSANSEMENTARA",
      });
      expect(skB).toBe("0148/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026");
    });

    it("harus memformat LP dengan pola 3 digit", () => {
      const num = formatOfficialNumber("LP", {
        seq: 4,
        month: 9,
        year: 2026,
      });
      expect(num).toBe("004/LP/BLM/IX/2026");
    });

    it("harus melempar error jika sifat atau kode SK tidak disediakan", () => {
      expect(() =>
        formatOfficialNumber("SK", {
          seq: 100,
          month: 7,
          year: 2026,
          code: "SKTEST",
        })
      ).toThrow("Sifat SK");

      expect(() =>
        formatOfficialNumber("SK", {
          seq: 100,
          month: 7,
          year: 2026,
          nature: "A",
          code: "",
        })
      ).toThrow("Kode singkatan SK");
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Verifikasi Seluruh 49 Dokumen Register 2026 (parseOfficialNumber)
  // ---------------------------------------------------------------------------
  describe("Parser & Validasi Seluruh 49 Dokumen Register", () => {
    // 4.1 UU (2 entri)
    it("harus mem-parse ke-2 dokumen UU dari register", () => {
      const uuData = [
        {
          raw: "01/UU/BLMFEBUNAIR/VIII/2026",
          expectedSeq: 1,
          expectedOfficial: "01/UU/BLMFEBUNAIR/VIII/2026",
          isLegacy: false,
        },
        {
          // Typo asli 2926 di register dikoreksi otomatis ke 2026
          raw: "02/UU/BLMFEBUNAIR/VIII/2926",
          expectedSeq: 2,
          expectedOfficial: "02/UU/BLMFEBUNAIR/VIII/2026",
          isLegacy: true,
        },
      ];

      for (const item of uuData) {
        const parsed = parseOfficialNumber(item.raw);
        expect(parsed).not.toBeNull();
        expect(parsed!.type).toBe("UU");
        expect(parsed!.sequenceNumber).toBe(item.expectedSeq);
        expect(parsed!.romanMonth).toBe("VIII");
        expect(parsed!.month).toBe(8);
        expect(parsed!.year).toBe(2026);
        expect(parsed!.officialNumber).toBe(item.expectedOfficial);
        expect(parsed!.isLegacy).toBe(item.isLegacy);
      }
    });

    // 4.2 TAP (3 entri)
    it("harus mem-parse ke-3 dokumen TAP dari register", () => {
      const tapData = [
        { raw: "001/TAP/BLM/IV/2026", seq: 1, roman: "IV", month: 4 },
        { raw: "002/TAP/BLM/VII/2026", seq: 2, roman: "VII", month: 7 },
        { raw: "003/TAP/BLM/IX/2026", seq: 3, roman: "IX", month: 9 },
      ];

      for (const item of tapData) {
        const parsed = parseOfficialNumber(item.raw);
        expect(parsed).not.toBeNull();
        expect(parsed!.type).toBe("TAP");
        expect(parsed!.sequenceNumber).toBe(item.seq);
        expect(parsed!.romanMonth).toBe(item.roman);
        expect(parsed!.month).toBe(item.month);
        expect(parsed!.year).toBe(2026);
        expect(parsed!.officialNumber).toBe(item.raw);
        expect(parsed!.isLegacy).toBe(false);
      }
    });

    // 4.3 LP (5 entri)
    it("harus mem-parse ke-5 dokumen Surat Laporan (LP) dari register", () => {
      const lpData = [
        { raw: "001/LP/BLM/VII/2026", seq: 1, month: 7, roman: "VII" },
        { raw: "002/LP/BLM/VII/2026", seq: 2, month: 7, roman: "VII" },
        { raw: "003/LP/BLM/IX/2026", seq: 3, month: 9, roman: "IX" },
        { raw: "004/LP/BLM/IX/2026", seq: 4, month: 9, roman: "IX" },
        { raw: "005/LP/BLM/IX/2026", seq: 5, month: 9, roman: "IX" },
      ];

      for (const item of lpData) {
        const parsed = parseOfficialNumber(item.raw);
        expect(parsed).not.toBeNull();
        expect(parsed!.type).toBe("LP");
        expect(parsed!.sequenceNumber).toBe(item.seq);
        expect(parsed!.month).toBe(item.month);
        expect(parsed!.romanMonth).toBe(item.roman);
        expect(parsed!.year).toBe(2026);
        expect(parsed!.officialNumber).toBe(item.raw);
        expect(parsed!.isLegacy).toBe(false);
      }
    });

    // 4.4 SK (39 entri)
    it("harus mem-parse dan menormalkan 9 nomor SK lama (100 s/d 108) menjadi 4 digit", () => {
      const legacySkData = [
        {
          raw: "100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026",
          seq: 100,
          expected: "0100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026",
          nature: "A_INTERNAL",
          code: "SKPLENOI",
        },
        {
          raw: "101/UN.3.1.4/B/SKPLENOII/BLM/VII/2026",
          seq: 101,
          expected: "0101/UN.3.1.4/B/SKPLENOII/BLM/VII/2026",
          nature: "B_EXTERNAL",
          code: "SKPLENOII",
        },
        {
          raw: "102/UN.3.1.4/A/SKPLENOIII/BLM/VII/2026",
          seq: 102,
          expected: "0102/UN.3.1.4/A/SKPLENOIII/BLM/VII/2026",
          nature: "A_INTERNAL",
          code: "SKPLENOIII",
        },
        {
          raw: "103/UN.3.1.4/A/SKPLENOIV/BLM/VII/2026",
          seq: 103,
          expected: "0103/UN.3.1.4/A/SKPLENOIV/BLM/VII/2026",
          nature: "A_INTERNAL",
          code: "SKPLENOIV",
        },
        {
          raw: "104/UN.3.1.4/A/SKAGENDAACARAPLENO/BLM/VII/2026",
          seq: 104,
          expected: "0104/UN.3.1.4/A/SKAGENDAACARAPLENO/BLM/VII/2026",
          nature: "A_INTERNAL",
          code: "SKAGENDAACARAPLENO",
        },
        {
          raw: "105/UN.3.1.4/A/SKTATATERTIBPLENO/BLM/VII/2026",
          seq: 105,
          expected: "0105/UN.3.1.4/A/SKTATATERTIBPLENO/BLM/VII/2026",
          nature: "A_INTERNAL",
          code: "SKTATATERTIBPLENO",
        },
        {
          raw: "106/UN.3.1.4/A/SKKEBIJAKANORIENTASIPLENO/BLM/VII/2026",
          seq: 106,
          expected: "0106/UN.3.1.4/A/SKKEBIJAKANORIENTASIPLENO/BLM/VII/2026",
          nature: "A_INTERNAL",
          code: "SKKEBIJAKANORIENTASIPLENO",
        },
        {
          raw: "107/UN.3.1.4/A/SKPENGUNDURANDIRIBLMPLENO/BLM/VII/2026",
          seq: 107,
          expected: "0107/UN.3.1.4/A/SKPENGUNDURANDIRIBLMPLENO/BLM/VII/2026",
          nature: "A_INTERNAL",
          code: "SKPENGUNDURANDIRIBLMPLENO",
        },
        {
          raw: "108/UN.3.1.4/A/SKPEMBERIANSURATPERINGATANPLENO/BLM/VII/2026",
          seq: 108,
          expected: "0108/UN.3.1.4/A/SKPEMBERIANSURATPERINGATANPLENO/BLM/VII/2026",
          nature: "A_INTERNAL",
          code: "SKPEMBERIANSURATPERINGATANPLENO",
        },
      ];

      for (const item of legacySkData) {
        const parsed = parseOfficialNumber(item.raw);
        expect(parsed).not.toBeNull();
        expect(parsed!.type).toBe("SK");
        expect(parsed!.sequenceNumber).toBe(item.seq);
        expect(parsed!.officialNumber).toBe(item.expected);
        expect(parsed!.rawNumber).toBe(item.raw);
        expect(parsed!.nature).toBe(item.nature);
        expect(parsed!.abbreviationCode).toBe(item.code);
        expect(parsed!.isLegacy).toBe(true);
        expect(parsed!.legacyNumber).toBe(item.raw);
      }
    });

    it("harus mem-parse 30 nomor SK 4-digit (0126 s/d 0170) dengan presisi", () => {
      const modernSkRaw = [
        "0126/UN.3.1.4/B/SKAGENDAACARAPEMIRA/BLM/VIII/2026",
        "0127/UN.3.1.4/B/SKTATATERTIBPEMIRA/BLM/VIII/2026",
        "0128/UN.3.1.4/B/SKPLENOIPEMIRA/BLM/VIII/2026",
        "0129/UN.3.1.4/B/SKUUPEMIRA/BLM/VIII/2026",
        "0130/UN.3.1.4/B/SKPLENOIIPEMIRA/BLM/VIII/2026",
        "0141/UN.3.1.4/A/SKPLENOI/BLM/IX/2026",
        "0142/UN.3.1.4/B/SKPLENOII/BLM/IX/2026",
        "0143/UN.3.1.4/A/SKPLENOIII/BLM/IX/2026",
        "0144/UN.3.1.4/B/SKPLENOIV/BLM/IX/2026",
        "0145/UN.3.1.4/B/SKPLENOV/BLM/IX/2026",
        "0146/UN.3.1.4/A/SKAGENDAACARA/BLM/IX/2026",
        "0147/UN.3.1.4/A/SKTATATERTIB/BLM/IX/2026",
        "0148/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026",
        "0149/UN.3.1.4/A/SKPENGUNDURANDIRIBLM/BLM/IX/2026",
        // SK 0150 mempertahankan kode Departemen Legislasi apa adanya: SKTPEMBERHENTIANANGGOTA
        "0150/UN.3.1.4/A/SKTPEMBERHENTIANANGGOTA/BLM/IX/2026",
        "0151/UN.3.1.4/B/SKREKOMENDASIPEMIRA/BLM/IX/2026",
        "0152/UN.3.1.4/B/SKPEMANGGILANKHUSUS/BLM/IX/2026",
        // SK 0158 memiliki digit '3' di kode singkatan
        "0158/UN.3.1.4/A/SKAGENDAACARAPLENO3/BLM/IX/2026",
        "0159/UN.3.1.4/A/SKTATATERTIB/BLM/IX/2026",
        "0160/UN.3.1.4/A/SKPLENOI/BLM/IX/2026",
        "0161/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026",
        "0162/UN.3.1.4/B/SKPLENOII/BLM/IX/2026",
        "0163/UN.3.1.4/B/SKREKOMENDASIPEMIRA/BLM/IX/2026",
        "0164/UN.3.1.4/B/SKPLENOIII/BLM/IX/2026",
        "0165/UN.3.1.4/B/SKPERINGATANOSJUR/BLM/IX/2026",
        "0166/UN.3.1.4/B/SKPEMANGGILANOSJUR/BLM/IX/2026",
        "0167/UN.3.1.4/B/SKPLENOIV/BLM/IX/2026",
        "0168/UN.3.1.4/B/SKPERINGATANBAWASHIM/BLM/IX/2026",
        "0169/UN.3.1.4/B/SKPEMANGGILANHIMAMENE/BLM/IX/2026",
        "0170/UN.3.1.4/B/SKPLENOV/BLM/IX/2026",
      ];

      expect(modernSkRaw.length).toBe(30);

      for (const raw of modernSkRaw) {
        const parsed = parseOfficialNumber(raw);
        expect(parsed).not.toBeNull();
        expect(parsed!.type).toBe("SK");
        expect(parsed!.officialNumber).toBe(raw);
        expect(parsed!.isLegacy).toBe(false);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Normalisasi Nomor (normalizeOfficialNumber)
  // ---------------------------------------------------------------------------
  describe("Fungsi Normalisasi (normalizeOfficialNumber)", () => {
    it("harus menormalkan SK 3 digit ke 4 digit dan mencatat status modifikasi", () => {
      const res = normalizeOfficialNumber("100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026");
      expect(res.wasModified).toBe(true);
      expect(res.normalized).toBe("0100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026");
      expect(res.legacyNumber).toBe("100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026");
    });

    it("harus menormalkan typo tahun 2926 pada UU No. 02", () => {
      const res = normalizeOfficialNumber("02/UU/BLMFEBUNAIR/VIII/2926");
      expect(res.wasModified).toBe(true);
      expect(res.normalized).toBe("02/UU/BLMFEBUNAIR/VIII/2026");
      expect(res.legacyNumber).toBe("02/UU/BLMFEBUNAIR/VIII/2926");
    });

    it("tidak memodifikasi nomor yang sudah sesuai format kanonikal", () => {
      const raw = "0148/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026";
      const res = normalizeOfficialNumber(raw);
      expect(res.wasModified).toBe(false);
      expect(res.normalized).toBe(raw);
      expect(res.legacyNumber).toBeUndefined();
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Usulan Kode Singkatan SK (suggestAbbreviationCode)
  // ---------------------------------------------------------------------------
  describe("Usulan Kode Singkatan SK (suggestAbbreviationCode)", () => {
    it("harus mengenali judul sidang pleno dengan nomor romawi", () => {
      expect(suggestAbbreviationCode("SK Sidang Pleno I")).toBe("SKPLENOI");
      expect(suggestAbbreviationCode("SK Sidang Pleno II")).toBe("SKPLENOII");
      expect(suggestAbbreviationCode("SK Sidang Pleno III")).toBe("SKPLENOIII");
      expect(suggestAbbreviationCode("SK Sidang Pleno IV")).toBe("SKPLENOIV");
      expect(suggestAbbreviationCode("SK Sidang Pleno V")).toBe("SKPLENOV");
    });

    it("harus mengenali judul topik khusus", () => {
      expect(
        suggestAbbreviationCode("SK Agenda Acara Sidang Pleno Jilid 3")
      ).toBe("SKAGENDAACARAPLENO3");
      expect(
        suggestAbbreviationCode("SK Kepengurusan Sementara LPPM SEKTOR")
      ).toBe("SKKEPENGURUSANSEMENTARA");
      expect(
        suggestAbbreviationCode("SK Pengunduran Diri Anggota BLM")
      ).toBe("SKPENGUNDURANDIRIBLM");
      expect(
        suggestAbbreviationCode("SK Pemberhentian Anggota BLM")
      ).toBe("SKPEMBERHENTIANANGGOTA");
      expect(
        suggestAbbreviationCode("SK Rekomendasi Penetapan Calon Penyelenggara PEMIRA")
      ).toBe("SKREKOMENDASIPEMIRA");
    });

    it("harus membersihkan judul acak dan memberikan awalan SK", () => {
      const code = suggestAbbreviationCode("Perubahan Regulasi Keuangan Mahasiswa");
      expect(code.startsWith("SK")).toBe(true);
      expect(/^[A-Z0-9]+$/.test(code)).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Slug & Sitasi
  // ---------------------------------------------------------------------------
  describe("Slug Dokumen & Sitasi Standar", () => {
    it("harus menghasilkan slug URL ramah SEO sesuai spesifikasi §9.1", () => {
      expect(generateDocumentSlug("UU", 2026, 1)).toBe("uu-2026-01");
      expect(generateDocumentSlug("TAP", 2026, 2)).toBe("tap-2026-002");
      expect(generateDocumentSlug("SK", 2026, 148)).toBe("sk-2026-0148");
      expect(generateDocumentSlug("LP", 2026, 4)).toBe("lp-2026-004");
    });

    it("harus menghasilkan teks sitasi hukum formal sesuai spesifikasi §9.2", () => {
      const citation = formatCitation({
        typeName: "Ketetapan BLM",
        officialNumber: "002/TAP/BLM/VII/2026",
        title: "Kebijakan Orientasi Studi dan Pengenalan Kampus di Lingkungan FEB UNAIR",
        placeOfEnactment: "Surabaya",
        enactedDateFormatted: "28 Juli 2026",
      });

      expect(citation).toBe(
        "Ketetapan BLM FEB UNAIR Nomor 002/TAP/BLM/VII/2026 tentang Kebijakan Orientasi Studi dan Pengenalan Kampus di Lingkungan FEB UNAIR, ditetapkan di Surabaya pada 28 Juli 2026."
      );
    });
  });
});

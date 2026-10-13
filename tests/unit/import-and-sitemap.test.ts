import { describe, it, expect } from "vitest";
import path from "path";
import { parseAllRegisterFiles } from "../../prisma/seed/import-register";
import { documentRequestSchema, submitDocumentRequestAction } from "../../src/lib/actions/request";

describe("Langkah 9: Migrasi Register 49 Dokumen & Permohonan Pengunjung", () => {
  describe("1. CSV Parser & Normalisasi Register", () => {
    const baseDir = path.resolve(__dirname, "../../Nomor Produk Hukum");
    const { documents, reservations } = parseAllRegisterFiles(baseDir);

    it("harus mengekstrak tepat 49 produk hukum dari 5 file CSV", () => {
      expect(documents.length).toBe(49);
    });

    it("harus memiliki rincian jumlah jenis yang sesuai inventaris", () => {
      const uuCount = documents.filter((d) => d.type === "UU").length;
      const tapCount = documents.filter((d) => d.type === "TAP").length;
      const skCount = documents.filter((d) => d.type === "SK").length;
      const lpCount = documents.filter((d) => d.type === "LP").length;

      expect(uuCount).toBe(2);
      expect(tapCount).toBe(3);
      expect(skCount).toBe(39);
      expect(lpCount).toBe(5);
    });

    it("harus mengekstrak 3 nomor reservasi kosong (BIRAD 171, 172, 173)", () => {
      expect(reservations.length).toBe(3);
      expect(reservations.map((r) => r.sequenceNumber)).toEqual([171, 172, 173]);
    });

    it("harus mengoreksi tipografi tahun UU No. 02 ke 2026", () => {
      const uu2 = documents.find((d) => d.type === "UU" && d.sequenceNumber === 2);
      expect(uu2).toBeDefined();
      expect(uu2?.officialNumber).toBe("02/UU/BLMFEBUNAIR/VIII/2026");
      expect(uu2?.legacyNumber).toContain("2926");
    });

    it("harus menormalisasi SK 100-108 ke format 4 digit dengan legacyNumber tercatat", () => {
      const sk100 = documents.find((d) => d.type === "SK" && d.sequenceNumber === 100);
      expect(sk100).toBeDefined();
      expect(sk100?.officialNumber).toBe("0100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026");
      expect(sk100?.legacyNumber).toBe("100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026");

      const sk108 = documents.find((d) => d.type === "SK" && d.sequenceNumber === 108);
      expect(sk108?.officialNumber).toBe("0108/UN.3.1.4/A/SKPEMBERIANSURATPERINGATANPLENO/BLM/VII/2026");
      expect(sk108?.legacyNumber).toBe("108/UN.3.1.4/A/SKPEMBERIANSURATPERINGATANPLENO/BLM/VII/2026");
    });
  });

  describe("2. Validasi Permohonan Dokumen & Anti-Spam", () => {
    it("harus meloloskan permohonan yang valid", () => {
      const valid = documentRequestSchema.safeParse({
        name: "Ahmad Dahlan",
        email: "ahmad.dahlan@mhs.unair.ac.id",
        affiliation: "042211233045",
        message: "Membutuhkan salinan UU PEMIRA untuk referensi skripsi tata kelola.",
        relatedDocumentSlug: "uu-2026-01",
      });
      expect(valid.success).toBe(true);
    });

    it("harus menolak permohonan dengan email tidak valid", () => {
      const invalid = documentRequestSchema.safeParse({
        name: "Ahmad Dahlan",
        email: "bukan-email",
        affiliation: "042211233045",
        message: "Membutuhkan dokumen",
      });
      expect(invalid.success).toBe(false);
    });

    it("harus menangkap bot jika input honeypot diisi", async () => {
      const res = await submitDocumentRequestAction({
        name: "Spam Bot",
        email: "bot@spam.com",
        affiliation: "SpamCorp",
        message: "Buy cheap products now",
        honeypot: "http://malicious.com",
      });

      expect(res.ticketNumber).toBe("REQ-2026-SPAM");
    });
  });
});

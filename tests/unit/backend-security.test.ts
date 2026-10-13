import { describe, it, expect } from "vitest";
import { isAllowedAdminEmail, CANONICAL_SUPER_ADMIN_EMAIL } from "../../src/lib/auth";
import { createDocumentSchema, updateDocumentStatusSchema } from "../../src/lib/actions/document";
import { generateR2Key, sanitizeDownloadFileName } from "../../src/lib/r2";

describe("Langkah 8: Backend Security, Auth Guard & R2 Streaming", () => {
  describe("1. Auth Guard & Allowlist Verification", () => {
    it("harus mengizinkan email Super Admin kanonikal (case-insensitive)", () => {
      expect(isAllowedAdminEmail("puguhmuqoddam151@gmail.com")).toBe(true);
      expect(isAllowedAdminEmail("PUGUHMUQODDAM151@GMAIL.COM")).toBe(true);
      expect(isAllowedAdminEmail("  puguhmuqoddam151@gmail.com  ")).toBe(true);
    });

    it("harus menolak email yang tidak ada dalam allowlist", () => {
      expect(isAllowedAdminEmail("hacker@malicious.com")).toBe(false);
      expect(isAllowedAdminEmail("mahasiswa@feb.unair.ac.id")).toBe(false);
      expect(isAllowedAdminEmail("admin@gmail.com")).toBe(false);
      expect(isAllowedAdminEmail("")).toBe(false);
      expect(isAllowedAdminEmail(null)).toBe(false);
      expect(isAllowedAdminEmail(undefined)).toBe(false);
    });

    it("harus mencocokkan konstanta CANONICAL_SUPER_ADMIN_EMAIL", () => {
      expect(CANONICAL_SUPER_ADMIN_EMAIL).toBe("puguhmuqoddam151@gmail.com");
    });
  });

  describe("2. Validasi Input Mutasi (Zod Schema)", () => {
    it("harus meloloskan payload dokumen yang valid", () => {
      const validPayload = {
        type: "SK" as const,
        sequenceNumber: 171,
        year: 2026,
        month: 10,
        nature: "A_INTERNAL" as const,
        abbreviationCode: "SKTPENGURUS",
        title: "Keputusan Penetapan Pengurus Baru",
        summary: "Menetapkan susunan kepengurusan tambahan.",
        enactedDate: "2026-10-14",
        placeOfEnactment: "Surabaya",
        legalStatus: "BERLAKU" as const,
        publicationState: "PUBLISHED" as const,
        tags: ["Pengurus", "Internal"],
      };

      const result = createDocumentSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it("harus menolak tahun di luar batas rentang 2000 - 2100", () => {
      const invalidYear = {
        type: "UU" as const,
        sequenceNumber: 1,
        year: 1999,
        month: 5,
        title: "Undang-Undang Lama",
        enactedDate: "1999-05-01",
      };

      const result = createDocumentSchema.safeParse(invalidYear);
      expect(result.success).toBe(false);
    });

    it("harus menolak nomor urut non-positif", () => {
      const invalidSeq = {
        type: "TAP" as const,
        sequenceNumber: 0,
        year: 2026,
        month: 5,
        title: "Ketetapan Tanpa Nomor",
        enactedDate: "2026-05-01",
      };

      const result = createDocumentSchema.safeParse(invalidSeq);
      expect(result.success).toBe(false);
    });

    it("harus memvalidasi enum status keberlakuan hukum", () => {
      const validStatus = updateDocumentStatusSchema.safeParse({
        id: "doc-123",
        legalStatus: "DICABUT",
        note: "Dicabut oleh UU No. 01 Tahun 2026",
      });
      expect(validStatus.success).toBe(true);

      const invalidStatus = updateDocumentStatusSchema.safeParse({
        id: "doc-123",
        legalStatus: "HANGUS", // Tidak ada di enum
      });
      expect(invalidStatus.success).toBe(false);
    });
  });

  describe("3. Cloudflare R2 Storage & Streaming Helpers", () => {
    it("harus menghasilkan kunci R2 kanonikal berformat terstandar", () => {
      const keySK = generateR2Key("SK", 2026, "sk-2026-0148", 1);
      expect(keySK).toBe("produk-hukum/sk/2026/sk-2026-0148/v1.pdf");

      const keyTAP = generateR2Key("ketetapan-blm", 2026, "tap-2026-002", 2);
      expect(keyTAP).toBe("produk-hukum/ketetapan-blm/2026/tap-2026-002/v2.pdf");
    });

    it("harus menghasilkan nama berkas unduhan yang bersih dan aman", () => {
      const fileName = sanitizeDownloadFileName(
        "TAP",
        2,
        2026,
        "Kebijakan Orientasi Studi dan Pengenalan Kampus di Lingkungan FEB UNAIR"
      );
      expect(fileName).toBe("TAP-2-2026-kebijakan-orientasi-studi-dan-pengenalan-kampus-di.pdf");
      expect(fileName.endsWith(".pdf")).toBe(true);
      expect(fileName).not.toContain(" ");
    });
  });
});

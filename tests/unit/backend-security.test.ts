import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../../src/middleware";
import {
  isAllowedAdminEmail,
  CANONICAL_SUPER_ADMIN_EMAIL,
  evaluateAdminAuthorization,
} from "../../src/lib/auth";
import {
  createDocumentSchema,
  updateDocumentStatusSchema,
} from "../../src/lib/actions/document";
import {
  documentRequestSchema,
  submitDocumentRequestAction,
} from "../../src/lib/actions/request";
import { hashClientIp } from "../../src/lib/security";
import { generateR2Key, sanitizeDownloadFileName } from "../../src/lib/r2";

describe("Langkah 8 & Audit Keamanan: Backend Security, Auth Guard & R2 Streaming", () => {
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

  describe("2. Evaluasi Otorisasi Admin & email_confirmed_at Gate", () => {
    it("harus MENOLAK pengguna jika email belum terkonfirmasi (email_confirmed_at null/kosong)", () => {
      const unverifiedUser = {
        id: "usr-unverified",
        email: "puguhmuqoddam151@gmail.com",
        email_confirmed_at: null,
      };

      const result = evaluateAdminAuthorization(unverifiedUser);
      expect(result).toBeNull();
    });

    it("harus MENERIMA pengguna jika email cocok dan email_confirmed_at ada", () => {
      const verifiedUser = {
        id: "usr-verified",
        email: "puguhmuqoddam151@gmail.com",
        email_confirmed_at: "2026-10-01T10:00:00Z",
      };

      const result = evaluateAdminAuthorization(verifiedUser);
      expect(result).not.toBeNull();
      expect(result?.role).toBe("SUPER_ADMIN");
      expect(result?.email).toBe("puguhmuqoddam151@gmail.com");
    });

    it("harus MENOLAK jika record AdminUser di database memiliki isActive = false", () => {
      const disabledAdmin = {
        id: "usr-disabled",
        email: "puguhmuqoddam151@gmail.com",
        email_confirmed_at: "2026-10-01T10:00:00Z",
      };

      const dbRecord = {
        id: "db-1",
        email: "puguhmuqoddam151@gmail.com",
        name: "Puguh Muqoddam",
        role: "SUPER_ADMIN" as const,
        isActive: false, // Dinonaktifkan
      };

      const result = evaluateAdminAuthorization(disabledAdmin, dbRecord);
      expect(result).toBeNull();
    });

    it("harus mematuhi role dari tabel AdminUser ketika aktif", () => {
      const editorUser = {
        id: "usr-editor",
        email: "staff.legislasi@feb.unair.ac.id",
        email_confirmed_at: "2026-10-01T10:00:00Z",
      };

      const dbRecord = {
        id: "db-2",
        email: "staff.legislasi@feb.unair.ac.id",
        name: "Staf Legislasi",
        role: "EDITOR" as const,
        isActive: true,
      };

      const result = evaluateAdminAuthorization(editorUser, dbRecord);
      expect(result).not.toBeNull();
      expect(result?.role).toBe("EDITOR");
      expect(result?.name).toBe("Staf Legislasi");
    });
  });

  describe("3. Validasi Permohonan Dokumen & Rate Limit Hashing", () => {
    it("harus menghasilkan SHA-256 IP hash sepanjang 64 karakter heksadesimal", () => {
      const hash1 = hashClientIp("192.168.1.1", "test-salt");
      const hash2 = hashClientIp("192.168.1.1", "test-salt");
      const hash3 = hashClientIp("192.168.1.2", "test-salt");

      expect(hash1).toHaveLength(64);
      expect(hash1).toBe(hash2); // Deterministik
      expect(hash1).not.toBe(hash3); // Unik per IP
    });

    it("harus menjebak bot jika honeypot terisi (deteksi bot)", async () => {
      const botPayload = {
        name: "Bot Spammer",
        email: "bot@spam.com",
        affiliation: "Robot",
        message: "Saya ingin memohon seluruh dokumen ini segera.",
        honeypot: "http://spam-link.com",
      };

      const res = await submitDocumentRequestAction(botPayload);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.ticketNumber).toBe("REQ-2026-SPAM");
      }
    });

    it("harus menerima isian permohonan yang sah", () => {
      const validPayload = {
        name: "Muhammad Haidar",
        email: "haidar@mhs.unair.ac.id",
        affiliation: "HIMA Manajemen FEB UNAIR",
        relatedDocumentSlug: "uu-2026-01",
        message: "Permohonan salinan resmi naskah fisik UU PEMIRA untuk arsip.",
      };

      const parsed = documentRequestSchema.safeParse(validPayload);
      expect(parsed.success).toBe(true);
    });
  });

  describe("4. Validasi Input Mutasi (Zod Schema)", () => {
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

  describe("4. Proteksi Edge & Pemblokiran AI Bot Scrapers", () => {
    it("harus memblokir AI scraper (Bytespider, GPTBot, ClaudeBot, CCBot) dengan status 403", () => {
      const bots = [
        "Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)",
        "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
        "ClaudeBot/1.0; +claudebot@anthropic.com",
        "CCBot/2.0 (https://commoncrawl.org/faq/)",
        "PerplexityBot/1.0",
      ];

      for (const bot of bots) {
        const req = new NextRequest("https://jdih-blm-febunair.my.id/produk-hukum", {
          headers: { "user-agent": bot },
        });
        const res = middleware(req);
        expect(res.status).toBe(403);
      }
    });

    it("harus mengizinkan peramban normal dan Googlebot mesin pencari", () => {
      const goodAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      ];

      for (const agent of goodAgents) {
        const req = new NextRequest("https://jdih-blm-febunair.my.id/produk-hukum", {
          headers: { "user-agent": agent },
        });
        const res = middleware(req);
        expect(res.status).toBe(200);
      }
    });
  });
});

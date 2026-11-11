import { describe, it, expect } from "vitest";
import { LEGAL_DOCUMENTS } from "../../src/lib/data/mock-documents";
import {
  AGENDA_OPTIONS,
  matchesAgendaFilter,
  sortLegalDocuments,
} from "../../src/lib/data/catalog-filters";

describe("Filter Agenda Sidang & Pengurutan Katalog JDIH", () => {
  it("harus mengelompokkan Sidang Pleno Jilid 1 hanya untuk dokumen Sidang Pleno BLM Jilid 1 (Juli 2026)", () => {
    const pleno1Docs = LEGAL_DOCUMENTS.filter((doc) =>
      matchesAgendaFilter(doc, "pleno-1")
    );
    const slugs = pleno1Docs.map((d) => d.slug).sort();

    // 9 SK (0100-0108) + TAP 002 + LP 002 = 11 dokumen Sidang Pleno Jilid 1
    expect(pleno1Docs.length).toBe(11);
    expect(slugs).toContain("tap-2026-002");
    expect(slugs).toContain("lp-2026-002");
    expect(slugs).toContain("sk-2026-0100");
    expect(slugs).toContain("sk-2026-0108");

    // Sidang Protap, AD/ART, Konstitusi Ormawa, dan Raker BEM tidak boleh masuk Pleno Jilid 1
    expect(slugs).not.toContain("tap-2026-001");
    expect(slugs).not.toContain("lp-2026-001");
    expect(slugs).not.toContain("uu-2026-04");
    expect(slugs).not.toContain("sk-2026-0048");
    expect(slugs).not.toContain("uu-2026-03");
    expect(slugs).not.toContain("sk-2026-0005");
    expect(slugs).not.toContain("sk-2026-0019");
  });

  it("harus memisahkan Sidang Protap, Sidang AD/ART, Raker BEM, dan Sidang Konstitusi Ormawa ke agenda masing-masing", () => {
    const protap = LEGAL_DOCUMENTS.filter((d) =>
      matchesAgendaFilter(d, "protap")
    );
    const adArt = LEGAL_DOCUMENTS.filter((d) =>
      matchesAgendaFilter(d, "ad-art")
    );
    const raker = LEGAL_DOCUMENTS.filter((d) =>
      matchesAgendaFilter(d, "raker-bem")
    );
    const konstitusi = LEGAL_DOCUMENTS.filter((d) =>
      matchesAgendaFilter(d, "konstitusi")
    );

    expect(protap.map((d) => d.slug).sort()).toEqual([
      "lp-2026-001",
      "tap-2026-001",
    ]);
    expect(adArt.length).toBe(8);
    expect(adArt.map((d) => d.slug)).toContain("uu-2026-04");
    expect(raker.map((d) => d.slug)).toEqual(["sk-2026-0019"]);
    expect(konstitusi.length).toBe(6);
    expect(konstitusi.map((d) => d.slug)).toContain("uu-2026-03");
  });

  it("harus memetakan seluruh 79 produk hukum ke tepat satu agenda persidangan tanpa duplikasi atau dokumen yatim", () => {
    const specificAgendas = AGENDA_OPTIONS.filter((a) => a.id !== "all").map(
      (a) => a.id
    );

    let totalMatched = 0;
    for (const doc of LEGAL_DOCUMENTS) {
      const matched = specificAgendas.filter((ag) =>
        matchesAgendaFilter(doc, ag)
      );
      expect(matched.length).toBe(1);
      totalMatched += matched.length;
    }

    expect(totalMatched).toBe(79);
  });

  it("harus mengurutkan dokumen terbaru ke terlama secara tepat pada opsi 'newest'", () => {
    const sorted = sortLegalDocuments(LEGAL_DOCUMENTS, "newest");
    expect(sorted[0].slug).toBe("sk-2026-0215");
    expect(sorted[0].enactedDate).toBe("2026-11-09");
    expect(sorted[sorted.length - 1].enactedDate).toBe("2026-02-15");
  });
});

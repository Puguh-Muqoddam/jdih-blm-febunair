import type { LegalDocumentItem } from "./mock-documents";

export type CatalogSortOption =
  | "newest"
  | "oldest"
  | "number_desc"
  | "number_asc"
  | "popular";

export type AgendaFilterOption =
  | "all"
  | "pleno-4"
  | "rdp-osjur"
  | "dkpp-pemira"
  | "pleno-3"
  | "pleno-2"
  | "pemira"
  | "pleno-1"
  | "protap"
  | "ad-art"
  | "raker-bem"
  | "konstitusi";

export interface AgendaOptionDefinition {
  id: AgendaFilterOption;
  label: string;
  shortLabel: string;
  isLatest?: boolean;
}

export const AGENDA_OPTIONS: AgendaOptionDefinition[] = [
  { id: "all", label: "Semua Agenda Sidang", shortLabel: "Semua Agenda" },
  {
    id: "pleno-4",
    label: "Sidang Pleno Jilid 4 (9 Nov 2026)",
    shortLabel: "Sidang Pleno Jilid 4 (Nov)",
    isLatest: true,
  },
  {
    id: "rdp-osjur",
    label: "RDP Ospek HIMA (16 Sep 2026)",
    shortLabel: "RDP Ospek HIMA (16 Sep)",
  },
  {
    id: "dkpp-pemira",
    label: "Rekomendasi DKPP PEMIRA (15 Sep 2026)",
    shortLabel: "DKPP PEMIRA (15 Sep)",
  },
  {
    id: "pleno-3",
    label: "Sidang Pleno Jilid 3 (12 Sep 2026)",
    shortLabel: "Sidang Pleno Jilid 3 (12 Sep)",
  },
  {
    id: "pleno-2",
    label: "Sidang Pleno Jilid 2 & SEKTOR (5 Sep 2026)",
    shortLabel: "Sidang Pleno Jilid 2 (5 Sep)",
  },
  {
    id: "pemira",
    label: "Sidang UU PEMIRA (Agu 2026)",
    shortLabel: "Sidang UU PEMIRA (Agu)",
  },
  {
    id: "pleno-1",
    label: "Sidang Pleno BLM Jilid 1 (Jul 2026)",
    shortLabel: "Sidang Pleno Jilid 1 (Jul)",
  },
  {
    id: "protap",
    label: "Sidang Prosedur Tetap / Protap (Apr & Jul 2026)",
    shortLabel: "Sidang Protap (Apr & Jul)",
  },
  {
    id: "ad-art",
    label: "Sidang AD/ART BLM (10 Mar 2026)",
    shortLabel: "Sidang AD/ART (Mar)",
  },
  {
    id: "raker-bem",
    label: "Rapat Kerja BEM FEB UNAIR (Mar 2026)",
    shortLabel: "Raker BEM (Mar)",
  },
  {
    id: "konstitusi",
    label: "Sidang Konstitusi Ormawa (Feb 2026)",
    shortLabel: "Sidang Konstitusi Ormawa (Feb)",
  },
];

/**
 * Mencocokkan dokumen hukum dengan agenda persidangan resminya secara presisi.
 * Memisahkan Sidang Pleno Jilid 1 (Juli 2026) dari Sidang Protap, Sidang AD/ART,
 * Raker BEM, dan Sidang Konstitusi Ormawa.
 */
export function matchesAgendaFilter(
  doc: LegalDocumentItem,
  agenda: AgendaFilterOption
): boolean {
  if (agenda === "all") return true;
  const d = doc.enactedDate;
  const forumLower = doc.forum.toLowerCase();

  switch (agenda) {
    case "pleno-4":
      return d >= "2026-11-01";
    case "rdp-osjur":
      return d === "2026-09-16";
    case "dkpp-pemira":
      return d === "2026-09-15";
    case "pleno-3":
      return d === "2026-09-12";
    case "pleno-2":
      return d === "2026-09-05";
    case "pemira":
      return d >= "2026-08-01" && d < "2026-09-01";
    case "pleno-1":
      return (
        d >= "2026-07-01" &&
        d < "2026-08-01" &&
        !forumLower.includes("protap")
      );
    case "protap":
      return forumLower.includes("protap");
    case "ad-art":
      return d === "2026-03-10";
    case "raker-bem":
      return d === "2026-03-01" || forumLower.includes("kerja");
    case "konstitusi":
      return d === "2026-02-15";
    default:
      return true;
  }
}

/**
 * Mengurutkan daftar dokumen hukum berdasarkan kriteria yang dipilih pengguna.
 */
export function sortLegalDocuments(
  docs: LegalDocumentItem[],
  sortBy: CatalogSortOption
): LegalDocumentItem[] {
  return [...docs].sort((a, b) => {
    switch (sortBy) {
      case "newest": {
        const dateDiff =
          new Date(b.enactedDate).getTime() -
          new Date(a.enactedDate).getTime();
        if (dateDiff !== 0) return dateDiff;
        return b.sequenceNumber - a.sequenceNumber;
      }
      case "oldest": {
        const dateDiff =
          new Date(a.enactedDate).getTime() -
          new Date(b.enactedDate).getTime();
        if (dateDiff !== 0) return dateDiff;
        return a.sequenceNumber - b.sequenceNumber;
      }
      case "number_desc": {
        if (b.year !== a.year) return b.year - a.year;
        return b.sequenceNumber - a.sequenceNumber;
      }
      case "number_asc": {
        if (a.year !== b.year) return a.year - b.year;
        return a.sequenceNumber - b.sequenceNumber;
      }
      case "popular": {
        const popB = b.viewCount + b.downloadCount * 2;
        const popA = a.viewCount + a.downloadCount * 2;
        if (popB !== popA) return popB - popA;
        return b.sequenceNumber - a.sequenceNumber;
      }
      default:
        return 0;
    }
  });
}

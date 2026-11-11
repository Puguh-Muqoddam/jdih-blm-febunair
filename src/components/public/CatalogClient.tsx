"use client";

import React, { useState, useMemo } from "react";
import {
  LayoutGrid,
  Table as TableIcon,
  Search,
  X,
  RotateCcw,
  SlidersHorizontal,
  ArrowUpDown,
  Calendar,
} from "lucide-react";
import { LegalDocumentItem } from "@/lib/data/mock-documents";
import { DocumentCard } from "./DocumentCard";
import { DocumentTable } from "./DocumentTable";

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
  | "pleno-3"
  | "pleno-2"
  | "pemira"
  | "pleno-1";

const AGENDA_OPTIONS: {
  id: AgendaFilterOption;
  label: string;
  shortLabel: string;
  isLatest?: boolean;
}[] = [
  { id: "all", label: "Semua Agenda Sidang", shortLabel: "Semua Agenda" },
  {
    id: "pleno-4",
    label: "Sidang Pleno Jilid 4 (9 Nov 2026)",
    shortLabel: "Sidang Pleno Jilid 4 (Nov 2026)",
    isLatest: true,
  },
  {
    id: "rdp-osjur",
    label: "RDP & Evaluasi Ospek HIMA (16 Sep 2026)",
    shortLabel: "RDP Ospek HIMA (16 Sep)",
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
    label: "Sidang Pleno I & Awal Periode (Feb–Jul 2026)",
    shortLabel: "Sidang Pleno I (Feb–Jul)",
  },
];

function matchesAgendaFilter(
  doc: LegalDocumentItem,
  agenda: AgendaFilterOption
): boolean {
  if (agenda === "all") return true;
  const d = doc.enactedDate;
  switch (agenda) {
    case "pleno-4":
      return d >= "2026-11-01";
    case "rdp-osjur":
      return d === "2026-09-16";
    case "pleno-3":
      return d === "2026-09-12";
    case "pleno-2":
      return d === "2026-09-05";
    case "pemira":
      return d >= "2026-08-01" && d < "2026-09-01";
    case "pleno-1":
      return d < "2026-08-01";
    default:
      return true;
  }
}

interface CatalogClientProps {
  initialDocuments: LegalDocumentItem[];
  preselectedType?: string;
  hideTypeFilter?: boolean;
}

export function CatalogClient({
  initialDocuments,
  preselectedType = "all",
  hideTypeFilter = false,
}: CatalogClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>(preselectedType);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedNature, setSelectedNature] = useState<string>("all");
  const [selectedForum, setSelectedForum] = useState<string>("all");
  const [selectedAgenda, setSelectedAgenda] =
    useState<AgendaFilterOption>("all");
  const [sortBy, setSortBy] = useState<CatalogSortOption>("newest");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filter & Sort logika
  const filteredDocuments = useMemo(() => {
    const filtered = initialDocuments.filter((doc) => {
      // 1. Text Search (title, officialNumber, summary, legacyNumber, tags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchNumber = doc.officialNumber.toLowerCase().includes(q);
        const matchSummary = doc.summary.toLowerCase().includes(q);
        const matchLegacy =
          doc.legacyNumber?.toLowerCase().includes(q) ?? false;
        const matchTags = doc.tags.some((t) => t.toLowerCase().includes(q));

        if (
          !matchTitle &&
          !matchNumber &&
          !matchSummary &&
          !matchLegacy &&
          !matchTags
        ) {
          return false;
        }
      }

      // 2. Type Filter
      if (
        selectedType !== "all" &&
        doc.typeSlug !== selectedType &&
        doc.type !== selectedType
      ) {
        return false;
      }

      // 3. Status Filter
      if (selectedStatus !== "all" && doc.legalStatus !== selectedStatus) {
        return false;
      }

      // 4. Nature Filter (khusus SK)
      if (selectedNature !== "all") {
        if (!doc.nature || doc.nature !== selectedNature) {
          return false;
        }
      }

      // 5. Forum Filter
      if (
        selectedForum !== "all" &&
        !doc.forum.toLowerCase().includes(selectedForum.toLowerCase())
      ) {
        return false;
      }

      // 6. Agenda / Masa Persidangan Filter
      if (!matchesAgendaFilter(doc, selectedAgenda)) {
        return false;
      }

      return true;
    });

    // Pengurutan (Sorting)
    return [...filtered].sort((a, b) => {
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
  }, [
    initialDocuments,
    searchQuery,
    selectedType,
    selectedStatus,
    selectedNature,
    selectedForum,
    selectedAgenda,
    sortBy,
  ]);

  // Hitung filter aktif
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    (!hideTypeFilter && selectedType !== "all") ||
    selectedStatus !== "all" ||
    selectedNature !== "all" ||
    selectedForum !== "all" ||
    selectedAgenda !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    if (!hideTypeFilter) {
      setSelectedType("all");
    }
    setSelectedStatus("all");
    setSelectedNature("all");
    setSelectedForum("all");
    setSelectedAgenda("all");
    setSortBy("newest");
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar: Search, Sort, Agenda Pills, Filters & View Toggle */}
      <div className="rounded-xl border border-[#A3D0EE] bg-white p-4 shadow-xs space-y-4">
        {/* Baris 1: Pencarian Cepat + Dropdown Urutkan + View Toggle */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Input Pencarian Cepat */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B67BC]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Saring dokumen berdasarkan nomor, judul, atau kata kunci..."
              className="w-full rounded-lg border border-[#A3D0EE] bg-[#C6E8F7]/20 pl-10 pr-4 py-2 text-xs text-[#1A1A1A] placeholder:text-[#4A5568]/70 focus:border-[#1B67BC] focus:outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#4A5568] hover:text-[#1A1A1A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Kontrol Urutkan, Tombol Filter Mobile & View Toggle */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2 shrink-0">
            {/* Selector Urutkan (Sorting) */}
            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B67BC] shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Urutkan:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as CatalogSortOption)}
                aria-label="Urutkan produk hukum"
                className="w-full sm:w-auto rounded-lg border border-[#A3D0EE] bg-[#C6E8F7]/25 px-2.5 py-1.5 text-xs font-semibold text-[#1A1A1A] focus:border-[#1B67BC] focus:outline-hidden cursor-pointer"
              >
                <option value="newest">
                  Terbaru Ditetapkan (Agenda Terkini)
                </option>
                <option value="oldest">
                  Terlama Ditetapkan (Kronologis Awal)
                </option>
                <option value="number_desc">
                  Nomor Urut / BIRAD Tertinggi (Terbaru)
                </option>
                <option value="number_asc">
                  Nomor Urut / BIRAD Terendah (0001 → Akhir)
                </option>
                <option value="popular">
                  Terpopuler (Paling Banyak Diakses)
                </option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#A3D0EE] bg-white text-xs font-semibold text-[#1A1A1A]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1B67BC]" />
              <span>Filter ({hasActiveFilters ? "Aktif" : "Semua"})</span>
            </button>

            {/* Toggle Grid vs Table */}
            <div className="flex items-center rounded-lg border border-[#A3D0EE] bg-[#C6E8F7]/30 p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-[#1B67BC] shadow-xs"
                    : "text-[#4A5568] hover:text-[#1A1A1A]"
                }`}
                aria-label="Tampilan Grid Kartu"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kartu</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-[#1B67BC] shadow-xs"
                    : "text-[#4A5568] hover:text-[#1A1A1A]"
                }`}
                aria-label="Tampilan Tabel Register"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tabel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Baris 2: Pintasan Cepat Filter Agenda / Masa Persidangan */}
        <div className="pt-2.5 border-t border-[#A3D0EE]/40 flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B67BC] mr-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Agenda Sidang:</span>
          </span>
          {AGENDA_OPTIONS.map((ag) => {
            const active = selectedAgenda === ag.id;
            return (
              <button
                key={ag.id}
                type="button"
                onClick={() => setSelectedAgenda(ag.id)}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer border ${
                  active
                    ? "bg-[#1B67BC] text-white border-[#1B67BC] shadow-2xs"
                    : "bg-[#F5F6F8] text-[#1A1A1A] border-[#A3D0EE] hover:bg-[#C6E8F7]/50"
                }`}
              >
                <span>{ag.shortLabel}</span>
                {ag.isLatest && (
                  <span
                    className={`text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                      active
                        ? "bg-[#b96d41] text-white"
                        : "bg-[#b96d41] text-white"
                    }`}
                  >
                    Terbaru
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Baris 3: Filter Controls (Desktop & Mobile Drawer) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            hideTypeFilter ? "md:grid-cols-3" : "md:grid-cols-4"
          } gap-3 pt-3 border-t border-[#A3D0EE]/40 ${
            showMobileFilter ? "block" : "hidden md:grid"
          }`}
        >
          {/* Filter Jenis */}
          {!hideTypeFilter && (
            <div>
              <label className="block text-[11px] font-semibold text-[#4A5568] mb-1">
                Jenis Dokumen
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-md border border-[#A3D0EE] bg-white px-2.5 py-1.5 text-xs text-[#1A1A1A] focus:border-[#1B67BC] focus:outline-hidden"
              >
                <option value="all">Semua Jenis</option>
                <option value="undang-undang">Undang-Undang (UU)</option>
                <option value="ketetapan-blm">Ketetapan BLM (TAP)</option>
                <option value="surat-keputusan">Surat Keputusan (SK)</option>
                <option value="lembaran-parlemen">Surat Laporan (LP)</option>
              </select>
            </div>
          )}

          {/* Filter Status Hukum */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4A5568] mb-1">
              Status Hukum
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-md border border-[#A3D0EE] bg-white px-2.5 py-1.5 text-xs text-[#1A1A1A] focus:border-[#1B67BC] focus:outline-hidden"
            >
              <option value="all">Semua Status</option>
              <option value="BERLAKU">Berlaku</option>
              <option value="DIUBAH">Diubah</option>
              <option value="DICABUT">Dicabut</option>
            </select>
          </div>

          {/* Filter Sifat SK */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4A5568] mb-1">
              Sifat SK
            </label>
            <select
              value={selectedNature}
              onChange={(e) => setSelectedNature(e.target.value)}
              className="w-full rounded-md border border-[#A3D0EE] bg-white px-2.5 py-1.5 text-xs text-[#1A1A1A] focus:border-[#1B67BC] focus:outline-hidden"
            >
              <option value="all">Semua Sifat</option>
              <option value="A_INTERNAL">Internal (A)</option>
              <option value="B_EXTERNAL">Eksternal (B)</option>
            </select>
          </div>

          {/* Filter Forum */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4A5568] mb-1">
              Forum Penetapan
            </label>
            <select
              value={selectedForum}
              onChange={(e) => setSelectedForum(e.target.value)}
              className="w-full rounded-md border border-[#A3D0EE] bg-white px-2.5 py-1.5 text-xs text-[#1A1A1A] focus:border-[#1B67BC] focus:outline-hidden"
            >
              <option value="all">Semua Forum</option>
              <option value="Pleno">Sidang Pleno BLM</option>
              <option value="Protap">Sidang Protap</option>
              <option value="Rapat Dengar Pendapat">
                Rapat Dengar Pendapat (RDP)
              </option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#A3D0EE]/40 text-xs">
            <span className="text-[11px] font-semibold text-[#4A5568]">
              Filter Aktif:
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#C6E8F7]/50 px-2 py-0.5 text-xs text-[#1A1A1A]">
                Kata Kunci: &ldquo;{searchQuery}&rdquo;
                <button type="button" onClick={() => setSearchQuery("")}>
                  <X className="w-3 h-3 text-[#4A5568] hover:text-[#1A1A1A]" />
                </button>
              </span>
            )}
            {!hideTypeFilter && selectedType !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#C6E8F7]/50 px-2 py-0.5 text-xs text-[#1A1A1A]">
                Jenis: {selectedType.toUpperCase()}
                <button type="button" onClick={() => setSelectedType("all")}>
                  <X className="w-3 h-3 text-[#4A5568] hover:text-[#1A1A1A]" />
                </button>
              </span>
            )}
            {selectedAgenda !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#C6E8F7]/50 px-2 py-0.5 text-xs text-[#1A1A1A]">
                Agenda:{" "}
                {AGENDA_OPTIONS.find((a) => a.id === selectedAgenda)?.label ||
                  selectedAgenda}
                <button type="button" onClick={() => setSelectedAgenda("all")}>
                  <X className="w-3 h-3 text-[#4A5568] hover:text-[#1A1A1A]" />
                </button>
              </span>
            )}
            {selectedStatus !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#C6E8F7]/50 px-2 py-0.5 text-xs text-[#1A1A1A]">
                Status: {selectedStatus}
                <button type="button" onClick={() => setSelectedStatus("all")}>
                  <X className="w-3 h-3 text-[#4A5568] hover:text-[#1A1A1A]" />
                </button>
              </span>
            )}
            {selectedNature !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#C6E8F7]/50 px-2 py-0.5 text-xs text-[#1A1A1A]">
                Sifat:{" "}
                {selectedNature === "A_INTERNAL"
                  ? "Internal (A)"
                  : "Eksternal (B)"}
                <button type="button" onClick={() => setSelectedNature("all")}>
                  <X className="w-3 h-3 text-[#4A5568] hover:text-[#1A1A1A]" />
                </button>
              </span>
            )}
            {selectedForum !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#C6E8F7]/50 px-2 py-0.5 text-xs text-[#1A1A1A]">
                Forum: {selectedForum}
                <button type="button" onClick={() => setSelectedForum("all")}>
                  <X className="w-3 h-3 text-[#4A5568] hover:text-[#1A1A1A]" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#b96d41] hover:underline ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Semua</span>
            </button>
          </div>
        )}
      </div>

      {/* Info Total Hasil & Status Urutan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#4A5568] px-1">
        <span>
          Menampilkan{" "}
          <strong className="text-[#1A1A1A]">{filteredDocuments.length}</strong>{" "}
          dari{" "}
          <strong className="text-[#1A1A1A]">{initialDocuments.length}</strong>{" "}
          produk hukum
        </span>
        <span className="text-[11px] font-medium text-[#1B67BC]">
          Diurutkan berdasarkan:{" "}
          <strong>
            {sortBy === "newest"
              ? "Tanggal Publikasi / Agenda Terbaru"
              : sortBy === "oldest"
                ? "Tanggal Publikasi Terlama"
                : sortBy === "number_desc"
                  ? "Nomor Register Tertinggi (Terbaru)"
                  : sortBy === "number_asc"
                    ? "Nomor Register Terendah (Awal)"
                    : "Paling Banyak Diakses"}
          </strong>
        </span>
      </div>

      {/* Konten Dokumen: Grid atau Tabel */}
      {filteredDocuments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#A3D0EE] bg-white p-12 text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#C6E8F7]/50 flex items-center justify-center text-[#1B67BC]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
            Tidak ada produk hukum yang cocok
          </h3>
          <p className="text-xs text-[#4A5568] max-w-md mx-auto leading-relaxed">
            Tidak ditemukan dokumen hukum dengan kriteria pencarian atau agenda
            yang Anda pilih. Coba sesuaikan kata kunci atau gunakan tombol reset
            filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B67BC] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#3885CC] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Seluruh Filter</span>
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <DocumentTable documents={filteredDocuments} />
      )}
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import {
  LayoutGrid,
  Table as TableIcon,
  Search,
  Filter,
  X,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { LegalDocumentItem } from "@/lib/data/mock-documents";
import { DocumentCard } from "./DocumentCard";
import { DocumentTable } from "./DocumentTable";

interface CatalogClientProps {
  initialDocuments: LegalDocumentItem[];
  preselectedType?: string;
}

export function CatalogClient({
  initialDocuments,
  preselectedType = "all",
}: CatalogClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>(preselectedType);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedNature, setSelectedNature] = useState<string>("all");
  const [selectedForum, setSelectedForum] = useState<string>("all");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filter logika
  const filteredDocuments = useMemo(() => {
    return initialDocuments.filter((doc) => {
      // 1. Text Search (title, officialNumber, summary, legacyNumber)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchNumber = doc.officialNumber.toLowerCase().includes(q);
        const matchSummary = doc.summary.toLowerCase().includes(q);
        const matchLegacy = doc.legacyNumber?.toLowerCase().includes(q) ?? false;
        const matchTags = doc.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchTitle && !matchNumber && !matchSummary && !matchLegacy && !matchTags) {
          return false;
        }
      }

      // 2. Type Filter
      if (selectedType !== "all" && doc.typeSlug !== selectedType && doc.type !== selectedType) {
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
      if (selectedForum !== "all" && !doc.forum.toLowerCase().includes(selectedForum.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [
    initialDocuments,
    searchQuery,
    selectedType,
    selectedStatus,
    selectedNature,
    selectedForum,
  ]);

  // Hitung filter aktif
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedType !== "all" ||
    selectedStatus !== "all" ||
    selectedNature !== "all" ||
    selectedForum !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedStatus("all");
    setSelectedNature("all");
    setSelectedForum("all");
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar: Search, Filters & View Toggle */}
      <div className="rounded-xl border border-[#E8DEC4] bg-white p-4 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Input Pencarian Cepat */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80691d]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Saring dokumen berdasarkan nomor, judul, atau kata kunci..."
              className="w-full rounded-lg border border-[#E8DEC4] bg-[#FFFDF7] pl-10 pr-4 py-2 text-xs text-[#3E2C1C] placeholder:text-[#6B5A48]/70 focus:border-[#80691d] focus:outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#6B5A48] hover:text-[#3E2C1C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tombol Filter Mobile & View Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E8DEC4] bg-white text-xs font-semibold text-[#3E2C1C]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#80691d]" />
              <span>Filter ({hasActiveFilters ? "Aktif" : "Semua"})</span>
            </button>

            {/* Toggle Grid vs Table */}
            <div className="flex items-center rounded-lg border border-[#E8DEC4] bg-[#F7F1E3] p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-[#3E2C1C] shadow-2xs"
                    : "text-[#6B5A48] hover:text-[#3E2C1C]"
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
                    ? "bg-white text-[#3E2C1C] shadow-2xs"
                    : "text-[#6B5A48] hover:text-[#3E2C1C]"
                }`}
                aria-label="Tampilan Tabel Register"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tabel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls (Desktop & Mobile Drawer) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-[#F2EBDA] ${
            showMobileFilter ? "block" : "hidden md:grid"
          }`}
        >
          {/* Filter Jenis */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B5A48] mb-1">
              Jenis Dokumen
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-md border border-[#E8DEC4] bg-[#FFFDF7] px-2.5 py-1.5 text-xs text-[#3E2C1C] focus:border-[#80691d] focus:outline-hidden"
            >
              <option value="all">Semua Jenis</option>
              <option value="undang-undang">Undang-Undang (UU)</option>
              <option value="ketetapan-blm">Ketetapan BLM (TAP)</option>
              <option value="surat-keputusan">Surat Keputusan (SK)</option>
              <option value="lembaran-parlemen">Surat Laporan (LP)</option>
            </select>
          </div>

          {/* Filter Status Hukum */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B5A48] mb-1">
              Status Hukum
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-md border border-[#E8DEC4] bg-[#FFFDF7] px-2.5 py-1.5 text-xs text-[#3E2C1C] focus:border-[#80691d] focus:outline-hidden"
            >
              <option value="all">Semua Status</option>
              <option value="BERLAKU">Berlaku</option>
              <option value="DIUBAH">Diubah</option>
              <option value="DICABUT">Dicabut</option>
            </select>
          </div>

          {/* Filter Sifat SK */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B5A48] mb-1">
              Sifat SK
            </label>
            <select
              value={selectedNature}
              onChange={(e) => setSelectedNature(e.target.value)}
              className="w-full rounded-md border border-[#E8DEC4] bg-[#FFFDF7] px-2.5 py-1.5 text-xs text-[#3E2C1C] focus:border-[#80691d] focus:outline-hidden"
            >
              <option value="all">Semua Sifat</option>
              <option value="A_INTERNAL">Internal (A)</option>
              <option value="B_EXTERNAL">Eksternal (B)</option>
            </select>
          </div>

          {/* Filter Forum */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B5A48] mb-1">
              Forum Penetapan
            </label>
            <select
              value={selectedForum}
              onChange={(e) => setSelectedForum(e.target.value)}
              className="w-full rounded-md border border-[#E8DEC4] bg-[#FFFDF7] px-2.5 py-1.5 text-xs text-[#3E2C1C] focus:border-[#80691d] focus:outline-hidden"
            >
              <option value="all">Semua Forum</option>
              <option value="Pleno">Sidang Pleno BLM</option>
              <option value="Protap">Sidang Protap</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#F2EBDA] text-xs">
            <span className="text-[11px] font-semibold text-[#6B5A48]">Filter Aktif:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#F7F1E3] px-2 py-0.5 text-xs text-[#3E2C1C]">
                Kata Kunci: &ldquo;{searchQuery}&rdquo;
                <button type="button" onClick={() => setSearchQuery("")}>
                  <X className="w-3 h-3 text-[#6B5A48] hover:text-[#3E2C1C]" />
                </button>
              </span>
            )}
            {selectedType !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#F7F1E3] px-2 py-0.5 text-xs text-[#3E2C1C]">
                Jenis: {selectedType.toUpperCase()}
                <button type="button" onClick={() => setSelectedType("all")}>
                  <X className="w-3 h-3 text-[#6B5A48] hover:text-[#3E2C1C]" />
                </button>
              </span>
            )}
            {selectedStatus !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#F7F1E3] px-2 py-0.5 text-xs text-[#3E2C1C]">
                Status: {selectedStatus}
                <button type="button" onClick={() => setSelectedStatus("all")}>
                  <X className="w-3 h-3 text-[#6B5A48] hover:text-[#3E2C1C]" />
                </button>
              </span>
            )}
            {selectedNature !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#F7F1E3] px-2 py-0.5 text-xs text-[#3E2C1C]">
                Sifat: {selectedNature === "A_INTERNAL" ? "Internal (A)" : "Eksternal (B)"}
                <button type="button" onClick={() => setSelectedNature("all")}>
                  <X className="w-3 h-3 text-[#6B5A48] hover:text-[#3E2C1C]" />
                </button>
              </span>
            )}
            {selectedForum !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#F7F1E3] px-2 py-0.5 text-xs text-[#3E2C1C]">
                Forum: {selectedForum}
                <button type="button" onClick={() => setSelectedForum("all")}>
                  <X className="w-3 h-3 text-[#6B5A48] hover:text-[#3E2C1C]" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#80691d] hover:underline ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Semua</span>
            </button>
          </div>
        )}
      </div>

      {/* Info Total Hasil */}
      <div className="flex items-center justify-between text-xs text-[#6B5A48] px-1">
        <span>
          Menampilkan <strong className="text-[#3E2C1C]">{filteredDocuments.length}</strong> dari{" "}
          <strong className="text-[#3E2C1C]">{initialDocuments.length}</strong> produk hukum
        </span>
      </div>

      {/* Konten Dokumen: Grid atau Tabel */}
      {filteredDocuments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E8DEC4] bg-white p-12 text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#F7F1E3] flex items-center justify-center text-[#80691d]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#3E2C1C]">
            Tidak ada produk hukum yang cocok
          </h3>
          <p className="text-xs text-[#6B5A48] max-w-md mx-auto leading-relaxed">
            Tidak ditemukan dokumen hukum dengan kriteria pencarian yang Anda pilih. Coba sesuaikan kata kunci atau gunakan tombol reset filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#3E2C1C] px-4 py-2 text-xs font-bold text-[#d4af38] shadow-xs hover:bg-[#2e2014] cursor-pointer"
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

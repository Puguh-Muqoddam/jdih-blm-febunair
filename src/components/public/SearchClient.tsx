"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  X,
  RotateCcw,
  BookOpen,
  ArrowRight,
  HelpCircle,
  FileQuestion,
} from "lucide-react";
import Link from "next/link";
import { LEGAL_DOCUMENTS, LegalDocumentItem } from "@/lib/data/mock-documents";
import { DocumentCard } from "./DocumentCard";
import { DocumentTable } from "./DocumentTable";

export function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQ = searchParams.get("q") || "";
  const initialJenis = searchParams.get("jenis") || "all";

  const [query, setQuery] = useState(initialQ);
  const [selectedType, setSelectedType] = useState(initialJenis);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Sinkronkan state jika searchParams URL berubah
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setSelectedType(searchParams.get("jenis") || "all");
  }, [searchParams]);

  // Handle submit form pencarian
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedType !== "all") params.set("jenis", selectedType);
    router.push(`/pencarian?${params.toString()}`);
  };

  // Filter dokumen sesuai kueri
  const results = useMemo(() => {
    return LEGAL_DOCUMENTS.filter((doc) => {
      // 1. Text Search (title, officialNumber, summary, legacyNumber, tags, forum)
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchNumber = doc.officialNumber.toLowerCase().includes(q);
        const matchSummary = doc.summary.toLowerCase().includes(q);
        const matchLegacy = doc.legacyNumber?.toLowerCase().includes(q) ?? false;
        const matchCode = doc.abbreviationCode?.toLowerCase().includes(q) ?? false;
        const matchForum = doc.forum.toLowerCase().includes(q);
        const matchTags = doc.tags.some((t) => t.toLowerCase().includes(q));

        if (
          !matchTitle &&
          !matchNumber &&
          !matchSummary &&
          !matchLegacy &&
          !matchCode &&
          !matchForum &&
          !matchTags
        ) {
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

      return true;
    });
  }, [query, selectedType, selectedStatus]);

  const quickKeywords = [
    "PEMIRA",
    "Tata Tertib",
    "Orientasi Studi",
    "LPPM SEKTOR",
    "Sidang Pleno",
    "SP 1",
    "Pengunduran Diri",
    "Pengawasan BEM",
  ];

  return (
    <div className="space-y-6">
      {/* Box Input Pencarian Utama */}
      <div className="rounded-2xl border border-[#E8DEC4] bg-white p-5 sm:p-7 shadow-2xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80691d]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik kata kunci, nomor SK, judul, atau topik regulasi..."
              className="w-full rounded-xl border border-[#E8DEC4] bg-[#FFFDF7] pl-10 pr-4 py-3 text-sm text-[#3E2C1C] placeholder:text-[#6B5A48]/70 focus:border-[#80691d] focus:outline-hidden"
            />
          </div>

          <div className="sm:w-48 shrink-0">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                const params = new URLSearchParams(searchParams.toString());
                if (e.target.value === "all") params.delete("jenis");
                else params.set("jenis", e.target.value);
                router.push(`/pencarian?${params.toString()}`);
              }}
              className="w-full rounded-xl border border-[#E8DEC4] bg-[#FFFDF7] px-3 py-3 text-xs font-semibold text-[#3E2C1C] focus:border-[#80691d] focus:outline-hidden cursor-pointer"
            >
              <option value="all">Semua Jenis</option>
              <option value="undang-undang">Undang-Undang (UU)</option>
              <option value="ketetapan-blm">Ketetapan BLM (TAP)</option>
              <option value="surat-keputusan">Surat Keputusan (SK)</option>
              <option value="lembaran-parlemen">Surat Laporan (LP)</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#3E2C1C] px-6 py-3 text-xs font-bold text-[#d4af38] shadow-md hover:bg-[#2e2014] transition-all cursor-pointer shrink-0"
          >
            Cari Dokumen
          </button>
        </form>

        {/* Saran Kata Kunci Populer */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-[#6B5A48] pt-2 border-t border-[#F2EBDA]">
          <span className="font-semibold text-[#80691d]">Kata Kunci Terkait:</span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => {
                setQuery(kw);
                router.push(`/pencarian?q=${encodeURIComponent(kw)}`);
              }}
              className="rounded-md bg-[#F7F1E3] px-2 py-0.5 text-xs text-[#3E2C1C] hover:bg-[#80691d] hover:text-white transition-colors cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Info Hasil Pencarian */}
      <div className="flex items-center justify-between text-xs text-[#6B5A48] px-1">
        <div>
          {query.trim() ? (
            <span>
              Menemukan <strong className="text-[#3E2C1C]">{results.length}</strong> produk hukum
              untuk kata kunci &ldquo;<strong className="text-[#80691d]">{query}</strong>&rdquo;
            </span>
          ) : (
            <span>
              Menampilkan <strong className="text-[#3E2C1C]">{results.length}</strong> produk hukum
            </span>
          )}
        </div>

        {/* Filter Status Sederhana */}
        <div className="flex items-center gap-2">
          <label className="text-[11px] font-semibold text-[#6B5A48]">Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border border-[#E8DEC4] bg-white px-2 py-1 text-xs text-[#3E2C1C] focus:outline-hidden"
          >
            <option value="all">Semua Status</option>
            <option value="BERLAKU">Berlaku</option>
            <option value="DIUBAH">Diubah</option>
            <option value="DICABUT">Dicabut</option>
          </select>
        </div>
      </div>

      {/* Hasil Pencarian */}
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E8DEC4] bg-white p-12 text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#F7F1E3] flex items-center justify-center text-[#80691d]">
            <FileQuestion className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-[#3E2C1C]">
              Dokumen Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#6B5A48] max-w-md mx-auto leading-relaxed">
              Tidak ada produk hukum yang cocok dengan kata kunci &ldquo;{query}&rdquo;. Pastikan ejaan nomor atau judul sudah tepat, atau ajukan permohonan salinan naskah kepada sekretariat.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedType("all");
                setSelectedStatus("all");
                router.push("/pencarian");
              }}
              className="rounded-lg border border-[#E8DEC4] bg-white px-4 py-2 text-xs font-semibold text-[#3E2C1C] hover:bg-[#F7F1E3] cursor-pointer"
            >
              Reset Pencarian
            </button>
            <Link
              href="/permohonan"
              className="rounded-lg bg-[#3E2C1C] px-4 py-2 text-xs font-bold text-[#d4af38] hover:bg-[#2e2014] cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Ajukan Permohonan Dokumen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}

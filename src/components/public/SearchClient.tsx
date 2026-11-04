"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  FileQuestion,
} from "lucide-react";
import Link from "next/link";
import type { LegalDocumentItem } from "@/lib/data/mock-documents";
import { DocumentCard } from "./DocumentCard";

interface SearchClientProps {
  initialDocuments: LegalDocumentItem[];
}

const PAGE_SIZE = 18;

export function SearchClient({ initialDocuments }: SearchClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQ = searchParams.get("q") || "";
  const initialJenis = searchParams.get("jenis") || "all";

  const [query, setQuery] = useState(initialQ);
  const [selectedType, setSelectedType] = useState(initialJenis);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Sinkronkan state jika searchParams URL berubah
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setSelectedType(searchParams.get("jenis") || "all");
    setCurrentPage(1);
  }, [searchParams]);

  // Handle submit form pencarian ke server
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedType !== "all") params.set("jenis", selectedType);
    setCurrentPage(1);
    router.push(`/pencarian?${params.toString()}`);
  };

  // Filter dokumen sesuai kueri
  const results = useMemo(() => {
    return initialDocuments.filter((doc) => {
      if (doc.publicationState === "DRAFT") return false;

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

      if (selectedType !== "all" && doc.typeSlug !== selectedType && doc.type !== selectedType) {
        return false;
      }

      if (selectedStatus !== "all" && doc.legalStatus !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [initialDocuments, query, selectedType, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return results.slice(start, start + PAGE_SIZE);
  }, [results, currentPage]);

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
      <div className="rounded-2xl border border-[#A3D0EE] bg-white p-5 sm:p-7 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B67BC]" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Ketik kata kunci, nomor SK, judul, atau topik regulasi..."
              className="w-full rounded-xl border border-[#A3D0EE] bg-[#C6E8F7]/20 pl-10 pr-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#4A5568]/70 focus:border-[#1B67BC] focus:outline-hidden"
            />
          </div>

          <div className="sm:w-48 shrink-0">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
                const params = new URLSearchParams(searchParams.toString());
                if (e.target.value === "all") params.delete("jenis");
                else params.set("jenis", e.target.value);
                router.push(`/pencarian?${params.toString()}`);
              }}
              className="w-full rounded-xl border border-[#A3D0EE] bg-white px-3 py-3 text-xs font-semibold text-[#1A1A1A] focus:border-[#1B67BC] focus:outline-hidden cursor-pointer"
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
            className="rounded-xl bg-[#1B67BC] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#3885CC] transition-all cursor-pointer shrink-0"
          >
            Cari Dokumen
          </button>
        </form>

        {/* Saran Kata Kunci Populer */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-[#4A5568] pt-2 border-t border-[#A3D0EE]/40">
          <span className="font-semibold text-[#1B67BC]">Kata Kunci Terkait:</span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => {
                setQuery(kw);
                setCurrentPage(1);
                router.push(`/pencarian?q=${encodeURIComponent(kw)}`);
              }}
              className="rounded-md bg-[#C6E8F7]/40 px-2 py-0.5 text-xs text-[#1A1A1A] hover:bg-[#b96d41] hover:text-white transition-colors cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Info Hasil Pencarian */}
      <div className="flex items-center justify-between text-xs text-[#4A5568] px-1">
        <div>
          {query.trim() ? (
            <span>
              Menemukan <strong className="text-[#1A1A1A]">{results.length}</strong> produk hukum
              untuk kata kunci &ldquo;<strong className="text-[#1B67BC]">{query}</strong>&rdquo;
            </span>
          ) : (
            <span>
              Menampilkan <strong className="text-[#1A1A1A]">{results.length}</strong> produk hukum
            </span>
          )}
        </div>

        {/* Filter Status Sederhana */}
        <div className="flex items-center gap-2">
          <label className="text-[11px] font-semibold text-[#4A5568]">Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-md border border-[#A3D0EE] bg-white px-2 py-1 text-xs text-[#1A1A1A] focus:outline-hidden"
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
        <div className="rounded-2xl border border-dashed border-[#A3D0EE] bg-white p-12 text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#C6E8F7]/50 flex items-center justify-center text-[#1B67BC]">
            <FileQuestion className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
              Dokumen Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#4A5568] max-w-md mx-auto leading-relaxed">
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
                setCurrentPage(1);
                router.push("/pencarian");
              }}
              className="rounded-lg border border-[#A3D0EE] bg-white px-4 py-2 text-xs font-semibold text-[#1A1A1A] hover:bg-[#C6E8F7]/30 cursor-pointer"
            >
              Reset Pencarian
            </button>
            <Link
              href="/permohonan"
              className="rounded-lg bg-[#b96d41] px-4 py-2 text-xs font-bold text-white hover:bg-[#a65d34] cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
            >
              <span>Ajukan Permohonan Dokumen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedResults.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#A3D0EE]/50 pt-4 text-xs text-[#4A5568]">
              <span>
                Halaman <strong className="text-[#1A1A1A]">{currentPage}</strong> dari{" "}
                <strong className="text-[#1A1A1A]">{totalPages}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#A3D0EE] bg-white font-semibold text-[#1A1A1A] hover:bg-[#C6E8F7]/30 disabled:opacity-40 cursor-pointer"
                >
                  Sebelumnya
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#A3D0EE] bg-white font-semibold text-[#1A1A1A] hover:bg-[#C6E8F7]/30 disabled:opacity-40 cursor-pointer"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

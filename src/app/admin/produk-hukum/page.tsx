"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  PlusCircle,
  Eye,
  Edit,
  Download,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  SlidersHorizontal,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { LEGAL_DOCUMENTS, LegalDocumentItem } from "@/lib/data/mock-documents";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TypeBadge } from "@/components/ui/TypeBadge";

export default function AdminProdukHukumPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedNature, setSelectedNature] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedDocForModal, setSelectedDocForModal] = useState<LegalDocumentItem | null>(null);

  // Filter Dokumen
  const filteredDocs = useMemo(() => {
    return LEGAL_DOCUMENTS.filter((doc) => {
      // Filter Jenis
      if (selectedType !== "ALL" && doc.type !== selectedType) {
        return false;
      }

      // Filter Sifat SK
      if (selectedNature !== "ALL") {
        if (doc.type !== "SK") return false;
        if (selectedNature === "A" && doc.nature !== "A_INTERNAL") return false;
        if (selectedNature === "B" && doc.nature !== "B_EXTERNAL") return false;
      }

      // Filter Status Hukum
      if (selectedStatus !== "ALL" && doc.legalStatus !== selectedStatus) {
        return false;
      }

      // Filter Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchNumber = doc.officialNumber.toLowerCase().includes(q);
        const matchLegacy = doc.legacyNumber?.toLowerCase().includes(q);
        const matchForum = doc.forum.toLowerCase().includes(q);
        const matchTags = doc.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchTitle && !matchNumber && !matchLegacy && !matchForum && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedType, selectedNature, selectedStatus]);

  // Hitung jumlah untuk pill counter
  const counts = useMemo(() => {
    return {
      all: LEGAL_DOCUMENTS.length,
      uu: LEGAL_DOCUMENTS.filter((d) => d.type === "UU").length,
      tap: LEGAL_DOCUMENTS.filter((d) => d.type === "TAP").length,
      sk: LEGAL_DOCUMENTS.filter((d) => d.type === "SK").length,
      lp: LEGAL_DOCUMENTS.filter((d) => d.type === "LP").length,
      legacy: LEGAL_DOCUMENTS.filter((d) => d.legacyNumber).length,
    };
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-600 mb-2">
            <Link href="/admin" className="hover:text-[#1B67BC]">Dasbor</Link>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">Produk Hukum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
            Kelola Produk Hukum Resmi
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Daftar lengkap 49 produk hukum hasil kodifikasi register Departemen Legislasi periode 2026.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/produk-hukum/baru"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1B67BC] hover:bg-[#3885CC] text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Tambah Baru
          </Link>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white rounded-2xl border border-[#A3D0EE] p-5 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nomor resmi, nomor fisik lama, judul perihal, atau forum..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-[#1A1A1A]"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Filter Pills: Jenis Dokumen */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#A3D0EE]/50">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider mr-1">
            Jenis:
          </span>
          <button
            type="button"
            onClick={() => setSelectedType("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === "ALL"
                ? "bg-[#1B67BC] text-white"
                : "bg-[#C6E8F7]/30 text-stone-700 hover:bg-[#C6E8F7]/60"
            }`}
          >
            Semua ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setSelectedType("UU")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === "UU"
                ? "bg-[#1B67BC] text-white"
                : "bg-[#C6E8F7]/30 text-stone-700 hover:bg-[#C6E8F7]/60"
            }`}
          >
            UU ({counts.uu})
          </button>
          <button
            type="button"
            onClick={() => setSelectedType("TAP")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === "TAP"
                ? "bg-[#1B67BC] text-white"
                : "bg-[#C6E8F7]/30 text-stone-700 hover:bg-[#C6E8F7]/60"
            }`}
          >
            TAP ({counts.tap})
          </button>
          <button
            type="button"
            onClick={() => setSelectedType("SK")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === "SK"
                ? "bg-[#1B67BC] text-white"
                : "bg-[#C6E8F7]/30 text-stone-700 hover:bg-[#C6E8F7]/60"
            }`}
          >
            SK ({counts.sk})
          </button>
          <button
            type="button"
            onClick={() => setSelectedType("LP")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedType === "LP"
                ? "bg-[#1B67BC] text-white"
                : "bg-[#C6E8F7]/30 text-stone-700 hover:bg-[#C6E8F7]/60"
            }`}
          >
            LP ({counts.lp})
          </button>

          {/* Sifat SK Dropdown jika SK dipilih */}
          {selectedType === "SK" && (
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-xs text-stone-600 font-medium">Sifat:</span>
              <select
                value={selectedNature}
                onChange={(e) => setSelectedNature(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-lg border border-[#A3D0EE] bg-white text-[#1A1A1A] font-semibold"
              >
                <option value="ALL">Semua Sifat</option>
                <option value="A">Sifat A (Internal)</option>
                <option value="B">Sifat B (Eksternal)</option>
              </select>
            </div>
          )}

          {/* Status Hukum Filter */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
            <span className="text-xs text-stone-600 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-lg border border-[#A3D0EE] bg-white text-[#1A1A1A] font-semibold"
            >
              <option value="ALL">Semua Status</option>
              <option value="BERLAKU">Berlaku</option>
              <option value="DIUBAH">Diubah</option>
              <option value="DICABUT">Dicabut</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-[#A3D0EE] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#A3D0EE] bg-[#C6E8F7]/25 flex items-center justify-between text-xs text-stone-600">
          <div>
            Menampilkan <span className="font-bold text-[#1A1A1A]">{filteredDocs.length}</span> dari {LEGAL_DOCUMENTS.length} produk hukum
          </div>
          {counts.legacy > 0 && (
            <div className="flex items-center gap-1.5 text-amber-800 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>{counts.legacy} berkas dinormalisasi dari format 3-digit fisik</span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#1A1A1A]">
            <thead className="bg-[#C6E8F7]/30 text-[11px] font-bold uppercase tracking-wider text-stone-600 border-b border-[#A3D0EE]">
              <tr>
                <th className="py-3.5 px-4">Nomor Resmi & Fisik</th>
                <th className="py-3.5 px-4">Jenis & Sifat</th>
                <th className="py-3.5 px-4 min-w-[320px]">Judul / Perihal</th>
                <th className="py-3.5 px-4">Pengesahan</th>
                <th className="py-3.5 px-4">Status Hukum</th>
                <th className="py-3.5 px-4 text-center">Publikasi</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A3D0EE]/50">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-stone-600">
                    Tidak ada produk hukum yang sesuai dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#C6E8F7]/10 transition-colors">
                    {/* Nomor Resmi */}
                    <td className="py-3.5 px-4 font-mono text-xs font-medium text-[#1A1A1A]">
                      <div className="font-bold">{doc.officialNumber}</div>
                      {doc.legacyNumber && (
                        <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>Fisik: {doc.legacyNumber}</span>
                        </div>
                      )}
                    </td>

                    {/* Jenis & Sifat */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <TypeBadge type={doc.type} size="sm" />
                        {doc.nature && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-[#C6E8F7]/30 text-stone-600 border border-[#A3D0EE]">
                            {doc.nature === "A_INTERNAL" ? "Sifat A (Internal)" : "Sifat B (Eksternal)"}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Judul & Forum */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-xs line-clamp-2 text-[#1A1A1A]">
                        {doc.title}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-2">
                        <span>Forum: {doc.forum}</span>
                        <span>•</span>
                        <span>{doc.tags.slice(0, 2).join(", ")}</span>
                      </div>
                    </td>

                    {/* Pengesahan */}
                    <td className="py-3.5 px-4 text-xs text-stone-600 whitespace-nowrap">
                      <div>{doc.enactedDateFormatted}</div>
                      <div className="text-[10px] text-stone-400">Bulan {doc.romanMonth}</div>
                    </td>

                    {/* Status Hukum */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={doc.legalStatus} size="sm" />
                    </td>

                    {/* Status Publikasi */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Publik
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/produk-hukum/${doc.typeSlug}/${doc.year}/${doc.sequenceNumber}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-stone-600 hover:text-[#1B67BC] hover:bg-[#C6E8F7]/30 transition-colors"
                          title="Lihat Pratinjau Publik"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSelectedDocForModal(doc)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#C6E8F7]/25 hover:bg-[#C6E8F7]/50 text-[#1A1A1A] border border-[#A3D0EE] transition-colors"
                        >
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Quick Detail / Audit Info */}
      {selectedDocForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#A3D0EE] shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 border-b border-[#A3D0EE]/50 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#1B67BC] uppercase tracking-wider">
                  Detail Metadata Produk Hukum
                </span>
                <h3 className="text-base font-serif font-bold text-[#1A1A1A] mt-0.5">
                  {selectedDocForModal.officialNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocForModal(null)}
                className="p-1 rounded-lg text-stone-500 hover:bg-[#C6E8F7]/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-stone-600 block font-medium">Judul Lengkap:</span>
                <p className="font-semibold text-sm text-[#1A1A1A] mt-0.5">
                  {selectedDocForModal.title}
                </p>
              </div>

              <div>
                <span className="text-stone-600 block font-medium">Abstrak / Ringkasan:</span>
                <p className="text-[#1A1A1A] leading-relaxed mt-0.5 bg-[#C6E8F7]/15 p-3 rounded-xl border border-[#A3D0EE]">
                  {selectedDocForModal.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-[#C6E8F7]/20 p-3 rounded-xl border border-[#A3D0EE]">
                  <span className="text-stone-600 block">Jenis & Nomor Urut:</span>
                  <span className="font-bold text-[#1A1A1A]">
                    {selectedDocForModal.typeName} (No. {selectedDocForModal.sequenceNumber})
                  </span>
                </div>
                <div className="bg-[#C6E8F7]/20 p-3 rounded-xl border border-[#A3D0EE]">
                  <span className="text-stone-600 block">Forum Penetapan:</span>
                  <span className="font-bold text-[#1A1A1A]">{selectedDocForModal.forum}</span>
                </div>
                <div className="bg-[#C6E8F7]/20 p-3 rounded-xl border border-[#A3D0EE]">
                  <span className="text-stone-600 block">Tanggal Pengesahan:</span>
                  <span className="font-bold text-[#1A1A1A]">
                    {selectedDocForModal.enactedDateFormatted}
                  </span>
                </div>
              </div>

              {selectedDocForModal.legacyNumber && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Catatan Rekonsiliasi Nomor Fisik
                  </div>
                  <p className="text-[11px] mt-1 leading-relaxed">
                    Dokumen ini tercatat dalam Buku Register BIRAD fisik dengan nomor{" "}
                    <strong className="font-mono">{selectedDocForModal.legacyNumber}</strong> (format 3-digit lama). Telah dinormalisasi kanonikal menjadi 4-digit{" "}
                    <strong className="font-mono">{selectedDocForModal.sequenceNumber.toString().padStart(4, "0")}</strong> sesuai standar penomoran SK 2026.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#A3D0EE]">
              <Link
                href={`/produk-hukum/${selectedDocForModal.typeSlug}/${selectedDocForModal.year}/${selectedDocForModal.sequenceNumber}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B67BC] hover:text-[#3885CC]"
              >
                Buka di Portal Publik <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedDocForModal(null)}
                className="px-4 py-2 rounded-xl bg-[#1B67BC] text-white text-xs font-semibold hover:bg-[#3885CC] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  TrendingUp,
  Download,
  Eye,
  PlusCircle,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Database,
  History,
  FileSpreadsheet,
  Check,
  Scale,
} from "lucide-react";
import { LEGAL_DOCUMENTS } from "@/lib/data/mock-documents";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TypeBadge } from "@/components/ui/TypeBadge";

export const metadata = {
  title: "Dasbor Administrasi | JDIH BLM FEB UNAIR",
  description: "Pusat kendali dan audit kualitas metadata produk hukum BLM FEB UNAIR.",
};

export default function AdminDashboardPage() {
  // Metrik Statistik
  const totalDocs = LEGAL_DOCUMENTS.length;
  const totalBerlaku = LEGAL_DOCUMENTS.filter((d) => d.legalStatus === "BERLAKU").length;
  const totalDiubah = LEGAL_DOCUMENTS.filter((d) => d.legalStatus === "DIUBAH").length;
  const totalDicabut = LEGAL_DOCUMENTS.filter((d) => d.legalStatus === "DICABUT").length;
  const totalSkA = LEGAL_DOCUMENTS.filter((d) => d.type === "SK" && d.nature === "A_INTERNAL").length;
  const totalSkB = LEGAL_DOCUMENTS.filter((d) => d.type === "SK" && d.nature === "B_EXTERNAL").length;
  const totalViews = LEGAL_DOCUMENTS.reduce((acc, d) => acc + d.viewCount, 0);
  const totalDownloads = LEGAL_DOCUMENTS.reduce((acc, d) => acc + d.downloadCount, 0);

  // Anomali & Peringatan Kualitas Data (§10)
  const legacyNumberedDocs = LEGAL_DOCUMENTS.filter((d) => d.legacyNumber);
  const correctedYearDocs = LEGAL_DOCUMENTS.filter((d) => d.id === "uu-02");

  // 10 Dokumen Terbaru
  const recentDocs = [...LEGAL_DOCUMENTS]
    .sort((a, b) => new Date(b.enactedDate).getTime() - new Date(a.enactedDate).getTime())
    .slice(0, 10);

  return (
    <div className="space-y-8">
      {/* Top Banner Greeting */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#A3D0EE] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6E8F7]/30 border border-[#A3D0EE] text-xs font-semibold text-[#1B67BC] mb-3">
            <Scale className="w-3.5 h-3.5" />
            Departemen Legislasi • Register 2026
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
            Dasbor Kendali Hukum
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Selamat datang, <span className="font-semibold text-[#1A1A1A]">puguhmuqoddam151@gmail.com</span>. Seluruh 49 produk hukum resmi periode 2026 tersinkronisasi dan siap dikelola.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/produk-hukum/baru"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1B67BC] hover:bg-[#3885CC] text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Tambah Produk Hukum
          </Link>
          <Link
            href="/produk-hukum"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C6E8F7]/25 hover:bg-[#C6E8F7]/40 text-[#1A1A1A] font-semibold text-sm rounded-xl border border-[#A3D0EE] transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Portal Publik
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-[#A3D0EE] shadow-sm">
          <div className="flex items-center justify-between text-stone-600 text-xs font-medium uppercase tracking-wider mb-2">
            <span>Total Produk Hukum</span>
            <div className="w-8 h-8 rounded-lg bg-[#C6E8F7]/40 text-[#1B67BC] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-[#1A1A1A]">{totalDocs}</div>
          <div className="text-xs text-stone-600 mt-2 flex items-center gap-1.5">
            <span className="font-semibold text-[#1A1A1A]">2 UU</span> •{" "}
            <span className="font-semibold text-[#1A1A1A]">3 TAP</span> •{" "}
            <span className="font-semibold text-[#1A1A1A]">39 SK</span> •{" "}
            <span className="font-semibold text-[#1A1A1A]">5 LP</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#A3D0EE] shadow-sm">
          <div className="flex items-center justify-between text-stone-600 text-xs font-medium uppercase tracking-wider mb-2">
            <span>Status Berlaku</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-emerald-700">{totalBerlaku}</div>
          <div className="text-xs text-stone-600 mt-2 flex items-center gap-2">
            <span className="text-amber-700 font-medium">{totalDiubah} Diubah</span>
            <span>•</span>
            <span className="text-rose-700 font-medium">{totalDicabut} Dicabut</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#A3D0EE] shadow-sm">
          <div className="flex items-center justify-between text-stone-600 text-xs font-medium uppercase tracking-wider mb-2">
            <span>Distribusi Sifat SK</span>
            <div className="w-8 h-8 rounded-lg bg-[#b96d41]/15 text-[#b96d41] flex items-center justify-center">
              <FileCode2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-[#1A1A1A]">39</div>
          <div className="text-xs text-stone-600 mt-2 flex items-center gap-2">
            <span className="text-[#1B67BC] font-semibold">{totalSkA} Sifat A (Internal)</span>
            <span>•</span>
            <span className="text-[#b96d41] font-semibold">{totalSkB} Sifat B</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#A3D0EE] shadow-sm">
          <div className="flex items-center justify-between text-stone-600 text-xs font-medium uppercase tracking-wider mb-2">
            <span>Interaksi Publik</span>
            <div className="w-8 h-8 rounded-lg bg-[#1B67BC]/10 text-[#1B67BC] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-[#1A1A1A]">
            {totalViews.toLocaleString("id-ID")}
          </div>
          <div className="text-xs text-stone-600 mt-2 flex items-center gap-2">
            <span className="flex items-center gap-1 text-[#1B67BC]">
              <Eye className="w-3 h-3" /> {totalViews} lihat
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#b96d41]">
              <Download className="w-3 h-3" /> {totalDownloads} unduh
            </span>
          </div>
        </div>
      </div>

      {/* §10 Data Quality Alerts & Audit Notices */}
      <div className="bg-white rounded-2xl border border-[#A3D0EE] p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldAlert className="w-5 h-5 text-[#b96d41]" />
          <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
            Laporan Kualitas Data & Rekonsiliasi Register (§10)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: SK Legacy 3-Digit Numbering */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-amber-900">
                  9 Dokumen Menggunakan Nomor 3-Digit Lama ({legacyNumberedDocs.length} Terdeteksi)
                </h3>
                <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                  SK No. 100 s.d. 108 dari Buku BIRAD telah dinormalisasi ke standar kanonikal 4-digit (0100 s.d. 0108). Nomor fisik asli tetap tersimpan pada atribut <code className="font-mono bg-amber-100 px-1 rounded">legacyNumber</code> untuk keperluan audit verifikasi fisik.
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {legacyNumberedDocs.slice(0, 5).map((doc) => (
                    <span
                      key={doc.id}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-amber-100 text-amber-900 border border-amber-300"
                    >
                      SK {doc.legacyNumber} → {doc.sequenceNumber.toString().padStart(4, "0")}
                    </span>
                  ))}
                  <span className="text-[11px] text-amber-800 font-medium self-center pl-1">
                    +{legacyNumberedDocs.length - 5} lainnya
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Correction of Year Typo */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-emerald-900">
                  Koreksi Tipografi Tahun Telah Diterapkan
                </h3>
                <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                  UU No. 02 tahun 2026 yang tercetak fisik sebagai <code className="font-mono bg-emerald-100 px-1 rounded">02/UU/BLMFEBUNAIR/VIII/2926</code> telah terkoreksi otomatis ke tahun kanonikal <strong className="font-semibold">2026</strong> pada basis data, dengan nomor asli tetap disimpan di riwayat audit.
                </p>
                <div className="mt-2.5">
                  <Link
                    href="/admin/produk-hukum"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline"
                  >
                    Periksa status UU No. 02 <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel 10 Dokumen Terbaru & Quick Management */}
      <div className="bg-white rounded-2xl border border-[#A3D0EE] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#A3D0EE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
              Produk Hukum Terkini
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              10 produk hukum terbaru dalam inventaris register Departemen Legislasi
            </p>
          </div>
          <Link
            href="/admin/produk-hukum"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B67BC] hover:text-[#3885CC] transition-colors"
          >
            Lihat Semua 49 Dokumen <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#1A1A1A]">
            <thead className="bg-[#C6E8F7]/30 text-[11px] font-bold uppercase tracking-wider text-stone-600 border-b border-[#A3D0EE]">
              <tr>
                <th className="py-3.5 px-4">Nomor Resmi</th>
                <th className="py-3.5 px-4">Jenis & Sifat</th>
                <th className="py-3.5 px-4 min-w-[280px]">Judul / Perihal</th>
                <th className="py-3.5 px-4">Pengesahan</th>
                <th className="py-3.5 px-4">Status Hukum</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A3D0EE]/50">
              {recentDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#C6E8F7]/10 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs font-medium text-[#1A1A1A]">
                    <div>{doc.officialNumber}</div>
                    {doc.legacyNumber && (
                      <span className="inline-block mt-0.5 text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        Fisik: {doc.legacyNumber}
                      </span>
                    )}
                  </td>
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
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-xs line-clamp-2 text-[#1A1A1A]">
                      {doc.title}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1.5">
                      <span>Forum: {doc.forum}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-stone-600 whitespace-nowrap">
                    <div>{doc.enactedDateFormatted}</div>
                    <div className="text-[10px] text-stone-400">Bulan {doc.romanMonth}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={doc.legalStatus} size="sm" />
                  </td>
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
                      <Link
                        href={`/admin/produk-hukum?edit=${doc.id}`}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#C6E8F7]/25 hover:bg-[#C6E8F7]/50 text-[#1A1A1A] border border-[#A3D0EE] transition-colors"
                      >
                        Kelola
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

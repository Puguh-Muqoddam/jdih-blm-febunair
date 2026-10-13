import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  PieChart,
  Calendar,
  ChevronRight,
  TrendingUp,
  Scale,
  ShieldCheck,
  FileText,
  Building,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Statistik Produk Hukum | JDIH BLM FEB UNAIR",
  description:
    "Data analitik dan visualisasi statistik 49 produk hukum BLM FEB Universitas Airlangga (distribusi jenis, tren bulanan, sifat SK A/B, dan status hukum).",
};

export default function StatistikPage() {
  const typeStats = [
    { name: "Surat Keputusan (SK)", count: 39, pct: 79.6, color: "bg-[#96552f]" },
    { name: "Surat Laporan (LP)", count: 5, pct: 10.2, color: "bg-[#6B5A48]" },
    { name: "Ketetapan BLM (TAP)", count: 3, pct: 6.1, color: "bg-[#80691d]" },
    { name: "Undang-Undang (UU)", count: 2, pct: 4.1, color: "bg-[#3E2C1C]" },
  ];

  const monthStats = [
    { month: "April 2026", count: 1, pct: 3.4, note: "TAP 001" },
    { month: "Juli 2026", count: 12, pct: 41.4, note: "TAP 002, SK 100-108, LP 001-002" },
    { month: "Agustus 2026", count: 7, pct: 24.1, note: "UU 01-02, SK 126-130 (PEMIRA)" },
    { month: "September 2026", count: 29, pct: 100, note: "TAP 003, LP 003-005, SK 141-170" },
  ];

  const natureStats = [
    {
      nature: "Kode B (Eksternal)",
      desc: "Kebijakan kemahasiswaan, regulasi PEMIRA, rekomendasi, ormawa",
      count: 22,
      pct: 56.4,
      color: "bg-[#80691d]",
    },
    {
      nature: "Kode A (Internal)",
      desc: "Sidang pleno, tata tertib, agenda acara, SP, personalia legislatif",
      count: 17,
      pct: 43.6,
      color: "bg-[#3E2C1C]",
    },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B5A48]">
            <Link href="/" className="hover:text-[#3E2C1C] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#80691d]" />
            <span className="font-semibold text-[#3E2C1C]">Statistik Produk Hukum</span>
          </nav>

          {/* Header Halaman */}
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#80691d] flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Transparansi & Analitik Data</span>
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#3E2C1C]">
              Statistik Produk Hukum BLM 2026
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A48] max-w-2xl leading-relaxed">
              Ringkasan data persebaran, komposisi jenis, sifat penetapan, dan linimasa penerbitan 49 produk hukum legislatif mahasiswa FEB Universitas Airlangga.
            </p>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-[#E8DEC4] bg-white p-5 shadow-2xs space-y-1">
              <span className="text-xs text-[#6B5A48] font-medium block">Total Produk Hukum</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#3E2C1C]">49</span>
                <span className="text-xs text-[#80691d] font-semibold">Dokumen</span>
              </div>
              <span className="text-[11px] text-[#6B5A48] block">Register 2026 Aktif</span>
            </div>

            <div className="rounded-2xl border border-[#E8DEC4] bg-white p-5 shadow-2xs space-y-1">
              <span className="text-xs text-[#6B5A48] font-medium block">Keterbukaan Publik</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#80691d]">100%</span>
                <span className="text-xs text-emerald-800 font-semibold">Terbuka</span>
              </div>
              <span className="text-[11px] text-[#6B5A48] block">Termasuk SK Sifat A (Internal)</span>
            </div>

            <div className="rounded-2xl border border-[#E8DEC4] bg-white p-5 shadow-2xs space-y-1">
              <span className="text-xs text-[#6B5A48] font-medium block">Status Berlaku</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-emerald-800">48</span>
                <span className="text-xs text-[#6B5A48]">/ 49 Dokumen</span>
              </div>
              <span className="text-[11px] text-[#6B5A48] block">1 Diubah (UU 01)</span>
            </div>

            <div className="rounded-2xl border border-[#E8DEC4] bg-white p-5 shadow-2xs space-y-1">
              <span className="text-xs text-[#6B5A48] font-medium block">Puncak Aktivitas</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-[#b96d41]">29</span>
                <span className="text-xs text-[#6B5A48]">Dokumen</span>
              </div>
              <span className="text-[11px] text-[#6B5A48] block">Bulan September 2026</span>
            </div>
          </div>

          {/* Grid 2 Kolom Grafik Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Grafik 1: Distribusi Jenis Dokumen */}
            <section className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#F2EBDA] pb-3">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-[#80691d]" />
                  <h2 className="font-serif font-bold text-base text-[#3E2C1C]">
                    Distribusi Per Jenis Produk Hukum
                  </h2>
                </div>
                <span className="text-xs text-[#6B5A48]">4 Jenis</span>
              </div>

              {/* Baris Bar Chart CSS Ringan */}
              <div className="space-y-4">
                {typeStats.map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#3E2C1C]">{item.name}</span>
                      <span className="font-mono text-[#6B5A48]">
                        <strong>{item.count}</strong> dokumen ({item.pct}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-[#F7F1E3] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#6B5A48] leading-relaxed pt-2 border-t border-[#F2EBDA]">
                Surat Keputusan (SK) merupakan instrumen terbanyak karena mengakomodasi seluruh penetapan administratif persidangan, kepengurusan ormawa, dan rekomendasi berkala.
              </p>
            </section>

            {/* Grafik 2: Komposisi Sifat SK (Internal vs Eksternal) */}
            <section className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#F2EBDA] pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#80691d]" />
                  <h2 className="font-serif font-bold text-base text-[#3E2C1C]">
                    Komposisi Sifat Surat Keputusan (SK)
                  </h2>
                </div>
                <span className="text-xs text-[#6B5A48]">39 SK</span>
              </div>

              {/* Perbandingan Bar Ganda */}
              <div className="space-y-4">
                {natureStats.map((item) => (
                  <div key={item.nature} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#3E2C1C]">{item.nature}</span>
                      <span className="font-mono text-[#6B5A48]">
                        <strong>{item.count}</strong> SK ({item.pct}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-[#F7F1E3] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[#6B5A48]">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-[#F7F1E3] p-4 text-xs text-[#3E2C1C] space-y-1 border border-[#E8DEC4]">
                <span className="font-bold text-[#80691d] block">Keputusan Transparansi Penuh:</span>
                <p className="text-[11px] leading-relaxed text-[#6B5A48]">
                  Meskipun 17 SK berkode A berfokus pada dinamika internal lembaga, seluruhnya dipublikasikan secara terbuka di portal JDIH untuk mewujudkan akuntabilitas ormawa kepada seluruh mahasiswa.
                </p>
              </div>
            </section>
          </div>

          {/* Grafik 3: Linimasa Penetapan Dokumen Per Bulan */}
          <section className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#F2EBDA] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#80691d]" />
                <h2 className="font-serif font-bold text-base text-[#3E2C1C]">
                  Tren Penetapan Produk Hukum Per Bulan (2026)
                </h2>
              </div>
              <span className="text-xs text-[#6B5A48]">April — September 2026</span>
            </div>

            {/* Diagram Garis Batang Horisontal */}
            <div className="space-y-5">
              {monthStats.map((item) => (
                <div key={item.month} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#3E2C1C]">{item.month}</span>
                      <span className="text-[10px] text-[#6B5A48]">({item.note})</span>
                    </div>
                    <span className="font-mono text-[#80691d] font-bold">
                      {item.count} Dokumen
                    </span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-[#F7F1E3] overflow-hidden p-0.5 border border-[#E8DEC4]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#d4af38] to-[#b96d41] transition-all duration-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

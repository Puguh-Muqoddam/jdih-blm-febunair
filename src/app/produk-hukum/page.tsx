import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Scale, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CatalogClient } from "@/components/public/CatalogClient";
import {
  LEGAL_DOCUMENTS,
  REGULATION_CATEGORIES,
} from "@/lib/data/mock-documents";

export const metadata: Metadata = {
  title: "Katalog Produk Hukum | JDIH BLM FEB UNAIR",
  description:
    "Daftar lengkap 70 produk hukum resmi Badan Legislatif Mahasiswa FEB Universitas Airlangga (AD/ART, Konstitusi Ormawa, Undang-Undang, Ketetapan, Surat Keputusan, Surat Laporan).",
};

export default function ProdukHukumPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#4A5568]">
            <Link href="/" className="hover:text-[#1B67BC] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#1B67BC]" />
            <span className="font-semibold text-[#1A1A1A]">Katalog Produk Hukum</span>
          </nav>

          {/* Header Halaman */}
          <div className="rounded-lg border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                  Arsip Digital Terbuka • Basis Data Resmi Parlemen
                </div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A]">
                  Katalog Produk Hukum BLM FEB UNAIR
                </h1>
                <p className="text-xs sm:text-sm text-[#4A5568] max-w-3xl leading-relaxed">
                  Menyajikan seluruh inventaris {LEGAL_DOCUMENTS.length} dokumen produk hukum resmi periode 2026 (AD/ART, Konstitusi Ormawa, UU, TAP, SK, dan Surat Laporan). Seluruh dokumen tersimpan secara faktual dalam basis data dengan pratinjau naskah resmi dan akses unduh langsung.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-2 text-left lg:text-right text-xs text-[#4A5568] shrink-0">
                <div>
                  <span className="font-mono text-xl font-bold text-[#1B67BC] block">
                    {LEGAL_DOCUMENTS.length} Dokumen Resmi
                  </span>
                  <span>Tercatat di Basis Data 2026</span>
                </div>
                <Link
                  href="/panduan-penomoran"
                  className="inline-block rounded bg-[#1B67BC] hover:bg-[#3885CC] text-white px-3.5 py-2 text-xs font-bold transition-colors"
                >
                  Panduan Penomoran
                </Link>
              </div>
            </div>

            {/* Pintasan 6 Kategori Produk Hukum (Navigasi Internal Situs) */}
            <div className="pt-4 border-t border-[#A3D0EE]/50 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B67BC] block">
                Klasifikasi Regulasi Berdasarkan Kategori:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {REGULATION_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    className="group rounded-md border border-[#A3D0EE] bg-[#F5F6F8] hover:bg-[#1B67BC] p-3 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-white block truncate">
                        {cat.name}
                      </span>
                      <span className="text-[11px] text-[#4A5568] group-hover:text-white/85 block truncate">
                        {cat.description}
                      </span>
                    </div>
                    <span className="shrink-0 rounded bg-[#1B67BC] group-hover:bg-white text-white group-hover:text-[#1B67BC] px-2 py-0.5 text-[10px] font-bold">
                      {cat.count} Dokumen
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Komponen Interaktif Katalog (Grid/Table Toggle + Live Filter) */}
          <CatalogClient initialDocuments={LEGAL_DOCUMENTS} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

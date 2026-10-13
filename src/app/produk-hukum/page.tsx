import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Scale, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CatalogClient } from "@/components/public/CatalogClient";
import { LEGAL_DOCUMENTS } from "@/lib/data/mock-documents";

export const metadata: Metadata = {
  title: "Katalog Produk Hukum | JDIH BLM FEB UNAIR",
  description:
    "Daftar lengkap 49 produk hukum resmi Badan Legislatif Mahasiswa FEB Universitas Airlangga (Undang-Undang, Ketetapan, Surat Keputusan, Surat Laporan).",
};

export default function ProdukHukumPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B5A48]">
            <Link href="/" className="hover:text-[#3E2C1C] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#80691d]" />
            <span className="font-semibold text-[#3E2C1C]">Katalog Produk Hukum</span>
          </nav>

          {/* Header Halaman */}
          <div className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#80691d] uppercase tracking-wider">
                  <Scale className="w-4 h-4" />
                  <span>Arsip Digital Terbuka</span>
                </div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#3E2C1C]">
                  Katalog Produk Hukum BLM FEB UNAIR
                </h1>
                <p className="text-xs sm:text-sm text-[#6B5A48] max-w-3xl leading-relaxed">
                  Menyajikan seluruh inventaris 49 dokumen produk hukum tahun 2026. Seluruh dokumen berlaku, diubah, maupun dicabut tetap ditampilkan secara transparan dengan lencana status hukum resminya.
                </p>
              </div>

              <div className="hidden lg:flex flex-col items-end text-right text-xs text-[#6B5A48] shrink-0">
                <span className="font-mono text-xl font-bold text-[#80691d]">
                  {LEGAL_DOCUMENTS.length} Dokumen
                </span>
                <span>Tercatat di Register 2026</span>
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

import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SearchClient } from "@/components/public/SearchClient";

export const metadata: Metadata = {
  title: "Pencarian Produk Hukum | JDIH BLM FEB UNAIR",
  description:
    "Cari dan temukan peraturan, ketetapan, surat keputusan, dan laporan parlemen BLM FEB UNAIR dengan cepat dan presisi.",
};

export default function PencarianPage() {
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
            <span className="font-semibold text-[#3E2C1C]">Pencarian Produk Hukum</span>
          </nav>

          {/* Header Halaman */}
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#80691d] flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>Temu Kembali Arsip Hukum</span>
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#3E2C1C]">
              Pencarian Produk Hukum Terpadu
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A48] max-w-2xl leading-relaxed">
              Gunakan kata kunci pencarian nomor resmi, judul tentang peraturan, atau klaster topik untuk menemukan dokumen yang Anda butuhkan.
            </p>
          </div>

          {/* Search Client Component in Suspense */}
          <Suspense
            fallback={
              <div className="rounded-2xl border border-[#E8DEC4] bg-white p-12 text-center text-xs text-[#6B5A48]">
                Memuat pangkalan data pencarian...
              </div>
            }
          >
            <SearchClient />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

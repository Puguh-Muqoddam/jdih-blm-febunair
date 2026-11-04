import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SearchClient } from "@/components/public/SearchClient";
import {
  searchPublicDocumentsServer,
  toClientDocumentList,
} from "@/lib/data/public-documents";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pencarian Produk Hukum | JDIH BLM FEB UNAIR",
  description:
    "Cari dan temukan peraturan, ketetapan, surat keputusan, dan laporan parlemen BLM FEB UNAIR dengan cepat dan presisi.",
};

interface PencarianPageProps {
  searchParams?: Promise<{
    q?: string;
    jenis?: string;
    status?: string;
  }>;
}

export default async function PencarianPage({ searchParams }: PencarianPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const docs = await searchPublicDocumentsServer({
    query: resolvedParams.q,
    type: resolvedParams.jenis,
    status: resolvedParams.status,
  });
  // Jika ada query spesifik dari server, sertakan juga daftar dokumen publik ringan agar filter interaktif tetap responsif
  const allPublicDocs = resolvedParams.q
    ? await searchPublicDocumentsServer({})
    : docs;
  const clientDocs = toClientDocumentList(allPublicDocs);

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-600">
            <Link href="/" className="hover:text-[#1B67BC] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#3885CC]" />
            <span className="font-semibold text-[#1A1A1A]">Pencarian Produk Hukum</span>
          </nav>

          {/* Header Halaman */}
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B67BC] flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>Temu Kembali Arsip Hukum</span>
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
              Pencarian Produk Hukum Terpadu
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              Gunakan kata kunci pencarian nomor resmi, judul tentang peraturan, atau klaster topik untuk menemukan dokumen yang Anda butuhkan.
            </p>
          </div>

          {/* Search Client Component in Suspense */}
          <Suspense
            fallback={
              <div className="rounded-2xl border border-[#A3D0EE] bg-white p-12 text-center text-xs text-stone-600">
                Memuat pangkalan data pencarian...
              </div>
            }
          >
            <SearchClient initialDocuments={clientDocs} />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Scale, BookOpen, Scroll, FileCheck, Layers } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DocumentCard } from "@/components/public/DocumentCard";
import {
  LEGAL_DOCUMENTS,
  getLegalDocumentsByType,
} from "@/lib/data/mock-documents";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const TYPE_CONFIG: Record<
  string,
  {
    code: "UU" | "TAP" | "SK" | "LP";
    name: string;
    description: string;
    pattern: string;
    icon: React.ComponentType<{ className?: string }>;
    hierarchyText: string;
  }
> = {
  "undang-undang": {
    code: "UU",
    name: "Undang-Undang Mahasiswa",
    description:
      "Peraturan dasar hukum tertinggi yang disahkan dalam Sidang Pleno BLM FEB UNAIR, mengikat seluruh ormawa dan mengatur tatanan fundamental kemahasiswaan.",
    pattern: "[2 digit]/UU/BLMFEBUNAIR/[Bulan Romawi]/[Tahun]",
    icon: Scale,
    hierarchyText: "Tingkat 1 (Hierarki Tertinggi)",
  },
  "ketetapan-blm": {
    code: "TAP",
    name: "Ketetapan BLM (TAP)",
    description:
      "Ketetapan Sidang Pleno dan Prosedur Tetap (Protap) yang menetapkan kebijakan strategis serta pedoman pengawasan lembaga mahasiswa.",
    pattern: "[3 digit]/TAP/BLM/[Bulan Romawi]/[Tahun]",
    icon: BookOpen,
    hierarchyText: "Tingkat 2",
  },
  "surat-keputusan": {
    code: "SK",
    name: "Surat Keputusan (SK)",
    description:
      "Keputusan administratif dan persidangan yang menetapkan agenda, tata tertib, ormawa, personalia, serta kebijakan eksternal bernomor Buku Departemen Legislasi.",
    pattern: "[4 digit (0000)]/UN.3.1.4/[A|B]/[Kode Singkatan]/BLM/[Bulan Romawi]/[Tahun]",
    icon: Scroll,
    hierarchyText: "Tingkat 3 (Format Nomor Selalu 4 Digit)",
  },
  "lembaran-parlemen": {
    code: "LP",
    name: "Surat Laporan (LP)",
    description:
      "Lembaran parlemen resmi yang memuat hasil evaluasi pengawasan berkala, laporan investigasi komisi, dan rekomendasi sanksi kepatuhan.",
    pattern: "[3 digit]/LP/BLM/[Bulan Romawi]/[Tahun]",
    icon: FileCheck,
    hierarchyText: "Tingkat 4",
  },
};

export async function generateStaticParams() {
  return [
    { slug: "undang-undang" },
    { slug: "ketetapan-blm" },
    { slug: "surat-keputusan" },
    { slug: "lembaran-parlemen" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = TYPE_CONFIG[slug];
  if (!config) return { title: "Jenis Produk Hukum | JDIH BLM" };

  return {
    title: `${config.name} (${config.code}) | JDIH BLM FEB UNAIR`,
    description: config.description,
  };
}

export default async function JenisProdukHukumPage({ params }: PageProps) {
  const { slug } = await params;
  const config = TYPE_CONFIG[slug];

  if (!config) {
    notFound();
  }

  const documents = getLegalDocumentsByType(slug);
  const IconComp = config.icon;

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
            <Link href="/produk-hukum" className="hover:text-[#1B67BC] transition-colors">
              Produk Hukum
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#1B67BC]" />
            <span className="font-semibold text-[#1A1A1A]">{config.name}</span>
          </nav>

          {/* Banner Informasi Jenis */}
          <div className="rounded-2xl border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#1B67BC] flex items-center justify-center text-white shadow-md shrink-0">
                  <IconComp className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#1B67BC] uppercase tracking-wider">
                      {config.hierarchyText}
                    </span>
                    <span className="text-xs bg-[#C6E8F7]/50 text-[#1A1A1A] px-2 py-0.5 rounded-full font-semibold border border-[#A3D0EE]">
                      {documents.length} Dokumen Terdaftar
                    </span>
                  </div>
                  <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                    {config.name} ({config.code})
                  </h1>
                </div>
              </div>

              <div className="rounded-xl bg-[#C6E8F7]/20 border border-[#A3D0EE] p-3 text-xs space-y-1 w-full md:w-auto">
                <span className="font-bold text-[#1B67BC] block">Format Template Penomoran:</span>
                <code className="font-mono text-xs text-[#1A1A1A] block bg-white px-2 py-1 rounded border border-[#A3D0EE]">
                  {config.pattern}
                </code>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed pt-2 border-t border-[#A3D0EE]/40">
              {config.description}
            </p>
          </div>

          {/* Pengelompokan Berdasarkan Tahun (Accordion Tahun 2026) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#A3D0EE]/40 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1B67BC]" />
                <h2 className="font-serif font-bold text-lg text-[#1A1A1A]">
                  Tahun Penetapan 2026 ({documents.length} Dokumen)
                </h2>
              </div>
              <span className="text-xs text-[#4A5568]">Register Resmi Terverifikasi</span>
            </div>

            {/* Grid Dokumen untuk Tahun Ini */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

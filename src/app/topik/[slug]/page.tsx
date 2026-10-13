import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Tag, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DocumentCard } from "@/components/public/DocumentCard";
import { LEGAL_DOCUMENTS, LegalDocumentItem } from "@/lib/data/mock-documents";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const TOPIC_CONFIG: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
  }
> = {
  pemira: {
    title: "Klaster PEMIRA (Pemilihan Umum Raya)",
    description:
      "Kumpulan seluruh regulasi, tata tertib, jadwal tahapan, pengesahan UU, dan rekomendasi penetapan calon penyelenggara KPUM, Panwaslu, dan DKPP FEB UNAIR.",
    keywords: ["PEMIRA", "Pemilihan Umum", "KPUM", "Panwaslu", "DKPP", "Amandemen UU"],
  },
  "orientasi-studi": {
    title: "Klaster Kebijakan Orientasi Studi & Ospek",
    description:
      "Ketetapan TAP mengenai batasan etika orientasi studi fakultas, SK pengawasan kegiatan, laporan pengawasan pelanggaran, serta pemanggilan panitia Ospek Jurusan.",
    keywords: ["Orientasi Studi", "Ospek", "Ospek Jurusan", "Kemahasiswaan"],
  },
  "lppm-sektor": {
    title: "Klaster Lembaga Pers LPPM SEKTOR",
    description:
      "Regulasi mengenai kelembagaan pers mahasiswa, laporan kekosongan kepengurusan, penetapan kepengurusan sementara (caretaker), dan pengesahan pengurus LPPM SEKTOR.",
    keywords: ["LPPM SEKTOR", "Kepengurusan Sementara", "Pers Mahasiswa", "Kelembagaan"],
  },
  "keanggotaan-blm": {
    title: "Klaster Keanggotaan & Disiplin Parlemen BLM",
    description:
      "Dokumen penetapan kedisiplinan sidang, laporan sanksi etik anggota, persetujuan pengunduran diri personalia, dan surat pemberhentian anggota legislatif.",
    keywords: ["Keanggotaan BLM", "Pengunduran Diri", "Pemberhentian Anggota", "Peringatan Etik", "Badan Kehormatan"],
  },
  "pengawasan-bem": {
    title: "Klaster Pengawasan BEM & Forum Bawashim",
    description:
      "Prosedur tetap pengawasan berkala BLM terhadap BEM FEB UNAIR, laporan pengawasan evaluasi kerja, dan koordinasi Badan Pengawas HIMA (Bawashim).",
    keywords: ["Pengawasan BEM", "Bawashim", "HIMA", "HIMA Manajemen", "Akuntabilitas"],
  },
};

export async function generateStaticParams() {
  return [
    { slug: "pemira" },
    { slug: "orientasi-studi" },
    { slug: "lppm-sektor" },
    { slug: "keanggotaan-blm" },
    { slug: "pengawasan-bem" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = TOPIC_CONFIG[slug];
  if (!config) return { title: "Topik Regulasi | JDIH BLM" };

  return {
    title: `${config.title} | JDIH BLM FEB UNAIR`,
    description: config.description,
  };
}

export default async function TopikPage({ params }: PageProps) {
  const { slug } = await params;
  const config = TOPIC_CONFIG[slug];

  if (!config) {
    notFound();
  }

  // Filter dokumen yang memiliki keterkaitan dengan keywords topik
  const matchedDocs = LEGAL_DOCUMENTS.filter((doc) => {
    return config.keywords.some((kw) => {
      const q = kw.toLowerCase();
      const inTags = doc.tags.some((t) => t.toLowerCase().includes(q));
      const inTitle = doc.title.toLowerCase().includes(q);
      const inSummary = doc.summary.toLowerCase().includes(q);
      return inTags || inTitle || inSummary;
    });
  });

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
            <Link href="/produk-hukum" className="hover:text-[#3E2C1C] transition-colors">
              Produk Hukum
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#80691d]" />
            <span className="font-semibold text-[#3E2C1C]">{config.title}</span>
          </nav>

          {/* Header Topik */}
          <div className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-[#F7F1E3] flex items-center justify-center text-[#80691d]">
                <Tag className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#80691d] uppercase tracking-wider">
                  Klaster Regulasi Terpadu
                </span>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#3E2C1C]">
                  {config.title}
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#6B5A48] max-w-3xl leading-relaxed">
              {config.description}
            </p>
            <div className="pt-2 text-xs text-[#6B5A48] flex items-center gap-2">
              <span>Menemukan</span>
              <strong className="text-[#3E2C1C]">{matchedDocs.length} dokumen hukum</strong>
              <span>terkait topik ini.</span>
            </div>
          </div>

          {/* Grid Dokumen Hasil Klaster */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchedDocs.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

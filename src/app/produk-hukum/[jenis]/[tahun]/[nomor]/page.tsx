import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Download,
  Calendar,
  Building2,
  FileText,
  Share2,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Archive,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CopyButton } from "@/components/ui/CopyButton";
import { CitationBox } from "@/components/ui/CitationBox";
import {
  LEGAL_DOCUMENTS,
  LegalDocumentItem,
} from "@/lib/data/mock-documents";
import { padSequence, formatCitation } from "@/lib/numbering";

interface PageProps {
  params: Promise<{
    jenis: string;
    tahun: string;
    nomor: string;
  }>;
}

export async function generateStaticParams() {
  return LEGAL_DOCUMENTS.map((doc) => {
    const padding = doc.type === "SK" ? 4 : doc.type === "UU" ? 2 : 3;
    const paddedSeq = padSequence(doc.sequenceNumber, padding);
    return {
      jenis: doc.typeSlug,
      tahun: String(doc.year),
      nomor: paddedSeq,
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { jenis, tahun, nomor } = await params;
  const seqNum = parseInt(nomor, 10);
  const yearNum = parseInt(tahun, 10);

  const doc = LEGAL_DOCUMENTS.find(
    (d) =>
      d.typeSlug.toLowerCase() === jenis.toLowerCase() &&
      d.year === yearNum &&
      d.sequenceNumber === seqNum
  );

  if (!doc) {
    return { title: "Dokumen Tidak Ditemukan | JDIH BLM" };
  }

  return {
    title: `${doc.officialNumber} - ${doc.title} | JDIH BLM FEB UNAIR`,
    description: doc.summary,
  };
}

export default async function DetailProdukHukumPage({ params }: PageProps) {
  const { jenis, tahun, nomor } = await params;
  const seqNum = parseInt(nomor, 10);
  const yearNum = parseInt(tahun, 10);

  const doc = LEGAL_DOCUMENTS.find(
    (d) =>
      d.typeSlug.toLowerCase() === jenis.toLowerCase() &&
      d.year === yearNum &&
      d.sequenceNumber === seqNum
  );

  if (!doc) {
    notFound();
  }

  // Generate citation text
  const citationText = formatCitation({
    typeName: doc.typeName,
    officialNumber: doc.officialNumber,
    title: doc.title,
    placeOfEnactment: doc.placeOfEnactment,
    enactedDateFormatted: doc.enactedDateFormatted,
  });

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-600 flex-wrap">
            <Link href="/" className="hover:text-[#1B67BC] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#3885CC]" />
            <Link href="/produk-hukum" className="hover:text-[#1B67BC] transition-colors">
              Produk Hukum
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#3885CC]" />
            <Link
              href={`/produk-hukum/jenis/${doc.typeSlug}`}
              className="hover:text-[#1B67BC] transition-colors"
            >
              {doc.typeName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#3885CC]" />
            <span className="font-mono font-semibold text-[#1B67BC] truncate max-w-[200px]">
              {doc.officialNumber}
            </span>
          </nav>

          {/* Banner Peringatan Status Hukum Khusus */}
          {doc.legalStatus === "DIUBAH" && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-900 block">
                  Perhatian: Dokumen Ini Telah Diubah
                </span>
                <p className="leading-relaxed">
                  Peraturan ini telah mengalami perubahan oleh produk hukum pembaruan. Silakan periksa dokumen perubahannya untuk melihat ketentuan hukum mutakhir yang berlaku.
                </p>
                {doc.type === "UU" && doc.sequenceNumber === 1 && (
                  <Link
                    href="/produk-hukum/undang-undang/2026/02"
                    className="inline-flex items-center gap-1 font-bold text-amber-900 underline hover:text-amber-950 mt-1"
                  >
                    <span>Lihat Perubahan: UU No. 02 Tahun 2026</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          )}

          {doc.legalStatus === "DICABUT" && (
            <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs text-rose-950 flex items-start gap-3 shadow-2xs">
              <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-rose-900 block">
                  Perhatian: Dokumen Telah Dicabut
                </span>
                <p className="leading-relaxed">
                  Produk hukum ini sudah dinyatakan tidak berlaku lagi karena telah dicabut oleh peraturan yang lebih baru. Dokumen ini tetap disimpan sebagai arsip dokumentasi sejarah hukum.
                </p>
              </div>
            </div>
          )}

          {/* Header Dokumen */}
          <div className="rounded-2xl border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <TypeBadge type={doc.type} />
              <StatusBadge
                status={doc.legalStatus}
                publicationState={doc.publicationState}
              />
              {doc.nature && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#C6E8F7]/30 text-[#1B67BC] border border-[#A3D0EE]">
                  {doc.nature === "A_INTERNAL" ? "Sifat Internal (A)" : "Sifat Eksternal (B)"}
                </span>
              )}
            </div>

            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] leading-snug">
              {doc.title}
            </h1>

            {/* Nomor Resmi Monospace Bar */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#A3D0EE]/50 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-600 font-medium">Nomor Resmi:</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#1B67BC] bg-[#C6E8F7]/30 px-3 py-1 rounded-md border border-[#A3D0EE]">
                  {doc.officialNumber}
                </span>
                <CopyButton textToCopy={doc.officialNumber} label="Salin Nomor" />
              </div>

              {doc.legacyNumber && (
                <div className="text-xs text-stone-600">
                  <span>Nomor Register Asli: </span>
                  <span className="font-mono font-medium text-[#1A1A1A]">{doc.legacyNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Grid Konten: 2 Kolom (Utama 8 & Sidebar Metadata 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Utama (8 Kolom) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Ringkasan Dokumen */}
              <section className="rounded-2xl border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-2xs space-y-3">
                <h2 className="font-serif font-bold text-lg text-[#1A1A1A] border-b border-[#A3D0EE]/50 pb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#1B67BC]" />
                  <span>Ringkasan / Abstrak Peraturan</span>
                </h2>
                <p className="text-sm text-[#1A1A1A] leading-relaxed">
                  {doc.summary}
                </p>
                {doc.tags.length > 0 && (
                  <div className="pt-3 flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-stone-600">Subjek / Tag:</span>
                    {doc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#C6E8F7]/30 px-2 py-0.5 text-xs text-[#1B67BC] font-medium border border-[#A3D0EE]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </section>

              {/* Kotak Sitasi Hukum Standar */}
              <CitationBox citation={citationText} />

              {/* Viewer PDF Placeholder */}
              <section className="rounded-2xl border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#A3D0EE]/50 pb-3">
                  <h2 className="font-serif font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#1B67BC]" />
                    <span>Naskah Dokumen Digital</span>
                  </h2>
                  <span className="text-xs text-stone-600 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>SHA-256 Terverifikasi</span>
                  </span>
                </div>

                {/* PDF Display Container */}
                <div className="rounded-xl border-2 border-dashed border-[#A3D0EE] bg-[#C6E8F7]/15 p-8 sm:p-12 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-white border border-[#A3D0EE] flex items-center justify-center text-[#1B67BC] shadow-2xs">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                      Salinan Resmi Berkas Produk Hukum
                    </h3>
                    <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                      Dokumen digital resmi bertanda tangan dari Biro Administrasi & Sekretariat Badan Legislatif Mahasiswa FEB UNAIR.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                    <a
                      href={`/dokumen/${doc.slug}/unduh`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#1B67BC] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#3885CC] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Berkas PDF Resmi</span>
                    </a>
                    <a
                      href={`/dokumen/${doc.slug}/lihat`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#A3D0EE] bg-white px-5 py-2.5 text-xs font-bold text-[#1A1A1A] hover:bg-[#C6E8F7]/30 transition-all cursor-pointer"
                    >
                      <span>Buka di Tab Baru</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#1B67BC]" />
                    </a>
                  </div>

                  <div className="pt-4 text-[11px] text-stone-500 flex items-center justify-center gap-4 flex-wrap border-t border-[#A3D0EE]/40">
                    <span>Format: Dokumen PDF</span>
                    <span>•</span>
                    <span>Tersimpan di Cloudflare R2 Privat</span>
                    <span>•</span>
                    <span>{doc.downloadCount} Kali Diunduh</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Kolom Samping: Tabel Metadata Standar JDIHN (4 Kolom) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-[#A3D0EE] bg-white p-6 shadow-2xs space-y-4">
                <h3 className="font-serif font-bold text-base text-[#1A1A1A] border-b border-[#A3D0EE]/50 pb-2">
                  Tabel Metadata JDIHN
                </h3>

                <dl className="text-xs divide-y divide-[#A3D0EE]/40 space-y-0">
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Jenis Produk</dt>
                    <dd className="font-bold text-[#1A1A1A] text-right">{doc.typeName}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Nomor Resmi</dt>
                    <dd className="font-mono font-bold text-[#1B67BC] text-right">{doc.officialNumber}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Tahun</dt>
                    <dd className="font-bold text-[#1A1A1A] text-right">{doc.year}</dd>
                  </div>
                  {doc.nature && (
                    <div className="py-2.5 flex justify-between gap-3">
                      <dt className="text-stone-600 font-medium shrink-0">Sifat Surat</dt>
                      <dd className="font-bold text-[#1A1A1A] text-right">
                        {doc.nature === "A_INTERNAL" ? "Internal (A)" : "Eksternal (B)"}
                      </dd>
                    </div>
                  )}
                  {doc.abbreviationCode && (
                    <div className="py-2.5 flex justify-between gap-3">
                      <dt className="text-stone-600 font-medium shrink-0">Kode Singkatan</dt>
                      <dd className="font-mono font-bold text-[#1A1A1A] text-right">{doc.abbreviationCode}</dd>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Forum Penetapan</dt>
                    <dd className="font-bold text-[#1A1A1A] text-right">{doc.forum}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Tempat Penetapan</dt>
                    <dd className="font-bold text-[#1A1A1A] text-right">{doc.placeOfEnactment}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Tanggal Penetapan</dt>
                    <dd className="font-bold text-[#1A1A1A] text-right">{doc.enactedDateFormatted}</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Status Keberlakuan</dt>
                    <dd className="font-bold text-[#1A1A1A] text-right">
                      <StatusBadge status={doc.legalStatus} size="sm" />
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Bahasa</dt>
                    <dd className="font-bold text-[#1A1A1A] text-right">Bahasa Indonesia</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-3">
                    <dt className="text-stone-600 font-medium shrink-0">Lokasi Penerbit</dt>
                    <dd className="font-bold text-[#1A1A1A] text-right">BLM FEB UNAIR</dd>
                  </div>
                </dl>

                {/* Tombol Aksi Tambahan */}
                <div className="pt-3 border-t border-[#A3D0EE]/50 space-y-2">
                  <a
                    href={`/dokumen/${doc.slug}/unduh`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1B67BC] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#3885CC] transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh PDF Dokumen</span>
                  </a>

                  <Link
                    href="/permohonan"
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#A3D0EE] bg-white py-2.5 text-xs font-semibold text-[#1A1A1A] hover:bg-[#C6E8F7]/30 transition-all cursor-pointer"
                  >
                    <span>Permohonan Informasi Terkait</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

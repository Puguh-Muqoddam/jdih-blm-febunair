import React from "react";
import Link from "next/link";
import {
  Scale,
  BookOpen,
  Scroll,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  FileText,
  Building,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSearchBar } from "@/components/public/HeroSearchBar";
import { DocumentCard } from "@/components/public/DocumentCard";
import { LEGAL_DOCUMENTS } from "@/lib/data/mock-documents";

export default function HomePage() {
  // Ambil 6 dokumen unggulan / terbaru (mis. UU PEMIRA, TAP Ospek, SK LPPM SEKTOR, SK Rekomendasi PEMIRA)
  const featuredDocuments = [
    LEGAL_DOCUMENTS[1], // UU 02 (Perubahan UU PEMIRA)
    LEGAL_DOCUMENTS[3], // TAP 002 (Kebijakan Ospek)
    LEGAL_DOCUMENTS[4], // TAP 003 (Kepengurusan Sementara LPPM SEKTOR)
    LEGAL_DOCUMENTS[31], // SK 0163 (Rekomendasi Penyelenggara PEMIRA)
    LEGAL_DOCUMENTS[33], // SK 0165 (Peringatan Ospek Jurusan)
    LEGAL_DOCUMENTS[8], // LP 004 (Laporan Pengawasan Ospek)
  ];

  const docTypeCards = [
    {
      code: "UU",
      name: "Undang-Undang",
      slug: "undang-undang",
      count: 2,
      icon: Scale,
      color: "bg-[#3E2C1C] text-[#FFFDF7]",
      badgeColor: "bg-[#d4af38] text-[#3E2C1C]",
      desc: "Regulasi tertinggi yang disahkan dalam Sidang Pleno BLM, mengatur tatanan fundamental organisasi dan pesta demokrasi mahasiswa.",
    },
    {
      code: "TAP",
      name: "Ketetapan BLM",
      slug: "ketetapan-blm",
      count: 3,
      icon: BookOpen,
      color: "bg-[#80691d] text-[#FFFDF7]",
      badgeColor: "bg-white text-[#80691d]",
      desc: "Ketetapan sidang pleno dan prosedur tetap yang memuat kebijakan strategis kemahasiswaan dan pedoman pengawasan lembaga.",
    },
    {
      code: "SK",
      name: "Surat Keputusan",
      slug: "surat-keputusan",
      count: 39,
      icon: Scroll,
      color: "bg-[#96552f] text-[#FFFDF7]",
      badgeColor: "bg-white text-[#96552f]",
      desc: "Keputusan persidangan legislatif terkait agenda, tata tertib, ormawa, personalia, serta kebijakan eksternal berkode A dan B.",
    },
    {
      code: "LP",
      name: "Surat Laporan",
      slug: "lembaran-parlemen",
      count: 5,
      icon: FileCheck,
      color: "bg-[#6B5A48] text-[#FFFDF7]",
      badgeColor: "bg-white text-[#6B5A48]",
      desc: "Laporan resmi hasil pengawasan berkala, laporan investigasi komisi, dan evaluasi kepatuhan organisasi mahasiswa.",
    },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 flex flex-col">
        {/* ===================================================================
            1. HERO SECTION
           =================================================================== */}
        <section className="relative overflow-hidden bg-[#3E2C1C] text-[#FFFDF7] py-16 lg:py-24 border-b border-[#E8DEC4]">
          {/* Subtle Background Pattern & Gold Accents */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af38_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#d4af38]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#b96d41]/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af38]/40 bg-[#d4af38]/10 px-4 py-1.5 text-xs font-semibold text-[#d4af38] backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Portal Resmi JDIH BLM FEB UNAIR</span>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-[#FFFDF7]">
                Pangkalan Dokumentasi & Informasi Hukum Mahasiswa
              </h1>
              <p className="text-sm sm:text-base text-[#FFFDF7]/80 leading-relaxed max-w-2xl mx-auto">
                Mewujudkan transparansi produk hukum yang akuntabel, terpercaya, dan mudah diakses oleh seluruh sivitas akademika Fakultas Ekonomi dan Bisnis Universitas Airlangga.
              </p>
            </div>

            {/* Interactive Search Bar Component */}
            <HeroSearchBar />

            {/* Quick Stat Counter */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <div className="rounded-xl bg-[#FFFDF7]/10 p-4 border border-[#FFFDF7]/15 backdrop-blur-xs">
                <span className="block text-2xl font-serif font-bold text-[#d4af38]">
                  49
                </span>
                <span className="text-xs text-[#FFFDF7]/75 font-medium">
                  Total Produk Hukum
                </span>
              </div>
              <div className="rounded-xl bg-[#FFFDF7]/10 p-4 border border-[#FFFDF7]/15 backdrop-blur-xs">
                <span className="block text-2xl font-serif font-bold text-[#d4af38]">
                  100%
                </span>
                <span className="text-xs text-[#FFFDF7]/75 font-medium">
                  Publikasi Terbuka
                </span>
              </div>
              <div className="rounded-xl bg-[#FFFDF7]/10 p-4 border border-[#FFFDF7]/15 backdrop-blur-xs">
                <span className="block text-2xl font-serif font-bold text-[#d4af38]">
                  4 Jenis
                </span>
                <span className="text-xs text-[#FFFDF7]/75 font-medium">
                  UU • TAP • SK • LP
                </span>
              </div>
              <div className="rounded-xl bg-[#FFFDF7]/10 p-4 border border-[#FFFDF7]/15 backdrop-blur-xs">
                <span className="block text-2xl font-serif font-bold text-[#d4af38]">
                  2026
                </span>
                <span className="text-xs text-[#FFFDF7]/75 font-medium">
                  Register Terkini
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            2. KARTU JENIS PRODUK HUKUM (UU, TAP, SK, LP)
           =================================================================== */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#80691d]">
                Klasifikasi Regulasi
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#3E2C1C] mt-1">
                Kategori Produk Hukum BLM
              </h2>
            </div>
            <Link
              href="/produk-hukum"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#80691d] hover:text-[#3E2C1C] transition-colors"
            >
              <span>Lihat Seluruh Katalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {docTypeCards.map((card) => {
              const IconComp = card.icon;
              return (
                <Link
                  key={card.code}
                  href={`/produk-hukum/jenis/${card.slug}`}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#E8DEC4] bg-white p-6 shadow-2xs hover:shadow-xl hover:border-[#80691d] transition-all hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${card.color}`}
                      >
                        <IconComp className="w-6 h-6 text-[#d4af38]" />
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-2xs ${card.badgeColor}`}
                      >
                        {card.count} Dokumen
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#3E2C1C] group-hover:text-[#80691d] transition-colors mb-2">
                      {card.name} ({card.code})
                    </h3>
                    <p className="text-xs text-[#6B5A48] leading-relaxed line-clamp-3">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#F2EBDA] flex items-center justify-between text-xs font-semibold text-[#80691d]">
                    <span>Buka Lembaran</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            3. DOKUMEN TERBARU & UNGGULAN
           =================================================================== */}
        <section className="py-14 sm:py-20 bg-[#F7F1E3]/50 border-y border-[#E8DEC4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#80691d]">
                  Publikasi Legislatif
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#3E2C1C] mt-1">
                  Produk Hukum Terbaru & Terkini
                </h2>
                <p className="text-xs text-[#6B5A48] mt-1">
                  Enam dokumen hukum terpenting yang baru ditetapkan dan memiliki urgensi luas bagi ormawa FEB UNAIR.
                </p>
              </div>
              <Link
                href="/produk-hukum"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#E8DEC4] text-xs font-bold text-[#3E2C1C] hover:bg-[#F7F1E3] hover:text-[#80691d] shadow-2xs transition-colors"
              >
                <span>Buka Katalog Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. VISUALISASI HIERARKI HUKUM BLM
           =================================================================== */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-2xl border border-[#E8DEC4] bg-white p-8 lg:p-12 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#80691d]">
                Edukasi & Tata Urutan
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#3E2C1C]">
                Hierarki Tata Hukum BLM FEB UNAIR
              </h2>
              <p className="text-xs text-[#6B5A48] leading-relaxed">
                Produk hukum di lingkungan BLM FEB UNAIR memiliki tata urutan kekuatan mengikat yang sistematis demi kepastian hukum ormawa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-[#3E2C1C] bg-[#FFFDF7] p-5 space-y-3 relative overflow-hidden">
                <span className="text-xs font-mono font-bold text-[#FFFDF7] bg-[#3E2C1C] px-2 py-0.5 rounded">
                  TINGKAT 1 (Tertinggi)
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E2C1C]">
                  Undang-Undang (UU)
                </h3>
                <p className="text-xs text-[#6B5A48] leading-relaxed">
                  Peraturan dasar hukum tertinggi mahasiswa yang mengatur tata kelola fundamental ormawa dan pemilihan umum raya.
                </p>
              </div>

              <div className="rounded-xl border border-[#80691d] bg-[#FFFDF7] p-5 space-y-3 relative overflow-hidden">
                <span className="text-xs font-mono font-bold text-[#FFFDF7] bg-[#80691d] px-2 py-0.5 rounded">
                  TINGKAT 2
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E2C1C]">
                  Ketetapan (TAP)
                </h3>
                <p className="text-xs text-[#6B5A48] leading-relaxed">
                  Keputusan musyawarah sidang yang mengikat ke dalam dan ke luar, mengatur pedoman orientasi dan prosedur tetap.
                </p>
              </div>

              <div className="rounded-xl border border-[#96552f] bg-[#FFFDF7] p-5 space-y-3 relative overflow-hidden">
                <span className="text-xs font-mono font-bold text-[#FFFDF7] bg-[#96552f] px-2 py-0.5 rounded">
                  TINGKAT 3
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E2C1C]">
                  Surat Keputusan (SK)
                </h3>
                <p className="text-xs text-[#6B5A48] leading-relaxed">
                  Penetapan administratif persidangan, tata tertib, ormawa, sanksi etik, dan mandat kepengurusan (kode A/B).
                </p>
              </div>

              <div className="rounded-xl border border-[#6B5A48] bg-[#FFFDF7] p-5 space-y-3 relative overflow-hidden">
                <span className="text-xs font-mono font-bold text-[#FFFDF7] bg-[#6B5A48] px-2 py-0.5 rounded">
                  TINGKAT 4
                </span>
                <h3 className="font-serif font-bold text-base text-[#3E2C1C]">
                  Surat Laporan (LP)
                </h3>
                <p className="text-xs text-[#6B5A48] leading-relaxed">
                  Lembaran parlemen resmi berisi risalah pengawasan, hasil investigasi komisi, dan evaluasi kepatuhan kegiatan ormawa.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/panduan-penomoran"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#80691d] hover:underline"
              >
                <span>Pelajari lebih lengkap di Panduan Penomoran & Kode Sifat A/B</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

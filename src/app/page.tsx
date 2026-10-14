import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  Users,
  Landmark,
  MapPin,
  Sparkles,
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
      color: "bg-[#1A1A1A] text-white",
      badgeColor: "bg-[#b96d41] text-white",
      desc: "Regulasi tertinggi yang disahkan dalam Sidang Pleno BLM, mengatur tatanan fundamental organisasi dan pesta demokrasi mahasiswa.",
    },
    {
      code: "TAP",
      name: "Ketetapan BLM",
      slug: "ketetapan-blm",
      count: 3,
      icon: BookOpen,
      color: "bg-[#b96d41] text-white",
      badgeColor: "bg-white text-[#b96d41]",
      desc: "Ketetapan sidang pleno dan prosedur tetap yang memuat kebijakan strategis kemahasiswaan dan pedoman pengawasan lembaga.",
    },
    {
      code: "SK",
      name: "Surat Keputusan",
      slug: "surat-keputusan",
      count: 39,
      icon: Scroll,
      color: "bg-[#1B67BC] text-white",
      badgeColor: "bg-white text-[#1B67BC]",
      desc: "Keputusan persidangan legislatif terkait agenda, tata tertib, ormawa, personalia, serta kebijakan eksternal berkode A dan B.",
    },
    {
      code: "LP",
      name: "Surat Laporan",
      slug: "lembaran-parlemen",
      count: 5,
      icon: FileCheck,
      color: "bg-[#3885CC] text-white",
      badgeColor: "bg-white text-[#3885CC]",
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
        <section className="relative overflow-hidden bg-gradient-to-b from-[#1B67BC] via-[#16569e] to-[#103E73] text-white py-16 lg:py-24 border-b border-[#A3D0EE]/40">
          {/* Subtle Background Pattern & Accents */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A3D0EE_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#3885CC]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#b96d41]/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Dual Official Emblems */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shadow-lg border-2 border-white flex items-center justify-center hover:scale-105 transition-transform">
                <Image
                  src="/images/blm_logo.png"
                  alt="Logo Resmi BLM FEB UNAIR"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shadow-lg border-2 border-[#A3D0EE] flex items-center justify-center hover:scale-105 transition-transform">
                <Image
                  src="/images/parliament_logo.png"
                  alt="Logo Kabinet Cakrasena"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#C6E8F7] backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-[#A3D0EE]" />
              <span>Portal Resmi JDIH BLM FEB UNAIR • Kabinet Cakrasena 2026</span>
            </div>

            <div className="space-y-3 max-w-3xl mx-auto">
              <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white">
                Pangkalan Dokumentasi & Informasi Hukum Mahasiswa
              </h1>
              <p className="text-xs sm:text-sm text-[#C6E8F7] font-serif italic font-semibold">
                &quot;Menyatukan Aspirasi, Menegakkan Demokrasi&quot;
              </p>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl mx-auto">
                Mewujudkan transparansi produk hukum yang akuntabel, terpercaya, dan mudah diakses oleh seluruh sivitas akademika Fakultas Ekonomi dan Bisnis Universitas Airlangga.
              </p>
            </div>

            {/* Interactive Search Bar Component */}
            <HeroSearchBar />

            {/* Quick Stat Counter */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <div className="rounded-xl bg-white/10 p-4 border border-white/15 backdrop-blur-xs">
                <span className="block text-2xl font-serif font-bold text-[#C6E8F7]">
                  49
                </span>
                <span className="text-xs text-white/80 font-medium">
                  Total Produk Hukum
                </span>
              </div>
              <div className="rounded-xl bg-white/10 p-4 border border-white/15 backdrop-blur-xs">
                <span className="block text-2xl font-serif font-bold text-[#C6E8F7]">
                  100%
                </span>
                <span className="text-xs text-white/80 font-medium">
                  Publikasi Terbuka
                </span>
              </div>
              <div className="rounded-xl bg-white/10 p-4 border border-white/15 backdrop-blur-xs">
                <span className="block text-2xl font-serif font-bold text-[#C6E8F7]">
                  4 Jenis
                </span>
                <span className="text-xs text-white/80 font-medium">
                  UU • TAP • SK • LP
                </span>
              </div>
              <div className="rounded-xl bg-white/10 p-4 border border-white/15 backdrop-blur-xs">
                <span className="block text-2xl font-serif font-bold text-[#C6E8F7]">
                  2026
                </span>
                <span className="text-xs text-white/80 font-medium">
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B67BC]">
                Klasifikasi Regulasi
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] mt-1">
                Kategori Produk Hukum BLM
              </h2>
            </div>
            <Link
              href="/produk-hukum"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B67BC] hover:text-[#3885CC] transition-colors"
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
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#A3D0EE] bg-white p-6 shadow-xs hover:shadow-xl hover:border-[#1B67BC] transition-all hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${card.color}`}
                      >
                        <IconComp className="w-6 h-6 text-white" />
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-xs ${card.badgeColor}`}
                      >
                        {card.count} Dokumen
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#1A1A1A] group-hover:text-[#1B67BC] transition-colors mb-2">
                      {card.name} ({card.code})
                    </h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed line-clamp-3">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#A3D0EE]/40 flex items-center justify-between text-xs font-semibold text-[#1B67BC]">
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
        <section className="py-14 sm:py-20 bg-[#C6E8F7]/30 border-y border-[#A3D0EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B67BC]">
                  Publikasi Legislatif
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] mt-1">
                  Produk Hukum Terbaru & Terkini
                </h2>
                <p className="text-xs text-[#4A5568] mt-1">
                  Enam dokumen hukum terpenting yang baru ditetapkan dan memiliki urgensi luas bagi ormawa FEB UNAIR.
                </p>
              </div>
              <Link
                href="/produk-hukum"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#A3D0EE] text-xs font-bold text-[#1A1A1A] hover:bg-[#C6E8F7]/40 hover:text-[#1B67BC] shadow-xs transition-colors"
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
            4. LEMBAGA PARLEMEN & TRI-FUNGSI BLM FEB UNAIR
           =================================================================== */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-3xl border border-[#A3D0EE] bg-white p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#A3D0EE]/40 pb-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B67BC]">
                  <Landmark className="w-4 h-4" />
                  <span>Struktur & Tugas Pokok Parlemen</span>
                </div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                  Tri-Fungsi Parlemen & Komisi Legislasi
                </h2>
                <p className="text-xs sm:text-sm text-[#4A5568] max-w-2xl">
                  BLM FEB UNAIR menjalankan tiga pilar kedaulatan mahasiswa melalui koordinasi 3 Komisi, Biro Administrasi (BIRAD), dan 15 Anggota Parlemen.
                </p>
              </div>

              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B67BC] text-white text-xs font-bold shadow-sm hover:bg-[#3885CC] transition-colors shrink-0"
              >
                <span>Pelajari Profil Lengkap Parlemen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-[#A3D0EE] bg-[#C6E8F7]/20 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#b96d41] text-white px-2.5 py-0.5 rounded shadow-xs">
                    Komisi B
                  </span>
                  <span className="text-[11px] font-semibold text-[#1B67BC]">
                    Pengampu JDIH
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
                  Fungsi Legislasi
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Merancang naskah akademik, mengesahkan Undang-Undang, Ketetapan, dan Keputusan, serta mengelola portal keterbukaan hukum JDIH.
                </p>
              </div>

              <div className="rounded-2xl border border-[#A3D0EE] bg-[#C6E8F7]/20 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#1B67BC] text-white px-2.5 py-0.5 rounded shadow-xs">
                    Komisi A
                  </span>
                  <span className="text-[11px] font-semibold text-[#4A5568]">
                    Pengawasan Ormawa
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
                  Fungsi Pengawasan
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Mengawal kinerja Badan Eksekutif Mahasiswa (BEM) FEB UNAIR, verifikasi laporan pertanggungjawaban, dan akuntabilitas organisasi.
                </p>
              </div>

              <div className="rounded-2xl border border-[#A3D0EE] bg-[#C6E8F7]/20 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#3885CC] text-white px-2.5 py-0.5 rounded shadow-xs">
                    Komisi C
                  </span>
                  <span className="text-[11px] font-semibold text-[#4A5568]">
                    Suara Mahasiswa
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
                  Fungsi Aspirasi & Advokasi
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Menjembatani kritik, saran, serta aspirasi mahasiswa via Rapat Dengar Pendapat (RDP) dan Bank Aspirasi kampus.
                </p>
              </div>
            </div>

            {/* Sekretariat Info Bar */}
            <div className="rounded-2xl bg-[#C6E8F7]/30 border border-[#A3D0EE] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1A1A1A]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#A3D0EE] flex items-center justify-center text-[#1B67BC] shrink-0">
                  <MapPin className="w-5 h-5 text-[#1B67BC]" />
                </div>
                <div>
                  <strong className="block text-[#1A1A1A]">Sekretariat Parlemen BLM:</strong>
                  <span className="text-[#4A5568]">
                    Graha Krida Mahasiswa (GKM) Lantai 1, Fakultas Ekonomi dan Bisnis Universitas Airlangga, Jl. Airlangga 4-6 Surabaya.
                  </span>
                </div>
              </div>
              <Link
                href="/permohonan"
                className="text-xs font-bold text-[#b96d41] hover:underline shrink-0"
              >
                Ajukan Permohonan Informasi →
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. VISUALISASI HIERARKI HUKUM BLM
           =================================================================== */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-2xl border border-[#A3D0EE] bg-white p-8 lg:p-12 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B67BC]">
                Edukasi & Tata Urutan
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Hierarki Tata Hukum BLM FEB UNAIR
              </h2>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Produk hukum di lingkungan BLM FEB UNAIR memiliki tata urutan kekuatan mengikat yang sistematis demi kepastian hukum ormawa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-[#1A1A1A] bg-[#C6E8F7]/15 p-5 space-y-3 relative overflow-hidden">
                <span className="text-xs font-mono font-bold text-white bg-[#1A1A1A] px-2 py-0.5 rounded">
                  TINGKAT 1 (Tertinggi)
                </span>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Undang-Undang (UU)
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Peraturan dasar hukum tertinggi mahasiswa yang mengatur tata kelola fundamental ormawa dan pemilihan umum raya.
                </p>
              </div>

              <div className="rounded-xl border border-[#b96d41] bg-[#C6E8F7]/15 p-5 space-y-3 relative overflow-hidden">
                <span className="text-xs font-mono font-bold text-white bg-[#b96d41] px-2 py-0.5 rounded">
                  TINGKAT 2
                </span>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Ketetapan (TAP)
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Keputusan musyawarah sidang yang mengikat ke dalam dan ke luar, mengatur pedoman orientasi dan prosedur tetap.
                </p>
              </div>

              <div className="rounded-xl border border-[#1B67BC] bg-[#C6E8F7]/15 p-5 space-y-3 relative overflow-hidden">
                <span className="text-xs font-mono font-bold text-white bg-[#1B67BC] px-2 py-0.5 rounded">
                  TINGKAT 3
                </span>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Surat Keputusan (SK)
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Penetapan administratif persidangan, tata tertib, ormawa, sanksi etik, dan mandat kepengurusan (kode A/B).
                </p>
              </div>

              <div className="rounded-xl border border-[#3885CC] bg-[#C6E8F7]/15 p-5 space-y-3 relative overflow-hidden">
                <span className="text-xs font-mono font-bold text-white bg-[#3885CC] px-2 py-0.5 rounded">
                  TINGKAT 4
                </span>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Surat Laporan (LP)
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Lembaran parlemen resmi berisi risalah pengawasan, hasil investigasi komisi, dan evaluasi kepatuhan kegiatan ormawa.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/panduan-penomoran"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B67BC] hover:underline"
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

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Landmark,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSearchBar } from "@/components/public/HeroSearchBar";
import { HeroBackdropSlider } from "@/components/public/HeroBackdropSlider";
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
      name: "Undang-Undang (UU)",
      slug: "undang-undang",
      count: 2,
      boxBg: "from-[#1B67BC] via-[#2B78C5] to-[#123B6D] text-white",
      desc: "Regulasi dasar tertinggi yang disahkan melalui Sidang Pleno BLM FEB UNAIR untuk mengatur tata kelola fundamental ormawa dan pemilihan raya mahasiswa.",
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12" fill="none">
          <path d="M32 10V52" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M18 52H46" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M14 20H50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M16 20L10 34H22L16 20Z" fill="#C6E8F7" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M48 20L42 34H54L48 20Z" fill="#C6E8F7" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="32" cy="14" r="3.5" fill="#b96d41" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      code: "TAP",
      name: "Ketetapan BLM (TAP)",
      slug: "ketetapan-blm",
      count: 3,
      boxBg: "from-[#FFFFFF] via-[#F0F8FF] to-[#D6ECFA] text-[#1A1A1A]",
      desc: "Ketetapan musyawarah sidang parlemen yang mengikat secara internal maupun eksternal dalam menetapkan kebijakan strategis dan prosedur tetap.",
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12" fill="none">
          <path
            d="M12 18C19 18 26 20 32 24C38 20 45 18 52 18V46C45 46 38 48 32 52C26 48 19 46 12 46V18Z"
            fill="#1B67BC"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path d="M32 24V52" stroke="currentColor" strokeWidth="3.2" />
          <path d="M18 27H26M18 34H26M38 27H46M38 34H46" stroke="#1B67BC" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      code: "SK",
      name: "Surat Keputusan (SK)",
      slug: "surat-keputusan",
      count: 39,
      boxBg: "from-[#A3D0EE] via-[#C6E8F7] to-[#74B3E0] text-[#1A1A1A]",
      desc: "Keputusan administratif dan persidangan legislatif terkait agenda, tata tertib, kepengurusan ormawa, serta kebijakan eksternal berkode A dan B.",
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12" fill="none">
          <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="4" />
          <circle cx="32" cy="32" r="11" fill="#1B67BC" fillOpacity="0.2" stroke="#1B67BC" strokeWidth="2.5" />
          <path d="M26 32L30 36L39 27" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      code: "LP",
      name: "Surat Laporan (LP)",
      slug: "lembaran-parlemen",
      count: 5,
      boxBg: "from-[#89C2E8] via-[#B8E0F7] to-[#5CA3D6] text-[#1A1A1A]",
      desc: "Instrumen akuntabilitas hasil pengawasan berkala, laporan investigasi komisi, serta evaluasi kepatuhan kegiatan organisasi mahasiswa FEB UNAIR.",
      renderIcon: () => (
        <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12" fill="none">
          <polygon
            points="32,11 37.8,23.5 51.5,25.2 41.4,34.7 44,48.3 32,41.6 20,48.3 22.6,34.7 12.5,25.2 26.2,23.5"
            fill="#1B67BC"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 flex flex-col">
        {/* ===================================================================
            1. HERO SECTION (Gaya FEB UNAIR: Full-Bleed Photo + Left-Aligned Text)
           =================================================================== */}
        <section className="relative min-h-[600px] sm:min-h-[650px] lg:min-h-[720px] flex items-end pb-14 sm:pb-20 pt-36 sm:pt-44 overflow-hidden bg-[#0F294A] text-white">
          {/* Interactive / Auto-Fading Background Photos */}
          <HeroBackdropSlider />

          {/* Left-Aligned Hero Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-5 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1 text-[11px] sm:text-xs font-semibold tracking-wide text-[#C6E8F7]">
                <span className="w-2 h-2 rounded-full bg-[#b96d41]" />
                <span>Portal Resmi JDIH • Parlemen Cakrasena 2026</span>
              </div>

              <h1 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-[50px] tracking-tight leading-[1.12] text-white drop-shadow-md">
                Jaringan Dokumentasi dan Informasi Hukum.
              </h1>

              <p className="text-sm sm:text-base lg:text-[17px] text-white/90 leading-relaxed max-w-xl font-normal drop-shadow-xs">
                Mewujudkan transparansi produk hukum yang akuntabel, terpercaya, dan mudah diakses oleh seluruh sivitas akademika Fakultas Ekonomi dan Bisnis Universitas Airlangga melalui pangkalan regulasi, pengawasan, dan aspirasi mahasiswa.
              </p>

              {/* Left-Aligned Search Bar */}
              <div className="pt-2">
                <HeroSearchBar />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            2. SECTION KATEGORI PRODUK HUKUM (Kolom Kiri Intro + Grid 2x2 Kotak Horizontal)
           =================================================================== */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Kolom Kiri: Kartu Feature Deskripsi + Foto Bergradasi di Bawah */}
              <div className="lg:col-span-4 bg-[#F5F6F8] rounded-2xl border border-[#A3D0EE]/50 flex flex-col justify-between overflow-hidden relative min-h-[420px]">
                <div className="p-7 sm:p-8 pb-4 relative z-20 space-y-3.5">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#b96d41]">
                    Klasifikasi Regulasi
                  </span>
                  <h2 className="font-sans font-extrabold text-2xl sm:text-[26px] uppercase tracking-wide text-[#1B67BC]">
                    PRODUK HUKUM
                  </h2>
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/85 leading-relaxed">
                    Telusuri berbagai instrumen regulasi dan ketetapan hukum resmi yang disusun secara khusus bagi sivitas akademika, mulai dari Undang-Undang hingga Surat Laporan.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/produk-hukum"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B67BC] hover:text-[#b96d41] transition-colors group"
                    >
                      <span>Telusuri Semua Produk Hukum</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Foto Bawah dengan Efek Gradasi Halus Menyatu ke Latar Kartu */}
                <div className="relative h-56 sm:h-60 w-full mt-auto select-none pointer-events-none">
                  <Image
                    src="/images/hero-sidang-parlemen.jpg"
                    alt="Suasana Persidangan Badan Legislatif Mahasiswa FEB UNAIR"
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5F6F8] via-[#F5F6F8]/80 to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F5F6F8] via-[#F5F6F8]/40 to-transparent z-10" />
                </div>
              </div>

              {/* Kolom Kanan: Grid 2x2 Kotak Horizontal (Gaya Referensi 4 Kotak) + Baris Pedoman */}
              <div className="lg:col-span-8 flex flex-col justify-between gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 flex-1">
                  {docTypeCards.map((card) => (
                    <Link
                      key={card.code}
                      href={`/produk-hukum/jenis/${card.slug}`}
                      className="group rounded-2xl bg-gradient-to-r from-[#133B6E] via-[#1B67BC] to-[#2B7AC9] p-4 sm:p-5 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 sm:gap-5 border border-[#3885CC]/40"
                    >
                      {/* Kotak Persegi di Sisi Kiri (Gaya Referensi) */}
                      <div
                        className={`w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl border-2 border-[#1A1A1A] bg-gradient-to-br ${card.boxBg} shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform`}
                      >
                        {card.renderIcon()}
                        <span className="mt-1 text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded bg-black/15">
                          {card.count} Dokumen
                        </span>
                      </div>

                      {/* Teks Judul & Deskripsi Rata Kanan-Kiri di Sisi Kanan */}
                      <div className="flex-1 min-w-0 space-y-1.5 text-left">
                        <h3 className="font-sans font-extrabold text-base sm:text-lg text-white group-hover:text-[#C6E8F7] transition-colors leading-snug">
                          {card.name}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-medium text-justify sm:text-left">
                          {card.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Baris Link Horizontal di Bawah 4 Kotak */}
                <Link
                  href="/panduan-penomoran"
                  className="rounded-xl border border-[#A3D0EE] bg-[#C6E8F7]/20 py-3.5 px-5 flex items-center justify-between group hover:bg-[#1B67BC] hover:border-[#1B67BC] transition-all"
                >
                  <span className="font-sans font-bold text-xs sm:text-base text-[#1B67BC] group-hover:text-white transition-colors">
                    PEDOMAN : Standarisasi & Format Penomoran Resmi Departemen Legislasi (49 Produk Hukum)
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#b96d41] group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                </Link>
              </div>
            </div>
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
                  BLM FEB UNAIR menjalankan tiga pilar kedaulatan mahasiswa melalui koordinasi 3 Komisi, Departemen Legislasi, dan 15 Anggota Parlemen.
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
                    Graha Krida Mahasiswa (GKM) Lantai 1, Fakultas Ekonomi dan Bisnis, Universitas Airlangga, Jl. Airlangga No. 4-6, Surabaya.
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

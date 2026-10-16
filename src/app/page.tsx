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
      name: "Undang-Undang",
      slug: "undang-undang",
      count: 2,
      renderEmblem: () => (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
          {/* Top Mortarboard / Parliamentary Crown in #1B67BC */}
          <polygon
            points="32,10 52,19 32,28 12,19"
            fill="#1B67BC"
            stroke="#1A1A1A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M21 23V33C21 36.5 26 39 32 39C38 39 43 36.5 43 33V23"
            fill="#3885CC"
            fillOpacity="0.25"
            stroke="#1A1A1A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M48 21V34" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="48" cy="35" r="2" fill="#1B67BC" stroke="#1A1A1A" strokeWidth="1.5" />
          {/* Ribbon & Laurel Wreath at Bottom */}
          <path
            d="M26 39V52L32 48L38 52V39"
            fill="#FFFFFF"
            stroke="#1A1A1A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M15 38C15 45 19 50 23 52M49 38C49 45 45 50 41 52"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="41" r="1.5" fill="#1B67BC" />
          <circle cx="18" cy="46" r="1.5" fill="#1B67BC" />
          <circle cx="48" cy="41" r="1.5" fill="#1B67BC" />
          <circle cx="46" cy="46" r="1.5" fill="#1B67BC" />
        </svg>
      ),
    },
    {
      code: "TAP",
      name: "Ketetapan BLM",
      slug: "ketetapan-blm",
      count: 3,
      renderEmblem: () => (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
          {/* Top Emblem Cap */}
          <polygon
            points="32,8 50,16 32,24 14,16"
            fill="#1B67BC"
            stroke="#1A1A1A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M22 20V26C22 28.5 26.5 30.5 32 30.5C37.5 30.5 42 28.5 42 26V20"
            fill="#3885CC"
            fillOpacity="0.3"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Open Statute Book Below */}
          <path
            d="M14 34C20 34 27 35.5 32 39C37 35.5 44 34 50 34V51C44 51 37 52.5 32 55C27 52.5 20 51 14 51V34Z"
            fill="#FFFFFF"
            stroke="#1A1A1A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M32 39V55" stroke="#1A1A1A" strokeWidth="2.2" />
          <path d="M19 40H27M19 45H27M37 40H45M37 45H45" stroke="#1B67BC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      code: "SK",
      name: "Surat Keputusan",
      slug: "surat-keputusan",
      count: 39,
      renderEmblem: () => (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
          {/* Top Cap */}
          <polygon
            points="32,8 50,16 32,24 14,16"
            fill="#1B67BC"
            stroke="#1A1A1A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Stacked Pages Lines */}
          <path d="M23 26L32 30L41 26" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          <path d="M23 30L32 34L41 30" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          {/* Rolled Decree Scroll at Bottom */}
          <rect
            x="14"
            y="38"
            width="36"
            height="11"
            rx="5.5"
            fill="#3885CC"
            fillOpacity="0.35"
            stroke="#1A1A1A"
            strokeWidth="2.2"
          />
          <circle cx="20" cy="43.5" r="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
          <rect
            x="29"
            y="37"
            width="6"
            height="13"
            rx="1"
            fill="#1B67BC"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          <path d="M30 50L28 56M34 50L36 56" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      code: "LP",
      name: "Surat Laporan",
      slug: "lembaran-parlemen",
      count: 5,
      renderEmblem: () => (
        <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
          {/* Official Briefcase / Oversight Dossier */}
          <path
            d="M25 16V13C25 11.5 26.5 10 28 10H36C37.5 10 39 11.5 39 13V16"
            stroke="#1A1A1A"
            strokeWidth="2.2"
          />
          <rect
            x="14"
            y="16"
            width="36"
            height="24"
            rx="3"
            fill="#1B67BC"
            stroke="#1A1A1A"
            strokeWidth="2.2"
          />
          <path
            d="M14 25C22 28 42 28 50 25"
            stroke="#1A1A1A"
            strokeWidth="2.2"
          />
          <rect
            x="29"
            y="23"
            width="6"
            height="7"
            rx="1"
            fill="#FFFFFF"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          {/* Oversight Gear & Star Badge */}
          <circle
            cx="21"
            cy="45"
            r="6"
            fill="#3885CC"
            stroke="#1A1A1A"
            strokeWidth="2.2"
          />
          <circle cx="21" cy="45" r="2.2" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
          <polygon
            points="42,37 44,41.5 49,42 45.2,45.2 46.2,50 42,47.5 37.8,50 38.8,45.2 35,42 40,41.5"
            fill="#FFFFFF"
            stroke="#1A1A1A"
            strokeWidth="2"
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
            2. SECTION KATEGORI PRODUK HUKUM (Tata Desain "COURSES" FEB UNAIR)
           =================================================================== */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Kolom Kiri: Kartu Feature Deskripsi + Foto Bergradasi di Bawah */}
              <div className="lg:col-span-5 bg-[#F5F6F8] flex flex-col justify-between overflow-hidden relative min-h-[430px] sm:min-h-[470px]">
                <div className="p-7 sm:p-10 pb-4 relative z-20 space-y-4">
                  <h2 className="font-sans font-extrabold text-2xl sm:text-[28px] uppercase tracking-wide text-[#1B67BC]">
                    PRODUK HUKUM
                  </h2>
                  <p className="text-sm sm:text-[15px] text-[#1A1A1A] leading-relaxed">
                    Telusuri berbagai instrumen regulasi dan ketetapan hukum resmi yang disusun secara khusus bagi sivitas akademika, mulai dari Undang-Undang hingga Surat Laporan.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/produk-hukum"
                      className="inline-flex items-center gap-2.5 text-sm sm:text-[15px] font-bold text-[#1B67BC] hover:text-[#b96d41] transition-colors group"
                    >
                      <span>Telusuri Produk Hukum</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Foto Bawah dengan Efek Gradasi Halus Menyatu ke Latar Kartu */}
                <div className="relative h-60 sm:h-64 w-full mt-auto select-none pointer-events-none">
                  <Image
                    src="/images/hero-sidang-parlemen.jpg"
                    alt="Suasana Persidangan Badan Legislatif Mahasiswa FEB UNAIR"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                  {/* Gradasi Atas & Kanan agar Menyatu Halus seperti Referensi */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F5F6F8] via-[#F5F6F8]/80 to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#F5F6F8] via-[#F5F6F8]/50 to-transparent z-10" />
                </div>
              </div>

              {/* Kolom Kanan: 4 Kartu Vertikal + Baris Link Bawah */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                {/* 4 Kartu Vertikal (UU, TAP, SK, LP) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 flex-1">
                  {docTypeCards.map((card) => (
                    <Link
                      key={card.code}
                      href={`/produk-hukum/jenis/${card.slug}`}
                      className="group relative flex flex-col justify-between p-5 sm:p-6 min-h-[290px] sm:min-h-[380px] bg-gradient-to-b from-[#F8FBFF] via-[#E8F4FE] to-[#CCE7FD] border-t-[4px] border-[#EAB308] hover:border-[#b96d41] hover:from-[#EFF7FF] hover:to-[#B9DEFB] transition-all duration-300 shadow-2xs hover:shadow-md"
                    >
                      {/* Lingkaran Emblem Ikon di Kanan Atas */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 ml-auto rounded-full border-[3.5px] border-[#1B67BC] bg-[#DCEFFE] group-hover:scale-105 group-hover:border-[#0F294A] transition-all flex items-center justify-center shadow-xs">
                        {card.renderEmblem()}
                      </div>

                      {/* Judul & Jumlah di Kiri Bawah */}
                      <div className="mt-auto pt-8 space-y-1 text-left">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#3885CC]">
                          {card.count} Dokumen
                        </span>
                        <h3 className="font-sans font-bold text-base sm:text-[18px] text-[#1B67BC] group-hover:text-[#0F294A] leading-snug transition-colors">
                          {card.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Baris Link Horizontal di Bawah 4 Kartu (Gaya "IUP : International Undergraduate Programme") */}
                <Link
                  href="/panduan-penomoran"
                  className="mt-4 border-y border-slate-200 py-3.5 px-2 flex items-center justify-between group hover:bg-[#F5FAFF] transition-colors"
                >
                  <span className="font-sans font-bold text-sm sm:text-lg text-[#1B67BC] group-hover:text-[#b96d41] transition-colors">
                    PEDOMAN : Standarisasi & Format Penomoran Resmi Departemen Legislasi (49 Produk Hukum)
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#1B67BC] group-hover:text-[#b96d41] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
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

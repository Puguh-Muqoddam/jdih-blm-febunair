import React from "react";
import Link from "next/link";
import Image from "next/image";
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
      name: "Undang-Undang & Konstitusi (UU)",
      slug: "undang-undang",
      count: 4,
      boxStyle: "bg-white text-[#1B67BC] border-[#A3D0EE]",
      countStyle: "bg-[#1B67BC] text-white",
      desc: "Regulasi dasar tertinggi meliputi AD/ART BLM, Konstitusi Ormawa, dan Undang-Undang yang disahkan melalui Sidang Pleno BLM FEB UNAIR.",
    },
    {
      code: "TAP",
      name: "Ketetapan BLM (TAP)",
      slug: "ketetapan-blm",
      count: 3,
      boxStyle: "bg-[#b96d41] text-white border-[#b96d41]",
      countStyle: "bg-white text-[#b96d41]",
      desc: "Ketetapan musyawarah sidang parlemen yang mengikat secara internal maupun eksternal dalam menetapkan kebijakan strategis dan prosedur tetap.",
    },
    {
      code: "SK",
      name: "Surat Keputusan (SK)",
      slug: "surat-keputusan",
      count: 57,
      boxStyle: "bg-[#C6E8F7] text-[#1B67BC] border-[#A3D0EE]",
      countStyle: "bg-[#1B67BC] text-white",
      desc: "Keputusan administratif dan persidangan legislatif terkait agenda, tata tertib, kepengurusan ormawa, serta kebijakan eksternal berkode A dan B.",
    },
    {
      code: "LP",
      name: "Surat Laporan & BA (LP)",
      slug: "lembaran-parlemen",
      count: 6,
      boxStyle: "bg-[#3885CC] text-white border-[#A3D0EE]",
      countStyle: "bg-white text-[#1B67BC]",
      desc: "Instrumen akuntabilitas hasil pengawasan berkala, laporan investigasi komisi, rekomendasi DKPP, serta evaluasi kegiatan ormawa FEB UNAIR.",
    },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 flex flex-col">
        {/* ===================================================================
            1. HERO SECTION (Full-Bleed Photo + Left-Aligned Text, Solid Badge)
           =================================================================== */}
        <section className="relative min-h-[600px] sm:min-h-[650px] lg:min-h-[720px] flex items-end pb-14 sm:pb-20 pt-36 sm:pt-44 overflow-hidden bg-[#0F294A] text-white">
          {/* Interactive / Auto-Fading Background Photos */}
          <HeroBackdropSlider />

          {/* Left-Aligned Hero Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-4 text-left">
              <div className="inline-block rounded bg-[#b96d41] text-white px-3.5 py-1.5 text-xs font-bold tracking-wide shadow-xs">
                Portal Resmi JDIH • Parlemen Cakrasena 2026
              </div>

              <h1 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-[50px] tracking-tight leading-[1.12] text-white">
                Jaringan Dokumentasi dan Informasi Hukum.
              </h1>

              <p className="text-sm sm:text-base lg:text-[17px] text-white/95 leading-relaxed max-w-xl font-normal">
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
            2. SECTION KATEGORI PRODUK HUKUM (Kolom Kiri + Grid 2x2 Kotak Solid)
           =================================================================== */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Kolom Kiri: Kartu Feature Deskripsi + Foto di Bawah */}
              <div className="lg:col-span-4 bg-[#F5F6F8] rounded-lg border border-stone-200 flex flex-col justify-between overflow-hidden relative min-h-[420px]">
                <div className="p-7 sm:p-8 pb-4 relative z-20 space-y-3.5">
                  <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                    Klasifikasi Regulasi
                  </span>
                  <h2 className="font-sans font-extrabold text-2xl sm:text-[26px] uppercase tracking-wide text-[#1A1A1A]">
                    PRODUK HUKUM
                  </h2>
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/85 leading-relaxed">
                    Telusuri berbagai instrumen regulasi dan ketetapan hukum resmi yang disusun secara khusus bagi sivitas akademika, mulai dari Undang-Undang hingga Surat Laporan.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/produk-hukum"
                      className="inline-block rounded-md bg-[#b96d41] hover:bg-[#a35c33] text-white px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors shadow-xs"
                    >
                      Telusuri Produk Hukum
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

              {/* Kolom Kanan: Grid 2x2 Kotak Horizontal Solid (Tanpa Ikon AI) + Baris Pedoman */}
              <div className="lg:col-span-8 flex flex-col justify-between gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  {docTypeCards.map((card) => (
                    <Link
                      key={card.code}
                      href={`/produk-hukum/jenis/${card.slug}`}
                      className="group rounded-lg bg-[#1B67BC] hover:bg-[#0F294A] p-4 sm:p-5 shadow-xs hover:shadow-md transition-colors flex items-center gap-4 sm:gap-5 border border-[#A3D0EE]/30"
                    >
                      {/* Kotak Persegi Solid di Sisi Kiri (Tanpa Ikon AI, Tipografi Tegas) */}
                      <div
                        className={`w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-md border-2 ${card.boxStyle} flex flex-col items-center justify-center p-2`}
                      >
                        <span className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight leading-none">
                          {card.code}
                        </span>
                        <span
                          className={`mt-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-xs ${card.countStyle}`}
                        >
                          {card.count} Dokumen
                        </span>
                      </div>

                      {/* Teks Judul & Deskripsi di Sisi Kanan */}
                      <div className="flex-1 min-w-0 space-y-1.5 text-left">
                        <h3 className="font-sans font-extrabold text-base sm:text-lg text-white leading-snug">
                          {card.name}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal text-justify sm:text-left">
                          {card.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Baris Link Horizontal Solid di Bawah 4 Kotak */}
                <div className="rounded-lg bg-[#C6E8F7] border border-[#A3D0EE] p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="font-sans font-bold text-xs sm:text-sm text-[#1B67BC]">
                    ARSIP & PEDOMAN : Standarisasi Penomoran & Repositori PDF Resmi (70 Produk Hukum)
                  </span>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <a
                      href="https://drive.google.com/drive/folders/1f4iTq6ABdHVRXfEVd6fAZRfLmiWdeH2U?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded bg-[#b96d41] hover:bg-[#a35c33] text-white px-3.5 py-2 text-xs font-bold transition-colors text-center"
                    >
                      Folder Google Drive
                    </a>
                    <Link
                      href="/panduan-penomoran"
                      className="inline-block rounded bg-[#1B67BC] hover:bg-[#3885CC] text-white px-3.5 py-2 text-xs font-bold transition-colors text-center"
                    >
                      Buka Pedoman
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. DOKUMEN TERBARU & UNGGULAN
           =================================================================== */}
        <section className="py-14 sm:py-20 bg-[#F5F6F8] border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider mb-2">
                  Publikasi Legislatif
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                  Produk Hukum Terbaru & Terkini
                </h2>
                <p className="text-xs sm:text-sm text-[#4A5568] mt-1">
                  Enam dokumen hukum terpenting yang baru ditetapkan dan memiliki urgensi luas bagi ormawa FEB UNAIR.
                </p>
              </div>
              <Link
                href="/produk-hukum"
                className="inline-block px-5 py-2.5 rounded-md bg-[#1B67BC] text-white text-xs font-bold hover:bg-[#3885CC] transition-colors"
              >
                Buka Katalog Lengkap
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <div className="rounded-lg border border-stone-200 bg-white p-6 sm:p-10 shadow-xs space-y-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-stone-200 pb-6">
              <div className="space-y-1.5">
                <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                  Struktur & Tugas Pokok Parlemen
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                  Tri-Fungsi Parlemen & Komisi Legislasi
                </h2>
                <p className="text-xs sm:text-sm text-[#4A5568] max-w-2xl">
                  BLM FEB UNAIR menjalankan tiga pilar kedaulatan mahasiswa melalui koordinasi 3 Komisi, Departemen Legislasi, dan 15 Anggota Parlemen.
                </p>
              </div>

              <Link
                href="/tentang"
                className="inline-block px-5 py-2.5 rounded-md bg-[#1B67BC] text-white text-xs font-bold hover:bg-[#3885CC] transition-colors shrink-0"
              >
                Pelajari Profil Parlemen
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-md border border-stone-200 bg-[#F5F6F8] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#b96d41] text-white px-2.5 py-1 rounded">
                    Komisi B
                  </span>
                  <span className="text-[11px] font-bold bg-[#C6E8F7] text-[#1B67BC] px-2.5 py-1 rounded">
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

              <div className="rounded-md border border-stone-200 bg-[#F5F6F8] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#1B67BC] text-white px-2.5 py-1 rounded">
                    Komisi A
                  </span>
                  <span className="text-[11px] font-bold bg-[#C6E8F7] text-[#1B67BC] px-2.5 py-1 rounded">
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

              <div className="rounded-md border border-stone-200 bg-[#F5F6F8] p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#3885CC] text-white px-2.5 py-1 rounded">
                    Komisi C
                  </span>
                  <span className="text-[11px] font-bold bg-[#C6E8F7] text-[#1B67BC] px-2.5 py-1 rounded">
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

            {/* Sekretariat Info Bar Solid */}
            <div className="rounded-md bg-[#F5F6F8] border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#1A1A1A]">
              <div>
                <strong className="block text-[#1A1A1A] text-sm mb-0.5">
                  Sekretariat Parlemen BLM:
                </strong>
                <span className="text-[#4A5568]">
                  Graha Krida Mahasiswa (GKM) Lantai 1, Fakultas Ekonomi dan Bisnis, Universitas Airlangga, Jl. Airlangga No. 4-6, Surabaya.
                </span>
              </div>
              <Link
                href="/permohonan"
                className="inline-block rounded-md bg-[#b96d41] hover:bg-[#a35c33] text-white px-4 py-2 text-xs font-bold transition-colors shrink-0 shadow-xs"
              >
                Ajukan Permohonan Informasi
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. VISUALISASI HIERARKI HUKUM BLM
           =================================================================== */}
        <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-lg border border-stone-200 bg-white p-8 lg:p-10 shadow-xs space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-block rounded bg-[#1B67BC] text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                Edukasi & Tata Urutan
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Hierarki Tata Hukum BLM FEB UNAIR
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                Produk hukum di lingkungan BLM FEB UNAIR memiliki tata urutan kekuatan mengikat yang sistematis demi kepastian hukum ormawa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-md border border-stone-200 bg-[#F5F6F8] p-5 space-y-3">
                <span className="inline-block text-xs font-mono font-bold text-white bg-[#0F294A] px-2.5 py-1 rounded">
                  TINGKAT 1 (Tertinggi)
                </span>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Undang-Undang (UU)
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Peraturan dasar hukum tertinggi mahasiswa yang mengatur tata kelola fundamental ormawa dan pemilihan umum raya.
                </p>
              </div>

              <div className="rounded-md border border-stone-200 bg-[#F5F6F8] p-5 space-y-3">
                <span className="inline-block text-xs font-mono font-bold text-white bg-[#b96d41] px-2.5 py-1 rounded">
                  TINGKAT 2
                </span>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Ketetapan (TAP)
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Keputusan musyawarah sidang yang mengikat ke dalam dan ke luar, mengatur pedoman orientasi dan prosedur tetap.
                </p>
              </div>

              <div className="rounded-md border border-stone-200 bg-[#F5F6F8] p-5 space-y-3">
                <span className="inline-block text-xs font-mono font-bold text-white bg-[#1B67BC] px-2.5 py-1 rounded">
                  TINGKAT 3
                </span>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Surat Keputusan (SK)
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Penetapan administratif persidangan, tata tertib, ormawa, sanksi etik, dan mandat kepengurusan (kode A/B).
                </p>
              </div>

              <div className="rounded-md border border-stone-200 bg-[#F5F6F8] p-5 space-y-3">
                <span className="inline-block text-xs font-mono font-bold text-white bg-[#3885CC] px-2.5 py-1 rounded">
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
                className="inline-block rounded-md bg-[#1B67BC] hover:bg-[#3885CC] text-white px-5 py-2.5 text-xs font-bold transition-colors"
              >
                Pelajari Panduan Penomoran & Kode Sifat A/B
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

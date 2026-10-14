import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  HelpCircle,
  FileText,
  AlertCircle,
  CheckCircle2,
  Scroll,
  Hash,
  Scale,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Panduan Penomoran Produk Hukum | JDIH BLM FEB UNAIR",
  description:
    "Pedoman resmi struktur dan tata cara penomoran produk hukum BLM FEB UNAIR (UU, TAP, SK 4 digit 0000, sifat A/B, kode singkatan, dan angka Romawi).",
};

export default function PanduanPenomoranPage() {
  const romanMonths = [
    { num: 1, name: "Januari", roman: "I" },
    { num: 2, name: "Februari", roman: "II" },
    { num: 3, name: "Maret", roman: "III" },
    { num: 4, name: "April", roman: "IV" },
    { num: 5, name: "Mei", roman: "V" },
    { num: 6, name: "Juni", roman: "VI" },
    { num: 7, name: "Juli", roman: "VII" },
    { num: 8, name: "Agustus", roman: "VIII" },
    { num: 9, name: "September", roman: "IX" },
    { num: 10, name: "Oktober", roman: "X" },
    { num: 11, name: "November", roman: "XI" },
    { num: 12, name: "Desember", roman: "XII" },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#4A5568]">
            <Link href="/" className="hover:text-[#1B67BC] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#1B67BC]" />
            <span className="font-semibold text-[#1A1A1A]">Panduan Penomoran</span>
          </nav>

          {/* Header Halaman */}
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B67BC] flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5" />
              <span>Standarisasi Departemen Legislasi</span>
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A]">
              Pedoman & Format Penomoran Resmi
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568] max-w-2xl leading-relaxed">
              Panduan lengkap tata cara penomoran produk hukum legislatif mahasiswa FEB Universitas Airlangga berdasarkan Buku Panduan & Kode Departemen Legislasi.
            </p>
          </div>

          {/* Bagian 1: 4 Format Utama Produk Hukum */}
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#1A1A1A]">
              Format Penomoran Berdasarkan Jenis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kartu UU */}
              <div className="rounded-2xl border border-[#A3D0EE] bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs bg-[#1A1A1A] text-white px-2.5 py-0.5 rounded shadow-xs">
                    Undang-Undang (UU)
                  </span>
                  <span className="text-xs text-[#4A5568] font-mono">Padding: 2 Digit</span>
                </div>
                <div className="rounded-lg bg-[#C6E8F7]/30 border border-[#A3D0EE] p-3 font-mono text-xs font-bold text-[#1B67BC]">
                  [2 digit]/UU/BLMFEBUNAIR/[Bulan Romawi]/[Tahun]
                </div>
                <div className="text-xs text-[#4A5568] space-y-1">
                  <p>
                    <strong>Contoh:</strong>{" "}
                    <code className="text-[#1A1A1A] font-mono">01/UU/BLMFEBUNAIR/VIII/2026</code>
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Klausul penomoran UU ditulis tanpa tanda titik atau spasi di antara kode institusi <code>BLMFEBUNAIR</code>.
                  </p>
                </div>
              </div>

              {/* Kartu TAP */}
              <div className="rounded-2xl border border-[#A3D0EE] bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs bg-[#b96d41] text-white px-2.5 py-0.5 rounded shadow-xs">
                    Ketetapan BLM (TAP)
                  </span>
                  <span className="text-xs text-[#4A5568] font-mono">Padding: 3 Digit</span>
                </div>
                <div className="rounded-lg bg-[#C6E8F7]/30 border border-[#A3D0EE] p-3 font-mono text-xs font-bold text-[#1B67BC]">
                  [3 digit]/TAP/BLM/[Bulan Romawi]/[Tahun]
                </div>
                <div className="text-xs text-[#4A5568] space-y-1">
                  <p>
                    <strong>Contoh:</strong>{" "}
                    <code className="text-[#1A1A1A] font-mono">002/TAP/BLM/VII/2026</code>
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Ditetapkan pada Sidang Pleno BLM atau Sidang Protap dengan nomor urut berurutan tiga angka.
                  </p>
                </div>
              </div>

              {/* Kartu SK */}
              <div className="rounded-2xl border border-[#A3D0EE] bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs bg-[#1B67BC] text-white px-2.5 py-0.5 rounded shadow-xs">
                    Surat Keputusan (SK)
                  </span>
                  <span className="text-xs text-[#1B67BC] font-mono font-bold">
                    Wajib 4 Digit (0000)
                  </span>
                </div>
                <div className="rounded-lg bg-[#C6E8F7]/30 border border-[#A3D0EE] p-3 font-mono text-xs font-bold text-[#1B67BC] break-all">
                  [4 digit]/UN.3.1.4/[A|B]/[Kode Singkatan]/BLM/[Bulan Romawi]/[Tahun]
                </div>
                <div className="text-xs text-[#4A5568] space-y-1">
                  <p>
                    <strong>Contoh:</strong>{" "}
                    <code className="text-[#1A1A1A] font-mono">
                      0148/UN.3.1.4/B/SKKEPENGURUSANSEMENTARA/BLM/IX/2026
                    </code>
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Nomor Buku Departemen Legislasi yang selalu berformat 4 digit angka di depan institusi UNAIR.
                  </p>
                </div>
              </div>

              {/* Kartu LP */}
              <div className="rounded-2xl border border-[#A3D0EE] bg-white p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs bg-[#3885CC] text-white px-2.5 py-0.5 rounded shadow-xs">
                    Surat Laporan (LP)
                  </span>
                  <span className="text-xs text-[#4A5568] font-mono">Padding: 3 Digit</span>
                </div>
                <div className="rounded-lg bg-[#C6E8F7]/30 border border-[#A3D0EE] p-3 font-mono text-xs font-bold text-[#1B67BC]">
                  [3 digit]/LP/BLM/[Bulan Romawi]/[Tahun]
                </div>
                <div className="text-xs text-[#4A5568] space-y-1">
                  <p>
                    <strong>Contoh:</strong>{" "}
                    <code className="text-[#1A1A1A] font-mono">004/LP/BLM/IX/2026</code>
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Lembaran parlemen resmi hasil laporan pemeriksaan, investigasi kepengurusan, dan pengawasan.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 2: Penjelasan Khusus Standarisasi SK 4-Digit */}
          <section className="rounded-2xl border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#1B67BC] shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Penjelasan Standarisasi SK 4 Digit (0000) & Nomor Lama
                </h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Pada buku register lama bulan Juli 2026, nomor SK tercatat menggunakan 3 digit angka (misal: <code>100</code> s/d <code>108</code>). Mulai bulan Agustus dan September 2026, Departemen Legislasi menetapkan format 4 digit (misal: <code>0126</code> s/d <code>0170</code>).
                </p>
                <div className="rounded-xl bg-[#C6E8F7]/25 p-4 text-xs text-[#1A1A1A] space-y-2 border border-[#A3D0EE]">
                  <span className="font-bold text-[#1B67BC] block">
                    Kebijakan Sistem JDIH BLM:
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-[#4A5568] text-[11px]">
                    <li>
                      Seluruh SK ditampilkan secara standar dalam format 4 digit (contoh: <code>0100/UN.3.1.4/A/SKPLENOI/BLM/VII/2026</code>).
                    </li>
                    <li>
                      Nomor fisik asli (3 digit) tetap dicatat di kolom metadata <code>legacyNumber</code> dan tetap dapat dicari secara langsung di kolom pencarian portal.
                    </li>
                    <li>
                      Celah nomor buku administrasi (seperti antara 108 ke 126) terjadi karena buku BIRAD dipakai bersama untuk persuratan ormawa lainnya.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 3: Makna Sifat SK (Kode A dan B) */}
          <section className="rounded-2xl border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#1A1A1A]">
              Makna Kode Sifat SK (A dan B)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-[#A3D0EE] bg-[#C6E8F7]/15 p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#1B67BC] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    A
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                    Sifat Internal BLM (Code A)
                  </h3>
                </div>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Mencakup persidangan internal, tata tertib persidangan, susunan agenda acara, pemberian surat peringatan (SP), pengunduran diri personalia, dan pemberhentian anggota.
                </p>
              </div>

              <div className="rounded-xl border border-[#A3D0EE] bg-[#C6E8F7]/15 p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#b96d41] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    B
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                    Sifat Eksternal Organisasi (Code B)
                  </h3>
                </div>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Mencakup kebijakan kemahasiswaan fakultas, regulasi PEMIRA, pengesahan kepengurusan caretaker LPPM SEKTOR, rekomendasi penyelenggara pemilu, dan peringatan kepada HIMA.
                </p>
              </div>
            </div>
          </section>

          {/* Bagian 4: Tabel Angka Romawi Bulan */}
          <section className="rounded-2xl border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#1A1A1A]">
              Daftar Angka Romawi Bulan Penetapan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {romanMonths.map((m) => (
                <div
                  key={m.num}
                  className="rounded-xl border border-[#A3D0EE] bg-[#C6E8F7]/15 p-3 text-center space-y-0.5"
                >
                  <span className="font-mono text-base font-bold text-[#1B67BC] block">
                    {m.roman}
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A1A] block">{m.name}</span>
                  <span className="text-[10px] text-[#4A5568] block">Bulan {m.num}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

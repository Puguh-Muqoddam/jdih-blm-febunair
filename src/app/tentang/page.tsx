import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  ChevronRight,
  Shield,
  Eye,
  CheckCircle2,
  Users,
  MapPin,
  Mail,
  Building2,
  BookOpen,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Tentang JDIH BLM | JDIH BLM FEB UNAIR",
  description:
    "Profil, visi, misi, dan dasar hukum pembentukan Jaringan Dokumentasi dan Informasi Hukum Badan Legislatif Mahasiswa FEB Universitas Airlangga.",
};

export default function TentangPage() {
  const commissions = [
    {
      code: "Komisi A",
      name: "Bidang Hukum, Peraturan & Tata Kelola",
      desc: "Bertanggung jawab atas penyusunan draf undang-undang, harmonisasi regulasi internal ormawa, dan kajian yuridis produk hukum.",
    },
    {
      code: "Komisi B",
      name: "Bidang Aspirasi & Advokasi Mahasiswa",
      desc: "Menampung, mengolah, dan menyalurkan aspirasi mahasiswa kepada pihak Dekanat, pimpinan fakultas, serta Badan Eksekutif Mahasiswa.",
    },
    {
      code: "Komisi C",
      name: "Bidang Pengawasan & Akuntabilitas Keuangan",
      desc: "Melakukan fungsi pengawasan berkala terhadap realisasi program kerja, transparansi anggaran ormawa, dan pelaksanaan kegiatan kemahasiswaan.",
    },
    {
      code: "Badan Legislasi",
      name: "Badan Legislasi (Baleg) & BURT",
      desc: "Mengelola Program Legislasi Mahasiswa (Prolegma) tahunan serta mengurus administrasi kerumahtanggaan parlemen.",
    },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B5A48]">
            <Link href="/" className="hover:text-[#3E2C1C] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#80691d]" />
            <span className="font-semibold text-[#3E2C1C]">Tentang JDIH BLM</span>
          </nav>

          {/* Header Profil */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#80691d] flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span>Profil Lembaga Parlemen</span>
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#3E2C1C]">
              Jaringan Dokumentasi & Informasi Hukum BLM FEB UNAIR
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A48] max-w-3xl leading-relaxed">
              Portal pangkalan data resmi yang dikembangkan oleh Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga untuk menjamin keterbukaan informasi hukum yang akuntabel dan mudah diakses.
            </p>
          </div>

          {/* Visi dan Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#80691d]" />
                <h2 className="font-serif font-bold text-lg text-[#3E2C1C]">Visi JDIH BLM</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6B5A48] leading-relaxed">
                Menjadi pusat dokumentasi dan informasi hukum kemahasiswaan yang modern, transparan, terintegrasi, dan terpercaya guna mendukung tata kelola organisasi kemahasiswaan (*Good Student Governance*) di lingkungan FEB Universitas Airlangga.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#80691d]" />
                <h2 className="font-serif font-bold text-lg text-[#3E2C1C]">Misi JDIH BLM</h2>
              </div>
              <ul className="text-xs sm:text-sm text-[#6B5A48] space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Mengarsipkan dan mempublikasikan seluruh produk hukum (UU, TAP, SK, LP) secara digital dan terbuka.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Memudahkan penelusuran peraturan mahasiswa melalui sistem pencarian cerdas dan katalog berstandar JDIHN.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Meningkatkan literasi dan kesadaran hukum sivitas akademika dalam berorganisasi di lingkungan kampus.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Struktur Parlemen BLM */}
          <section className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-center gap-2 border-b border-[#F2EBDA] pb-3">
              <Users className="w-5 h-5 text-[#80691d]" />
              <h2 className="font-serif font-bold text-lg text-[#3E2C1C]">
                Struktur Parlemen Badan Legislatif Mahasiswa
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {commissions.map((comm) => (
                <div
                  key={comm.code}
                  className="rounded-xl border border-[#E8DEC4] bg-[#FFFDF7] p-5 space-y-1.5"
                >
                  <span className="font-mono text-xs font-bold text-[#80691d] block">
                    {comm.code}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#3E2C1C]">
                    {comm.name}
                  </h3>
                  <p className="text-xs text-[#6B5A48] leading-relaxed">
                    {comm.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Dasar Hukum Pembentukan */}
          <section className="rounded-2xl border border-[#E8DEC4] bg-white p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F2EBDA] pb-3">
              <BookOpen className="w-5 h-5 text-[#80691d]" />
              <h2 className="font-serif font-bold text-lg text-[#3E2C1C]">
                Dasar Hukum & Prinsip Penyelenggaraan
              </h2>
            </div>
            <div className="text-xs text-[#6B5A48] space-y-2 leading-relaxed">
              <p>
                Pengelolaan dan pengembangan portal JDIH BLM FEB UNAIR berlandaskan pada prinsip transparansi demokrasi kampus dan ketentuan hukum internal organisasi mahasiswa:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#3E2C1C]">
                <li>Undang-Undang Badan Legislatif Mahasiswa FEB UNAIR tentang Tata Kelola Lembaga Kemahasiswaan.</li>
                <li>Prinsip Keterbukaan Informasi Publik di Lingkungan Sivitas Akademika Universitas Airlangga.</li>
                <li>Standarisasi Penomoran Resmi Biro Administrasi BLM FEB UNAIR Periode 2026.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

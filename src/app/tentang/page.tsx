import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  Search,
  MessageSquare,
  FileText,
  Award,
  Sparkles,
  Compass,
  Phone,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Tentang BLM & JDIH | JDIH BLM FEB UNAIR",
  description:
    "Profil lengkap Badan Legislatif Mahasiswa (BLM) FEB Universitas Airlangga, Parlemen Cakrasena 2026, fungsi legislasi, pengawasan, komisi-komisi, filosofi logo, dan sekretariat.",
};

export default function TentangPage() {
  const functions = [
    {
      title: "Fungsi Legislasi",
      code: "Komisi B",
      icon: FileText,
      desc: "Merumuskan, merancang, menelaah naskah akademik, dan menetapkan aturan atau kebijakan yang mengikat organisasi kemahasiswaan di lingkungan FEB UNAIR (Undang-Undang, TAP, Surat Keputusan, dan Pedoman Penomoran Resmi).",
    },
    {
      title: "Fungsi Pengawasan",
      code: "Komisi A",
      icon: Search,
      desc: "Mengawasi kinerja Badan Eksekutif Mahasiswa (BEM) FEB UNAIR serta seluruh ORMAWA, memastikan setiap program kerja berjalan transparan, akuntabel, dan sesuai dengan amanah konstitusi mahasiswa.",
    },
    {
      title: "Fungsi Aspirasi & Advokasi",
      code: "Komisi C",
      icon: MessageSquare,
      desc: "Menjembatani aspirasi, kritik, keluhan, serta saran dari seluruh mahasiswa kepada pihak Dekanat, pimpinan fakultas, maupun lembaga terkait melalui Rapat Dengar Pendapat (RDP) dan Bank Aspirasi.",
    },
  ];

  const commissions = [
    {
      code: "Komisi A",
      name: "Komisi Pengawasan",
      role: "Pengawasan BEM & Akuntabilitas Ormawa",
      desc: "Bertanggung jawab atas pengawasan pelaksanaan program kerja BEM FEB UNAIR, verifikasi laporan pertanggungjawaban (LPJ), penegakan tata tertib ormawa, dan pemberian rekomendasi sanksi atas pelanggaran.",
    },
    {
      code: "Komisi B",
      name: "Komisi Legislasi",
      role: "Pengampu Utama Portal JDIH & Regulasi",
      desc: "Bertanggung jawab atas perancangan draf Undang-Undang (UU), Ketetapan (TAP), Surat Keputusan (SK), harmonisasi hukum, inventarisasi peraturan, dan pemeliharaan pangkalan data JDIH BLM FEB UNAIR.",
    },
    {
      code: "Komisi C",
      name: "Komisi Aspirasi & Advokasi",
      role: "Jembatan Suara Mahasiswa & Kesejahteraan",
      desc: "Bertanggung jawab atas pengelolaan Bank Aspirasi, penyelenggaraan Rapat Dengar Pendapat (RDP), advokasi fasilitas perkuliahan, transparansi biaya pendidikan, dan isu kesejahteraan mahasiswa FEB UNAIR.",
    },
    {
      code: "LEGISLASI",
      name: "Departemen Legislasi",
      role: "Tata Kelola Registrasi & Pengampu Portal JDIH",
      desc: "Mengelola penomoran resmi seluruh produk hukum, perancangan draf peraturan, pengarsipan berkas fisik dan digital di Graha Krida Mahasiswa (GKM) Lantai 1, serta pemeliharaan pangkalan data JDIH BLM FEB UNAIR.",
    },
    {
      code: "KEUANGAN",
      name: "Departemen Keuangan",
      role: "Pengelolaan & Transparansi Anggaran",
      desc: "Mengelola anggaran operasional internal parlemen, alokasi dana persidangan, serta penyusunan laporan keuangan berkala yang akuntabel.",
    },
  ];

  const logoElements = [
    {
      name: "Naga",
      meaning: "Kekuatan & Penjaga Keadilan",
      desc: "Melambangkan kekuatan penjaga konstitusi dan keadilan, serta keteguhan BLM dalam menjalankan fungsi legislasi dan pengawasan secara profesional dan berintegritas.",
    },
    {
      name: "Timbangan",
      meaning: "Keseimbangan & Objektivitas",
      desc: "Melambangkan objektivitas dan keseimbangan BLM dalam menimbang aspirasi dan kebijakan secara adil serta berpihak pada kepentingan mahasiswa.",
    },
    {
      name: "Perisai",
      meaning: "Perlindungan & Tanggung Jawab",
      desc: "Melambangkan perlindungan hak mahasiswa dan tanggung jawab BLM sebagai benteng demokrasi kampus yang kokoh.",
    },
    {
      name: "Tombak",
      meaning: "Ketegasan & Daya Dorong",
      desc: "Melambangkan ketegasan, keberanian bersuara, dan dorongan perubahan progresif dalam fungsi advokasi dan pengawasan BLM.",
    },
    {
      name: "Lingkaran",
      meaning: "Kesatuan & Keberlanjutan",
      desc: "Melambangkan kesatuan, kesinambungan, dan sinergi antara mahasiswa, ORMAWA, dan pihak fakultas dalam iklim demokrasi kampus yang harmonis.",
    },
  ];

  const logoColors = [
    {
      name: "Biru Tua / Navy",
      hex: "#1b2a3a",
      title: "Intelektualitas, Profesionalisme, dan Kepercayaan",
      desc: "Menegaskan citra parlemen mahasiswa yang profesional, berintegritas tinggi, dan senantiasa dapat dipercaya oleh sivitas akademika.",
    },
    {
      name: "Emas / Kuning Keemasan",
      hex: "#cf9a3e",
      title: "Keadilan, Kehormatan, dan Keunggulan",
      desc: "Mencerminkan nilai keadilan yang menjadi poros Cakra, serta objektivitas murni dalam menjalankan fungsi peradilan etika dan pengawasan.",
    },
    {
      name: "Putih / Abu-abu Cerah",
      hex: "#e2e8f0",
      title: "Transparansi dan Integritas Terbuka",
      desc: "Menonjolkan prinsip transparansi tanpa kompromi dalam menjalankan tugas serta membangun komunikasi dua arah yang berkelanjutan.",
    },
  ];

  const venues = [
    {
      name: "Sekretariat Parlemen (GKM Lt. 1)",
      location: "Graha Krida Mahasiswa Lantai 1, FEB UNAIR",
      desc: "Pusat pelayanan administrasi persuratan, konsultasi aspirasi tatap muka, dan penyerahan permohonan salinan naskah hukum fisik.",
      badge: "Kantor Utama",
    },
    {
      name: "Ruang Sidang Parlemen (Gedung A)",
      location: "Gedung A, Fakultas Ekonomi dan Bisnis UNAIR",
      desc: "Tempat penyelenggaraan Sidang Pleno BLM, Sidang Prosedur Tetap (Protap), pengesahan Undang-Undang, dan penetapan Ketetapan resmi.",
      badge: "Ruang Sidang",
    },
    {
      name: "Gedung PHB (Pusat Himpunan & Badan)",
      location: "Area Gedung PHB, FEB UNAIR",
      desc: "Gedung sekretariat bersama ormawa, area koordinasi lintas himpunan, dan lokasi resmi papan informasi publik produk hukum.",
      badge: "Koordinasi Ormawa",
    },
    {
      name: "Aula Fadjar Notonegoro (AFN)",
      location: "Lantai 2 Gedung FEB UNAIR",
      desc: "Aula utama pelaksanaan Rapat Dengar Pendapat Umum (RDPU), Kongres Mahasiswa, dan sosialisasi akbar produk hukum fakultas.",
      badge: "Forum Terbuka",
    },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#4A5568]">
            <Link href="/" className="hover:text-[#1B67BC] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#1B67BC]" />
            <span className="font-semibold text-[#1A1A1A]">Tentang BLM & JDIH</span>
          </nav>

          {/* ===================================================================
              1. HERO PROFIL & LOGO DUAL
             =================================================================== */}
          <section className="rounded-3xl border border-[#A3D0EE] bg-white p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex items-center gap-4 shrink-0">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-2 shadow-md border-2 border-[#1B67BC] overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/blm_logo.png"
                    alt="Logo Resmi BLM FEB UNAIR"
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-2 shadow-md border-2 border-[#3885CC] overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/parliament_logo.png"
                    alt="Logo Parlemen Cakrasena"
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-3 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#A3D0EE] bg-[#C6E8F7]/50 px-3.5 py-1 text-xs font-bold text-[#1B67BC]">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Parlemen Cakrasena • Periode 2026</span>
                </div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] leading-tight">
                  Badan Legislatif Mahasiswa FEB UNAIR
                </h1>
                <p className="text-sm sm:text-base text-[#b96d41] font-serif italic font-semibold">
                  &quot;Menyatukan Aspirasi, Menegakkan Demokrasi&quot;
                </p>
                <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed max-w-3xl">
                  Badan Legislatif Mahasiswa (BLM) adalah lembaga legislatif representasi tertinggi mahasiswa di tingkat Fakultas Ekonomi dan Bisnis Universitas Airlangga yang memegang teguh amanah penegakan konstitusi, pengawasan eksekutif, dan advokasi hak-hak mahasiswa.
                </p>
              </div>
            </div>

            {/* Quote Komitmen */}
            <div className="rounded-2xl border-l-4 border-[#1B67BC] bg-[#C6E8F7]/25 p-5 sm:p-6 text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
              <p className="font-medium italic">
                &quot;BLM FEB UNAIR hadir sebagai ruang representasi mahasiswa yang berkomitmen untuk menampung partisipasi aktif dalam pengawasan, penyaluran aspirasi, serta advokasi yang sungguh-sungguh berpihak pada kebutuhan mahasiswa FEB UNAIR dengan menjunjung tinggi nilai humanis, profesional, dan berwibawa.&quot;
              </p>
            </div>
          </section>

          {/* ===================================================================
              2. TRI-FUNGSI POKOK BLM FEB UNAIR
             =================================================================== */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B67BC]">
                Landasan Kerja Parlemen
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Tri-Fungsi Pokok BLM FEB UNAIR
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                Tiga pilar utama dalam menjalankan kedaulatan mahasiswa di lingkungan Fakultas Ekonomi dan Bisnis Universitas Airlangga.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {functions.map((fn) => {
                const IconComponent = fn.icon;
                return (
                  <div
                    key={fn.title}
                    className="rounded-2xl border border-[#A3D0EE] bg-white p-6 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#C6E8F7]/40 border border-[#A3D0EE] flex items-center justify-center text-[#1B67BC] shadow-xs">
                        <IconComponent className="w-6 h-6 text-[#1B67BC]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
                          {fn.title}
                        </h3>
                        <span className="text-[11px] font-bold bg-[#b96d41] text-white px-2 py-0.5 rounded shadow-xs">
                          {fn.code}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                        {fn.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ===================================================================
              3. VISI & MISI PARLEMEN CAKRASENA
             =================================================================== */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#1B67BC] to-[#124b8a] text-white p-6 sm:p-8 shadow-md space-y-4 border border-[#3885CC] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6E8F7]">
                  <Compass className="w-4 h-4" />
                  <span>Visi Parlemen Cakrasena 2026</span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white leading-snug">
                  Terwujudnya Lembaga Representasi Mahasiswa yang Profesional, Transparan, dan Berintegritas
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                  &quot;Terwujudnya Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga yang profesional, transparan, dan berintegritas sebagai lembaga representasi mahasiswa dalam menjalankan fungsi legislasi, pengawasan, aspirasi, dan advokasi.&quot;
                </p>
              </div>
              <div className="pt-4 border-t border-white/20 text-xs text-[#C6E8F7] font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A3D0EE]" />
                <span>Poros Keadilan & Demokrasi Kampus FEB UNAIR</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B67BC]">
                <Award className="w-4 h-4" />
                <span>Misi Parlemen Cakrasena 2026</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">
                Empat Pilar Strategis Pelaksanaan
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Profesionalisme Legislatif:</strong> Menjalankan fungsi legislasi, pengawasan, aspirasi & advokasi secara profesional serta bertanggung jawab kepada mahasiswa.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Responsif & Progresif:</strong> Menjadi wadah utama penyaluran aspirasi mahasiswa yang cepat tanggap, terbuka, dan solutif.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Kemitraan Kolaboratif:</strong> Menciptakan hubungan sinergis dengan ORMAWA dan Dekanat melalui komunikasi dua arah, musyawarah, serta keterbukaan laporan kinerja.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Digitalisasi Portal JDIH:</strong> Mengoptimalkan media digital sebagai pusat dokumentasi hukum, edukasi tata tertib, dan informasi resmi yang modern.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* ===================================================================
              4. FILOSOFI NAMA & ELEMEN LOGO CAKRASENA
             =================================================================== */}
          <section className="rounded-3xl border border-[#A3D0EE] bg-white p-6 sm:p-10 shadow-sm space-y-10">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B67BC]">
                Makna Lambang & Identitas
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Filosofi Lambang Cakrasena
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                Nama <strong>Cakrasena</strong> berasal dari kata <em>Cakra</em> (pusat kendali, keadilan, dan keseimbangan) serta <em>Sena</em> (barisan penjaga atau kekuatan terorganisir). Cakrasena dimaknai sebagai barisan legislatif yang menjadi poros keadilan demokrasi kampus.
              </p>
            </div>

            {/* 5 Elemen Logo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {logoElements.map((el) => (
                <div
                  key={el.name}
                  className="rounded-2xl border border-[#A3D0EE] bg-[#C6E8F7]/20 p-5 space-y-2 text-center hover:border-[#1B67BC] hover:-translate-y-1 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1B67BC] text-white mx-auto flex items-center justify-center font-bold text-sm shadow-xs">
                    {el.name.charAt(0)}
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                    {el.name}
                  </h3>
                  <span className="text-[11px] font-bold text-[#1B67BC] block">
                    {el.meaning}
                  </span>
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    {el.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 3 Warna Logo */}
            <div className="pt-6 border-t border-[#A3D0EE]/40 space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A] text-center">
                Makna Tri-Warna Lambang
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {logoColors.map((color) => (
                  <div
                    key={color.name}
                    className="flex rounded-xl border border-[#A3D0EE] bg-white overflow-hidden shadow-xs"
                  >
                    <div
                      className="w-4 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">
                        {color.name}
                      </h4>
                      <p className="text-[11px] font-bold text-[#1B67BC]">
                        {color.title}
                      </p>
                      <p className="text-xs text-[#4A5568] leading-relaxed">
                        {color.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===================================================================
              5. STRUKTUR PARLEMEN & KOMISI
             =================================================================== */}
          <section className="rounded-3xl border border-[#A3D0EE] bg-white p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#1B67BC]" />
                <h2 className="font-serif font-bold text-2xl text-[#1A1A1A]">
                  Struktur Organisasi & Komisi Parlemen
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#4A5568] max-w-3xl leading-relaxed">
                Struktur parlemen BLM FEB UNAIR terdiri dari Pimpinan (Ketua Umum, Sekretaris Jenderal, Bendahara Umum), 3 Komisi fungsional, Departemen Legislasi, Departemen Keuangan, dan jajaran pendukung teknis dengan total representasi 15 Anggota Parlemen (7 Independen PEMIRA + 8 Delegasi HIMA Prodi).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {commissions.map((comm) => (
                <div
                  key={comm.code}
                  className="rounded-2xl border border-[#A3D0EE] bg-[#C6E8F7]/15 p-5 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white bg-[#1B67BC] px-2 py-0.5 rounded shadow-xs">
                        {comm.code}
                      </span>
                      <span className="text-[11px] text-[#4A5568] font-medium">
                        BLM 2026
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                      {comm.name}
                    </h3>
                    <p className="text-[11px] font-bold text-[#b96d41]">
                      {comm.role}
                    </p>
                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {comm.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Komposisi Keanggotaan */}
            <div className="rounded-2xl bg-[#C6E8F7]/30 border border-[#A3D0EE] p-5 sm:p-6 space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#1B67BC]" />
                <span>Mekanisme Keterwakilan Anggota Parlemen</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#4A5568]">
                <div className="bg-white p-3.5 rounded-xl border border-[#A3D0EE]">
                  <strong className="text-[#1A1A1A] block mb-1">7 Anggota Independen</strong>
                  Terpilih secara demokratis melalui Pemilihan Raya Mahasiswa (PEMIRA) tingkat fakultas.
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#A3D0EE]">
                  <strong className="text-[#1A1A1A] block mb-1">8 Anggota Delegasi</strong>
                  Perwakilan delegasi resmi dari 4 HIMA Departemen (Manajemen, Akuntansi, Ekonomi Pembangunan, Ekonomi Islam).
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#A3D0EE]">
                  <strong className="text-[#1A1A1A] block mb-1">Staf Ahli Parlemen</strong>
                  Hasil seleksi terbuka (Open Recruitment) mahasiswa FEB UNAIR untuk memperkuat fungsi teknis komisi.
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================
              6. FASILITAS & TEMPAT PERSIDANGAN
             =================================================================== */}
          <section className="rounded-3xl border border-[#A3D0EE] bg-white p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#1B67BC]" />
                <h2 className="font-serif font-bold text-2xl text-[#1A1A1A]">
                  Sekretariat & Tempat Penyelenggaraan
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#4A5568] max-w-3xl leading-relaxed">
                Fasilitas dan tempat persidangan resmi yang digunakan dalam seluruh rangkaian kegiatan legislasi, pengawasan, dan advokasi BLM FEB UNAIR.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {venues.map((venue) => (
                <div
                  key={venue.name}
                  className="rounded-2xl border border-[#A3D0EE] bg-[#C6E8F7]/15 p-5 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#b96d41] px-2 py-0.5 rounded shadow-xs inline-block">
                      {venue.badge}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                      {venue.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#1B67BC] flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1B67BC]" />
                      <span>{venue.location}</span>
                    </p>
                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {venue.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================
              7. KONTAK & NARAHUBUNG RESMI
             =================================================================== */}
          <section className="rounded-3xl border border-[#A3D0EE]/30 bg-[#0F294A] text-white p-6 sm:p-10 shadow-md space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3D0EE]">
                Komunikasi Resmi
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                Hubungi Sekretariat & Narahubung Parlemen
              </h2>
              <p className="text-xs sm:text-sm text-[#C6E8F7]/85 max-w-2xl leading-relaxed">
                Mahasiswa, ormawa, atau instansi yang memerlukan koordinasi resmi, salinan fisik berkas, atau audiensi persidangan dapat menghubungi kami melalui saluran resmi berikut.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="rounded-xl bg-white/10 p-4 border border-white/15 space-y-1">
                <span className="text-[11px] font-bold text-[#A3D0EE] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sekretariat Fisik</span>
                </span>
                <p className="text-xs text-white/90 leading-relaxed">
                  Graha Krida Mahasiswa (GKM) Lantai 1, Fakultas Ekonomi dan Bisnis, Universitas Airlangga, Jl. Airlangga No. 4-6, Surabaya.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4 border border-white/15 space-y-1">
                <span className="text-[11px] font-bold text-[#A3D0EE] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Surel Resmi</span>
                </span>
                <a
                  href="mailto:blmfebunair2026@gmail.com"
                  className="text-xs text-[#C6E8F7] hover:text-white transition-colors block underline"
                >
                  blmfebunair2026@gmail.com
                </a>
              </div>

              <div className="rounded-xl bg-white/10 p-4 border border-white/15 space-y-1">
                <span className="text-[11px] font-bold text-[#A3D0EE] flex items-center gap-1.5">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </span>
                <a
                  href="https://www.instagram.com/blmfebunair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C6E8F7] hover:text-white transition-colors block underline"
                >
                  @blmfebunair
                </a>
              </div>

              <div className="rounded-xl bg-white/10 p-4 border border-white/15 space-y-1">
                <span className="text-[11px] font-bold text-[#A3D0EE] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Narahubung</span>
                </span>
                <div className="text-xs space-y-0.5">
                  <div>
                    Puguh:{" "}
                    <a
                      href="https://wa.me/6281333185886"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b96d41] hover:underline font-semibold"
                    >
                      0813-3318-5886
                    </a>
                  </div>
                  <div>
                    Rafly:{" "}
                    <a
                      href="https://wa.me/628155010561"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b96d41] hover:underline font-semibold"
                    >
                      0815-5010-561
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

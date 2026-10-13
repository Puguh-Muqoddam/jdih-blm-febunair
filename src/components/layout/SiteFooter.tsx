import React from "react";
import Link from "next/link";
import { Scale, MapPin, Mail, Globe, Shield, ExternalLink } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#E8DEC4] bg-[#3E2C1C] text-[#FFFDF7] text-sm">
      {/* Decorative Gold Border */}
      <div className="h-1 bg-gradient-to-r from-[#d4af38] via-[#b96d41] to-[#80691d]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Kolom 1: Profil & Identitas */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFFDF7] flex items-center justify-center text-[#3E2C1C] shadow-md border border-[#d4af38]">
                <Scale className="w-5 h-5 text-[#80691d]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#FFFDF7] leading-tight">
                  JDIH BLM FEB UNAIR
                </h3>
                <p className="text-xs text-[#d4af38] font-medium tracking-wide">
                  Fakultas Ekonomi dan Bisnis
                </p>
              </div>
            </div>
            <p className="text-xs text-[#FFFDF7]/80 leading-relaxed">
              Portal pangkalan data resmi untuk publikasi, dokumentasi, dan penelusuran seluruh peraturan, ketetapan, keputusan, dan laporan parlemen mahasiswa di lingkungan Fakultas Ekonomi dan Bisnis Universitas Airlangga.
            </p>
            <div className="pt-2 text-xs text-[#FFFDF7]/60 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af38]" />
              <span>Transparan • Akuntabel • Terbuka</span>
            </div>
          </div>

          {/* Kolom 2: Struktur Lembaga BLM */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#d4af38] tracking-wider uppercase">
              Struktur Legislatif
            </h4>
            <ul className="space-y-2 text-xs text-[#FFFDF7]/80">
              <li className="flex items-start gap-2">
                <span className="text-[#d4af38] font-bold">•</span>
                <span>Komisi A — Bidang Hukum, Peraturan & Tata Kelola</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af38] font-bold">•</span>
                <span>Komisi B — Bidang Aspirasi & Advokasi Mahasiswa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af38] font-bold">•</span>
                <span>Komisi C — Bidang Pengawasan Program Kerja & Keuangan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af38] font-bold">•</span>
                <span>Badan Legislasi (Baleg) & BURT</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af38] font-bold">•</span>
                <span>Biro Administrasi (BIRAD)</span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Cepat */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#d4af38] tracking-wider uppercase">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-xs text-[#FFFDF7]/80">
              <li>
                <Link
                  href="/produk-hukum"
                  className="hover:text-[#d4af38] transition-colors inline-block"
                >
                  Katalog Seluruh Produk Hukum
                </Link>
              </li>
              <li>
                <Link
                  href="/produk-hukum/jenis/undang-undang"
                  className="hover:text-[#d4af38] transition-colors inline-block"
                >
                  Undang-Undang (UU PEMIRA)
                </Link>
              </li>
              <li>
                <Link
                  href="/produk-hukum/jenis/ketetapan-blm"
                  className="hover:text-[#d4af38] transition-colors inline-block"
                >
                  Ketetapan BLM (TAP)
                </Link>
              </li>
              <li>
                <Link
                  href="/panduan-penomoran"
                  className="hover:text-[#d4af38] transition-colors inline-block"
                >
                  Pedoman & Format Nomor Resmi
                </Link>
              </li>
              <li>
                <Link
                  href="/statistik"
                  className="hover:text-[#d4af38] transition-colors inline-block"
                >
                  Statistik & Distribusi Dokumen
                </Link>
              </li>
              <li>
                <Link
                  href="/permohonan"
                  className="hover:text-[#d4af38] transition-colors inline-block text-[#d4af38] font-medium"
                >
                  Permohonan Salinan Dokumen
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-[#d4af38] transition-colors inline-block text-[#FFFDF7]/50"
                >
                  Masuk Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Alamat & Kontak */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#d4af38] tracking-wider uppercase">
              Sekretariat & Kontak
            </h4>
            <div className="space-y-2.5 text-xs text-[#FFFDF7]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af38] shrink-0 mt-0.5" />
                <span>
                  Gedung Ormawa Lt. 2, Fakultas Ekonomi dan Bisnis, Universitas Airlangga. Kampus B, Jl. Airlangga No. 4-6, Surabaya, Jawa Timur 60286
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af38] shrink-0" />
                <a
                  href="mailto:blm@feb.unair.ac.id"
                  className="hover:text-[#d4af38] transition-colors"
                >
                  blm@feb.unair.ac.id
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#d4af38] shrink-0" />
                <a
                  href="https://feb.unair.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af38] transition-colors flex items-center gap-1"
                >
                  <span>Portal FEB UNAIR</span>
                  <ExternalLink className="w-3 h-3 text-[#d4af38]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Hak Cipta & Lisensi */}
        <div className="mt-12 pt-6 border-t border-[#FFFDF7]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFFDF7]/60 gap-3">
          <p>
            © {new Date().getFullYear()} Badan Legislatif Mahasiswa FEB Universitas Airlangga. Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-3">
            <span>Dikelola oleh Biro Administrasi & Baleg BLM</span>
            <span>•</span>
            <span className="text-[#d4af38]">v1.0 Produksi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

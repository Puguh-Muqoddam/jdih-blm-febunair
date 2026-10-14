import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  MapPin,
  Mail,
  Globe,
  Shield,
  ExternalLink,
  MessageCircle,
  Phone,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#A3D0EE]/30 bg-[#1A1A1A] text-stone-200 text-sm">
      {/* Decorative Blue-Terracotta Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-[#1B67BC] via-[#3885CC] to-[#b96d41]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Kolom 1: Profil & Identitas */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <div className="w-10 h-10 rounded-full bg-white p-1 shadow-md border border-[#A3D0EE] overflow-hidden flex items-center justify-center shrink-0 z-10">
                  <Image
                    src="/images/blm_logo.png"
                    alt="Logo BLM FEB UNAIR"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-white p-1 shadow-md border border-[#A3D0EE] overflow-hidden flex items-center justify-center shrink-0">
                  <Image
                    src="/images/parliament_logo.png"
                    alt="Logo Kabinet Cakrasena"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white leading-tight">
                  JDIH BLM FEB UNAIR
                </h3>
                <p className="text-xs text-[#A3D0EE] font-medium tracking-wide">
                  Kabinet Cakrasena 2026
                </p>
              </div>
            </div>
            <p className="text-xs text-[#C6E8F7]/85 leading-relaxed">
              Portal pangkalan data resmi untuk publikasi, dokumentasi, dan penelusuran seluruh produk hukum di lingkungan Fakultas Ekonomi dan Bisnis Universitas Airlangga.
            </p>
            <p className="text-xs text-[#b96d41] italic font-serif">
              &quot;Menyatukan Aspirasi, Menegakkan Demokrasi&quot;
            </p>
            <div className="pt-2 text-xs text-[#C6E8F7]/70 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#A3D0EE]" />
              <span>Transparan • Akuntabel • Terbuka</span>
            </div>
          </div>

          {/* Kolom 2: Struktur Lembaga BLM */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#A3D0EE] tracking-wider uppercase">
              Komisi & Lembaga
            </h4>
            <ul className="space-y-2 text-xs text-[#C6E8F7]/85">
              <li className="flex items-start gap-2">
                <span className="text-[#b96d41] font-bold">•</span>
                <span><strong>Komisi A</strong>: Fungsi Pengawasan (Pengawasan BEM & Ormawa)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b96d41] font-bold">•</span>
                <span><strong>Komisi B</strong>: Fungsi Legislasi (Perumusan Produk Hukum & UU)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b96d41] font-bold">•</span>
                <span><strong>Komisi C</strong>: Fungsi Aspirasi & Advokasi (RDP & Bank Aspirasi)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b96d41] font-bold">•</span>
                <span><strong>Biro Administrasi (BIRAD)</strong> & Biro Keuangan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#b96d41] font-bold">•</span>
                <span>7 Anggota Independen PEMIRA & 8 Anggota Delegasi HIMA</span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Tautan Cepat */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#A3D0EE] tracking-wider uppercase">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-xs text-[#C6E8F7]/85">
              <li>
                <Link
                  href="/produk-hukum"
                  className="hover:text-white transition-colors inline-block"
                >
                  Katalog Seluruh Produk Hukum
                </Link>
              </li>
              <li>
                <Link
                  href="/produk-hukum/jenis/undang-undang"
                  className="hover:text-white transition-colors inline-block"
                >
                  Undang-Undang (UU PEMIRA)
                </Link>
              </li>
              <li>
                <Link
                  href="/produk-hukum/jenis/ketetapan-blm"
                  className="hover:text-white transition-colors inline-block"
                >
                  Ketetapan BLM (TAP)
                </Link>
              </li>
              <li>
                <Link
                  href="/panduan-penomoran"
                  className="hover:text-white transition-colors inline-block"
                >
                  Pedoman & Format Nomor Resmi
                </Link>
              </li>
              <li>
                <Link
                  href="/statistik"
                  className="hover:text-white transition-colors inline-block"
                >
                  Statistik & Distribusi Dokumen
                </Link>
              </li>
              <li>
                <Link
                  href="/permohonan"
                  className="hover:text-white transition-colors inline-block text-[#b96d41] font-semibold"
                >
                  Permohonan Salinan Dokumen
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-[#A3D0EE] transition-colors inline-block text-white/50"
                >
                  Masuk Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Alamat & Kontak */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-sm text-[#A3D0EE] tracking-wider uppercase">
              Sekretariat & Narahubung
            </h4>
            <div className="space-y-2.5 text-xs text-[#C6E8F7]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A3D0EE] shrink-0 mt-0.5" />
                <span>
                  Graha Krida Mahasiswa (GKM) Lantai 1, Fakultas Ekonomi dan Bisnis, Universitas Airlangga, Jl. Airlangga No. 4-6, Surabaya
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A3D0EE] shrink-0" />
                <a
                  href="mailto:blmfebunair2026@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  blmfebunair2026@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#A3D0EE] shrink-0" />
                <a
                  href="https://www.instagram.com/blmfebunair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>@blmfebunair</span>
                  <ExternalLink className="w-3 h-3 text-[#A3D0EE]" />
                </a>
              </div>
              <div className="pt-1 border-t border-white/10 space-y-1">
                <span className="text-[11px] text-[#A3D0EE] font-bold block">Contact Person (WhatsApp):</span>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Puguh</span>
                  <a
                    href="https://wa.me/6281333185886"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#b96d41] hover:underline font-semibold"
                  >
                    0813-3318-5886
                  </a>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Rafly</span>
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
        </div>

        {/* Bottom Bar: Hak Cipta & Lisensi */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#C6E8F7]/60 gap-3">
          <p>
            © {new Date().getFullYear()} Badan Legislatif Mahasiswa FEB Universitas Airlangga. Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-3">
            <span>Dikelola oleh Biro Administrasi & Baleg BLM</span>
            <span>•</span>
            <span className="text-[#b96d41] font-semibold">v1.0 Produksi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

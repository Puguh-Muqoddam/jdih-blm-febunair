"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Scale,
  Search,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Scroll,
  FileCheck,
  ShieldAlert,
} from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [docDropdownOpen, setDocDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tutup menu mobile ketika navigasi berubah
  useEffect(() => {
    setMobileMenuOpen(false);
    setDocDropdownOpen(false);
  }, [pathname]);

  // Deteksi scroll untuk transisi header transparan ke solid
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Beranda", href: "/" },
    {
      label: "Produk Hukum",
      href: "/produk-hukum",
      hasDropdown: true,
    },
    { label: "Panduan Penomoran", href: "/panduan-penomoran" },
    { label: "Statistik", href: "/statistik" },
    { label: "Tentang", href: "/tentang" },
    { label: "Permohonan", href: "/permohonan" },
  ];

  const docTypes = [
    {
      name: "Undang-Undang (UU)",
      slug: "undang-undang",
      icon: Scale,
      count: 2,
    },
    {
      name: "Ketetapan BLM (TAP)",
      slug: "ketetapan-blm",
      icon: BookOpen,
      count: 3,
    },
    {
      name: "Surat Keputusan (SK)",
      slug: "surat-keputusan",
      icon: Scroll,
      count: 39,
    },
    {
      name: "Surat Laporan (LP)",
      slug: "lembaran-parlemen",
      icon: FileCheck,
      count: 5,
    },
  ];

  const isOverlayMode = isHome && !scrolled && !mobileMenuOpen;

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#1B67BC] focus:px-4 focus:py-2 focus:font-bold focus:text-white focus:shadow-lg focus:outline-hidden"
      >
        Lewati ke Konten Utama
      </a>

      <header
        className={`${
          isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"
        } z-40 w-full transition-all duration-300 ${
          isOverlayMode
            ? "bg-gradient-to-b from-black/75 via-black/40 to-transparent py-4 sm:py-6"
            : "bg-[#0F294A]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Baris 1: Logo & Nama Institusi (Kiri) + Aksi Cepat (Kanan) */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-4 group focus-visible:outline-2 focus-visible:outline-white rounded-md"
              aria-label="Kembali ke Beranda JDIH BLM FEB UNAIR"
            >
              <div className="flex items-center -space-x-2 shrink-0">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-1 shadow-md border-2 border-white/90 overflow-hidden flex items-center justify-center z-10 group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/blm_logo.png"
                    alt="Logo BLM FEB UNAIR"
                    width={52}
                    height={52}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-1 shadow-md border-2 border-[#A3D0EE] overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/parliament_logo.png"
                    alt="Logo Parlemen Cakrasena"
                    width={52}
                    height={52}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col text-white">
                <span className="font-serif text-base sm:text-2xl tracking-wide font-normal uppercase leading-tight drop-shadow-xs">
                  UNIVERSITAS AIRLANGGA
                </span>
                <span className="font-serif text-[10px] sm:text-xs tracking-[0.12em] text-white/90 uppercase leading-snug">
                  BADAN LEGISLATIF MAHASISWA • FAKULTAS EKONOMI DAN BISNIS
                </span>
              </div>
            </Link>

            {/* Aksi Kanan (Pencarian & Portal Pengurus) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/pencarian"
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white hover:text-[#1B67BC] transition-all cursor-pointer"
                title="Cari produk hukum"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Cari Regulasi</span>
              </Link>

              <Link
                href="/admin/login"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#b96d41] hover:bg-[#a35c33] text-white px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Portal Pengurus</span>
              </Link>

              {/* Mobile Burger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Baris 2: Navigasi Horizontal di Bawah Logo (Gaya FEB UNAIR) */}
          <nav
            className={`hidden lg:flex items-center gap-6 xl:gap-8 ${
              isOverlayMode ? "mt-5 pt-1" : "mt-2.5 pt-2 border-t border-white/10"
            }`}
            aria-label="Navigasi Utama"
          >
            {navLinks.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setDocDropdownOpen(true)}
                    onMouseLeave={() => setDocDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`py-1 text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? "text-[#A3D0EE] underline underline-offset-8 decoration-2 decoration-[#b96d41]"
                          : "text-white hover:text-[#A3D0EE]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-white/80" />
                    </Link>

                    {/* Dropdown Menu */}
                    {docDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2 w-64 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                        <div className="bg-white rounded-xl shadow-2xl border border-[#A3D0EE] p-2 space-y-1">
                          <Link
                            href="/produk-hukum"
                            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#C6E8F7]/40 text-xs font-bold text-[#1A1A1A] border-b border-[#A3D0EE]/40 mb-1"
                          >
                            <span>Semua Produk Hukum</span>
                            <span className="bg-[#1B67BC] text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                              49
                            </span>
                          </Link>
                          {docTypes.map((dt) => {
                            const IconComponent = dt.icon;
                            return (
                              <Link
                                key={dt.slug}
                                href={`/produk-hukum/jenis/${dt.slug}`}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#C6E8F7]/30 text-xs text-[#1A1A1A] transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <IconComponent className="w-4 h-4 text-[#1B67BC]" />
                                  <span className="font-medium">{dt.name}</span>
                                </div>
                                <span className="text-[10px] font-semibold text-[#1B67BC] bg-[#C6E8F7]/60 px-1.5 py-0.5 rounded">
                                  {dt.count}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#A3D0EE] underline underline-offset-8 decoration-2 decoration-[#b96d41]"
                      : "text-white hover:text-[#A3D0EE]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 border-t border-white/15 bg-[#0F294A] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-white/15 text-[#A3D0EE] font-bold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t border-white/15 space-y-2">
              <div className="text-xs font-semibold uppercase text-[#A3D0EE] px-3">
                Kategori Dokumen
              </div>
              <div className="grid grid-cols-2 gap-2 px-1">
                {docTypes.map((dt) => (
                  <Link
                    key={dt.slug}
                    href={`/produk-hukum/jenis/${dt.slug}`}
                    className="flex items-center justify-between p-2 rounded-md bg-white/10 border border-white/15 text-xs font-medium text-white hover:border-[#A3D0EE]"
                  >
                    <span>{dt.name}</span>
                    <span className="text-[10px] bg-[#1B67BC] px-1.5 py-0.5 rounded text-white font-semibold">
                      {dt.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 px-1">
              <Link
                href="/admin/login"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#b96d41] text-white text-xs font-bold shadow-xs hover:bg-[#a35c33] transition-colors"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Masuk ke Panel Pengurus BLM</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

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
      name: "Undang-Undang & Konstitusi (UU)",
      slug: "undang-undang",
      count: 4,
    },
    {
      name: "Ketetapan BLM (TAP)",
      slug: "ketetapan-blm",
      count: 3,
    },
    {
      name: "Surat Keputusan (SK)",
      slug: "surat-keputusan",
      count: 57,
    },
    {
      name: "Surat Laporan (LP)",
      slug: "lembaran-parlemen",
      count: 6,
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
            : "bg-[#0F294A] shadow-md border-b border-white/10 py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Baris 1: Logo & Nama Institusi (Kiri) + Aksi Warna Palet Resmi (Kanan) */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-4 group focus-visible:outline-2 focus-visible:outline-white rounded-md"
              aria-label="Kembali ke Beranda JDIH BLM FEB UNAIR"
            >
              <div className="flex items-center -space-x-1.5 shrink-0">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white p-1 shadow-sm border border-[#A3D0EE] overflow-hidden flex items-center justify-center z-10">
                  <Image
                    src="/images/blm_logo.png"
                    alt="Logo BLM FEB UNAIR"
                    width={52}
                    height={52}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white p-1 shadow-sm border border-[#A3D0EE] overflow-hidden flex items-center justify-center">
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
                <span className="font-serif text-base sm:text-2xl tracking-wide font-normal uppercase leading-tight">
                  UNIVERSITAS AIRLANGGA
                </span>
                <span className="font-serif text-[10px] sm:text-xs tracking-[0.12em] text-white/90 uppercase leading-snug">
                  BADAN LEGISLATIF MAHASISWA • FAKULTAS EKONOMI DAN BISNIS
                </span>
              </div>
            </Link>

            {/* Aksi Kanan: Warna Sesuai Palet Resmi (Deep Blue & Terracotta), Sedikit Kotak */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <Link
                href="/pencarian"
                className="rounded-md bg-white text-[#1B67BC] hover:bg-[#C6E8F7] px-3.5 sm:px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
                title="Cari produk hukum"
              >
                Cari Regulasi
              </Link>

              <Link
                href="/admin/login"
                className="hidden sm:inline-block rounded-md bg-[#b96d41] text-white hover:bg-[#a35c33] px-4 py-2 text-xs font-bold transition-colors"
              >
                Portal Pengurus
              </Link>

              {/* Mobile Burger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Baris 2: Navigasi Horizontal di Bawah Logo */}
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
                      className={`py-1 text-sm font-semibold transition-colors flex items-center gap-1 ${
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
                      <div className="absolute left-0 top-full pt-2 w-64 z-50">
                        <div className="bg-white rounded-md shadow-xl border border-[#A3D0EE] p-2 space-y-1">
                          <Link
                            href="/produk-hukum"
                            className="flex items-center justify-between p-2.5 rounded bg-[#1B67BC] text-white hover:bg-[#3885CC] text-xs font-bold mb-1 transition-colors"
                          >
                            <span>Semua Produk Hukum</span>
                            <span className="bg-white text-[#1B67BC] px-2 py-0.5 rounded-xs text-[10px] font-bold">
                              70
                            </span>
                          </Link>
                          {docTypes.map((dt) => (
                            <Link
                              key={dt.slug}
                              href={`/produk-hukum/jenis/${dt.slug}`}
                              className="flex items-center justify-between p-2 rounded hover:bg-[#C6E8F7]/40 text-xs text-[#1A1A1A] font-medium transition-colors"
                            >
                              <span>{dt.name}</span>
                              <span className="text-[10px] font-bold text-white bg-[#1B67BC] px-1.5 py-0.5 rounded-xs">
                                {dt.count}
                              </span>
                            </Link>
                          ))}
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
          <div className="lg:hidden mt-3 border-t border-white/15 bg-[#0F294A] px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 rounded text-sm font-medium ${
                    pathname === item.href
                      ? "bg-[#1B67BC] text-white font-bold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t border-white/15 space-y-2">
              <div className="text-xs font-bold uppercase text-[#A3D0EE] px-3">
                Kategori Dokumen
              </div>
              <div className="grid grid-cols-2 gap-2 px-1">
                {docTypes.map((dt) => (
                  <Link
                    key={dt.slug}
                    href={`/produk-hukum/jenis/${dt.slug}`}
                    className="flex items-center justify-between p-2 rounded bg-[#1B67BC] text-xs font-medium text-white hover:bg-[#3885CC]"
                  >
                    <span>{dt.name}</span>
                    <span className="text-[10px] bg-white text-[#1B67BC] px-1.5 py-0.5 rounded-xs font-bold">
                      {dt.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 px-1">
              <Link
                href="/admin/login"
                className="w-full block text-center py-2.5 rounded-md bg-[#b96d41] text-white text-xs font-bold hover:bg-[#a35c33] transition-colors"
              >
                Masuk ke Panel Pengurus BLM
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

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
  FileText,
  BookOpen,
  Scroll,
  FileCheck,
  ShieldAlert,
} from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [docDropdownOpen, setDocDropdownOpen] = useState(false);

  // Tutup menu mobile ketika navigasi berubah
  useEffect(() => {
    setMobileMenuOpen(false);
    setDocDropdownOpen(false);
  }, [pathname]);

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

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#1B67BC] focus:px-4 focus:py-2 focus:font-bold focus:text-white focus:shadow-lg focus:outline-hidden"
      >
        Lewati ke Konten Utama
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-[#A3D0EE] bg-white/95 backdrop-blur-md transition-shadow shadow-xs">
        {/* Top bar info resmi */}
        <div className="bg-[#1B67BC] text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-[#b96d41] animate-pulse"></span>
              Portal Resmi JDIH Badan Legislatif Mahasiswa FEB Universitas Airlangga
            </span>
            <div className="hidden sm:flex items-center gap-4 text-[#C6E8F7]">
              <span>Surabaya, Jawa Timur</span>
              <span>•</span>
              <Link
                href="/admin/login"
                className="hover:text-white transition-colors flex items-center gap-1 font-semibold"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#C6E8F7]" />
                <span>Portal Pengurus</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#1B67BC] rounded-md"
              aria-label="Kembali ke Beranda JDIH BLM FEB UNAIR"
            >
              <div className="flex items-center -space-x-2">
                <div className="relative w-11 h-11 rounded-full bg-white p-1 shadow-md border border-[#A3D0EE] overflow-hidden flex items-center justify-center shrink-0 z-10 group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/blm_logo.png"
                    alt="Logo BLM FEB UNAIR"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="relative w-11 h-11 rounded-full bg-white p-1 shadow-md border border-[#A3D0EE] overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/parliament_logo.png"
                    alt="Logo Parlemen Cakrasena"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-lg leading-tight text-[#1A1A1A] tracking-tight group-hover:text-[#1B67BC] transition-colors">
                    JDIH BLM FEB UNAIR
                  </span>
                  <span className="hidden sm:inline-block text-[10px] bg-[#b96d41]/15 text-[#b96d41] font-bold px-1.5 py-0.5 rounded border border-[#b96d41]/30">
                    Cakrasena
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#4A5568] tracking-wider uppercase">
                  Jaringan Dokumentasi & Informasi Hukum
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navigasi Utama">
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
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                          isActive
                            ? "text-[#1B67BC] font-bold bg-[#A3D0EE]/30"
                            : "text-[#1A1A1A] hover:text-[#1B67BC] hover:bg-[#A3D0EE]/20"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#4A5568]" />
                      </Link>

                      {/* Dropdown Menu */}
                      {docDropdownOpen && (
                        <div className="absolute left-0 top-full pt-1 w-64 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="bg-white rounded-lg shadow-xl border border-[#A3D0EE] p-2 space-y-1">
                            <Link
                              href="/produk-hukum"
                              className="flex items-center justify-between p-2 rounded-md hover:bg-[#A3D0EE]/20 text-xs font-bold text-[#1A1A1A] border-b border-[#A3D0EE]/40 mb-1"
                            >
                              <span>Semua Produk Hukum</span>
                              <span className="bg-[#1B67BC] text-white px-1.5 py-0.5 rounded text-[10px] font-semibold">
                                49
                              </span>
                            </Link>
                            {docTypes.map((dt) => {
                              const IconComponent = dt.icon;
                              return (
                                <Link
                                  key={dt.slug}
                                  href={`/produk-hukum/jenis/${dt.slug}`}
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#A3D0EE]/20 text-xs text-[#1A1A1A] transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="w-4 h-4 text-[#1B67BC]" />
                                    <span>{dt.name}</span>
                                  </div>
                                  <span className="text-[10px] font-semibold text-[#4A5568] bg-[#C6E8F7]/60 px-1.5 py-0.5 rounded">
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
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#1B67BC] font-bold bg-[#A3D0EE]/30"
                        : "text-[#1A1A1A] hover:text-[#1B67BC] hover:bg-[#A3D0EE]/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/pencarian"
                className="flex items-center gap-2 rounded-full border border-[#A3D0EE] bg-white px-3.5 py-2 text-xs font-medium text-[#4A5568] shadow-xs hover:border-[#1B67BC] hover:text-[#1B67BC] transition-all cursor-pointer"
                title="Cari produk hukum (Tekan / untuk mencari)"
              >
                <Search className="w-4 h-4 text-[#1B67BC]" />
                <span className="hidden sm:inline">Pencarian Cepat</span>
              </Link>

              {/* Mobile Burger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#1A1A1A] hover:bg-[#A3D0EE]/30 hover:text-[#1B67BC] focus-visible:outline-2 focus-visible:outline-[#1B67BC]"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#A3D0EE] bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-[#A3D0EE]/30 text-[#1B67BC] font-bold"
                      : "text-[#1A1A1A] hover:bg-[#A3D0EE]/20"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t border-[#A3D0EE] space-y-2">
              <div className="text-xs font-semibold uppercase text-[#4A5568] px-3">
                Kategori Dokumen
              </div>
              <div className="grid grid-cols-2 gap-2 px-1">
                {docTypes.map((dt) => (
                  <Link
                    key={dt.slug}
                    href={`/produk-hukum/jenis/${dt.slug}`}
                    className="flex items-center justify-between p-2 rounded-md bg-white border border-[#A3D0EE] text-xs font-medium text-[#1A1A1A] hover:border-[#1B67BC]"
                  >
                    <span>{dt.name}</span>
                    <span className="text-[10px] bg-[#C6E8F7]/60 px-1 rounded text-[#4A5568] font-semibold">
                      {dt.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#A3D0EE] px-1">
              <Link
                href="/admin/login"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#1B67BC] text-white text-xs font-bold shadow-xs hover:bg-[#3885CC] transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-[#C6E8F7]" />
                <span>Masuk ke Panel Pengurus BLM</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

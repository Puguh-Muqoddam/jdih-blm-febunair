"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#d4af38] focus:px-4 focus:py-2 focus:font-bold focus:text-[#3E2C1C] focus:shadow-lg focus:outline-hidden"
      >
        Lewati ke Konten Utama
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-[#E8DEC4] bg-[#FFFDF7]/95 backdrop-blur-md transition-shadow">
        {/* Top bar info resmi */}
        <div className="bg-[#3E2C1C] text-[#FFFDF7] text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#d4af38] animate-pulse"></span>
              Portal Resmi JDIH Badan Legislatif Mahasiswa FEB Universitas Airlangga
            </span>
            <div className="hidden sm:flex items-center gap-4 text-[#F7F1E3]/80">
              <span>Surabaya, Jawa Timur</span>
              <span>•</span>
              <Link
                href="/admin/login"
                className="hover:text-[#d4af38] transition-colors flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#d4af38]" />
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
              className="flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-[#80691d] rounded-md"
              aria-label="Kembali ke Beranda JDIH BLM FEB UNAIR"
            >
              <div className="w-11 h-11 rounded-lg bg-[#3E2C1C] flex items-center justify-center text-[#d4af38] shadow-md border border-[#80691d]/30 group-hover:bg-[#2e2014] transition-all">
                <Scale className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight text-[#3E2C1C] tracking-tight group-hover:text-[#80691d] transition-colors">
                  JDIH BLM FEB UNAIR
                </span>
                <span className="text-[11px] font-medium text-[#6B5A48] tracking-wider uppercase">
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
                            ? "text-[#80691d] font-bold bg-[#F7F1E3]"
                            : "text-[#3E2C1C] hover:text-[#80691d] hover:bg-[#F7F1E3]/60"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#6B5A48]" />
                      </Link>

                      {/* Dropdown Menu */}
                      {docDropdownOpen && (
                        <div className="absolute left-0 top-full pt-1 w-64 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="bg-white rounded-lg shadow-xl border border-[#E8DEC4] p-2 space-y-1">
                            <Link
                              href="/produk-hukum"
                              className="flex items-center justify-between p-2 rounded-md hover:bg-[#F7F1E3] text-xs font-bold text-[#3E2C1C] border-b border-[#F7F1E3] mb-1"
                            >
                              <span>Semua Produk Hukum</span>
                              <span className="bg-[#3E2C1C] text-[#FFFDF7] px-1.5 py-0.5 rounded text-[10px]">
                                49
                              </span>
                            </Link>
                            {docTypes.map((dt) => {
                              const IconComponent = dt.icon;
                              return (
                                <Link
                                  key={dt.slug}
                                  href={`/produk-hukum/jenis/${dt.slug}`}
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#F7F1E3] text-xs text-[#3E2C1C] transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="w-4 h-4 text-[#80691d]" />
                                    <span>{dt.name}</span>
                                  </div>
                                  <span className="text-[10px] font-semibold text-[#6B5A48] bg-stone-100 px-1.5 py-0.5 rounded">
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
                        ? "text-[#80691d] font-bold bg-[#F7F1E3]"
                        : "text-[#3E2C1C] hover:text-[#80691d] hover:bg-[#F7F1E3]/60"
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
                className="flex items-center gap-2 rounded-full border border-[#E8DEC4] bg-white px-3.5 py-2 text-xs font-medium text-[#6B5A48] shadow-2xs hover:border-[#80691d] hover:text-[#3E2C1C] transition-all cursor-pointer"
                title="Cari produk hukum (Tekan / untuk mencari)"
              >
                <Search className="w-4 h-4 text-[#80691d]" />
                <span className="hidden sm:inline">Pencarian Cepat</span>
              </Link>

              {/* Mobile Burger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#3E2C1C] hover:bg-[#F7F1E3] hover:text-[#80691d] focus-visible:outline-2 focus-visible:outline-[#80691d]"
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8DEC4] bg-[#FFFDF7] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-[#F7F1E3] text-[#80691d] font-bold"
                      : "text-[#3E2C1C] hover:bg-[#F7F1E3]/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t border-[#E8DEC4] space-y-2">
              <div className="text-xs font-semibold uppercase text-[#6B5A48] px-3">
                Kategori Dokumen
              </div>
              <div className="grid grid-cols-2 gap-2 px-1">
                {docTypes.map((dt) => (
                  <Link
                    key={dt.slug}
                    href={`/produk-hukum/jenis/${dt.slug}`}
                    className="flex items-center justify-between p-2 rounded-md bg-white border border-[#E8DEC4] text-xs font-medium text-[#3E2C1C]"
                  >
                    <span>{dt.name}</span>
                    <span className="text-[10px] bg-stone-100 px-1 rounded text-[#6B5A48]">
                      {dt.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8DEC4] px-1">
              <Link
                href="/admin/login"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#3E2C1C] text-[#d4af38] text-xs font-bold shadow-xs hover:bg-[#2e2014]"
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

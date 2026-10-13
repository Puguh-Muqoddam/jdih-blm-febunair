"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  LayoutDashboard,
  FileText,
  PlusCircle,
  FileSpreadsheet,
  Hash,
  Inbox,
  History,
  Users,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Jika di halaman login, tampilkan halaman penuh tanpa sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    {
      label: "Dasbor Utama",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Produk Hukum",
      href: "/admin/produk-hukum",
      icon: FileText,
      exact: true,
    },
    {
      label: "Tambah Baru",
      href: "/admin/produk-hukum/baru",
      icon: PlusCircle,
    },
    {
      label: "Impor CSV Register",
      href: "/admin/impor",
      icon: FileSpreadsheet,
    },
    {
      label: "Pemesanan Nomor",
      href: "/admin/nomor-dipesan",
      icon: Hash,
    },
    {
      label: "Permohonan Masuk",
      href: "/admin/permohonan",
      icon: Inbox,
      badge: "0",
    },
    {
      label: "Audit Log Perubahan",
      href: "/admin/audit-log",
      icon: History,
    },
    {
      label: "Pengelola & Hak Akses",
      href: "/admin/pengguna",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E3]/50 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#3E2C1C] text-[#FFFDF7] p-4 flex items-center justify-between border-b border-[#E8DEC4]">
        <div className="flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-[#d4af38]" />
          <span className="font-serif font-bold text-sm">JDIH BLM Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-md hover:bg-white/10"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Desktop & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#3E2C1C] text-[#FFFDF7] flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-0 md:translate-x-0 hidden md:flex"
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="p-5 border-b border-[#FFFDF7]/15 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#d4af38] border border-[#d4af38]/30">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm block leading-tight text-[#FFFDF7]">
                  Panel Pengurus
                </span>
                <span className="text-[10px] text-[#d4af38] font-mono tracking-wider">
                  BLM FEB UNAIR
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#FFFDF7]/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1" aria-label="Menu Admin">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#d4af38] text-[#3E2C1C] font-bold shadow-xs"
                      : "text-[#FFFDF7]/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? "text-[#3E2C1C]" : "text-[#d4af38]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-[#FFFDF7]/15 space-y-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <div className="w-7 h-7 rounded-full bg-[#d4af38] text-[#3E2C1C] flex items-center justify-center font-bold text-xs">
              P
            </div>
            <div className="overflow-hidden">
              <span className="font-semibold text-xs text-white block truncate">
                Puguh Muqoddam
              </span>
              <span className="text-[10px] text-[#d4af38] block truncate">
                Super Admin
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs text-[#FFFDF7]/60">
            <Link
              href="/"
              target="_blank"
              className="hover:text-[#d4af38] flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Portal</span>
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Desktop */}
        <header className="hidden md:flex items-center justify-between h-16 px-8 bg-white border-b border-[#E8DEC4]">
          <div className="flex items-center gap-2 text-xs text-[#6B5A48]">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold text-[#3E2C1C]">Sesi Pengurus Aktif</span>
            <span>•</span>
            <span>Biro Administrasi & Baleg BLM 2026</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E8DEC4] hover:bg-[#F7F1E3] text-[#3E2C1C] transition-colors font-medium"
            >
              <span>Buka Website Publik</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#80691d]" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
}

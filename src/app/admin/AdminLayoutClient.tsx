"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#C6E8F7]/20 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#1B67BC] text-white p-4 flex items-center justify-between border-b border-[#3885CC]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center border border-[#A3D0EE]">
            <Image
              src="/images/blm_logo.png"
              alt="Logo BLM"
              width={28}
              height={28}
              className="w-full h-full object-contain"
            />
          </div>
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1B67BC] text-white flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-0 md:translate-x-0 hidden md:flex"
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="p-5 border-b border-white/15 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex items-center -space-x-1.5">
                <div className="w-9 h-9 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center border border-[#A3D0EE] z-10">
                  <Image
                    src="/images/blm_logo.png"
                    alt="Logo BLM"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-9 h-9 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center border border-[#3885CC]">
                  <Image
                    src="/images/parliament_logo.png"
                    alt="Logo Parlemen Cakrasena"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <span className="font-serif font-bold text-sm block leading-tight text-white">
                  Panel Pengurus
                </span>
                <span className="text-[10px] text-[#C6E8F7] font-mono tracking-wider">
                  Parlemen Cakrasena 2026
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white/70 hover:text-white"
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
                      ? "bg-[#b96d41] text-white font-bold shadow-xs"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? "text-white" : "text-[#A3D0EE]"}`} />
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
        <div className="p-4 border-t border-white/15 space-y-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-white/10 border border-white/15">
            <div className="w-7 h-7 rounded-full bg-[#b96d41] text-white flex items-center justify-center font-bold text-xs">
              P
            </div>
            <div className="overflow-hidden">
              <span className="font-semibold text-xs text-white block truncate">
                Puguh Muqoddam
              </span>
              <span className="text-[10px] text-[#C6E8F7] block truncate">
                Super Admin
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs text-white/70">
            <Link
              href="/"
              target="_blank"
              className="hover:text-[#C6E8F7] flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Portal</span>
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-rose-200 flex items-center gap-1 transition-colors"
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
        <header className="hidden md:flex items-center justify-between h-16 px-8 bg-white border-b border-[#A3D0EE]">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-[#1A1A1A]">Sesi Pengurus Aktif</span>
            <span>•</span>
            <span>Departemen Legislasi BLM 2026</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#A3D0EE] hover:bg-[#C6E8F7]/30 text-[#1A1A1A] transition-colors font-medium"
            >
              <span>Buka Website Publik</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#1B67BC]" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import { loginAdminAction } from "@/lib/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setError("Mohon lengkapi alamat email dan kata sandi pengurus.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdminAction({
        email: cleanEmail,
        password,
      });

      if (!res.success) {
        setError(res.error || "Gagal melakukan autentikasi.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Terjadi gangguan jaringan saat memverifikasi sesi pengurus.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1B67BC] text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#3885CC]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#A3D0EE]/15 blur-3xl pointer-events-none" />

      {/* Top Back Link */}
      <div className="max-w-md w-full mx-auto pt-2 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-white/75 hover:text-[#C6E8F7] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portal Publik JDIH</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8 relative z-10">
        <div className="rounded-3xl bg-white text-[#1A1A1A] p-6 sm:p-9 shadow-2xl border border-[#A3D0EE] space-y-6">
          {/* Header Logo */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex items-center justify-center -space-x-2">
              <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#1B67BC] shadow-md flex items-center justify-center z-10 overflow-hidden">
                <Image
                  src="/images/blm_logo.png"
                  alt="Logo BLM FEB UNAIR"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#b96d41] shadow-md flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/parliament_logo.png"
                  alt="Logo Parlemen Cakrasena"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1B67BC]">
                Otorisasi Internal • Parlemen Cakrasena
              </span>
              <h1 className="font-serif font-bold text-2xl text-[#1A1A1A] mt-0.5">
                Panel Pengurus JDIH
              </h1>
              <p className="text-xs text-stone-600 mt-1">
                Masuk menggunakan akun terverifikasi Departemen Legislasi BLM FEB UNAIR
              </p>
            </div>
          </div>

          {/* Alert Error */}
          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold text-[#1A1A1A]"
              >
                Alamat Email Pengurus
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@gmail.com"
                  className="w-full rounded-xl border border-[#A3D0EE] bg-[#C6E8F7]/20 pl-10 pr-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#1B67BC] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold text-[#1A1A1A]"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-[#A3D0EE] bg-[#C6E8F7]/20 pl-10 pr-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#1B67BC] focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1B67BC] py-3 text-xs font-bold text-white shadow-md hover:bg-[#3885CC] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Lock className="w-3.5 h-3.5 text-[#C6E8F7]" />
              <span>{loading ? "Memverifikasi Otorisasi..." : "Masuk ke Panel Pengurus"}</span>
            </button>
          </form>

          {/* Security Info Box */}
          <div className="rounded-xl bg-[#C6E8F7]/20 border border-[#A3D0EE] p-3.5 text-[11px] text-stone-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Keamanan Allowlist & Verifikasi Email Aktif</span>
            </div>
            <p className="leading-relaxed">
              Hanya akun dengan email terverifikasi (<code>email_confirmed_at</code>) dan terdaftar di tabel <code>AdminUser</code> yang dapat mengakses dasbor. Setiap mutasi data dicatat dalam <em>Audit Log</em> permanen.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-white/60 pb-2 relative z-10">
        &copy; 2026 Departemen Legislasi BLM FEB Universitas Airlangga
      </div>
    </div>
  );
}

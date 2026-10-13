"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Scale,
  Lock,
  Mail,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("puguhmuqoddam151@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Simulasi autentikasi / verifikasi awal sesi admin
      if (!email.trim() || !password.trim()) {
        setErrorMsg("Email dan kata sandi wajib diisi.");
        setIsLoading(false);
        return;
      }

      // Berhasil, arahkan ke dasbor admin
      setTimeout(() => {
        router.push("/admin");
      }, 600);
    } catch (err) {
      setErrorMsg("Gagal melakukan autentikasi. Pastikan akun Anda terdaftar.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3E2C1C] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af38_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#d4af38]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#b96d41]/15 blur-3xl pointer-events-none" />

      {/* Back to Site Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFFDF7]/70 hover:text-[#d4af38] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portal Publik</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-2xl border border-[#FFFDF7]/20 bg-[#FFFDF7] p-8 shadow-2xl relative z-10 space-y-6">
        {/* Header Identitas */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#3E2C1C] flex items-center justify-center text-[#d4af38] shadow-md border border-[#80691d]">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-[#3E2C1C]">
            Masuk Panel Pengurus
          </h1>
          <p className="text-xs text-[#6B5A48] max-w-xs mx-auto">
            Sistem Autentikasi Pengelolaan JDIH Badan Legislatif Mahasiswa FEB UNAIR
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#3E2C1C] mb-1">
              Email Pengurus / Super Admin
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80691d]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-[#E8DEC4] bg-white pl-10 pr-4 py-2.5 text-xs text-[#3E2C1C] focus:border-[#80691d] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#3E2C1C]">
                Kata Sandi
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80691d]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E8DEC4] bg-white pl-10 pr-4 py-2.5 text-xs text-[#3E2C1C] focus:border-[#80691d] focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#3E2C1C] py-3 text-xs font-bold text-[#d4af38] shadow-md hover:bg-[#2e2014] focus-visible:outline-2 focus-visible:outline-[#d4af38] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <span>Memverifikasi Akses...</span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="rounded-xl bg-[#F7F1E3] p-3 text-[11px] text-[#6B5A48] space-y-1 border border-[#E8DEC4]">
          <div className="flex items-center gap-1.5 font-bold text-[#80691d]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Keamanan Berlapis (Zero-Trust)</span>
          </div>
          <p className="leading-relaxed">
            Hanya akun yang terdaftar dalam allowlist tabel <code>AdminUser</code> yang dapat memodifikasi dokumen atau menerbitkan regulasi.
          </p>
        </div>
      </div>
    </div>
  );
}

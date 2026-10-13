"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building,
  HelpCircle,
  FileCheck2,
  Mail,
  User,
  MessageSquare,
  ArrowRight,
  Scale,
} from "lucide-react";
import { LEGAL_DOCUMENTS } from "@/lib/data/mock-documents";
import { submitDocumentRequestAction } from "@/lib/actions/request";

export default function PermohonanDokumenPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [selectedDocSlug, setSelectedDocSlug] = useState("OTHER");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketNumber: string;
    email: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !email || !affiliation || !message) {
      setErrorMessage("Mohon lengkapi seluruh kolom formulir wajib.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitDocumentRequestAction({
        name,
        email,
        affiliation,
        relatedDocumentSlug: selectedDocSlug,
        message,
        honeypot,
      });

      if (res.success) {
        setSubmittedTicket({
          ticketNumber: res.ticketNumber,
          email,
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kendala saat mengirim permohonan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Breadcrumb & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af38]/15 border border-[#d4af38]/30 text-xs font-semibold text-[#80691d]">
            <Scale className="w-3.5 h-3.5" />
            Layanan Keterbukaan Informasi Publik Mahasiswa
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3E2C1C]">
            Permohonan Salinan Dokumen & Informasi Hukum
          </h1>
          <p className="text-sm sm:text-base text-[#735D45] max-w-2xl mx-auto leading-relaxed">
            Ajukan permohonan naskah fisik, risalah sidang, atau klarifikasi hukum kepada Biro Administrasi & Legislasi BLM FEB UNAIR.
          </p>
        </div>

        {/* SLA Information Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC4] shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#d4af38]/10 text-[#80691d] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#3E2C1C]">
                SLA Waktu Tanggap
              </h2>
              <p className="text-xs text-[#735D45] mt-1 leading-relaxed">
                Maksimal <strong className="text-[#3E2C1C]">3 × 24 Jam Kerja</strong> sejak tiket permohonan resmi tercatat.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC4] shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#3E2C1C]">
                Format Salinan Resmi
              </h2>
              <p className="text-xs text-[#735D45] mt-1 leading-relaxed">
                Dokumen dikirim berformat PDF digital bertanda tangan elektronik atau fisik legalisir.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DEC4] shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#b96d41]/10 text-[#b96d41] flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#3E2C1C]">
                Unit Pengelola
              </h2>
              <p className="text-xs text-[#735D45] mt-1 leading-relaxed">
                Biro Administrasi & Komisi I (Legislasi & Yudikasi) BLM FEB UNAIR.
              </p>
            </div>
          </div>
        </div>

        {/* State Berhasil Dikirim */}
        {submittedTicket ? (
          <div className="bg-white rounded-3xl border border-emerald-300 p-8 sm:p-10 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                Tiket Permohonan Diterbitkan
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E2C1C]">
                {submittedTicket.ticketNumber}
              </h2>
              <p className="text-sm text-[#735D45] max-w-lg mx-auto">
                Permohonan Anda telah masuk dalam antrean Biro Administrasi & Legislasi. Konfirmasi tindak lanjut serta salinan dokumen akan dikirimkan ke alamat email:
              </p>
              <div className="inline-block bg-[#F7F1E3] px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-[#3E2C1C] border border-[#E8DEC4]">
                {submittedTicket.email}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#E8DEC4] text-xs text-[#735D45] max-w-md mx-auto text-left space-y-1.5">
              <div className="font-bold text-[#3E2C1C] flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#80691d]" />
                Langkah Selanjutnya:
              </div>
              <p>1. Petugas administrasi akan memeriksa ketersediaan naskah.</p>
              <p>2. Salinan dokumen resmi akan dikirim melalui email pemohon.</p>
              <p>3. Simpan nomor tiket di atas untuk konfirmasi di Sekretariat BLM.</p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmittedTicket(null);
                  setName("");
                  setEmail("");
                  setAffiliation("");
                  setMessage("");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#F7F1E3] hover:bg-[#E8DEC4] text-xs font-bold text-[#3E2C1C] transition-colors"
              >
                Kirim Permohonan Lain
              </button>
              <Link
                href="/produk-hukum"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4af38] hover:bg-[#c29f2f] text-xs font-bold text-[#3E2C1C] transition-all"
              >
                Kembali ke Katalog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Formulir Permohonan Dokumen */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-[#E8DEC4] p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="border-b border-[#E8DEC4] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#3E2C1C]">
                  Formulir Permohonan Informasi
                </h2>
                <p className="text-xs text-[#735D45] mt-0.5">
                  Lengkapi data pemohon untuk keperluan pencatatan buku register administrasi.
                </p>
              </div>
              <span className="text-xs text-rose-600 font-medium">* Kolom Wajib</span>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                {errorMessage}
              </div>
            )}

            {/* Honeypot Field (Tersembunyi untuk Bot) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website (Leave blank)</label>
              <input
                type="text"
                id="website"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="req-name" className="block text-xs font-bold text-[#3E2C1C] uppercase tracking-wider mb-2">
                  Nama Lengkap Pemohon <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#735D45] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="req-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Muhammad Haidar"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DEC4] bg-[#FFFDF7] text-sm text-[#3E2C1C] focus:outline-none focus:ring-2 focus:ring-[#80691d]/20 focus:border-[#80691d]"
                  />
                </div>
              </div>

              {/* Alamat Email */}
              <div>
                <label htmlFor="req-email" className="block text-xs font-bold text-[#3E2C1C] uppercase tracking-wider mb-2">
                  Alamat Email Aktif <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#735D45] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="req-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@mhs.unair.ac.id"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DEC4] bg-[#FFFDF7] text-sm text-[#3E2C1C] focus:outline-none focus:ring-2 focus:ring-[#80691d]/20 focus:border-[#80691d]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* NIM / Afiliasi */}
              <div>
                <label htmlFor="req-affil" className="block text-xs font-bold text-[#3E2C1C] uppercase tracking-wider mb-2">
                  NIM Mahasiswa / Lembaga / Unit <span className="text-rose-600">*</span>
                </label>
                <input
                  id="req-affil"
                  type="text"
                  required
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  placeholder="Contoh: NIM 042211... / HIMA Manajemen"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DEC4] bg-[#FFFDF7] text-sm text-[#3E2C1C] focus:outline-none focus:ring-2 focus:ring-[#80691d]/20 focus:border-[#80691d]"
                />
              </div>

              {/* Produk Hukum Terkait */}
              <div>
                <label htmlFor="req-doc" className="block text-xs font-bold text-[#3E2C1C] uppercase tracking-wider mb-2">
                  Produk Hukum yang Dimohon
                </label>
                <select
                  id="req-doc"
                  value={selectedDocSlug}
                  onChange={(e) => setSelectedDocSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DEC4] bg-[#FFFDF7] text-sm text-[#3E2C1C] font-medium focus:outline-none focus:ring-2 focus:ring-[#80691d]/20 focus:border-[#80691d]"
                >
                  <option value="OTHER">Dokumen Lainnya / Naskah Rancangan / Risalah Sidang</option>
                  <optgroup label="Undang-Undang (UU)">
                    {LEGAL_DOCUMENTS.filter((d) => d.type === "UU").map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.officialNumber} - {d.title.slice(0, 50)}...
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Ketetapan BLM (TAP)">
                    {LEGAL_DOCUMENTS.filter((d) => d.type === "TAP").map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.officialNumber} - {d.title.slice(0, 50)}...
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Surat Keputusan (SK)">
                    {LEGAL_DOCUMENTS.filter((d) => d.type === "SK").slice(0, 15).map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.officialNumber} - {d.title.slice(0, 50)}...
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Kebutuhan / Pesan */}
            <div>
              <label htmlFor="req-message" className="block text-xs font-bold text-[#3E2C1C] uppercase tracking-wider mb-2">
                Tujuan & Rincian Kebutuhan Dokumen <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="req-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Jelaskan kebutuhan Anda (misal: rujukan penyusunan skripsi, persiapan sidang LPJ ormawa, berkas advokasi mahasiswa, dll.)..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DEC4] bg-[#FFFDF7] text-sm text-[#3E2C1C] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#80691d]/20 focus:border-[#80691d]"
              />
            </div>

            {/* Captcha & Security Notice */}
            <div className="p-4 rounded-2xl bg-[#F7F1E3]/50 border border-[#E8DEC4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-[#735D45]">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Dilindungi oleh Cloudflare Turnstile & Pembatasan Frekuensi Permohonan</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#d4af38] hover:bg-[#c29f2f] text-xs font-bold text-[#3E2C1C] shadow-sm transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Mengirimkan Permohonan..." : "Kirim Permohonan Resmi"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

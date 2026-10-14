"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  UploadCloud,
  FileCheck,
  Eye,
  ArrowLeft,
  Info,
  Calendar,
  Tag,
  Scale,
  ShieldCheck,
  File,
} from "lucide-react";
import {
  LegalDocumentType,
  SkNatureCode,
  formatOfficialNumber,
  suggestAbbreviationCode,
  generateDocumentSlug,
  formatCitation,
  toRoman,
  padSequence,
} from "@/lib/numbering";

export default function TambahProdukHukumBaruPage() {
  const formId = useId();

  // Form States
  const [docType, setDocType] = useState<LegalDocumentType>("SK");
  const [nature, setNature] = useState<SkNatureCode>("A");
  const [sequenceNumber, setSequenceNumber] = useState<number>(171);
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-14");
  const [abbreviationCode, setAbbreviationCode] = useState<string>("SKTPENGURUS");
  const [title, setTitle] = useState<string>(
    "Surat Keputusan Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga tentang Penetapan Susunan Pengurus Tambahan"
  );
  const [summary, setSummary] = useState<string>(
    "Keputusan ini menetapkan susunan pengurus tambahan untuk memperkuat koordinasi fungsi legislasi dan pengawasan kemahasiswaan."
  );
  const [forum, setForum] = useState<string>("Sidang Pleno BLM");
  const [place, setPlace] = useState<string>("Surabaya");
  const [legalStatus, setLegalStatus] = useState<"BERLAKU" | "DIUBAH" | "DICABUT" | "TIDAK_BERLAKU">("BERLAKU");
  const [publicationState, setPublicationState] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [tagsInput, setTagsInput] = useState<string>("Pengurus, Kelembagaan, Internal");

  // PDF File Dropzone State
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
    lastModified: number;
  } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Derivasi Bulan & Tahun dari Selected Date
  const parsedDate = new Date(selectedDate);
  const year = isNaN(parsedDate.getFullYear()) ? 2026 : parsedDate.getFullYear();
  const month = isNaN(parsedDate.getMonth()) ? 10 : parsedDate.getMonth() + 1;
  const romanMonth = toRoman(month);

  // Live Generated Canonical Number
  let liveOfficialNumber = "";
  try {
    liveOfficialNumber = formatOfficialNumber(docType, {
      seq: sequenceNumber,
      month: month,
      year: year,
      nature: docType === "SK" ? nature : undefined,
      code: docType === "SK" ? abbreviationCode : undefined,
    });
  } catch {
    liveOfficialNumber = "Format nomor belum valid";
  }

  // Live Generated Slug & Citation
  const typeNameMap: Record<LegalDocumentType, string> = {
    UU: "Undang-Undang",
    TAP: "Ketetapan BLM",
    SK: "Surat Keputusan",
    LP: "Surat Laporan",
  };
  const liveSlug = generateDocumentSlug(docType, year, sequenceNumber);
  const liveCitation = formatCitation({
    typeName: typeNameMap[docType],
    officialNumber: liveOfficialNumber,
    title: title || "(Judul Produk Hukum)",
    placeOfEnactment: place || "Surabaya",
    enactedDateFormatted: selectedDate ? `${selectedDate} (Bulan ${romanMonth} ${year})` : "Tahun 2026",
  });

  // Helper untuk Rekomendasi Kode Singkatan Otomatis
  const handleAutoSuggestCode = () => {
    if (!title) return;
    const suggested = suggestAbbreviationCode(title);
    setAbbreviationCode(suggested);
  };

  // Helper File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setFileError("Hanya berkas berformat PDF resmi yang diperbolehkan.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setFileError("Ukuran berkas melebihi batas maksimal 15 MB.");
      return;
    }

    setUploadedFile({
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi penyimpanan lokal (akan dihubungkan ke Server Action di Langkah 8)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-600 mb-2">
            <Link href="/admin" className="hover:text-[#1B67BC]">Dasbor</Link>
            <span>/</span>
            <Link href="/admin/produk-hukum" className="hover:text-[#1B67BC]">Produk Hukum</Link>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">Tambah Baru</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
            Pencatatan Produk Hukum Baru
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Penomoran otomatis mematuhi konvensi 4-digit SK dan format baku Biro Administrasi & Legislasi.
          </p>
        </div>

        <Link
          href="/admin/produk-hukum"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#A3D0EE] text-xs font-semibold text-[#1A1A1A] hover:bg-[#C6E8F7]/30 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar
        </Link>
      </div>

      {submitSuccess && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-bold">Produk Hukum Berhasil Disimpan!</h3>
            <p className="text-xs text-emerald-800 mt-1">
              Nomor resmi <strong className="font-mono">{liveOfficialNumber}</strong> telah tercatat pada register. Anda dapat meninjaunya pada katalog publik atau melanjutkan pengunggahan berkas R2.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Link
                href="/admin/produk-hukum"
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
              >
                Lihat di Tabel Produk Hukum
              </Link>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="text-xs font-medium text-emerald-800 hover:underline"
              >
                Input Dokumen Lain
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Preview Panel (Sticky Top on Desktop) */}
      <div className="bg-[#1B67BC] text-white rounded-2xl p-6 border border-[#3885CC] shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6E8F7]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b96d41] border border-[#b96d41] text-xs font-semibold text-white">
            <Sparkles className="w-3.5 h-3.5" />
            Mesin Penomoran Kanonikal Aktif
          </div>
          <span className="text-xs text-white/70">Pratinjau Real-Time</span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-white/80 uppercase tracking-wider font-medium mb-1">
              Nomor Resmi yang Dihasilkan:
            </div>
            <div className="font-mono text-lg sm:text-xl font-bold text-[#C6E8F7] break-all bg-black/20 p-3 rounded-xl border border-white/15">
              {liveOfficialNumber}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white/10 p-3 rounded-xl border border-white/15">
              <span className="text-white/70 block mb-0.5">Slug URL Ramah Mesin:</span>
              <code className="font-mono text-white font-semibold">{liveSlug}</code>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/15">
              <span className="text-white/70 block mb-0.5">Bulan Romawi / Tahun:</span>
              <span className="font-semibold text-white">
                Bulan {romanMonth} ({month}) • Tahun {year}
              </span>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/15 text-xs">
            <span className="text-white/70 block mb-1">Format Sitasi Standar Hukum:</span>
            <p className="italic text-white/90">{liveCitation}</p>
          </div>
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl border border-[#A3D0EE] p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#A3D0EE]/50 pb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#1B67BC]" />
            1. Klasifikasi & Parameter Penomoran
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Jenis Dokumen */}
            <div>
              <label htmlFor={`${formId}-docType`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Jenis Dokumen <span className="text-rose-600">*</span>
              </label>
              <select
                id={`${formId}-docType`}
                value={docType}
                onChange={(e) => {
                  const val = e.target.value as LegalDocumentType;
                  setDocType(val);
                  if (val === "SK" && sequenceNumber < 100) setSequenceNumber(171);
                  if (val === "UU") setSequenceNumber(3);
                  if (val === "TAP") setSequenceNumber(4);
                  if (val === "LP") setSequenceNumber(6);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
              >
                <option value="SK">SK (Surat Keputusan)</option>
                <option value="UU">UU (Undang-Undang)</option>
                <option value="TAP">TAP (Ketetapan BLM)</option>
                <option value="LP">LP (Surat Laporan)</option>
              </select>
            </div>

            {/* Sifat SK (Hanya jika SK) */}
            {docType === "SK" ? (
              <div>
                <label htmlFor={`${formId}-nature`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                  Sifat SK <span className="text-rose-600">*</span>
                </label>
                <select
                  id={`${formId}-nature`}
                  value={nature}
                  onChange={(e) => setNature(e.target.value as SkNatureCode)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
                >
                  <option value="A">Sifat A (Internal Kelembagaan)</option>
                  <option value="B">Sifat B (Eksternal / Kepengurusan Organisasi)</option>
                </select>
                <span className="text-[11px] text-stone-600 mt-1 block">
                  {nature === "A" ? "Untuk ketetapan struktural internal BLM" : "Untuk penetapan struktur BEM / UKM / Panitia"}
                </span>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                  Sifat Dokumen
                </label>
                <input
                  type="text"
                  disabled
                  value="Tidak Berlaku untuk Jenis Ini"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-stone-100 text-xs text-stone-500 cursor-not-allowed"
                />
              </div>
            )}

            {/* Nomor Urut */}
            <div>
              <label htmlFor={`${formId}-seq`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Nomor Urut Buku Register <span className="text-rose-600">*</span>
              </label>
              <input
                id={`${formId}-seq`}
                type="number"
                min="1"
                max="9999"
                value={sequenceNumber}
                onChange={(e) => setSequenceNumber(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm font-mono font-bold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
              />
              <span className="text-[11px] text-stone-600 mt-1 block font-mono">
                Diformat: {padSequence(sequenceNumber, docType === "SK" ? 4 : 2)}
              </span>
            </div>
          </div>

          {/* Baris SK Abbreviation Code (Khusus SK) */}
          {docType === "SK" && (
            <div className="p-4 rounded-xl bg-[#C6E8F7]/20 border border-[#A3D0EE] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label htmlFor={`${formId}-code`} className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  Kode Singkatan SK (Biro Administrasi) <span className="text-rose-600">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutoSuggestCode}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B67BC] hover:text-[#3885CC] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Rekomendasikan Otomatis dari Judul
                </button>
              </div>

              <input
                id={`${formId}-code`}
                type="text"
                value={abbreviationCode}
                onChange={(e) => setAbbreviationCode(e.target.value.toUpperCase())}
                placeholder="Contoh: SKTPENGURUS, SKPLENOI, SKAGENDAACARAPLENO3"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white font-mono font-bold text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
              />
              <p className="text-[11px] text-stone-600 leading-relaxed">
                <Info className="w-3.5 h-3.5 inline mr-1 text-[#1B67BC]" />
                Aturan format: Harus huruf kapital, boleh memuat angka untuk pleno (mis. <code className="font-mono">PLENO3</code>). Awalan <code className="font-mono">SKT</code> untuk Sifat A atau <code className="font-mono">SK</code> untuk Sifat B dipertahankan sesuai register fisik.
              </p>
            </div>
          )}

          {/* Tanggal Penetapan & Tempat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor={`${formId}-date`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Tanggal Penetapan / Pengesahan <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id={`${formId}-date`}
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
                />
              </div>
              <span className="text-[11px] text-stone-600 mt-1 block">
                Bulan penetapan otomatis dikonversi ke angka Romawi: <strong className="font-mono text-[#1A1A1A]">{romanMonth}</strong>
              </span>
            </div>

            <div>
              <label htmlFor={`${formId}-place`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Tempat Penetapan
              </label>
              <input
                id={`${formId}-place`}
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Surabaya"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
              />
            </div>
          </div>
        </div>

        {/* 2. Isi & Metadata JDIHN */}
        <div className="bg-white rounded-2xl border border-[#A3D0EE] p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold text-[#1A1A1A] border-b border-[#A3D0EE]/50 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1B67BC]" />
            2. Metadata Dokumen & Standar JDIHN
          </h2>

          <div>
            <label htmlFor={`${formId}-title`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
              Judul / Perihal Lengkap Produk Hukum <span className="text-rose-600">*</span>
            </label>
            <textarea
              id={`${formId}-title`}
              rows={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul resmi produk hukum sebagaimana tercantum dalam naskah fisik..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
            />
          </div>

          <div>
            <label htmlFor={`${formId}-summary`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
              Abstrak / Ringkasan Pokok Pikiran
            </label>
            <textarea
              id={`${formId}-summary`}
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Ringkasan pertimbangan (Menimbang) dan materi pokok yang diatur..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor={`${formId}-forum`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Forum Penetapan
              </label>
              <select
                id={`${formId}-forum`}
                value={forum}
                onChange={(e) => setForum(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
              >
                <option value="Sidang Pleno BLM">Sidang Pleno BLM</option>
                <option value="Sidang Umum BLM">Sidang Umum BLM</option>
                <option value="Rapat Presidium BLM">Rapat Presidium BLM</option>
                <option value="Kongres Mahasiswa FEB">Kongres Mahasiswa FEB</option>
                <option value="Rapat Koordinasi Komisi">Rapat Koordinasi Komisi</option>
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-status`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Status Keberlakuan Hukum <span className="text-rose-600">*</span>
              </label>
              <select
                id={`${formId}-status`}
                value={legalStatus}
                onChange={(e) => setLegalStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
              >
                <option value="BERLAKU">BERLAKU</option>
                <option value="DIUBAH">DIUBAH</option>
                <option value="DICABUT">DICABUT</option>
                <option value="TIDAK_BERLAKU">TIDAK BERLAKU</option>
              </select>
            </div>

            <div>
              <label htmlFor={`${formId}-publish`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                Status Publikasi Portal <span className="text-rose-600">*</span>
              </label>
              <select
                id={`${formId}-publish`}
                value={publicationState}
                onChange={(e) => setPublicationState(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
              >
                <option value="PUBLISHED">PUBLIK (Tampil di Katalog)</option>
                <option value="DRAFT">DRAFT (Hanya Admin)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-tags`} className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
              Kata Kunci / Tag Pencarian (Pisahkan dengan koma)
            </label>
            <input
              id={`${formId}-tags`}
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Contoh: Pengurus, Komisi Legislasi, Anggaran"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#A3D0EE] bg-white text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1B67BC]/20 focus:border-[#1B67BC]"
            />
          </div>
        </div>

        {/* 3. Unggah Berkas Fisik PDF (Client-Side Safe) */}
        <div className="bg-white rounded-2xl border border-[#A3D0EE] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#A3D0EE]/50 pb-3">
            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#1B67BC]" />
              3. Berkas Digital Naskah (PDF)
            </h2>
            <span className="text-xs text-stone-600 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sesuai Arsitektur Cloudflare Workers (&lt; 3 MiB Bundle)
            </span>
          </div>

          <div className="border-2 border-dashed border-[#A3D0EE] hover:border-[#1B67BC] transition-colors rounded-2xl p-6 sm:p-8 text-center bg-[#C6E8F7]/15">
            <input
              type="file"
              id={`${formId}-pdf`}
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor={`${formId}-pdf`}
              className="cursor-pointer flex flex-col items-center justify-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#C6E8F7]/40 text-[#1B67BC] flex items-center justify-center">
                <File className="w-7 h-7" />
              </div>
              <div>
                <span className="font-semibold text-sm text-[#1A1A1A]">
                  Klik untuk memilih naskah PDF
                </span>{" "}
                <span className="text-xs text-stone-600">atau seret ke area ini</span>
                <p className="text-[11px] text-stone-500 mt-1">
                  Maksimal ukuran berkas: 15 MB • Ekstraksi teks & hashing dilakukan di peramban klien
                </p>
              </div>
            </label>

            {fileError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                {fileError}
              </div>
            )}

            {uploadedFile && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-left flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-950 font-mono">
                      {uploadedFile.name}
                    </div>
                    <div className="text-[11px] text-emerald-800">
                      Ukuran: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Berkas siap diunggah ke R2
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedFile(null)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-stone-600">
            Penanggung Jawab: <span className="font-semibold text-[#1A1A1A]">puguhmuqoddam151@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setPublicationState("DRAFT");
                handleSubmit({ preventDefault: () => {} } as any);
              }}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-[#A3D0EE] bg-white hover:bg-[#C6E8F7]/30 font-semibold text-xs text-[#1A1A1A] transition-colors"
            >
              Simpan sebagai Draf
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1B67BC] hover:bg-[#3885CC] font-bold text-xs text-white shadow-sm transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? "Menyimpan ke Basis Data..." : "Publikasikan Produk Hukum"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

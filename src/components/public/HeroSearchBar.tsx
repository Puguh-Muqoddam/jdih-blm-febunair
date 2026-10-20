"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export function HeroSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (type !== "all") params.set("jenis", type);
    router.push(`/pencarian?${params.toString()}`);
  };

  const handleQuickTag = (tag: string) => {
    router.push(`/pencarian?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Search Input Box: Solid White, Slightly Boxy (rounded-md) */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-stretch rounded-md bg-white p-1.5 shadow-lg border border-stone-200 gap-1.5"
      >
        {/* Dropdown Jenis */}
        <div className="relative sm:w-44 shrink-0">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-full appearance-none rounded bg-[#C6E8F7] px-3 py-2.5 text-xs font-bold text-[#1A1A1A] pr-8 focus:outline-hidden cursor-pointer"
            aria-label="Pilih Jenis Produk Hukum"
          >
            <option value="all">Semua Jenis</option>
            <option value="undang-undang">Undang-Undang (UU)</option>
            <option value="ketetapan-blm">Ketetapan (TAP)</option>
            <option value="surat-keputusan">Surat Keputusan (SK)</option>
            <option value="lembaran-parlemen">Surat Laporan (LP)</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]" />
        </div>

        {/* Input Text (Tanpa Ikon Kaca Pembesar) */}
        <div className="relative flex-1 flex items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul atau nomor resmi (mis. PEMIRA, 002/TAP, 0148)..."
            className="w-full rounded bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1A1A] placeholder:text-[#4A5568] focus:outline-hidden"
          />
        </div>

        {/* Submit Button: Solid Dark seperti referensi "Learn More" */}
        <button
          type="submit"
          className="shrink-0 rounded bg-[#1A1A1A] px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#1B67BC] focus-visible:outline-2 focus-visible:outline-[#1B67BC] transition-colors cursor-pointer"
        >
          Cari Regulasi
        </button>
      </form>

      {/* Popular Query Tags: Solid Color & Sedikit Kotak (rounded) */}
      <div className="mt-3 flex items-center justify-start gap-1.5 flex-wrap text-xs">
        <span className="font-bold text-white mr-1">Topik Populer:</span>
        {[
          "PEMIRA",
          "Tata Tertib",
          "Orientasi Studi",
          "LPPM SEKTOR",
          "Sidang Pleno",
        ].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleQuickTag(tag)}
            className="rounded bg-[#1A1A1A] text-white px-3 py-1 hover:bg-white hover:text-[#1A1A1A] transition-colors text-[11px] font-bold cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

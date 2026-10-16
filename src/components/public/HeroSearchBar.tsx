"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

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
      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-stretch rounded-xl bg-white/95 backdrop-blur-md p-1.5 shadow-2xl border border-white/40 focus-within:border-[#A3D0EE] transition-all gap-1.5"
      >
        {/* Dropdown Jenis */}
        <div className="relative sm:w-44 shrink-0">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-full appearance-none rounded-lg bg-[#C6E8F7]/45 px-3 py-2.5 text-xs font-semibold text-[#1A1A1A] pr-8 focus:outline-hidden cursor-pointer"
            aria-label="Pilih Jenis Produk Hukum"
          >
            <option value="all">Semua Jenis</option>
            <option value="undang-undang">Undang-Undang (UU)</option>
            <option value="ketetapan-blm">Ketetapan (TAP)</option>
            <option value="surat-keputusan">Surat Keputusan (SK)</option>
            <option value="lembaran-parlemen">Surat Laporan (LP)</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B67BC]" />
        </div>

        {/* Input Text */}
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[#1B67BC]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul atau nomor resmi (mis. PEMIRA, 002/TAP, 0148)..."
            className="w-full rounded-lg bg-transparent pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#1A1A1A] placeholder:text-[#4A5568]/75 focus:outline-hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-[#1B67BC] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#3885CC] focus-visible:outline-2 focus-visible:outline-[#1B67BC] transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Cari</span>
          <Search className="w-3.5 h-3.5 sm:hidden" />
        </button>
      </form>

      {/* Popular Query Chips */}
      <div className="mt-3 flex items-center justify-start gap-1.5 flex-wrap text-xs text-white/90">
        <span className="font-semibold text-[#A3D0EE]">Populer:</span>
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
            className="rounded-full bg-black/35 backdrop-blur-xs px-2.5 py-0.5 hover:bg-[#b96d41] hover:text-white transition-all text-[11px] border border-white/25 cursor-pointer text-white"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

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
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-stretch rounded-2xl bg-white p-2 shadow-2xl border-2 border-[#A3D0EE] focus-within:border-[#1B67BC] transition-all gap-2"
      >
        {/* Dropdown Jenis */}
        <div className="relative sm:w-48 shrink-0">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-full appearance-none rounded-xl bg-[#C6E8F7]/40 px-3.5 py-3 text-xs font-semibold text-[#1A1A1A] pr-8 focus:outline-hidden cursor-pointer"
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
          <Search className="absolute left-3.5 w-5 h-5 text-[#1B67BC]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kata kunci, judul, atau nomor resmi (mis. PEMIRA, 002/TAP, 0148)..."
            className="w-full rounded-xl bg-transparent pl-11 pr-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#4A5568]/70 focus:outline-hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-[#1B67BC] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#3885CC] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#1B67BC] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Cari</span>
          <Search className="w-4 h-4 sm:hidden" />
        </button>
      </form>

      {/* Popular Query Chips */}
      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-[#C6E8F7]">
        <span className="font-semibold text-white">Pencarian Populer:</span>
        {[
          "PEMIRA",
          "Tata Tertib",
          "Orientasi Studi",
          "LPPM SEKTOR",
          "Sidang Pleno",
          "SP 1",
        ].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleQuickTag(tag)}
            className="rounded-full bg-white/15 px-3 py-1 hover:bg-[#b96d41] hover:text-white transition-all text-xs border border-white/20 cursor-pointer text-white"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

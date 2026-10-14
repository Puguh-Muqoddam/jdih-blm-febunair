import React from "react";
import { BookOpen } from "lucide-react";
import { CopyButton } from "./CopyButton";

interface CitationBoxProps {
  citation: string;
  className?: string;
}

export function CitationBox({ citation, className = "" }: CitationBoxProps) {
  return (
    <div
      className={`rounded-lg border border-[#A3D0EE] bg-white p-4 shadow-xs relative ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B67BC] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Sitasi Resmi (Gaya Standar JDIH)
        </span>
        <CopyButton textToCopy={citation} label="Salin Sitasi" />
      </div>
      <p className="text-sm leading-relaxed text-[#1A1A1A] font-serif italic bg-[#C6E8F7]/30 p-3 rounded border border-[#A3D0EE]/50">
        &ldquo;{citation}&rdquo;
      </p>
    </div>
  );
}

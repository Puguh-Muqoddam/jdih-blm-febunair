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
      className={`rounded-lg border border-[#E8DEC4] bg-[#FFFDF7] p-4 shadow-2xs relative ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#80691d] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Sitasi Resmi (Gaya Standar JDIH)
        </span>
        <CopyButton textToCopy={citation} label="Salin Sitasi" />
      </div>
      <p className="text-sm leading-relaxed text-[#3E2C1C] font-serif italic bg-white/70 p-3 rounded border border-[#F2EBDA]">
        &ldquo;{citation}&rdquo;
      </p>
    </div>
  );
}

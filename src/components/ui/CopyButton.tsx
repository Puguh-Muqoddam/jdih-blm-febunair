"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
  showIconOnly?: boolean;
}

export function CopyButton({
  textToCopy,
  label = "Salin",
  className = "",
  showIconOnly = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md border border-[#E8DEC4] bg-white px-2.5 py-1.5 text-xs font-medium text-[#3E2C1C] transition-colors hover:bg-[#F7F1E3] hover:text-[#80691d] focus-visible:outline-2 focus-visible:outline-[#80691d] cursor-pointer ${className}`}
      title={copied ? "Tersalin ke papan klip!" : `Salin: ${textToCopy}`}
      aria-label={copied ? "Tersalin" : label}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-700 animate-in fade-in zoom-in" />
          {!showIconOnly && <span className="text-emerald-800 font-semibold">Tersalin!</span>}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-[#6B5A48]" />
          {!showIconOnly && <span>{label}</span>}
        </>
      )}
    </button>
  );
}

import React from "react";

export type DocType = "UU" | "TAP" | "SK" | "LP";

interface TypeBadgeProps {
  type: DocType;
  className?: string;
  size?: "sm" | "md";
}

export function TypeBadge({ type, className = "", size = "md" }: TypeBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs font-semibold" : "px-2.5 py-1 text-xs font-bold tracking-wider";

  // Aturan warna jenis selaras palet Biru + Terracotta:
  // UU = Dark Charcoal (#1A1A1A), TAP = Terracotta (#b96d41), SK = Deep Blue (#1B67BC), LP = Medium Blue (#3885CC)
  switch (type) {
    case "UU":
      return (
        <span
          className={`inline-flex items-center rounded-md bg-[#1A1A1A] text-white shadow-xs ${sizeClasses} ${className}`}
          title="Undang-Undang"
        >
          UU
        </span>
      );

    case "TAP":
      return (
        <span
          className={`inline-flex items-center rounded-md bg-[#b96d41] text-white shadow-xs ${sizeClasses} ${className}`}
          title="Ketetapan BLM"
        >
          TAP
        </span>
      );

    case "SK":
      return (
        <span
          className={`inline-flex items-center rounded-md bg-[#1B67BC] text-white shadow-xs ${sizeClasses} ${className}`}
          title="Surat Keputusan"
        >
          SK
        </span>
      );

    case "LP":
      return (
        <span
          className={`inline-flex items-center rounded-md bg-[#3885CC] text-white shadow-xs ${sizeClasses} ${className}`}
          title="Surat Laporan"
        >
          LP
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center rounded-md bg-stone-700 text-white ${sizeClasses} ${className}`}
        >
          {type}
        </span>
      );
  }
}

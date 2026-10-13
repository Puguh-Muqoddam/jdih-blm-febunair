import React from "react";

export type DocType = "UU" | "TAP" | "SK" | "LP";

interface TypeBadgeProps {
  type: DocType;
  className?: string;
  size?: "sm" | "md";
}

export function TypeBadge({ type, className = "", size = "md" }: TypeBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs font-semibold" : "px-2.5 py-1 text-xs font-bold tracking-wider";

  // Aturan warna jenis selaras §11.3:
  // UU = dark, TAP = accent, SK = secondary-strong, LP = muted
  switch (type) {
    case "UU":
      return (
        <span
          className={`inline-flex items-center rounded-md bg-[#3E2C1C] text-[#FFFDF7] shadow-xs ${sizeClasses} ${className}`}
          title="Undang-Undang"
        >
          UU
        </span>
      );

    case "TAP":
      return (
        <span
          className={`inline-flex items-center rounded-md bg-[#80691d] text-[#FFFDF7] shadow-xs ${sizeClasses} ${className}`}
          title="Ketetapan BLM"
        >
          TAP
        </span>
      );

    case "SK":
      return (
        <span
          className={`inline-flex items-center rounded-md bg-[#96552f] text-[#FFFDF7] shadow-xs ${sizeClasses} ${className}`}
          title="Surat Keputusan"
        >
          SK
        </span>
      );

    case "LP":
      return (
        <span
          className={`inline-flex items-center rounded-md bg-[#6B5A48] text-[#FFFDF7] shadow-xs ${sizeClasses} ${className}`}
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

import React from "react";

export type LegalStatusType = "BERLAKU" | "DIUBAH" | "DICABUT" | "TIDAK_BERLAKU";
export type PublicationStateType = "PUBLISHED" | "ARCHIVED" | "DRAFT";

interface StatusBadgeProps {
  status: LegalStatusType;
  publicationState?: PublicationStateType;
  className?: string;
  size?: "sm" | "md";
}

export function StatusBadge({
  status,
  publicationState,
  className = "",
  size = "md",
}: StatusBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px] font-bold" : "px-2.5 py-1 text-xs font-bold";

  // Jika dokumen diarsipkan, tampilkan label diarsipkan solid
  if (publicationState === "ARCHIVED") {
    return (
      <span
        className={`inline-flex items-center rounded bg-[#3885CC] text-white ${sizeClasses} ${className}`}
        title="Dokumen berstatus arsip digital resmi"
      >
        Diarsipkan
      </span>
    );
  }

  switch (status) {
    case "BERLAKU":
      return (
        <span
          className={`inline-flex items-center rounded bg-emerald-700 text-white ${sizeClasses} ${className}`}
        >
          Berlaku
        </span>
      );

    case "DIUBAH":
      return (
        <span
          className={`inline-flex items-center rounded bg-amber-600 text-white ${sizeClasses} ${className}`}
        >
          Diubah
        </span>
      );

    case "DICABUT":
      return (
        <span
          className={`inline-flex items-center rounded bg-rose-700 text-white ${sizeClasses} ${className}`}
        >
          Dicabut
        </span>
      );

    case "TIDAK_BERLAKU":
    default:
      return (
        <span
          className={`inline-flex items-center rounded bg-stone-700 text-white ${sizeClasses} ${className}`}
        >
          Tidak Berlaku
        </span>
      );
  }
}

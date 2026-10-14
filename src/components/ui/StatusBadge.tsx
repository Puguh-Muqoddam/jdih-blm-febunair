import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Clock, Archive } from "lucide-react";

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
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs font-medium";

  // Jika dokumen diarsipkan, tampilkan label diarsipkan
  if (publicationState === "ARCHIVED") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-[#A3D0EE] bg-[#C6E8F7]/30 text-[#1A1A1A] ${sizeClasses} ${className}`}
        title="Dokumen berstatus arsip digital resmi"
      >
        <Archive className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5 text-[#1B67BC]"} />
        <span>Diarsipkan</span>
      </span>
    );
  }

  switch (status) {
    case "BERLAKU":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-900 ${sizeClasses} ${className}`}
        >
          <CheckCircle2 className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5 text-emerald-700"} />
          <span>Berlaku</span>
        </span>
      );

    case "DIUBAH":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 text-amber-950 ${sizeClasses} ${className}`}
        >
          <AlertTriangle className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5 text-amber-700"} />
          <span>Diubah</span>
        </span>
      );

    case "DICABUT":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 text-rose-950 ${sizeClasses} ${className}`}
        >
          <XCircle className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5 text-rose-700"} />
          <span>Dicabut</span>
        </span>
      );

    case "TIDAK_BERLAKU":
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-100 text-stone-800 ${sizeClasses} ${className}`}
        >
          <Clock className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5 text-stone-600"} />
          <span>Tidak Berlaku</span>
        </span>
      );
  }
}

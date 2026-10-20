import React from "react";
import Link from "next/link";
import { LegalDocumentItem } from "@/lib/data/mock-documents";
import { TypeBadge } from "../ui/TypeBadge";
import { StatusBadge } from "../ui/StatusBadge";
import { CopyButton } from "../ui/CopyButton";
import { padSequence } from "@/lib/numbering";

interface DocumentCardProps {
  document: LegalDocumentItem;
}

const MAX_NUMBER_CHARS = 30;

function formatShortOfficialNumber(num: string): string {
  if (num.length <= MAX_NUMBER_CHARS) return num;
  return `${num.slice(0, MAX_NUMBER_CHARS)}...`;
}

export function DocumentCard({ document: doc }: DocumentCardProps) {
  const padding = doc.type === "SK" ? 4 : doc.type === "UU" ? 2 : 3;
  const paddedSeq = padSequence(doc.sequenceNumber, padding);
  const detailHref = `/produk-hukum/${doc.typeSlug}/${doc.year}/${paddedSeq}`;
  const displayNumber = formatShortOfficialNumber(doc.officialNumber);

  return (
    <article className="group relative flex flex-col justify-between min-w-0 overflow-hidden rounded-md border border-[#A3D0EE] bg-white p-5 shadow-xs hover:shadow-md hover:border-[#1B67BC] transition-all">
      <div className="min-w-0">
        {/* Header Kartu: Badges Solid & Copy Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <TypeBadge type={doc.type} size="sm" />
            <StatusBadge
              status={doc.legalStatus}
              publicationState={doc.publicationState}
              size="sm"
            />
            {doc.nature && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#C6E8F7] text-[#1A1A1A]">
                {doc.nature === "A_INTERNAL" ? "Internal (A)" : "Eksternal (B)"}
              </span>
            )}
          </div>
          <CopyButton textToCopy={doc.officialNumber} showIconOnly />
        </div>

        {/* Nomor Resmi Monospace (Dipotong ... jika melebihi batas karakter / lebar kotak) */}
        <div className="mb-2.5 min-w-0">
          <span
            title={doc.officialNumber}
            className="font-mono text-xs font-bold text-[#1A1A1A] tracking-tight bg-[#F1F5F9] px-2.5 py-1 rounded inline-block max-w-full truncate align-bottom"
          >
            {displayNumber}
          </span>
        </div>

        {/* Judul Dokumen */}
        <h3 className="font-serif font-bold text-base text-[#1A1A1A] leading-snug group-hover:text-[#1B67BC] transition-colors mb-2">
          <Link href={detailHref} className="focus:outline-hidden">
            <span className="absolute inset-0" aria-hidden="true" />
            {doc.title}
          </Link>
        </h3>

        {/* Ringkasan Dokumen */}
        <p className="text-xs text-[#4A5568] leading-relaxed line-clamp-2 mb-4">
          {doc.summary}
        </p>
      </div>

      {/* Footer Kartu: Metadata Forum & Tanggal & Tombol Solid */}
      <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2 text-[11px] text-[#4A5568]">
        <div className="flex items-center gap-2 font-medium min-w-0">
          <span className="truncate max-w-[120px] sm:max-w-[150px] text-[#1A1A1A]">
            {doc.forum}
          </span>
          <span>•</span>
          <span className="shrink-0">{doc.enactedDateFormatted}</span>
        </div>

        <span className="shrink-0 rounded bg-[#1A1A1A] text-white group-hover:bg-[#1B67BC] px-2.5 py-1 text-[11px] font-bold transition-colors">
          Buka Dokumen
        </span>
      </div>
    </article>
  );
}

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

export function DocumentCard({ document: doc }: DocumentCardProps) {
  const padding = doc.type === "SK" ? 4 : doc.type === "UU" ? 2 : 3;
  const paddedSeq = padSequence(doc.sequenceNumber, padding);
  const detailHref = `/produk-hukum/${doc.typeSlug}/${doc.year}/${paddedSeq}`;

  return (
    <article className="group relative flex flex-col justify-between rounded-md border border-[#A3D0EE] bg-white p-5 shadow-xs hover:shadow-md hover:border-[#1B67BC] transition-all">
      <div>
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

        {/* Nomor Resmi Monospace */}
        <div className="mb-2.5">
          <span className="font-mono text-xs font-bold text-[#1A1A1A] tracking-tight bg-[#F1F5F9] px-2.5 py-1 rounded inline-block">
            {doc.officialNumber}
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
      <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-[#4A5568]">
        <div className="flex items-center gap-2 font-medium">
          <span className="truncate max-w-[130px] sm:max-w-[160px] text-[#1A1A1A]">
            {doc.forum}
          </span>
          <span>•</span>
          <span>{doc.enactedDateFormatted}</span>
        </div>

        <span className="rounded bg-[#1A1A1A] text-white group-hover:bg-[#1B67BC] px-2.5 py-1 text-[11px] font-bold transition-colors">
          Buka Dokumen
        </span>
      </div>
    </article>
  );
}

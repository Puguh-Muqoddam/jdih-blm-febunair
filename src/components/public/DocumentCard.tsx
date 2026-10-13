import React from "react";
import Link from "next/link";
import { Calendar, Eye, Download, Building2, ArrowRight } from "lucide-react";
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
    <article className="group relative flex flex-col justify-between rounded-xl border border-[#E8DEC4] bg-white p-5 shadow-2xs hover:shadow-md hover:border-[#80691d]/50 transition-all">
      <div>
        {/* Header Kartu: Badges & Copy Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <TypeBadge type={doc.type} size="sm" />
            <StatusBadge
              status={doc.legalStatus}
              publicationState={doc.publicationState}
              size="sm"
            />
            {doc.nature && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-stone-100 text-[#6B5A48] border border-stone-200">
                {doc.nature === "A_INTERNAL" ? "Internal (A)" : "Eksternal (B)"}
              </span>
            )}
          </div>
          <CopyButton textToCopy={doc.officialNumber} showIconOnly />
        </div>

        {/* Nomor Resmi Monospace */}
        <div className="mb-2">
          <span className="font-mono text-xs font-semibold text-[#80691d] tracking-tight bg-[#FFFDF7] px-2 py-0.5 rounded border border-[#E8DEC4]/60 inline-block">
            {doc.officialNumber}
          </span>
        </div>

        {/* Judul Dokumen */}
        <h3 className="font-serif font-bold text-base text-[#3E2C1C] leading-snug group-hover:text-[#80691d] transition-colors mb-2.5">
          <Link href={detailHref} className="focus:outline-hidden">
            <span className="absolute inset-0" aria-hidden="true" />
            {doc.title}
          </Link>
        </h3>

        {/* Ringkasan Dokumen */}
        <p className="text-xs text-[#6B5A48] leading-relaxed line-clamp-2 mb-4">
          {doc.summary}
        </p>
      </div>

      {/* Footer Kartu: Metadata Forum & Tanggal & Action */}
      <div className="pt-3 border-t border-[#F2EBDA] flex items-center justify-between text-[11px] text-[#6B5A48]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1" title="Forum Penetapan">
            <Building2 className="w-3.5 h-3.5 text-[#80691d]" />
            <span className="truncate max-w-[120px] sm:max-w-[150px]">{doc.forum}</span>
          </span>
          <span className="flex items-center gap-1" title="Tanggal Penetapan">
            <Calendar className="w-3.5 h-3.5 text-[#80691d]" />
            <span>{doc.enactedDateFormatted}</span>
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-[#80691d] font-semibold group-hover:translate-x-0.5 transition-transform">
          <span>Detail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
}

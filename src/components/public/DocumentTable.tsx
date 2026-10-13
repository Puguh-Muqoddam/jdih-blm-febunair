import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Building2 } from "lucide-react";
import { LegalDocumentItem } from "@/lib/data/mock-documents";
import { TypeBadge } from "../ui/TypeBadge";
import { StatusBadge } from "../ui/StatusBadge";
import { CopyButton } from "../ui/CopyButton";
import { padSequence } from "@/lib/numbering";

interface DocumentTableProps {
  documents: LegalDocumentItem[];
}

export function DocumentTable({ documents }: DocumentTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#E8DEC4] bg-white shadow-2xs">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#F7F1E3] text-[#3E2C1C] border-b border-[#E8DEC4] font-serif font-bold text-xs uppercase tracking-wider">
          <tr>
            <th scope="col" className="py-3.5 px-4 w-[240px]">
              Nomor Resmi
            </th>
            <th scope="col" className="py-3.5 px-3 w-[70px]">
              Jenis
            </th>
            <th scope="col" className="py-3.5 px-4 min-w-[280px]">
              Judul & Tentang Produk Hukum
            </th>
            <th scope="col" className="py-3.5 px-4 w-[160px]">
              Penetapan
            </th>
            <th scope="col" className="py-3.5 px-3 w-[120px]">
              Status
            </th>
            <th scope="col" className="py-3.5 px-3 w-[80px] text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F2EBDA] text-[#3E2C1C]">
          {documents.map((doc) => {
            const padding = doc.type === "SK" ? 4 : doc.type === "UU" ? 2 : 3;
            const paddedSeq = padSequence(doc.sequenceNumber, padding);
            const detailHref = `/produk-hukum/${doc.typeSlug}/${doc.year}/${paddedSeq}`;

            return (
              <tr
                key={doc.id}
                className="hover:bg-[#FFFDF7] transition-colors group"
              >
                {/* Nomor Resmi */}
                <td className="py-3 px-4 font-mono text-[11px] font-semibold text-[#80691d]">
                  <div className="flex items-center gap-1.5">
                    <CopyButton textToCopy={doc.officialNumber} showIconOnly />
                    <span className="truncate">{doc.officialNumber}</span>
                  </div>
                  {doc.legacyNumber && (
                    <div className="text-[10px] text-[#6B5A48] mt-0.5">
                      Asli: {doc.legacyNumber}
                    </div>
                  )}
                </td>

                {/* Badge Jenis */}
                <td className="py-3 px-3">
                  <TypeBadge type={doc.type} size="sm" />
                </td>

                {/* Judul & Tentang */}
                <td className="py-3 px-4">
                  <Link
                    href={detailHref}
                    className="font-medium text-[#3E2C1C] group-hover:text-[#80691d] transition-colors hover:underline block leading-snug"
                  >
                    {doc.title}
                  </Link>
                  <p className="text-[11px] text-[#6B5A48] line-clamp-1 mt-0.5">
                    {doc.summary}
                  </p>
                </td>

                {/* Penetapan */}
                <td className="py-3 px-4 text-[11px] text-[#6B5A48]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#80691d]" />
                    <span>{doc.enactedDateFormatted}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#6B5A48] mt-0.5">
                    <Building2 className="w-3 h-3 text-[#80691d]" />
                    <span className="truncate max-w-[120px]">{doc.forum}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-3">
                  <StatusBadge
                    status={doc.legalStatus}
                    publicationState={doc.publicationState}
                    size="sm"
                  />
                </td>

                {/* Aksi */}
                <td className="py-3 px-3 text-center">
                  <Link
                    href={detailHref}
                    className="inline-flex items-center justify-center p-1.5 rounded-md text-[#80691d] hover:bg-[#F7F1E3] hover:text-[#3E2C1C] transition-colors"
                    title="Buka Lembar Dokumen"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

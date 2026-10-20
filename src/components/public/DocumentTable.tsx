import React from "react";
import Link from "next/link";
import { LegalDocumentItem } from "@/lib/data/mock-documents";
import { TypeBadge } from "../ui/TypeBadge";
import { StatusBadge } from "../ui/StatusBadge";
import { CopyButton } from "../ui/CopyButton";
import { padSequence } from "@/lib/numbering";

interface DocumentTableProps {
  documents: LegalDocumentItem[];
}

const MAX_NUMBER_CHARS = 30;

function formatShortOfficialNumber(num: string): string {
  if (num.length <= MAX_NUMBER_CHARS) return num;
  return `${num.slice(0, MAX_NUMBER_CHARS)}...`;
}

export function DocumentTable({ documents }: DocumentTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-[#A3D0EE] bg-white shadow-xs">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#C6E8F7]/50 text-[#1A1A1A] border-b border-[#A3D0EE] font-serif font-bold text-xs uppercase tracking-wider">
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
            <th scope="col" className="py-3.5 px-3 w-[90px] text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#A3D0EE]/40 text-[#1A1A1A]">
          {documents.map((doc) => {
            const padding = doc.type === "SK" ? 4 : doc.type === "UU" ? 2 : 3;
            const paddedSeq = padSequence(doc.sequenceNumber, padding);
            const detailHref = `/produk-hukum/${doc.typeSlug}/${doc.year}/${paddedSeq}`;

            return (
              <tr
                key={doc.id}
                className="hover:bg-[#C6E8F7]/20 transition-colors group"
              >
                {/* Nomor Resmi */}
                <td className="py-3 px-4 font-mono text-[11px] font-semibold text-[#1B67BC] max-w-[240px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <CopyButton textToCopy={doc.officialNumber} showIconOnly />
                    <span
                      title={doc.officialNumber}
                      className="truncate max-w-[190px]"
                    >
                      {formatShortOfficialNumber(doc.officialNumber)}
                    </span>
                  </div>
                  {doc.legacyNumber && (
                    <div
                      title={doc.legacyNumber}
                      className="text-[10px] text-[#4A5568] mt-0.5 truncate max-w-[210px]"
                    >
                      Asli: {formatShortOfficialNumber(doc.legacyNumber)}
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
                    className="font-medium text-[#1A1A1A] group-hover:text-[#1B67BC] transition-colors hover:underline block leading-snug"
                  >
                    {doc.title}
                  </Link>
                  <p className="text-[11px] text-[#4A5568] line-clamp-1 mt-0.5">
                    {doc.summary}
                  </p>
                </td>

                {/* Penetapan */}
                <td className="py-3 px-4 text-[11px] text-[#4A5568]">
                  <div className="font-semibold text-[#1A1A1A]">
                    {doc.enactedDateFormatted}
                  </div>
                  <div className="text-[10px] text-[#4A5568] mt-0.5 truncate max-w-[130px]">
                    {doc.forum}
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
                    className="inline-block px-2.5 py-1 rounded bg-[#1A1A1A] text-white hover:bg-[#1B67BC] text-[11px] font-bold transition-colors"
                  >
                    Buka
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

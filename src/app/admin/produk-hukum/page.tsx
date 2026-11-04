import React from "react";
import type { Metadata } from "next";
import { getAllAdminDocuments } from "@/lib/data/public-documents";
import { AdminProdukHukumClient } from "./AdminProdukHukumClient";

export const metadata: Metadata = {
  title: "Kelola Produk Hukum | JDIH BLM FEB UNAIR",
  description:
    "Manajemen data dan arsip seluruh produk hukum resmi Departemen Legislasi BLM FEB UNAIR.",
};

export default async function AdminProdukHukumPage() {
  const documents = await getAllAdminDocuments();

  return <AdminProdukHukumClient initialDocuments={documents} />;
}

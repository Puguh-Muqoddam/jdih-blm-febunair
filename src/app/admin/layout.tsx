import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminLayoutClient } from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "Panel Pengurus | JDIH BLM FEB UNAIR",
  description:
    "Dasbor pengelolaan internal produk hukum Departemen Legislasi BLM FEB Universitas Airlangga.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";

  // Jangan memproteksi halaman /admin/login agar tidak terjadi redirect loop
  if (pathname !== "/admin/login") {
    const hasSupabaseConfig =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
      Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
      );

    if (hasSupabaseConfig || process.env.NODE_ENV === "production") {
      const session = await getAdminSession();
      if (!session) {
        redirect("/admin/login");
      }
    }
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

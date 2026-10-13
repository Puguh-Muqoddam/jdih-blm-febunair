import "server-only";
import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// =============================================================================
// JDIH BLM FEB UNAIR - Modul Autentikasi & Otorisasi Admin (Auth Guard)
// Referensi: IMPLEMENTATION_PLAN.md §1.1, §5.2, §12
//
// Aturan Keamanan Utama:
// 1. Akun admin dibatasi ketat melalui allowlist email.
// 2. Akun Super Admin kanonikal: puguhmuqoddam151@gmail.com.
// 3. Verifikasi sesi dilakukan berlapis di middleware dan setiap Server Action.
// =============================================================================

export const CANONICAL_SUPER_ADMIN_EMAIL = "puguhmuqoddam151@gmail.com";

export interface AdminSession {
  userId: string;
  email: string;
  role: "SUPER_ADMIN" | "EDITOR";
}

/**
 * Mengecek apakah alamat email termasuk dalam daftar izin admin.
 */
export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();

  const allowedList = [
    CANONICAL_SUPER_ADMIN_EMAIL.toLowerCase(),
    ...(process.env.SUPER_ADMIN_EMAILS
      ? process.env.SUPER_ADMIN_EMAILS.split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean)
      : []),
  ];

  return allowedList.includes(cleanEmail);
}

/**
 * Membuat klien Supabase SSR untuk membaca sesi terenkripsi dari cookies Next.js.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Dipanggil dari Server Component atau route handler read-only
        }
      },
    },
  });
}

/**
 * Mengambil sesi admin saat ini jika terautentikasi dan memiliki izin.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  // 1. Cek header authorization (untuk API/token call)
  const headerList = await headers();
  const authHeader = headerList.get("authorization");

  // Mode Pengujian & Local Bypass (Hanya jika disetel eksplisit via env)
  if (process.env.NODE_ENV === "test" && process.env.MOCK_TEST_ADMIN_EMAIL) {
    const testEmail = process.env.MOCK_TEST_ADMIN_EMAIL.toLowerCase();
    if (isAllowedAdminEmail(testEmail)) {
      return {
        userId: "test-super-admin-id",
        email: testEmail,
        role: "SUPER_ADMIN",
      };
    }
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    // Jika Supabase belum dikonfigurasi di environment, periksa apakah ada header dev khusus
    if (process.env.NODE_ENV === "development" && process.env.DEV_BYPASS_ADMIN === "true") {
      return {
        userId: "dev-admin-id",
        email: CANONICAL_SUPER_ADMIN_EMAIL,
        role: "SUPER_ADMIN",
      };
    }
    return null;
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return null;
    }

    const email = user.email.toLowerCase();
    if (!isAllowedAdminEmail(email)) {
      return null;
    }

    const isSuperAdmin = email === CANONICAL_SUPER_ADMIN_EMAIL.toLowerCase();

    return {
      userId: user.id,
      email,
      role: isSuperAdmin ? "SUPER_ADMIN" : "EDITOR",
    };
  } catch {
    return null;
  }
}

/**
 * Guard wajib: Melempar error jika sesi admin tidak valid atau tidak berizin.
 * Digunakan pada awal setiap Server Action mutasi produk hukum.
 */
export async function requireSuperAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();

  if (!session) {
    throw new Error(
      "Akses Ditolak: Anda harus masuk dengan akun pengelola yang terdaftar (puguhmuqoddam151@gmail.com)."
    );
  }

  if (session.role !== "SUPER_ADMIN" && session.email !== CANONICAL_SUPER_ADMIN_EMAIL.toLowerCase()) {
    throw new Error(
      "Akses Terbatas: Operasi ini hanya dapat dilakukan oleh Super Admin BLM FEB UNAIR."
    );
  }

  return session;
}

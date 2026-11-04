"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  evaluateAdminAuthorization,
  isAllowedAdminEmail,
  type DbAdminUserLike,
} from "@/lib/auth";
import { getDb, isDbConfigured } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().email("Format alamat email tidak valid."),
  password: z.string().min(6, "Kata sandi minimal 6 karakter."),
});

export async function loginAdminAction(rawInput: unknown) {
  const parsed = loginSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Data login tidak valid.",
    };
  }

  const email = parsed.data.email.trim().toLowerCase();
  const password = parsed.data.password;

  // Cek allowlist awal sebelum memanggil Supabase Auth
  if (!isAllowedAdminEmail(email)) {
    return {
      success: false,
      error:
        "AKSES DITOLAK (403): Email Anda tidak terdaftar dalam Allowlist Pengurus Departemen Legislasi BLM FEB UNAIR.",
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.DEV_BYPASS_ADMIN === "true"
    ) {
      return { success: true };
    }
    return {
      success: false,
      error:
        "Layanan autentikasi Supabase belum dikonfigurasi (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    };
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, any> }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return {
        success: false,
        error: "Email atau kata sandi salah, atau akun belum terdaftar di Supabase Auth.",
      };
    }

    if (!data.user.email_confirmed_at) {
      await supabase.auth.signOut();
      return {
        success: false,
        error:
          "AKSES DITOLAK: Alamat email Anda belum diverifikasi (email_confirmed_at kosong). Hubungi Super Admin.",
      };
    }

    let dbAdmin: DbAdminUserLike | null = null;
    if (await isDbConfigured()) {
      try {
        const db = await getDb();
        const found = await db.adminUser.findUnique({ where: { email } });
        if (found) {
          dbAdmin = {
            id: found.id,
            email: found.email,
            name: found.name || "Pengurus",
            role: found.role,
            isActive: found.isActive,
          };
        }
      } catch {
        // Fallback ke allowlist jika DB belum terjangkau
      }
    }

    const session = evaluateAdminAuthorization(data.user, dbAdmin);
    if (!session) {
      await supabase.auth.signOut();
      return {
        success: false,
        error:
          "AKSES DITOLAK (403): Akun Anda tidak memiliki otorisasi aktif sebagai pengurus Departemen Legislasi.",
      };
    }

    return {
      success: true,
      user: {
        email: session.email,
        name: session.name,
        role: session.role,
      },
    };
  } catch {
    return {
      success: false,
      error: "Terjadi gangguan jaringan saat menghubungi server autentikasi.",
    };
  }
}

export async function logoutAdminAction() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: Record<string, any> }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      });
      await supabase.auth.signOut();
    } catch {
      // Abaikan
    }
  }
  return { success: true };
}

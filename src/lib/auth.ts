import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getDb, isDbConfigured } from "@/lib/db";

// =============================================================================
// JDIH BLM FEB UNAIR - Modul Autentikasi & Otorisasi Admin
// Referensi: IMPLEMENTATION_PLAN.md §9 (Keamanan Berlapis & Allowlist Ketat)
//
// Aturan Keamanan:
// 1. Wajib email terverifikasi (email_confirmed_at tidak boleh null/kosong).
// 2. Diikat ke tabel AdminUser (isActive = true), user.id (SUPER_ADMIN_USER_IDS),
//    app_metadata.role, atau allowlist kanonikal Super Admin.
// 3. Super Admin utama kanonikal: puguhmuqoddam151@gmail.com
// =============================================================================

export const CANONICAL_SUPER_ADMIN_EMAIL = "puguhmuqoddam151@gmail.com";

export type AdminRole = "SUPER_ADMIN" | "EDITOR";

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  emailConfirmedAt?: string;
}

export interface SupabaseAuthUserLike {
  id: string;
  email?: string | null;
  email_confirmed_at?: string | null;
  user_metadata?: {
    full_name?: string;
    name?: string;
    [key: string]: any;
  } | null;
  app_metadata?: {
    role?: string;
    [key: string]: any;
  } | null;
}

export interface DbAdminUserLike {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
}

/**
 * Mengambil daftar email yang diizinkan sebagai Super Admin dari environment variable
 * ditambah email Super Admin kanonikal utama.
 */
export function getSuperAdminAllowlist(): string[] {
  const envList = process.env.SUPER_ADMIN_EMAILS || "";
  const parsed = envList
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!parsed.includes(CANONICAL_SUPER_ADMIN_EMAIL)) {
    parsed.push(CANONICAL_SUPER_ADMIN_EMAIL);
  }
  return parsed;
}

/**
 * Mengambil daftar email Editor tambahan dari environment variable (opsional).
 */
export function getEditorAllowlist(): string[] {
  const envList = process.env.ADMIN_EDITOR_EMAILS || process.env.ADMIN_EMAILS || "";
  return envList
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Mengambil daftar UUID user Supabase yang dipatok sebagai Super Admin (opsional).
 */
export function getSuperAdminUserIds(): string[] {
  const envIds = process.env.SUPER_ADMIN_USER_IDS || "";
  return envIds
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/**
 * Mengecek apakah sebuah email diizinkan masuk ke panel /admin.
 */
export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  const superAdmins = getSuperAdminAllowlist();
  const editors = getEditorAllowlist();
  return superAdmins.includes(cleanEmail) || editors.includes(cleanEmail);
}

/**
 * Mengevaluasi otorisasi admin secara ketat:
 * 1. Wajib memiliki email dan email_confirmed_at (email sudah diverifikasi).
 * 2. Jika ada record di tabel AdminUser dan isActive === false, tolak akses.
 * 3. Tentukan role dari AdminUser DB, app_metadata.role, SUPER_ADMIN_USER_IDS, atau allowlist.
 */
export function evaluateAdminAuthorization(
  user: SupabaseAuthUserLike | null | undefined,
  dbAdmin?: DbAdminUserLike | null
): AdminSession | null {
  if (!user || !user.id || !user.email) {
    return null;
  }

  // WAJIB: Email harus sudah dikonfirmasi (mencegah unverified email spoofing)
  if (!user.email_confirmed_at) {
    return null;
  }

  const cleanEmail = user.email.trim().toLowerCase();

  // Jika pengguna terdaftar di tabel AdminUser tetapi dinonaktifkan, tolak mutlak
  if (dbAdmin && !dbAdmin.isActive) {
    return null;
  }

  const pinnedUserIds = getSuperAdminUserIds();
  const isPinnedUserId = pinnedUserIds.length > 0 && pinnedUserIds.includes(user.id);
  const appMetaRole = user.app_metadata?.role;
  const hasAppMetaAdminRole = appMetaRole === "SUPER_ADMIN" || appMetaRole === "EDITOR";
  const inEmailAllowlist = isAllowedAdminEmail(cleanEmail);
  const inActiveDbRecord = Boolean(dbAdmin && dbAdmin.isActive);

  // Jika SUPER_ADMIN_USER_IDS disetel dan email adalah super admin kanonikal, pastikan cocok atau ada di DB/allowlist
  if (!inActiveDbRecord && !isPinnedUserId && !hasAppMetaAdminRole && !inEmailAllowlist) {
    return null;
  }

  const superAdmins = getSuperAdminAllowlist();
  let role: AdminRole = "EDITOR";

  if (dbAdmin && dbAdmin.isActive) {
    role = dbAdmin.role;
  } else if (isPinnedUserId || appMetaRole === "SUPER_ADMIN" || superAdmins.includes(cleanEmail)) {
    role = "SUPER_ADMIN";
  }

  const displayName =
    dbAdmin?.name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    (role === "SUPER_ADMIN"
      ? "Puguh Muqoddam (Super Admin)"
      : "Pengurus Departemen Legislasi");

  return {
    id: user.id,
    email: cleanEmail,
    name: displayName,
    role,
    emailConfirmedAt: user.email_confirmed_at,
  };
}

/**
 * Mengambil sesi pengguna admin saat ini.
 * Memverifikasi token JWT Supabase + email_confirmed_at + tabel AdminUser / allowlist.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  // Fallback terkontrol khusus lingkungan pengembangan lokal (JANGAN aktif di production)
  if (!supabaseUrl || !supabaseAnonKey) {
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.DEV_BYPASS_ADMIN === "true"
    ) {
      return {
        id: "dev-super-admin-01",
        email: CANONICAL_SUPER_ADMIN_EMAIL,
        name: "Puguh Muqoddam (Super Admin)",
        role: "SUPER_ADMIN",
        emailConfirmedAt: new Date().toISOString(),
      };
    }
    return null;
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, any> }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Diabaikan jika dipanggil dari Server Component murni
          }
        },
      },
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email || !user.email_confirmed_at) {
      return null;
    }

    const cleanEmail = user.email.trim().toLowerCase();

    // Cek tabel AdminUser di database jika DB terkonfigurasi
    let dbAdmin: DbAdminUserLike | null = null;
    if (await isDbConfigured()) {
      try {
        const db = await getDb();
        const found = await db.adminUser.findUnique({
          where: { email: cleanEmail },
        });
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
        // Jika koneksi DB sedang lambat/gagal, fallback ke verifikasi allowlist + email_confirmed_at
      }
    }

    return evaluateAdminAuthorization(user, dbAdmin);
  } catch {
    return null;
  }
}

/**
 * Guard wajib untuk Server Actions & Route Handlers admin.
 * Melempar Error 401/403 jika pengguna belum masuk atau bukan admin resmi.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error(
      "AKSES DITOLAK (403): Hanya pengurus Departemen Legislasi dengan email terverifikasi yang terdaftar dalam allowlist yang diizinkan melakukan tindakan ini."
    );
  }
  return session;
}

/**
 * Guard khusus tindakan kritis yang hanya boleh dilakukan oleh SUPER_ADMIN.
 */
export async function requireSuperAdmin(): Promise<AdminSession> {
  const session = await requireAdmin();
  if (session.role !== "SUPER_ADMIN") {
    throw new Error(
      "AKSES DITOLAK (403): Tindakan ini membutuhkan otorisasi tingkat SUPER_ADMIN."
    );
  }
  return session;
}

import { NextResponse, type NextRequest } from "next/server";

// =============================================================================
// JDIH BLM FEB UNAIR - Route Middleware
// Proteksi rute administrasi internal di level edge
// =============================================================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lewatkan halaman login admin
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Proteksi semua rute /admin/*
  if (pathname.startsWith("/admin")) {
    // Periksa cookie auth Supabase (awalan "sb-" atau cookie sesi kustom)
    const allCookies = request.cookies.getAll();
    const hasSupabaseAuth = allCookies.some(
      (c: { name: string }) => c.name.startsWith("sb-") && c.name.includes("-auth-token")
    );

    // Di mode pengembangan atau jika token auth tidak ditemukan, arahkan ke login jika tidak ada bypass
    const isDev = process.env.NODE_ENV === "development";
    const allowDevBypass = process.env.DEV_BYPASS_ADMIN === "true";

    if (!hasSupabaseAuth && !(isDev && allowDevBypass)) {
      // Izinkan akses login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      // Untuk kemudahan pratinjau lokal tanpa DB/Supabase aktif, lewati jika belum disetel
      const hasSupabaseConfig =
        Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
        Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

      if (hasSupabaseConfig) {
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

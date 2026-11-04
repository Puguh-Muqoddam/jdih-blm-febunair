import { NextResponse, type NextRequest } from "next/server";

// =============================================================================
// JDIH BLM FEB UNAIR - Route Middleware
// Proteksi lapis pertama rute administrasi di level edge + penerusan x-pathname
// (Verifikasi kriptografi penuh JWT + email_confirmed_at dilakukan di layout.tsx)
// =============================================================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Lewatkan halaman login admin tanpa redirect
  if (pathname === "/admin/login") {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Proteksi awal rute /admin/*
  if (pathname.startsWith("/admin")) {
    const allCookies = request.cookies.getAll();
    const hasSupabaseAuth = allCookies.some(
      (c: { name: string }) => c.name.startsWith("sb-") && c.name.includes("-auth-token")
    );

    const isDev = process.env.NODE_ENV === "development";
    const allowDevBypass = process.env.DEV_BYPASS_ADMIN === "true";

    if (!hasSupabaseAuth && !(isDev && allowDevBypass)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);

      const hasSupabaseConfig =
        Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
        Boolean(
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
        );

      if (hasSupabaseConfig || process.env.NODE_ENV === "production") {
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};

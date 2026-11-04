import { NextResponse, type NextRequest } from "next/server";

// =============================================================================
// JDIH BLM FEB UNAIR - Route Middleware
// 1. Blokir agresif AI bot & LLM scraper di level Edge (hemat kuota & CPU Worker)
// 2. Proteksi lapis pertama rute administrasi di level edge + penerusan x-pathname
// (Verifikasi kriptografi penuh JWT + email_confirmed_at dilakukan di layout.tsx)
// =============================================================================

// Pola bot AI, scraper tanpa izin, dan perayap agresif yang menghabiskan limit Worker
const BLOCKED_AI_BOT_REGEX =
  /\b(bytespider|gptbot|chatgpt-user|claudebot|anthropic-ai|claude-web|ccbot|cohere-ai|diffbot|facebookbot|meta-externalagent|google-extended|perplexitybot|amazonbot|applebot-extended|omgilibot|imagesiftbot|youbot|dataforseobot)\b/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  // Blokir bot AI segera di level Edge tanpa menyentuh komputasi Next.js / database
  if (BLOCKED_AI_BOT_REGEX.test(userAgent)) {
    return new Response(
      "Forbidden: AI training crawlers and automated scraping bots are not permitted on this portal.",
      {
        status: 403,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
        },
      }
    );
  }

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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

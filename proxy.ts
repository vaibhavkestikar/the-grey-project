import { AUTH_RECOVERY_COOKIE } from "@/lib/auth/recovery";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  "/learning/foundations-of-ai/module-1",
  "/learning/foundations-of-ai/module-2",
];

function getCanonicalHost(): string | null {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return null;
  try {
    return new URL(siteUrl).host;
  } catch {
    return null;
  }
}

function shouldBypassCanonicalRedirect(host: string): boolean {
  return (
    host.startsWith("localhost") ||
    host.endsWith(".vercel.app") ||
    host.includes("127.0.0.1")
  );
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasAuthCode = request.nextUrl.searchParams.has("code");
  const hasTokenHash = request.nextUrl.searchParams.has("token_hash");
  const isRecoveryFlow =
    request.cookies.get(AUTH_RECOVERY_COOKIE)?.value === "1";

  const canonicalHost = getCanonicalHost();
  if (
    canonicalHost &&
    request.nextUrl.host !== canonicalHost &&
    !shouldBypassCanonicalRedirect(request.nextUrl.host)
  ) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.host = canonicalHost;
    canonicalUrl.protocol = "https:";
    return NextResponse.redirect(canonicalUrl);
  }

  if (
    isRecoveryFlow &&
    pathname !== "/reset-password" &&
    !pathname.startsWith("/auth/callback")
  ) {
    return NextResponse.redirect(new URL("/reset-password", request.url));
  }

  // Supabase sometimes lands auth params on the site root. Forward to callback pages.
  if (
    (hasAuthCode || hasTokenHash) &&
    !pathname.startsWith("/auth/callback")
  ) {
    const callbackUrl = request.nextUrl.clone();
    const type = request.nextUrl.searchParams.get("type");
    const isRecovery = type === "recovery";
    callbackUrl.pathname = isRecovery
      ? "/auth/callback/recovery"
      : "/auth/callback";
    if (isRecovery && !callbackUrl.searchParams.has("type")) {
      callbackUrl.searchParams.set("type", "recovery");
    } else if (
      type === "email_change" &&
      callbackUrl.pathname === "/auth/callback" &&
      !callbackUrl.searchParams.has("type")
    ) {
      callbackUrl.searchParams.set("type", "email_change");
    }
    return NextResponse.redirect(callbackUrl);
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next({ request });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

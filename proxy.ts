import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PAID_CURIOUS_BUILDERS_SLUGS = new Set([
  "classical-vs-ml",
  "prompting",
  "tokens-embeddings",
  "neurons",
  "hallucinations",
  "ml-workflow",
]);

function getCuriousBuildersLessonSlug(pathname: string): string | null {
  const match = pathname.match(/^\/learning\/curious-builders\/([^/]+)$/);
  if (!match) return null;
  return match[1];
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasAuthCode = request.nextUrl.searchParams.has("code");
  const hasTokenHash = request.nextUrl.searchParams.has("token_hash");

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

  const lessonSlug = getCuriousBuildersLessonSlug(pathname);
  const requiresAuth =
    lessonSlug !== null && PAID_CURIOUS_BUILDERS_SLUGS.has(lessonSlug);

  if (!requiresAuth) {
    return NextResponse.next({ request });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
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
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
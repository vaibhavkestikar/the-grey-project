import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  "/learning/foundations-of-ai/module-1",
  "/learning/foundations-of-ai/module-2",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasAuthCode = request.nextUrl.searchParams.has("code");
  const hasTokenHash = request.nextUrl.searchParams.has("token_hash");

  // Supabase sometimes lands auth params on the site root. Forward to our callback routes.
  if (
    (hasAuthCode || hasTokenHash) &&
    !pathname.startsWith("/auth/callback")
  ) {
    const callbackUrl = request.nextUrl.clone();
    const type = request.nextUrl.searchParams.get("type");
    callbackUrl.pathname =
      type === "recovery" ? "/auth/callback/recovery" : "/auth/callback";
    return NextResponse.redirect(callbackUrl);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return response;
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

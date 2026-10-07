import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
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

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

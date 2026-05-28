import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function proxy(
  request: NextRequest
) {

  const token =
    request.cookies.get(
      "sb-access-token"
    );

  const protectedRoutes = [
    "/learning/foundations-of-ai/module-1",
    "/learning/foundations-of-ai/module-2",
  ];

  const isProtected =
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(
        route
      )
    );

  if (
    isProtected &&
    !token
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );

  }

  return NextResponse.next();
}

export const config = {

  matcher: [
    "/learning/:path*",
  ],

};
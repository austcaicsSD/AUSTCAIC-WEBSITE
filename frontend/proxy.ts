import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/cookie-name";
import { verifySessionToken } from "@/lib/auth/tokens";

// First of three gates. Signature check only - no DB access here.
// The authoritative check lives in app/admin/(dashboard)/layout.tsx.
export async function proxy(request: NextRequest) {
  // Admin sign-in moved onto the public /login page; without this an old
  // bookmark reaches the auth check, passes it, and lands on a 404.
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/login?as=admin", request.url));
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const claims = token
    ? await verifySessionToken(token, process.env.AUTH_SECRET ?? "")
    : null;

  if (!claims) {
    return NextResponse.redirect(new URL("/login?as=admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

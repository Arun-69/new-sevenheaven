import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicAdminRoute = pathname === "/admin/login";
  const isPublicAdminApi = pathname === "/api/admin/login";

  const isProtectedPage = pathname.startsWith("/admin") && !isPublicAdminRoute;
  const isProtectedApi =
    pathname.startsWith("/api/admin") && !isPublicAdminApi;

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = await isValidSessionToken(session);

  if (authenticated) {
    return NextResponse.next();
  }

  if (isProtectedApi) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

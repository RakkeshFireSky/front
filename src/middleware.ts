import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
    console.log("Middleware Token:", token);
  const isAuthPage = req.nextUrl.pathname.startsWith("/sign-in");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/text-summarize");

  // 🚫 Not logged in → block protected routes
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/sign-in", req.url)
    );
  }

  // 🔁 Logged in → prevent access to auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/text-summarize", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/text-summarize",
    "/text-summarize/:path*",
    "/sign-in",
  ],
};


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const authRoutes = ["/login"];
  const protectedRoutes = ["/dashboard", "/onboarding"];

  if (token && authRoutes.includes(pathname)) {
    // If user has token and tries to access login page,
    // redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    // If user has no token and tries to access protected routes,
    // redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configure which routes should be handled by this middleware
export const config = {
  matcher: ["/login", "/dashboard", "/onboarding"],
};

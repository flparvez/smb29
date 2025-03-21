import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // If user is logged in and tries to access /login or /register, redirect to dashboard
    if (token && (pathname === "/" || pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    // Public pages accessible without login
    const publicPaths = ["/", "/login", "/register"];
    if (!token && !publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Protect /admin route (only admin can access)
    if (pathname.startsWith("/admin")) {
      if (!token || !token.admin) {  // Check the 'admin' field in the token
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }

    // Proceed for other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};

import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("userToken");

  // Authentication-based redirects
  if (token && request.nextUrl.pathname === "/") {
    console.log("Token exists, redirected to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  
  if (!token && request.nextUrl.pathname === "/") {
    console.log("No token, redirected to /login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  
  if (!token && request.nextUrl.pathname === "/dashboard") {
    console.log("No token, redirected to /login from /dashboard");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (token && request.nextUrl.pathname === "/login") {
    console.log("Token exists, redirected to /dashboard from /login");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

// Corrected matcher for API routes and specific pages
export const config = {
  matcher: ["/", "/dashboard", "/login"], // Use '/api/:path*' to match all API routes
};

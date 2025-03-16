import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("userToken");

  // Set CORS headers for all API requests
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*"); // Replace with your frontend domain for security
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle OPTIONS (preflight) request for CORS
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

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

  return res;
}

// Corrected matcher for API routes and specific pages
export const config = {
  matcher: ["/", "/dashboard", "/login", "/api/:path*"], // Use '/api/:path*' to match all API routes
};

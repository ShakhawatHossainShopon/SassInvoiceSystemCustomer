import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("userToken");
  if (token && request.nextUrl.pathname === "/") {
    console.log("have token path / rederected to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  if (!token && request.nextUrl.pathname === "/") {
    console.log("dont have token path / rederected to /login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  // If no token and trying to access `/dashboard`, redirect to `/login`
  if (!token && request.nextUrl.pathname === "/dashboard") {
    console.log("Not have token path /dashboard rederected to /login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If there is a token and trying to access `/login`, redirect to `/dashboard`
  if (token && request.nextUrl.pathname === "/login") {
    console.log("have token path /login rederected to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply middleware to `/dashboard` and `/login` routes
export const config = {
  matcher: ["/", "/dashboard", "/login"],
};

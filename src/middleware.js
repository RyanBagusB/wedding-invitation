import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const authPaths = ["/authentication/login"]; // hanya guest boleh akses
const protectedPaths = ["/dashboard"]; // butuh login
const publicPaths = ["/rsvp"]; // bebas

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // --- Guest only ---
  if (token && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // --- Protected ---
  if (!token && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  // --- Public ---
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // default → izinkan
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

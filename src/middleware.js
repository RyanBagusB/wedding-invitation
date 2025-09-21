import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const guestOnlyPaths = ["/authentication/login"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token && !guestOnlyPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  if (token && guestOnlyPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};

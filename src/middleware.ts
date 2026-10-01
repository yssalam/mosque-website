import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  const { pathname } = request.nextUrl;

  // Dashboard wajib login
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.delete("session");

      return response;
    }
  }

  // Kalau sudah login, jangan bisa buka /login lagi
  if (pathname === "/login" && token) {
    try {
      await jwtVerify(token, secret);

      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
      // token invalid → biarkan masuk login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

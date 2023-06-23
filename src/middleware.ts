import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { StorageKeys } from "./constants";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(StorageKeys.ACCESS_TOKEN)?.value;
  const requirePasswordChange = request.cookies.get(StorageKeys.REQUIRE_PASSWORD_CHANGE)?.value;

  let cart: any = request.cookies.get(StorageKeys.CART)?.value;
  cart = cart ? JSON.parse(cart) : {};

  if (request.nextUrl.pathname.startsWith("/login") && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/change-password") && !requirePasswordChange) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/checkout") && !cart?.items?.length) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/change-password", "/checkout", "/dashboard/:path*"],
};

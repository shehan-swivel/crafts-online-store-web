import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { StorageKeys } from "./constants";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(StorageKeys.ACCESS_TOKEN)?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};

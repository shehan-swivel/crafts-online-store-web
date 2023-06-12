// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     console.log("token: ", req.nextauth.token);

//     if (req.nextUrl.pathname.startsWith("/dashboard") /*&& req.nextauth.token?.role !== "ADMIN"*/)
//       return NextResponse.rewrite(new URL("/login?message=You Are Not Authorized!", req.url));
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};

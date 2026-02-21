// import { NextResponse } from "next/server";

// export function middleware(request: any) {
//   const token = request.localStorage.get("token")?.value;

//   const url = request.nextUrl.pathName;

//   if (url.startsWith("/dashboard")) {
//     if (!token) {
//       return NextResponse.redirect(new url("/signin", request.url));
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/contests/:path*"],
// };

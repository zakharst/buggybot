import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyBasicAuth } from "@/lib/basic-auth";

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const pass = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  if (!user || !pass) {
    return new NextResponse(
      "Admin is not configured. Set ADMIN_BASIC_AUTH_USER and ADMIN_BASIC_AUTH_PASSWORD.",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const ok = verifyBasicAuth(req.headers.get("authorization"), user, pass);
  if (ok) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Buggybot Admin"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

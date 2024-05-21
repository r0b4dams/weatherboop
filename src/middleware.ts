import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)", "/assets(.*)"],
};

const isPublic = createRouteMatcher("/");

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const pathname = new URL(req.url).pathname;

  if (userId) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/map", req.url));
    }
  } else if (!isPublic(req)) {
    if (pathname.startsWith("/api") || pathname.startsWith("/assets")) {
      return Response.json({ message: "unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
});

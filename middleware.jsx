import { NextRequest, NextResponse } from "next/server";
import { isUserAuthenticated } from "./session";

// Define routes that require authentication
const protectedRoutes = ["/employers-dashboard/user-list"]
// const protectedRoutes = ["/employers-dashboard/user-list", "/employers-dashboard/client-list", "/employers-dashboard/job-posts", "/employers-dashboard/all-applicants"];

export default function middleware(req) {
  // Check if the user is not authenticated and the route is protected
  if (!isUserAuthenticated() && protectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to the home page if not authenticated
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  
  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

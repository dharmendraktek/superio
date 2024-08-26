import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';  // Import the cookie parsing function

// Define routes that require authentication
const protectedRoutes = ["/employers-dashboard/dashboard" ,"/employers-dashboard/user-list", '/employers-dashboard/client-list', '/employers-dashboard/job-posts', '/employers-dashboard/all-applicants', '/employers-dashboard/job-posts/add-job-posts'];

// Middleware function
export default function middleware(req) {
  // Extract the cookie header from the request
  const cookieHeader = req.headers.get('cookie') || ''; // Get the cookie header from the request
  const cookies = parse(cookieHeader); // Parse the cookie header to an object

  const token = cookies.is_user_token; // Retrieve the token from the parsed cookies

  // Replace this with your actual authentication check logic
  const isUserAuthenticated = (token) => {
    // For example, check if the token exists and is valid
    return !!token;
  };

  // Check if the user is not authenticated and the route is protected
  if (!isUserAuthenticated(token) && protectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to the home page if not authenticated
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  
  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

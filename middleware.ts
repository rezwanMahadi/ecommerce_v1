// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
  
//   // Handle root path redirection for authorized users
//   if (req.nextUrl.pathname === "/") {
//     const token = await getToken({ req });
//     if (token) {
//       return NextResponse.redirect(new URL("/home", req.url));
//     }
//   }
// }  
//     // Specify which routes should be protected
// export const config = {
//   matcher: ["/home", "/dashboard/:path*"]
// }; 

import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ROLES, ROUTE_GUARDS } from '@/lib/constants'

// Cached route patterns for better performance
const adminOnlyPatterns = ROUTE_GUARDS.ADMIN_ONLY.map(route => new RegExp(`^${route}`));
const authenticatedPatterns = ROUTE_GUARDS.AUTHENTICATED.map(route => new RegExp(`^${route}`));
const unauthenticatedOnlyPatterns = ROUTE_GUARDS.UNAUTHENTICATED_ONLY.map(route => new RegExp(`^${route}`));
const publicPatterns = ROUTE_GUARDS.PUBLIC.map(route => new RegExp(`^${route}`));

// Helper function for faster route matching using RegExp
function matchesRoutePattern(path: string, patterns: RegExp[]): boolean {
  return patterns.some(pattern => pattern.test(path));
}

// Static patterns that we can quickly check without regex
const STATIC_PATTERNS = {
  API: '/api/',
  NEXT: '/_next',
  STATIC_FILES: /\.(ico|png|jpg|jpeg|svg|css|js)$/,
};

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl
  
  // Skip route protection for static files and API routes (handled separately) - fast early return
  if (
    pathname.startsWith(STATIC_PATTERNS.NEXT) ||
    pathname.startsWith(STATIC_PATTERNS.API) ||
    STATIC_PATTERNS.STATIC_FILES.test(pathname)
  ) {
    return NextResponse.next()
  }
  
  // Special case for homepage - fast path for better performance
  if (pathname === '/') {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    if (token) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  }
  
  // Get the token (only when needed)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  
  const isAuthenticated = !!token
  const userRole = token?.role as string || ''
  
  // Get route types for the current path using faster RegExp matching
  const isAdminOnlyRoute = matchesRoutePattern(pathname, adminOnlyPatterns);
  const isAuthenticatedRoute = matchesRoutePattern(pathname, authenticatedPatterns);
  const isUnauthenticatedOnlyRoute = matchesRoutePattern(pathname, unauthenticatedOnlyPatterns);
  const isPublicRoute = matchesRoutePattern(pathname, publicPatterns);
  
  // 1. User is authenticated - optimize the common case first
  if (isAuthenticated) {
    // Protect admin-only routes - requires ADMIN role
    if (isAdminOnlyRoute && userRole !== ROLES.ADMIN) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // Redirect already authenticated users away from auth pages
    if (isUnauthenticatedOnlyRoute) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    
    // All other routes are accessible to authenticated users
    return NextResponse.next()
  }
  
  // 2. User is NOT authenticated
  if (!isAuthenticated) {
    // Allow public routes and auth pages
    if (isPublicRoute || isUnauthenticatedOnlyRoute) {
      return NextResponse.next()
    }
    
    // Block access to protected routes - Redirect to login with return URL
    if (isAuthenticatedRoute || isAdminOnlyRoute) {
      const returnUrl = encodeURIComponent(pathname)
      return NextResponse.redirect(new URL(`/signin?returnUrl=${returnUrl}`, request.url))
    }
  }
  
  // For any routes not handled above, let them pass through
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
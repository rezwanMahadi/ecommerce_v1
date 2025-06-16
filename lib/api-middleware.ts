import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ROLES, UserRole } from '@/lib/constants';

type RouteHandler = (req: NextRequest) => Promise<NextResponse>;

interface AuthOptions {
  throwError?: boolean;
  message?: string;
}

// Simple in-memory rate limiting cache
// In production, consider using Redis or other distributed cache
interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const rateLimitCache = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX = 60; // 60 requests per minute
const RATE_LIMIT_CLEANUP_INTERVAL = 5 * 60 * 1000; // Clean up every 5 minutes

// Clean up expired rate limit entries periodically
if (typeof global !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitCache.entries()) {
      if (now - entry.timestamp > RATE_LIMIT_WINDOW) {
        rateLimitCache.delete(key);
      }
    }
  }, RATE_LIMIT_CLEANUP_INTERVAL);
}

/**
 * Adds the authenticated user to the request context
 */
export async function getUserFromRequest(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return null;
  
  return {
    id: token.id as string,
    email: token.email as string,
    name: token.name as string,
    role: token.role as UserRole,
  };
}

/**
 * Middleware to ensure user is authenticated
 */
export function withAuth(handler: RouteHandler, options?: AuthOptions): RouteHandler {
  return async (req: NextRequest) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      return NextResponse.json(
        { error: options?.message || 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }
    
    // Add user to request object for route handlers
    (req as any).user = {
      id: token.id,
      email: token.email,
      name: token.name,
      role: token.role,
    };
    
    return handler(req);
  };
}

/**
 * Middleware to ensure user has specific role(s)
 */
export function withRole(
  role: UserRole | UserRole[], 
  handler: RouteHandler, 
  options?: AuthOptions
): RouteHandler {
  return async (req: NextRequest) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }
    
    const userRole = token.role as UserRole;
    const requiredRoles = Array.isArray(role) ? role : [role];
    
    if (!requiredRoles.includes(userRole)) {
      const message = options?.message || 
        `Forbidden - ${requiredRoles.join(' or ')} access required`;
      
      console.warn(`Access denied: User ${token.email} (${userRole}) attempted to access route requiring ${requiredRoles.join(' or ')}`);
      
      return NextResponse.json(
        { error: message },
        { status: 403 }
      );
    }
    
    // Add user to request object for route handlers
    (req as any).user = {
      id: token.id,
      email: token.email,
      name: token.name,
      role: token.role,
    };
    
    return handler(req);
  };
}

/**
 * Middleware specifically for admin routes
 */
export function withAdminRole(handler: RouteHandler): RouteHandler {
  return withRole(ROLES.ADMIN, handler, {
    message: 'Forbidden - Admin access required'
  });
}

/**
 * Middleware to ensure request comes from same user as ID in route or an admin
 * Useful for operations where a user should only modify their own resources
 */
export function withSelfOrAdmin(
  idExtractor: (req: NextRequest) => string,
  handler: RouteHandler
): RouteHandler {
  return async (req: NextRequest) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }
    
    const resourceUserId = idExtractor(req);
    const userRole = token.role as UserRole;
    const isAdmin = userRole === ROLES.ADMIN;
    const isSelf = token.id === resourceUserId;
    
    if (!isAdmin && !isSelf) {
      return NextResponse.json(
        { error: 'Forbidden - You can only access your own resources' },
        { status: 403 }
      );
    }
    
    // Add user to request object for route handlers
    (req as any).user = {
      id: token.id,
      email: token.email,
      name: token.name,
      role: token.role,
    };
    
    return handler(req);
  };
}

/**
 * API middleware with authentication, rate limiting and error handling
 */
export async function withApiMiddleware(
  request: NextRequest, 
  handler: (req: NextRequest, session?: any) => Promise<NextResponse>,
  options: {
    requireAuth?: boolean;
    requireAdmin?: boolean;
    rateLimit?: boolean;
    corsEnabled?: boolean;
  } = {}
) {
  const { requireAuth = false, requireAdmin = false, rateLimit = true, corsEnabled = true } = options;
  
  try {
    // Apply rate limiting
    if (rateLimit) {
      const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
      const rateEntry = rateLimitCache.get(ip) || { count: 0, timestamp: Date.now() };
      
      // Reset counter if window has passed
      if (Date.now() - rateEntry.timestamp > RATE_LIMIT_WINDOW) {
        rateEntry.count = 0;
        rateEntry.timestamp = Date.now();
      }
      
      // Increment counter
      rateEntry.count++;
      rateLimitCache.set(ip, rateEntry);
      
      // Check rate limit
      if (rateEntry.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: 'Too many requests', code: 'rate_limit_exceeded' },
          { status: 429, headers: new Headers({
            'Retry-After': '60',
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
          })}
        );
      }
    }
    
    // Add CORS headers if enabled
    const headers: HeadersInit = new Headers();
    if (corsEnabled) {
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
      headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      );
      
      // Handle OPTIONS request for CORS preflight
      if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204, headers });
      }
    }
    
    // Authentication check if required
    if (requireAuth || requireAdmin) {
      const session = await getToken({ req: request });
      
      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized', code: 'unauthorized' },
          { status: 401 }
        );
      }
      
      if (requireAdmin && session.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Forbidden', code: 'forbidden' },
          { status: 403 }
        );
      }
      
      // Pass session to handler
      return handler(request, session);
    }
    
    // Handle the request
    return handler(request);
  } catch (error) {
    console.error('API error:', error);
    
    // Determine error type and return appropriate response
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Internal server error', message: error.message, code: 'internal_error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error', code: 'internal_error' },
      { status: 500 }
    );
  }
} 
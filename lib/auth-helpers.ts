import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';

export type UserRole = 'ADMIN' | 'CUSTOMER';

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'ADMIN';
}

export async function validateAdmin(
  request: NextRequest,
  response: () => Promise<NextResponse>
) {
  return validateRole(request, 'ADMIN', response);
}

export async function validateAuthenticated(
  request: NextRequest,
  response: () => Promise<NextResponse>
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized - Authentication required' },
      { status: 401 }
    );
  }
  
  return response();
}

export async function validateRole(
  request: NextRequest,
  requiredRole: UserRole | UserRole[],
  response: () => Promise<NextResponse>
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized - Authentication required' },
      { status: 401 }
    );
  }
  
  const userRole = session.user.role;
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  if (!requiredRoles.includes(userRole as UserRole)) {
    return NextResponse.json(
      { error: `Forbidden - ${requiredRoles.join(' or ')} access required` },
      { status: 403 }
    );
  }
  
  return response();
} 
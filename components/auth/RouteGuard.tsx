"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROLES, UserRole } from '@/lib/constants';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

/**
 * A component that guards routes based on user roles
 * @param children The content to render if the user has access
 * @param allowedRoles Array of roles that can access this route (if empty, any authenticated user can access)
 * @param redirectTo Where to redirect if user doesn't have access
 * @param loadingComponent Component to show while checking auth status
 */
export const RouteGuard = ({
  children,
  allowedRoles = [],
  redirectTo = '/signin',
  loadingComponent = <DefaultLoading />
}: RouteGuardProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Auth check function
    const authCheck = () => {
      // Not authenticated
      if (status === 'unauthenticated') {
        setAuthorized(false);
        router.push(redirectTo);
        return;
      }

      // Still loading
      if (status === 'loading') {
        setAuthorized(false);
        return;
      }

      // Check if role restriction exists and user has required role
      if (allowedRoles.length > 0) {
        const userRole = session?.user?.role as UserRole;
        const hasRequiredRole = allowedRoles.includes(userRole);
        
        if (!hasRequiredRole) {
          setAuthorized(false);
          router.push('/dashboard');
          return;
        }
      }

      // If we get here, user is authorized
      setAuthorized(true);
    };

    authCheck();
  }, [status, session, router, allowedRoles, redirectTo]);

  // Show loading indicator while checking auth status
  if (status === 'loading' || !authorized) {
    return <>{loadingComponent}</>;
  }

  // If authorized, render children
  return <>{children}</>;
};

// Admin-specific route guard
export const AdminRouteGuard = ({ children, ...props }: Omit<RouteGuardProps, 'allowedRoles'>) => {
  return (
    <RouteGuard allowedRoles={[ROLES.ADMIN]} redirectTo="/dashboard" {...props}>
      {children}
    </RouteGuard>
  );
};

// Any authenticated user route guard
export const AuthRouteGuard = ({ children, ...props }: Omit<RouteGuardProps, 'allowedRoles'>) => {
  return (
    <RouteGuard allowedRoles={[]} redirectTo="/signin" {...props}>
      {children}
    </RouteGuard>
  );
};

// Default loading component
const DefaultLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
  </div>
); 
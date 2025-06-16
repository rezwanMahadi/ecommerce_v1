"use client";

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { AuthRouteGuard } from '@/components/auth/RouteGuard';
import { ROLES } from '@/lib/constants';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  // Redirect admins to the admin dashboard
  if (session?.user?.role === ROLES.ADMIN) {
    redirect('/admin');
  }
  
  return <AuthRouteGuard>{children}</AuthRouteGuard>;
} 
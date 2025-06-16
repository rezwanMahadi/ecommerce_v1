'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AdminDashboard from './AdminDashboard';
import CustomerDashboard from './CustomerDashboard';
import Navbar from '@/components/navbar/Navbar';

// Add type declaration for session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
    }
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/');
  }

  // Route based on user role
  if (session.user.role === 'ADMIN') {
    return (
      <div>
        <Navbar />
        <AdminDashboard user={session.user} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <CustomerDashboard />
    </div>
  );
}
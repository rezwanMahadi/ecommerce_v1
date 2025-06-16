import { useSession } from 'next-auth/react';

export function useIsAdmin() {
  const { data: session } = useSession();
  return session?.user?.role === 'ADMIN';
}

export function useRequireAdmin(redirectPath: string = '/') {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  
  if (status === 'loading') {
    return { isLoading: true, isAdmin: false };
  }
  
  if (!session) {
    // Handle on the component side with a redirect
    return { isLoading: false, isAdmin: false, redirectToLogin: true };
  }
  
  if (!isAdmin) {
    // Handle on the component side with a redirect
    return { isLoading: false, isAdmin: false, redirectToForbidden: true };
  }
  
  return { isLoading: false, isAdmin: true };
} 
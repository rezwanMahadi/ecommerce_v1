// Role Constants
export const ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = keyof typeof ROLES;

// Route Protection Constants
export const ROUTE_GUARDS = {
  // Routes that only admins can access
  ADMIN_ONLY: [
    '/admin',
    '/dashboard/admin',
    '/analytics',
    '/products/manage',
    '/orders/manage',
    '/users/manage',
  ],
  
  // Routes that require authentication (any role)
  AUTHENTICATED: [
    '/dashboard',
    '/home',
    '/profile',
    '/orders',
    '/cart',
    '/checkout',
    '/wishlist',
    '/settings',
  ],
  
  // Routes that redirect authenticated users
  UNAUTHENTICATED_ONLY: [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ],
  
  // Routes accessible to everyone
  PUBLIC: [
    '/',
    '/products',
    '/categories',
    '/contact',
    '/about',
  ],
}; 
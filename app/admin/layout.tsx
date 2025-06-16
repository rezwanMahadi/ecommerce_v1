"use client";

import { useState } from 'react';
import { AdminRouteGuard } from '@/components/auth/RouteGuard';
import { ROLES } from '@/lib/constants';
import {
  Home,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  CreditCard,
  Heart,
  Settings
} from 'lucide-react';
import SignOutButton from '@/components/auth/SignOutButton';
import { useSession } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: session } = useSession();

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, href: '/admin' },
    { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
    { id: 'customers', label: 'Customers', icon: Users, href: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { id: 'payments', label: 'Payments', icon: CreditCard, href: '/admin/payments' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className={`lg:w-64 flex-shrink-0 bg-white shadow-sm border-r transition-all ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-indigo-600" />
              <div className="text-lg font-bold">Admin Panel</div>
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-500 p-1 rounded-md hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = typeof window !== 'undefined' && window.location.pathname === item.href;
                
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </a>
                );
              })}
            </nav>
            
            <div className="mt-6 pt-6 border-t">
              <div className="px-3 py-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Account
                </div>
              </div>
              <div className="mt-3 px-3 py-2 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {session?.user?.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {session?.user?.name || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session?.user?.email || 'admin@example.com'}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <SignOutButton variant="text" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-500 p-1 rounded-md hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="text-lg font-semibold text-gray-900 lg:hidden">
                Admin Dashboard
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  );
} 
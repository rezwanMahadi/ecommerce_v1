"use client";

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

interface SignOutButtonProps {
  variant?: 'icon' | 'text';
  className?: string;
}

const SignOutButton = ({ variant = 'icon', className = '' }: SignOutButtonProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (variant === 'icon') {
    return (
      <button 
        onClick={handleSignOut}
        className={`p-2 text-gray-400 hover:text-red-600 ${className}`}
      >
        <LogOut className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      className={`bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 ${className}`}
    >
      Logout
    </button>
  );
};

export default SignOutButton; 
import { NextRequest, NextResponse } from 'next/server';
import { withSelfOrAdmin } from '@/lib/api-middleware';
import { prisma } from '@/lib/prisma';

// Helper to extract userId from request
const getUserIdFromRequest = (req: NextRequest) => {
  const url = new URL(req.url);
  return url.pathname.split('/').pop() || '';
};

/**
 * Get user by ID (self or admin only)
 */
async function handleGetUser(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password or other sensitive fields
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Error fetching user data' },
      { status: 500 }
    );
  }
}

/**
 * Update user by ID (self or admin only)
 */
async function handleUpdateUser(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    const requestUser = (req as any).user; // Added by withSelfOrAdmin middleware
    const data = await req.json();
    
    // If non-admin user tries to change role, block it
    if (data.role && requestUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only administrators can change user roles' },
        { status: 403 }
      );
    }
    
    // Don't allow updating sensitive fields
    const allowedFields: Record<string, any> = {};
    
    // Allow updating basic profile fields
    if (data.name !== undefined) allowedFields.name = data.name;
    if (data.image !== undefined) allowedFields.image = data.image;
    
    // Only admin can update role
    if (requestUser.role === 'ADMIN' && data.role !== undefined) {
      allowedFields.role = data.role;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: allowedFields,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        updatedAt: true,
      }
    });
    
    return NextResponse.json({ 
      message: 'User updated successfully',
      user: updatedUser 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Error updating user data' },
      { status: 500 }
    );
  }
}

/**
 * Delete user by ID (self or admin only)
 */
async function handleDeleteUser(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    
    await prisma.user.delete({
      where: { id: userId }
    });
    
    return NextResponse.json({ 
      message: 'User deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Error deleting user' },
      { status: 500 }
    );
  }
}

// Apply self-or-admin middleware to all handlers
export const GET = withSelfOrAdmin(getUserIdFromRequest, handleGetUser);
export const PATCH = withSelfOrAdmin(getUserIdFromRequest, handleUpdateUser);
export const DELETE = withSelfOrAdmin(getUserIdFromRequest, handleDeleteUser); 
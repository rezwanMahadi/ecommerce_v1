import { NextRequest, NextResponse } from 'next/server';
import { withAdminRole } from '@/lib/api-middleware';
import { prisma } from '@/lib/prisma';

/**
 * Get order summary for a specific user (admin only)
 */
async function handleGetUserOrderSummary(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // First check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }, // Just need to confirm existence
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get order count
    const orderCount = await prisma.order.count({
      where: { userId }
    });
    
    // Calculate total spent
    const orderSum = await prisma.order.aggregate({
      where: { userId },
      _sum: {
        total: true
      }
    });
    
    const totalSpent = orderSum._sum.total || 0;
    
    return NextResponse.json({
      totalOrders: orderCount,
      totalSpent,
    });
    
  } catch (error) {
    console.error(`Error fetching order summary for user:`, error);
    return NextResponse.json(
      { error: 'Error fetching order summary' },
      { status: 500 }
    );
  }
}

export const GET = withAdminRole(handleGetUserOrderSummary); 
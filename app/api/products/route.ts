import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { withApiMiddleware } from '@/lib/api-middleware';

const prisma = new PrismaClient();

// GET /api/products - List all products
export async function GET(req: NextRequest) {
  return withApiMiddleware(req, async () => {
    try {
      // Parse query parameters
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const category = url.searchParams.get('category') || undefined;
      const search = url.searchParams.get('search') || undefined;
      
      // Calculate pagination
      const skip = (page - 1) * limit;
      
      // Build filter condition
      const where: any = {};
      if (category) {
        where.category = category;
      }
      if (search) {
        where.name = {
          contains: search,
          mode: 'insensitive'
        };
      }
      
      // Fetch products with pagination
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            updatedAt: 'desc'
          }
        }),
        prisma.product.count({ where })
      ]);
      
      // Calculate pagination metadata
      const totalPages = Math.ceil(total / limit);
      
      return NextResponse.json({
        products,
        meta: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
  });
}

// POST /api/products - Create a new product (admin only)
export async function POST(req: NextRequest) {
  return withApiMiddleware(req, async () => {
    try {
      // Only allow admins to create products
      const user = await getUserFromRequest(req);
      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Unauthorized - Admin access required' },
          { status: 403 }
        );
      }
      
      const body = await req.json();
      
      // Validate required fields
      const { name, price, category } = body;
      if (!name || typeof price !== 'number' || !category) {
        return NextResponse.json(
          { error: 'Name, price, and category are required fields' },
          { status: 400 }
        );
      }
      
      // Create the product
      const product = await prisma.product.create({
        data: {
          name,
          description: body.description || '',
          price,
          image: body.image || null,
          category,
          stock: body.stock || 0
        }
      });
      
      return NextResponse.json(product, { status: 201 });
    } catch (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }
  }, { requireAuth: true, requireAdmin: true });
}

// Import the getUserFromRequest function at the top
import { getUserFromRequest } from '@/lib/api-middleware'; 
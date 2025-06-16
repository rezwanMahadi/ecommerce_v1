import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { withApiMiddleware, getUserFromRequest } from '@/lib/api-middleware';

const prisma = new PrismaClient();

// GET /api/products/[id] - Get a single product
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withApiMiddleware(req, async () => {
    try {
      const { id } = params;
      
      const product = await prisma.product.findUnique({
        where: { id }
      });
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
      );
    }
  });
}

// PUT /api/products/[id] - Update a product (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withApiMiddleware(req, async () => {
    try {
      // Only allow admins to update products
      const user = await getUserFromRequest(req);
      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Unauthorized - Admin access required' },
          { status: 403 }
        );
      }
      
      const { id } = params;
      const body = await req.json();
      
      // Check if product exists
      const existingProduct = await prisma.product.findUnique({
        where: { id }
      });
      
      if (!existingProduct) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      // Update the product
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          name: body.name !== undefined ? body.name : existingProduct.name,
          description: body.description !== undefined ? body.description : existingProduct.description,
          price: body.price !== undefined ? body.price : existingProduct.price,
          image: body.image !== undefined ? body.image : existingProduct.image,
          category: body.category !== undefined ? body.category : existingProduct.category,
          stock: body.stock !== undefined ? body.stock : existingProduct.stock
        }
      });
      
      return NextResponse.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      );
    }
  }, { requireAuth: true, requireAdmin: true });
}

// DELETE /api/products/[id] - Delete a product (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withApiMiddleware(req, async () => {
    try {
      // Only allow admins to delete products
      const user = await getUserFromRequest(req);
      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Unauthorized - Admin access required' },
          { status: 403 }
        );
      }
      
      const { id } = params;
      
      // Check if product exists
      const existingProduct = await prisma.product.findUnique({
        where: { id }
      });
      
      if (!existingProduct) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      // Delete the product
      await prisma.product.delete({
        where: { id }
      });
      
      return NextResponse.json(
        { message: 'Product deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }
  }, { requireAuth: true, requireAdmin: true });
} 
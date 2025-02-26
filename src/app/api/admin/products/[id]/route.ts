import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/admin/products/[id] - Get a single product
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.id
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', {
      error,
      productId: params.id,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/[id] - Update a product
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, price, image, category, stock, unit } = body;

    // Validate required fields
    if (!name || !description || !price || !image || !category || !stock || !unit) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: params.id
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: {
        id: params.id
      },
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        stock: parseInt(stock),
        unit,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', {
      error,
      productId: params.id,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id] - Delete a product
export async function DELETE(request: Request, { params }: RouteParams) {
  if (!params?.id) {
    return NextResponse.json(
      { error: "Missing product ID" },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // Check if product exists and get its order items
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: params.id
      },
      include: {
        OrderItem: true
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if product is used in any orders
    if (existingProduct.OrderItem.length > 0) {
      return NextResponse.json(
        { 
          error: "Cannot delete product",
          message: "This product is associated with existing orders. Consider updating the stock to 0 instead of deleting."
        },
        { status: 409 }
      );
    }

    // Delete product using a transaction to ensure data consistency
    const deletedProduct = await prisma.$transaction(async (tx) => {
      // Delete any related records first (if any)
      await tx.orderItem.deleteMany({
        where: { productId: params.id }
      });

      // Then delete the product
      return tx.product.delete({
        where: { id: params.id }
      });
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: {
        id: deletedProduct.id,
        name: deletedProduct.name
      }
    });
  } catch (error) {
    console.error('Error deleting product:', {
      error,
      productId: params.id,
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      if (error.code === 'P2003') {
        return NextResponse.json(
          { 
            error: "Cannot delete product",
            message: "This product is referenced by other records in the database"
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

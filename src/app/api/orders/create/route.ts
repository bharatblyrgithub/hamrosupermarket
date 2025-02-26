import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { OrderStatus, Prisma } from '@prisma/client';

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

interface CreateOrderInput {
  items: OrderItem[];
  total: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
}

// Validation functions
const validateOrderInput = (input: CreateOrderInput): string | null => {
  if (!input.items?.length) return 'Order must contain at least one item';
  if (input.total <= 0) return 'Total must be greater than 0';
  if (!input.fullName?.trim()) return 'Full name is required';
  if (!input.email?.trim()) return 'Email is required';
  if (!input.phone?.trim()) return 'Phone is required';
  if (!input.address?.trim()) return 'Address is required';
  if (!input.city?.trim()) return 'City is required';
  if (!input.paymentMethod?.trim()) return 'Payment method is required';
  
  // Validate each item
  for (const item of input.items) {
    if (!item.id || !item.productId || item.quantity <= 0 || item.price <= 0 || !item.name) {
      return 'Invalid item data';
    }
  }
  
  return null;
};

export async function POST(req: Request) {
  try {
    // Authentication check
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    let body: CreateOrderInput;
    try {
      body = await req.json();
      const validationError = validateOrderInput(body);
      if (validationError) {
        return NextResponse.json(
          { error: validationError },
          { status: 400 }
        );
      }
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { items, total, fullName, email, phone, address, city, paymentMethod } = body;

    // Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Use a transaction to ensure all operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // Check stock availability for all items
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.id },
          select: { stock: true }
        });

        if (!product) {
          throw new Error(`Product not found: ${item.id}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${item.name}`);
        }
      }

      // Create the order
      const order = await tx.order.create({
        data: {
          userId: user.id,
          status: OrderStatus.PENDING,
          total,
          fullName,
          email,
          phone,
          address,
          city,
          paymentMethod,
          paymentStatus: 'pending',
          items: {
            create: items.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
              name: item.name
            }))
          }
        },
        include: {
          items: true
        }
      });

      // Update product stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      return order;
    });

    return NextResponse.json({
      success: true,
      orderId: result.id,
      message: 'Order placed successfully',
      order: {
        id: result.id,
        total: result.total,
        status: result.status,
        items: result.items
      }
    });
  } catch (error) {
    console.error('Error creating order:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('Insufficient stock')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
      if (error.message.includes('Product not found')) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Order already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

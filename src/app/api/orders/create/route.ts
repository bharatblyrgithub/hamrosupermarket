import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

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

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateOrderInput = await req.json();
    const { items, total, fullName, email, phone, address, city, paymentMethod } = body;

    // Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'PENDING' as OrderStatus,
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
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Order placed successfully',
      order: {
        id: order.id,
        total: order.total,
        status: order.status,
        items: order.items
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

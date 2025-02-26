import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { OrderStatus, Prisma } from '@prisma/client';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Input validation
  if (!params?.id || typeof params.id !== 'string') {
    return NextResponse.json(
      { error: "Missing or invalid order ID" },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession();
    
    // Check if user is authenticated and is an admin
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Validate request body
    let orderStatus: OrderStatus;
    try {
      const body = await req.json();
      
      if (!body.status || !Object.values(OrderStatus).includes(body.status)) {
        return NextResponse.json(
          { 
            error: 'Invalid status provided',
            validStatuses: Object.values(OrderStatus)
          },
          { status: 400 }
        );
      }
      orderStatus = body.status as OrderStatus;
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: {
        id: params.id
      },
      data: {
        status: orderStatus
      },
      include: {
        items: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Send email notification to customer about order status update
    // You can implement this later using your preferred email service
    // await sendOrderStatusUpdateEmail(updatedOrder);

    return NextResponse.json({
      success: true,
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order:', {
      error,
      orderId: params.id,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Check for specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

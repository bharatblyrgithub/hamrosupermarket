import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  user: {
    name: string;
    email: string;
  };
}

interface TopProduct {
  productId: string;
  _sum: {
    quantity: number | null;
  };
}

interface RevenueByDate {
  createdAt: Date;
  _sum: {
    total: number | null;
  };
}

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  }[];
  lowStockProducts: {
    id: string;
    name: string;
    stock: number;
    unit: string;
  }[];
  ordersByStatus: {
    status: string;
    _count: number;
  }[];
  revenueByDate: {
    date: string;
    revenue: number;
  }[];
  topProducts: {
    name: string | null;
    price: number | null;
    totalSold: number | null;
  }[];
}

export async function GET(request: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get total orders and revenue
    const ordersStats = await prisma.order.aggregate({
      _count: {
        id: true
      },
      _sum: {
        total: true
      }
    });

    // Get total users
    const totalUsers = await prisma.user.count();

    // Get total products
    const totalProducts = await prisma.product.count();

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Get low stock products (less than 10 items)
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lte: 10
        }
      },
      select: {
        id: true,
        name: true,
        stock: true,
        unit: true
      },
      orderBy: {
        stock: 'asc'
      },
      take: 5
    });

    // Format the response
    const dashboardStats = {
      totalOrders: ordersStats._count.id,
      totalRevenue: ordersStats._sum.total || 0,
      totalUsers,
      totalProducts,
      recentOrders: recentOrders.map((order: Order) => ({
        id: order.id,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        user: {
          name: order.user.name,
          email: order.user.email
        }
      })),
      lowStockProducts
    };

    // Get order statistics by status
    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      _count: true
    });

    // Get revenue by date (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const revenueByDate = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sevenDaysAgo
        },
        status: {
          not: 'CANCELLED'
        }
      },
      _sum: {
        total: true
      }
    });

    // Get top selling products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 5
    });

    // Get product details for top selling products
    const topProductDetails = await Promise.all(
      topProducts.map(async (item: TopProduct) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: {
            name: true,
            price: true
          }
        });
        return {
          ...product,
          totalSold: item._sum.quantity
        };
      })
    );

    // Add additional statistics to the response
    const extendedStats: DashboardStats = {
      ...dashboardStats,
      ordersByStatus,
      revenueByDate: revenueByDate.map((day: RevenueByDate) => ({
        date: day.createdAt.toISOString().split('T')[0],
        revenue: day._sum.total || 0
      })),
      topProducts: topProductDetails
    };

    return NextResponse.json(extendedStats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

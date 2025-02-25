'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  lowStockProducts: Array<{
    id: string;
    name: string;
    stock: number;
    unit: string;
  }>;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] p-6">
      <div className="h-full flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {session?.user?.name}!</h1>
            <p className="text-gray-600">Here&apos;s your store overview</p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/admin/products/new"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <span className="mr-2">+</span>
              Add Product
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-12 gap-6">
          {/* Stats Section - Left Side */}
          <div className="col-span-8 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm">Total Orders</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalOrders || 0}</p>
                </div>
                <span className="text-green-500 bg-green-50 rounded-full p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
              </div>
              <Link href="/admin/orders" className="text-sm text-green-600 hover:text-green-700 mt-4 inline-block">
                View orders →
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm">Revenue</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">${stats?.totalRevenue.toFixed(2) || '0.00'}</p>
                </div>
                <span className="text-blue-500 bg-blue-50 rounded-full p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-4">Total earnings</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm">Users</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalUsers || 0}</p>
                </div>
                <span className="text-purple-500 bg-purple-50 rounded-full p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
              </div>
              <Link href="/admin/users" className="text-sm text-green-600 hover:text-green-700 mt-4 inline-block">
                Manage users →
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm">Products</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalProducts || 0}</p>
                </div>
                <span className="text-yellow-500 bg-yellow-50 rounded-full p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
              </div>
              <Link href="/admin/products" className="text-sm text-green-600 hover:text-green-700 mt-4 inline-block">
                Manage products →
              </Link>
            </div>
          </div>

          {/* Low Stock Alert - Right Side */}
          <div className="col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
                <p className="text-sm text-gray-500">Products needing restock</p>
              </div>
              <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(100% - 5rem)' }}>
                {stats?.lowStockProducts && stats.lowStockProducts.length > 0 ? (
                  <div className="space-y-4">
                    {stats.lowStockProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-red-600">{product.stock} {product.unit} left</p>
                        </div>
                        <Link
                          href={`/admin/products?edit=${product.id}`}
                          className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                          Update →
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No low stock products</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

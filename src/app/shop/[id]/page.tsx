  'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ImageGallery from '@/components/product/ImageGallery';
import ProductActions from '@/components/product/ProductActions';
import ProductVariants from '@/components/product/ProductVariants';
import Reviews from '@/components/product/Reviews';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  unit: string;
  variants?: {
    [key: string]: Array<{
      name: string;
      value: string;
      type: 'color' | 'size' | 'other';
      inStock: boolean;
    }>;
  };
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    user: string;
  }>;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  const [selectedVariants, setSelectedVariants] = useState<{[key: string]: string}>({});

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-4 text-gray-600">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className="mt-8 inline-block text-green-600 hover:text-green-700">
            ← Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <ImageGallery 
            images={product.images || [product.image]}
            productName={product.name} 
          />

          {/* Product Details */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="flex flex-col space-y-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
                <p className="mt-1 text-sm text-green-600">{product.category}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                  <span className="text-base text-gray-500">/{product.unit}</span>
                </p>
                {product.originalPrice && (
                  <div className="ml-4 flex items-center">
                    <p className="text-lg line-through text-gray-500">
                      ${product.originalPrice.toFixed(2)}
                    </p>
                    <p className="ml-2 px-2 py-1 text-sm font-semibold text-red-500 bg-red-50 rounded">
                      -{discount}%
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-4">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-gray-700">{product.description}</div>
              </div>

              {/* Variants */}
              {product.variants && (
                <ProductVariants
                  variants={product.variants}
                  selectedVariants={selectedVariants}
                  onVariantChange={handleVariantChange}
                />
              )}

              {/* Actions */}
              {!isAdmin && (
                <ProductActions 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    stock: product.stock,
                    unit: product.unit
                  }} 
                />
              )}

              {/* Reviews */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-lg font-medium text-gray-900">Customer Reviews</h2>
                <div className="mt-4">
                  <Reviews reviews={product.reviews || []} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useSession } from 'next-auth/react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  unit: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.slice(0, 4)); // Only show first 4 products
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      unit: product.unit
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative p-4">
            <Link href={`/shop/${product.id}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden transform group-hover:-translate-y-2 transition-all duration-300">
                {/* Enhanced 3D container with perspective */}
                <div className="relative rounded-2xl bg-gradient-to-br from-green-50 to-white p-[2px] shadow-lg transform-gpu group-hover:shadow-xl transition-all duration-300" style={{ perspective: '1000px' }}>
                  <div className="relative rounded-2xl overflow-hidden bg-white" style={{ transform: 'translateZ(0)' }}>
                    {/* Main image with enhanced quality */}
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        style={{ 
                          filter: 'contrast(1.15) saturate(1.25) brightness(1.05)',
                        }}
                        priority
                      />
                      
                      {/* Layered lighting effects for depth */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(255,255,255,0.5),transparent_70%)]"></div>
                      
                      {/* Enhanced inner shadow */}
                      <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(255,255,255,0.5),inset_0_-2px_8px_rgba(0,0,0,0.15)]"></div>
                      
                      {/* Subtle highlight effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-transparent via-white/5 to-transparent"></div>
                    </div>
                  </div>
                </div>
                {/* Stock Indicators */}
                {product.stock <= 5 && product.stock > 0 && (
                  <div className="absolute top-2 right-2 z-20">
                    <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                      Only {product.stock} left
                    </span>
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="mt-4 bg-white rounded-lg p-4 shadow-lg transform group-hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">per {product.unit}</p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                {!isAdmin && product.stock > 0 && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="mt-4 w-full py-2.5 px-4 bg-green-600 text-white rounded-lg font-medium
                             hover:bg-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                             transition-all duration-200 flex items-center justify-center gap-2"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

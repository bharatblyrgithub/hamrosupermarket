'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-screen-xl px-4 py-12 mx-auto lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-block">
              <span className="px-4 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                Fresh & Quality Products
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Fresh Groceries
              <span className="block text-green-600 mt-2">Delivered Daily</span>
            </h1>
            <p className="mb-8 text-lg text-gray-700 lg:text-xl max-w-2xl">
              Experience the convenience of shopping fresh produce and daily essentials from home. Quality products delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Start Shopping
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200"
              >
                Browse Categories
              </Link>
            </div>
            
            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600 mb-1">Fast</div>
                <div className="text-sm text-gray-600">Delivery</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600 mb-1">Fresh</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative">
            <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
              {/* Background glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-green-100/20 via-white/10 to-yellow-100/20 rounded-3xl blur-2xl"></div>
              
              {/* Main image container */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                  alt="Fresh groceries and vegetables"
                  fill
                  className="object-cover"
                  priority
                  quality={100}
                  style={{ 
                    filter: 'contrast(1.25) saturate(1.5) brightness(1.1) sepia(0.1)',
                    transform: 'scale(1.01)',  // Slight scale to avoid white edges
                  }}
                />
                
                {/* Enhanced lighting effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/30"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.5),transparent_70%)]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-yellow-500/10"></div>
                
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_2px_20px_rgba(255,255,255,0.3)]"></div>
              </div>
            </div>
            {/* Refined decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-green-100/40 via-green-50/30 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-br from-yellow-100/40 via-yellow-50/30 to-transparent rounded-full blur-xl"></div>
            
            {/* Subtle highlight accents */}
            <div className="absolute top-1/3 -left-6 w-24 h-24 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 -right-6 w-28 h-28 bg-gradient-to-l from-white/10 via-white/5 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

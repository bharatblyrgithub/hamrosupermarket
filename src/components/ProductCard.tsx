import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Plus, AlertCircle, Tag, ChevronDown } from "lucide-react";
import Badge from "./ui/Badge"; 
import Button from "./ui/Button";
import { useCart } from "../context/CartContext";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  unit: string;
  stock: number;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { addItem, error, loading } = useCart();
  const [imageError, setImageError] = useState(false);
  const [addToCartError, setAddToCartError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAdmin = session?.user?.role === 'ADMIN';

  // Sample categories - replace with your actual categories
  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Beverages",
    "Snacks",
    "Groceries"
  ];

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user) {
      router.push('/api/auth/signin');
      return;
    }

    try {
      setAddToCartError(null);
      await addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        unit: product.unit,
        stock: product.stock
      });
    } catch (err) {
      setAddToCartError(err instanceof Error ? err.message : 'Failed to add item to cart');
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(false);
    router.push(`/category/${encodeURIComponent(category.toLowerCase())}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener for clicking outside
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  return (
    <div className="group relative p-4">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden transform group-hover:-translate-y-2 transition-all duration-300">
          {/* Enhanced 3D container with perspective */}
          <div className="relative rounded-2xl bg-gradient-to-br from-green-50 to-white p-[2px] shadow-lg transform-gpu group-hover:shadow-xl transition-all duration-300" style={{ perspective: '1000px' }}>
            <div className="relative rounded-2xl overflow-hidden bg-white" style={{ transform: 'translateZ(0)' }}>
              {/* Main image with enhanced quality */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={imageError ? "/images/products/placeholder.jpg" : product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{ 
                    filter: 'contrast(1.15) saturate(1.25) brightness(1.05)',
                  }}
                  onError={handleImageError}
                  priority
                />
                
                {/* Layered lighting effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(255,255,255,0.5),transparent_70%)]"></div>
                <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(255,255,255,0.5),inset_0_-2px_8px_rgba(0,0,0,0.15)]"></div>
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
            <div className="flex-1">
              {/* Category Dropdown */}
              <div className="relative" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={handleCategoryClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 
                           text-green-700 rounded-lg text-sm font-medium transition-all duration-200 
                           hover:shadow-md mb-2"
                  aria-label="Select category"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <Tag className="w-4 h-4 text-green-600" />
                  <span>{product.category}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1 max-h-60 overflow-auto" role="menu" aria-orientation="vertical">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={(e) => handleCategorySelect(category, e)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700
                                   transition-colors duration-150 flex items-center gap-2"
                          role="menuitem"
                        >
                          <Tag className="w-4 h-4" />
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {product.description || "Perfect for a healthy diet!"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">per {product.unit}</p>
            </div>
          </div>

          {/* Error Display */}
          {(error || addToCartError) && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" />
              <span>{error?.message || addToCartError}</span>
            </div>
          )}

          {/* Add to Cart Button */}
          {!isAdmin && product.stock > 0 && (
            <button 
              onClick={handleAddToCart}
              className="mt-4 w-full py-2.5 px-4 bg-green-600 text-white rounded-lg font-medium
                       hover:bg-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                       transition-all duration-200 flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              aria-label={`Add ${product.name} to cart`}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Add to Cart
                  <Plus className="h-5 w-5" />
                </>
              )}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}

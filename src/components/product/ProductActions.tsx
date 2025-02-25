'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import QuantitySelector from './QuantitySelector';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    unit: string;
  };
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      await addItem({
        ...product,
        quantity
      });
      // Show a success message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
      notification.textContent = 'Added to cart successfully!';
      document.body.appendChild(notification);
      
      // Remove notification after 2 seconds
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 2000);

      // Redirect to cart page
      router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await addItem({
        ...product,
        quantity
      });
      // Redirect to cart page for checkout
      router.push('/cart');
    } catch (error) {
      console.error('Error processing buy now:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between border p-4 rounded-lg">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <QuantitySelector
          quantity={quantity}
          stock={product.stock}
          onChange={setQuantity}
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="px-6 py-3 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Buy Now
        </button>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isWishlisted ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
      </button>

      {/* Stock Status */}
      {product.stock > 0 && product.stock <= 5 && (
        <p className="text-sm text-orange-600 mt-2">
          Only {product.stock} left in stock!
        </p>
      )}
    </div>
  );
};

export default ProductActions;

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit: string;
  stock?: number;  // Added to track available stock
}

interface CartError {
  message: string;
  type: 'error' | 'warning';
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  total: number;
  loading: boolean;
  error: CartError | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CartError | null>(null);
  const { data: session } = useSession();

  // Load cart from localStorage and sync with session
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const savedCart = localStorage.getItem(`cart_${session?.user?.email || 'guest'}`);
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      } catch (err) {
        setError({ message: 'Failed to load cart', type: 'error' });
        console.error('Error loading cart:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [session?.user?.email]);

  // Save cart to localStorage with user-specific key
  useEffect(() => {
    try {
      localStorage.setItem(`cart_${session?.user?.email || 'guest'}`, JSON.stringify(items));
    } catch (err) {
      console.error('Error saving cart:', err);
      setError({ message: 'Failed to save cart', type: 'warning' });
    }
  }, [items, session?.user?.email]);

  const addItem = async (item: CartItem) => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      if (!session?.user) {
        setError({ message: 'Please login to add items to cart', type: 'error' });
        return;
      }

      // Check if user is admin
      if (session?.user?.role === 'ADMIN') {
        setError({ message: 'Admins cannot add items to cart', type: 'error' });
        return;
      }

      // Check stock availability
      if (item.stock !== undefined && item.stock < 1) {
        setError({ message: 'Item is out of stock', type: 'error' });
        return;
      }

      setItems(currentItems => {
        const existingItem = currentItems.find(i => i.id === item.id);
        
        if (existingItem) {
          // Check if adding more would exceed stock
          if (item.stock !== undefined && existingItem.quantity + 1 > item.stock) {
            setError({ message: 'Not enough stock available', type: 'warning' });
            return currentItems;
          }
          
          return currentItems.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        
        return [...currentItems, { ...item, quantity: 1 }];
      });
    } catch (err) {
      setError({ message: 'Failed to add item to cart', type: 'error' });
      console.error('Error adding item:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      setItems(currentItems => currentItems.filter(item => item.id !== id));
    } catch (err) {
      setError({ message: 'Failed to remove item', type: 'error' });
      console.error('Error removing item:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);

      if (quantity < 1) {
        setError({ message: 'Quantity must be at least 1', type: 'warning' });
        return;
      }

      setItems(currentItems => {
        const item = currentItems.find(i => i.id === id);
        
        // Check stock limit
        if (item?.stock !== undefined && quantity > item.stock) {
          setError({ message: 'Not enough stock available', type: 'warning' });
          return currentItems;
        }

        return currentItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
      });
    } catch (err) {
      setError({ message: 'Failed to update quantity', type: 'error' });
      console.error('Error updating quantity:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isDropdownOpen,
      setIsDropdownOpen,
      total,
      loading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

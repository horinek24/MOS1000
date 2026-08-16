'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '@/data/courses';

export interface CartItem {
  course: Course;
  addedAt: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  getTotalPrice: () => number;
  getTotalCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mos1000_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('mos1000_cart', JSON.stringify(newCart));
  };

  const addToCart = (course: Course) => {
    if (!isInCart(course.id)) {
      const updated = [...cart, { course, addedAt: new Date().toISOString() }];
      saveCart(updated);
    }
  };

  const removeFromCart = (courseId: string) => {
    const updated = cart.filter((item) => item.course.id !== courseId);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const isInCart = (courseId: string) => {
    return cart.some((item) => item.course.id === courseId);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.course.price, 0);
  };

  const getTotalCount = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        getTotalPrice,
        getTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

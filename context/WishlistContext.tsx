'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (courseId: string) => void;
  isInWishlist: (courseId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mos1000_wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
  }, []);

  const toggleWishlist = (courseId: string) => {
    const exists = wishlist.includes(courseId);
    let updated: string[];
    if (exists) {
      updated = wishlist.filter((id) => id !== courseId);
    } else {
      updated = [...wishlist, courseId];
    }
    setWishlist(updated);
    localStorage.setItem('mos1000_wishlist', JSON.stringify(updated));
  };

  const isInWishlist = (courseId: string) => wishlist.includes(courseId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

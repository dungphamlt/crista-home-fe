'use client';

import { createContext, useContext, useCallback, useState, useEffect } from 'react';

export interface CartItem {
  productId: string;
  productName: string;
  slug: string;
  price: number;
  quantity: number;
  image?: string;
  variantName?: string;
}

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, variantName?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantName?: string) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
} | null>(null);

const STORAGE_KEY = 'crista-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      const key = `${item.productId}-${item.variantName || ''}`;
      const existing = prev.find(
        (i) => `${i.productId}-${i.variantName || ''}` === key
      );
      const qty = item.quantity ?? 1;
      if (existing) {
        return prev.map((i) =>
          `${i.productId}-${i.variantName || ''}` === key
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string, variantName?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && (i.variantName || '') === (variantName || ''))
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantName?: string) => {
      if (quantity <= 0) {
        removeItem(productId, variantName);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && (i.variantName || '') === (variantName || '')
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

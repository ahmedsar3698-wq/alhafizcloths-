import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductColor } from '../types';
import { storageService } from '../services/storageService';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, color?: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, colorHex: string) => void;
  updateQuantity: (productId: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryCity: string;
  setDeliveryCity: (city: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeWhatsAppModal: {
    isOpen: boolean;
    product?: Product;
    color?: ProductColor;
    quantity?: number;
  };
  openWhatsAppModal: (product: Product, color?: ProductColor, quantity?: number) => void;
  closeWhatsAppModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ahc_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deliveryCity, setDeliveryCity] = useState<string>('Karachi');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeWhatsAppModal, setActiveWhatsAppModal] = useState<{
    isOpen: boolean;
    product?: Product;
    color?: ProductColor;
    quantity?: number;
  }>({
    isOpen: false
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const addToCart = (product: Product, color?: ProductColor, quantity = 1) => {
    const selectedColor = color || product.colors[0] || { name: 'Standard', hex: '#000000', inStock: true };
    
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor.hex === selectedColor.hex
      );

      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      } else {
        return [...prev, { product, selectedColor, quantity }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, colorHex: string) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedColor.hex === colorHex)
    ));
  };

  const updateQuantity = (productId: string, colorHex: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorHex);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor.hex === colorHex) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  const settings = storageService.getSettings();
  const isKarachi = deliveryCity.trim().toLowerCase().includes('karachi');
  const deliveryFee = totalItems > 0 ? (isKarachi ? 0 : settings.otherCitiesDeliveryFee || 250) : 0;
  const total = subtotal + deliveryFee;

  const openWhatsAppModal = (product: Product, color?: ProductColor, quantity = 1) => {
    const selectedColor = color || product.colors[0];
    setActiveWhatsAppModal({
      isOpen: true,
      product,
      color: selectedColor,
      quantity
    });
  };

  const closeWhatsAppModal = () => {
    setActiveWhatsAppModal({ isOpen: false });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        total,
        deliveryCity,
        setDeliveryCity,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeWhatsAppModal,
        openWhatsAppModal,
        closeWhatsAppModal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

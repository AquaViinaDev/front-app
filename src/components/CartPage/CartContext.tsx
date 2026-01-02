"use client";
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export type CartItem = {
  id: string;
  qty: number;
};

export type CartProduct = {
  id: string;
  name: { ro: string; ru: string };
  image: string;
  price: number;
  qty: number;
  totalPrice: number;
};

export type UserInfo = {
  name: string;
  phone: string;
  description: string;
  region: string;
  suburb: string;
  street: string;
};

type CartContextType = {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: CartProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addProduct: (id: string, qty?: number) => void;
  updateProductQty: (id: string, qty: number) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  totalAmount: number;
  resetUserInfo: () => void;
  deliveryZone: "chisinau" | "moldova";
  setDeliveryZone: React.Dispatch<React.SetStateAction<"chisinau" | "moldova">>;
  deliveryPrice: number;
  setDeliveryPrice: React.Dispatch<React.SetStateAction<number>>;
};

const initialUserInfo: UserInfo = {
  name: "",
  phone: "",
  description: "",
  region: "",
  suburb: "",
  street: "",
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const saved = localStorage.getItem("aquaCart");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.qty === "number"
      );
    } catch (error) {
      console.warn("Failed to read aquaCart from localStorage", error);
      return [];
    }
  });
  const [deliveryZone, setDeliveryZone] = useState<"chisinau" | "moldova">("chisinau");
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

  const resetUserInfo = () => setUserInfo(initialUserInfo);

  useEffect(() => {
    try {
      localStorage.setItem("aquaCart", JSON.stringify(items));
    } catch (error) {
      console.warn("Failed to write aquaCart to localStorage", error);
    }
  }, [items]);

  const addProduct = (id: string, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, qty: item.qty + qty } : item));
      }
      return [...prev, { id, qty }];
    });
  };

  const updateProductQty = (id: string, qty: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)));
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty, totalPrice: p.price * qty } : p))
    );
  };

  const removeProduct = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setProducts([]);
  };

  const totalAmount = useMemo(() => products.reduce((acc, p) => acc + p.totalPrice, 0), [products]);

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        products,
        setProducts,
        addProduct,
        updateProductQty,
        removeProduct,
        clearCart,
        userInfo,
        setUserInfo,
        totalAmount,
        resetUserInfo,
        deliveryZone,
        setDeliveryZone,
        setDeliveryPrice,
        deliveryPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useOrder must be used inside CartProvider");
  return ctx;
};

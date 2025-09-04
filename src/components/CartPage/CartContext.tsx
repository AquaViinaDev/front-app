"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export type AddProductInput = {
  id: string;
  name: { ro: string; ru: string };
  image: string;
  price: number;
};

export type CartProduct = AddProductInput & {
  qty: number;
  totalPrice: number;
};

export type Product = {
  id: string;
  name: {
    ro: string;
    ru: string;
  };
  image: string;
  price: number;
  qty: number;
  totalPrice: number;
};

type UserInfo = {
  name: string;
  phone: string;
  email: string;
  address: string;
  companyName: string;
  description: string;
};

type CartContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProductQty: (id: string, qty: number) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
  addProduct: (product: AddProductInput) => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  totalAmount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aquaCart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    companyName: "",
    description: "",
  });

  useEffect(() => {
    const minimal = products.map((p) => ({ id: p.id, qty: p.qty }));
    localStorage.setItem("aquaCart", JSON.stringify(minimal));
  }, [products]);

  const updateProductQty = (id: string, qty: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty, totalPrice: qty * p.price } : p))
    );
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addProduct = (product: AddProductInput): void => {
    setProducts((prev: CartProduct[]) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1, totalPrice: (p.qty + 1) * p.price } : p
        );
      }
      return [...prev, { ...product, qty: 1, totalPrice: product.price }];
    });
  };

  const clearCart = () => setProducts([]);

  const totalAmount = useMemo(() => {
    return products.reduce((acc, p) => acc + p.totalPrice, 0);
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        updateProductQty,
        removeProduct,
        clearCart,
        addProduct,
        userInfo,
        setUserInfo,
        totalAmount,
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

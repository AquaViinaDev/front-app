"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

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
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  totalAmount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  console.log(products);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    companyName: "",
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const updateProductQty = (id: string, qty: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty, totalPrice: qty * p.price } : p))
    );
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
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

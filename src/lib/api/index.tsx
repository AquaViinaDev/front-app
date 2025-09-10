// export const getAllProducts = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
//     next: { revalidate: 60 },
//   });
//
//   if (!res.ok) {
//     throw new Error("Failed to fetch filters");
//   }
//   return res.json();
// };

import { CartProduct } from "@/components/CartPage/CartContext";

export const getCartProducts = async (ids: string[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/by-ids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart products");
  }

  return res.json();
};

export const getProductById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Ошибка при получении продукта:", error);
    return null;
  }
};

export const getFilters = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filters`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch filters");
  }
  return res.json();
};

export const getFilteredProducts = async (filters: {
  brand?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const params = new URLSearchParams();

  if (filters.brand) params.append("brand", filters.brand);
  if (filters.type) params.append("type", filters.type);
  if (filters.minPrice !== undefined) params.append("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.append("maxPrice", String(filters.maxPrice));

  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/filter?${params.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch filtered products");
  }

  return res.json();
};

export const sendOrder = async (orderData: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error("Failed to send order");
  }

  return res.json();
};

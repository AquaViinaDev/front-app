export const getProducts = async (params: {
  query?: string;
  brand?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: "asc" | "desc";
  page: number;
  limit: number;
}) => {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.set("query", params.query);
  if (params.brand) searchParams.set("brand", params.brand);
  if (params.type) searchParams.set("type", params.type);
  if (params.minPrice !== undefined) searchParams.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined) searchParams.set("maxPrice", String(params.maxPrice));
  if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));

  const url = `${process.env.NEXT_PUBLIC_API_URL}/products?${searchParams.toString()}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch products");

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
    console.error("Error receiving product:", error);
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

export const sendConsultation = async (consultationData: { name: string; phone: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(consultationData),
  });

  if (!res.ok) {
    throw new Error("Failed to send consultation");
  }

  return res.json();
};

export const sendServiceOrder = async (orderData: {
  name: string;
  phone: string;
  orderName: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error("Failed to send service order");
  }

  return res.json();
};

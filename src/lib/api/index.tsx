const SUPPORTED_LOCALES = ["ru", "ro"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const resolveLocale = (locale?: string | null, fallback?: string | null): SupportedLocale => {
  const candidates = [locale, fallback, process.env.NEXT_PUBLIC_DEFAULT_LOCALE, SUPPORTED_LOCALES[0]];

  const matched = candidates.find((item): item is SupportedLocale =>
    typeof item === "string" && SUPPORTED_LOCALES.includes(item as SupportedLocale)
  );

  return matched ?? SUPPORTED_LOCALES[0];
};

const parseBaseUrl = () => {
  const raw = process.env.NEXT_PUBLIC_API_URL;

  if (!raw) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  try {
    return new URL(raw);
  } catch {
    return new URL(raw, "http://localhost");
  }
};

const LOCALE_PLACEHOLDERS = new Set([
  "[locale]",
  "{locale}",
  ":locale",
  "%locale%",
  "[lang]",
  "{lang}",
  ":lang",
  "%lang%",
]);

export const resolveApiBaseUrl = (locale?: string | null): string => {
  const baseUrl = parseBaseUrl();
  const rawSegments = baseUrl.pathname.split("/").filter(Boolean);

  const cleanedSegments: string[] = [];
  let placeholderIndex: number | null = null;
  let existingLocale: SupportedLocale | null = null;

  rawSegments.forEach((segment) => {
    const trimmed = segment.trim();
    const normalized = trimmed.toLowerCase();

    if (!trimmed || normalized === "undefined" || normalized === "null") {
      return;
    }

    if (SUPPORTED_LOCALES.includes(normalized as SupportedLocale)) {
      existingLocale = normalized as SupportedLocale;
      placeholderIndex = cleanedSegments.length;
      cleanedSegments.push("__LOCALE_PLACEHOLDER__");
      return;
    }

    if (LOCALE_PLACEHOLDERS.has(normalized)) {
      placeholderIndex = cleanedSegments.length;
      cleanedSegments.push("__LOCALE_PLACEHOLDER__");
      return;
    }

    cleanedSegments.push(trimmed);
  });

  const finalLocale = resolveLocale(locale, existingLocale);

  const normalizedSegments = cleanedSegments.map((segment) =>
    segment === "__LOCALE_PLACEHOLDER__" ? finalLocale : segment
  );

  if (placeholderIndex !== null) {
    normalizedSegments[placeholderIndex] = finalLocale;
  } else if (process.env.NEXT_PUBLIC_API_APPEND_LOCALE?.toLowerCase() === "true") {
    normalizedSegments.push(finalLocale);
  }

  const filteredSegments = normalizedSegments.filter((segment) => segment && segment.trim());

  const normalizedPath = filteredSegments.length ? `/${filteredSegments.join("/")}` : "";

  return `${baseUrl.origin}${normalizedPath}`;
};

const buildApiUrl = (path: string, locale?: string | null) => {
  const base = resolveApiBaseUrl(locale);
  if (!path) return base;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};

type GetProductsParams = {
  locale?: string;
  query?: string;
  brand?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: "asc" | "desc" | "default";
  page: number;
  limit: number;
};

export const getProducts = async ({ locale, ...params }: GetProductsParams) => {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.set("query", params.query);
  if (params.brand) searchParams.set("brand", params.brand);
  if (params.type) searchParams.set("type", params.type);
  if (params.minPrice !== undefined) searchParams.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined) searchParams.set("maxPrice", String(params.maxPrice));
  if (params.sortOrder && params.sortOrder !== "default") searchParams.set("sortOrder", params.sortOrder);

  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));

  const url = `${buildApiUrl("products", locale)}?${searchParams.toString()}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
};

export const getProductById = async (id: string, locale?: string) => {
  try {
    const res = await fetch(buildApiUrl(`products/${id}`, locale), {
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

export const getFilters = async (locale?: string) => {
  const res = await fetch(buildApiUrl("filters", locale), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch filters");
  }
  return res.json();
};

export const getCartProducts = async (ids: string[], locale?: string) => {
  const res = await fetch(buildApiUrl("products/by-ids", locale), {
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

export const sendOrder = async (orderData: unknown, locale?: string) => {
  const res = await fetch(buildApiUrl("orders", locale), {
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

export const sendConsultation = async (
  consultationData: { name: string; phone: string },
  locale?: string
) => {
  const res = await fetch(buildApiUrl("consultations", locale), {
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

export const sendServiceOrder = async (
  orderData: {
    name: string;
    phone: string;
    orderName: string;
  },
  locale?: string
) => {
  const res = await fetch(buildApiUrl("service-orders", locale), {
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

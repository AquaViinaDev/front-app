const SUPPORTED_LOCALES = ["ru", "ro"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const resolveLocale = (locale?: string | null, fallback?: string | null): SupportedLocale => {
  const candidates = [locale, fallback, process.env.NEXT_PUBLIC_DEFAULT_LOCALE, SUPPORTED_LOCALES[0]];

  const matched = candidates.find((item): item is SupportedLocale =>
    typeof item === "string" && SUPPORTED_LOCALES.includes(item as SupportedLocale)
  );

  return matched ?? SUPPORTED_LOCALES[0];
};

const DEFAULT_LOCAL_API_URL = "http://localhost:3000";
const DEFAULT_PUBLIC_API_URL = "https://aquaviina.md/api";

const isLocalHostUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed, "http://localhost");
    const hostname = parsed.hostname.toLowerCase();
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  } catch {
    return /(?:^|[/:])(?:localhost|127\\.0\\.0\\.1|::1)(?:$|[/:])/i.test(trimmed);
  }
};

const resolveRawBaseUrl = () => {
  const isServer = typeof window === "undefined";
  const isProduction = process.env.NODE_ENV === "development";

  const defaultForEnvironment = isProduction ? DEFAULT_PUBLIC_API_URL : DEFAULT_LOCAL_API_URL;

  const candidates = isServer
    ? [process.env.API_INTERNAL_URL, process.env.NEXT_PUBLIC_API_URL, defaultForEnvironment]
    : [process.env.NEXT_PUBLIC_API_URL, defaultForEnvironment];

  const raw = candidates.find(
    (value): value is string =>
      typeof value === "string" &&
      value.trim().length > 0 &&
      (!isProduction || !isLocalHostUrl(value))
  );

  if (!raw) {
    throw new Error("API base URL is not configured");
  }

  return raw;
};

const parseBaseUrl = () => {
  const raw = resolveRawBaseUrl();

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
  }

  const filteredSegments = normalizedSegments.filter((segment) => segment && segment.trim());

  const normalizedPath = filteredSegments.length ? `/${filteredSegments.join("/")}` : "";

  return `${baseUrl.origin}${normalizedPath}`;
};

const isAbsoluteUrl = (path: string) => /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(path);

const resolveMediaBaseUrl = () => {
  const isProduction = process.env.NODE_ENV === "development";
  const defaultForEnvironment = isProduction ? DEFAULT_PUBLIC_API_URL : DEFAULT_LOCAL_API_URL;

  const candidates = [
    process.env.NEXT_PUBLIC_MEDIA_URL,
    process.env.NEXT_PUBLIC_API_URL,
    process.env.API_PUBLIC_URL,
    defaultForEnvironment,
  ];

  const raw = candidates.find(
    (value): value is string =>
      typeof value === "string" &&
      value.trim().length > 0 &&
      (!isProduction || !isLocalHostUrl(value))
  );

  if (!raw) {
    throw new Error("Media base URL is not configured");
  }

  try {
    return new URL(raw);
  } catch {
    return new URL(raw, "http://localhost");
  }
};

export const resolveMediaUrl = (path?: string | null): string | null => {
  if (typeof path !== "string") return null;

  const trimmed = path.trim();
  if (!trimmed) return null;
  if (isAbsoluteUrl(trimmed)) {
    return trimmed;
  }

  let baseUrl = resolveMediaBaseUrl();

  if (baseUrl.hostname.toLowerCase() === "server") {
    const adjustedUrl = new URL(baseUrl.toString());
    adjustedUrl.hostname = "localhost";
    baseUrl = adjustedUrl;
  }
  const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const filteredSegments = baseUrl.pathname
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => {
      if (!segment) return false;
      const normalized = segment.toLowerCase();
      if (normalized === "undefined" || normalized === "null") return false;
      if (SUPPORTED_LOCALES.includes(normalized as SupportedLocale)) return false;
      if (LOCALE_PLACEHOLDERS.has(normalized)) return false;
      return true;
    });

  const hostname = baseUrl.hostname.toLowerCase();
  const isLocalHost =
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";

  const normalizedSegments = filteredSegments.filter(
    (segment) => segment.toLowerCase() !== "api"
  );

  const basePathname = normalizedSegments.length ? `/${normalizedSegments.join("/")}` : "";

  return `${baseUrl.origin}${basePathname}${normalizedPath}`;
};

const buildApiUrl = (path: string, locale?: string | null) => {
  const base = resolveApiBaseUrl(locale);
  if (!path) return base;

  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};

type GetProductsParams = {
  locale?: string;
  query?: string;
  brand?: string | string[];
  type?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: "asc" | "desc" | "default";
  page: number;
  limit: number;
};

export const getProducts = async ({ locale, ...params }: GetProductsParams) => {
  const baseSearchParams = new URLSearchParams();
  const appendListParam = (key: string, value?: string | string[]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      const prepared = value.map((item) => item.trim()).filter(Boolean);
      if (!prepared.length) return;
      baseSearchParams.set(key, prepared.join(","));
      return;
    }
    if (value.trim()) {
      baseSearchParams.set(key, value.trim());
    }
  };

  if (params.query) baseSearchParams.set("query", params.query);
  appendListParam("brand", params.brand);
  appendListParam("type", params.type);
  if (params.minPrice !== undefined) baseSearchParams.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined) baseSearchParams.set("maxPrice", String(params.maxPrice));
  if (params.sortOrder && params.sortOrder !== "default") {
    baseSearchParams.set("sortOrder", params.sortOrder);
  }

  const limit = params.limit ?? 16;
  const startPage = Math.max(1, params.page ?? 1);

  const fetchPage = async (page: number) => {
    const searchParams = new URLSearchParams(baseSearchParams);
    searchParams.set("page", String(page));
    searchParams.set("limit", String(limit));

    const url = `${buildApiUrl("products", locale)}?${searchParams.toString()}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json();
  };

  return fetchPage(startPage);
};

export const getProductById = async (id: string, locale?: string) => {
  try {
    const res = await fetch(buildApiUrl(`products/${id}`, locale), {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return null;
    }

    try {
      return await res.json();
    } catch (parseError) {
      console.error("Failed to parse product JSON:", parseError);
      return null;
    }
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

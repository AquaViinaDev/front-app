const SITE_URL = "https://aquaviina.md";
const API_URL = `${SITE_URL}/api/products`;

type Locale = "ru" | "ro";

type RawProduct = {
  id: string;
  name?: string | { ru?: string; ro?: string } | null;
  brand?: string | { ru?: string; ro?: string } | null;
  description?: string | { ru?: string; ro?: string } | null;
  price?: string | number | null;
  inStock?: boolean | null;
  images?: string[] | null;
};

const MAX_PAGES = 20;
const PAGE_SIZE = 200;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const normalizeText = (value: unknown, fallback = "") => {
  if (typeof value !== "string") return fallback;
  const collapsed = value.replace(/\s+/g, " ").trim();
  return collapsed || fallback;
};

const pickLocalized = (value: RawProduct["name"], locale: Locale, fallback = "") => {
  if (typeof value === "string") {
    return normalizeText(value, fallback);
  }

  if (!value || typeof value !== "object") {
    return fallback;
  }

  const localized = locale === "ro" ? value.ro : value.ru;
  const crossLocale = locale === "ro" ? value.ru : value.ro;
  return normalizeText(localized, normalizeText(crossLocale, fallback));
};

const normalizePrice = (value: unknown) => {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric >= 0) {
    return numeric.toFixed(2);
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(",", "."));
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed.toFixed(2);
    }
  }

  return "0.00";
};

const resolveImage = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) {
    return `${SITE_URL}/images/placeholder.svg`;
  }

  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `${SITE_URL}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
};

const fetchPage = async (page: number) => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${PAGE_SIZE}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

const fetchAllProducts = async (): Promise<RawProduct[]> => {
  const firstPage = await fetchPage(1);
  if (!firstPage || !Array.isArray(firstPage.items)) {
    return [];
  }

  const result: RawProduct[] = [...firstPage.items];
  const totalPages = Math.min(Number(firstPage.totalPages ?? 1), MAX_PAGES);

  if (totalPages <= 1) {
    return result;
  }

  for (let page = 2; page <= totalPages; page += 1) {
    const current = await fetchPage(page);
    if (!current || !Array.isArray(current.items) || current.items.length === 0) {
      continue;
    }
    result.push(...current.items);
  }

  return result;
};

const buildItem = (product: RawProduct, locale: Locale) => {
  const id = normalizeText(product.id);
  if (!id) return "";

  const title = pickLocalized(product.name, locale, `Water filter ${id}`);
  const description = pickLocalized(
    product.description,
    locale,
    locale === "ro"
      ? "Filtru de apă cu livrare în Moldova."
      : "Фильтр для воды с доставкой по Молдове."
  ).slice(0, 5000);
  const brand = pickLocalized(product.brand, locale, "AquaViina");
  const price = normalizePrice(product.price);
  const availability = product.inStock ? "in stock" : "out of stock";
  const imageLink = resolveImage(product.images?.[0]);
  const link = `${SITE_URL}/${locale}/products/${encodeURIComponent(id)}`;

  return `<item>
  <g:id>${escapeXml(`${locale}-${id}`)}</g:id>
  <title>${escapeXml(title)}</title>
  <description>${escapeXml(description)}</description>
  <link>${escapeXml(link)}</link>
  <g:condition>new</g:condition>
  <g:availability>${availability}</g:availability>
  <g:price>${price} MDL</g:price>
  <g:brand>${escapeXml(brand)}</g:brand>
  <g:image_link>${escapeXml(imageLink)}</g:image_link>
  <g:shipping>
    <g:country>MD</g:country>
    <g:service>Standard</g:service>
    <g:price>100.00 MDL</g:price>
  </g:shipping>
</item>`;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale: Locale = url.searchParams.get("locale") === "ro" ? "ro" : "ru";
  const products = await fetchAllProducts();

  const items = products
    .map((product) => buildItem(product, locale))
    .filter(Boolean)
    .join("\n");

  const feedTitle =
    locale === "ro"
      ? "AquaViina - feed produse"
      : "AquaViina - фид товаров";
  const feedDescription =
    locale === "ro"
      ? "Filtre de apă și sisteme de purificare în Moldova."
      : "Фильтры для воды и системы очистки в Молдове.";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>${escapeXml(feedTitle)}</title>
  <link>${SITE_URL}</link>
  <description>${escapeXml(feedDescription)}</description>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

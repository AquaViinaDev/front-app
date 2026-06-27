import { Locale, LocalizedString } from "@types";

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ы: "y",
  э: "e",
  ю: "yu",
  я: "ya",
};

export const normalizeSeoSlug = (value: string) => {
  const transliterated = value
    .trim()
    .toLowerCase()
    .replace(/[ăâ]/g, "a")
    .replace(/î/g, "i")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .replace(/[ьъ]/g, "")
    .replace(/[а-яё]/g, (char) => CYRILLIC_TO_LATIN[char] ?? "");

  return transliterated
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
};

const pickLocalizedText = (
  value: string | Partial<LocalizedString> | null | undefined,
  locale: Locale
) => {
  if (typeof value === "string") return value.trim();
  if (!value || typeof value !== "object") return "";

  return (value[locale] || value.ro || value.ru || "").trim();
};

export const getProductLookupId = (routeParam: string) => {
  const decoded = decodeURIComponent(routeParam);
  const marker = "-av-";
  const markerIndex = decoded.lastIndexOf(marker);

  return markerIndex >= 0 ? decoded.slice(markerIndex + marker.length) : decoded;
};

export const buildProductSlug = (
  product: {
    id?: string;
    name?: string | Partial<LocalizedString> | null;
  },
  locale: Locale
) => {
  const id = String(product.id ?? "").trim();
  const name = pickLocalizedText(product.name, locale);
  const slugBase = normalizeSeoSlug(name) || "filtru-apa";

  return id ? `${slugBase}-av-${id}` : slugBase;
};

export const buildProductPath = (
  product: {
    id?: string;
    name?: string | Partial<LocalizedString> | null;
  },
  locale: Locale
) => `/${locale}/products/${buildProductSlug(product, locale)}`;

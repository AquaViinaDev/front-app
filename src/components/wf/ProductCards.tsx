"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "use-intl";
import { getProducts } from "@lib/api";
import { buildProductSlug } from "@lib/seo";
import { Locale, Product } from "@types";
import { PreviewProductItem } from "@components/ProductsPage/components/PreviewProductItem";

import styles from "./ProductCards.module.scss";

// Все товары каталога одним запросом (их ~110) — для «Хитов» и «Предложений»
export const useAllProducts = () => {
  const locale = useLocale();
  return useQuery({
    queryKey: ["wf-all-products", locale],
    queryFn: async () => {
      const data = await getProducts({ locale, page: 1, limit: 300 });
      const items: Product[] = Array.isArray(data) ? data : (data?.items ?? []);
      return items;
    },
    staleTime: 5 * 60 * 1000,
  });
};

type Props = {
  filter: (items: Product[]) => Product[];
  emptyText?: string;
};

const ProductCards = ({ filter, emptyText }: Props) => {
  const locale = (useLocale() === "ro" ? "ro" : "ru") as Locale;
  const { data, isLoading, isError } = useAllProducts();

  if (isLoading) {
    return <p className={styles.state}>{locale === "ro" ? "Se încarcă…" : "Загружаем…"}</p>;
  }

  if (isError || !data) {
    return (
      <p className={styles.state}>
        {locale === "ro" ? "Nu am putut încărca produsele." : "Не удалось загрузить товары."}
      </p>
    );
  }

  const items = filter(data);

  if (!items.length) {
    return <p className={styles.state}>{emptyText ?? ""}</p>;
  }

  return (
    <ul className={styles.list}>
      {items.map((product) => (
        <PreviewProductItem
          key={product.id}
          id={product.id}
          title={product.name?.[locale] ?? ""}
          image={product.images?.[0] ?? ""}
          typeLabel={product.type?.[locale]}
          price={product.price}
          oldPrice={product.oldPrice}
          isInStock={product.inStock}
          link={`/products/${buildProductSlug(product, locale)}`}
        />
      ))}
    </ul>
  );
};

export default ProductCards;

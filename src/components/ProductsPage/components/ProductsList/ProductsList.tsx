"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/api";
import { PreviewProductItem } from "../PreviewProductItem";
import { Locale, Product } from "@/types";
import { useLocale } from "use-intl";

import styles from "./ProductsList.module.scss";

const ProductsList = () => {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });

  const locale = useLocale() as Locale;

  return (
    <ul className={styles.root}>
      {products.map((product) => (
        <PreviewProductItem
          key={product.id}
          image={product.image}
          title={product.name?.[locale]}
          price={product.price}
          isInStock={product.inStock}
          link={`/products/${product.id}`}
        />
      ))}
    </ul>
  );
};

export default ProductsList;

"use client";

import { PreviewProductItem } from "../PreviewProductItem";
import { Locale, Product } from "@/types";
import { useLocale } from "use-intl";
import { ClipLoader } from "react-spinners";

import styles from "./ProductsList.module.scss";

export type ProductsListProps = {
  data: Product[];
  isLoading: boolean;
  isFetched: boolean;
};

const ProductsList = ({ data, isLoading, isFetched }: ProductsListProps) => {
  const locale = useLocale() as Locale;

  if (isLoading || !isFetched) {
    return (
      <div className={styles.noContentBlock}>
        <ClipLoader
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <p className={styles.noFound}>No products found</p>;
  }

  return (
    <ul className={styles.root}>
      {data?.map((product: Product) => (
        <PreviewProductItem
          id={product.id}
          key={product.id}
          image={product.images[0]}
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

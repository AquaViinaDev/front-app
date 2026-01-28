"use client";

import classNames from "classnames";
import { PreviewProductItem } from "../PreviewProductItem";
import { Locale, Product } from "@types";
import { useLocale } from "use-intl";
import { Skeleton } from "@components/common";

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
      <ul className={classNames(styles.root, styles.skeletonList)}>
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className={styles.skeletonItem}>
            <Skeleton height={180} />
            <Skeleton height={18} className={styles.skeletonLine} />
            <Skeleton height={18} className={styles.skeletonLine} width="40%" />
          </li>
        ))}
      </ul>
    );
  }

  if (!data || !data.length) return <p className={styles.noFound}>No products found</p>;

  return (
    <ul className={styles.root}>
      {data?.map((product: Product) => (
        <PreviewProductItem
          id={product.id}
          key={product.id}
          image={product.images[0]}
          title={product.name?.[locale]}
          description={product.description?.[locale]}
          typeLabel={product.type?.[locale]}
          price={product.price}
          oldPrice={product.oldPrice}
          isInStock={product.inStock}
          link={`/products/${product.id}`}
        />
      ))}
    </ul>
  );
};

export default ProductsList;

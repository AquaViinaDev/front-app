"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/api";
import { PreviewProductItem } from "../PreviewProductItem";

import styles from "./ProductsList.module.scss";

const ProductsList = () => {
  const { data: products = [] } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });

  return (
    <ul className={styles.root}>
      {products.map((filter: any) => (
        <PreviewProductItem
          key={filter.id}
          image={filter.image}
          title={filter.name}
          price={filter.price}
          isInStock={filter.inStock}
          buttonName="В корзину"
          link={`/products/${filter.id}`}
        />
      ))}
    </ul>
  );
};

export default ProductsList;

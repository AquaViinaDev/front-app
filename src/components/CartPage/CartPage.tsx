"use client";

import { useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CartProductsBlock, CartUserInfoBlock, CartGeneralBlock } from "../CartPage/components";
import { CartProvider, useOrder } from "../CartPage/CartContext";
import { useQuery } from "@tanstack/react-query";
import { CartProductItemType } from "./components/CartProductItem/CartProductItem";
import { getCartProducts } from "@/lib/api";

import styles from "./CartPage.module.scss";

const ids = ["9f040038-f47f-4200-ac6c-991e7ec0746c", "9200c453-00c2-4dec-8cfb-82141d8e622f"];

const CartContent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cartProducts", ids],
    queryFn: () => getCartProducts(ids),
    enabled: ids.length > 0,
  });

  const { products, setProducts } = useOrder();

  useEffect(() => {
    if (data) {
      const productsWithQty = data.map((item: CartProductItemType) => ({
        ...item,
        qty: 1,
        totalPrice: item.price,
      }));
      setProducts(productsWithQty);
    }
  }, [data, setProducts]);

  if (error) return <p>Ошибка загрузки</p>;

  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.contentWrapper}
      title={"В вашей корзине"}
      isLoading={isLoading}
    >
      <div className={styles.topWrapper}>
        <CartProductsBlock items={products} />
        <CartUserInfoBlock />
      </div>
      <div className={styles.bottomWrapper}>
        <CartGeneralBlock />
      </div>
    </PageLayout>
  );
};

const CartPage = () => (
  <CartProvider>
    <CartContent />
  </CartProvider>
);

export default CartPage;

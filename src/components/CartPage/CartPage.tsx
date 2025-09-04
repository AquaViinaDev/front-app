"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CartProductsBlock, CartUserInfoBlock, CartGeneralBlock } from "../CartPage/components";
import { useOrder } from "../CartPage/CartContext";
import { useQuery } from "@tanstack/react-query";
import { CartProductItemType } from "./components/CartProductItem/CartProductItem";
import { getCartProducts } from "@/lib/api";

import styles from "./CartPage.module.scss";

const CartPage = () => {
  const [ids, setIds] = useState<string[] | null>(null); // null пока не загрузились
  const { products, setProducts, userInfo, totalAmount } = useOrder();

  // Загрузка ids из localStorage только на клиенте
  useEffect(() => {
    const saved = localStorage.getItem("aquaCart");
    if (saved) {
      try {
        const parsed: { id: string; qty: number }[] = JSON.parse(saved);
        setIds(parsed.map((item) => item.id));
      } catch (e) {
        console.error("Ошибка парсинга aquaCart:", e);
        setIds([]);
      }
    } else {
      setIds([]);
    }
  }, []);

  // Запрос только если ids уже загружены
  const { data, isLoading, error } = useQuery({
    queryKey: ["cartProducts", ids],
    queryFn: () => getCartProducts(ids!),
    enabled: ids !== null && ids.length > 0,
  });

  // Обновляем состояние продуктов в контексте
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

  const handleBuy = () => {
    const orderData = {
      products,
      userInfo,
      totalAmount,
    };
    console.log("Отправка заказа на бэкенд:", orderData);
    // fetch/axios post можно добавить здесь
  };

  if (ids === null) {
    // пока нет данных о корзине, показываем лоадер
    return <PageLayout className={styles.pageLayout} title="В вашей корзине" isLoading={true} />;
  }

  if (error) return <p>Ошибка загрузки</p>;

  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.contentWrapper}
      title="В вашей корзине"
      isLoading={isLoading}
    >
      <div className={styles.topWrapper}>
        <CartProductsBlock items={products} />
        <CartUserInfoBlock />
      </div>
      <div className={styles.bottomWrapper}>
        <CartGeneralBlock onBuy={handleBuy} />
      </div>
    </PageLayout>
  );
};

export default CartPage;

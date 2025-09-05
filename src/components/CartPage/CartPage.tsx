"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CartProductsBlock, CartUserInfoBlock, CartGeneralBlock } from "../CartPage/components";
import { CartItem, useOrder } from "../CartPage/CartContext";
import { useQuery } from "@tanstack/react-query";
import { CartProductItemType } from "./components/CartProductItem/CartProductItem";
import { getCartProducts } from "@/lib/api";
import { toast } from "react-toastify";

import styles from "./CartPage.module.scss";

const CartPage = () => {
  const [ids, setIds] = useState<string[] | null>(null); // null пока не загрузились
  const { userInfo, setItems, products, totalAmount, setProducts } = useOrder();
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean; address?: boolean }>({});

  const validate = () => {
    const newErrors = {
      name: !userInfo.name?.trim(),
      phone: !userInfo.phone?.trim(),
      address: !userInfo.address?.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };
  useEffect(() => {
    const saved = localStorage.getItem("aquaCart");
    if (saved) {
      try {
        const parsed: { id: string; qty: number }[] = JSON.parse(saved);
        console.log(parsed);
        setIds(parsed.map((item) => item.id));
      } catch (e) {
        console.error("Ошибка парсинга aquaCart:", e);
        setIds([]);
      }
    } else {
      setIds([]);
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["cartProducts", ids],
    queryFn: () => getCartProducts(ids!),
    enabled: ids !== null && ids.length > 0,
  });

  useEffect(() => {
    if (data) {
      const saved = localStorage.getItem("aquaCart");
      const parsed: { id: string; qty: number }[] = saved ? JSON.parse(saved) : [];

      const productsWithQty = data.map((item: CartProductItemType) => {
        const found = parsed.find((i) => i.id === item.id);
        const qty = found?.qty ?? item.qty ?? 1;

        return {
          ...item,
          qty,
          totalPrice: item.price * qty,
        };
      });

      setProducts(productsWithQty);

      setItems(productsWithQty.map((p: CartItem) => ({ id: p.id, qty: p.qty })));
    }
  }, [data, setProducts, setItems]);

  const handleBuy = () => {
    if (!validate()) {
      toast.error("Пожалуйста, заполните все обязательные поля: Имя, Телефон и Адрес.");
      return;
    }

    const orderData = {
      products: products.map((item) => ({
        name: item.name.ru,
        price: item.price,
        qty: item.qty,
        totalPrice: item.price * item.qty,
      })),
      userInfo,
      totalAmount,
    };

    console.log("Отправка заказа на бэкенд:", orderData);
  };

  if (ids === null) {
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
        <CartUserInfoBlock errors={errors} />
      </div>
      <div className={styles.bottomWrapper}>
        <CartGeneralBlock onBuy={handleBuy} />
      </div>
    </PageLayout>
  );
};

export default CartPage;

"use client";

import { useCallback, useEffect, useState } from "react";
import { PageLayout } from "@components/layout/PageLayout";
import { CartProductsBlock, CartUserInfoBlock, CartGeneralBlock } from "@components/CartPage/components";
import { CartItem, useOrder, UserInfo } from "@components/CartPage/CartContext";
import { useQuery } from "@tanstack/react-query";
import { CartProductItemType } from "./components/CartProductItem/CartProductItem";
import { getCartProducts, sendOrder } from "@lib/api";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "use-intl";

import styles from "./CartPage.module.scss";

const CartPage = () => {
  const t = useTranslations("CartPage");
  const local = useLocale();
  const [ids, setIds] = useState<string[] | null>(null);
  const {
    clearCart,
    userInfo,
    resetUserInfo,
    setItems,
    products,
    totalAmount,
    setProducts,
    deliveryPrice,
  } = useOrder();
  type CartFormErrors = Partial<{
    name: string;
    phone: string;
    email: string;
    region: string;
    street: string;
  }>;

  const [errors, setErrors] = useState<CartFormErrors>({});
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isValidationActive, setIsValidationActive] = useState(false);

  const buildValidationErrors = useCallback(
    (info: UserInfo): CartFormErrors => {
      const validationErrors: CartFormErrors = {};

      const trimmedName = info.name.trim();
      if (!trimmedName) {
        validationErrors.name = t("Validation.nameRequired");
      } else if (trimmedName.length < 2) {
        validationErrors.name = t("Validation.nameTooShort");
      }

      const phoneDigits = info.phone.replace(/\D/g, "");
      if (!phoneDigits) {
        validationErrors.phone = t("Validation.phoneRequired");
      } else if (phoneDigits.length < 8) {
        validationErrors.phone = t("Validation.phoneInvalid");
      }

      const email = info.email.trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validationErrors.email = t("Validation.emailInvalid");
      }

      if (!info.region.trim()) {
        validationErrors.region = t("Validation.regionRequired");
      }

      if (!info.street.trim()) {
        validationErrors.street = t("Validation.streetRequired");
      }

      return validationErrors;
    },
    [t]
  );

  useEffect(() => {
    const saved = localStorage.getItem("aquaCart");
    if (saved) {
      try {
        const parsed: { id: string; qty: number }[] = JSON.parse(saved);
        setIds(parsed.map((item) => item.id));
      } catch (e) {
        console.error("Parsing error aquaCart:", e);
        setIds([]);
      }
    } else {
      setIds([]);
    }
  }, []);

  const { data, error } = useQuery({
    queryKey: ["cartProducts", local, ids],
    queryFn: () => getCartProducts(ids!, local),
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
  useEffect(() => {
    if (!isValidationActive) return;
    setErrors(buildValidationErrors(userInfo));
  }, [userInfo, isValidationActive, buildValidationErrors]);

  const handleBuy = async () => {
    if (products.length === 0) {
      toast.error(t("Notification.emptyCart"));
      return;
    }
    setIsValidationActive(true);
    const validationResult = buildValidationErrors(userInfo);
    setErrors(validationResult);

    if (Object.keys(validationResult).length > 0) {
      toast.error(t("Notification.requiredFields"));
      return;
    }

    const fullAddress = [userInfo.region, userInfo.suburb, userInfo.street]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(", ");

    const normalizedPhone = userInfo.phone.startsWith("+")
      ? userInfo.phone
      : userInfo.phone
          .replace(/[^\d+]/g, "")
          .replace(/^(\d)/, "+$1");

    const orderData = {
      products: products.map((item) => ({
        name: item.name.ru,
        price: Number(item.price),
        qty: Number(item.qty),
        totalPrice: Number(item.price * item.qty),
      })),
      userInfo: {
        name: `${userInfo.name} - язык (${local})`,
        phone: normalizedPhone,
        email: userInfo.email || null,
        address: fullAddress,
        companyName: userInfo.companyName || null,
        description: userInfo.description || null,
      },
      totalAmount: Number(totalAmount + deliveryPrice),
      deliveryPrice: deliveryPrice,
    };

    try {
      await sendOrder(orderData, local);
      toast.success(t("Notification.successOrder"));
      clearCart();
      resetUserInfo();
      setIsValidationActive(false);
      setErrors({});
      setResetTrigger((prev) => prev + 1);
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.message ? err.message : t("Notification.loadingError");
      toast.error(message);
    }
  };

  if (error) return <p>{t("Notification.loadingError")}</p>;

  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.contentWrapper}
      title={t("mainTitle")}
      isLoading={ids === null}
      showArrowBack={true}
    >
      <div className={styles.topWrapper}>
        <CartProductsBlock productItems={products} />
        <CartUserInfoBlock errors={errors} resetKey={resetTrigger} />
      </div>
      <div className={styles.bottomWrapper}>
        <CartGeneralBlock onBuy={handleBuy} />
      </div>
    </PageLayout>
  );
};

export default CartPage;

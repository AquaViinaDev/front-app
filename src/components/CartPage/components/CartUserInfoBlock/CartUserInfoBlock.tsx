"use client";

import { useEffect, useState } from "react";
import { PhoneInput, TextInput, ToggleGroup } from "@/components/common";
import { useOrder } from "@/components/CartPage/CartContext";

import styles from "./CartUserInfoBlock.module.scss";
import { useTranslations } from "use-intl";

export type CartUserInfoBlockProps = {
  errors: { name?: boolean; phone?: boolean; address?: boolean };
  resetKey?: boolean;
};

const CartUserInfoBlock = ({ errors, resetKey }: CartUserInfoBlockProps) => {
  const t = useTranslations("CartPage.CartUserInfoBlock");

  const [delivery, setDelivery] = useState("delivery");
  const [region, setRegion] = useState("");
  const [suburb, setSuburb] = useState("");
  const [street, setStreet] = useState("");
  const { setUserInfo, userInfo } = useOrder();

  const updateAddress = (newRegion: string, newSuburb: string, newStreet: string) => {
    const fullAddress = [newRegion, newSuburb, newStreet].filter(Boolean).join(", ");
    setUserInfo((prev) => ({ ...prev, address: fullAddress }));
  };

  const handleChange = (field: string, value: string | null) => {
    setUserInfo((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (resetKey) {
      setDelivery("delivery");
      setRegion("");
      setSuburb("");
      setStreet("");
    }
  }, [resetKey]);

  return (
    <div className={styles.root}>
      <div className={styles.userInfoWrapper}>
        <h3 className={styles.title}>{t("title")}</h3>
        <div className={styles.userForm}>
          <TextInput
            textInputClassName={styles.emailInput}
            type={"email"}
            placeholder={"E-mail"}
            isLabel={false}
            value={userInfo.email}
            onChange={(value) => handleChange("email", value)}
          />
          <TextInput
            error={errors.name}
            textInputClassName={styles.userNameInput}
            placeholder={t("name")}
            isLabel={false}
            value={userInfo.name}
            onChange={(value) => handleChange("name", value)}
          />
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={t("company")}
            isLabel={false}
            value={userInfo.companyName}
            onChange={(value) => handleChange("companyName", value)}
          />
          <PhoneInput
            value={"373"}
            error={errors.phone}
            onChange={(value) => handleChange("phone", value)}
          />
        </div>
      </div>
      <div className={styles.deliveryInfoWrapper}>
        <h3 className={styles.title}>{t("deliveryTitle")}</h3>
        <ToggleGroup
          options={[{ value: "delivery", label: t("deliveryTitle") }]}
          value={delivery}
          onChange={setDelivery}
        />
        <div className={styles.deliveryInputsWrapper}>
          <TextInput
            error={errors.address}
            textInputClassName={styles.companyInput}
            placeholder={t("municipality")}
            isLabel={false}
            value={region}
            onChange={(value) => {
              setRegion(value);
              updateAddress(value, suburb, street);
            }}
          />
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={t("suburb")}
            isLabel={false}
            value={suburb}
            onChange={(value) => {
              setSuburb(value);
              updateAddress(region, value, street);
            }}
          />
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={t("address")}
            isLabel={false}
            value={street}
            onChange={(value) => {
              setStreet(value);
              updateAddress(region, suburb, value);
            }}
          />
        </div>
      </div>
      <div className={styles.paymentMethodWrapper}>
        <h3 className={styles.title}>{t("paymentMethod")}</h3>
        <p className={styles.paymentText}>{t("deliveryPlaceholder")}</p>
      </div>
      <div className={styles.userDescriptionWrapper}>
        <h3 className={styles.title}>{t("finalityTitle")}</h3>
        <textarea
          className={styles.userDescription}
          placeholder={t("finalityPlaceholder")}
          value={userInfo.description}
          maxLength={250}
          onChange={(e) => setUserInfo((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>
    </div>
  );
};

export default CartUserInfoBlock;

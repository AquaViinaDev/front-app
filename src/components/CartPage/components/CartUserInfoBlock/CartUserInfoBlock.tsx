"use client";

import { useEffect } from "react";
import { PhoneInput, TextInput } from "@components/common";
import { useOrder, UserInfo } from "@components/CartPage/CartContext";
import { useTranslations } from "use-intl";

import styles from "./CartUserInfoBlock.module.scss";

export type CartUserInfoBlockProps = {
  errors: Partial<{
    name: string;
    phone: string;
    email: string;
    region: string;
    street: string;
  }>;
  resetKey?: number;
};

const CartUserInfoBlock = ({ errors, resetKey }: CartUserInfoBlockProps) => {
  const t = useTranslations();

  const { setUserInfo, userInfo, setDeliveryZone, deliveryZone } = useOrder();

  const handlePhoneInput = (val: string | null) => {
    let v = val ?? "";

    if (!v.startsWith("+373")) {
      v = "+373" + v.replace(/^\+?373/, "");
    }

    handleChange("phone", v);
  };

  const handleChange = <K extends keyof UserInfo>(field: K, value: string | null) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  };

  useEffect(() => {
    if (resetKey === undefined) {
      return;
    }
    setDeliveryZone("chisinau");
  }, [resetKey, setDeliveryZone]);

  return (
    <div className={styles.root}>
      <div className={styles.userInfoWrapper}>
        <h3 className={styles.title}>{t("CartPage.CartUserInfoBlock.title")}</h3>
        <div className={styles.userForm}>
          <TextInput
            error={Boolean(errors.name)}
            errorMessage={errors.name}
            textInputClassName={styles.userNameInput}
            placeholder={t("CartPage.CartUserInfoBlock.name")}
            isLabel={false}
            value={userInfo.name}
            onChange={(value) => handleChange("name", value)}
          />
          <PhoneInput
            value={userInfo.phone}
            error={Boolean(errors.phone)}
            errorMessage={errors.phone}
            label={false}
            onChange={handlePhoneInput}
          />
        </div>
      </div>
      <div className={styles.deliveryInfoWrapper}>
        <h3 className={styles.title}>{t("CartPage.CartUserInfoBlock.deliveryTitle")}</h3>
        <div className={styles.deliveryRates}>
          <p>{t("CartPage.CartUserInfoBlock.deliveryRatesCountry")}</p>
          <p>{t("CartPage.CartUserInfoBlock.deliveryRatesChisinau")}</p>
        </div>
        <div className={styles.deliveryTypeRow}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="deliveryZone"
              value="chisinau"
              checked={deliveryZone === "chisinau"}
              onChange={() => setDeliveryZone("chisinau")}
            />
            <span>{t("CartPage.CartUserInfoBlock.deliveryChisinau")}</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="deliveryZone"
              value="moldova"
              checked={deliveryZone === "moldova"}
              onChange={() => setDeliveryZone("moldova")}
            />
            <span>{t("CartPage.CartUserInfoBlock.deliveryMoldova")}</span>
          </label>
        </div>
        <div className={styles.deliveryInputsWrapper}>
          <TextInput
            error={Boolean(errors.region)}
            errorMessage={errors.region}
            textInputClassName={styles.companyInput}
            placeholder={t("CartPage.CartUserInfoBlock.municipality")}
            isLabel={false}
            value={userInfo.region}
            onChange={(value) => handleChange("region", value)}
          />
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={t("CartPage.CartUserInfoBlock.suburb")}
            isLabel={false}
            value={userInfo.suburb}
            onChange={(value) => handleChange("suburb", value)}
          />
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={t("CartPage.CartUserInfoBlock.address")}
            isLabel={false}
            value={userInfo.street}
            error={Boolean(errors.street)}
            errorMessage={errors.street}
            onChange={(value) => handleChange("street", value)}
          />
        </div>
      </div>
      <div className={styles.paymentMethodWrapper}>
        <h3 className={styles.title}>{t("CartPage.CartUserInfoBlock.paymentMethod")}</h3>
        <p className={styles.paymentText}>{t("CartPage.CartUserInfoBlock.deliveryPlaceholder")}</p>
      </div>
      <div className={styles.userDescriptionWrapper}>
        <h3 className={styles.title}>{t("CartPage.CartUserInfoBlock.finalityTitle")}</h3>
        <textarea
          className={styles.userDescription}
          placeholder={t("CartPage.CartUserInfoBlock.finalityPlaceholder")}
          value={userInfo.description}
          maxLength={250}
          onChange={(e) => setUserInfo((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>
    </div>
  );
};

export default CartUserInfoBlock;

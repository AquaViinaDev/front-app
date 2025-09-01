"use client";
import { useState } from "react";
import { PhoneInput, TextInput, ToggleGroup } from "@/components/common";

import styles from "./CartUserInfoBlock.module.scss";

const CartUserInfoBlock = () => {
  const [delivery, setDelivery] = useState("delivery");
  // const [payment, setPayment] = useState("cash");

  return (
    <div className={styles.root}>
      <div className={styles.userInfoWrapper}>
        <h3 className={styles.title}>Введите данные для оформления заказа</h3>
        <form className={styles.userForm}>
          <TextInput
            textInputClassName={styles.emailInput}
            type={"email"}
            placeholder={"E-mail"}
            isLabel={false}
          />
          <TextInput
            textInputClassName={styles.userNameInput}
            placeholder={"Имя Фамилия"}
            isLabel={false}
          />
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={"Компания"}
            isLabel={false}
          />
          <PhoneInput value={"373"} onChange={() => console.log("phone")} />
        </form>
      </div>
      <div className={styles.deliveryInfoWrapper}>
        <h3 className={styles.title}>Доставка</h3>
        <ToggleGroup
          options={[{ value: "delivery", label: "Доставка" }]}
          value={delivery}
          onChange={setDelivery}
        />
        <div className={styles.deliveryInputsWrapper}>
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={"Муниципалитет / Район"}
            isLabel={false}
          />
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={"Пригород"}
            isLabel={false}
          />
          <TextInput
            textInputClassName={styles.companyInput}
            placeholder={"Адрес (улица, номер дома и т. д.)"}
            isLabel={false}
          />
        </div>
      </div>
      <div className={styles.paymentMethodWrapper}>
        <h3 className={styles.title}>Метод оплаты</h3>
        <p className={styles.paymentText}>Оплатить можно курьеру при доставке!</p>
      </div>
    </div>
  );
};

export default CartUserInfoBlock;

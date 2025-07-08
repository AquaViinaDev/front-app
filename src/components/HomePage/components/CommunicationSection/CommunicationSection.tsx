"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { CommunicationForm } from "./CommunicationForm";

import styles from "./CommunicationSection.module.scss";

const CommunicationSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className={styles.root}>
      <Image
        src="/images/communication.png"
        alt="Communication image"
        width={500}
        height={500}
        className={styles.image}
      />

      <div className={styles.content}>
        <h2 className={styles.title}>Итак, 1 шаг</h2>
        <p className={styles.subtitle}>
          Оставь свой номер телефона и мы позвоним в самое короткое время и подскажем какой фильтр
          подойдет для тебя!
        </p>
        <CommunicationForm />
      </div>
    </section>
  );
});

CommunicationSection.displayName = "CommunicationSection";

export default CommunicationSection;

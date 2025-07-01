import Image from "next/image";
import styles from "./HeroSection.module.scss";
import { Button } from "@/components/common/Button";

const HeroSection = () => {
  return (
    <section className={styles.root}>
      <div className={styles.wrapper}>
        <Image
          src="/images/home-image.jpg"
          alt="Фильтры для воды"
          fill
          priority
          className={styles.image}
        />
        <div className={styles.overlay}>
          <h1 className={styles.title}>Фильтры для воды в Молдове</h1>
          <p className={styles.subtitle}>
            Установка, гарантия, вечное обслуживание по лучшей цене.
          </p>
          <Button onClick={() => console.log("Бесплатная консультация")}>
            Бесплатная консультация
          </Button>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;

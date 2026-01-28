"use client";

import {
  HeroSection,
  CategoriesSection,
  WorkStepperSection,
  CommunicationSection,
} from "./components";

import { useRouter } from "next/navigation";
import { useLocale } from "use-intl";
import { RoutesEnum } from "@types";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className={styles.root}>
      <HeroSection onConsultClick={() => router.push(`/${locale}${RoutesEnum.Products}`)} />
      <CategoriesSection />
      <WorkStepperSection />
      <CommunicationSection />
    </div>
  );
};

export default HomePage;

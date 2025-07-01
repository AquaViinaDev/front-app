"use client";
import { HeroSection } from "./components/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.root}>
      <HeroSection />
      <CategoriesSection />
    </div>
  );
};
export default HomePage;

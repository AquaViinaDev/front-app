"use client";

import {
  HeroSection,
  CategoriesSection,
  // WorkStepperSection,
  CommunicationSection,
} from "./components";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.root}>
      <HeroSection />
      <CategoriesSection />
      {/*<WorkStepperSection />*/}
      <CommunicationSection />
    </div>
  );
};
export default HomePage;

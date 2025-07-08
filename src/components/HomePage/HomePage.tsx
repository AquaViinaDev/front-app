"use client";

import {
  HeroSection,
  CategoriesSection,
  WorkStepperSection,
  CommunicationSection,
} from "./components";

import { useRef } from "react";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const stepperRef = useRef<HTMLElement | null>(null);

  const scrollToStepper = () => {
    stepperRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.root}>
      <HeroSection onConsultClick={scrollToStepper} />
      <CategoriesSection />
      <WorkStepperSection />
      <CommunicationSection ref={stepperRef} />
    </div>
  );
};

export default HomePage;

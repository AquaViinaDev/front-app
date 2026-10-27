import { ReactNode } from "react";
import wf from "./wf.module.scss";

// Шапка внутренней страницы нового вида
const PageHero = ({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: ReactNode;
}) => (
  <section className={wf.pageHero}>
    <div className={wf.container}>
      {eyebrow ? <span className={wf.eyebrow}>{eyebrow}</span> : null}
      <h1 className={wf.pageTitle}>{title}</h1>
      {text ? <p className={wf.subtitle}>{text}</p> : null}
      {children}
    </div>
  </section>
);

export default PageHero;

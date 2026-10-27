"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "use-intl";
import OrderForm from "./OrderForm";
import wf from "./wf.module.scss";
import styles from "./Podbor.module.scss";

type Answer = string;

const Q = {
  ru: [
    { key: "place", q: "Где будет стоять фильтр?", a: ["Квартира", "Частный дом"] },
    { key: "goal", q: "Что для вас главное?", a: ["Чистая питьевая вода", "Защита техники и всего дома", "И то и другое"] },
    { key: "people", q: "Сколько человек пьёт воду?", a: ["1–2", "3–4", "5 и больше"] },
    { key: "pressure", q: "Какой напор воды?", a: ["Нормальный", "Слабый", "Не знаю"] },
  ],
  ro: [
    { key: "place", q: "Unde va fi montat filtrul?", a: ["Apartament", "Casă particulară"] },
    { key: "goal", q: "Ce contează cel mai mult pentru tine?", a: ["Apă curată de băut", "Protecția electrocasnicelor și a casei", "Ambele"] },
    { key: "people", q: "Câte persoane beau apă?", a: ["1–2", "3–4", "5 și mai mult"] },
    { key: "pressure", q: "Ce presiune are apa?", a: ["Normală", "Slabă", "Nu știu"] },
  ],
};

const Podbor = () => {
  const locale = useLocale() === "ro" ? "ro" : "ru";
  const questions = Q[locale];
  const [answers, setAnswers] = useState<Answer[]>([]);
  const step = answers.length;
  const done = step >= questions.length;

  const goalIndex = done ? questions[1].a.indexOf(answers[1]) : -1;
  const weakPressure = done && questions[3].a.indexOf(answers[3]) === 1;
  const wantsDrinking = goalIndex === 0 || goalIndex === 2;
  const wantsHouse = goalIndex === 1 || goalIndex === 2;

  const recs: { title: string; text: string; href: string }[] = [];
  if (wantsDrinking) {
    recs.push({
      title: locale === "ro" ? "Osmoză inversă" : "Обратный осмос",
      text: weakPressure
        ? locale === "ro"
          ? "Pentru presiune slabă — alege un model cu pompă."
          : "При слабом напоре — выбирайте модель с насосом."
        : locale === "ro"
          ? "Cea mai profundă purificare a apei de băut, cu robinet separat."
          : "Самая глубокая очистка питьевой воды, отдельный кран на мойке.",
      href: `/${locale}/types/osmoza-inversa`,
    });
  }
  if (wantsHouse) {
    recs.push({
      title: locale === "ro" ? "Filtru magistral" : "Магистральный фильтр",
      text:
        locale === "ro"
          ? "La intrarea apei în casă: protejează boilerul și mașinile de nisip și rugină."
          : "На вход воды в дом: защищает бойлер и технику от песка и ржавчины.",
      href: `/${locale}/types/prefiltre`,
    });
  }

  const summary = questions.map((item, index) => `${item.q} ${answers[index] ?? ""}`).join("; ");

  return (
    <div className={styles.root}>
      {!done ? (
        <div className={wf.card}>
          <p className={styles.progress}>
            {locale === "ro" ? "Întrebarea" : "Вопрос"} {step + 1} / {questions.length}
          </p>
          <div className={styles.bar}>
            <span style={{ width: `${(step / questions.length) * 100}%` }} />
          </div>
          <h2 className={styles.question}>{questions[step].q}</h2>
          <div className={styles.options}>
            {questions[step].a.map((option) => (
              <button
                key={option}
                type="button"
                className={styles.option}
                onClick={() => setAnswers([...answers, option])}
              >
                {option}
              </button>
            ))}
          </div>
          {step > 0 ? (
            <button type="button" className={styles.back} onClick={() => setAnswers(answers.slice(0, -1))}>
              ← {locale === "ro" ? "Înapoi" : "Назад"}
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <div className={wf.head}>
            <h2 className={wf.title}>{locale === "ro" ? "Ți se potrivește" : "Вам подойдёт"}</h2>
          </div>
          <div className={wf.grid2}>
            {recs.map((rec) => (
              <Link key={rec.href} href={rec.href} className={wf.card}>
                <h3 className={wf.cardTitle}>{rec.title}</h3>
                <p className={wf.cardText}>{rec.text}</p>
                <span className={wf.cardLink}>{locale === "ro" ? "Vezi modelele" : "Смотреть модели"} →</span>
              </Link>
            ))}
          </div>
          <div className={wf.card} style={{ marginTop: 28 }}>
            <h3 className={wf.cardTitle}>
              {locale === "ro"
                ? "Vrei să alegem împreună modelul exact? Te sunăm gratuit."
                : "Хотите, подберём точную модель вместе? Перезвоним бесплатно."}
            </h3>
            <OrderForm orderName={`${locale === "ro" ? "Alegerea filtrului" : "Подбор фильтра"}: ${summary}`} />
          </div>
          <button type="button" className={styles.back} onClick={() => setAnswers([])}>
            ↺ {locale === "ro" ? "Începe din nou" : "Пройти заново"}
          </button>
        </>
      )}
    </div>
  );
};

export default Podbor;

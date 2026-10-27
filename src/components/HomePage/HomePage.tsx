"use client";

import Link from "next/link";
import { useLocale } from "use-intl";
import { RoutesEnum } from "@types";
import { CommunicationForm } from "./components/CommunicationSection/CommunicationForm";
import ProductCards from "@components/wf/ProductCards";
import { ARTICLES } from "@components/wf/articles";
import {
  BRANDS,
  CATEGORIES,
  FAQ,
  HIT_PRODUCT_IDS,
  HOME,
  PHONE,
  PHONE_HREF,
  WfLocale,
} from "@components/wf/content";

import wf from "@components/wf/wf.module.scss";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const locale = (useLocale() === "ro" ? "ro" : "ru") as WfLocale;
  const t = HOME[locale];

  return (
    <div className={styles.root}>
      {/* Первый экран */}
      <section className={styles.hero}>
        <div className={`${wf.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={wf.eyebrow}>{t.heroBadge}</span>
            <h1 className={styles.heroTitle}>
              {t.heroTitle} <span className={styles.heroAccent}>{t.heroAccent}</span>
            </h1>
            <p className={styles.heroText}>{t.heroText}</p>
            <div className={wf.actions}>
              <Link className={`${wf.btn} ${wf.btnAccent}`} href={`/${locale}/podbor-filtra`}>
                {t.heroPrimary}
              </Link>
              <Link className={`${wf.btn} ${wf.btnGhost}`} href={`/${locale}${RoutesEnum.Products}`}>
                {t.heroSecondary}
              </Link>
            </div>
            <ul className={styles.heroBullets}>
              {t.heroBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.heroMedia}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home-image.jpg" alt="" className={styles.heroImage} />
            <a className={styles.heroCall} href={PHONE_HREF}>
              <span>{locale === "ro" ? "Consultație gratuită" : "Бесплатная консультация"}</span>
              <strong>{PHONE}</strong>
            </a>
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section className={wf.section}>
        <div className={wf.container}>
          <div className={wf.head}>
            <span className={wf.eyebrow}>{t.catalogEyebrow}</span>
            <h2 className={wf.title}>{t.catalogTitle}</h2>
            <p className={wf.subtitle}>{t.catalogText}</p>
          </div>
          <div className={wf.grid3}>
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} className={wf.card} href={`/${locale}/types/${cat.slug}`}>
                <span className={wf.cardIcon} aria-hidden="true">
                  {cat.icon}
                </span>
                <h3 className={wf.cardTitle}>{cat[locale].name}</h3>
                <p className={wf.cardText}>{cat[locale].text}</p>
                <span className={wf.cardLink}>{t.catalogMore} →</span>
              </Link>
            ))}
            <Link className={`${wf.card} ${styles.podborCard}`} href={`/${locale}/podbor-filtra`}>
              <span className={wf.cardIcon} aria-hidden="true">
                ⏱
              </span>
              <h3 className={wf.cardTitle}>{t.heroPrimary}</h3>
              <p className={wf.cardText}>
                {locale === "ro"
                  ? "4 întrebări simple — și îți arătăm ce filtru se potrivește."
                  : "4 простых вопроса — и покажем, какой фильтр вам подходит."}
              </p>
              <span className={wf.cardLink}>{locale === "ro" ? "Începe" : "Начать"} →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Хиты */}
      <section className={`${wf.section} ${wf.sectionSoft}`}>
        <div className={wf.container}>
          <div className={wf.head}>
            <span className={wf.eyebrow}>{t.hitsEyebrow}</span>
            <h2 className={wf.title}>{t.hitsTitle}</h2>
            <p className={wf.subtitle}>{t.hitsText}</p>
          </div>
          <ProductCards
            filter={(items) =>
              HIT_PRODUCT_IDS.map((id) => items.find((item) => item.id === id)).filter(
                (item): item is NonNullable<typeof item> => Boolean(item)
              )
            }
          />
          <div className={`${wf.actions} ${wf.actionsCenter}`}>
            <Link className={`${wf.btn} ${wf.btnGhost}`} href={`/${locale}/promos`}>
              {t.hitsAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Почему мы */}
      <section className={wf.section}>
        <div className={wf.container}>
          <div className={wf.head}>
            <span className={wf.eyebrow}>{t.expertiseEyebrow}</span>
            <h2 className={wf.title}>{t.expertiseTitle}</h2>
          </div>
          <div className={wf.grid4}>
            {t.expertise.map((item) => (
              <div key={item.title} className={wf.card}>
                <span className={wf.cardIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className={wf.cardTitle}>{item.title}</h3>
                <p className={wf.cardText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Сервис */}
      <section className={styles.service}>
        <div className={`${wf.container} ${styles.serviceInner}`}>
          <div>
            <span className={styles.serviceEyebrow}>{t.serviceEyebrow}</span>
            <h2 className={styles.serviceTitle}>{t.serviceTitle}</h2>
            <p className={styles.serviceText}>{t.serviceText}</p>
            <div className={wf.actions}>
              <Link className={`${wf.btn} ${wf.btnAccent}`} href={`/${locale}${RoutesEnum.Services}`}>
                {t.serviceCta}
              </Link>
              <Link className={`${wf.btn} ${styles.btnLight}`} href={`/${locale}/zamena-kartridzhey`}>
                {locale === "ro" ? "Înlocuirea cartușelor" : "Замена картриджей"}
              </Link>
            </div>
          </div>
          <ul className={styles.serviceList}>
            {t.serviceItems.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Бренды */}
      <section className={wf.section}>
        <div className={wf.container}>
          <div className={wf.head}>
            <span className={wf.eyebrow}>{t.brandsEyebrow}</span>
            <h2 className={wf.title}>{t.brandsTitle}</h2>
            <p className={wf.subtitle}>{t.brandsText}</p>
          </div>
          <div className={styles.brands}>
            {BRANDS.map((brand) => (
              <Link key={brand.name} className={styles.brand} href={`/${locale}${brand.href}`}>
                <strong>{brand.name}</strong>
                <span>{brand.note[locale]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Статьи */}
      <section className={`${wf.section} ${wf.sectionSoft}`}>
        <div className={wf.container}>
          <div className={wf.head}>
            <span className={wf.eyebrow}>{t.articlesEyebrow}</span>
            <h2 className={wf.title}>{t.articlesTitle}</h2>
            <p className={wf.subtitle}>{t.articlesText}</p>
          </div>
          <div className={wf.grid3}>
            {ARTICLES.slice(0, 3).map((article) => (
              <Link key={article.slug} className={wf.card} href={`/${locale}/articles/${article.slug}`}>
                <span className={styles.tag}>{article.tag[locale]}</span>
                <h3 className={wf.cardTitle}>{article[locale].title}</h3>
                <p className={wf.cardText}>{article[locale].description}</p>
                <span className={wf.cardLink}>{locale === "ro" ? "Citește" : "Читать"} →</span>
              </Link>
            ))}
          </div>
          <div className={`${wf.actions} ${wf.actionsCenter}`}>
            <Link className={`${wf.btn} ${wf.btnGhost}`} href={`/${locale}/articles`}>
              {t.articlesAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Отзывы — пока заглушка */}
      <section className={wf.section}>
        <div className={wf.container}>
          <div className={wf.head}>
            <span className={wf.eyebrow}>{t.reviewsEyebrow}</span>
            <h2 className={wf.title}>{t.reviewsTitle}</h2>
          </div>
          <div className={styles.reviewsStub} data-ask={t.reviewsAsk} />
        </div>
      </section>

      {/* Вопросы */}
      <section className={`${wf.section} ${wf.sectionSoft}`}>
        <div className={wf.container}>
          <div className={wf.head}>
            <span className={wf.eyebrow}>{t.faqEyebrow}</span>
            <h2 className={wf.title}>{t.faqTitle}</h2>
          </div>
          <div className={wf.faq}>
            {FAQ[locale].map((item) => (
              <details key={item.q} className={wf.faqItem}>
                <summary>{item.q}</summary>
                <p {...("ask" in item && item.ask ? { "data-ask": item.ask } : {})}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Заявка */}
      <section className={styles.cta} id="consultation">
        <div className={`${wf.container} ${styles.ctaInner}`}>
          <div>
            <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
            <p className={styles.ctaText}>{t.ctaText}</p>
            <a className={styles.ctaPhone} href={PHONE_HREF}>
              {PHONE}
            </a>
          </div>
          <div className={styles.ctaForm}>
            <CommunicationForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

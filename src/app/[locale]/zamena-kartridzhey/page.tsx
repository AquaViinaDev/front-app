import Link from "next/link";
import PageHero from "@components/wf/PageHero";
import OrderForm from "@components/wf/OrderForm";
import { pageMeta } from "@components/wf/seo";
import { PHONE, PHONE_HREF } from "@components/wf/content";
import wf from "@components/wf/wf.module.scss";

// Цены — из таблицы «Цены на ЗАМЕНЫ/УСЛУГИ» (листы FIL TEK и Услуги, правило с 30.07.2026).
// «Всего» = картриджи + работа; 800/900 = город / за городом.
const SETS = [
  { name: "ROBEN", prices: ["900", "1350", "1570", "1840", "2160"] },
  { name: "ASUS", prices: ["940 / 1040", "870", "1290", "1610", "—"] },
  { name: "PYRAMID", prices: ["970 / 1070", "800", "1020", "1290", "1610"] },
  { name: "Filtek 10\" (открытый осмос)", ro: "Filtek 10\" (osmoză deschisă)", prices: ["800 / 900", "1080 / 1180", "900", "1170", "1490"] },
];

const SERVICES = [
  { ru: "Вызов мастера", ro: "Deplasarea meșterului", city: "200", out: "300" },
  { ru: "Замена одного картриджа", ro: "Înlocuirea unui cartuș", city: "100", out: "100" },
  { ru: "Замена комплекта картриджей", ro: "Înlocuirea setului de cartușe", city: "200", out: "200" },
  { ru: "Мелкий ремонт: фитинги, протечки", ro: "Reparații mărunte: fitinguri, scurgeri", city: "100", out: "100" },
  { ru: "Обслуживание или замена бака", ro: "Întreținerea sau înlocuirea rezervorului", city: "100", out: "100" },
];

const T = {
  ru: {
    eyebrow: "Сервис",
    title: "Замена картриджей в фильтре для воды",
    text: "Мастер приедет с подходящими картриджами, заменит их и проверит систему на герметичность. Раз в полгода мы сами напоминаем о замене.",
    setsTitle: "Цена замены — картриджи + работа, лей",
    setsNote: "Если картриджей на 700 лей и больше — работа бесплатно. Цена через «/» — по городу / за городом.",
    cols: ["Система", "Только предфильтры", "5 ступеней", "6 ступеней", "7 ступеней", "8 ступеней"],
    servicesTitle: "Другие работы, лей",
    servicesCols: ["Работа", "Город", "За городом"],
    how: "Как проходит замена",
    steps: [
      "Звоните или оставляете заявку — уточняем модель фильтра.",
      "Договариваемся о дне, мастер привозит картриджи.",
      "Меняем картриджи и проверяем, что нигде не течёт.",
      "Через полгода напоминаем о следующей замене.",
    ],
    formTitle: "Заказать замену картриджей",
    formText: "Оставьте имя и телефон — перезвоним и подберём картриджи под вашу систему.",
    order: "Заявка: замена картриджей",
    other: "Не нашли свою систему?",
    otherText: "Позвоните — подскажем по любой модели, в том числе купленной не у нас.",
  },
  ro: {
    eyebrow: "Service",
    title: "Înlocuirea cartușelor filtrului de apă",
    text: "Meșterul vine cu cartușele potrivite, le schimbă și verifică etanșeitatea sistemului. O dată la șase luni îți amintim noi de înlocuire.",
    setsTitle: "Prețul înlocuirii — cartușe + lucrare, lei",
    setsNote: "Dacă cartușele costă 700 lei sau mai mult — lucrarea e gratuită. Prețul cu «/» — în oraș / în afara orașului.",
    cols: ["Sistem", "Doar prefiltre", "5 trepte", "6 trepte", "7 trepte", "8 trepte"],
    servicesTitle: "Alte lucrări, lei",
    servicesCols: ["Lucrare", "Oraș", "În afara orașului"],
    how: "Cum are loc înlocuirea",
    steps: [
      "Suni sau lași o cerere — clarificăm modelul filtrului.",
      "Stabilim ziua, meșterul aduce cartușele.",
      "Schimbăm cartușele și verificăm să nu curgă nicăieri.",
      "Peste șase luni îți amintim de următoarea înlocuire.",
    ],
    formTitle: "Comandă înlocuirea cartușelor",
    formText: "Lasă numele și telefonul — te sunăm și alegem cartușele pentru sistemul tău.",
    order: "Cerere: înlocuirea cartușelor",
    other: "Nu ți-ai găsit sistemul?",
    otherText: "Sună-ne — te ajutăm pentru orice model, inclusiv cumpărat în altă parte.",
  },
};

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  return pageMeta(locale, "zamena-kartridzhey", {
    ru: {
      title: "Замена картриджей в фильтре для воды — цены, Кишинёв | Aqua Viina",
      description: "Замена картриджей в осмосах ROBEN, ASUS, PYRAMID и Filtek с выездом мастера. Цены на комплекты, работа бесплатно от 700 лей.",
    },
    ro: {
      title: "Înlocuirea cartușelor filtrului de apă — prețuri, Chișinău | Aqua Viina",
      description: "Înlocuirea cartușelor la osmozele ROBEN, ASUS, PYRAMID și Filtek cu deplasarea meșterului. Prețuri pe seturi, lucrare gratuită de la 700 lei.",
    },
  });
}

const Page = async ({ params }: { params: Promise<{ locale: "ru" | "ro" }> }) => {
  const { locale } = await params;
  const t = T[locale === "ro" ? "ro" : "ru"];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} text={t.text}>
        <div className={wf.actions}>
          <a className={`${wf.btn} ${wf.btnAccent}`} href="#order">
            {t.formTitle}
          </a>
          <a className={`${wf.btn} ${wf.btnGhost}`} href={PHONE_HREF}>
            {PHONE}
          </a>
        </div>
      </PageHero>

      <section className={wf.section}>
        <div className={`${wf.container} ${wf.prose}`}>
          <h2>{t.setsTitle}</h2>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  {t.cols.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SETS.map((set) => (
                  <tr key={set.name}>
                    <td>
                      <strong>{locale === "ro" && set.ro ? set.ro : set.name}</strong>
                    </td>
                    {set.prices.map((price, index) => (
                      <td key={index}>{price}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>{t.setsNote}</p>

          <h2>{t.servicesTitle}</h2>
          <table>
            <thead>
              <tr>
                {t.servicesCols.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((row) => (
                <tr key={row.ru}>
                  <td>{locale === "ro" ? row.ro : row.ru}</td>
                  <td>{row.city}</td>
                  <td>{row.out}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>{t.how}</h2>
          <ol>
            {t.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <h2>{t.other}</h2>
          <p>
            {t.otherText} <a href={PHONE_HREF}>{PHONE}</a>
          </p>
          <p>
            <Link href={`/${locale}/types/cartuse`}>
              {locale === "ro" ? "Catalogul cartușelor →" : "Каталог картриджей →"}
            </Link>
          </p>
        </div>
      </section>

      <section className={`${wf.section} ${wf.sectionSoft}`} id="order">
        <div className={wf.container}>
          <div className={wf.head}>
            <h2 className={wf.title}>{t.formTitle}</h2>
            <p className={wf.subtitle}>{t.formText}</p>
          </div>
          <div className={wf.card} style={{ maxWidth: 760, margin: "0 auto" }}>
            <OrderForm orderName={t.order} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

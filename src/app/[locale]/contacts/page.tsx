import PageHero from "@components/wf/PageHero";
import { CommunicationForm } from "@components/HomePage/components/CommunicationSection/CommunicationForm";
import { EMAIL, INSTAGRAM, PHONE, PHONE_HREF } from "@components/wf/content";
import { pageMeta } from "@components/wf/seo";
import wf from "@components/wf/wf.module.scss";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  return pageMeta(locale, "contacts", {
    ru: {
      title: "Контакты Aqua Viina — фильтры для воды в Кишинёве",
      description: "Телефон, e-mail и график работы Aqua Viina. Консультация по фильтрам для воды бесплатно.",
    },
    ro: {
      title: "Contacte Aqua Viina — filtre de apă în Chișinău",
      description: "Telefon, e-mail și programul Aqua Viina. Consultație gratuită despre filtrele de apă.",
    },
  });
}

const Page = async ({ params }: { params: Promise<{ locale: "ru" | "ro" }> }) => {
  const { locale } = await params;
  const ro = locale === "ro";
  const items = [
    { icon: "📞", title: ro ? "Telefon" : "Телефон", value: PHONE, href: PHONE_HREF },
    { icon: "✉️", title: "E-mail", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: "🕘", title: ro ? "Program" : "График", value: ro ? "Luni–Vineri 8:00–18:00" : "Понедельник–Пятница 8:00–18:00" },
    { icon: "📷", title: "Instagram", value: "@aqua_viina", href: INSTAGRAM },
  ];
  return (
    <>
      <PageHero
        eyebrow={ro ? "Contacte" : "Контакты"}
        title={ro ? "Suntem la un telefon distanță" : "Мы на связи"}
        text={
          ro
            ? "Sună sau lasă o cerere — te consultăm gratuit și te ajutăm să alegi filtrul."
            : "Позвоните или оставьте заявку — бесплатно проконсультируем и поможем выбрать фильтр."
        }
      />
      <section className={wf.section}>
        <div className={`${wf.container} ${wf.grid4}`}>
          {items.map((item) => (
            <div key={item.title} className={wf.card}>
              <span className={wf.cardIcon} aria-hidden="true">
                {item.icon}
              </span>
              <h2 className={wf.cardTitle}>{item.title}</h2>
              {item.href ? (
                <a className={wf.cardLink} href={item.href}>
                  {item.value}
                </a>
              ) : (
                <p className={wf.cardText}>{item.value}</p>
              )}
            </div>
          ))}
        </div>
        <div className={wf.container} style={{ marginTop: 22 }}>
          <div
            className={wf.card}
            data-ask={
              ro
                ? "Adresa pentru clienți: arătăm biroul bd. Dacia 24/2, of. 204, sau doar «Chișinău»? Hartă — da/nu"
                : "Адрес для клиентов: показываем офис бул. Дачия 24/2, оф. 204 или только «Кишинёв»? Карта — да/нет"
            }
          >
            <h2 className={wf.cardTitle}>{ro ? "Adresa" : "Адрес"}</h2>
            <p className={wf.cardText}>
              {ro
                ? "Chișinău, Moldova. Livrăm și instalăm în Chișinău și în toată Moldova."
                : "Кишинёв, Молдова. Доставляем и устанавливаем по Кишинёву и всей Молдове."}
            </p>
          </div>
        </div>
      </section>
      <section className={`${wf.section} ${wf.sectionSoft}`}>
        <div className={wf.container}>
          <div className={wf.head}>
            <h2 className={wf.title}>{ro ? "Te sunăm înapoi" : "Перезвоним вам"}</h2>
          </div>
          <div className={wf.card} style={{ maxWidth: 760, margin: "0 auto" }}>
            <CommunicationForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

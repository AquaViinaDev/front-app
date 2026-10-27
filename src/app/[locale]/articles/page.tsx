import Link from "next/link";
import PageHero from "@components/wf/PageHero";
import { ARTICLES } from "@components/wf/articles";
import { pageMeta } from "@components/wf/seo";
import wf from "@components/wf/wf.module.scss";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  return pageMeta(locale, "articles", {
    ru: {
      title: "Статьи о фильтрах для воды и обслуживании | Aqua Viina",
      description: "Как выбрать фильтр для воды, мифы об обратном осмосе, замена мембраны и проверка бака — простым языком.",
    },
    ro: {
      title: "Articole despre filtre de apă și întreținere | Aqua Viina",
      description: "Cum alegi un filtru de apă, mituri despre osmoza inversă, schimbarea membranei și verificarea rezervorului — pe înțeles.",
    },
  });
}

const Page = async ({ params }: { params: Promise<{ locale: "ru" | "ro" }> }) => {
  const { locale } = await params;
  const lang = locale === "ro" ? "ro" : "ru";
  return (
    <>
      <PageHero
        eyebrow={lang === "ro" ? "Articole" : "Статьи"}
        title={lang === "ro" ? "Util de știut despre apă și filtre" : "Полезно знать о воде и фильтрах"}
        text={
          lang === "ro"
            ? "Filtre, întreținere și purificarea apei — pe înțelesul tuturor."
            : "Фильтры, обслуживание и очистка воды — простым языком."
        }
      />
      <section className={wf.section}>
        <div className={`${wf.container} ${wf.grid2}`}>
          {ARTICLES.map((article) => (
            <Link key={article.slug} className={wf.card} href={`/${lang}/articles/${article.slug}`}>
              <span className={wf.eyebrow}>{article.tag[lang]}</span>
              <h2 className={wf.cardTitle}>{article[lang].title}</h2>
              <p className={wf.cardText}>{article[lang].description}</p>
              <span className={wf.cardLink}>{lang === "ro" ? "Citește" : "Читать"} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;

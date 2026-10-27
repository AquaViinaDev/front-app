import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@components/wf/PageHero";
import { ARTICLES, findArticle } from "@components/wf/articles";
import { pageMeta } from "@components/wf/seo";
import wf from "@components/wf/wf.module.scss";

export function generateStaticParams() {
  return ARTICLES.flatMap((article) => [
    { locale: "ru", slug: article.slug },
    { locale: "ro", slug: article.slug },
  ]);
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params;
  const article = findArticle(slug);
  if (!article) return {};
  return pageMeta(locale, `articles/${slug}`, {
    ru: { title: `${article.ru.title} | Aqua Viina`, description: article.ru.description },
    ro: { title: `${article.ro.title} | Aqua Viina`, description: article.ro.description },
  });
}

const Page = async ({ params }: { params: Promise<{ locale: "ru" | "ro"; slug: string }> }) => {
  const { locale, slug } = await params;
  const lang = locale === "ro" ? "ro" : "ru";
  const article = findArticle(slug);
  if (!article) notFound();
  const content = article[lang];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.description,
    datePublished: article.date,
    inLanguage: lang,
    author: { "@type": "Organization", name: "Aqua Viina" },
    publisher: { "@type": "Organization", name: "Aqua Viina", logo: { "@type": "ImageObject", url: "https://aquaviina.md/logo.svg" } },
    mainEntityOfPage: `https://aquaviina.md/${lang}/articles/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero eyebrow={article.tag[lang]} title={content.title} text={content.description} />
      <section className={wf.section}>
        <article className={wf.prose}>
          {content.body.map((block, index) => {
            if (block[0] === "ul") {
              return (
                <ul key={index}>
                  {block[1].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block[0] === "h2") return <h2 key={index}>{block[1]}</h2>;
            return <p key={index}>{block[1]}</p>;
          })}
          <p>
            <Link href={`/${lang}/podbor-filtra`}>
              {lang === "ro" ? "Alege filtrul în 1 minut →" : "Подобрать фильтр за 1 минуту →"}
            </Link>
          </p>
          <p>
            <Link href={`/${lang}/articles`}>{lang === "ro" ? "← Toate articolele" : "← Все статьи"}</Link>
          </p>
        </article>
      </section>
    </>
  );
};

export default Page;

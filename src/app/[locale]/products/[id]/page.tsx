import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import Image from "next/image";
import { ProductInformationBlock } from "@/components/ProductInformationBlock";
import { Metadata } from "next";
import { mapProductForLocale } from "./utils";

import styles from "./ProductPage.module.scss";

export type ProductPageTypeProps = {
  params: {
    id: string;
    locale: string;
  };
};

export async function generateMetadata({ params }: ProductPageTypeProps): Promise<Metadata> {
  const { id, locale } = await params;
  const product = await getProductById(id);
  const localizedProduct = mapProductForLocale(product, locale);

  if (!localizedProduct) {
    return {
      title: "Товар не найден",
      description: "Запрошенный фильтр не найден.",
    };
  }

  const title = `${localizedProduct.name} — фильтр для воды`;
  let desc = localizedProduct.description.trim();
  if (desc.length > 140) {
    desc = desc.slice(0, 140);
    const lastSpace = desc.lastIndexOf(" ");
    if (lastSpace > 0) desc = desc.slice(0, lastSpace);
    desc += "...";
  }
  const description = `Купить с доставкой в Кишинёве ${localizedProduct.name}. ${desc}`;

  return {
    title,
    description,
  };
}

const ProductPage = async ({ params }: ProductPageTypeProps) => {
  const { id, locale } = await params;
  const product = await getProductById(id);
  const localizedProduct = mapProductForLocale(product, locale);

  if (!product) {
    notFound();
  }

  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.content}
      title={localizedProduct.name}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`}
            alt={localizedProduct.name}
            className={styles.image}
            width={400}
            height={400}
          />
        </div>
        <ProductInformationBlock
          productId={localizedProduct.id}
          price={localizedProduct.price}
          inStock={localizedProduct.inStock}
          oldPrice={localizedProduct.oldPrice}
        />
      </div>
      <div className={styles.additionalInfoBlock}>
        <div className={styles.characteristics}>
          <h3 className={styles.characteristicsTitle}>
            {locale === "ru" ? "Технические характеристики:" : "Specificații tehnice:"}
          </h3>
          <ul className={styles.characteristicsInformation}>
            {Object.entries(localizedProduct.characteristics as Record<string, string>)
              .filter(([_, value]) => value !== null && value !== undefined && value !== "")
              .map(([key, value]) => (
                <li className={styles.characteristicsItem} key={key}>
                  <span className={styles.key}>{key}</span>
                  <span className={styles.value}>{value}</span>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.description}>
          <h3 className={styles.descriptionTitle}>
            {locale === "ru" ? "Описание:" : "Descriere:"}
          </h3>
          <div className={styles.descriptionInformation}>{localizedProduct.description}</div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductPage;

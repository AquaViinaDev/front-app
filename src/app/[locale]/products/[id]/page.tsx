import { getProductById, resolveMediaUrl } from "@lib/api";
import { notFound } from "next/navigation";
import { PageLayout } from "@components/layout/PageLayout";
import Image from "next/image";
import { ProductInformationBlock } from "@components/ProductInformationBlock";
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
  const product = await getProductById(id, locale);

  if (!product) {
    return {
      title: "Товар не найден",
      description: "Запрошенный фильтр не найден.",
    };
  }

  const localizedProduct = mapProductForLocale(product, locale);

  if (!localizedProduct?.name) {
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
  const product = await getProductById(id, locale);

  if (!product) {
    notFound();
  }

  const localizedProduct = mapProductForLocale(product, locale);
  const safeLocalizedProduct = {
    ...product,
    ...localizedProduct,
  };

  if (!safeLocalizedProduct?.name) {
    notFound();
  }

  const mainImage = product.images?.[0];
  const resolvedImage = typeof mainImage === "string" ? resolveMediaUrl(mainImage) : null;
  const shouldDisableOptimization =
    !!resolvedImage &&
    (!resolvedImage.startsWith("/") || resolvedImage.toLowerCase().includes(".heic"));
  console.log(
    "ok"
  );
  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.content}
      title={safeLocalizedProduct.name}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={resolvedImage ?? "/images/cuvshinExample.png"}
            alt={safeLocalizedProduct.name}
            className={styles.image}
            width={400}
            height={400}
            unoptimized={shouldDisableOptimization}
          />
        </div>
        <ProductInformationBlock
          productId={safeLocalizedProduct.id}
          price={safeLocalizedProduct.price}
          inStock={safeLocalizedProduct.inStock}
          oldPrice={safeLocalizedProduct.oldPrice}
        />
      </div>
      <div className={styles.additionalInfoBlock}>
        {safeLocalizedProduct.characteristics && (
          <div className={styles.characteristics}>
            <h3 className={styles.characteristicsTitle}>
              {locale === "ru" ? "Технические характеристики:" : "Specificații tehnice:"}
            </h3>
            <ul className={styles.characteristicsInformation}>
              {Object.entries(safeLocalizedProduct.characteristics as Record<string, string>)
                .filter(([_, value]) => value !== null && value !== undefined && value !== "")
                .map(([key, value]) => (
                  <li className={styles.characteristicsItem} key={key}>
                    <span className={styles.key}>{key}</span>
                    <span className={styles.value}>{value}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {safeLocalizedProduct.description && (
          <div className={styles.description}>
            <h3 className={styles.descriptionTitle}>
              {locale === "ru" ? "Описание:" : "Descriere:"}
            </h3>
            <div className={styles.descriptionInformation}>{safeLocalizedProduct.description}</div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProductPage;

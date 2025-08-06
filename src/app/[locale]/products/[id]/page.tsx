import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import Image from "next/image";
import { ProductInformationBlock } from "@/components/ProductInformationBlock";
import { Metadata } from "next";

import styles from "./ProductPage.module.scss";

export type ProductPageTypeProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProductPageTypeProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return {
      title: "Товар не найден",
      description: "Запрошенный фильтр не найден.",
    };
  }

  const title = `${product.name} — фильтр для воды`;
  let desc = product.description.trim();
  if (desc.length > 140) {
    desc = desc.slice(0, 140);
    const lastSpace = desc.lastIndexOf(" ");
    if (lastSpace > 0) desc = desc.slice(0, lastSpace);
    desc += "...";
  }
  const description = `Купить ${product.name} с доставкой в Кишинёве. ${desc}`;

  return {
    title,
    description,
  };
}

const ProductPage = async ({ params }: ProductPageTypeProps) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.content}
      title={product.name}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={"/images/cuvshinExample.png"}
            alt={product.name}
            className={styles.image}
            width={400}
            height={400}
            // fill
            // style={{ objectFit: "contain" }}
            // sizes="(max-width: 525px) 300px, 400px"
          />
        </div>
        <ProductInformationBlock
          productId={product.id}
          price={product.price}
          inStock={product.inStock}
          description={product.description}
        />
      </div>
      <div className={styles.additionalInfoBlock}>
        <div className={styles.characteristics}>
          <h3 className={styles.characteristicsTitle}>Технические характеристики:</h3>
          <ul className={styles.characteristicsInformation}>
            {Object.entries(product.characteristics as Record<string, string>).map(
              ([key, value]) => (
                <li className={styles.characteristicsItem} key={key}>
                  <span className={styles.key}>{key}</span>
                  <span className={styles.value}>{value}</span>
                </li>
              )
            )}
          </ul>
        </div>
        <div className={styles.description}>
          <h3 className={styles.descriptionTitle}>Описание:</h3>
          <div className={styles.descriptionInformation}>{product.description}</div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductPage;

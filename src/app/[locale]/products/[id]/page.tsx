import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import Image from "next/image";
import { ProductInformationBlock } from "@/components/ProductInformationBlock";

import styles from "./ProductPage.module.scss";

export type ProductPageTypeProps = {
  params: {
    id: string;
  };
};

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

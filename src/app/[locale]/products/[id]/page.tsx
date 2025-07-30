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
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <PageLayout className={styles.pageLayout} title={product.name}>
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
    </PageLayout>
  );
};

export default ProductPage;

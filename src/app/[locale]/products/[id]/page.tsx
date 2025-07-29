import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/common";
import Image from "next/image";

import styles from "./ProductPage.module.scss";
import classNames from "classnames";

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
        <div className={styles.infoWrapper}>
          <div className={styles.additionalContent}>
            <p className={styles.priceInfo}>{product.price} лей/шт.</p>
            <p
              className={classNames(styles.stockInfo, {
                [styles.inStock]: product.inStock,
                [styles.noStock]: !product.inStock,
              })}
            >
              {product.inStock ? "В наличии" : "Нет в наличии"}
            </p>
            <div className={styles.amountWrapper}>
              <button className={styles.incrementAmount}>+</button>
              <input className={styles.inputAmount} defaultValue="1" />
              <button className={styles.decrementAmount}>-</button>
            </div>
            <Button buttonType={"smallButton"}>В корзину</Button>
          </div>
          <div className={styles.descriptionWrapper}>
            <p className={styles.title}>Описание:</p>
            <p className={styles.description}>{product.description}</p>
          </div>
        </div>
      </div>
      {/*<h1>{product.name}</h1>*/}
      {/*<p>{product.description}</p>*/}
      {/*<p>{product.price} лей</p>*/}
    </PageLayout>
  );
};

export default ProductPage;

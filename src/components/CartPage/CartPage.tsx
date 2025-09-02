import { PageLayout } from "@/components/layout/PageLayout";
import { CartProductsBlock, CartUserInfoBlock, CartGeneralBlock } from "../CartPage/components";

import styles from "./CartPage.module.scss";

const CartPage = () => {
  return (
    <PageLayout
      className={styles.pageLayout}
      contentClassName={styles.contentWrapper}
      title={"В вашей корзине"}
    >
      <div className={styles.topWrapper}>
        <CartProductsBlock />
        <CartUserInfoBlock />
      </div>
      <div className={styles.bottomWrapper}>
        <CartGeneralBlock />
      </div>
    </PageLayout>
  );
};

export default CartPage;

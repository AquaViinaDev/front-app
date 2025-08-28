import { PageLayout } from "@/components/layout/PageLayout";
import { CartProductsBlock, CartUserInfoBlock, CartGeneralBlock } from "../CartPage/components";

import styles from "./CartPage.module.scss";

const CartPage = () => {
  return (
    <PageLayout className={styles.pageLayout} title={"В вашей корзине"}>
      <CartProductsBlock />
      <CartUserInfoBlock />
      <CartGeneralBlock />
    </PageLayout>
  );
};

export default CartPage;

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/api";
import { PageLayout } from "../layout/PageLayout";
import { ProductsList } from "./components/ProductsList";

import styles from "./ProductsPage.module.scss";

const ProductsPage = async () => {
  const queryClient = new QueryClient();

  // Предзапрашиваем данные
  await queryClient.prefetchQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageLayout className={styles.pageLayout} title={"Товары"}>
        <ProductsList />
      </PageLayout>
    </HydrationBoundary>
  );
};

export default ProductsPage;

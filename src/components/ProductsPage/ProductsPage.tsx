import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/api";

import { ProductsListWrapper } from "./components/ProductsListWrapper";

const ProductsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductsListWrapper />
    </HydrationBoundary>
  );
};

export default ProductsPage;

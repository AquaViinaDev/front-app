import {
  // dehydrate,
  // HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllFilters } from "@/lib/api";

const ProductsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getAllFilters"],
    queryFn: getAllFilters,
  });

  return <>ProductsPage</>;
};
export default ProductsPage;

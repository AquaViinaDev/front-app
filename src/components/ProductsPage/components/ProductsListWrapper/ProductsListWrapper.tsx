"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductsList } from "../ProductsList";
import { SearchForm, Sort } from "@/components/common";
import { getFilteredProducts, getFilters } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FiltersResponse } from "@/components/FiltersBlock/FitersBlock";
import { FiltersBlock } from "@/components/FiltersBlock";

import styles from "./ProductsListWrapper.module.scss";

const ProductsListWrapper = () => {
  const t = useTranslations();

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [range, setRange] = useState<number[]>([0, 0]);
  const [debouncedRange, setDebouncedRange] = useState<number[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(""); // для запроса

  const {
    data: filters = {
      brand: [],
      productType: [],
      price: { low: 0, more: 0 },
    },
    error,
    isLoading,
  } = useQuery<FiltersResponse>({
    queryKey: ["getFilters"],
    queryFn: getFilters,
  });

  useEffect(() => {
    if (!range) return;
    const handler = setTimeout(() => setDebouncedRange(range), 500);
    return () => clearTimeout(handler);
  }, [range]);

  useEffect(() => {
    if (selectedBrand || selectedType) {
      setSearchQuery("");
      setDebouncedSearchQuery("");
    }
  }, [selectedBrand, selectedType]);

  const {
    data: products = [],
    isLoading: isProductsLoading,
    isFetched,
  } = useQuery({
    queryKey: [
      "filteredProducts",
      selectedBrand,
      selectedType,
      debouncedRange,
      debouncedSearchQuery,
    ],
    queryFn: () =>
      debouncedSearchQuery
        ? fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/search?query=${encodeURIComponent(debouncedSearchQuery)}`
          ).then((res) => res.json())
        : getFilteredProducts({
            brand: selectedBrand ?? "",
            type: selectedType ?? "",
            minPrice: debouncedRange?.[0] ?? filters.price.low,
            maxPrice: debouncedRange?.[1] ?? filters.price.more,
          }),
    enabled: !!filters,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (filters?.price) {
      const initialRange = [filters.price.low, filters.price.more];
      setRange(initialRange);
      setDebouncedRange(initialRange);
    }
  }, [filters]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 1000);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <PageLayout className={styles.pageLayout} title={t("ProductsPageInformation.title")}>
      <div className={styles.wrapper}>
        <div className={styles.searchSortWrapper}>
          <SearchForm value={searchQuery} onSearch={setSearchQuery} />
          <Sort />
        </div>
        <div className={styles.contentFilterWrapper}>
          <FiltersBlock
            filtersData={filters}
            isLoading={isLoading}
            error={error}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            range={range}
            setRange={setRange}
          />
          <ProductsList data={products} isFetched={isFetched} isLoading={isProductsLoading} />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductsListWrapper;

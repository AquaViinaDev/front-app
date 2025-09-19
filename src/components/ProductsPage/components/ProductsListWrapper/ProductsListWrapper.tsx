"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductsList } from "../ProductsList";
import { Button, SearchForm, Sort } from "@/components/common";
import { getAllProducts, getFilteredProducts, getFilters, getSearchedProducts } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FiltersResponse } from "@/components/FiltersBlock/FitersBlock";
import { FiltersBlock } from "@/components/FiltersBlock";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RoutesEnum } from "@/types";

import styles from "./ProductsListWrapper.module.scss";

const ProductsListWrapper = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const typeFromQuery = searchParams.get("type");
  const locale = useLocale();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(typeFromQuery);
  const [range, setRange] = useState<number[]>([0, 0]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const params = useMemo(() => {
    const brand = searchParams.get("brand");
    const type = searchParams.get("type");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const query = searchParams.get("q");

    return {
      brand,
      type,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      query,
    };
  }, [searchParams]);

  const [searchValue, setSearchValue] = useState(params.query ?? "");

  const openFilters = () => setIsMobileFiltersOpen(true);
  const closeFilters = () => setIsMobileFiltersOpen(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentParams = new URLSearchParams(window.location.search);

      if (searchValue) {
        currentParams.set("q", searchValue);
      } else {
        currentParams.delete("q");
      }

      window.history.replaceState(
        null,
        "",
        `/${locale}${RoutesEnum.Products}?${currentParams.toString()}`
      );
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, locale]);

  const hasFilters =
    !!params.brand || !!params.type || !!params.minPrice || !!params.maxPrice || !!params.query;

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

  const {
    data: products = [],
    isLoading: isProductsLoading,
    isFetched,
  } = useQuery({
    queryKey: ["products", params],
    queryFn: () => {
      if (params.query) {
        return getSearchedProducts(params.query);
      }

      if (hasFilters) {
        return getFilteredProducts({
          brand: params.brand ?? "",
          type: params.type ?? "",
          minPrice: params.minPrice ?? filters.price.low,
          maxPrice: params.maxPrice ?? filters.price.more,
        });
      }

      return getAllProducts();
    },
    enabled: !!filters,
    placeholderData: keepPreviousData,
  });

  return (
    <PageLayout className={styles.pageLayout} title={t("ProductsPageInformation.title")}>
      <div className={styles.wrapper}>
        <div className={styles.filtersWrapper}>
          <div className={styles.mobileFilter}>
            <Button
              buttonType={"smallButton"}
              className={styles.filtersButton}
              onClick={openFilters}
            >
              <span className={styles.buttonTitle}>Фильтры</span>
              <Image src={"/filters-icon.svg"} alt={"Filter Icon"} width={20} height={20} />
            </Button>
          </div>
          <div className={styles.sortWrapper}>
            <SearchForm
              value={searchValue}
              onSearch={(val) => setSearchValue(val)} // меняем локальный стейт
            />
            <Sort />
          </div>
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
            className={styles.filter}
          />
          <ProductsList data={products} isFetched={isFetched} isLoading={isProductsLoading} />
        </div>
      </div>
      {isMobileFiltersOpen && (
        <div className={styles.mobileFiltersOverlay} onClick={closeFilters}>
          <div className={styles.mobileFiltersContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeFilters}>
              <Image src={"/close.svg"} alt={"Close Button"} width={30} height={30} />
            </button>
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
              className={styles.filtersModal}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ProductsListWrapper;
// debouncedSearchQuery ? fetch( ${process.env.NEXT_PUBLIC_API_URL}/products/search?query=${encodeURIComponent(debouncedSearchQuery)}
// const [debouncedRange, setDebouncedRange] = useState<number[] | null>(null);
// const [searchQuery, setSearchQuery] = useState("");
// const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

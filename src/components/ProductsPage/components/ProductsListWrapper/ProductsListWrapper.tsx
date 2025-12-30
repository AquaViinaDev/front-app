"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { PageLayout } from "@components/layout/PageLayout";
import { ProductsList } from "../ProductsList";
import { Button, SearchForm, Sort } from "@components/common";
import { getProducts, getFilters } from "@lib/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FiltersResponse } from "@components/FiltersBlock/FitersBlock";
import { FiltersBlock } from "@components/FiltersBlock";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { RoutesEnum } from "@types";

import styles from "./ProductListWrapper.module.scss";

type ProductsListWrapperProps = {
  defaultBrand?: string | null;
  defaultType?: string | null;
  basePathname?: string | null;
  resetPathname?: string | null;
};

const ProductsListWrapper = ({
  defaultBrand,
  defaultType,
  basePathname,
  resetPathname,
}: ProductsListWrapperProps) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [range, setRange] = useState<number[]>([0, 0]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const sortOrderFromQuery = searchParams.get("sortOrder") || "desc";
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    sortOrderFromQuery as never
  );

  const params = useMemo(() => {
    const brand = searchParams.get("brand") ?? defaultBrand ?? undefined;
    const type = searchParams.get("type") ?? defaultType ?? undefined;
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const query = searchParams.get("query") ?? undefined;

    return {
      brand,
      type,
      minPrice: minPrice !== null ? Number(minPrice) : undefined,
      maxPrice: maxPrice !== null ? Number(maxPrice) : undefined,
      query,
    };
  }, [searchParams]);

  const [searchValue, setSearchValue] = useState(params.query ?? "");

  const openFilters = () => setIsMobileFiltersOpen(true);
  const closeFilters = () => setIsMobileFiltersOpen(false);

  const effectiveBasePath = basePathname ?? `/${locale}${RoutesEnum.Products}`;

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentParams = new URLSearchParams(window.location.search);

      if (searchValue) {
        currentParams.set("query", searchValue);
      } else {
        currentParams.delete("query");
      }

      window.history.replaceState(null, "", `${effectiveBasePath}?${currentParams.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, effectiveBasePath]);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);

    if (sortOrder && sortOrder !== "default") {
      currentParams.set("sortOrder", sortOrder);
    } else {
      currentParams.delete("sortOrder");
    }

    window.history.replaceState(null, "", `${effectiveBasePath}?${currentParams.toString()}`);
  }, [sortOrder, effectiveBasePath]);

  const {
    data: filters = {
      brand: [],
      productType: [],
      price: { low: 0, more: 0 },
    },
    error,
    isLoading,
  } = useQuery<FiltersResponse>({
    queryKey: ["getFilters", locale],
    queryFn: () => getFilters(locale),
  });

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isProductsLoading,
    isFetched,
  } = useInfiniteQuery({
    queryKey: ["products", locale, params, sortOrder],
    queryFn: ({ pageParam = 1 }) => {
      const appliedSort = sortOrder === "default" ? "desc" : sortOrder;

      return getProducts({
        locale,
        query: params.query,
        brand: params.brand,
        type: params.type,
        minPrice: params.minPrice ?? filters.price.low,
        maxPrice: params.maxPrice ?? filters.price.more,
        sortOrder: appliedSort,
        page: pageParam,
        limit: 100,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: true,
  });

  const products = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  return (
    <PageLayout className={styles.pageLayout}>
      <div className={styles.wrapper}>
        <div className={styles.filtersWrapper}>
          <div className={styles.mobileFilter}>
            <Button
              buttonType={"smallButton"}
              className={styles.filtersButton}
              onClick={openFilters}
            >
              <span className={styles.buttonTitle}>{t("ProductsPageInformation.filters")}</span>
              <Image src={"/filters-icon.svg"} alt={"Filter Icon"} width={20} height={20} />
            </Button>
          </div>
          <div className={styles.sortWrapper}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{t("ProductsPageInformation.title")}</h1>
            </div>
            <SearchForm value={searchValue} onSearch={(val) => setSearchValue(val)} />
            <Sort value={sortOrder} onChange={setSortOrder} />
          </div>
        </div>
        <div className={styles.contentFilterWrapper}>
          <FiltersBlock
            filtersData={filters}
            isLoading={isLoading}
            error={error}
            range={range}
            setRange={setRange}
            className={styles.filter}
            defaultBrand={defaultBrand}
            defaultType={defaultType}
            resetPathname={resetPathname}
          />
          <ProductsList data={products} isFetched={isFetched} isLoading={isProductsLoading} />
        </div>
        {products.length < totalCount ? (
          <Button
            className={styles.loadMoreBtn}
            buttonType={"bigButton"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || products.length >= totalCount}
          >
            {t("ProductsPageInformation.loadMore")}
          </Button>
        ) : null}
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
              range={range}
              setRange={setRange}
              className={styles.filtersModal}
              defaultBrand={defaultBrand}
              defaultType={defaultType}
              resetPathname={resetPathname}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ProductsListWrapper;

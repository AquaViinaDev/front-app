"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { PageLayout } from "@components/layout/PageLayout";
import { ProductsList } from "../ProductsList";
import { Button } from "@components/common";
import { getProducts, getFilters } from "@lib/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FiltersResponse } from "@components/FiltersBlock/FitersBlock";
import { FiltersBlock } from "@components/FiltersBlock";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import { RoutesEnum } from "@types";

import styles from "./ProductListWrapper.module.scss";

type ProductsListWrapperProps = {
  defaultBrand?: string | null;
  defaultType?: string | null;
  basePathname?: string | null;
  resetPathname?: string | null;

  initialProducts: {
    items: any[];
    total: number;
    page: number;
    totalPages: number;
  };

  initialFilters: FiltersResponse;
};

const parseMultiFilterParam = (value: string | null | undefined, fallback?: string | null) => {
  const source = value ?? fallback ?? null;
  if (!source) return [];

  return Array.from(
    new Set(
      source
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
};

const ProductsListWrapper = ({
                               defaultBrand,
                               defaultType,
                               basePathname,
                               resetPathname,
                               initialProducts,
                               initialFilters,
                             }: ProductsListWrapperProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [range, setRange] = useState<number[]>([0, 0]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const sortOrderFromQuery = searchParams.get("sortOrder") || "desc";
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    sortOrderFromQuery as never
  );

  const params = useMemo(() => {
    const brand = parseMultiFilterParam(searchParams.get("brand"), defaultBrand ?? null);
    const type = parseMultiFilterParam(searchParams.get("type"), defaultType ?? null);
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
  }, [searchParams, defaultBrand, defaultType]);

  const [searchValue, setSearchValue] = useState(params.query ?? "");

  const effectiveBasePath = basePathname ?? `/${locale}${RoutesEnum.Products}`;

  const isFiltersReady = !!initialFilters?.price;

  const isInitialQuery =
    !params.query &&
    params.brand.length === 0 &&
    params.type.length === 0 &&
    !params.minPrice &&
    !params.maxPrice &&
    sortOrder === "default";

  // 🔎 поиск
  const router = useRouter();
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentParams = new URLSearchParams(searchParams.toString());

      if (searchValue) {
        currentParams.set("query", searchValue);
      } else {
        currentParams.delete("query");
      }

      router.replace(
        `${effectiveBasePath}?${currentParams.toString()}`,
        { scroll: false }
      );
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, effectiveBasePath, router, searchParams]);

  // 🔃 сортировка
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (sortOrder && sortOrder !== "default") {
      currentParams.set("sortOrder", sortOrder);
    } else {
      currentParams.delete("sortOrder");
    }

    const queryString = currentParams.toString();

    router.replace(
      queryString
        ? `${effectiveBasePath}?${queryString}`
        : effectiveBasePath,
      { scroll: false }
    );
  }, [sortOrder, effectiveBasePath, router, searchParams]);

  // 🧩 фильтры (с initialData)
  const {
    data: filters,
    isLoading: isFiltersLoading,
    error: filtersError,
  } = useQuery<FiltersResponse>({
    queryKey: ["getFilters", locale],
    queryFn: () => getFilters(locale),
    initialData: initialFilters,
  });

  // 📦 товары (SSR + infinite scroll)
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isProductsLoading,
    isFetched,
  } = useInfiniteQuery({
    queryKey: ["products", locale, params, sortOrder],

    enabled: isFiltersReady,

    initialPageParam: 1,

    queryFn: ({ pageParam = 1 }) => {
      const appliedSort = sortOrder === "default" ? "desc" : sortOrder;

      return getProducts({
        locale,
        query: params.query,
        brand: params.brand.length ? params.brand : undefined,
        type: params.type.length ? params.type : undefined,
        minPrice: params.minPrice ?? filters!.price.low,
        maxPrice: params.maxPrice ?? filters!.price.more,
        sortOrder: appliedSort,
        page: pageParam,
        limit: 16,
      });
    },

    initialData:
      isFiltersReady && isInitialQuery
        ? {
          pages: [initialProducts],
          pageParams: [1],
        }
        : undefined,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const products = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  return (
    <PageLayout className={styles.pageLayout}>
      <div className={styles.wrapper}>
        <div className={styles.filtersWrapper}>
          <div className={styles.mobileFilter}>
            <Button
              buttonType="smallButton"
              className={styles.filtersButton}
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <span className={styles.buttonTitle}>
                {t("ProductsPageInformation.filters")}
              </span>
              <Image src="/filters-icon.svg" alt="Filter Icon" width={20} height={20} />
            </Button>
          </div>

          <div className={styles.sortWrapper}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
                {t("ProductsPageInformation.title")}
              </h1>
            </div>
            {/* controls moved to FiltersBlock */}
          </div>
        </div>

        <div className={styles.contentFilterWrapper}>
          <FiltersBlock
            filtersData={filters}
            isLoading={isFiltersLoading}
            error={filtersError}
            range={range}
            setRange={setRange}
            className={styles.filter}
            defaultBrand={defaultBrand}
            defaultType={defaultType}
            resetPathname={resetPathname}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />

          <ProductsList
            data={products}
            isFetched={isFetched}
            isLoading={isProductsLoading}
          />
        </div>

        {products.length < totalCount && (
          <Button
            className={styles.loadMoreBtn}
            buttonType="bigButton"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {t("ProductsPageInformation.loadMore")}
          </Button>
        )}
      </div>

      {isMobileFiltersOpen && (
        <div
          className={styles.mobileFiltersOverlay}
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className={styles.mobileFiltersContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setIsMobileFiltersOpen(false)}
            >
              <Image src="/close.svg" alt="Close" width={30} height={30} />
            </button>

            <FiltersBlock
              filtersData={filters}
              isLoading={isFiltersLoading}
              error={filtersError}
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

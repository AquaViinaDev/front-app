"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "use-intl";
import { PageLayout } from "@components/layout/PageLayout";
import { ProductsList } from "../ProductsList";
import { Button, SearchForm, Sort } from "@components/common";
import { getProducts } from "@lib/api";
import { useInfiniteQuery, useQueryClient  } from "@tanstack/react-query";
import { FiltersResponse } from "@components/FiltersBlock/FitersBlock";
import { FiltersBlock } from "@components/FiltersBlock";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { RoutesEnum } from "@types";

import styles from "./ProductListWrapper.module.scss";

type Props = {
  locale: "ru" | "ro";
  initialProducts: any[];
  initialFilters: FiltersResponse;
  totalCount: number;
};

const ProductsListWrapper = ({ locale, initialProducts, initialFilters, totalCount }: Props) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const [range, setRange] = useState<number[]>([
    initialFilters.price.low,
    initialFilters.price.more,
  ]);
  const [debouncedRange, setDebouncedRange] = useState(range);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const sortOrderFromQuery = searchParams.get("sortOrder") || "desc";
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    sortOrderFromQuery as never
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRange(range);
    }, 500); // задержка 500ms

    return () => clearTimeout(handler);
  }, [range]);

  const params = useMemo(() => {
    return {
      brand: searchParams.get("brand") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      query: searchParams.get("query") ?? undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : debouncedRange[0],
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : debouncedRange[1],
    };
  }, [searchParams, debouncedRange]);

  const [searchValue, setSearchValue] = useState(params.query ?? "");

  useEffect(() => {
    const current = new URLSearchParams(window.location.search);

    current.set("minPrice", String(debouncedRange[0]));
    current.set("maxPrice", String(debouncedRange[1]));

    router.replace(`/${locale}${RoutesEnum.Products}?${current.toString()}`, {
      scroll: false,
    });

    queryClient.removeQueries({ queryKey: ["products", locale] });
  }, [debouncedRange, locale, router, queryClient]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const current = new URLSearchParams(window.location.search);

      searchValue ? current.set("query", searchValue) : current.delete("query");

      router.replace(`/${locale}${RoutesEnum.Products}?${current.toString()}`, {
        scroll: false,
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue, locale, router]);

  /* 🔹 URL sync (sort) */
  useEffect(() => {
    const current = new URLSearchParams(window.location.search);

    sortOrder !== "default"
      ? current.set("sortOrder", sortOrder)
      : current.delete("sortOrder");

    router.replace(`/${locale}${RoutesEnum.Products}?${current.toString()}`, {
      scroll: false,
    });
  }, [sortOrder, locale, router]);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isFetched,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products", locale, params, sortOrder],
    initialPageParam: 2, // ❗ первая страница уже есть (SSR)
    queryFn: ({ pageParam }) =>
      getProducts({
        locale,
        ...params,
        sortOrder: sortOrder === "default" ? "desc" : sortOrder,
        page: pageParam,
        limit: 100,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: true,
  });

  const products = useMemo(() => {
    const nextPages = data?.pages.flatMap((p) => p.items) ?? [];
    return [...initialProducts, ...nextPages];
  }, [data, initialProducts]);

  return (
    <PageLayout className={styles.pageLayout}>
      <div className={styles.wrapper}>
        <div className={styles.filtersWrapper}>
          {/* Кнопка открытия модальных фильтров — видна только на мобилке */}
          <div className={styles.mobileFilter}>
            <Button
              buttonType="smallButton"
              className={styles.filtersButton}
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              {t("ProductsPageInformation.filters")}
              <Image src="/filters-icon.svg" alt="" width={20} height={20}/>
            </Button>
          </div>

          {/* Сортировка и заголовок */}
          <div className={styles.sortWrapper}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{t("ProductsPageInformation.title")}</h1>
            </div>
            <SearchForm value={searchValue} onSearch={setSearchValue}/>
            <Sort value={sortOrder} onChange={setSortOrder}/>
          </div>
        </div>

        <div className={styles.contentFilterWrapper}>
          {/* Фильтры для десктопа — скрываются на мобилке через CSS */}
          <FiltersBlock
            filtersData={initialFilters}
            isLoading={false}
            error={null}
            range={range}
            setRange={setRange}
            className={styles.filter} // класс filter скрыт на мобилке
          />

          <ProductsList
            data={products}
            isFetched={isFetched}
            isLoading={isLoading}
          />
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

              {/* Фильтры внутри модального окна */}
              <FiltersBlock
                filtersData={initialFilters}
                isLoading={false}
                error={null}
                range={range}
                setRange={setRange}
              />
            </div>
          </div>
        )}

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
    </PageLayout>
  );
};

export default ProductsListWrapper;

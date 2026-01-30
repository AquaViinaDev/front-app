import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useLocale, useTranslations } from "use-intl";
import classNames from "classnames";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button, SearchForm, Skeleton, Sort } from "@components/common";

import styles from "./FiltersBlock.module.scss";

export type FilterOption = {
  ro: string;
  ru: string;
};

export type FiltersResponse = {
  brand: FilterOption[];
  productType: FilterOption[];
  price: {
    low: number;
    more: number;
  };
};

export type FiltersBlockProps = {
  filtersData: FiltersResponse;
  isLoading: boolean;
  error: Error | null;
  range: number[];
  setRange: Dispatch<SetStateAction<number[]>>;
  className?: string;
  defaultBrand?: string | null;
  defaultType?: string | null;
  resetPathname?: string | null;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  sortOrder?: "asc" | "desc" | "default";
  onSortChange?: (value: "asc" | "desc" | "default") => void;
};

const FiltersBlock = ({
  filtersData,
  isLoading,
  error,
  range,
  setRange,
  className,
  defaultBrand,
  defaultType,
  resetPathname,
  searchValue,
  onSearchChange,
  sortOrder,
  onSortChange,
}: FiltersBlockProps) => {
  const t = useTranslations("ProductsPageInformation.filterAndSort");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const langKey: keyof FilterOption = locale === "ru" ? "ru" : "ro";

  const safeFilters = {
    brand: Array.isArray(filtersData?.brand) ? filtersData.brand : [],
    productType: Array.isArray(filtersData?.productType) ? filtersData.productType : [],
    price: {
      low: Number(filtersData?.price?.low) || 0,
      more: Number(filtersData?.price?.more) || 0,
    },
  };

  const params = useMemo(() => {
    const current = new URLSearchParams(searchParams.toString());
    return {
      brand: current.get("brand"),
      type: current.get("type"),
      minPrice: current.get("minPrice"),
      maxPrice: current.get("maxPrice"),
      sortOrder: current.get("sortOrder"),
    };
  }, [searchParams]);

  const parsePriceParam = (value: string | null, fallback: number) => {
    if (value === null || value === undefined) return fallback;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : fallback;
  };

  const activeBrand = params.brand || defaultBrand || null;
  const activeType = params.type || defaultType || null;
  const appliedMinPrice = parsePriceParam(params.minPrice, safeFilters.price.low);
  const appliedMaxPrice = parsePriceParam(params.maxPrice, safeFilters.price.more);

  const [pendingBrand, setPendingBrand] = useState<string | null>(activeBrand);
  const [pendingType, setPendingType] = useState<string | null>(activeType);

  useEffect(() => {
    setPendingBrand(activeBrand);
  }, [activeBrand]);

  useEffect(() => {
    setPendingType(activeType);
  }, [activeType]);

  const isFilterActive = useMemo(() => {
    return (
      appliedMinPrice !== safeFilters.price.low ||
      appliedMaxPrice !== safeFilters.price.more ||
      !!activeBrand ||
      !!activeType
    );
  }, [activeBrand, activeType, appliedMinPrice, appliedMaxPrice, safeFilters.price.low, safeFilters.price.more]);

  const [rangeMin, rangeMax] = range;

  const hasPendingChanges = useMemo(() => {
    return (
      pendingBrand !== activeBrand ||
      pendingType !== activeType ||
      rangeMin !== appliedMinPrice ||
      rangeMax !== appliedMaxPrice
    );
  }, [
    pendingBrand,
    activeBrand,
    pendingType,
    activeType,
    rangeMin,
    rangeMax,
    appliedMinPrice,
    appliedMaxPrice,
  ]);

  const updateParams = (params: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    const queryString = newParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  useEffect(() => {
    if (!filtersData?.price) return;

    setRange((prev) => {
      if (prev[0] === appliedMinPrice && prev[1] === appliedMaxPrice) {
        return prev;
      }
      return [appliedMinPrice, appliedMaxPrice];
    });
  }, [filtersData, appliedMinPrice, appliedMaxPrice, setRange]);

  const handleApplyFilters = () => {
    const normalizedMin = Math.min(Math.max(rangeMin, safeFilters.price.low), safeFilters.price.more);
    const normalizedMax = Math.max(Math.min(rangeMax, safeFilters.price.more), safeFilters.price.low);
    const finalMin = Math.min(normalizedMin, normalizedMax);
    const finalMax = Math.max(normalizedMin, normalizedMax);

    if (finalMin !== rangeMin || finalMax !== rangeMax) {
      setRange([finalMin, finalMax]);
    }

    updateParams({
      brand: pendingBrand,
      type: pendingType,
      minPrice: finalMin === safeFilters.price.low ? null : finalMin,
      maxPrice: finalMax === safeFilters.price.more ? null : finalMax,
    });
  };

  const handleResetFilters = () => {
    setPendingBrand(null);
    setPendingType(null);
    setRange([safeFilters.price.low, safeFilters.price.more]);
    if (resetPathname) {
      router.replace(resetPathname);
      return;
    }
    router.replace(pathname);
  };

  if (error) {
    return (
      <p className={styles.errorFilterData}>
        Ooops, something went wrong with the filtration unit! Try refreshing the page!
      </p>
    );
  }

  return (
    <div className={classNames(className, styles.root)}>
      {onSearchChange ? (
        <div className={styles.controls}>
          <div className={styles.controlItem}>
            <SearchForm className={styles.search} value={searchValue ?? ""} onSearch={onSearchChange} />
          </div>
          {onSortChange ? (
            <div className={styles.controlItem}>
              <Sort value={sortOrder ?? "default"} onChange={onSortChange} />
            </div>
          ) : null}
        </div>
      ) : null}
      <div className={styles.filtersRow}>
        <div className={styles.brandWrapper}>
        <h3 className={styles.title}>{t("brand")}</h3>
        {isLoading ? (
          <ul className={classNames(styles.list, styles.skeletonList)}>
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index} className={styles.itemSkeleton}>
                <Skeleton height={16} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className={classNames(styles.list, { [styles.visible]: !isLoading })}>
            {safeFilters.brand.map((item, id) => (
              <li className={styles.item} key={id}>
                <button
                  className={classNames(styles.filterButton, {
                    [styles.active]: pendingBrand === item.ro,
                  })}
                  onClick={() =>
                    setPendingBrand((prev) => (prev === item.ro ? null : item.ro))
                  }
                >
                  {item[langKey]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
        <div className={styles.priceWrapper}>
        <h3 className={styles.title}>{t("price")}</h3>
        {isLoading ? (
          <div className={styles.priceSkeleton}>
            <Skeleton height={12} className={styles.sliderSkeleton} radius={12} />
            <div className={styles.priceSkeletonValues}>
              <Skeleton height={32} width="40%" />
              <Skeleton height={32} width="40%" />
            </div>
          </div>
        ) : (
          <>
            <Slider.Root
              className={styles.sliderRoot}
              value={range}
              onValueChange={(val: number[]) => setRange(val)}
              min={safeFilters.price.low}
              max={safeFilters.price.more}
              step={1}
            >
              <Slider.Track className={styles.sliderTrack}>
                <Slider.Range className={styles.sliderRange} />
              </Slider.Track>
              <Slider.Thumb className={styles.sliderThumb} />
              <Slider.Thumb className={styles.sliderThumb} />
            </Slider.Root>
            <div className={styles.priceValues}>
              <input
                type="number"
                name="minPrice"
                className={styles.priceValue}
                value={rangeMin}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (!isNaN(newValue)) {
                    setRange([newValue, rangeMax]);
                  }
                }}
              />
              -
              <input
                type="number"
                name="maxPrice"
                className={styles.priceValue}
                value={rangeMax}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (!isNaN(newValue)) {
                    setRange([rangeMin, newValue]);
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
        <div className={styles.brandWrapper}>
        <h3 className={styles.title}>{t("chapter")}</h3>
        {isLoading ? (
          <ul className={classNames(styles.list, styles.skeletonList)}>
            {Array.from({ length: 4 }).map((_, index) => (
              <li key={index} className={styles.itemSkeleton}>
                <Skeleton height={16} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.list}>
            {safeFilters.productType.map((item, id) => (
              <li className={styles.item} key={id}>
                <button
                  className={classNames(styles.filterButton, {
                    [styles.active]: pendingType === item.ro,
                  })}
                  onClick={() => setPendingType((prev) => (prev === item.ro ? null : item.ro))}
                >
                  {item[langKey]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
      <div className={styles.actionsRow}>
        <Button
          buttonType={"smallButton"}
          disabled={!hasPendingChanges}
          onClick={handleApplyFilters}
        >
          {t("applyFilter")}
        </Button>
        <Button
          buttonType={"smallButton"}
          theme="secondary"
          disabled={!isFilterActive && !hasPendingChanges}
          onClick={handleResetFilters}
        >
          {t("clearFilter")}
        </Button>
      </div>
    </div>
  );
};
export default FiltersBlock;

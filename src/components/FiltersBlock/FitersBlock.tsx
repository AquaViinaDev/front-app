import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useLocale, useTranslations } from "use-intl";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { RoutesEnum } from "@types";
import { Button, Skeleton } from "@components/common";

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
};

const FiltersBlock = ({
  filtersData,
  isLoading,
  error,
  range,
  setRange,
  className,
}: FiltersBlockProps) => {
  const t = useTranslations("ProductsPageInformation.filterAndSort");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const langKey: keyof FilterOption = locale === "ru" ? "ru" : "ro";

  const safeFilters = {
    brand: Array.isArray(filtersData?.brand) ? filtersData.brand : [],
    productType: Array.isArray(filtersData?.productType) ? filtersData.productType : [],
    price: {
      low: Number(filtersData?.price?.low) || 0,
      more: Number(filtersData?.price?.more) || 0,
    },
  };

  const params = useMemo(
    () => Object.fromEntries(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );

  const activeBrand = params.brand || null;
  const activeType = params.type || null;

  const isFilterActive = useMemo(() => {
    const urlParams = Object.fromEntries(new URLSearchParams(searchParams.toString()));
    return (
      range?.[0] !== safeFilters.price.low ||
      range?.[1] !== safeFilters.price.more ||
      !!urlParams.brand ||
      !!urlParams.type
    );
  }, [range, safeFilters.price.low, safeFilters.price.more, searchParams]);

  const updateParams = (params: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    router.replace(`?${newParams.toString()}`);
  };

  useEffect(() => {
    if (!filtersData?.price) return;

    const paramsString = searchParams.toString();
    const params = Object.fromEntries(new URLSearchParams(paramsString));

    const minPrice = params.minPrice ? Number(params.minPrice) : filtersData.price.low;
    const maxPrice = params.maxPrice ? Number(params.maxPrice) : filtersData.price.more;

    setRange((prev) => {
      if (prev[0] !== minPrice || prev[1] !== maxPrice) {
        return [minPrice, maxPrice];
      }
      return prev;
    });
  }, [filtersData]);

  if (error) {
    return (
      <p className={styles.errorFilterData}>
        Ooops, something went wrong with the filtration unit! Try refreshing the page!
      </p>
    );
  }

  return (
    <div className={classNames(className, styles.root)}>
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
                    [styles.active]: activeBrand === item.ro,
                  })}
                  onClick={() =>
                    updateParams({
                      brand: activeBrand === item.ro ? null : item.ro,
                    })
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
              onValueChange={(val) => setRange(val)}
              onValueCommit={(val) => {
                updateParams({
                  minPrice: val[0],
                  maxPrice: val[1],
                });
              }}
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
                value={range[0]}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (!isNaN(newValue)) {
                    setRange([newValue, range[1]]);
                  }
                }}
                onBlur={() => updateParams({ minPrice: range[0], maxPrice: range[1] })}
              />
              -
              <input
                type="number"
                name="maxPrice"
                className={styles.priceValue}
                value={range[1]}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (!isNaN(newValue)) {
                    setRange([range[0], newValue]);
                  }
                }}
                onBlur={() => updateParams({ minPrice: range[0], maxPrice: range[1] })}
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
                    [styles.active]: activeType === item.ro,
                  })}
                  onClick={() => updateParams({ type: activeType === item.ro ? null : item.ro })}
                >
                  {item[langKey]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        buttonType={"smallButton"}
        disabled={!isFilterActive}
        onClick={() => {
          router.replace(`/${locale}${RoutesEnum.Products}`);
        }}
      >
        {t("clearFilter")}
      </Button>
    </div>
  );
};
export default FiltersBlock;

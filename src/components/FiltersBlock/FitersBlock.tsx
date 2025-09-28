import { CSSProperties, useEffect, useMemo } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useLocale, useTranslations } from "use-intl";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { RoutesEnum } from "@/types";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/common";

import styles from "./FiltersBlock.module.scss";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#04559b",
};

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
  selectedBrand: string | null;
  setSelectedBrand: (val: string | null) => void;
  selectedType: string | null;
  setSelectedType: (val: string | null) => void;
  range: number[];
  setRange: (val: number[]) => void;
  className?: string;
};

const FiltersBlock = ({
  filtersData,
  isLoading,
  error,
  // selectedBrand,
  // setSelectedBrand,
  // selectedType,
  // setSelectedType,
  range,
  setRange,
  className,
}: FiltersBlockProps) => {
  const t = useTranslations("ProductsPageInformation.filterAndSort");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const langKey: keyof FilterOption = locale === "ru" ? "ru" : "ro";

  const params = useMemo(
    () => Object.fromEntries(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );

  const activeBrand = params.brand || null;
  const activeType = params.type || null;

  const isFilterActive = useMemo(() => {
    const urlParams = Object.fromEntries(new URLSearchParams(searchParams.toString()));
    return (
      range[0] !== filtersData.price.low ||
      range[1] !== filtersData.price.more ||
      !!urlParams.brand ||
      !!urlParams.type
    );
  }, [range, filtersData.price.low, filtersData.price.more, searchParams]);

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
    if (filtersData?.price) {
      const params = Object.fromEntries(new URLSearchParams(searchParams.toString()));

      const minPrice = params.minPrice ? Number(params.minPrice) : filtersData.price.low;
      const maxPrice = params.maxPrice ? Number(params.maxPrice) : filtersData.price.more;

      setRange([minPrice, maxPrice]);
    }
  }, [filtersData, searchParams, setRange]);

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
          <ClipLoader loading={isLoading} cssOverride={override} size={30} />
        ) : (
          <ul className={styles.list}>
            {filtersData.brand.map((item, id) => (
              <li className={styles.item} key={id}>
                <button
                  className={classNames(styles.filterButton, {
                    [styles.active]: activeBrand === item.ro,
                  })}
                  onClick={() => updateParams({ brand: item.ro })}
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
          <ClipLoader loading={isLoading} cssOverride={override} size={30} />
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
              min={filtersData.price.low}
              max={filtersData.price.more}
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
          <ClipLoader loading={isLoading} cssOverride={override} size={30} />
        ) : (
          <ul className={styles.list}>
            {filtersData.productType.map((item, id) => (
              <li className={styles.item} key={id}>
                <button
                  className={classNames(styles.filterButton, {
                    [styles.active]: activeType === item.ro,
                  })}
                  onClick={() => updateParams({ type: item.ro })}
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

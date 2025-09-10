import { CSSProperties, useEffect } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useLocale, useTranslations } from "use-intl";

import { ClipLoader } from "react-spinners";
import { Button } from "@/components/common";

import styles from "./FiltersBlock.module.scss";
import classNames from "classnames";

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
  selectedBrand,
  setSelectedBrand,
  selectedType,
  setSelectedType,
  range,
  setRange,
  className,
}: FiltersBlockProps) => {
  const t = useTranslations("ProductsPageInformation.filterAndSort");
  const locale = useLocale();
  const langKey: keyof FilterOption = locale === "ru" ? "ru" : "ro";

  const isFilterActive =
    selectedBrand !== null ||
    selectedType !== null ||
    range[0] !== filtersData.price.low ||
    range[1] !== filtersData.price.more;

  useEffect(() => {
    if (filtersData?.price) {
      setRange([filtersData.price.low, filtersData.price.more]);
    }
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
          <ClipLoader
            loading={isLoading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <ul className={styles.list}>
            {filtersData.brand.map((item, id) => (
              <li className={styles.item} key={id}>
                <button className={styles.filterButton} onClick={() => setSelectedBrand(item.ro)}>
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
          <ClipLoader
            loading={isLoading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <Slider.Root
              className={styles.sliderRoot}
              value={range}
              onValueChange={setRange}
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
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.brandWrapper}>
        <h3 className={styles.title}>{t("chapter")}</h3>
        {isLoading ? (
          <ClipLoader
            loading={isLoading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <ul className={styles.list}>
            {filtersData.productType.map((item, id) => (
              <li className={styles.item} key={id}>
                <button className={styles.filterButton} onClick={() => setSelectedType(item.ro)}>
                  {item[langKey]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        disabled={!isFilterActive}
        buttonType={"smallButton"}
        onClick={() => {
          setSelectedBrand(null);
          setSelectedType(null);
          setRange([filtersData.price.low, filtersData.price.more]);
        }}
      >
        Очистить фильтр
      </Button>
    </div>
  );
};
export default FiltersBlock;

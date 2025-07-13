"use client";

import { useMemo } from "react";
import Select from "react-select";
import { usePathname, useRouter } from "next/navigation";

import styles from "./Local.module.scss";

const options = [
  { value: "ro", label: "RO" },
  { value: "ru", label: "RU" },
];

const Local = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1];
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === currentLocale) ?? options[0],
    [currentLocale]
  );

  const handleChange = (option: { value: string } | null) => {
    if (!option) return;

    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${option.value}`);
    router.push(newPath);
  };

  return (
    <div className={styles.root}>
      <Select
        instanceId="language-select"
        isSearchable={false}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        styles={{
          control: (base) => ({ ...base, border: "none", boxShadow: "none", cursor: "pointer" }),
          input: (base) => ({ ...base, caretColor: "transparent" }),
          singleValue: (base) => ({ ...base, opacity: 0.5 }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#eeeeee" : state.isFocused ? "#c4c4c4" : "#ffffff",
            color: state.isSelected ? "#000" : "#333",
            cursor: "pointer",
          }),
        }}
      />
    </div>
  );
};

export default Local;

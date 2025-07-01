"use client";

import Select, { SingleValue } from "react-select";
import { memo, useState } from "react";

import styles from "./Local.module.scss";

type OptionType = { value: string; label: string };

const options: OptionType[] = [
  { value: "ro", label: "RO" },
  { value: "ru", label: "RU" },
];

const Local = memo(() => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(options[1]);

  return (
    <div className={styles.root}>
      <Select
        value={selectedOption}
        onChange={(select: SingleValue<OptionType>) => setSelectedOption(select)}
        options={options}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            cursor: "pointer",
          }),
          input: (provided) => ({
            ...provided,
            caretColor: "transparent",
          }),
          singleValue: (provided) => ({
            ...provided,
            opacity: "0.5",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#eeeeee" : state.isFocused ? "#c4c4c4" : "#ffffff",
            color: state.isSelected ? "#000000" : "#333",
            cursor: "pointer",
          }),
        }}
      />
    </div>
  );
});

Local.displayName = "Local";

export default Local;

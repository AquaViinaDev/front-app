import classNames from "classnames";

import styles from "./ToggleGroup.module.scss";

export type ToggleGroupProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
};

const ToggleGroup = ({ options, value, onChange }: ToggleGroupProps) => {
  return (
    <div className={styles.root}>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={classNames(styles.button, {
            [styles.active]: value === opt.value,
          })}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;

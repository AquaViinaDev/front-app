"use client";

import classNames from "classnames";

import styles from "./SearchForm.module.scss";

export type SearchFormProps = {
  value: string;
  onSearch: (query: string) => void;
  className?: string;
};

const SearchForm = ({ onSearch, value, className }: SearchFormProps) => {
  return (
    <form
      className={classNames(styles.searchForm, className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
      }}
    >
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        value={value}
      />
    </form>
  );
};

export default SearchForm;

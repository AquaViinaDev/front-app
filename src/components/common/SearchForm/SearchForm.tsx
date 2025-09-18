"use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/common/Button";
// import SearchIcon from "@/assets/icons/search-icon.svg";

import styles from "./SearchForm.module.scss";

export type SearchFormProps = {
  value: string;
  onSearch: (query: string) => void;
};

const SearchForm = ({ onSearch, value }: SearchFormProps) => {
  return (
    <form
      className={styles.searchForm}
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

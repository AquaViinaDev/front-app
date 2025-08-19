"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import SearchIcon from "@/assets/icons/search-icon.svg";

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
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        value={value}
      />
      {/*<Button className={styles.searchButton} buttonType={"smallButton"} type="submit">*/}
      {/*  <SearchIcon className={styles.searchIcon} />*/}
      {/*</Button>*/}
    </form>
  );
};

export default SearchForm;

"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import SearchIcon from "@/assets/icons/search-icon.svg";

import styles from "./SearchForm.module.scss";

const SearchForm = () => {
  const [value, setValue] = useState("");

  return (
    <form
      className={styles.searchForm}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target);
      }}
    >
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          // e.preventDefault();
          setValue(e.target.value);
        }}
        value={value}
      />
      <Button className={styles.searchButton} buttonType={"smallButton"} type="button">
        <SearchIcon className={styles.searchIcon} />
      </Button>
    </form>
  );
};

export default SearchForm;

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type FiltersState = {
  brand: string | null;
  type: string | null;
  minPrice: number | null;
  maxPrice: number | null;
};

type FiltersContextType = {
  filters: FiltersState;
  setFilters: (filters: Partial<FiltersState>) => void;
  resetFilters: () => void;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<FiltersState>({
    brand: null,
    type: null,
    minPrice: null,
    maxPrice: null,
  });

  const setFilters = (newFilters: Partial<FiltersState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState({ brand: null, type: null, minPrice: null, maxPrice: null });
  };

  return (
    <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};

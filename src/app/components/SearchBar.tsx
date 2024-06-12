"use client";

import React, { useEffect, useState } from "react";

import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { useSetQueryParameter } from "@/lib/hooks/useSetQueryParam";

const DEBOUNCE_MILLISECONDS = 300;

const SearchBar = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [inputValue, setInputValue] = useState(search || null);
  const { setQueryParameters } = useSetQueryParameter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [debouncedInput] = useDebounce(inputValue, DEBOUNCE_MILLISECONDS);

  useEffect(() => {
    if (debouncedInput === null) {
      return;
    }
    setQueryParameters([
      { name: "search", value: debouncedInput || "" },
      { name: "page", value: "1" },
    ]);
  }, [debouncedInput, setQueryParameters]);

  return (
    <UncontrolledSearchBar onChange={handleSearch} value={inputValue || ""} />
  );
};

type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const UncontrolledSearchBar = ({ onChange, value }: Props) => {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={onChange}
        value={value || ""}
        type="text"
        className="rounded-full bg-white/80 shadow-md px-4 py-2 "
        placeholder="search"
        name="search"
        id="search"
      />
    </div>
  );
};

export default SearchBar;

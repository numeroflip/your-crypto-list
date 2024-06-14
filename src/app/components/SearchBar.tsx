"use client";

import React, { useEffect, useState } from "react";

import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { useSetQueryParameters } from "@/lib/hooks/useSetQueryParameters";

const DEBOUNCE_MILLISECONDS = 300;

const SearchBar = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [inputValue, setInputValue] = useState(query || null);
  const { setQueryParameters } = useSetQueryParameters();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [debouncedInput] = useDebounce(inputValue, DEBOUNCE_MILLISECONDS);

  useEffect(() => {
    if (debouncedInput === null) {
      return;
    }
    setQueryParameters(
      [
        { name: "query", value: debouncedInput || "" },
        { name: "page", value: "1" }, // Reset pagination when searching
      ],
      { scroll: false }
    );
  }, [debouncedInput, setQueryParameters]);

  return <SearchBarUI onChange={handleInputChange} value={inputValue || ""} />;
};

type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

/**
 * When
 */
export const SearchBarUI = ({ onChange, value }: Props) => {
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={onChange}
        value={value || ""}
        type="text"
        className="rounded-full bg-white/80 shadow-md px-5 py-3 "
        placeholder="Search"
        name="search"
        id="search"
      />
    </div>
  );
};

export default SearchBar;

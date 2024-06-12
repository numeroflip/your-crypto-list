"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEBOUNCE_MILLISECONDS = 300;

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [inputValue, setInputValue] = useState(search || "");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [debouncedInput] = useDebounce(inputValue, DEBOUNCE_MILLISECONDS);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("search", debouncedInput));
  }, [debouncedInput]);

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={handleSearch}
        value={inputValue}
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

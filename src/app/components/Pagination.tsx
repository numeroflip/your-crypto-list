"use client";

import { useSetQueryParameter } from "@/lib/hooks/useSetQueryParam";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  pageCount: number;
};

export default function Pagination({ currentPage, pageCount }: Props) {
  const { setQueryParameter } = useSetQueryParameter();
  const setPage = useCallback(
    (page: number) => {
      setQueryParameter("page", String(page));
    },
    [setQueryParameter]
  );

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      Page {currentPage} of {pageCount}
      <div className="flex">
        {currentPage > 1 && (
          <button
            className="bg-white/60 hover:bg-white transition-all rounded-full shadow-md px-4 py-2  m-2 block"
            onClick={() => setPage(currentPage - 1)}
          >
            Previous Page
          </button>
        )}
        <button
          className="bg-white/60 hover:bg-white transition-all rounded-full shadow-md px-4 py-2  m-2 block"
          onClick={() => setPage(currentPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

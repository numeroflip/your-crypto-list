"use client";

import { useSetQueryParameter } from "@/lib/hooks/useSetQueryParam";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

type Props = {
  currentPage: number;
  pageCount: number;
};

export default function Pagination({ currentPage, pageCount }: Props) {
  const pathName = usePathname();
  const { getUpdatedQueryParameters } = useSetQueryParameter();

  const hasNextPage = currentPage < pageCount;
  const hasPrevPage = currentPage > 1;
  const nextPageLink = `${pathName}?${getUpdatedQueryParameters(
    "page",
    String(currentPage + 1)
  )}`;
  const prevPageLink = `${pathName}?${getUpdatedQueryParameters(
    "page",
    String(currentPage - 1)
  )}`;

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <div className="flex">
        {hasPrevPage && (
          <Link
            href={prevPageLink}
            className="bg-white/60 hover:bg-white text-sm sm:text-base transition-all rounded-full shadow-md px-4 py-2  m-2 block"
          >
            Previous Page
          </Link>
        )}
        {hasNextPage && (
          <Link
            prefetch
            href={nextPageLink}
            className="bg-white/60 hover:bg-white text-sm sm:text-base transition-all rounded-full shadow-md px-4 py-2  m-2 block"
          >
            Next Page
          </Link>
        )}
      </div>
      <div className="text-sm text-slate-400">
        Page {currentPage} of {pageCount}
      </div>
    </div>
  );
}

import Link from "next/link";

type Props = {
  currentPage: number;
  pageCount: number;
  searchParams?: { [key: string]: string };
};

export default async function Pagination({
  currentPage,
  searchParams,
  pageCount,
}: Props) {
  const hasNextPage = currentPage < pageCount;
  const hasPrevPage = currentPage > 1;

  function generatePageLink(page: number) {
    const newQueryParams = new URLSearchParams(searchParams);
    newQueryParams.set("page", String(page));
    return `?${newQueryParams.toString()}`;
  }

  const nextPageLink = hasNextPage ? generatePageLink(currentPage + 1) : null;
  const prevPageLink = hasPrevPage ? generatePageLink(currentPage - 1) : null;

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <div className="flex">
        {prevPageLink && (
          <Link
            href={prevPageLink}
            scroll={false}
            className="bg-white/60 hover:bg-white text-sm sm:text-base transition-all rounded-full shadow-md px-4 py-2  m-2 block"
          >
            Previous Page
          </Link>
        )}
        {nextPageLink && (
          <Link
            scroll={false}
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

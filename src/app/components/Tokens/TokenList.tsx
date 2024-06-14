import Pagination from "../Pagination";
import { Skeleton } from "../Skeleton";
import TokenListItem from "./TokenListItem";
import { getTokens } from "@/lib/services/lifiApi/tokens";

type Props = {
  query?: string;
  page?: number;
};

export default async function TokenList({ query, page }: Props) {
  const tokens = await getTokens({ page: Number(page), query });

  return (
    <>
      <ul className="grid grid-cols-1 mb-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  w-full">
        {tokens.items.map((token) => (
          <li key={`${token.chainId}-${token.address}`}>
            <TokenListItem token={token} />
          </li>
        ))}
      </ul>
      <div className="h-[4px] rounded-md shadow-md bg-white w-full mb-4" />
      <Pagination
        searchParams={query ? { query } : undefined}
        pageCount={tokens.total}
        currentPage={tokens.currentPage}
      />
    </>
  );
}

type SkeletonProps = {
  itemCount: number;
};
export const TokenListSkeleton = ({ itemCount }: SkeletonProps) => {
  return (
    <>
      <div className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6  w-full">
        {new Array(itemCount).fill(0).map((_, index) => (
          <Skeleton key={index} className="w-full h-24" />
        ))}
      </div>
      <div className="h-[4px] rounded-md shadow-md bg-white w-full mb-4" />
    </>
  );
};

import { fetchTokens } from "@/lib/services/lifiApi/tokens";
import { withErrorData } from "@/lib/utils/withErrorData";

import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";

type Props = {
  query?: string;
  page?: number;
};

export default async function TokenList({ query, page }: Props) {
  const {
    isError,
    error,
    data: paginatedTokens,
  } = await withErrorData(
    fetchTokens({ query, page }, { next: { revalidate: 20 } })
  );

  if (isError) {
    // TODO: handle error
    console.error(error);
    return <>Opps, an error occured</>;
  }

  return (
    <>
      <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  w-full">
        {paginatedTokens.items.map((token) => (
          <li key={`${token.chainId}-${token.address}`}>
            <Link
              href={`/token/${token.chainId}-${token.address}`}
              className="flex h-full min-h-24 overflow-hidden bg-white/70 shadow-md rounded-xl py-4 gap-4 px-4 items-center hover:shadow-lg hover:bg-white/85 transition-all"
            >
              <div className="aspect-square shrink-0">
                {token.logoURI ? (
                  <Image
                    src={token.logoURI}
                    alt={token.address}
                    width={32}
                    height={32}
                    unoptimized
                  />
                ) : (
                  <div className="size-8 rounded-full grid items-center font-bold  justify-center text-white  bg-slate-300">
                    ?
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="font-medium text-ellipsis">{token.name}</div>
                <div className="text-[10px] text-wrap break-all text-slate-500">
                  {token.address}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-[4px] rounded-md shadow-md bg-white w-full" />
      <Pagination
        pageCount={paginatedTokens.total}
        currentPage={paginatedTokens.currentPage}
      />
    </>
  );
}

type SkeletonProps = {
  itemCount: number;
};
export const TokenListSkeleton = ({ itemCount }: SkeletonProps) => {
  return (
    <div className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  w-full">
      {new Array(itemCount).fill(0).map((_, index) => (
        <div className="w-full h-24 rounded-md shadow-md bg-white/80 animate-pulse"></div>
      ))}
    </div>
  );
};

import { fetchTokens } from "@/lib/services/lifiApi/tokens";
import { withErrorData } from "@/lib/utils/withErrorData";

import Image from "next/image";
import Link from "next/link";

type Props = {
  query?: string;
};

export default async function TokenList({ query }: Props) {
  const { isError, data: tokenList } = await withErrorData(
    fetchTokens({ query })
  );

  console.info("TokenList, query", query);
  if (isError) {
    // TODO: handle error
    return <>Opps, an error occured</>;
  }

  return (
    <>
      <ul className="grid grid-cols-5 gap-4  w-full">
        {tokenList.map((token) => (
          <li key={`${token.chainId}-${token.address}`}>
            <Link
              href={`/token/${token.chainId}-${token.address}`}
              className="flex h-full bg-white/70 shadow-md rounded-xl py-4 gap-4 px-4 items-center hover:shadow-lg hover:bg-white/85 transition-all"
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
                <div className="font-medium">{token.name}</div>
                <div className="text-[10px] text-wrap break-all text-slate-500">
                  {token.address}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

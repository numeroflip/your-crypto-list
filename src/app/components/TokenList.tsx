import { IToken } from "@/lib/services/lifiApi/model";
import { fetchTokens } from "@/lib/services/lifiApi/tokens";
import { withErrorData } from "@/lib/utils/withErrorData";

import Image from "next/image";
import Link from "next/link";

export default async function TokenList() {
  const { isError, data: tokenList } = await withErrorData(fetchTokens());
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
              className="flex bg-white/70 shadow-md rounded-xl py-4 gap-2 px-4 items-center hover:shadow-lg hover:bg-white/85 transition-all"
            >
              <div className="aspect-square shrink-0">
                {token.logoURI && (
                  <Image
                    src={token.logoURI}
                    alt={token.address}
                    width={32}
                    height={32}
                    unoptimized
                  />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="font-medium">{token.name}</div>
                <div className="text-xs text-slate-500"> {token.address}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

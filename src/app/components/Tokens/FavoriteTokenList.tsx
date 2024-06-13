import Link from "next/link";
import Image from "next/image";
import FavoriteIcon from "../FavoriteIcon";
import { getFavoriteTokens } from "@/lib/services/lifiApi/tokens";

export default async function FavoriteTokenList() {
  const favorites = await getFavoriteTokens();

  return (
    <>
      <ul className="flex flex-wrap gap-4 justify-center  w-full">
        {favorites.map((token) => (
          <li key={`${token.chainId}-${token.address}`}>
            <Link
              prefetch={false} // So we don't fire a huge amount of fetch requests for the associated pages when they enter the viewport
              href={`/token/${token.chainId}-${token.address}`}
              className="flex  overflow-hidden bg-white/70 shadow-md rounded-full py-2 gap-4 px-4 items-center hover:shadow-lg hover:bg-white/85 transition-all"
            >
              <div className="aspect-square shrink-0">
                {token.logoURI ? (
                  <Image
                    src={token.logoURI}
                    alt={token.address}
                    width={20}
                    height={20}
                    unoptimized
                  />
                ) : (
                  <div className="size-5 rounded-full grid items-center font-bold  justify-center text-white  bg-slate-300">
                    ?
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="font-medium text-sm  flex space-between w-full text-ellipsis">
                  {token.name}
                </div>
              </div>
              <FavoriteIcon
                chainId={token.chainId}
                address={token.address}
                isFavorite={true}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-[4px] rounded-full shadow-md bg-white/50 w-full mx-auto my-4 /"></div>
    </>
  );
}

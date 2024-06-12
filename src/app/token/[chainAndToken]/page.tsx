import { fetchToken } from "@/lib/services/lifiApi/token";
import { formatPrice } from "@/lib/utils/numberUtils";
import { withErrorData } from "@/lib/utils/withErrorData";
import clsx from "clsx";
import { notFound } from "next/navigation";

export default async function Token({
  params,
}: {
  params: { chainAndToken: string };
}) {
  const [chain, token] = params.chainAndToken.split("-");

  const { isError, error, data } = await withErrorData(
    fetchToken(
      { chain, token },
      { cache: "force-cache", next: { revalidate: 5 } }
    )
  );

  if (isError) {
    console.error(error);
    notFound();
  }

  const containerClasses = clsx("bg-white/80  w-full p-5 rounded-lg shadow-lg");

  return (
    <div className="flex max-w-screen-sm self-center w-full flex-col items-center justify-start grow   pt-10">
      <div
        className={clsx(
          containerClasses,
          "grid grid-cols-[auto_1fr] mb-10 font-semibold "
        )}
      >
        <h1 className="flex col-span-2 gap-2 text-3xl items-center grow">
          {data.logoURI && (
            <img alt="logo" className="size-14 " src={data.logoURI} />
          )}
          <div>{data.name}</div>
        </h1>
        <div className="text-slate-600  self-end justify-self-end font-semibold ">
          {data.symbol}
        </div>
        <div className="text-green-600 justify-self-end font-bold text-3xl">
          {formatPrice(Number(data.priceUSD))}
        </div>
      </div>

      <div
        className={clsx(
          containerClasses,
          "flex justify-between mb-3 items-center gap-10  "
        )}
      >
        <div>Address</div>
        <div className="break-all">{data.address}</div>
      </div>
      <div
        className={clsx(
          containerClasses,
          "flex justify-between mb-3 items-center gap-10  "
        )}
      >
        <div>Chain ID:</div>
        <div>{data.chainId}</div>
      </div>
      <div
        className={clsx(
          containerClasses,
          "flex justify-between mb-3 items-center gap-10  "
        )}
      >
        <div>CoinKey</div>
        <div>{data.coinKey}</div>
      </div>
    </div>
  );
}

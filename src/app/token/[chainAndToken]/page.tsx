import { fetchToken } from "@/lib/services/lifiApi/token";
import { formatPrice } from "@/lib/utils/numberUtils";
import { withErrorData } from "@/lib/utils/withErrorData";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { chainAndToken: string };
};

export const dynamic = "force-static"; // Ensures ISR (if a fetch uses revalidate inside)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [chain, token] = params.chainAndToken.split("-");
  const data = await fetchToken({ chain, token }, { next: { revalidate: 20 } });

  return {
    title: data?.name ? `${data.name} Details` : "Token Details",
  };
}

export default async function Token({ params }: Props) {
  const [chain, token] = params.chainAndToken.split("-");

  const { isError, error, data } = await withErrorData(
    fetchToken({ chain, token }, { next: { revalidate: 20 } })
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
        <h1 className="flex col-span-2 gap-4 text-3xl items-center grow">
          {data.logoURI && (
            <img alt="logo" className="size-14 " src={data.logoURI} />
          )}
          <div>{data.name}</div>
        </h1>
        <div className="text-slate-600  self-end ml-2 font-semibold ">
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

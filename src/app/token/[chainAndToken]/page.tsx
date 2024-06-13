import { getChain } from "@/lib/services/lifiApi/chains";
import { fetchToken } from "@/lib/services/lifiApi/token";
import { formatPrice } from "@/lib/utils/numberUtils";
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
  const [chainId, tokenAddress] = params.chainAndToken.split("-");

  const [tokenData, chainData] = await Promise.allSettled([
    fetchToken(
      { chain: chainId, token: tokenAddress },
      { next: { revalidate: 20 } }
    ),
    getChain(chainId),
  ]);

  const chain = chainData.status === "fulfilled" ? chainData.value : null;
  const token = tokenData.status === "fulfilled" ? tokenData.value : null;

  if (tokenData.status === "rejected") {
    throw tokenData.reason;
  }
  if (!token) {
    notFound();
  }

  const containerClasses = clsx("bg-white/80  w-full p-5 rounded-lg shadow-lg");

  return (
    <main className="flex px-3 max-w-screen-sm self-center w-full flex-col items-center justify-start grow gap-5   pt-10">
      <div className="grid w-full grid-cols-[auto_1fr] gap-5">
        <div
          className={clsx(
            containerClasses,
            "grid grid-cols-subgrid col-span-2 font-semibold "
          )}
        >
          <h1 className="flex col-span-2 gap-4 text-3xl items-center grow">
            {token.logoURI && (
              <img alt="logo" className="size-14 " src={token.logoURI} />
            )}
            <div>{token.name}</div>
          </h1>
          <div className="text-slate-600  self-end ml-2 font-semibold ">
            {token.symbol}
          </div>
          <div className="text-green-600 justify-self-end font-bold text-3xl">
            {formatPrice(Number(token.priceUSD))}
          </div>
        </div>
        <dl
          className={clsx(
            containerClasses,
            "grid col-span-2  grid-cols-subgrid  items-center gap-10  "
          )}
        >
          <h2 className="col-span-2 text-2xl font-semibold">Details</h2>

          <dt>Address:</dt>
          <dd className="break-all">{token.address}</dd>

          <dt>Key:</dt>
          <dd>{token.coinKey}</dd>
        </dl>
        {chain && (
          <dl
            className={clsx(
              containerClasses,
              "grid  col-span-2 grid-cols-subgrid mb-3 items-center gap-10  "
            )}
          >
            <h2 className="col-span-2 text-2xl font-semibold">Chain</h2>
            <dt>Name</dt>

            <dd className="flex gap-2 items-center">
              {chain?.logoURI && (
                <>
                  <img
                    alt="chain logo"
                    className="size-14 "
                    src={chain.logoURI}
                  />{" "}
                </>
              )}
              {chain.name}
            </dd>

            <dt>Mainnet: </dt>
            <dd className="text-xl">{chain.mainnet ? "✅" : "❌"} </dd>

            <dt>Coin: </dt>
            <dd className="text-xl">{chain.coin} </dd>
          </dl>
        )}
      </div>
    </main>
  );
}

import { fetchToken } from "@/lib/services/lifiApi/token";
import { withErrorData } from "@/lib/utils/withErrorData";
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

  return (
    <>
      <main className="flex  flex-col items-center gap-8 pt-10">
        <h1 className="text-3xl font-semibold">Token: {token}</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </>
  );
}

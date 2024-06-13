import { appFetch } from "@/lib/utils/appFetch";
import { z } from "zod";
import { Chain } from "./model";

const URL = "https://li.quest/v1/chains";

export async function fetchChains() {
  const data = await appFetch(URL, { next: { revalidate: 60 * 10 } });
  const validatedData = responseSchema.parse(data);
  return validatedData.chains;
}

const responseSchema = z.object({
  chains: z.array(Chain),
});

export async function getChain(id: string | number) {
  const chains = await fetchChains();
  return chains.find((chain) => chain.id === Number(id));
}

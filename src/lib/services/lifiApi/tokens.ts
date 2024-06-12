"server-only";
import { z } from "zod";
import { ITokenCore, TokenCore } from "./model";
import { appFetch } from "@/lib/utils/appFetch";
import Fuse from "fuse.js";

const URL = "https://li.quest/v1/tokens";

interface Options {
  query?: string;
}

export async function fetchTokens(
  { query }: Options = {},
  fetchOptions: RequestInit = {}
): Promise<ITokenCore[]> {
  const response = await appFetch(URL, fetchOptions);

  const validatedResponse = tokenListSchema.parse(response);
  const tokens = Object.values(validatedResponse.tokens).flat();

  let results: ITokenCore[] = tokens;

  if (query) {
    const fuse = new Fuse(tokens, {
      keys: ["name"],
    });
    const searchResult = fuse.search(query);

    results = searchResult.map((result) => result.item);
  }

  return results.slice(0, 50);
}

const tokenListSchema = z.object({
  tokens: z.record(z.string(), z.array(TokenCore)),
});

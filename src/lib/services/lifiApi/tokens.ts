import { z } from "zod";
import { ITokenCore, TokenCore } from "./model";
import { appFetch } from "@/lib/utils/appFetch";
import Fuse from "fuse.js";
import { paginate, Paginated } from "@/lib/utils/paginate";
const URL = "https://li.quest/v1/tokens";

const DESKTOP_ROW_COUNT = 4;

export const TOKEN_ITEMS_PER_PAGE = DESKTOP_ROW_COUNT * 10;

interface Options {
  query?: string;
  page?: number;
}

export async function fetchTokens(
  { query, page }: Options = {},
  fetchOptions: RequestInit = {}
): Promise<Paginated<ITokenCore>> {
  const response = await appFetch(URL, fetchOptions);

  const validatedResponse = tokenListSchema.parse(response);

  const tokens = Object.values(validatedResponse.tokens).flat();

  let results: ITokenCore[] = tokens;

  // Search
  if (query) {
    const fuse = new Fuse(tokens, {
      keys: ["name"],
      threshold: 0.4,
    });
    const searchResult = fuse.search(query);

    results = searchResult.map((result) => result.item);
  }

  // Paginate
  const paginatedResults = paginate({
    array: results,
    pageNumber: page || 1,
    pageSize: TOKEN_ITEMS_PER_PAGE,
  });
  return paginatedResults;
}

const tokenListSchema = z.object({
  tokens: z.record(z.string(), z.array(TokenCore)),
});

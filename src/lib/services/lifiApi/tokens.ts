import { z } from "zod";
import "server-only";
import { ITokenCore, TokenCore } from "./model";
import { appFetch } from "@/lib/utils/appFetch";
import Fuse from "fuse.js";
import { paginate, Paginated } from "@/lib/utils/paginate";
import { appCache } from "../nodeCache";
const URL = "https://li.quest/v1/tokens";

const DESKTOP_ROW_COUNT = 4;

export const TOKEN_ITEMS_PER_PAGE = DESKTOP_ROW_COUNT * 10;
const TOKEN_LIST_CACHE_KEY = "allTokens";

interface Options {
  query?: string;
  page?: number;
}

/**
 * Get paginated tokens with support for searching
 */
export async function getTokens({ query, page }: Options = {}): Promise<
  Paginated<ITokenCore>
> {
  let tokens = await getAllTokens();

  // Search
  if (query) {
    const fuse = new Fuse(tokens, {
      keys: ["name"],
      threshold: 0.4,
    });
    const searchResult = fuse.search(query);

    tokens = searchResult.map((result) => result.item);
  }

  // Paginate
  const paginatedResults = paginate({
    array: tokens,
    pageNumber: page || 1,
    pageSize: TOKEN_ITEMS_PER_PAGE,
  });

  return paginatedResults;
}

/**
 * Fetch, or get the cached list of tokens.
 * The list itself is cached by node-cache, because right now NextJs does not support caching  over 2MB of data.
 * Caching is important, so we don't fetch the list again for search and pagination.
 */
async function getAllTokens(): Promise<ITokenCore[]> {
  const cachedTokens = appCache.get(TOKEN_LIST_CACHE_KEY) as ITokenCore[];
  let fetchedTokens: ITokenCore[] | null = null;

  if (!cachedTokens) {
    const response = await appFetch(URL);

    const validatedResponse = tokenListSchema.parse(response);

    fetchedTokens = Object.values(validatedResponse.tokens).flat();
    appCache.set(TOKEN_LIST_CACHE_KEY, fetchedTokens);
  }

  return cachedTokens || fetchedTokens || [];
}

const tokenListSchema = z.object({
  tokens: z.record(z.string(), z.array(TokenCore)),
});

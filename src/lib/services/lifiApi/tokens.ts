import "server-only";
import { z } from "zod";
import { ITokenCore, TOKEN_ITEMS_PER_PAGE, TokenCore } from "./model";
import { appFetch } from "@/lib/utils/appFetch";
import Fuse from "fuse.js";
import { paginate, Paginated } from "@/lib/utils/paginate";
import { appCache } from "../nodeCache";
import { getFavoriteTokensFromServerCookie } from "../favoriteTokenCookies/server";
import { WithFavoriteData } from "@/lib/types";
const URL = "https://li.quest/v1/tokens";

const TOKEN_LIST_CACHE_KEY = "allTokens";

interface Options {
  query?: string;
  page?: number;
}

/**
 * Get paginated tokens with support for searching
 */
export async function getTokens({ query, page }: Options = {}): Promise<
  Paginated<WithFavoriteData<ITokenCore>>
> {
  let tokens: WithFavoriteData<ITokenCore>[] = await getAllTokens();

  // Search
  if (query) {
    const fuse = new Fuse(tokens, {
      keys: ["name"],
      threshold: 0.4,
    });
    const searchResult = fuse.search(query);
    tokens = searchResult.map((result) => result.item);
  }

  // Mark Favorites
  const favoriteTokenIdentifiers = getFavoriteTokensFromServerCookie();

  tokens = tokens.map((token) => {
    const isFavorite = favoriteTokenIdentifiers.some(
      (favorite) =>
        token.chainId === favorite.chainId &&
        token.address === favorite.tokenAddress
    );

    return {
      ...token,
      isFavorite,
    };
  });

  // Paginate
  const paginatedResults = paginate({
    array: tokens,
    pageNumber: page || 1,
    pageSize: TOKEN_ITEMS_PER_PAGE,
  });

  return paginatedResults;
}

export async function getFavoriteTokens(): Promise<ITokenCore[]> {
  const favoriteTokenIdentifiers = getFavoriteTokensFromServerCookie();

  if (!favoriteTokenIdentifiers.length) {
    return [];
  }

  const tokens = await getAllTokens();

  const favoriteTokens = favoriteTokenIdentifiers
    .map((favorite) =>
      tokens.find(
        (token) =>
          token.chainId === favorite.chainId &&
          token.address === favorite.tokenAddress
      )
    )
    .filter(Boolean) as ITokenCore[]; // Type assertion, because TS can't infer yet that we removed undefined items

  return favoriteTokens;
}

/**
 * Fetch, or get the cached list of tokens.
 * The list itself is cached by node-cache, because right now NextJs does not support caching  over 2MB of data.
 * Caching is important, so we don't fetch the list again for search and pagination.
 */
export async function getAllTokens(): Promise<ITokenCore[]> {
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

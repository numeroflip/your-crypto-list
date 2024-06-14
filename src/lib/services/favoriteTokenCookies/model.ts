import { z } from "zod";

export const FAVORITE_TOKENS_KEY = "favoriteTokens";

export const FavoriteTokenIdentifier = z.object({
  chainId: z.number(),
  tokenAddress: z.string(),
});

export type IFavoriteTokenIdentifier = z.infer<typeof FavoriteTokenIdentifier>;

import Cookie from "js-cookie";
import {
  FAVORITE_TOKENS_KEY,
  FavoriteTokenIdentifier,
  IFavoriteTokenIdentifier,
} from "./model";
import { z } from "zod";
export function getFavoriteTokensFromClientCookie() {
  const cookieValue = Cookie.get(FAVORITE_TOKENS_KEY);
  const validatedTokens = z
    .array(FavoriteTokenIdentifier)
    .safeParse(JSON.parse(cookieValue || "[]"));

  if (validatedTokens.error) {
    console.warn("Invalid favorite tokens cookie, resetting...");
    Cookie.set(FAVORITE_TOKENS_KEY, "[]");
    return [];
  }

  return validatedTokens.data;
}

export function toggleFavoriteTokensFromClient(
  token: IFavoriteTokenIdentifier
) {
  const favoriteTokens = getFavoriteTokensFromClientCookie();

  const index = favoriteTokens.findIndex(
    (favorite) =>
      favorite.chainId === token.chainId &&
      favorite.tokenAddress === token.tokenAddress
  );

  const notFound = index === -1;
  if (notFound) {
    setFavoriteTokenCookies([...favoriteTokens, token]);
  } else {
    setFavoriteTokenCookies(favoriteTokens.toSpliced(index, 1));
  }
}

function setFavoriteTokenCookies(data: IFavoriteTokenIdentifier[]) {
  Cookie.set(FAVORITE_TOKENS_KEY, JSON.stringify(data));
}

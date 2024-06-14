import Cookie from "js-cookie";
import { FAVORITE_TOKENS_KEY, FavoriteTokenIdentifier } from "./model";
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

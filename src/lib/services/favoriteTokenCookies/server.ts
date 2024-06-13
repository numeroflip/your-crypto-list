import { cookies } from "next/headers";
import "server-only";
import {
  FAVORITE_TOKENS_KEY,
  FavoriteTokenIdentifier,
  IFavoriteTokenIdentifier,
} from "./model";
import { z } from "zod";

export function getFavoriteTokensFromServerCookie() {
  const cookieValue = cookies().get(FAVORITE_TOKENS_KEY)?.value;
  const validatedTokens = z
    .array(FavoriteTokenIdentifier)
    .safeParse(JSON.parse(cookieValue || "[]"));

  if (validatedTokens.error) {
    console.warn("Invalid favorite tokens cookie, resetting...");
    cookies().set(FAVORITE_TOKENS_KEY, "[]");
    return [];
  }

  return validatedTokens.data;
}

export function setFavoriteTokenCookie(data: IFavoriteTokenIdentifier[]) {
  cookies().set(FAVORITE_TOKENS_KEY, JSON.stringify(data));
}

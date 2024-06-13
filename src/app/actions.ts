"use server";

import { IFavoriteTokenIdentifier } from "@/lib/services/favoriteTokenCookies/model";
import {
  getFavoriteTokensFromServerCookie,
  setFavoriteTokenCookie,
} from "@/lib/services/favoriteTokenCookies/server";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteToken(token: IFavoriteTokenIdentifier) {
  const favoriteTokens = getFavoriteTokensFromServerCookie();

  const index = favoriteTokens.findIndex(
    (favorite) =>
      favorite.chainId === token.chainId &&
      favorite.tokenAddress === token.tokenAddress
  );

  const notFound = index === -1;
  if (notFound) {
    setFavoriteTokenCookie([...favoriteTokens, token]);
  } else {
    setFavoriteTokenCookie(favoriteTokens.toSpliced(index, 1));
  }
  revalidatePath("/");
}

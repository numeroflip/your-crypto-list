import { getFavoriteTokens } from "@/lib/services/lifiApi/tokens";
import FavoriteTokenListClient from "./FavoriteTokenList.client";

export default async function FavoriteTokenList() {
  const favorites = await getFavoriteTokens();

  return (
    <>{favorites ? <FavoriteTokenListClient items={favorites} /> : null}</>
  );
}

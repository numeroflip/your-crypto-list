import { getFavoriteTokens } from "@/lib/services/lifiApi/tokens";
import OptimisticFavoritesProviderClient from "./OptimisticFavoriteTokensProvider.client";

/**
 * Fetches the data on the server, and provides it to the client component.
 * The client component shares the data with the rest of the app
 */
export async function OptimisticFavoriteTokensProvider() {
  const favorites = await getFavoriteTokens();
  return <OptimisticFavoritesProviderClient favorites={favorites} />;
}

import {
  FavoriteTokenIdentifier,
  IFavoriteTokenIdentifier,
} from "@/lib/services/favoriteTokenCookies/model";
import { ITokenCore } from "@/lib/services/lifiApi/model";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Cookie from "js-cookie";
import { z } from "zod";

export const fullFavoriteTokensAtom = atom<ITokenCore[]>([]);

export const toggleFavoriteTokenAtom = atom(
  null,
  (_get, set, token: ITokenCore) => {
    const favoriteTokens = _get(fullFavoriteTokensAtom);
    const favoriteIDs = _get(favoriteTokensAtom);
    const index = favoriteTokens.findIndex(
      (favorite) =>
        favorite.chainId === token.chainId && favorite.address === token.address
    );

    const notFound = index === -1;
    if (notFound) {
      set(fullFavoriteTokensAtom, [...favoriteTokens, token]);
      set(favoriteTokensAtom, [
        ...favoriteIDs,
        { tokenAddress: token.address, chainId: token.chainId },
      ]);
    } else {
      set(fullFavoriteTokensAtom, favoriteTokens.toSpliced(index, 1));
      set(favoriteTokensAtom, favoriteIDs.toSpliced(index, 1));
    }
  }
);

export const favoriteTokensAtom = atomWithStorage<IFavoriteTokenIdentifier[]>(
  "favoriteTokens",
  [],
  {
    getItem(key, initialValue) {
      const cookieValue = Cookie.get(key);
      try {
        const valiadtedValue = z
          .array(FavoriteTokenIdentifier)
          .parse(JSON.parse(cookieValue!));
        return valiadtedValue;
      } catch {
        Cookie.set(key, JSON.stringify(initialValue));
        return initialValue;
      }
    },
    removeItem(key) {
      Cookie.remove(key);
    },
    setItem(key, value) {
      Cookie.set(key, JSON.stringify(value));
    },
  }
);

export const getFavoriteTokenAtom = ({
  chainId,
  tokenAddress,
}: IFavoriteTokenIdentifier) =>
  atom((get) =>
    get(favoriteTokensAtom).find(
      (token) =>
        token.chainId === chainId && token.tokenAddress === tokenAddress
    )
  );

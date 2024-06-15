"use client";

import { ITokenCore } from "@/lib/services/lifiApi/model";

import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useEffect, useOptimistic, useTransition } from "react";
import { toggleFavoriteTokenAction } from "../actions";
import {
  initializeOptimisticToggleFavoriteAtom,
  optimisticFavoriteTokensAtom,
} from "@/lib/store/atoms/optimisticFavoriteTokens";
type Props = {
  favorites: ITokenCore[];
};

export default function OptimisticFavoritesProviderClient({
  favorites,
}: Props) {
  useHydrateAtoms([[optimisticFavoriteTokensAtom, favorites]]);
  const initializeOptimisticToggleAtom = useSetAtom(
    initializeOptimisticToggleFavoriteAtom
  );
  const setFavoriteTokens = useSetAtom(optimisticFavoriteTokensAtom);
  const [_, startTransition] = useTransition(); // Server actions have to be run in a transition

  const [optimisticFavorites, optimisticToggleFavorite] = useOptimistic(
    favorites,
    (state, token: ITokenCore) => {
      const index = state.findIndex(
        (favorite) =>
          favorite?.address === token?.address &&
          favorite?.chainId === token?.chainId
      );

      const mode: "add" | "remove" = index === -1 ? "add" : "remove";

      const newFavorites =
        mode === "add" ? [...state, token] : state.toSpliced(index, 1);

      return newFavorites;
    }
  );

  useEffect(
    function initializeTheOptimisticToggle() {
      // The toggle function which we'll use through the app, provided by the atom.
      const optimisticToggleFunction = (token: ITokenCore) => {
        startTransition(() => {
          optimisticToggleFavorite(token);
          toggleFavoriteTokenAction({
            tokenAddress: token.address,
            chainId: token.chainId,
          });
        });
      };

      initializeOptimisticToggleAtom(optimisticToggleFunction);
    },
    [optimisticToggleFavorite, startTransition, initializeOptimisticToggleAtom]
  );

  useEffect(
    function syncOptimisticStateWithAtom() {
      setFavoriteTokens(optimisticFavorites);
    },
    [optimisticFavorites, setFavoriteTokens]
  );

  return null;
}

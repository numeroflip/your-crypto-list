"use client";
import { MouseEvent } from "react";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { ITokenCore } from "@/lib/services/lifiApi/model";
import {
  optimisticFavoriteTokensAtom,
  optimisticToggleFavoriteTokenAtom,
} from "@/lib/store/atoms/optimisticFavoriteTokens";
type Props = {
  token: ITokenCore;
};

export default function FavoriteIcon({ token }: Props) {
  const toggle = useAtomValue(optimisticToggleFavoriteTokenAtom);
  const favorites = useAtomValue(optimisticFavoriteTokensAtom);

  const isFavorite = favorites.find(
    (fav) => fav.address === token.address && fav.chainId === token.chainId
  );

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault(); // If some parent component is a link, we don't want to trigger that;

    if (toggle) {
      toggle.fn(token);
    }
  }

  return (
    <button
      className={clsx("hover:scale-125 transition-all active:scale-110")}
      onClickCapture={handleClick}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

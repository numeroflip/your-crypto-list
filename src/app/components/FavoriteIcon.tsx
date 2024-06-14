"use client";
import { MouseEvent, useMemo } from "react";
import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import {
  getFavoriteTokenAtom,
  toggleFavoriteTokenAtom,
} from "@/lib/store/atoms/cookieStorage";
import { ITokenCore } from "@/lib/services/lifiApi/model";
type Props = {
  token: ITokenCore;
  /**
   * If value is provided, it will be used to determine if the token is favorited.
   * Else, we determine it from the cookies.
   *
   * In Dynamic, SSR pages, it should be controlled, so it does not conflict with hydration.
   * In pregenerated/static pages, it should be emitted/cookie based.
   */
  isFavorite?: boolean;
};

export default function FavoriteIcon({ token, isFavorite }: Props) {
  const mode: "cookie based" | "controlled" =
    typeof isFavorite === "boolean" ? "controlled" : "cookie based";

  const favoriteToken = useAtomValue(
    useMemo(
      () =>
        getFavoriteTokenAtom({
          chainId: token?.chainId,
          tokenAddress: token?.address,
        }),
      [token]
    )
  );

  const isFavCookieBased = !!favoriteToken;
  const isFav = mode === "cookie based" ? isFavCookieBased : !!isFavorite;

  const toggleAtom = useSetAtom(toggleFavoriteTokenAtom);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault(); // If some parent component is a link, we don't want to trigger that;
    toggleAtom(token);
  }

  return (
    <button
      className={clsx("hover:scale-125 transition-all active:scale-110")}
      onClickCapture={handleClick}
    >
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}

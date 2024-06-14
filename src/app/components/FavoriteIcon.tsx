"use client";
import { MouseEvent, useOptimistic, useTransition } from "react";
import {
  getFavoriteTokensFromClientCookie,
  toggleFavoriteTokensFromClient,
} from "@/lib/services/favoriteTokenCookies/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
type Props = {
  chainId: number;
  address: string;
  /**
   * If value is provided, it will be used to determine if the token is favorited.
   * Else, we determine it from the cookies.
   *
   * In Dynamic, SSR pages, it should be controlled, so it does not conflict with hydration.
   * In pregenerated/static pages, it should be emitted/cookie based.
   */
  isFavorite?: boolean;
};

export default function FavoriteIcon({ chainId, isFavorite, address }: Props) {
  const mode: "cookie based" | "controlled" =
    typeof isFavorite === "boolean" ? "controlled" : "cookie based";

  let dataSource = !!isFavorite;

  const router = useRouter();

  if (mode === "cookie based") {
    const isFavoriteFromClientCookie =
      !!getFavoriteTokensFromClientCookie().find(
        (token) => token.chainId === chainId && token.tokenAddress === address
      );
    dataSource = isFavoriteFromClientCookie;
  }

  // Optimistic updates
  const [_, startTransition] = useTransition();
  const [optimisticIsFavorite, toggleOptimistic] = useOptimistic(
    dataSource,
    (state) => !state
  );

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault(); // If some parent component is a link, we don't want to trigger that;
    startTransition(() => {
      toggleOptimistic(undefined); // TS needs an argument here, but we don't use it;
      toggleFavoriteTokensFromClient({ chainId, tokenAddress: address });
      router.refresh();
    });
  }

  return (
    <button
      className={clsx("hover:scale-125 transition-all active:scale-110")}
      onClickCapture={handleClick}
    >
      {optimisticIsFavorite ? "❤️" : "🤍"}
    </button>
  );
}

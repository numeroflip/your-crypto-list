import { ITokenCore } from "@/lib/services/lifiApi/model";
import { atom } from "jotai";

/**
 * The atom components will subscribe to
 */
export const optimisticFavoriteTokensAtom = atom<ITokenCore[]>([]);

/**
 * Optimistically toggle the favorite status of a token.
 * Needs initialization, hence the default null value
 */
export const optimisticToggleFavoriteTokenAtom = atom<null | {
  fn: (token: ITokenCore) => void;
}>(null);

/**
 * Initialize the optimistic toggle atom function on the client
 */
export const initializeOptimisticToggleFavoriteAtom = atom(
  null,
  (_get, set, value: (token: ITokenCore) => void) => {
    set(optimisticToggleFavoriteTokenAtom, { fn: value });
  }
);
